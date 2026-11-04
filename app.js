(function () {
  'use strict';

  /* ───────────── Telegram ───────────── */
  var tg = window.Telegram && window.Telegram.WebApp;
  var inTg = !!(tg && tg.platform && tg.platform !== 'unknown');
  if (inTg) {
    tg.ready();
    tg.expand();
    // чтобы перетаскивание слов не сворачивало приложение свайпом вниз
    try { if (tg.isVersionAtLeast('7.7') && tg.disableVerticalSwipes) tg.disableVerticalSwipes(); } catch (e) {}
    document.body.classList.add('in-tg');
    tg.BackButton.onClick(function () { if (backAction) backAction(); });
  }
  function haptic(kind) {
    try { if (inTg && tg.HapticFeedback) tg.HapticFeedback.notificationOccurred(kind); } catch (e) {}
  }
  /* ───────────── Иконка на главном экране ─────────────
     Telegram (версия 8.0+) умеет сам добавить ярлык приложения на экран телефона. */
  var homeStatus = 'unsupported';   // unsupported | unknown | added | missed
  function homeSupported() {
    return inTg && tg.isVersionAtLeast && tg.isVersionAtLeast('8.0') && typeof tg.addToHomeScreen === 'function';
  }
  function checkHome(cb) {
    if (!homeSupported()) { homeStatus = 'unsupported'; if (cb) cb(); return; }
    try {
      tg.checkHomeScreenStatus(function (st) { homeStatus = st || 'unknown'; if (cb) cb(); });
    } catch (e) { homeStatus = 'unknown'; if (cb) cb(); }
  }
  function addHome() {
    try { tg.addToHomeScreen(); } catch (e) {}
  }
  if (inTg) {
    try {
      tg.onEvent('homeScreenAdded', function () {
        homeStatus = 'added';
        localSet('home_added', '1');
        if (!session) renderHome();
      });
    } catch (e) {}
  }

  function tap() {
    try { if (inTg && tg.HapticFeedback) tg.HapticFeedback.selectionChanged(); } catch (e) {}
  }

  /* ───────────── Хранилище (Telegram CloudStorage + localStorage) ───────────── */
  function cloudOk() {
    return inTg && tg.CloudStorage && tg.isVersionAtLeast && tg.isVersionAtLeast('6.9');
  }
  function localGet(k) { try { return localStorage.getItem('ep_' + k); } catch (e) { return null; } }
  function localSet(k, v) { try { localStorage.setItem('ep_' + k, v); } catch (e) {} }
  function storeGet(key) {
    return new Promise(function (resolve) {
      if (!cloudOk()) return resolve(localGet(key));
      try {
        tg.CloudStorage.getItem(key, function (err, val) {
          resolve(err || !val ? localGet(key) : val);
        });
      } catch (e) { resolve(localGet(key)); }
    });
  }
  function storeSet(key, val) {
    localSet(key, val);
    if (cloudOk()) { try { tg.CloudStorage.setItem(key, val, function () {}); } catch (e) {} }
  }

  var progress = {};   // { topicId: { best, runs, right, total } }
  var mistakes = [];   // [{ topicId, q: {...} }]
  var selected = {};   // { sectionId: [topicId, ...] } — отмеченные галочками темы

  function saveProgress() { storeSet('progress', JSON.stringify(progress)); }

  /* Учёт слов: для каждого слова счёт верных ответов подряд (0–3).
     Слово считается выученным со счётом 2 и выше. Хранится отдельно по темам. */
  var wordStats = {};   // { topicId: { word: score } }
  var LEARNED = 2;
  function isTracked(t) {
    if (t.words || t.verbs) return true;
    var sec = sectionOfTopicId(t.id);
    return !!(sec && sec.multi && t.questions);
  }
  function wordTopics() {
    var list = [];
    CONTENT.sections.forEach(function (s) { s.topics.forEach(function (t) { if (isTracked(t)) list.push(t); }); });
    return list;
  }
  // Ключи всех элементов темы: слово / глагол / предложение
  function trackKeys(t) {
    if (t.words || t.verbs) return (t.words || t.verbs).map(function (e) { return e[0]; });
    return t.questions.map(function (q) { return window.speechKey ? window.speechKey(q.q) : q.q; });
  }
  function recordWord(item, ok) {
    if (!item.q.wk) return;
    var st = wordStats[item.topicId] || (wordStats[item.topicId] = {});
    st[item.q.wk] = ok ? Math.min(3, (st[item.q.wk] || 0) + 1) : 0;
    storeSet('w_' + item.topicId, JSON.stringify(st));
  }
  function learnedCount(t) {
    var st = wordStats[t.id] || {};
    return trackKeys(t).filter(function (k) { return (st[k] || 0) >= LEARNED; }).length;
  }
  function byScore(list) {
    return list.sort(function (a, b) {
      var sa = (wordStats[a.topicId] || {})[a.q.wk] || 0, sb = (wordStats[b.topicId] || {})[b.q.wk] || 0;
      return sa - sb;
    });
  }
  function saveSelected() { storeSet('selected', JSON.stringify(selected)); }
  function saveMistakes() {
    var json = JSON.stringify(mistakes);
    while (json.length > 4000 && mistakes.length) { mistakes.shift(); json = JSON.stringify(mistakes); }
    storeSet('mistakes', json);
  }

  /* ───────────── Утилиты ───────────── */
  var app = document.getElementById('app');
  var backAction = null;

  function h(tag, props) {
    var el = document.createElement(tag);
    props = props || {};
    Object.keys(props).forEach(function (k) {
      var v = props[k];
      if (k === 'class') el.className = v;
      else if (k === 'html') el.innerHTML = v;
      else if (k === 'text') el.textContent = v;
      else if (k.indexOf('on') === 0) el.addEventListener(k.slice(2), v);
      else if (v !== false && v != null) el.setAttribute(k, v);
    });
    for (var i = 2; i < arguments.length; i++) append(el, arguments[i]);
    return el;
  }
  function append(el) {
    for (var i = 1; i < arguments.length; i++) {
      var kid = arguments[i];
      if (kid == null || kid === false) continue;
      if (Array.isArray(kid)) { kid.forEach(function (k) { append(el, k); }); continue; }
      el.appendChild(kid instanceof Node ? kid : document.createTextNode(String(kid)));
    }
  }
  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }
  function pick(arr, n, except) {
    return shuffle(arr.filter(function (x) { return except.indexOf(x) === -1; })).slice(0, n);
  }
  function normalize(s) {
    return String(s).toLowerCase()
      .replace(/[’`]/g, "'")
      .replace(/won't/g, 'will not').replace(/can't/g, 'cannot')
      .replace(/n't/g, ' not').replace(/'m/g, ' am').replace(/'re/g, ' are')
      .replace(/'ll/g, ' will').replace(/'ve/g, ' have')
      .replace(/[.,!?]/g, '').replace(/\s+/g, ' ').trim();
  }
  function screen(onBack) {
    if (typeof closeTip === 'function') closeTip();
    app.innerHTML = '';
    window.scrollTo(0, 0);
    backAction = onBack || null;
    if (inTg) { if (onBack) tg.BackButton.show(); else tg.BackButton.hide(); }
    if (onBack && !inTg) app.appendChild(h('button', { class: 'back', onclick: onBack }, '‹ Назад'));
  }
  function bar(pct) { return h('div', { class: 'bar' }, h('i', { style: 'width:' + (pct || 0) + '%' })); }
  function questionText(text) {
    var el = h('div', { class: 'question' });
    var parts = String(text).split('___');
    parts.forEach(function (p, i) {
      append(el, p);
      if (i < parts.length - 1) append(el, h('span', { class: 'gap' }, '?'));
    });
    return el;
  }

  /* ───────────── Озвучка ─────────────
     Берём лучший английский голос, который есть на устройстве
     (нейросетевые голоса Google / Apple / Microsoft), или тот, что выбрал пользователь. */
  var speechOk = 'speechSynthesis' in window;
  var voices = [];
  var chosenVoice = 'neural';   // всегда живой голос; голос устройства — только если записи нет

  // Заранее записанные нейросетевым голосом фразы (папка audio/, создаёт GitHub)
  var audioSet = {};
  var audioCount = 0;
  var player = null;
  try {
    fetch('audio/index.json', { cache: 'no-cache' })
      .then(function (r) { return r.ok ? r.json() : []; })
      .then(function (list) { list.forEach(function (k) { audioSet[k] = 1; }); audioCount = list.length; })
      .catch(function () {});
  } catch (e) {}
  function canSpeak() { return speechOk || audioCount > 0; }
  function playRecorded(text) {
    if (chosenVoice !== 'neural' || !window.speechKey) return false;
    var k = window.speechKey(text);
    if (!audioSet[k]) return false;
    try {
      if (speechOk) speechSynthesis.cancel();
      if (player) player.pause();
      player = new Audio('audio/' + k + '.mp3');
      var pr = player.play();
      if (pr && pr.catch) pr.catch(function () { speakDevice(text); });
      return true;
    } catch (e) { return false; }
  }

  function voiceScore(v) {
    var n = v.name.toLowerCase(), s = 0;
    if (/natural|neural|premium|enhanced|siri|online/.test(n)) s += 50;
    if (/google/.test(n)) s += 30;
    if (/samantha|ava|allison|zoe|evan|nathan|aria|jenny|guy|daniel|serena|karen|moira|tessa|libby|sonia|ryan/.test(n)) s += 15;
    if (/en[-_]us/i.test(v.lang)) s += 5;
    if (/en[-_]gb/i.test(v.lang)) s += 4;
    if (!v.localService) s += 3;
    if (/compact|espeak|eloquence|fred|albert|zarvox|whisper|bad news|bells|boing|bubbles|cellos|jester|organ|trinoids|superstar|grandma|grandpa|rocko|shelley|flo|eddy|reed|sandy|junior|ralph|kathy|wobble/.test(n)) s -= 60;
    return s;
  }
  function loadVoices() {
    if (!speechOk) return;
    voices = speechSynthesis.getVoices()
      .filter(function (v) { return /^en([-_]|$)/i.test(v.lang); })
      .sort(function (a, b) { return voiceScore(b) - voiceScore(a); });
  }
  if (speechOk) {
    loadVoices();
    try { speechSynthesis.addEventListener('voiceschanged', loadVoices); } catch (e) { speechSynthesis.onvoiceschanged = loadVoices; }
  }
  function currentVoice() {
    if (!voices.length) loadVoices();
    var v = voices.filter(function (x) { return x.name === chosenVoice; })[0];
    return v || voices[0] || null;
  }
  function speak(text) {
    if (playRecorded(text)) return;
    speakDevice(text);
  }
  function speakDevice(text) {
    if (!speechOk) return;
    try {
      speechSynthesis.cancel();
      var u = new SpeechSynthesisUtterance(text.replace(/…/g, '').replace(/\s*\/\s*/g, '. '));
      var v = currentVoice();
      if (v) { u.voice = v; u.lang = v.lang; } else u.lang = 'en-US';
      u.rate = 0.95;
      speechSynthesis.speak(u);
    } catch (e) {}
  }
  function speakBtn(text) {
    return canSpeak() ? h('button', { class: 'speak', onclick: function () { speak(text); } }, '🔊 Послушать') : null;
  }



  /* ───────────── Поиск тем ───────────── */
  function sectionOfTopicId(id) {
    return CONTENT.sections.filter(function (s) {
      return s.topics.some(function (t) { return t.id === id; });
    })[0];
  }
  function topicById(id) {
    var found = null;
    CONTENT.sections.forEach(function (s) { s.topics.forEach(function (t) { if (t.id === id) found = t; }); });
    return found;
  }
  function topicSize(topic) {
    return (topic.questions || topic.words || topic.phrases || topic.verbs || []).length;
  }
  function isTenseItem(item) {
    var sec = sectionOfTopicId(item.topicId);
    return !!(sec && sec.multi && item.q.type === 'choice');
  }

  /* ───────────── Генерация вопросов ───────────── */
  // Режим для слов и глаголов: 'choose' — выбирать из вариантов, 'write' — писать самому
  function answerMode(sec) { return localGet('mode_' + sec.id) || 'choose'; }

  function topicItems(topic) {
    var sec = sectionOfTopicId(topic.id);
    var mode = sec ? answerMode(sec) : 'choose';
    if (topic.questions) return topic.questions.map(function (q) {
      if (sec && sec.multi && !q.wk && window.speechKey) q.wk = window.speechKey(q.q);
      return { topicId: topic.id, q: q };
    });
    if (topic.words) return topic.words.map(function (w) { return { topicId: topic.id, q: vocabQuestion(w, topic.words, mode) }; });
    if (topic.phrases) return topic.phrases.map(function (p) { return { topicId: topic.id, q: { type: 'speak', ru: p[0], en: p[1] } }; });
    if (topic.verbs) return topic.verbs.map(function (v) { return { topicId: topic.id, q: verbQuestion(v, topic.verbs, mode) }; });
    return [];
  }
  function buildQuestions(topic) {
    var items = shuffle(topicItems(topic));
    if (isTracked(topic)) {
      // сначала то, что ещё не освоено
      return shuffle(byScore(items).slice(0, 10));
    }
    return items.slice(0, 10);
  }

  // Несколько тем: берём вопросы по очереди из каждой, чтобы всех было поровну
  function buildMixed(topics, n) {
    var pools = topics.map(function (t) { return byScore(shuffle(topicItems(t))); });
    var out = [];
    while (out.length < n && pools.some(function (p) { return p.length; })) {
      pools.forEach(function (p) { if (p.length && out.length < n) out.push(p.shift()); });
    }
    return shuffle(out);
  }

  function vocabQuestion(w, all, mode) {
    var en = w[0], ru = w[1];
    var r = Math.random();
    var explain = en + ' — ' + ru;
    if (mode === 'write') {
      return { type: 'input', q: 'Напишите по-английски: «' + ru + '»', answers: [en], explain: explain, say: en, wk: en };
    }
    if (r < 0.5) {
      var wrongRu = pick(all.map(function (x) { return x[1]; }), 3, [ru]);
      return { type: 'choice', q: 'Как переводится «' + en + '»?', options: [ru].concat(wrongRu), explain: explain, say: en, wk: en };
    }
    {
      var wrongEn = pick(all.map(function (x) { return x[0]; }), 3, [en]);
      return { type: 'choice', q: 'Как по-английски «' + ru + '»?', options: [en].concat(wrongEn), explain: explain, say: en, wk: en };
    }
  }

  function verbQuestion(v, all, mode) {
    var base = v[0], v2 = v[1], v3 = v[2], ru = v[3];
    var askV3 = Math.random() < 0.5;
    var correct = askV3 ? v3 : v2;
    var label = askV3 ? 'Третья форма (V3, для Present Perfect)' : 'Вторая форма (V2, для Past Simple)';
    var explain = base + ' — ' + v2 + ' — ' + v3 + ' (' + ru + ')';
    var say = base + ', ' + v2.replace('/', ', ') + ', ' + v3;
    if (mode === 'write') {
      return { type: 'input', q: label + ' глагола «' + base + '»', hint: ru, answers: correct.split('/').concat([correct]), explain: explain, say: say, wk: base };
    }
    var wrong = [];
    [askV3 ? v2 : v3, base + 'ed', base].forEach(function (x) {
      if (x !== correct && wrong.indexOf(x) === -1) wrong.push(x);
    });
    var others = [];
    all.forEach(function (o) { if (o[0] !== base) others.push(askV3 ? o[2] : o[1]); });
    while (wrong.length < 3 && others.length) {
      var x = others.splice(Math.floor(Math.random() * others.length), 1)[0];
      if (x !== correct && wrong.indexOf(x) === -1) wrong.push(x);
    }
    return { type: 'choice', q: label + ' глагола «' + base + '» (' + ru + ')', options: [correct].concat(wrong.slice(0, 3)), explain: explain, say: say, wk: base };
  }

  /* ───────────── Прогресс ───────────── */
  function record(item, ok) {
    var p = progress[item.topicId] || { best: 0, runs: 0, right: 0, total: 0 };
    p.right = (p.right || 0) + (ok ? 1 : 0);
    p.total = (p.total || 0) + 1;
    progress[item.topicId] = p;
    saveProgress();
  }
  function topicStat(t) {
    if (isTracked(t) && t.questions) {
      var tot = t.questions.length, ok = learnedCount(t), pr = progress[t.id];
      var acc = pr && pr.total ? ' · точность ' + Math.round(pr.right / pr.total * 100) + '%' : '';
      return { text: 'Освоено: ' + ok + ' из ' + tot + acc, pct: Math.round(ok / tot * 100) };
    }
    if (t.words || t.verbs) {
      var total = (t.words || t.verbs).length, got = learnedCount(t);
      return { text: 'Выучено: ' + got + ' из ' + total, pct: Math.round(got / total * 100) };
    }
    var p = progress[t.id];
    if (!p || (!p.total && !p.runs)) return { text: 'Ещё не начато', pct: 0 };
    var acc = p.total ? Math.round(p.right / p.total * 100) : p.best;
    return { text: 'Точность: ' + acc + '% · ответов: ' + (p.total || 0), pct: acc };
  }
  function sectionPercent(sec) {
    var sum = 0;
    sec.topics.forEach(function (t) { sum += topicStat(t).pct; });
    return Math.round(sum / sec.topics.length);
  }

  /* ───────────── Экраны ───────────── */
  function renderHome() {
    if (!localGet('welcomed')) return renderWelcome();
    screen(null);
    var name = inTg && tg.initDataUnsafe && tg.initDataUnsafe.user && tg.initDataUnsafe.user.first_name;
    append(app, h('h1', {}, name ? 'Hi, ' + name + '! 👋' : 'English Practice 👋'));
    append(app, h('p', { class: 'sub' }, 'Выберите, чем заняться сейчас'));
    var list = h('div', { class: 'list' });
    if (homeSupported() && homeStatus !== 'added' && homeStatus !== 'unsupported' && !localGet('home_hide') && !localGet('home_added')) {
      append(list, h('div', { class: 'card home-card' },
        h('div', { class: 'icon' }, '📱'),
        h('div', { class: 'body' },
          h('div', { class: 'title' }, 'Иконка на экране телефона'),
          h('div', { class: 'meta' }, 'Открывайте приложение сразу, без Telegram-чатов'),
          h('div', { class: 'row' },
            h('button', { class: 'btn small', onclick: addHome }, 'Добавить'),
            h('button', { class: 'btn small secondary', onclick: function () { localSet('home_hide', '1'); renderHome(); } }, 'Скрыть')))));
    }
    if (mistakes.length) {
      append(list, h('button', { class: 'card highlight', onclick: startMistakes },
        h('div', { class: 'icon' }, '🩹'),
        h('div', { class: 'body' },
          h('div', { class: 'title' }, 'Работа над ошибками'),
          h('div', { class: 'meta' }, 'Вопросов для повторения: ' + mistakes.length))));
    }
    CONTENT.sections.forEach(function (sec) {
      append(list, h('button', { class: 'card', onclick: function () { renderSection(sec); } },
        h('div', { class: 'icon' }, sec.icon),
        h('div', { class: 'body' },
          h('div', { class: 'title' }, sec.title),
          h('div', { class: 'meta' }, sec.desc + ' · тем: ' + sec.topics.length),
          bar(sectionPercent(sec)))));
    });
    append(app, list);
  }

  // Первый запуск: короткое приветствие и предложение добавить иконку
  function renderWelcome() {
    screen(null);
    append(app, h('div', { class: 'welcome' },
      h('div', { class: 'big' }, '👋'),
      h('h1', {}, 'Привет! Это English Practice'),
      h('p', { class: 'sub' }, 'Тренируйте времена, слова и разговорные фразы по 5 минут в день.')));
    append(app, h('div', { class: 'theory', html:
      '<p>⏳ <b>Времена</b> — отметьте одно или несколько и тренируйтесь вперемешку</p>' +
      '<p>🗣 <b>Фразы</b> — говорите вслух и слушайте живой голос</p>' +
      '<p>📚 <b>Слова</b> — пополняйте словарный запас: выбирайте или пишите сами</p>' +
      '<p>💡 Не знаете слово в предложении? Нажмите на него — появится перевод</p>' +
      '<p>🩹 <b>Ошибки</b> сохраняются — их можно повторить отдельно</p>' }));
    function done() { localSet('welcomed', '1'); renderHome(); }
    if (homeSupported() && homeStatus !== 'added' && homeStatus !== 'unsupported') {
      append(app, h('div', { class: 'theory' },
        h('p', {}, h('b', {}, '📱 Добавьте иконку на экран телефона')),
        h('p', {}, 'Приложение будет открываться сразу, как обычное — без поиска бота в Telegram.')));
      append(app, h('button', { class: 'btn', onclick: function () { addHome(); done(); } }, 'Добавить иконку'));
      append(app, h('button', { class: 'btn secondary', onclick: done }, 'Позже'));
    } else {
      append(app, h('button', { class: 'btn', onclick: done }, 'Начать'));
    }
  }

  function renderSection(sec) {
    if (sec.multi) return renderMultiSection(sec);
    screen(renderHome);
    append(app, h('h2', {}, sec.icon + ' ' + sec.title));
    var list = h('div', { class: 'list' });
    sec.topics.forEach(function (t) {
      var st = topicStat(t);
      append(list, h('button', { class: 'card', onclick: function () { renderIntro(t, sec); } },
        h('div', { class: 'body' },
          h('div', { class: 'title' }, t.title),
          h('div', { class: 'meta' }, st.text),
          bar(st.pct))));
    });
    append(app, list);
  }

  // Раздел с галочками: отмечаете несколько тем и тренируете их вперемешку
  function renderMultiSection(sec) {
    screen(renderHome);
    var sel = selected[sec.id] || [];
    sel = sel.filter(function (id) { return sec.topics.some(function (t) { return t.id === id; }); });

    append(app, h('h2', {}, sec.icon + ' ' + sec.title));
    append(app, h('p', { class: 'sub' }, 'Отметьте одно или несколько времён — упражнения будут вперемешку, а в вариантах ответа будут формы глагола во всех выбранных временах.'));

    var startBtn = h('button', { class: 'btn' });
    var allBtn = h('button', { class: 'link-btn' });
    var list = h('div', { class: 'list' });
    var rows = [];

    function refresh() {
      selected[sec.id] = sel;
      saveSelected();
      rows.forEach(function (r) {
        var on = sel.indexOf(r.t.id) !== -1;
        r.el.classList.toggle('checked', on);
        r.box.textContent = on ? '✓' : '';
      });
      startBtn.disabled = sel.length === 0;
      startBtn.textContent = sel.length === 0 ? 'Выберите хотя бы одно время'
        : sel.length === 1 ? 'Тренировать: ' + topicById(sel[0]).title
        : 'Тренировать вперемешку (' + sel.length + ')';
      allBtn.textContent = sel.length === sec.topics.length ? 'Снять все' : 'Выбрать все';
    }

    sec.topics.forEach(function (t) {
      var st = topicStat(t);
      var box = h('span', { class: 'checkbox' });
      var el = h('div', { class: 'card check-row', onclick: function () {
        var i = sel.indexOf(t.id);
        if (i === -1) sel.push(t.id); else sel.splice(i, 1);
        tap();
        refresh();
      } },
        box,
        h('div', { class: 'body' },
          h('div', { class: 'title' }, t.title),
          h('div', { class: 'meta' }, st.text),
          bar(st.pct)),
        t.theory ? h('button', { class: 'rule-btn', onclick: function (e) {
          e.stopPropagation();
          renderIntro(t, sec);
        } }, 'Правило') : null);
      rows.push({ t: t, el: el, box: box });
      append(list, el);
    });

    allBtn.addEventListener('click', function () {
      sel = sel.length === sec.topics.length ? [] : sec.topics.map(function (t) { return t.id; });
      refresh();
    });
    startBtn.addEventListener('click', function () {
      var topics = sec.topics.filter(function (t) { return sel.indexOf(t.id) !== -1; });
      var ctx = { multi: true, sec: sec, topics: topics };
      startSession(buildMixed(topics, 10), ctx);
    });

    append(app, h('div', { class: 'list-head' }, allBtn));
    append(app, list);
    append(app, h('div', { class: 'sticky' }, startBtn));
    refresh();
  }

  function renderIntro(topic, sec) {
    screen(function () { renderSection(sec); });
    append(app, h('h2', {}, topic.title));
    if (topic.theory) append(app, h('div', { class: 'theory', html: topic.theory }));
    if (topic.desc || topic.tip) append(app, h('div', { class: 'theory' }, topic.desc || topic.tip));
    if (topic.phrases) {
      append(app, h('div', { class: 'theory' },
        'Вы видите фразу на русском → говорите её вслух по-английски → открываете ответ и сверяетесь. Не страшно ошибаться: здесь вас никто не слышит 🙂'));
    }
    if (topic.words || topic.verbs) {
      var mode = answerMode(sec);
      var seg = h('div', { class: 'seg' });
      [['choose', '👆 Выбирать'], ['write', '✍️ Писать']].forEach(function (m) {
        append(seg, h('button', { class: 'seg-btn' + (mode === m[0] ? ' on' : ''), onclick: function () {
          localSet('mode_' + sec.id, m[0]);
          tap();
          renderIntro(topic, sec);
        } }, m[1]));
      });
      append(app, h('div', { class: 'step-title' }, 'Как отвечать'));
      append(app, seg);
    }
    var n = Math.min(10, topicSize(topic));
    if (isTracked(topic)) {
      var got = learnedCount(topic), all = topicSize(topic), isW = !!(topic.words || topic.verbs);
      append(app, h('div', { class: 'learned' },
        h('div', {}, isW ? '📈 Выучено: ' : '📈 Освоено: ', h('b', {}, got + ' из ' + all)),
        bar(Math.round(got / all * 100)),
        h('div', { class: 'meta' }, isW
          ? 'Слово считается выученным после двух верных ответов подряд. В тренировку сначала попадают невыученные.'
          : 'Предложение считается освоенным после двух верных ответов подряд. В тренировку сначала попадают те, где вы ошибаетесь или которые ещё не встречались.')));
    }
    append(app, h('p', { class: 'sub' }, 'Вопросов в тренировке: ' + n));
    append(app, h('button', { class: 'btn', onclick: function () {
      startSession(buildQuestions(topic), { topic: topic, sec: sec });
    } }, sec.multi ? 'Тренировать только это время' : 'Начать'));
  }

  /* ───────────── Тренировка ───────────── */
  var session = null;

  function startSession(items, ctx) {
    session = { items: items, i: 0, correct: 0, wrongItems: [], ctx: ctx };
    renderQuestion();
  }
  function startMistakes() {
    var items = shuffle(mistakes).slice(0, 10).map(function (m) { return { topicId: m.topicId, q: m.q, fromMistakes: true }; });
    startSession(items, { mistakes: true });
  }
  function exitSession() {
    var c = session.ctx;
    if (c.mistakes) renderHome();
    else if (c.multi) renderSection(c.sec);
    else renderIntro(c.topic, c.sec);
  }
  function restartSession() {
    var c = session.ctx;
    if (c.mistakes) startMistakes();
    else if (c.multi) startSession(buildMixed(c.topics, 10), c);
    else startSession(buildQuestions(c.topic), c);
  }

  function mistakeKey(q) { return q.type + '|' + (q.q || q.ru || q.en); }
  function addMistake(item) {
    var key = mistakeKey(item.q);
    if (mistakes.some(function (m) { return mistakeKey(m.q) === key; })) return;
    mistakes.push({ topicId: item.topicId, q: item.q });
    if (mistakes.length > 40) mistakes.shift();
    saveMistakes();
  }
  function removeMistake(item) {
    var key = mistakeKey(item.q);
    var before = mistakes.length;
    mistakes = mistakes.filter(function (m) { return mistakeKey(m.q) !== key; });
    if (mistakes.length !== before) saveMistakes();
  }

  function renderQuestion() {
    var item = session.items[session.i];
    var q = item.q;
    screen(exitSession);
    var total = session.items.length;
    append(app, h('div', { class: 'progress-top' },
      h('span', {}, 'Вопрос ' + (session.i + 1) + ' из ' + total),
      h('span', {}, '✅ ' + session.correct)));
    append(app, bar(Math.round(session.i / total * 100)));

    var area = h('div', {});
    append(app, area);
    if (isTenseItem(item)) renderTense(q, area, item);
    else if (q.type === 'choice') renderChoice(q, area, item);
    else if (q.type === 'input') renderInput(q, area, item);
    else if (q.type === 'order') renderOrder(q, area, item);
    else if (q.type === 'speak') renderSpeak(q, area, item);
  }

  function answered(item, ok, correctText, extra) {
    var q = item.q;
    record(item, ok);
    recordWord(item, ok);
    if (ok) { session.correct++; haptic('success'); if (item.fromMistakes) removeMistake(item); }
    else { haptic('error'); session.wrongItems.push(item); addMistake(item); }

    var last = session.i === session.items.length - 1;
    var fb = h('div', { class: 'feedback ' + (ok ? 'ok' : 'bad') },
      h('b', {}, ok ? '✅ Верно!' : '❌ Неверно'),
      extra || null,
      !extra && !ok && correctText ? h('div', {}, 'Правильно: ', h('strong', {}, correctText)) : null,
      q.explain ? h('div', { class: 'explain' }, q.explain) : null,
      q.say ? speakBtn(q.say) : null);
    var next = h('button', { class: 'btn', onclick: function () {
      session.i++;
      if (last) renderResult(); else renderQuestion();
    } }, last ? 'Посмотреть результат' : 'Дальше');
    append(app, fb);
    append(app, next);
    next.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }

  /* ───────────── Перевод слова по нажатию ───────────── */
  var tipEl = null;
  function closeTip() { if (tipEl) { tipEl.remove(); tipEl = null; } }
  document.addEventListener('click', function (e) {
    if (tipEl && !tipEl.contains(e.target) && !(e.target.classList && e.target.classList.contains('w'))) closeTip();
  });
  window.addEventListener('scroll', closeTip, { passive: true });

  function lookup(word) {
    var g = window.GLOSSARY || {};
    var w = word.toLowerCase().replace(/’/g, "'");
    if (g[w]) return g[w];
    var tries = [w.replace(/'s$/, ''), w.replace(/ies$/, 'y'), w.replace(/es$/, ''), w.replace(/s$/, ''),
      w.replace(/ed$/, ''), w.replace(/ed$/, 'e'), w.replace(/ing$/, ''), w.replace(/ing$/, 'e')];
    for (var i = 0; i < tries.length; i++) if (tries[i] !== w && g[tries[i]]) return g[tries[i]];
    return null;
  }
  function openTranslator(word) {
    var url = 'https://translate.google.com/?sl=en&tl=ru&text=' + encodeURIComponent(word);
    if (inTg && tg.openLink) tg.openLink(url); else window.open(url, '_blank');
  }
  function showTip(span, word) {
    closeTip();
    var tr = lookup(word);
    tipEl = h('div', { class: 'tip-pop' },
      h('div', { class: 'tip-word' }, word),
      tr ? h('div', { class: 'tip-tr' }, tr) : h('div', { class: 'tip-tr muted' }, 'Нет в словарике'),
      h('div', { class: 'tip-actions' },
        canSpeak() ? h('button', { onclick: function () { speak(word); } }, '🔊') : null,
        !tr ? h('button', { onclick: function () { openTranslator(word); } }, 'Открыть переводчик ↗') : null));
    document.body.appendChild(tipEl);
    var r = span.getBoundingClientRect();
    var tw = tipEl.offsetWidth, th = tipEl.offsetHeight;
    var left = Math.min(Math.max(8, r.left + r.width / 2 - tw / 2), window.innerWidth - tw - 8);
    var top = r.top + window.scrollY - th - 8;
    if (top < window.scrollY + 4) { top = r.bottom + window.scrollY + 8; tipEl.classList.add('below'); }
    tipEl.style.left = left + 'px';
    tipEl.style.top = top + 'px';
    tap();
  }
  // Текст → набор слов, на которые можно нажать
  function tappableText(el, text) {
    var re = /a\.m\.|p\.m\.|[A-Za-z]+(?:['’][A-Za-z]+)?/g, last = 0, m;
    while ((m = re.exec(text))) {
      if (m.index > last) append(el, text.slice(last, m.index));
      (function (word) {
        var span = h('span', { class: 'w' }, word);
        span.addEventListener('click', function (e) { e.stopPropagation(); showTip(span, word.replace(/[()]/g, '')); });
        append(el, span);
      })(m[0]);
      last = re.lastIndex;
    }
    if (last < text.length) append(el, text.slice(last));
  }

  /* Формы глагола в разных временах — для смешанных тренировок */
  function conjugate(v, tense) {
    var s = v[0], verb = v[1], neg = !!v[2];
    var f = (window.VERB_FORMS || {})[verb];
    if (verb !== 'be' && !f) return null;
    var be = { '1': 'am', '3': 'is', p: 'are' }, beN = { '1': 'am not', '3': "isn't", p: "aren't" };
    var was = { '1': 'was', '3': 'was', p: 'were' }, wasN = { '1': "wasn't", '3': "wasn't", p: "weren't" };
    var has = { '1': 'have', '3': 'has', p: 'have' }, hasN = { '1': "haven't", '3': "hasn't", p: "haven't" };
    var ing = verb === 'be' ? 'being' : f[1];
    switch (tense) {
      case 'present-simple':
        if (verb === 'be') return (neg ? beN : be)[s];
        return neg ? (s === '3' ? "doesn't " : "don't ") + verb : (s === '3' ? f[0] : verb);
      case 'present-continuous': return (neg ? beN : be)[s] + ' ' + ing;
      case 'past-simple':
        if (verb === 'be') return (neg ? wasN : was)[s];
        return neg ? "didn't " + verb : f[2];
      case 'past-continuous': return (neg ? wasN : was)[s] + ' ' + ing;
      case 'present-perfect': return (neg ? hasN : has)[s] + ' ' + (verb === 'be' ? 'been' : f[3]);
      case 'future': return (neg ? "won't " : 'will ') + verb;
    }
    return null;
  }

  // Варианты-плашки: правильный + формы того же глагола в других выбранных временах
  function wordOptions(item) {
    var q = item.q, c = session.ctx, correct = q.options[0];
    var ids = [];
    if (c.multi && c.topics.length > 1) ids = c.topics.map(function (t) { return t.id; });
    else if (c.mistakes) ids = sectionOfTopicId(item.topicId).topics.map(function (t) { return t.id; });
    if (!q.v || !ids.length) return q.options.slice();
    var forms = [];
    ids.forEach(function (id) {
      if (q.x && q.x.indexOf(id) !== -1) return;   // это время здесь тоже допустимо
      var f = conjugate(q.v, id);
      if (f && f !== correct && forms.indexOf(f) === -1) forms.push(f);
    });
    if (c.mistakes) forms = shuffle(forms).slice(0, 3);
    var fill = q.options.slice(1).filter(function (o) { return forms.indexOf(o) === -1; });
    while (forms.length < 3 && fill.length) forms.push(fill.shift());
    return [correct].concat(forms.slice(0, 5));
  }

  /* Задание на времена: перенести правильное слово в пропуск */
  function renderTense(q, area, item) {
    var correctWord = q.options[0];
    var correctTense = topicById(q.tense || item.topicId);
    var placed = null;
    var locked = false;

    var sentence = h('div', { class: 'question' });
    var gap = h('button', { class: 'gap-slot empty', onclick: function () {
      if (!placed || locked) return;
      placed = null;
      tap();
      drawWords();
    } }, '…');
    String(q.q).split('___').forEach(function (p, i, arr) {
      tappableText(sentence, p);
      if (i < arr.length - 1) append(sentence, gap);
    });
    append(area, sentence);
    append(area, h('div', { class: 'qhint' }, '💡 Нажмите на незнакомое слово — покажу перевод'));

    var wordsEl = h('div', { class: 'chips' });
    var check = h('button', { class: 'btn', disabled: true, onclick: submit }, 'Проверить');
    append(area, h('div', { class: 'step' },
      h('div', { class: 'step-title' }, 'Перенесите правильный вариант в пропуск'),
      wordsEl, check));

    var order = shuffle(wordOptions(item));
    function drawWords() {
      wordsEl.innerHTML = '';
      order.forEach(function (w) {
        var used = placed === w;
        append(wordsEl, h('button', { class: 'chip word' + (used ? ' used' : ''), disabled: used || locked, onclick: function () {
          placed = w;
          tap();
          drawWords();
        } }, w));
      });
      gap.textContent = placed || '…';
      gap.classList.toggle('empty', !placed);
      check.disabled = !placed || locked;
    }
    drawWords();

    function submit() {
      if (!placed || locked) return;
      locked = true;
      gap.disabled = true;
      check.style.display = 'none';
      var ok = placed === correctWord;
      gap.classList.add(ok ? 'correct' : 'wrong');
      drawWords();
      var extra = [
        !ok ? h('div', {}, 'Правильно: ', h('strong', {}, correctWord)) : null,
        h('div', {}, '🕐 Время: ', h('strong', {}, correctTense.title))
      ];
      item.q.say = q.q.replace('___', correctWord).replace(/\s*\([^)]*\)/g, '');
      answered(item, ok, correctWord, extra);
    }
  }

  function renderChoice(q, area, item) {
    append(area, questionText(q.q));
    if (q.hint) append(area, h('div', { class: 'qhint' }, q.hint));
    var correct = q.options[0];
    var box = h('div', { class: 'options' });
    var buttons = [];
    shuffle(q.options).forEach(function (opt) {
      var b = h('button', { class: 'opt', onclick: function () {
        buttons.forEach(function (x) {
          x.disabled = true;
          if (x.textContent === correct) x.classList.add('correct');
        });
        var ok = opt === correct;
        if (!ok) b.classList.add('wrong');
        answered(item, ok, correct);
      } }, opt);
      buttons.push(b);
      append(box, b);
    });
    append(area, box);
  }

  function renderInput(q, area, item) {
    append(area, questionText(q.q));
    if (q.hint) append(area, h('div', { class: 'qhint' }, q.hint));
    var input = h('input', { class: 'input', type: 'text', placeholder: 'Ваш ответ', autocomplete: 'off', autocapitalize: 'off', spellcheck: 'false' });
    var done = false;
    var check = h('button', { class: 'btn', onclick: submit }, 'Не знаю — показать ответ');
    function refreshBtn() {
      check.textContent = input.value.trim() ? 'Проверить' : 'Не знаю — показать ответ';
      check.classList.toggle('secondary', !input.value.trim());
    }
    function submit() {
      if (done) return;
      done = true;
      input.disabled = true;
      check.style.display = 'none';
      var empty = !input.value.trim();
      var user = normalize(input.value);
      var ok = !empty && q.answers.some(function (a) { return normalize(a) === user; });
      input.style.borderColor = ok ? 'var(--ok)' : 'var(--bad)';
      if (empty) input.placeholder = 'Без ответа';
      answered(item, ok, q.answers[0]);
    }
    input.addEventListener('input', refreshBtn);
    input.addEventListener('keydown', function (e) { if (e.key === 'Enter') submit(); });
    refreshBtn();
    append(area, input);
    append(area, check);
    setTimeout(function () { input.focus(); }, 100);
  }

  /* Собрать предложение: слова можно нажимать (встают в конец) или перетаскивать
     в любое место предложения, а внутри предложения — переставлять */
  function renderOrder(q, area, item) {
    append(area, h('div', { class: 'question' }, q.ru));
    append(area, h('div', { class: 'qhint' }, 'Нажмите на слово или перетащите его в нужное место. Порядок в предложении тоже можно менять перетаскиванием.'));
    var words = q.en.split(' ');
    var tokens = words.map(function (w, i) { return { w: w, id: i }; });
    var chosen = [];
    var pool = shuffle(tokens);
    if (pool.map(function (t) { return t.w; }).join(' ') === q.en && tokens.length > 1) pool.reverse();
    var locked = false;
    var answerEl = h('div', { class: 'answer-area' });
    var poolEl = h('div', { class: 'pool' });
    var caret = h('span', { class: 'caret' });
    var check = h('button', { class: 'btn', disabled: true, onclick: function () {
      locked = true;
      var built = chosen.map(function (t) { return t.w; }).join(' ');
      var ok = normalize(built) === normalize(q.en);
      check.style.display = 'none';
      answerEl.style.borderColor = ok ? 'var(--ok)' : 'var(--bad)';
      Array.prototype.forEach.call(area.querySelectorAll('.token'), function (b) { b.disabled = true; });
      item.q.say = q.en;
      answered(item, ok, q.en);
    } }, 'Проверить');

    function tapMove(t, from) {
      if (from === 'pool') { pool.splice(pool.indexOf(t), 1); chosen.push(t); }
      else { chosen.splice(chosen.indexOf(t), 1); pool.push(t); }
      tap();
      draw();
    }

    function inside(el, x, y, pad) {
      var r = el.getBoundingClientRect();
      return x >= r.left - pad && x <= r.right + pad && y >= r.top - pad && y <= r.bottom + pad;
    }
    // Куда вставить слово: индекс среди слов предложения (без перетаскиваемого)
    function dropIndex(x, y, skipEl) {
      var els = Array.prototype.filter.call(answerEl.querySelectorAll('.token'), function (e) { return e !== skipEl; });
      for (var i = 0; i < els.length; i++) {
        var r = els[i].getBoundingClientRect();
        if (y < r.top) return i;
        if (y <= r.bottom && x < r.left + r.width / 2) return i;
      }
      return els.length;
    }
    function showCaret(idx, skipEl) {
      var els = Array.prototype.filter.call(answerEl.querySelectorAll('.token'), function (e) { return e !== skipEl; });
      if (idx < els.length) answerEl.insertBefore(caret, els[idx]); else answerEl.appendChild(caret);
    }
    function hideCaret() { if (caret.parentNode) caret.parentNode.removeChild(caret); }

    function makeToken(t, from) {
      var btn = h('button', { class: 'token' }, t.w);
      btn.addEventListener('pointerdown', function (e) {
        if (locked || (e.button !== undefined && e.button !== 0)) return;
        e.preventDefault();
        var st = { x: e.clientX, y: e.clientY, moved: false, ghost: null, ox: 0, oy: 0 };
        try { btn.setPointerCapture(e.pointerId); } catch (err) {}
        function move(ev) {
          if (!st.moved) {
            if (Math.abs(ev.clientX - st.x) + Math.abs(ev.clientY - st.y) < 8) return;
            st.moved = true;
            var r = btn.getBoundingClientRect();
            st.ox = st.x - r.left; st.oy = st.y - r.top;
            st.ghost = btn.cloneNode(true);
            st.ghost.className = 'token ghost';
            st.ghost.style.width = r.width + 'px';
            document.body.appendChild(st.ghost);
            btn.classList.add('dragging');
            tap();
          }
          st.ghost.style.left = (ev.clientX - st.ox) + 'px';
          st.ghost.style.top = (ev.clientY - st.oy) + 'px';
          if (inside(answerEl, ev.clientX, ev.clientY, 24)) {
            answerEl.classList.add('over');
            showCaret(dropIndex(ev.clientX, ev.clientY, btn), btn);
          } else {
            answerEl.classList.remove('over');
            hideCaret();
          }
        }
        function end(ev, cancelled) {
          btn.removeEventListener('pointermove', move);
          btn.removeEventListener('pointerup', up);
          btn.removeEventListener('pointercancel', cancel);
          if (st.ghost) st.ghost.remove();
          answerEl.classList.remove('over');
          if (!st.moved) { hideCaret(); if (!cancelled) tapMove(t, from); return; }
          var x = ev.clientX, y = ev.clientY;
          if (!cancelled && inside(answerEl, x, y, 24)) {
            var idx = dropIndex(x, y, btn);
            if (from === 'pool') pool.splice(pool.indexOf(t), 1); else chosen.splice(chosen.indexOf(t), 1);
            chosen.splice(idx, 0, t);
            tap();
          } else if (!cancelled && from === 'answer' && inside(poolEl, x, y, 40)) {
            chosen.splice(chosen.indexOf(t), 1);
            pool.push(t);
            tap();
          }
          hideCaret();
          draw();
        }
        function up(ev) { end(ev, false); }
        function cancel(ev) { end(ev, true); }
        btn.addEventListener('pointermove', move);
        btn.addEventListener('pointerup', up);
        btn.addEventListener('pointercancel', cancel);
      });
      return btn;
    }

    function draw() {
      answerEl.innerHTML = '';
      poolEl.innerHTML = '';
      if (!chosen.length) append(answerEl, h('span', { class: 'answer-ph' }, 'Перетащите или нажмите слова'));
      chosen.forEach(function (t) { append(answerEl, makeToken(t, 'answer')); });
      pool.forEach(function (t) { append(poolEl, makeToken(t, 'pool')); });
      check.disabled = pool.length > 0;
    }
    draw();
    append(area, answerEl, poolEl, check);
  }

  function renderSpeak(q, area, item) {
    var card = h('div', { class: 'flash' },
      h('div', { class: 'ru' }, q.ru),
      h('div', { class: 'tip' }, 'Скажите это вслух по-английски 🗣'));
    append(area, card);
    var show = h('button', { class: 'btn', onclick: function () {
      show.style.display = 'none';
      append(card, h('div', { class: 'en' }, q.en), speakBtn(q.en));
      speak(q.en);
      var row = h('div', { class: 'row' },
        h('button', { class: 'btn secondary', onclick: function () { rate(false); } }, '🔁 Ещё учу'),
        h('button', { class: 'btn', onclick: function () { rate(true); } }, '✅ Сказал(а)'));
      append(area, row);
      function rate(ok) {
        row.remove();
        record(item, ok);
        session.i++;
        if (ok) { session.correct++; haptic('success'); if (item.fromMistakes) removeMistake(item); }
        else { haptic('warning'); session.wrongItems.push(item); addMistake(item); }
        if (session.i >= session.items.length) renderResult(); else renderQuestion();
      }
    } }, 'Показать ответ');
    append(area, show);
  }

  function renderResult() {
    var c = session.ctx;
    var total = session.items.length;
    var pct = total ? Math.round(session.correct / total * 100) : 0;
    if (c.topic) {
      var p = progress[c.topic.id] || { best: 0, runs: 0, right: 0, total: 0 };
      p.best = Math.max(p.best || 0, pct);
      p.runs = (p.runs || 0) + 1;
      progress[c.topic.id] = p;
      saveProgress();
    }
    screen(c.mistakes ? renderHome : function () { renderSection(c.sec); });
    var emoji = pct >= 90 ? '🏆' : pct >= 70 ? '🎉' : pct >= 40 ? '💪' : '🌱';
    var msg = pct >= 90 ? 'Отлично! Почти без ошибок.'
      : pct >= 70 ? 'Хороший результат!'
      : pct >= 40 ? 'Неплохо, ещё пара тренировок — и будет лучше.'
      : 'Начало положено. Ошибки сохранены — повторите их позже.';
    append(app, h('div', { class: 'result' },
      h('div', { class: 'big' }, emoji),
      h('div', { class: 'score' }, session.correct + ' из ' + total),
      h('p', { class: 'sub' }, msg)));
    var wrong = session.wrongItems;
    append(app, h('button', { class: 'btn', onclick: restartSession }, c.mistakes ? 'Повторить ещё' : 'Ещё раз'));
    if (wrong.length && !c.mistakes) {
      append(app, h('button', { class: 'btn secondary', onclick: function () {
        var items = shuffle(wrong).map(function (it) { return { topicId: it.topicId, q: it.q, fromMistakes: true }; });
        startSession(items, c);
      } }, 'Повторить ошибки (' + wrong.length + ')'));
    }
    append(app, h('button', { class: 'btn secondary', onclick: renderHome }, 'На главную'));
  }

  /* ───────────── Старт ───────────── */
  var wt = wordTopics();
  Promise.all([storeGet('progress'), storeGet('mistakes'), storeGet('selected')].concat(
    wt.map(function (t) { return storeGet('w_' + t.id); })
  )).then(function (vals) {
    wt.forEach(function (t, i) {
      try { wordStats[t.id] = JSON.parse(vals[3 + i]) || {}; } catch (e) { wordStats[t.id] = {}; }
    });
    try { progress = JSON.parse(vals[0]) || {}; } catch (e) { progress = {}; }
    try { mistakes = JSON.parse(vals[1]) || []; } catch (e) { mistakes = []; }
    try { selected = JSON.parse(vals[2]) || {}; } catch (e) { selected = {}; }
    checkHome(renderHome);
  });
})();
