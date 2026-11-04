(function () {
  'use strict';

  /* ───────────── Telegram ───────────── */
  var tg = window.Telegram && window.Telegram.WebApp;
  var inTg = !!(tg && tg.platform && tg.platform !== 'unknown');
  if (inTg) {
    tg.ready();
    tg.expand();
    document.body.classList.add('in-tg');
    tg.BackButton.onClick(function () { if (backAction) backAction(); });
  }
  function haptic(kind) {
    try { if (inTg && tg.HapticFeedback) tg.HapticFeedback.notificationOccurred(kind); } catch (e) {}
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
  var chosenVoice = localGet('voice') || 'neural';

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

  function renderVoices() {
    screen(renderHome);
    loadVoices();
    append(app, h('h2', {}, '🔊 Голос для озвучки'));
    append(app, h('p', { class: 'sub' }, 'Нажмите на голос, чтобы послушать и выбрать.'));
    var list = h('div', { class: 'list' });
    var neuralOn = chosenVoice === 'neural';
    append(list, h('button', { class: 'card' + (neuralOn ? ' highlight' : ''), onclick: function () {
      chosenVoice = 'neural';
      localSet('voice', 'neural');
      speak("Hi! I'm going to help you practise your English.");
      renderVoices();
    } },
      h('div', { class: 'icon' }, '🎙'),
      h('div', { class: 'body' },
        h('div', { class: 'title' }, 'Живой голос (рекомендуется)'),
        h('div', { class: 'meta' }, audioCount
          ? 'Нейросетевая запись · озвучено фраз: ' + audioCount
          : 'Записи ещё готовятся — пока будет голос устройства'))));
    if (!speechOk || !voices.length) {
      append(app, list);
      return;
    }
    append(list, h('div', { class: 'list-label' }, 'Голоса вашего устройства'));
    var cur = neuralOn ? null : currentVoice();
    voices.forEach(function (v, i) {
      append(list, h('button', { class: 'card' + (cur && v.name === cur.name ? ' highlight' : ''), onclick: function () {
        chosenVoice = v.name;
        localSet('voice', v.name);
        speak("Hi! I'm going to help you practise your English.");
        renderVoices();
      } },
        h('div', { class: 'body' },
          h('div', { class: 'title' }, v.name),
          h('div', { class: 'meta' }, v.lang + (v.localService ? '' : ' · онлайн')))));
    });
    append(app, list);
    append(app, h('div', { class: 'theory', style: 'margin-top:16px', html:
      '<p><b>Как получить голос получше</b></p>' +
      '<p>📱 iPhone: Настройки → Универсальный доступ → Устный контент → Голоса → Английский → скачайте голос с пометкой «Улучшенный» или «Премиум» (например, Ava или Zoe).</p>' +
      '<p>🤖 Android: Настройки → Специальные возможности → Синтез речи → Google → Установить голосовые данные → English.</p>' +
      '<p>После этого вернитесь сюда — новый голос появится в списке.</p>' }));
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
  function topicItems(topic) {
    if (topic.questions) return topic.questions.map(function (q) { return { topicId: topic.id, q: q }; });
    if (topic.words) return topic.words.map(function (w) { return { topicId: topic.id, q: vocabQuestion(w, topic.words) }; });
    if (topic.phrases) return topic.phrases.map(function (p) { return { topicId: topic.id, q: { type: 'speak', ru: p[0], en: p[1] } }; });
    if (topic.verbs) return topic.verbs.map(function (v) { return { topicId: topic.id, q: verbQuestion(v, topic.verbs) }; });
    return [];
  }
  function buildQuestions(topic) { return shuffle(topicItems(topic)).slice(0, 10); }

  // Несколько тем: берём вопросы по очереди из каждой, чтобы всех было поровну
  function buildMixed(topics, n) {
    var pools = topics.map(function (t) { return shuffle(topicItems(t)); });
    var out = [];
    while (out.length < n && pools.some(function (p) { return p.length; })) {
      pools.forEach(function (p) { if (p.length && out.length < n) out.push(p.shift()); });
    }
    return shuffle(out);
  }

  function vocabQuestion(w, all) {
    var en = w[0], ru = w[1];
    var r = Math.random();
    var explain = en + ' — ' + ru;
    if (r < 0.4) {
      var wrongRu = pick(all.map(function (x) { return x[1]; }), 3, [ru]);
      return { type: 'choice', q: 'Как переводится «' + en + '»?', options: [ru].concat(wrongRu), explain: explain, say: en };
    }
    if (r < 0.8) {
      var wrongEn = pick(all.map(function (x) { return x[0]; }), 3, [en]);
      return { type: 'choice', q: 'Как по-английски «' + ru + '»?', options: [en].concat(wrongEn), explain: explain, say: en };
    }
    return { type: 'input', q: 'Напишите по-английски: «' + ru + '»', answers: [en], explain: explain, say: en };
  }

  function verbQuestion(v, all) {
    var base = v[0], v2 = v[1], v3 = v[2], ru = v[3];
    var askV3 = Math.random() < 0.5;
    var correct = askV3 ? v3 : v2;
    var label = askV3 ? 'Третья форма (V3, для Present Perfect)' : 'Вторая форма (V2, для Past Simple)';
    var explain = base + ' — ' + v2 + ' — ' + v3 + ' (' + ru + ')';
    var say = base + ', ' + v2.replace('/', ', ') + ', ' + v3;
    if (Math.random() < 0.3) {
      return { type: 'input', q: label + ' глагола «' + base + '»', hint: ru, answers: correct.split('/').concat([correct]), explain: explain, say: say };
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
    return { type: 'choice', q: label + ' глагола «' + base + '» (' + ru + ')', options: [correct].concat(wrong.slice(0, 3)), explain: explain, say: say };
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
    screen(null);
    var name = inTg && tg.initDataUnsafe && tg.initDataUnsafe.user && tg.initDataUnsafe.user.first_name;
    append(app, h('h1', {}, name ? 'Hi, ' + name + '! 👋' : 'English Practice 👋'));
    append(app, h('p', { class: 'sub' }, 'Выберите, чем заняться сейчас'));
    var list = h('div', { class: 'list' });
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
    {
      append(list, h('button', { class: 'card', onclick: renderVoices },
        h('div', { class: 'icon' }, '🔊'),
        h('div', { class: 'body' },
          h('div', { class: 'title' }, 'Голос для озвучки'),
          h('div', { class: 'meta' }, chosenVoice === 'neural' ? 'Живой голос' : (currentVoice() ? currentVoice().name : 'Выбрать голос')))));
    }
    append(app, list);
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
    var n = Math.min(10, topicSize(topic));
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
    var check = h('button', { class: 'btn', onclick: submit }, 'Проверить');
    function submit() {
      if (done || !input.value.trim()) return;
      done = true;
      input.disabled = true;
      check.style.display = 'none';
      var user = normalize(input.value);
      var ok = q.answers.some(function (a) { return normalize(a) === user; });
      input.style.borderColor = ok ? 'var(--ok)' : 'var(--bad)';
      answered(item, ok, q.answers[0]);
    }
    input.addEventListener('keydown', function (e) { if (e.key === 'Enter') submit(); });
    append(area, input);
    append(area, check);
    setTimeout(function () { input.focus(); }, 100);
  }

  function renderOrder(q, area, item) {
    append(area, h('div', { class: 'question' }, q.ru));
    append(area, h('div', { class: 'qhint' }, 'Нажимайте на слова по порядку'));
    var words = q.en.split(' ');
    var tokens = words.map(function (w, i) { return { w: w, id: i }; });
    var chosen = [];
    var pool = shuffle(tokens);
    if (pool.map(function (t) { return t.w; }).join(' ') === q.en && tokens.length > 1) pool.reverse();
    var answerEl = h('div', { class: 'answer-area' });
    var poolEl = h('div', { class: 'pool' });
    var check = h('button', { class: 'btn', disabled: true, onclick: function () {
      var built = chosen.map(function (t) { return t.w; }).join(' ');
      var ok = normalize(built) === normalize(q.en);
      check.style.display = 'none';
      answerEl.style.borderColor = ok ? 'var(--ok)' : 'var(--bad)';
      Array.prototype.forEach.call(app.querySelectorAll('.token'), function (b) { b.disabled = true; });
      item.q.say = q.en;
      answered(item, ok, q.en);
    } }, 'Проверить');

    function draw() {
      answerEl.innerHTML = '';
      poolEl.innerHTML = '';
      chosen.forEach(function (t) {
        append(answerEl, h('button', { class: 'token', onclick: function () {
          chosen.splice(chosen.indexOf(t), 1); pool.push(t); tap(); draw();
        } }, t.w));
      });
      pool.forEach(function (t) {
        append(poolEl, h('button', { class: 'token', onclick: function () {
          pool.splice(pool.indexOf(t), 1); chosen.push(t); tap(); draw();
        } }, t.w));
      });
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
  Promise.all([storeGet('progress'), storeGet('mistakes'), storeGet('selected')]).then(function (vals) {
    try { progress = JSON.parse(vals[0]) || {}; } catch (e) { progress = {}; }
    try { mistakes = JSON.parse(vals[1]) || []; } catch (e) { mistakes = []; }
    try { selected = JSON.parse(vals[2]) || {}; } catch (e) { selected = {}; }
    renderHome();
  });
})();
