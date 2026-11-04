/*
  ВСЕ УПРАЖНЕНИЯ ПРИЛОЖЕНИЯ.
  Чтобы добавить своё упражнение, скопируйте похожую строку и поменяйте текст.

  Типы вопросов:
    choice — выбор варианта. ПЕРВЫЙ вариант в options всегда правильный
             (при показе варианты перемешиваются).
             { type: 'choice', q: 'She ___ to work.', options: ['goes', 'go', 'going'], explain: 'Пояснение' }
    input  — нужно вписать ответ. answers — все допустимые варианты.
             { type: 'input', q: 'They ___ (live) in Moscow.', answers: ['live'], explain: '...' }
    order  — собрать предложение из слов.
             { type: 'order', ru: 'Подсказка на русском', en: 'Correct sentence.' }

  Темы, где вместо questions указано:
    words:   [['english', 'русский'], ...]    — вопросы на перевод создаются сами
    phrases: [['русская фраза', 'English phrase'], ...] — карточки «скажи вслух»
    verbs:   [['go', 'went', 'gone', 'идти'], ...]  — неправильные глаголы
    multi: true у раздела — темы можно отмечать галочками и тренировать вперемешку
    v: ['3', 'cook'] у вопроса — кто (1 = I, 3 = he/she/it, p = you/we/they), глагол, 1 = отрицание.
           Тогда при смешивании времён в варианты добавятся формы этого глагола в выбранных временах.
           Глагол должен быть в списке VERB_FORMS в конце файла.
    x: ['past-simple'] — времена, которые в этом предложении ТОЖЕ допустимы (их формы не покажутся как неверные)
    tense: 'past-simple' у вопроса — если ответ в другом времени, чем тема
*/
window.CONTENT = {
  sections: [
    /* ───────────────────────── ВРЕМЕНА ───────────────────────── */
    {
      id: 'tenses', icon: '⏳', title: 'Времена', desc: 'Можно смешивать несколько', multi: true,
      topics: [
        {
          id: 'present-simple', title: 'Present Simple',
          theory: `
            <p>Привычки, регулярные действия, факты.</p>
            <p><b>+</b> I / you / we / they <b>work</b> · he / she / it <b>works</b></p>
            <p><b>−</b> I <b>don't</b> work · he <b>doesn't</b> work</p>
            <p><b>?</b> <b>Do</b> you work? · <b>Does</b> she work?</p>
            <p>Маркеры: always, usually, often, sometimes, never, every day</p>
            <p class="ex">She usually drinks tea in the morning.</p>`,
          questions: [
            { type: 'choice', v: ['3','go'], x: ['past-simple', 'past-continuous', 'future'], q: 'She ___ to work every day.', options: ['goes', 'go', 'is going', 'going'], explain: 'he/she/it → глагол + s. «Every day» — регулярное действие.' },
            { type: 'choice', q: '___ you like coffee?', options: ['Do', 'Does', 'Are', 'Is'], explain: 'Вопрос с you → Do.' },
            { type: 'choice', v: ['3','boil'], x: ['future'], q: 'Water ___ at 100 degrees Celsius.', options: ['boils', 'boil', 'is boiling', 'boiling'], explain: 'Научный факт → Present Simple, it → boils.' },
            { type: 'choice', q: 'My brother ___ meat.', options: ["doesn't eat", "don't eat", "isn't eat", 'not eats'], explain: 'Отрицание с he/she/it → doesn\'t + глагол без s.' },
            { type: 'choice', v: ['p','have'], x: ['past-simple', 'past-continuous', 'future'], q: 'We usually ___ dinner at 7 p.m.', options: ['have', 'has', 'are having', 'having'], explain: 'We → глагол без s. «Usually» — маркер Present Simple.' },
            { type: 'choice', q: '___ he speak French?', options: ['Does', 'Do', 'Is', 'Has'], explain: 'Вопрос с he → Does, а глагол без s: Does he speak…?' },
            { type: 'choice', v: ['3','leave'], x: ['past-simple', 'past-continuous', 'future'], q: 'The train ___ at 8:15 every morning.', options: ['leaves', 'leave', 'is leaving', 'left'], explain: 'Расписание → Present Simple.' },
            { type: 'choice', v: ['p','live'], x: ['past-simple','past-continuous'], q: 'They usually ___ (live) in Moscow in winter, but now they are in Sochi.', options: ['live', 'lives', 'is living', 'living'], explain: 'They → глагол без изменений.' },
            { type: 'choice', v: ['3','watch'], x: ['past-simple', 'past-continuous', 'future'], q: 'He ___ (watch) TV every evening.', options: ['watches', 'watchs', 'watch', 'is watch'], explain: 'После -ch, -sh, -s, -x добавляем -es: watches.' },
            { type: 'choice', v: ['3','rain',1], x: ['past-simple','past-continuous','future'], q: 'It ___ (not / rain) much here in summer, so we often go to the beach.', options: ["doesn't rain", "don't rain", "doesn't rains", "isn't rain"], explain: 'It → doesn\'t + глагол.' },
            { type: 'choice', q: 'My mother ___ (study) English on Mondays.', options: ['studies', 'studys', 'study', 'is study'], explain: 'Согласная + y → ies: study → studies.' }
          ]
        },
        {
          id: 'present-continuous', title: 'Present Continuous',
          theory: `
            <p>Действие происходит <b>прямо сейчас</b> или в текущий период; также договорённости на будущее.</p>
            <p><b>am / is / are + глагол-ing</b></p>
            <p><b>+</b> I <b>am reading</b> · she <b>is reading</b> · they <b>are reading</b></p>
            <p><b>−</b> I'm <b>not</b> reading · he <b>isn't</b> reading</p>
            <p><b>?</b> <b>Are</b> you reading? · <b>Is</b> he reading?</p>
            <p>Маркеры: now, right now, at the moment, Look!, Listen!</p>
            <p class="ex">Look! It is raining.</p>`,
          questions: [
            { type: 'choice', v: ['3','rain'], x: ['present-perfect'], q: 'Look! It ___.', options: ['is raining', 'rains', 'rain', 'was raining'], explain: '«Look!» — происходит прямо сейчас.' },
            { type: 'choice', v: ['1','read'], q: 'I ___ a book right now.', options: ['am reading', 'read', 'reads', 'is reading'], explain: 'I → am + ing.' },
            { type: 'choice', v: ['p','watch',1], q: 'They ___ TV at the moment.', options: ["aren't watching", "don't watch", "isn't watching", 'not watching'], explain: 'They → are not (aren\'t) + ing.' },
            { type: 'choice', q: 'What ___ she doing now?', options: ['is', 'does', 'are', 'do'], explain: 'She → is: What is she doing?' },
            { type: 'choice', v: ['3','play'], q: 'Listen! Somebody ___ the piano.', options: ['is playing', 'plays', 'play', 'played'], explain: '«Listen!» — действие в момент речи.' },
            { type: 'choice', q: 'We ___ to Paris tomorrow. We have the tickets.', options: ['are flying', 'fly', 'flies', 'flew'], explain: 'Договорённость на ближайшее будущее → Present Continuous.' },
            { type: 'choice', v: ['1','look'], q: 'I ___ for a new job these days.', options: ['am looking', 'look', 'looks', 'looked'], explain: '«These days» — временный текущий период.' },
            { type: 'choice', v: ['3','cook'], x: ['present-perfect'], q: 'She ___ (cook) dinner now.', options: ['is cooking', 'cooks', 'cooking', 'is cook'], explain: 'She → is + cooking.' },
            { type: 'choice', v: ['p','wait'], q: 'They ___ (wait) for the bus at the moment.', options: ['are waiting', 'wait', 'is waiting', 'waiting'], explain: 'They → are + waiting.' },
            { type: 'choice', v: ['1','work',1], q: "I ___ (not / work) at the moment, I'm on holiday.", options: ['am not working', "doesn't work", 'not working', "isn't working"], explain: 'I → am not + working.' }
          ]
        },
        {
          id: 'past-simple', title: 'Past Simple',
          theory: `
            <p>Законченное действие в прошлом (вчера, год назад, в 2019).</p>
            <p><b>+</b> правильные: work → <b>worked</b> · неправильные: go → <b>went</b></p>
            <p><b>−</b> I <b>didn't</b> go (глагол в начальной форме!)</p>
            <p><b>?</b> <b>Did</b> you go?</p>
            <p>Маркеры: yesterday, last week, ago, in 2019, when…</p>
            <p class="ex">I went to the cinema yesterday.</p>`,
          questions: [
            { type: 'choice', v: ['1','go'], x: ['past-continuous'], q: 'I ___ to the cinema yesterday.', options: ['went', 'go', 'goes', 'have gone'], explain: '«Yesterday» → Past Simple. go → went.' },
            { type: 'choice', v: ['3','like',1], q: 'She ___ the film last night.', options: ["didn't like", "doesn't like", "didn't liked", 'not liked'], explain: 'После didn\'t глагол в начальной форме: didn\'t like.' },
            { type: 'choice', q: '___ you see Tom last week?', options: ['Did', 'Do', 'Were', 'Have'], explain: 'Вопрос в прошлом → Did.' },
            { type: 'choice', v: ['p','live'], x: ['past-continuous'], q: 'We ___ in London in 2019.', options: ['lived', 'live', 'have lived', 'are living'], explain: 'Конкретный год в прошлом → Past Simple.' },
            { type: 'choice', v: ['3','lose'], q: 'He ___ his keys an hour ago.', options: ['lost', 'has lost', 'loses', 'lose'], explain: '«Ago» → Past Simple.' },
            { type: 'choice', q: 'When ___ you arrive?', options: ['did', 'do', 'have', 'were'], explain: '«When» о прошлом → did.' },
            { type: 'choice', v: ['p','buy'], x: ['past-continuous'], q: 'They ___ (buy) a new car last month.', options: ['bought', 'buyed', 'buy', 'have bought'], explain: 'buy — bought — bought.' },
            { type: 'choice', v: ['1','see',1], q: 'I ___ (not / see) him yesterday.', options: ["didn't see", "didn't saw", "don't see", 'not saw'], explain: 'didn\'t + see (не saw!).' },
            { type: 'choice', v: ['3','write'], x: ['past-continuous'], q: 'She ___ (write) a letter two days ago.', options: ['wrote', 'writed', 'written', 'has written'], explain: 'write — wrote — written.' },
            { type: 'choice', v: ['p','stay'], x: ['past-continuous'], q: 'We ___ (stay) at home last weekend.', options: ['stayed', 'staied', 'stay', 'have stayed'], explain: 'Правильный глагол: stay + ed.' }
          ]
        },
        {
          id: 'past-continuous', title: 'Past Continuous',
          theory: `
            <p>Действие <b>длилось</b> в определённый момент в прошлом, часто — когда его прервало другое.</p>
            <p><b>was / were + глагол-ing</b></p>
            <p>I / he / she / it <b>was</b> · you / we / they <b>were</b></p>
            <p class="ex">I was watching TV when the phone rang.</p>
            <p>Длинное действие → Past Continuous, короткое «перебившее» → Past Simple.</p>`,
          questions: [
            { type: 'choice', v: ['1','watch'], q: 'I ___ TV when the phone rang.', options: ['was watching', 'watched', 'were watching', 'am watching'], explain: 'Длительное действие, которое прервали → was + ing.' },
            { type: 'choice', v: ['p','play'], x: ['past-simple'], q: 'They ___ football at 5 p.m. yesterday.', options: ['were playing', 'was playing', 'are playing', 'play'], explain: 'Конкретный момент в прошлом, they → were.' },
            { type: 'choice', q: 'What ___ you doing at 8 last night?', options: ['were', 'was', 'did', 'are'], explain: 'You → were.' },
            { type: 'choice', v: ['3','walk'], x: ['past-simple'], q: 'While she ___ home, it started to rain.', options: ['was walking', 'walked', 'walks', 'were walking'], explain: '«While» + длительное действие.' },
            { type: 'choice', tense: 'past-simple', v: ['1','call'], x: ['past-continuous'], q: 'He was sleeping when I ___.', options: ['called', 'was calling', 'call', 'calls'], explain: 'Короткое действие, которое прервало сон → Past Simple.' },
            { type: 'choice', v: ['p','sleep'], q: 'We ___ (sleep) when he arrived.', options: ['were sleeping', 'was sleeping', 'slept', 'are sleeping'], explain: 'We → were + sleeping.' },
            { type: 'choice', v: ['3','snow'], x: ['past-simple'], q: 'At 9 a.m. yesterday it ___ (snow).', options: ['was snowing', 'were snowing', 'is snowing', 'snowing'], explain: 'Процесс в конкретный момент прошлого → was snowing.' }
          ]
        },
        {
          id: 'present-perfect', title: 'Present Perfect',
          theory: `
            <p>Важен <b>результат</b> или опыт к настоящему моменту; время не указано.</p>
            <p><b>have / has + V3</b> (третья форма)</p>
            <p><b>+</b> I <b>have seen</b> · she <b>has seen</b></p>
            <p><b>−</b> I <b>haven't</b> seen · he <b>hasn't</b> seen</p>
            <p><b>?</b> <b>Have</b> you ever seen…?</p>
            <p>Маркеры: ever, never, already, just, yet, since, for</p>
            <p>⚠️ Есть конкретное время (yesterday, ago) → Past Simple.</p>`,
          questions: [
            { type: 'choice', v: ['1','see'], x: ['past-simple'], q: 'I ___ this film before.', options: ['have seen', 'saw', 'see', 'has seen'], explain: 'Опыт без конкретного времени → have + V3.' },
            { type: 'choice', v: ['3','be'], q: 'She ___ to Japan three times.', options: ['has been', 'have been', 'is', 'goes'], explain: 'Опыт в жизни, she → has been.' },
            { type: 'choice', q: '___ you ever eaten sushi?', options: ['Have', 'Did', 'Has', 'Do'], explain: '«Ever» → Present Perfect, you → Have.' },
            { type: 'choice', v: ['p','finish',1], x: ['past-simple'], q: "They ___ their homework yet.", options: ["haven't finished", "didn't finish", "don't finish", "hasn't finished"], explain: '«Yet» в отрицании → haven\'t + V3.' },
            { type: 'choice', v: ['p','live'], q: 'We ___ here since 2020.', options: ['have lived', 'live', 'lived', 'are living'], explain: '«Since» — с какого-то момента до сейчас → Present Perfect.' },
            { type: 'choice', q: "I've just ___ lunch.", options: ['had', 'have', 'having', 'has'], explain: 'После have нужна третья форма: have — had — had.' },
            { type: 'choice', tense: 'past-simple', v: ['1','see'], x: ['past-continuous'], q: 'I ___ him yesterday.', options: ['saw', 'have seen', 'has seen', 'see'], explain: '«Yesterday» — конкретное время, значит Past Simple!' },
            { type: 'choice', v: ['1','know'], x: ['past-simple'], q: 'I ___ (know) her for ten years.', options: ['have known', 'know', 'am knowing', 'has known'], explain: '«For ten years» до сих пор → have known.' },
            { type: 'choice', q: 'We ___ (never / be) to Spain.', options: ['have never been', 'have never be', 'are never been', 'has never been'], explain: 'never ставится между have и V3.' },
            { type: 'choice', q: 'She ___ (already / finish) the report.', options: ['has already finished', 'has already finish', 'is already finished', 'have already finished'], explain: 'already — между has и V3.' }
          ]
        },
        {
          id: 'future', title: 'Future (will / going to)',
          theory: `
            <p><b>will + глагол</b> — решение в момент речи, обещание, предположение.</p>
            <p class="ex">I'm tired. I think I'll go to bed. · I promise I'll call you.</p>
            <p><b>be going to + глагол</b> — заранее принятое решение, план, или видны признаки.</p>
            <p class="ex">We're going to visit grandma on Sunday. · Look at the clouds! It's going to rain.</p>
            <p><b>−</b> won't (= will not) · I'm not going to…</p>`,
          questions: [
            { type: 'choice', v: ['3','rain'], q: 'I think it ___ tomorrow.', options: ['will rain', 'rains', 'is raining', 'rained'], explain: '«I think» + предположение → will.' },
            { type: 'choice', q: 'Look at those black clouds! It ___ rain.', options: ['is going to', 'will', 'goes to', 'is'], explain: 'Видны признаки → going to.' },
            { type: 'choice', q: "I'm tired. I think I ___ go to bed.", options: ['will', 'am', 'going to', 'shall to'], explain: 'Решение прямо сейчас → will.' },
            { type: 'choice', q: 'We ___ visit our grandparents next weekend. We decided last week.', options: ['are going to', 'will', 'going to', 'are'], explain: 'Заранее принятое решение → be going to.' },
            { type: 'choice', q: '___ you help me, please?', options: ['Will', 'Do', 'Are', 'Did'], explain: 'Просьба → Will you…?' },
            { type: 'choice', q: 'She ___ 30 next year.', options: ['will be', 'is going', 'was', 'does be'], explain: 'Факт о будущем → will be.' },
            { type: 'choice', v: ['1','call'], x: ['present-continuous'], q: 'I promise I ___ (call) you tonight.', options: ['will call', 'call', 'will calling', 'calling'], explain: 'Обещание → will.' },
            { type: 'choice', q: "They ___ (not / come) to the party, they're too busy.", options: ["won't come", 'not will come', "willn't come", "won't to come"], explain: 'will not = won\'t.' }
          ]
        }
      ]
    },

    /* ───────────────────────── РАЗГОВОРНЫЕ ФРАЗЫ ───────────────────────── */
    {
      id: 'speaking', icon: '🗣', title: 'Разговорные фразы', desc: 'Говорим вслух, без правил',
      topics: [
        {
          id: 'fillers', title: 'Связки, чтобы выиграть время',
          tip: 'Эти фразы спасают, когда нужно подумать. Носители тоже ими пользуются!',
          phrases: [
            ['Ну… / Что ж…', 'Well…'],
            ['Дай(те) подумать.', 'Let me think.'],
            ['Как бы это сказать…', 'How can I put it…'],
            ['Я имею в виду…', 'I mean…'],
            ['Вообще-то / На самом деле…', 'Actually…'],
            ['Кстати…', 'By the way…'],
            ['Можете повторить, пожалуйста?', 'Could you repeat that, please?'],
            ['Можете говорить помедленнее?', 'Could you speak more slowly, please?'],
            ['Я не совсем понял(а).', "I didn't quite get that."],
            ['Как сказать по-английски…?', 'How do you say … in English?'],
            ['Это хороший вопрос.', "That's a good question."],
            ['Если честно…', 'To be honest…']
          ]
        },
        {
          id: 'small-talk', title: 'Знакомство и small talk',
          phrases: [
            ['Приятно познакомиться.', 'Nice to meet you.'],
            ['Чем ты занимаешься? (о работе)', 'What do you do?'],
            ['Откуда ты?', 'Where are you from?'],
            ['Как дела? Всё хорошо, спасибо.', "How are you? I'm fine, thanks."],
            ['Как прошли выходные?', 'How was your weekend?'],
            ['Чем увлекаешься в свободное время?', 'What do you do in your free time?'],
            ['Я учу английский уже год.', "I've been learning English for a year."],
            ['Давно не виделись!', 'Long time no see!'],
            ['Что нового?', "What's new?"],
            ['Мне пора идти.', 'I have to go.'],
            ['Было приятно поболтать.', 'It was nice talking to you.']
          ]
        },
        {
          id: 'cafe-shop', title: 'В кафе и магазине',
          phrases: [
            ['Можно мне капучино, пожалуйста?', 'Can I have a cappuccino, please?'],
            ['Я бы хотел(а) заказать…', "I'd like to order…"],
            ['Счёт, пожалуйста.', 'Can I have the bill, please?'],
            ['Можно оплатить картой?', 'Can I pay by card?'],
            ['Сколько это стоит?', 'How much is it?'],
            ['Я просто смотрю, спасибо.', "I'm just looking, thanks."],
            ['У вас есть размер побольше?', 'Do you have this in a bigger size?'],
            ['Можно примерить?', 'Can I try it on?'],
            ['С собой, пожалуйста.', 'To go, please. / To take away, please.'],
            ['Это всё, спасибо.', "That's all, thank you."]
          ]
        },
        {
          id: 'travel-phrases', title: 'Путешествия',
          phrases: [
            ['Как добраться до вокзала?', 'How do I get to the train station?'],
            ['Это далеко отсюда?', 'Is it far from here?'],
            ['У меня забронирован номер.', 'I have a reservation.'],
            ['Во сколько завтрак?', 'What time is breakfast?'],
            ['Мой рейс задерживается.', 'My flight is delayed.'],
            ['Где здесь ближайшая аптека?', 'Where is the nearest pharmacy?'],
            ['Можете нас сфотографировать?', 'Could you take a photo of us?'],
            ['Я заблудился(-лась).', "I'm lost."],
            ['Один билет до Лондона, пожалуйста.', 'One ticket to London, please.']
          ]
        },
        {
          id: 'past-future-talk', title: 'Рассказываем о себе',
          tip: 'Тут те же времена, но в живой речи. Отвечайте быстро — не вспоминая правило.',
          phrases: [
            ['Вчера я ходил(а) в кино.', 'Yesterday I went to the cinema.'],
            ['Я никогда не был(а) в Америке.', "I've never been to America."],
            ['Сейчас я работаю над проектом.', "I'm working on a project right now."],
            ['Обычно я встаю в семь.', 'I usually get up at seven.'],
            ['В выходные я собираюсь отдохнуть.', "I'm going to relax at the weekend."],
            ['Я только что пообедал(а).', "I've just had lunch."],
            ['Когда я был(а) ребёнком, я жил(а) в деревне.', 'When I was a child, I lived in a village.'],
            ['Я позвоню тебе завтра.', "I'll call you tomorrow."],
            ['Я живу здесь с 2020 года.', "I've lived here since 2020."],
            ['Что ты делал(а), когда я позвонил(а)?', 'What were you doing when I called?']
          ]
        }
      ]
    },

    /* ───────────────────────── СЛОВА ───────────────────────── */
    {
      id: 'vocab', icon: '📚', title: 'Слова', desc: 'Пополняем словарный запас',
      topics: [
        {
          id: 'daily', title: 'Повседневная жизнь',
          words: [
            ['wake up', 'просыпаться'], ['get up', 'вставать'], ['brush teeth', 'чистить зубы'],
            ['take a shower', 'принимать душ'], ['get dressed', 'одеваться'], ['have breakfast', 'завтракать'],
            ['commute', 'добираться на работу'], ['busy', 'занятой'], ['tired', 'уставший'],
            ['usually', 'обычно'], ['often', 'часто'], ['rarely', 'редко'],
            ['chores', 'домашние дела'], ['grocery shopping', 'покупка продуктов'], ['weekend', 'выходные'],
            ['neighbour', 'сосед'], ['rent', 'аренда; снимать жильё'], ['laundry', 'стирка'],
            ['do the dishes', 'мыть посуду'], ['tidy up', 'прибираться'], ['take out the rubbish', 'выносить мусор'],
            ['alarm clock', 'будильник'], ['oversleep', 'проспать'], ['go to bed', 'ложиться спать'],
            ['fall asleep', 'засыпать'], ['routine', 'распорядок дня'], ['free time', 'свободное время']
          ]
        },
        {
          id: 'home', title: 'Дом и квартира',
          words: [
            ['flat', 'квартира'], ['bedroom', 'спальня'], ['kitchen', 'кухня'],
            ['bathroom', 'ванная'], ['living room', 'гостиная'], ['floor', 'этаж; пол'],
            ['ceiling', 'потолок'], ['wall', 'стена'], ['stairs', 'лестница'],
            ['furniture', 'мебель'], ['wardrobe', 'шкаф для одежды'], ['shelf', 'полка'],
            ['fridge', 'холодильник'], ['cooker', 'плита'], ['washing machine', 'стиральная машина'],
            ['carpet', 'ковёр'], ['sofa', 'диван'], ['balcony', 'балкон'],
            ['landlord', 'арендодатель'], ['move in', 'въехать (в жильё)'], ['move out', 'съехать'],
            ['repair', 'ремонтировать'], ['key', 'ключ'], ['lock', 'замок; запирать']
          ]
        },
        {
          id: 'food', title: 'Еда и кухня',
          words: [
            ['vegetables', 'овощи'], ['fruit', 'фрукты'], ['chicken', 'курица'],
            ['fish', 'рыба'], ['bread', 'хлеб'], ['rice', 'рис'],
            ['cheese', 'сыр'], ['eggs', 'яйца'], ['butter', 'сливочное масло'],
            ['salt', 'соль'], ['sugar', 'сахар'], ['pepper', 'перец'],
            ['boil', 'варить'], ['fry', 'жарить'], ['bake', 'печь'],
            ['recipe', 'рецепт'], ['meal', 'приём пищи'], ['snack', 'перекус'],
            ['delicious', 'очень вкусный'], ['spicy', 'острый'], ['sweet', 'сладкий'],
            ['sour', 'кислый'], ['hungry', 'голодный'], ['thirsty', 'испытывающий жажду'],
            ['order', 'заказывать; заказ'], ['menu', 'меню']
          ]
        },
        {
          id: 'shopping', title: 'Покупки и деньги',
          words: [
            ['shop assistant', 'продавец'], ['price', 'цена'], ['cheap', 'дешёвый'],
            ['expensive', 'дорогой'], ['discount', 'скидка'], ['sale', 'распродажа'],
            ['receipt', 'чек'], ['change', 'сдача'], ['cash', 'наличные'],
            ['pay', 'платить'], ['spend', 'тратить'], ['save money', 'копить деньги'],
            ['borrow', 'брать в долг'], ['lend', 'давать в долг'], ['afford', 'позволить себе'],
            ['queue', 'очередь'], ['refund', 'возврат денег'], ['try on', 'примерять'],
            ['size', 'размер'], ['fit', 'подходить по размеру'], ['bargain', 'выгодная покупка'],
            ['customer', 'покупатель, клиент']
          ]
        },
        {
          id: 'city', title: 'Город и транспорт',
          words: [
            ['street', 'улица'], ['square', 'площадь'], ['crossroads', 'перекрёсток'],
            ['traffic lights', 'светофор'], ['traffic jam', 'пробка'], ['bus stop', 'автобусная остановка'],
            ['underground', 'метро'], ['platform', 'платформа'], ['driver', 'водитель'],
            ['passenger', 'пассажир'], ['get on', 'садиться (в транспорт)'], ['get off', 'выходить (из транспорта)'],
            ['miss the bus', 'опоздать на автобус'], ['turn left', 'повернуть налево'], ['straight on', 'прямо'],
            ['corner', 'угол'], ['bridge', 'мост'], ['pavement', 'тротуар'],
            ['car park', 'парковка'], ['fare', 'стоимость проезда'], ['neighbourhood', 'район'],
            ['downtown', 'центр города']
          ]
        },
        {
          id: 'travel', title: 'Путешествия',
          words: [
            ['ticket', 'билет'], ['luggage', 'багаж'], ['flight', 'рейс'],
            ['departure', 'отправление'], ['arrival', 'прибытие'], ['booking', 'бронирование'],
            ['delay', 'задержка'], ['sightseeing', 'осмотр достопримечательностей'], ['abroad', 'за границей'],
            ['journey', 'поездка'], ['customs', 'таможня'], ['boarding pass', 'посадочный талон'],
            ['round trip', 'поездка туда и обратно'], ['accommodation', 'жильё (в поездке)'], ['suitcase', 'чемодан'],
            ['passport', 'паспорт'], ['guide', 'гид'], ['souvenir', 'сувенир'],
            ['check in', 'заселяться; регистрироваться'], ['check out', 'выселяться из отеля'], ['sights', 'достопримечательности'],
            ['destination', 'пункт назначения'], ['timetable', 'расписание транспорта']
          ]
        },
        {
          id: 'work', title: 'Работа',
          words: [
            ['colleague', 'коллега'], ['salary', 'зарплата'], ['deadline', 'крайний срок'],
            ['meeting', 'встреча, совещание'], ['boss', 'начальник'], ['experience', 'опыт'],
            ['skills', 'навыки'], ['job interview', 'собеседование'], ['to hire', 'нанимать'],
            ['to quit', 'уволиться (самому)'], ['to be promoted', 'получить повышение'], ['task', 'задача'],
            ['schedule', 'график, расписание'], ['day off', 'выходной день'], ['office', 'офис'],
            ['employee', 'сотрудник'], ['company', 'компания'], ['career', 'карьера'],
            ['contract', 'договор'], ['earn', 'зарабатывать'], ['retire', 'уйти на пенсию'],
            ['part-time', 'неполный рабочий день'], ['full-time', 'полный рабочий день'], ['overtime', 'сверхурочная работа'],
            ['apply for a job', 'подать заявку на работу']
          ]
        },
        {
          id: 'study', title: 'Учёба',
          words: [
            ['lesson', 'урок'], ['homework', 'домашнее задание'], ['exam', 'экзамен'],
            ['pass an exam', 'сдать экзамен'], ['fail', 'провалить'], ['teacher', 'учитель'],
            ['university', 'университет'], ['subject', 'учебный предмет'], ['mark', 'оценка'],
            ['mistake', 'ошибка'], ['practise', 'практиковаться'], ['improve', 'улучшать'],
            ['remember', 'помнить'], ['forget', 'забывать'], ['revise', 'повторять материал'],
            ['knowledge', 'знания'], ['course', 'курс'], ['translate', 'переводить'],
            ['pronounce', 'произносить'], ['fluent', 'свободный (о владении языком)'], ['vocabulary', 'словарный запас'],
            ['take notes', 'делать заметки']
          ]
        },
        {
          id: 'health', title: 'Здоровье и тело',
          words: [
            ['head', 'голова'], ['back', 'спина'], ['stomach', 'живот, желудок'],
            ['throat', 'горло'], ['tooth', 'зуб'], ['headache', 'головная боль'],
            ['a cold', 'простуда'], ['fever', 'жар, температура'], ['cough', 'кашель'],
            ['pain', 'боль'], ['hurt', 'болеть (о части тела)'], ['medicine', 'лекарство'],
            ['pill', 'таблетка'], ['appointment', 'запись на приём'], ['pharmacy', 'аптека'],
            ['healthy', 'здоровый'], ['ill', 'больной'], ['recover', 'выздоравливать'],
            ['injury', 'травма'], ['feel better', 'чувствовать себя лучше'], ['sore', 'воспалённый, больной (о горле, мышцах)'],
            ['dentist', 'стоматолог']
          ]
        },
        {
          id: 'weather', title: 'Погода и природа',
          words: [
            ['weather', 'погода'], ['sunny', 'солнечный'], ['cloudy', 'облачный'],
            ['windy', 'ветреный'], ['foggy', 'туманный'], ['storm', 'буря, гроза'],
            ['temperature', 'температура (воздуха)'], ['warm', 'тёплый'], ['hot', 'жаркий'],
            ['cool', 'прохладный'], ['freezing', 'ледяной, морозный'], ['forecast', 'прогноз'],
            ['season', 'время года'], ['spring', 'весна'], ['autumn', 'осень'],
            ['forest', 'лес'], ['river', 'река'], ['lake', 'озеро'],
            ['mountain', 'гора'], ['sea', 'море'], ['sky', 'небо'],
            ['umbrella', 'зонт']
          ]
        },
        {
          id: 'people', title: 'Люди и отношения',
          words: [
            ['parents', 'родители'], ['relatives', 'родственники'], ['husband', 'муж'],
            ['wife', 'жена'], ['son', 'сын'], ['daughter', 'дочь'],
            ['cousin', 'двоюродный брат / сестра'], ['friendship', 'дружба'], ['get married', 'пожениться'],
            ['divorce', 'развод'], ['boyfriend', 'парень (в паре)'], ['girlfriend', 'девушка (в паре)'],
            ['childhood', 'детство'], ['grow up', 'вырасти'], ['look like', 'быть похожим внешне'],
            ['take after', 'пойти в кого-то (характером)'], ['get on well', 'хорошо ладить'], ['argue', 'спорить, ссориться'],
            ['make friends', 'подружиться'], ['trust', 'доверять'], ['support', 'поддерживать'],
            ['stranger', 'незнакомец']
          ]
        },
        {
          id: 'feelings', title: 'Чувства и характер',
          words: [
            ['happy', 'счастливый'], ['upset', 'расстроенный'], ['worried', 'обеспокоенный'],
            ['excited', 'радостно взволнованный'], ['bored', 'скучающий'], ['scared', 'напуганный'],
            ['proud', 'гордый'], ['shy', 'застенчивый'], ['confident', 'уверенный'],
            ['lazy', 'ленивый'], ['kind', 'добрый'], ['honest', 'честный'],
            ['angry', 'злой, сердитый'], ['relaxed', 'расслабленный'], ['nervous', 'нервничающий'],
            ['surprised', 'удивлённый'], ['disappointed', 'разочарованный'], ['embarrassed', 'смущённый'],
            ['jealous', 'ревнивый, завидующий'], ['grateful', 'благодарный'], ['lonely', 'одинокий'],
            ['calm', 'спокойный'], ['generous', 'щедрый'], ['polite', 'вежливый'],
            ['rude', 'грубый'], ['reliable', 'надёжный'], ['curious', 'любопытный'],
            ['patient', 'терпеливый']
          ]
        },
        {
          id: 'clothes', title: 'Одежда',
          words: [
            ['clothes', 'одежда'], ['shirt', 'рубашка'], ['T-shirt', 'футболка'],
            ['trousers', 'брюки'], ['jeans', 'джинсы'], ['dress', 'платье'],
            ['skirt', 'юбка'], ['jacket', 'куртка, пиджак'], ['coat', 'пальто'],
            ['sweater', 'свитер'], ['shoes', 'туфли, обувь'], ['trainers', 'кроссовки'],
            ['boots', 'ботинки, сапоги'], ['hat', 'шляпа, шапка'], ['scarf', 'шарф'],
            ['gloves', 'перчатки'], ['socks', 'носки'], ['belt', 'ремень'],
            ['pocket', 'карман'], ['wear', 'носить (одежду)'], ['comfortable', 'удобный'],
            ['fashionable', 'модный']
          ]
        },
        {
          id: 'hobbies', title: 'Хобби и спорт',
          words: [
            ['hobby', 'хобби'], ['go for a walk', 'пойти погулять'], ['go jogging', 'бегать трусцой'],
            ['gym', 'спортзал'], ['team', 'команда'], ['match', 'матч'],
            ['win', 'побеждать'], ['lose', 'проигрывать'], ['score', 'забить (гол); счёт'],
            ['coach', 'тренер'], ['competition', 'соревнование'], ['painting', 'живопись'],
            ['photography', 'фотография (занятие)'], ['board game', 'настольная игра'], ['gardening', 'садоводство'],
            ['fishing', 'рыбалка'], ['swimming pool', 'бассейн'], ['concert', 'концерт'],
            ['exhibition', 'выставка'], ['collect', 'коллекционировать'], ['relax', 'расслабляться, отдыхать']
          ]
        },
        {
          id: 'tech', title: 'Технологии и интернет',
          words: [
            ['device', 'устройство'], ['screen', 'экран'], ['password', 'пароль'],
            ['download', 'скачивать'], ['upload', 'загружать (в сеть)'], ['update', 'обновление; обновлять'],
            ['battery', 'аккумулятор'], ['charger', 'зарядка'], ['app', 'приложение'],
            ['website', 'сайт'], ['search', 'искать (в интернете)'], ['link', 'ссылка'],
            ['account', 'аккаунт'], ['log in', 'войти (в аккаунт)'], ['log out', 'выйти (из аккаунта)'],
            ['message', 'сообщение'], ['send', 'отправлять'], ['delete', 'удалять'],
            ['save', 'сохранять'], ['share', 'делиться'], ['settings', 'настройки'],
            ['keyboard', 'клавиатура']
          ]
        },
        {
          id: 'verbs', title: 'Глаголы на каждый день',
          words: [
            ['decide', 'решать'], ['explain', 'объяснять'], ['understand', 'понимать'],
            ['believe', 'верить'], ['hope', 'надеяться'], ['agree', 'соглашаться'],
            ['refuse', 'отказываться'], ['allow', 'разрешать'], ['avoid', 'избегать'],
            ['choose', 'выбирать'], ['compare', 'сравнивать'], ['describe', 'описывать'],
            ['discuss', 'обсуждать'], ['expect', 'ожидать'], ['happen', 'случаться'],
            ['invite', 'приглашать'], ['notice', 'замечать'], ['offer', 'предлагать (дать что-то)'],
            ['prefer', 'предпочитать'], ['promise', 'обещать'], ['suggest', 'советовать, предлагать (идею)'],
            ['worry', 'волноваться'], ['wonder', 'задаваться вопросом'], ['mean', 'значить, иметь в виду'],
            ['manage', 'справиться, суметь']
          ]
        },
        {
          id: 'adjectives', title: 'Частые прилагательные',
          words: [
            ['easy', 'лёгкий'], ['difficult', 'трудный'], ['important', 'важный'],
            ['possible', 'возможный'], ['necessary', 'необходимый'], ['free', 'свободный; бесплатный'],
            ['full', 'полный'], ['empty', 'пустой'], ['quiet', 'тихий'],
            ['loud', 'громкий'], ['early', 'ранний'], ['late', 'поздний'],
            ['modern', 'современный'], ['old-fashioned', 'старомодный'], ['safe', 'безопасный'],
            ['dangerous', 'опасный'], ['clean', 'чистый'], ['dirty', 'грязный'],
            ['strange', 'странный'], ['ordinary', 'обычный'], ['huge', 'огромный'],
            ['tiny', 'крошечный'], ['boring', 'скучный'], ['interesting', 'интересный']
          ]
        },
        {
          id: 'phrasal', title: 'Фразовые глаголы',
          words: [
            ['give up', 'сдаваться, бросать'], ['look for', 'искать'], ['find out', 'узнать, выяснить'],
            ['turn on', 'включить'], ['turn off', 'выключить'], ['put on', 'надеть'],
            ['take off', 'снять (одежду); взлететь'], ['look after', 'присматривать'], ['run out of', 'закончиться (о запасе)'],
            ['get on with', 'ладить с кем-то'], ['come back', 'вернуться'], ['pick up', 'подобрать, забрать'],
            ['go on', 'продолжать'], ['set up', 'настроить, основать'], ['give back', 'вернуть (вещь)'],
            ['fill in', 'заполнить (форму)'], ['put off', 'откладывать'], ['look forward to', 'с нетерпением ждать'],
            ['make up', 'помириться; выдумать'], ['break down', 'сломаться'], ['hang out', 'проводить время, тусоваться'],
            ['show up', 'появиться, прийти'], ['work out', 'тренироваться; разобраться'], ['call back', 'перезвонить'],
            ['cheer up', 'подбодрить, взбодриться']
          ]
        }
      ]
    },

    /* ───────────────────────── НЕПРАВИЛЬНЫЕ ГЛАГОЛЫ ───────────────────────── */
    {
      id: 'irregular', icon: '🔁', title: 'Неправильные глаголы', desc: 'V1 – V2 – V3',
      topics: [
        {
          id: 'irregular-1', title: 'Самые частые (часть 1)',
          tip: 'V2 нужна для Past Simple (I went), V3 — для Present Perfect (I have gone).',
          verbs: [
            ['be', 'was/were', 'been', 'быть'], ['go', 'went', 'gone', 'идти'], ['have', 'had', 'had', 'иметь'],
            ['do', 'did', 'done', 'делать'], ['make', 'made', 'made', 'делать, создавать'],
            ['see', 'saw', 'seen', 'видеть'], ['take', 'took', 'taken', 'брать'],
            ['come', 'came', 'come', 'приходить'], ['get', 'got', 'got', 'получать'],
            ['know', 'knew', 'known', 'знать'], ['think', 'thought', 'thought', 'думать'],
            ['say', 'said', 'said', 'сказать']
          ]
        },
        {
          id: 'irregular-2', title: 'Самые частые (часть 2)',
          verbs: [
            ['write', 'wrote', 'written', 'писать'], ['buy', 'bought', 'bought', 'покупать'],
            ['bring', 'brought', 'brought', 'приносить'], ['begin', 'began', 'begun', 'начинать'],
            ['speak', 'spoke', 'spoken', 'говорить'], ['give', 'gave', 'given', 'давать'],
            ['eat', 'ate', 'eaten', 'есть'], ['drink', 'drank', 'drunk', 'пить'],
            ['find', 'found', 'found', 'находить'], ['forget', 'forgot', 'forgotten', 'забывать'],
            ['leave', 'left', 'left', 'уходить, оставлять'], ['meet', 'met', 'met', 'встречать'],
            ['pay', 'paid', 'paid', 'платить'], ['tell', 'told', 'told', 'рассказывать']
          ]
        }
      ]
    },

    /* ───────────────────────── СОБЕРИ ПРЕДЛОЖЕНИЕ ───────────────────────── */
    {
      id: 'sentences', icon: '🧩', title: 'Собери предложение', desc: 'Порядок слов',
      topics: [
        {
          id: 'word-order', title: 'Порядок слов',
          questions: [
            { type: 'order', ru: 'Она не любит кофе.', en: "She doesn't like coffee." },
            { type: 'order', ru: 'Ты когда-нибудь был в Лондоне?', en: 'Have you ever been to London?' },
            { type: 'order', ru: 'Я читал, когда ты позвонил.', en: 'I was reading when you called.' },
            { type: 'order', ru: 'Мы собираемся навестить друзей.', en: 'We are going to visit our friends.' },
            { type: 'order', ru: 'Куда ты ходил вчера?', en: 'Where did you go yesterday?' },
            { type: 'order', ru: 'Он только что закончил свою работу.', en: 'He has just finished his work.' },
            { type: 'order', ru: 'Они обычно обедают в полдень.', en: 'They usually have lunch at noon.' },
            { type: 'order', ru: 'Что ты сейчас делаешь?', en: 'What are you doing now?' },
            { type: 'order', ru: 'Я позвоню тебе завтра вечером.', en: "I'll call you tomorrow evening." },
            { type: 'order', ru: 'Как долго ты учишь английский?', en: 'How long have you been learning English?' },
            { type: 'order', ru: 'Она никогда не опаздывает на работу.', en: 'She is never late for work.' },
            { type: 'order', ru: 'Можно мне стакан воды, пожалуйста?', en: 'Can I have a glass of water, please?' }
          ]
        }
      ]
    }
  ]
};

/*
  Формы глаголов для смешанных тренировок: глагол: [he-форма, -ing, V2, V3]
  ('be' обрабатывается отдельно)
*/
window.VERB_FORMS = {
  go: ['goes', 'going', 'went', 'gone'],
  boil: ['boils', 'boiling', 'boiled', 'boiled'],
  eat: ['eats', 'eating', 'ate', 'eaten'],
  have: ['has', 'having', 'had', 'had'],
  leave: ['leaves', 'leaving', 'left', 'left'],
  live: ['lives', 'living', 'lived', 'lived'],
  watch: ['watches', 'watching', 'watched', 'watched'],
  rain: ['rains', 'raining', 'rained', 'rained'],
  study: ['studies', 'studying', 'studied', 'studied'],
  read: ['reads', 'reading', 'read', 'read'],
  play: ['plays', 'playing', 'played', 'played'],
  look: ['looks', 'looking', 'looked', 'looked'],
  cook: ['cooks', 'cooking', 'cooked', 'cooked'],
  wait: ['waits', 'waiting', 'waited', 'waited'],
  work: ['works', 'working', 'worked', 'worked'],
  like: ['likes', 'liking', 'liked', 'liked'],
  lose: ['loses', 'losing', 'lost', 'lost'],
  buy: ['buys', 'buying', 'bought', 'bought'],
  see: ['sees', 'seeing', 'saw', 'seen'],
  write: ['writes', 'writing', 'wrote', 'written'],
  stay: ['stays', 'staying', 'stayed', 'stayed'],
  walk: ['walks', 'walking', 'walked', 'walked'],
  call: ['calls', 'calling', 'called', 'called'],
  sleep: ['sleeps', 'sleeping', 'slept', 'slept'],
  snow: ['snows', 'snowing', 'snowed', 'snowed'],
  finish: ['finishes', 'finishing', 'finished', 'finished'],
  know: ['knows', 'knowing', 'knew', 'known'],
  come: ['comes', 'coming', 'came', 'come']
};

/*
  СЛОВАРИК для перевода по нажатию на слово в предложении.
  Добавляйте сюда слова из новых упражнений: 'слово': 'перевод'
*/
window.GLOSSARY = {
  'a': 'артикль: один, какой-то', 'an': 'артикль (перед гласной): один, какой-то',
  'the': 'артикль: этот, тот самый', 'a.m.': 'утра (до полудня)', 'p.m.': 'дня / вечера (после полудня)',
  'ago': 'назад (тому назад)', 'already': 'уже', 'arrive': 'прибывать, приезжать', 'arrived': 'прибыл(а), приехал(а)',
  'at': 'в, на (о месте или времени)', 'be': 'быть', 'beach': 'пляж', 'bed': 'кровать; go to bed — ложиться спать',
  'before': 'раньше, до этого', 'black': 'чёрный', 'book': 'книга', 'brother': 'брат', 'bus': 'автобус',
  'busy': 'занятой', 'but': 'но', 'buy': 'покупать', 'call': 'звонить', 'called': 'позвонил(а)', 'car': 'машина',
  'celsius': 'по Цельсию', 'cinema': 'кинотеатр', 'clouds': 'облака, тучи', 'coffee': 'кофе', 'come': 'приходить',
  'cook': 'готовить (еду)', 'day': 'день', 'days': 'дни; these days — в последнее время', 'decided': 'решили, решил(а)',
  'degrees': 'градусов', 'dinner': 'ужин', 'doing': 'делающий (do + ing)', 'eaten': 'съеден (V3 от eat)',
  'english': 'английский язык', 'evening': 'вечер', 'ever': 'когда-либо', 'every': 'каждый', 'film': 'фильм',
  'finish': 'заканчивать', 'football': 'футбол', 'for': 'для; в течение (for ten years — десять лет)',
  'french': 'французский язык', 'go': 'идти, ехать', 'grandparents': 'бабушка и дедушка',
  'have': 'иметь; have lunch — обедать, have dinner — ужинать', 'he': 'он', 'help': 'помогать', 'her': 'её, ей',
  'here': 'здесь, сюда', 'him': 'его, ему', 'his': 'его (чей?)', 'holiday': 'отпуск, каникулы',
  'home': 'дом; at home — дома', 'homework': 'домашнее задание', 'hour': 'час', 'i': 'я',
  "i'm": 'я (= I am)', "i've": 'я (= I have)', "i'll": 'я (= I will)', 'in': 'в', 'it': 'оно, это (о предмете, погоде)',
  'japan': 'Япония', 'job': 'работа', 'just': 'только что', 'keys': 'ключи', 'know': 'знать',
  'last': 'прошлый; last week — на прошлой неделе', 'letter': 'письмо', 'like': 'нравиться, любить',
  'listen': 'слушай(те)!', 'live': 'жить', 'london': 'Лондон', 'look': 'смотри(те)!; look for — искать',
  'lunch': 'обед', 'me': 'мне, меня', 'meat': 'мясо', 'moment': 'момент; at the moment — сейчас',
  'mondays': 'по понедельникам', 'month': 'месяц', 'morning': 'утро', 'moscow': 'Москва', 'mother': 'мама',
  'much': 'много', 'my': 'мой', 'never': 'никогда', 'new': 'новый', 'next': 'следующий',
  'night': 'ночь; last night — вчера вечером', 'not': 'не', 'now': 'сейчас', 'often': 'часто',
  'on': 'на; on Mondays — по понедельникам', 'our': 'наш', 'paris': 'Париж', 'party': 'вечеринка',
  'phone': 'телефон', 'piano': 'пианино', 'please': 'пожалуйста', 'promise': 'обещать',
  'rain': 'дождь; идти (о дожде)', 'rang': 'зазвонил (V2 от ring)', 'report': 'отчёт',
  'right': 'прямо; right now — прямо сейчас', 'see': 'видеть', 'she': 'она', 'since': 'с (какого-то момента)',
  'sleep': 'спать', 'sleeping': 'спящий (sleep + ing)', 'snow': 'снег; идти (о снеге)', 'so': 'поэтому, так что',
  'sochi': 'Сочи', 'somebody': 'кто-то', 'spain': 'Испания', 'speak': 'говорить (на языке)',
  'started': 'начал(ся)', 'stay': 'оставаться', 'study': 'учиться, изучать', 'summer': 'лето', 'sushi': 'суши',
  'ten': 'десять', 'their': 'их', 'these': 'эти', 'they': 'они', "they're": 'они (= they are)', 'think': 'думать',
  'this': 'этот', 'those': 'те', 'three': 'три', 'tickets': 'билеты', 'times': 'раз; three times — три раза',
  'tired': 'уставший', 'to': 'в, к; частица перед глаголом', 'tom': 'Том (имя)', 'tomorrow': 'завтра',
  'tonight': 'сегодня вечером', 'too': 'слишком; тоже', 'train': 'поезд', 'tv': 'телевизор', 'two': 'два',
  'usually': 'обычно', 'visit': 'навещать, посещать', 'wait': 'ждать', 'was': 'был(а) (be в прошлом)',
  'were': 'были (be в прошлом)', 'watch': 'смотреть', 'water': 'вода', 'we': 'мы', 'week': 'неделя',
  'weekend': 'выходные', 'what': 'что', 'when': 'когда', 'while': 'пока, в то время как', 'winter': 'зима',
  'work': 'работа; работать', 'write': 'писать', 'year': 'год', 'years': 'лет, годы', 'yesterday': 'вчера',
  'yet': 'ещё (в отрицании); уже (в вопросе)', 'you': 'ты, вы',
  'is': 'есть, является (be для he/she/it)', 'am': 'есть (be для I)', 'are': 'есть (be для you/we/they)',
  'do': 'делать; вспомогательный глагол', 'does': 'вспомогательный глагол (для he/she/it)',
  'did': 'вспомогательный глагол прошедшего времени', 'has': 'имеет (have для he/she/it)', 'had': 'имел(а)',
  'will': 'вспомогательный глагол будущего времени', "won't": 'не будет (= will not)',
  "don't": 'не (= do not)', "doesn't": 'не (= does not)', "didn't": 'не (в прошлом, = did not)',
  'going': 'идущий; be going to — собираться', 'went': 'пошёл, поехал (V2 от go)', 'gone': 'V3 от go',
  'and': 'и', 'or': 'или', 'with': 'с', 'from': 'из, от', 'about': 'о, про', 'very': 'очень', 'today': 'сегодня',
  'always': 'всегда', 'sometimes': 'иногда', 'there': 'там', 'where': 'где, куда', 'why': 'почему', 'how': 'как',
  'who': 'кто', 'friend': 'друг', 'friends': 'друзья', 'family': 'семья', 'house': 'дом', 'school': 'школа',
  'city': 'город', 'country': 'страна', 'people': 'люди', 'time': 'время', 'good': 'хороший', 'bad': 'плохой'
};
