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
            { type: 'choice', q: 'My mother ___ (study) English on Mondays.', options: ['studies', 'studys', 'study', 'is study'], explain: 'Согласная + y → ies: study → studies.' },
            { type: 'choice', v: ['1', 'get'], x: ['past-simple', 'past-continuous', 'future'], q: 'I usually ___ (get) up at 7 o\'clock.', options: ['get', 'gets', 'am getting', 'getting'], explain: '«Usually» — привычка → Present Simple. I → глагол без -s.' },
            { type: 'choice', v: ['3', 'drink'], x: ['past-simple', 'past-continuous', 'future', 'present-perfect'], q: 'He never ___ (drink) coffee in the evening.', options: ['drinks', 'drink', 'is drinking', 'drinking'], explain: '«Never» + привычка → Present Simple, he → drinks.' },
            { type: 'choice', v: ['p', 'go'], x: ['past-simple', 'past-continuous', 'future'], q: 'We ___ (go) to the gym twice a week.', options: ['go', 'goes', 'are going', 'going'], explain: '«Twice a week» — регулярное действие → Present Simple.' },
            { type: 'choice', v: ['3', 'open'], x: ['past-simple', 'past-continuous', 'future', 'present-continuous'], q: 'The shop ___ (open) at 9 a.m. every day.', options: ['opens', 'open', 'opening', 'opend'], explain: 'Расписание, «every day» → Present Simple, it → opens.' },
            { type: 'choice', q: '___ your brother play the guitar?', options: ['Does', 'Do', 'Is', 'Has'], explain: 'Вопрос с he/she/it в Present Simple → Does + глагол без -s.' },
            { type: 'choice', v: ['1', 'like', 1], x: ['past-simple', 'future'], q: 'I ___ (not / like) horror films.', options: ['don\'t like', 'doesn\'t like', 'not like', 'am not like'], explain: 'Отрицание с I → don\'t + глагол.' },
            { type: 'choice', v: ['3', 'speak'], x: ['past-simple', 'future'], q: 'She ___ (speak) three languages.', options: ['speaks', 'speak', 'is speak', 'speaking'], explain: 'Постоянный факт о человеке → Present Simple, she → speaks.' },
            { type: 'choice', q: 'How often ___ you visit your grandparents?', options: ['do', 'does', 'are', 'is'], explain: '«How often» спрашивает о привычке → do (с you).' },
            { type: 'choice', v: ['p', 'eat', 1], x: ['past-simple', 'past-continuous', 'future'], q: 'Cats ___ (not / eat) vegetables.', options: ['don\'t eat', 'doesn\'t eat', 'not eat', 'aren\'t eat'], explain: 'Общий факт, cats = they → don\'t eat.' },
            { type: 'choice', v: ['3', 'rise'], x: ['past-simple', 'future'], q: 'The sun ___ (rise) in the east.', options: ['rises', 'rise', 'rising', 'is rise'], explain: 'Закон природы → Present Simple, it → rises.' },
            { type: 'choice', v: ['3', 'cook'], x: ['past-simple', 'past-continuous', 'future'], q: 'My dad always ___ (cook) on Sundays.', options: ['cooks', 'cook', 'is cook', 'cooking'], explain: '«Always» + регулярность → Present Simple.' },
            { type: 'choice', v: ['3', 'snow'], x: ['past-simple', 'past-continuous', 'future'], q: 'It often ___ (snow) here in January.', options: ['snows', 'snow', 'is snow', 'snowing'], explain: '«Often» → Present Simple, it → snows.' },
            { type: 'choice', q: 'What time ___ the film start?', options: ['does', 'do', 'is', 'has'], explain: 'Расписание, the film = it → does.' },
            { type: 'choice', v: ['1', 'know'], x: ['past-simple', 'future'], q: 'I ___ (know) the answer.', options: ['know', 'knows', 'am knowing', 'knowing'], explain: 'Know не используется в Continuous → Present Simple.' },
            { type: 'choice', v: ['3', 'have', 1], x: ['past-simple', 'future', 'present-perfect'], q: 'Tom ___ (not / have) a car.', options: ['doesn\'t have', 'don\'t have', 'doesn\'t has', 'not have'], explain: 'После doesn\'t глагол без -s: doesn\'t have.' },
            { type: 'choice', v: ['3', 'freeze'], x: ['future'], q: 'Water ___ (freeze) at zero degrees.', options: ['freezes', 'freeze', 'is freezing', 'freezing'], explain: 'Научный факт → Present Simple.' },
            { type: 'choice', v: ['3', 'want'], x: ['past-simple', 'present-perfect'], q: 'She ___ (want) to become a doctor.', options: ['wants', 'want', 'is wanting', 'wanting'], explain: 'Want — глагол состояния, не бывает в Continuous.' },
            { type: 'choice', v: ['p', 'watch', 1], x: ['past-simple', 'past-continuous', 'future'], q: 'We usually ___ (not / watch) TV in the morning.', options: ['don\'t watch', 'doesn\'t watch', 'not watch', 'aren\'t watch'], explain: 'Привычка, we → don\'t watch.' },
            { type: 'choice', v: ['3', 'cost'], x: ['past-simple', 'future'], q: 'This bag ___ (cost) 50 dollars.', options: ['costs', 'is cost', 'costing', 'costes'], explain: 'Цена сейчас → Present Simple, it → costs.' },
            { type: 'choice', v: ['p', 'call'], x: ['past-simple', 'past-continuous', 'future'], q: 'My friends often ___ (call) me in the evening.', options: ['call', 'calls', 'are call', 'calling'], explain: '«Often» → Present Simple, they → call.' },
            { type: 'choice', v: ['3', 'teach'], x: ['past-simple', 'present-continuous', 'past-continuous', 'future'], q: 'He ___ (teach) English at a school.', options: ['teaches', 'teach', 'teachs', 'teaching'], explain: 'Работа/профессия → Present Simple. После -ch добавляем -es.' },
            { type: 'choice', q: 'Where ___ your parents live?', options: ['do', 'does', 'are', 'is'], explain: 'Your parents = they → do.' }
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
            { type: 'choice', v: ['1','work',1], q: "I ___ (not / work) at the moment, I'm on holiday.", options: ['am not working', "doesn't work", 'not working', "isn't working"], explain: 'I → am not + working.' },
            { type: 'choice', v: ['3', 'sleep'], q: 'Be quiet! The baby ___ (sleep).', options: ['is sleeping', 'sleeps', 'sleep', 'are sleeping'], explain: 'Прямо сейчас → Present Continuous, the baby = it → is.' },
            { type: 'choice', q: 'Why ___ you laughing?', options: ['are', 'do', 'is', 'does'], explain: 'Laughing (-ing) → Present Continuous, you → are.' },
            { type: 'choice', v: ['1', 'wear'], x: ['future'], q: 'I ___ (wear) a coat today because it\'s cold.', options: ['am wearing', 'wear', 'wears', 'is wearing'], explain: '«Today» — временная ситуация → Present Continuous.' },
            { type: 'choice', v: ['3', 'wait'], q: 'Hurry up! Everybody ___ (wait) for you.', options: ['is waiting', 'are waiting', 'waits', 'wait'], explain: 'Everybody — грамматически единственное число → is waiting.' },
            { type: 'choice', v: ['3', 'talk'], q: 'She ___ (talk) on the phone right now.', options: ['is talking', 'talks', 'talk', 'are talking'], explain: '«Right now» → Present Continuous.' },
            { type: 'choice', v: ['p', 'play'], q: 'Look! Those children ___ (play) in the snow.', options: ['are playing', 'is playing', 'play', 'plays'], explain: '«Look!» + they → are playing.' },
            { type: 'choice', v: ['p', 'go', 1], x: ['future'], q: 'We ___ (not / go) out tonight, we\'re staying at home.', options: ['aren\'t going', 'don\'t go', 'isn\'t going', 'not going'], explain: 'План на сегодня → Present Continuous: aren\'t going.' },
            { type: 'choice', v: ['3', 'study'], x: ['future'], q: 'My brother ___ (study) for his exams this week.', options: ['is studying', 'studies', 'study', 'are studying'], explain: '«This week» — временный период → Present Continuous.' },
            { type: 'choice', v: ['3', 'boil'], x: ['present-perfect'], q: 'The water ___ (boil). Can you turn it off?', options: ['is boiling', 'boils', 'boil', 'are boiling'], explain: 'Происходит сейчас → is boiling.' },
            { type: 'choice', q: 'What ___ you reading at the moment?', options: ['are', 'do', 'is', 'does'], explain: '«At the moment» → Present Continuous, you → are.' },
            { type: 'choice', v: ['1', 'drive'], q: 'I can\'t talk now, I ___ (drive).', options: ['am driving', 'drive', 'drives', 'driving'], explain: '«Now» → Present Continuous, I → am driving.' },
            { type: 'choice', v: ['3', 'get'], q: 'It ___ (get) dark. Let\'s go home.', options: ['is getting', 'gets', 'get', 'getting'], explain: 'Процесс прямо сейчас → is getting.' },
            { type: 'choice', v: ['p', 'build'], q: 'At the moment they ___ (build) a new bridge in our city.', options: ['are building', 'build', 'builds', 'is building'], explain: '«At the moment» → Present Continuous.' },
            { type: 'choice', v: ['3', 'knock'], q: 'Listen! Someone ___ (knock) at the door.', options: ['is knocking', 'knocks', 'knock', 'are knocking'], explain: '«Listen!» → происходит сейчас.' },
            { type: 'choice', v: ['1', 'watch', 1], q: 'Please turn off the TV. I ___ (not / watch) it.', options: ['am not watching', 'doesn\'t watch', 'not watching', 'isn\'t watching'], explain: 'Сейчас не смотрю → am not watching.' },
            { type: 'choice', v: ['3', 'cook'], q: 'My mum ___ (cook) dinner, so she can\'t answer the phone.', options: ['is cooking', 'cooks', 'cook', 'are cooking'], explain: 'Занята прямо сейчас → is cooking.' },
            { type: 'choice', v: ['p', 'go'], x: ['present-perfect'], q: 'Prices ___ (go) up these days.', options: ['are going', 'go', 'goes', 'is going'], explain: '«These days» — меняющаяся ситуация → Present Continuous.' },
            { type: 'choice', v: ['p', 'have'], x: ['present-perfect', 'future'], q: 'We ___ (have) a great time here in Spain!', options: ['are having', 'have', 'has', 'having'], explain: 'Have a good time в процессе → are having.' },
            { type: 'choice', v: ['3', 'explain'], q: 'Shh! The teacher ___ (explain) something important.', options: ['is explaining', 'explains', 'explain', 'are explaining'], explain: '«Shh!» — прямо сейчас → is explaining.' },
            { type: 'choice', v: ['1', 'look'], q: 'I ___ (look) for my keys. Have you seen them?', options: ['am looking', 'look', 'looks', 'looking'], explain: 'Ищу прямо сейчас → am looking.' },
            { type: 'choice', v: ['3', 'ring'], q: 'Your phone ___ (ring)! Answer it.', options: ['is ringing', 'rings', 'ring', 'ringing'], explain: 'Звонит прямо сейчас → is ringing.' },
            { type: 'choice', q: 'Where ___ you going? — To the shop.', options: ['are', 'do', 'is', 'does'], explain: 'Going (-ing) сейчас → are.' }
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
            { type: 'choice', v: ['p','stay'], x: ['past-continuous'], q: 'We ___ (stay) at home last weekend.', options: ['stayed', 'staied', 'stay', 'have stayed'], explain: 'Правильный глагол: stay + ed.' },
            { type: 'choice', v: ['p', 'watch'], x: ['past-continuous'], q: 'We ___ (watch) a great film last night.', options: ['watched', 'watch', 'have watched', 'watches'], explain: '«Last night» → Past Simple.' },
            { type: 'choice', v: ['3', 'go'], q: 'She ___ (go) to Italy two years ago.', options: ['went', 'goes', 'has gone', 'go'], explain: '«Ago» → Past Simple. go → went.' },
            { type: 'choice', v: ['1', 'meet'], x: ['past-continuous'], q: 'I ___ (meet) my best friend in 2010.', options: ['met', 'meet', 'have met', 'meeted'], explain: 'Год в прошлом → Past Simple. meet → met.' },
            { type: 'choice', q: '___ you call your mum yesterday?', options: ['Did', 'Do', 'Have', 'Were'], explain: '«Yesterday» + вопрос → Did.' },
            { type: 'choice', v: ['3', 'come', 1], x: ['past-continuous'], q: 'He ___ (not / come) to work last Monday.', options: ['didn\'t come', 'didn\'t came', 'doesn\'t come', 'not came'], explain: 'После didn\'t — начальная форма: didn\'t come.' },
            { type: 'choice', v: ['1', 'have'], q: 'When I was a child, I ___ (have) a dog.', options: ['had', 'have', 'has', 'was have'], explain: '«When I was a child» → Past Simple. have → had.' },
            { type: 'choice', v: ['p', 'arrive'], x: ['past-continuous'], q: 'They ___ (arrive) in London late last night.', options: ['arrived', 'arrive', 'have arrived', 'arrives'], explain: '«Last night» → Past Simple.' },
            { type: 'choice', q: 'What ___ you do last weekend?', options: ['did', 'do', 'have', 'were'], explain: '«Last weekend» → did.' },
            { type: 'choice', v: ['1', 'lose'], q: 'I ___ (lose) my phone on the bus yesterday.', options: ['lost', 'lose', 'have lost', 'losed'], explain: '«Yesterday» → Past Simple. lose → lost.' },
            { type: 'choice', v: ['3', 'write'], x: ['past-continuous'], q: 'Shakespeare ___ (write) many famous plays.', options: ['wrote', 'writes', 'has written', 'writed'], explain: 'Человек из прошлого → Past Simple.' },
            { type: 'choice', v: ['p', 'see', 1], x: ['past-continuous'], q: 'We ___ (not / see) Anna at the party on Saturday.', options: ['didn\'t see', 'didn\'t saw', 'haven\'t seen', 'don\'t see'], explain: 'Прошедшая суббота → didn\'t see.' },
            { type: 'choice', v: ['3', 'start'], q: 'The concert ___ (start) an hour ago.', options: ['started', 'starts', 'has started', 'start'], explain: '«Ago» → Past Simple.' },
            { type: 'choice', v: ['3', 'be'], q: 'My grandfather ___ (be) a pilot when he was young.', options: ['was', 'is', 'has been', 'were'], explain: 'Прошлое, he → was.' },
            { type: 'choice', v: ['1', 'buy'], x: ['past-continuous'], q: 'I ___ (buy) these shoes last week.', options: ['bought', 'buy', 'have bought', 'buyed'], explain: '«Last week» → Past Simple. buy → bought.' },
            { type: 'choice', v: ['3', 'study'], x: ['past-continuous'], q: 'She ___ (study) in Moscow from 2015 to 2019.', options: ['studied', 'studies', 'has studied', 'studyed'], explain: 'Закончившийся период → Past Simple. study → studied.' },
            { type: 'choice', q: 'How ___ you get here this morning?', options: ['did', 'do', 'have', 'are'], explain: 'Утро прошло → did.' },
            { type: 'choice', v: ['3', 'rain'], x: ['past-continuous'], q: 'It ___ (rain) all day yesterday.', options: ['rained', 'rains', 'has rained', 'rain'], explain: '«Yesterday» → Past Simple.' },
            { type: 'choice', v: ['1', 'forget'], x: ['past-continuous'], q: 'I ___ (forget) her birthday last year.', options: ['forgot', 'forget', 'have forgotten', 'forgeted'], explain: '«Last year» → Past Simple. forget → forgot.' },
            { type: 'choice', v: ['p', 'move'], x: ['past-continuous'], q: 'We ___ (move) to a new flat last March.', options: ['moved', 'move', 'have moved', 'moves'], explain: '«Last March» → Past Simple.' },
            { type: 'choice', v: ['3', 'break'], q: 'He ___ (break) his leg when he was skiing.', options: ['broke', 'breaks', 'has broken', 'breaked'], explain: 'Короткое действие в прошлом → Past Simple. break → broke.' },
            { type: 'choice', v: ['3', 'be'], q: 'The film we saw yesterday ___ (be) really boring.', options: ['was', 'is', 'has been', 'were'], explain: 'Речь о вчерашнем фильме → was.' },
            { type: 'choice', v: ['3', 'win'], q: 'Who ___ (win) the match last night?', options: ['won', 'wins', 'has won', 'winned'], explain: '«Last night» → Past Simple. win → won.' }
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
            { type: 'choice', v: ['3','snow'], x: ['past-simple'], q: 'At 9 a.m. yesterday it ___ (snow).', options: ['was snowing', 'were snowing', 'is snowing', 'snowing'], explain: 'Процесс в конкретный момент прошлого → was snowing.' },
            { type: 'choice', v: ['1', 'cook'], q: 'I ___ (cook) dinner when you called.', options: ['was cooking', 'cooked', 'were cooking', 'am cooking'], explain: 'Длительное действие, которое прервали → was cooking.' },
            { type: 'choice', q: 'What ___ you doing at 10 o\'clock last night?', options: ['were', 'was', 'did', 'are'], explain: 'Момент в прошлом + doing → were (с you).' },
            { type: 'choice', v: ['3', 'rain'], q: 'It ___ (rain) when we left the house.', options: ['was raining', 'were raining', 'is raining', 'rains'], explain: 'Фон в прошлом → was raining.' },
            { type: 'choice', v: ['p', 'listen', 1], x: ['past-simple'], q: 'They ___ (not / listen) when the teacher explained the rule.', options: ['weren\'t listening', 'wasn\'t listening', 'didn\'t listening', 'aren\'t listening'], explain: 'They → weren\'t + ing.' },
            { type: 'choice', v: ['3', 'sleep'], q: 'She ___ (sleep) when the alarm went off.', options: ['was sleeping', 'slept', 'were sleeping', 'is sleeping'], explain: 'Процесс, который прервал будильник → was sleeping.' },
            { type: 'choice', v: ['1', 'walk'], x: ['past-simple'], q: 'While I ___ (walk) in the park, I saw an old friend.', options: ['was walking', 'were walking', 'am walking', 'walking'], explain: '«While» + длительное действие → was walking.' },
            { type: 'choice', v: ['p', 'have'], x: ['past-simple'], q: 'At 7 p.m. yesterday we ___ (have) dinner.', options: ['were having', 'was having', 'are having', 'having'], explain: 'Конкретный момент в прошлом → were having.' },
            { type: 'choice', v: ['3', 'shine'], x: ['past-simple'], q: 'The sun ___ (shine) and the birds were singing.', options: ['was shining', 'were shining', 'is shining', 'shining'], explain: 'Описание фона → was shining.' },
            { type: 'choice', v: ['1', 'drive'], q: 'I ___ (drive) to work when I heard the news.', options: ['was driving', 'drove', 'were driving', 'am driving'], explain: 'Ехал (процесс), когда услышал → was driving.' },
            { type: 'choice', v: ['3', 'work'], x: ['past-simple', 'future'], q: 'He ___ (work) on his laptop all evening.', options: ['was working', 'were working', 'is working', 'working'], explain: 'Процесс весь вечер → was working.' },
            { type: 'choice', tense: 'past-simple', v: ['p', 'see'], x: ['past-continuous'], q: 'What was she wearing when you ___ her?', options: ['saw', 'were seeing', 'see', 'seen'], explain: 'Короткое действие → Past Simple: saw.' },
            { type: 'choice', v: ['p', 'wait'], q: 'We ___ (wait) for the bus when it started to snow.', options: ['were waiting', 'waited', 'was waiting', 'are waiting'], explain: 'Длительное действие + прерывание → were waiting.' },
            { type: 'choice', q: 'Why ___ you crying when I came in?', options: ['were', 'was', 'did', 'are'], explain: 'Crying (-ing) в прошлом → were.' },
            { type: 'choice', v: ['1', 'shop'], x: ['past-simple'], q: 'I wasn\'t at home. I ___ (shop) with my sister.', options: ['was shopping', 'were shopping', 'am shopping', 'shoping'], explain: 'Процесс в прошлом → was shopping (pp удваивается).' },
            { type: 'choice', v: ['p', 'play'], q: 'The children ___ (play) outside when the storm began.', options: ['were playing', 'was playing', 'played', 'are playing'], explain: 'Шёл процесс, когда началась гроза → were playing.' },
            { type: 'choice', v: ['3', 'talk'], q: 'She ___ (talk) on the phone, so she didn\'t hear the doorbell.', options: ['was talking', 'talked', 'were talking', 'is talking'], explain: 'Была занята (процесс) → was talking.' },
            { type: 'choice', v: ['1', 'live'], x: ['past-simple'], q: 'This time last year I ___ (live) in Paris.', options: ['was living', 'were living', 'am living', 'living'], explain: '«This time last year» → Past Continuous.' },
            { type: 'choice', v: ['1', 'take'], q: 'I ___ (take) a shower when somebody knocked at the door.', options: ['was taking', 'took', 'were taking', 'am taking'], explain: 'Длительное + прерывание → was taking.' },
            { type: 'choice', v: ['p', 'watch', 1], q: 'They ___ (not / watch) TV when I came home; they were reading.', options: ['weren\'t watching', 'wasn\'t watching', 'didn\'t watching', 'aren\'t watching'], explain: 'They → weren\'t watching.' },
            { type: 'choice', tense: 'past-simple', v: ['3', 'ring'], x: ['past-continuous'], q: 'When the phone ___ (ring), I was having a bath.', options: ['rang', 'was ring', 'rings', 'ringed'], explain: 'Короткое действие → Past Simple: ring → rang.' },
            { type: 'choice', v: ['3', 'dance'], x: ['past-simple', 'future'], q: 'At midnight everyone ___ (dance).', options: ['was dancing', 'were dancing', 'is dancing', 'dancing'], explain: 'Everyone → was + ing.' },
            { type: 'choice', q: 'Where ___ you going when I saw you?', options: ['were', 'was', 'did', 'are'], explain: 'Going (-ing) в прошлом → were.' }
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
            { type: 'choice', q: 'She ___ (already / finish) the report.', options: ['has already finished', 'has already finish', 'is already finished', 'have already finished'], explain: 'already — между has и V3.' },
            { type: 'choice', q: 'I ___ (never / see) the sea.', options: ['have never seen', 'have never saw', 'has never seen', 'am never seen'], explain: 'Опыт в жизни → have never + V3 (seen).' },
            { type: 'choice', v: ['3', 'lose'], x: ['past-simple'], q: 'She ___ (lose) her keys, so she can\'t get in.', options: ['has lost', 'have lost', 'is losing', 'losed'], explain: 'Результат сейчас → has lost.' },
            { type: 'choice', q: '___ you ever been to Paris?', options: ['Have', 'Did', 'Has', 'Were'], explain: '«Ever» → Present Perfect, you → Have.' },
            { type: 'choice', v: ['p', 'live'], x: ['future'], q: 'We ___ (live) in this flat for five years.', options: ['have lived', 'live', 'lived', 'are living'], explain: '«For five years» и до сих пор → have lived.' },
            { type: 'choice', q: 'He ___ (just / leave). You can call him later.', options: ['has just left', 'has just leave', 'is just left', 'have just left'], explain: '«Just» → has just + V3 (left).' },
            { type: 'choice', v: ['1', 'finish', 1], x: ['past-simple'], q: 'I ___ (not / finish) my homework yet.', options: ['haven\'t finished', 'hasn\'t finished', 'don\'t finish', 'am not finish'], explain: '«Yet» → haven\'t finished.' },
            { type: 'choice', q: 'They ___ (already / eat) lunch.', options: ['have already eaten', 'have already ate', 'has already eaten', 'are already eat'], explain: '«Already» → have already + V3 (eaten).' },
            { type: 'choice', q: 'How long ___ you known each other?', options: ['have', 'did', 'do', 'has'], explain: '«How long» до сих пор + known (V3) → have.' },
            { type: 'choice', v: ['3', 'buy'], x: ['past-simple'], q: 'My sister ___ (buy) a new car. Look, it\'s outside!', options: ['has bought', 'have bought', 'buyed', 'is buy'], explain: 'Результат виден сейчас → has bought.' },
            { type: 'choice', v: ['1', 'be'], q: 'I ___ (be) ill since Monday.', options: ['have been', 'was', 'am', 'has been'], explain: '«Since Monday» → have been.' },
            { type: 'choice', v: ['p', 'know'], q: 'We ___ (know) each other since school.', options: ['have known', 'know', 'knew', 'has known'], explain: '«Since» → have known.' },
            { type: 'choice', v: ['1', 'break'], x: ['past-simple'], q: 'Oh no! I ___ (break) my glasses.', options: ['have broken', 'has broken', 'am breaking', 'have broke'], explain: 'Только что, результат важен → have broken.' },
            { type: 'choice', q: 'She ___ (never / try) Japanese food.', options: ['has never tried', 'have never tried', 'is never tried', 'has never try'], explain: 'Опыт → has never tried.' },
            { type: 'choice', q: '___ it stopped raining yet?', options: ['Has', 'Did', 'Is', 'Have'], explain: '«Yet» + stopped (V3) → Has (it).' },
            { type: 'choice', q: 'This is the best book I ___ (ever / read).', options: ['have ever read', 'has ever read', 'am ever reading', 'have ever readed'], explain: '«The best … ever» → have ever read.' },
            { type: 'choice', v: ['p', 'call', 1], q: 'They ___ (not / call) us since they moved.', options: ['haven\'t called', 'didn\'t call', 'don\'t call', 'hasn\'t called'], explain: '«Since» → haven\'t called.' },
            { type: 'choice', v: ['1', 'work'], x: ['future'], q: 'I ___ (work) here for three months.', options: ['have worked', 'work', 'am working', 'has worked'], explain: '«For three months» и до сих пор → have worked.' },
            { type: 'choice', tense: 'past-simple', v: ['1', 'finish'], q: 'Have you finished? — Yes, I ___ (finish) it a minute ago.', options: ['finished', 'have finished', 'finish', 'am finishing'], explain: '«A minute ago» — конкретное время → Past Simple!' },
            { type: 'choice', v: ['3', 'visit'], x: ['past-simple', 'future'], q: 'He ___ (visit) London three times.', options: ['has visited', 'have visited', 'visits', 'is visiting'], explain: 'Опыт: сколько раз → has visited.' },
            { type: 'choice', v: ['3', 'open'], x: ['past-simple', 'present-continuous'], q: 'Look! Somebody ___ (open) the window.', options: ['has opened', 'have opened', 'opens', 'is open'], explain: 'Видим результат → has opened.' },
            { type: 'choice', q: 'We ___ (just / buy) tickets for the concert.', options: ['have just bought', 'have just buy', 'has just bought', 'have just buyed'], explain: '«Just» → have just bought.' },
            { type: 'choice', v: ['p', 'go'], x: ['past-simple', 'present-continuous', 'future'], q: 'Prices ___ (go) up a lot this year.', options: ['have gone', 'has gone', 'have went', 'goes'], explain: '«This year» (ещё идёт) → have gone.' }
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
            { type: 'choice', q: "They ___ (not / come) to the party, they're too busy.", options: ["won't come", 'not will come', "willn't come", "won't to come"], explain: 'will not = won\'t.' },
            { type: 'choice', v: ['3', 'pass'], q: 'I think he ___ (pass) the exam.', options: ['will pass', 'passes', 'pass', 'is pass'], explain: '«I think» + прогноз → will pass.' },
            { type: 'choice', v: ['1', 'answer'], x: ['present-continuous'], q: 'The phone is ringing. — I ___ (answer) it!', options: ['will answer', 'answer', 'answered', 'am answer'], explain: 'Решение в момент речи → will.' },
            { type: 'choice', q: 'Look at that car! It ___ crash!', options: ['is going to', 'will', 'goes to', 'is'], explain: 'Видно, что сейчас случится → is going to.' },
            { type: 'choice', q: 'We ___ have a party on Saturday. We\'ve already invited everyone.', options: ['are going to', 'go to', 'are', 'is going to'], explain: 'Заранее решили → are going to.' },
            { type: 'choice', v: ['1', 'tell', 1], x: ['present-continuous'], q: 'Don\'t worry, I ___ (not / tell) anyone.', options: ['won\'t tell', 'don\'t tell', 'not will tell', 'willn\'t tell'], explain: 'Обещание → won\'t tell.' },
            { type: 'choice', v: ['3', 'be'], q: 'Maybe it ___ (be) sunny tomorrow.', options: ['will be', 'is', 'is being', 'was'], explain: '«Maybe» + будущее → will be.' },
            { type: 'choice', q: '___ you open the window, please?', options: ['Will', 'Do', 'Are', 'Did'], explain: 'Просьба → Will you…?' },
            { type: 'choice', q: 'I\'m hungry. I think I ___ make a sandwich.', options: ['will', 'am', 'going to', 'would to'], explain: 'Решение сейчас → will.' },
            { type: 'choice', v: ['p', 'live'], q: 'In 2050 people ___ (live) on Mars.', options: ['will live', 'live', 'lived', 'are living'], explain: 'Прогноз на будущее → will live.' },
            { type: 'choice', v: ['1', 'be'], q: 'I promise I ___ (be) on time.', options: ['will be', 'am', 'was', 'be'], explain: 'Обещание → will be.' },
            { type: 'choice', q: 'What ___ you going to do this weekend?', options: ['are', 'will', 'do', 'is'], explain: 'Be going to: you → are going to.' },
            { type: 'choice', v: ['p', 'come', 1], x: ['present-continuous'], q: 'They ___ (not / come) tomorrow, they\'re busy.', options: ['won\'t come', 'don\'t come', 'not will come', 'willn\'t come'], explain: 'Будущее отрицание → won\'t come.' },
            { type: 'choice', v: ['1', 'call'], q: 'I ___ (call) you when I get home.', options: ['will call', 'call', 'called', 'calling'], explain: 'Обещание на будущее → will call.' },
            { type: 'choice', v: ['1', 'help'], q: 'Wait, I ___ (help) you with your bags.', options: ['will help', 'help', 'helped', 'helping'], explain: 'Предложение помощи → will help.' },
            { type: 'choice', v: ['p', 'win'], q: 'Do you think they ___ (win) the match?', options: ['will win', 'win', 'won', 'winning'], explain: 'Прогноз → will win.' },
            { type: 'choice', v: ['1', 'close'], x: ['present-continuous'], q: 'It\'s cold. I ___ (close) the window.', options: ['will close', 'close', 'closed', 'closing'], explain: 'Решение в момент речи → will close.' },
            { type: 'choice', v: ['3', 'be'], x: ['present-simple'], q: 'He ___ (be) 18 next month.', options: ['will be', 'was', 'be', 'has been'], explain: 'Факт о будущем → will be.' },
            { type: 'choice', q: 'Be careful! You ___ fall!', options: ['are going to', 'goes to', 'will to', 'are go to'], explain: 'Видна опасность → are going to.' },
            { type: 'choice', v: ['p', 'like'], x: ['present-simple'], q: 'I\'m sure you ___ (like) this film.', options: ['will like', 'like', 'liked', 'are liking'], explain: '«I\'m sure» + прогноз → will like.' },
            { type: 'choice', v: ['p', 'see'], x: ['present-continuous'], q: 'We ___ (see) you tomorrow at the airport.', options: ['will see', 'see', 'saw', 'seen'], explain: 'Будущее → will see.' },
            { type: 'choice', v: ['3', 'be', 1], x: ['present-simple'], q: 'She ___ (not / be) at home tonight.', options: ['won\'t be', 'isn\'t be', 'not will be', 'wasn\'t'], explain: 'Будущее отрицание → won\'t be.' },
            { type: 'choice', q: 'I\'m tired. I ___ go to bed early tonight, I\'ve decided.', options: ['am going to', 'go to', 'am go', 'goes to'], explain: 'Уже решил → am going to.' }
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
  get: ['gets', 'getting', 'got', 'got'],
  drink: ['drinks', 'drinking', 'drank', 'drunk'],
  open: ['opens', 'opening', 'opened', 'opened'],
  speak: ['speaks', 'speaking', 'spoke', 'spoken'],
  rise: ['rises', 'rising', 'rose', 'risen'],
  freeze: ['freezes', 'freezing', 'froze', 'frozen'],
  want: ['wants', 'wanting', 'wanted', 'wanted'],
  cost: ['costs', 'costing', 'cost', 'cost'],
  teach: ['teaches', 'teaching', 'taught', 'taught'],
  wear: ['wears', 'wearing', 'wore', 'worn'],
  talk: ['talks', 'talking', 'talked', 'talked'],
  drive: ['drives', 'driving', 'drove', 'driven'],
  build: ['builds', 'building', 'built', 'built'],
  knock: ['knocks', 'knocking', 'knocked', 'knocked'],
  explain: ['explains', 'explaining', 'explained', 'explained'],
  ring: ['rings', 'ringing', 'rang', 'rung'],
  arrive: ['arrives', 'arriving', 'arrived', 'arrived'],
  meet: ['meets', 'meeting', 'met', 'met'],
  start: ['starts', 'starting', 'started', 'started'],
  forget: ['forgets', 'forgetting', 'forgot', 'forgotten'],
  move: ['moves', 'moving', 'moved', 'moved'],
  break: ['breaks', 'breaking', 'broke', 'broken'],
  win: ['wins', 'winning', 'won', 'won'],
  listen: ['listens', 'listening', 'listened', 'listened'],
  shine: ['shines', 'shining', 'shone', 'shone'],
  shop: ['shops', 'shopping', 'shopped', 'shopped'],
  take: ['takes', 'taking', 'took', 'taken'],
  dance: ['dances', 'dancing', 'danced', 'danced'],
  pass: ['passes', 'passing', 'passed', 'passed'],
  answer: ['answers', 'answering', 'answered', 'answered'],
  tell: ['tells', 'telling', 'told', 'told'],
  help: ['helps', 'helping', 'helped', 'helped'],
  close: ['closes', 'closing', 'closed', 'closed'],
  visit: ['visits', 'visiting', 'visited', 'visited'],
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
  'airport': 'аэропорт',
  'alarm': 'будильник; тревога',
  'all': 'весь, все; all day — весь день',
  'anna': 'Анна (имя)',
  'answer': 'отвечать; ответ',
  'anyone': 'кто-нибудь; (в отрицании) никто',
  'baby': 'малыш, младенец',
  'bag': 'сумка',
  'bags': 'сумки',
  'bath': 'ванна; have a bath — принимать ванну',
  'because': 'потому что',
  'become': 'стать',
  'been': 'V3 от be (был)',
  'began': 'начался (V2 от begin)',
  'best': 'лучший',
  'birds': 'птицы',
  'birthday': 'день рождения',
  'boil': 'кипеть; варить',
  'boring': 'скучный',
  'break': 'ломать, разбить',
  'bridge': 'мост',
  'build': 'строить',
  'came': 'пришёл (V2 от come); came in — вошёл',
  'can': 'мочь, уметь',
  'can\'t': 'не могу (= cannot)',
  'careful': 'осторожный; be careful — осторожно!',
  'cats': 'кошки',
  'child': 'ребёнок',
  'children': 'дети',
  'close': 'закрывать',
  'coat': 'пальто',
  'cold': 'холодный; простуда',
  'concert': 'концерт',
  'cost': 'стоить',
  'crash': 'разбиться, врезаться',
  'crying': 'плачущий (cry + ing)',
  'dad': 'папа',
  'dance': 'танцевать',
  'dark': 'тёмный; get dark — темнеть',
  'doctor': 'врач',
  'dog': 'собака',
  'dollars': 'долларов',
  'door': 'дверь',
  'doorbell': 'дверной звонок',
  'drink': 'пить',
  'drive': 'водить, ехать (за рулём)',
  'each': 'каждый; each other — друг друга',
  'early': 'рано; ранний',
  'east': 'восток',
  'eat': 'есть (кушать)',
  'everybody': 'все (каждый)',
  'everyone': 'все (каждый)',
  'exam': 'экзамен',
  'exams': 'экзамены',
  'explain': 'объяснять',
  'explained': 'объяснил(а)',
  'fall': 'падать',
  'famous': 'знаменитый',
  'films': 'фильмы',
  'finished': 'закончил(а)',
  'five': 'пять',
  'flat': 'квартира',
  'food': 'еда',
  'forget': 'забывать',
  'freeze': 'замерзать',
  'get': 'получать; становиться; get up — вставать, get in — войти',
  'glasses': 'очки',
  'grandfather': 'дедушка',
  'great': 'отличный, классный',
  'guitar': 'гитара',
  'gym': 'спортзал',
  'having': 'having dinner — ужинающий; having a bath — принимающий ванну',
  'hear': 'слышать',
  'heard': 'услышал(а)',
  'horror': 'ужас; horror films — фильмы ужасов',
  'hungry': 'голодный',
  'hurry': 'торопиться; hurry up — поторопись!',
  'ill': 'больной',
  'important': 'важный',
  'invited': 'пригласили',
  'it\'s': 'это (= it is)',
  'italy': 'Италия',
  'january': 'январь',
  'japanese': 'японский',
  'knock': 'стучать',
  'knocked': 'постучал(а)',
  'known': 'V3 от know',
  'languages': 'языки',
  'laptop': 'ноутбук',
  'late': 'поздно; поздний',
  'later': 'позже',
  'laughing': 'смеющийся',
  'leave': 'уходить, уезжать',
  'left': 'ушёл (V2/V3 от leave)',
  'leg': 'нога',
  'let\'s': 'давай(те)',
  'long': 'долгий; how long — как долго',
  'lose': 'терять',
  'lot': 'a lot — много, сильно',
  'make': 'делать, готовить',
  'many': 'много',
  'march': 'март',
  'mars': 'Марс',
  'match': 'матч',
  'maybe': 'может быть',
  'meet': 'встречать, знакомиться',
  'midnight': 'полночь',
  'minute': 'минута',
  'monday': 'понедельник',
  'months': 'месяцев, месяцы',
  'move': 'переезжать; двигать',
  'moved': 'переехал(и)',
  'mum': 'мама',
  'news': 'новости',
  'no': 'нет',
  'o\'clock': 'часов (ровно); at 7 o\'clock — в 7 часов',
  'off': 'выключить (turn off); прочь; went off — сработал',
  'oh': 'ох, ой',
  'old': 'старый',
  'open': 'открывать; открытый',
  'other': 'другой; each other — друг друга',
  'out': 'наружу; go out — выходить (гулять)',
  'outside': 'снаружи, на улице',
  'parents': 'родители',
  'park': 'парк',
  'pass': 'сдать (экзамен); проходить',
  'pilot': 'пилот, лётчик',
  'play': 'играть',
  'plays': 'пьесы; играет',
  'prices': 'цены',
  'quiet': 'тихий; be quiet — тише!',
  'raining': 'идёт дождь (rain + ing)',
  'read': 'читать',
  'reading': 'читающий (read + ing)',
  'really': 'действительно, очень',
  'ring': 'звонить (о телефоне)',
  'ringing': 'звонящий',
  'rise': 'подниматься, всходить',
  'rule': 'правило',
  'sandwich': 'бутерброд, сэндвич',
  'saturday': 'суббота',
  'saw': 'увидел (V2 от see)',
  'sea': 'море',
  'seen': 'V3 от see',
  'shakespeare': 'Шекспир',
  'shh': 'тсс!',
  'shine': 'светить',
  'shoes': 'обувь, туфли',
  'shop': 'магазин; ходить по магазинам',
  'shower': 'душ',
  'singing': 'поющий (sing + ing)',
  'sister': 'сестра',
  'skiing': 'катание на лыжах',
  'someone': 'кто-то',
  'something': 'что-то',
  'start': 'начинать(ся)',
  'staying': 'остающийся (stay + ing)',
  'stopped': 'перестал, прекратился',
  'storm': 'буря, гроза',
  'sun': 'солнце',
  'sundays': 'по воскресеньям',
  'sunny': 'солнечный',
  'sure': 'уверенный; I\'m sure — я уверен',
  'take': 'брать; take a shower — принять душ',
  'talk': 'разговаривать',
  'teach': 'преподавать, учить',
  'teacher': 'учитель',
  'tell': 'рассказывать, говорить',
  'that': 'тот, та; что',
  'them': 'их, им',
  'try': 'пробовать',
  'turn': 'поворачивать; turn off — выключить',
  'twice': 'дважды',
  'up': 'вверх; get up — вставать, go up — расти',
  'us': 'нас, нам',
  'vegetables': 'овощи',
  'walk': 'гулять, идти пешком',
  'want': 'хотеть',
  'wasn\'t': 'не был (= was not)',
  'we\'re': 'мы (= we are)',
  'we\'ve': 'мы (= we have)',
  'wear': 'носить (одежду)',
  'wearing': 'одетый в (wear + ing)',
  'win': 'выигрывать',
  'window': 'окно',
  'worry': 'волноваться',
  'yes': 'да',
  'young': 'молодой',
  'your': 'твой, ваш',
  'zero': 'ноль',
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


/* Дополнительная практика: короткие задания с объяснением каждого ответа.
   Справочники правил для предлогов:
   https://learnenglish.britishcouncil.org/grammar/a1-a2-grammar/prepositions-of-time-at-in-on
   https://dictionary.cambridge.org/grammar/british-grammar/at-on-and-in-time
*/
(function () {
  var extraTenses = {
    "present-simple": [
      {"type": "choice", "q": "My tutor usually ___ our lesson with a short conversation.", "options": ["starts", "start", "is start", "starting"], "explain": "Usually показывает привычку. My tutor = he/she: starts."},
      {"type": "choice", "q": "How often ___ you practise English outside your lessons?", "options": ["do", "does", "are", "is"], "explain": "Вопрос о регулярном действии: How often do you practise?"},
      {"type": "choice", "q": "My sister ___ coffee, so she always orders tea.", "options": ["doesn't drink", "don't drink", "isn't drink", "doesn't drinks"], "explain": "После doesn’t нужна начальная форма drink."},
      {"type": "choice", "q": "The last bus ___ at eleven every night.", "options": ["leaves", "leave", "leaving", "is leave"], "explain": "Расписание: Present Simple. The bus = it → leaves."},
      {"type": "choice", "q": "These exercises ___ me remember new words.", "options": ["help", "helps", "helping", "is help"], "explain": "Exercises — множественное число, поэтому help без -s."},
      {"type": "choice", "q": "___ your teacher give you homework after every lesson?", "options": ["Does", "Do", "Is", "Has"], "explain": "Your teacher = he/she: Does + give без -s."},
      {"type": "choice", "q": "My phone ___ much power when the screen is off.", "options": ["doesn't use", "don't use", "doesn't uses", "isn't use"], "explain": "Отрицание с it: doesn’t + use."},
      {"type": "choice", "q": "We ___ a short break after each exercise.", "options": ["take", "takes", "taking", "is take"], "explain": "Each exercise показывает повторение. We take."},
      {"type": "choice", "q": "The library ___ on Sundays.", "options": ["is closed", "are closed", "be closed", "does closed"], "explain": "The library = it: is closed — библиотека закрыта."},
      {"type": "choice", "q": "I ___ this word. What does it mean?", "options": ["don't understand", "doesn't understand", "am not understand", "not understanding"], "explain": "В обычном значении understand — состояние: don’t understand."},
      {"type": "choice", "q": "How much ___ this English course cost?", "options": ["does", "do", "is", "has"], "explain": "This course = it: How much does it cost?"},
      {"type": "choice", "q": "My friends ___ near the university.", "options": ["live", "lives", "living", "is live"], "explain": "My friends = they, поэтому live без -s."},
      {"type": "choice", "q": "She ___ her vocabulary notebook every evening.", "options": ["checks", "check", "checking", "is check"], "explain": "Every evening — привычка. She → checks."},
      {"type": "choice", "q": "___ you always write down new expressions?", "options": ["Do", "Does", "Are", "Have"], "explain": "Регулярное действие с you: Do you write…?"},
      {"type": "choice", "q": "There ___ two English classes in my timetable each week.", "options": ["are", "is", "be", "am"], "explain": "После there для множественного числа classes нужна форма are."}
    ],
    "present-continuous": [
      {"type": "choice", "q": "Please wait. I ___ an important email right now.", "options": ["am writing", "write", "is writing", "am write"], "explain": "Right now: am + writing."},
      {"type": "choice", "q": "Look! The dog ___ your sandwich.", "options": ["is eating", "eats", "are eating", "is eat"], "explain": "Событие перед глазами: is eating."},
      {"type": "choice", "q": "Why ___ you wearing a jacket indoors?", "options": ["are", "do", "is", "does"], "explain": "Wearing — форма -ing. С you нужна are."},
      {"type": "choice", "q": "We ___ in a hotel this week while our flat is being repaired.", "options": ["are staying", "is staying", "are stay", "staying"], "explain": "Временная ситуация на этой неделе: are staying."},
      {"type": "choice", "q": "She ___ today because she is ill.", "options": ["isn't working", "aren't working", "isn't work", "doesn't working"], "explain": "She → isn’t + working. Сегодня она временно не работает."},
      {"type": "choice", "q": "Listen! Someone ___ at the door.", "options": ["is knocking", "are knocking", "is knock", "knock"], "explain": "Someone — единственное число: is knocking."},
      {"type": "choice", "q": "What ___ your brother studying at the moment?", "options": ["is", "are", "does", "do"], "explain": "Your brother = he: What is he studying?"},
      {"type": "choice", "q": "I ___ to concentrate. Could you turn the music down?", "options": ["am trying", "is trying", "am try", "tries"], "explain": "Попытка происходит сейчас: am trying."},
      {"type": "choice", "q": "The children ___ in the garden now.", "options": ["are playing", "is playing", "are play", "plays"], "explain": "The children = they: are playing."},
      {"type": "choice", "q": "Be quiet, please. We ___ a listening exercise.", "options": ["are doing", "is doing", "are do", "does"], "explain": "Просьба соблюдать тишину относится к действию сейчас: are doing."},
      {"type": "choice", "q": "I ___ my old laptop this week because mine is broken.", "options": ["am using", "is using", "am use", "uses"], "explain": "Временная ситуация: am using."},
      {"type": "choice", "q": "Where ___ you going right now?", "options": ["are", "do", "does", "is"], "explain": "Вопрос о действии сейчас: Where are you going?"},
      {"type": "choice", "q": "The weather ___ colder day by day.", "options": ["is getting", "are getting", "is get", "get"], "explain": "Постепенное изменение: is getting colder."},
      {"type": "choice", "q": "They ___ for the test at the moment.", "options": ["are preparing", "is preparing", "are prepare", "prepares"], "explain": "At the moment — сейчас: are preparing."},
      {"type": "choice", "q": "Sorry, I cannot talk now. I ___ for my English class.", "options": ["am preparing", "is preparing", "am prepare", "prepares"], "explain": "Действие сейчас: am preparing."}
    ],
    "past-simple": [
      {"type": "choice", "q": "I ___ my first English lesson three months ago.", "options": ["had", "have", "has", "have had"], "explain": "Three months ago — завершённое прошлое: have → had."},
      {"type": "choice", "q": "We ___ the new rule in our lesson yesterday.", "options": ["learnt", "learn", "have learnt", "learning"], "explain": "Yesterday → Past Simple. Learnt — британская форма; learned тоже существует, но её нет среди вариантов."},
      {"type": "choice", "q": "___ you finish your homework last night?", "options": ["Did", "Do", "Have", "Were"], "explain": "Last night: Did + finish без изменений."},
      {"type": "choice", "q": "She ___ the answer, so she asked her tutor.", "options": ["didn't know", "didn't knew", "doesn't know", "wasn't know"], "explain": "После didn’t нужна начальная форма know."},
      {"type": "choice", "q": "The lesson ___ ten minutes late yesterday.", "options": ["began", "begin", "has begun", "beginned"], "explain": "Завершённое прошлое: begin → began."},
      {"type": "choice", "q": "I ___ this notebook at the bookshop last Saturday.", "options": ["bought", "buy", "have bought", "buyed"], "explain": "Last Saturday: buy → bought."},
      {"type": "choice", "q": "Where ___ you put my dictionary yesterday?", "options": ["did", "do", "have", "were"], "explain": "Вопрос о завершённом действии: Where did you put…?"},
      {"type": "choice", "q": "We ___ any new words in our last lesson.", "options": ["didn't learn", "didn't learnt", "don't learn", "weren't learn"], "explain": "Our last lesson — прошлое. Didn’t + learn."},
      {"type": "choice", "q": "He ___ his keys on the train two days ago.", "options": ["left", "leave", "has left", "leaved"], "explain": "Two days ago → Past Simple: leave → left."},
      {"type": "choice", "q": "My parents ___ at home when I called yesterday.", "options": ["were", "was", "are", "have been"], "explain": "My parents = they: were."},
      {"type": "choice", "q": "I ___ the wrong bus yesterday and arrived late.", "options": ["took", "take", "have taken", "taked"], "explain": "Yesterday: take → took."},
      {"type": "choice", "q": "How many exercises ___ you do in your last class?", "options": ["did", "do", "have", "were"], "explain": "Last class: did. Основной глагол do остаётся в начальной форме."},
      {"type": "choice", "q": "She ___ me a message after the lesson yesterday.", "options": ["sent", "send", "has sent", "sended"], "explain": "Вчера: send → sent."},
      {"type": "choice", "q": "We ___ the film because it was too boring.", "options": ["didn't finish", "didn't finished", "don't finish", "weren't finish"], "explain": "Завершённая ситуация в прошлом: didn’t finish."},
      {"type": "choice", "q": "The teacher ___ the mistake and explained the rule.", "options": ["noticed", "notice", "has notice", "noticing"], "explain": "Последовательность завершённых действий: noticed and explained."}
    ],
    "past-continuous": [
      {"type": "choice", "q": "At eight yesterday evening, I ___ my English homework.", "options": ["was doing", "were doing", "am doing", "was do"], "explain": "I + процесс в конкретный момент прошлого: was doing."},
      {"type": "choice", "q": "They ___ dinner when the lights went out.", "options": ["were cooking", "was cooking", "are cooking", "were cook"], "explain": "They → were cooking; lights went out — прервавшее событие."},
      {"type": "choice", "q": "What ___ she reading when you arrived?", "options": ["was", "were", "did", "is"], "explain": "She + reading в прошлом: was."},
      {"type": "choice", "q": "I ___ to a podcast when my tutor called.", "options": ["was listening", "were listening", "am listening", "was listen"], "explain": "Слушал в тот момент, когда позвонил репетитор: was listening."},
      {"type": "choice", "q": "We ___ TV at that moment; we were studying.", "options": ["weren't watching", "wasn't watching", "didn't watching", "aren't watch"], "explain": "We → weren’t watching. Действие относится к моменту прошлого."},
      {"type": "choice", "q": "At this time yesterday, she ___ home from work.", "options": ["was driving", "were driving", "is driving", "was drive"], "explain": "At this time yesterday — процесс в тот момент: was driving."},
      {"type": "choice", "q": "Why ___ the children laughing when you entered?", "options": ["were", "was", "did", "are"], "explain": "Children = they: Why were they laughing?"},
      {"type": "choice", "q": "The rain ___ heavily when we got off the bus.", "options": ["was falling", "were falling", "is falling", "was fall"], "explain": "Фон для события got off: was falling."},
      {"type": "choice", "q": "While I was taking notes, my tutor ___ the rule.", "options": ["was explaining", "were explaining", "is explaining", "was explain"], "explain": "Два одновременных процесса в прошлом: was explaining."},
      {"type": "choice", "q": "At noon yesterday, we ___ for our train.", "options": ["were waiting", "was waiting", "are waiting", "were wait"], "explain": "We + процесс в полдень вчера: were waiting."},
      {"type": "choice", "q": "He ___ headphones, so he did not hear me call his name.", "options": ["was wearing", "were wearing", "is wearing", "was wear"], "explain": "В тот момент на нём были наушники: was wearing."},
      {"type": "choice", "q": "Who ___ sitting next to you when the lesson started?", "options": ["was", "were", "did", "is"], "explain": "Who как подлежащее без указания множественного числа: Who was sitting…?"},
      {"type": "choice", "q": "I ___ well when you saw me yesterday.", "options": ["wasn't feeling", "weren't feeling", "didn't feeling", "wasn't feel"], "explain": "I → wasn’t feeling. Самочувствие в тот момент прошлого."},
      {"type": "choice", "q": "The students ___ quietly when the teacher entered.", "options": ["were working", "was working", "are working", "were work"], "explain": "Students = they: were working."},
      {"type": "choice", "q": "She ___ a new word in her notebook when the phone rang.", "options": ["was writing", "were writing", "is writing", "was write"], "explain": "Записывала слово в момент звонка: was writing."}
    ],
    "present-perfect": [
      {"type": "choice", "q": "I ___ this word before, but I cannot remember its meaning.", "options": ["have seen", "have saw", "has seen", "am seen"], "explain": "Опыт к настоящему моменту: have + V3 seen."},
      {"type": "choice", "q": "She ___ her homework, so she can relax now.", "options": ["has finished", "have finished", "has finish", "is finished her"], "explain": "Результат сейчас, she → has finished."},
      {"type": "choice", "q": "___ you ever tried learning with flashcards?", "options": ["Have", "Has", "Do", "Are"], "explain": "Have you ever + V3 — вопрос об опыте."},
      {"type": "choice", "q": "We ___ each other since primary school.", "options": ["have known", "have knew", "has known", "are known"], "explain": "Since + начальная точка, состояние продолжается сейчас: have known."},
      {"type": "choice", "q": "He ___ his glasses. He cannot find them anywhere.", "options": ["has lost", "have lost", "has lose", "is lost"], "explain": "Результат сейчас: очков нет. He → has lost."},
      {"type": "choice", "q": "I ___ the new exercises yet.", "options": ["haven't done", "hasn't done", "haven't did", "don't done"], "explain": "Yet в отрицании: haven’t + V3 done."},
      {"type": "choice", "q": "How many English books ___ you read so far?", "options": ["have", "has", "do", "are"], "explain": "So far — к настоящему моменту: have you read."},
      {"type": "choice", "q": "My pronunciation ___ a lot since I started lessons.", "options": ["has improved", "have improved", "has improve", "is improve"], "explain": "Изменение с начала занятий до сейчас: has improved."},
      {"type": "choice", "q": "They ___ to Canada twice in their lives.", "options": ["have been", "has been", "have was", "are been"], "explain": "Жизненный опыт: have been."},
      {"type": "choice", "q": "She ___ her vocabulary notebook at home. She needs it now.", "options": ["has left", "have left", "has leave", "is left"], "explain": "Оставила, и это важно сейчас: has left."},
      {"type": "choice", "q": "___ your tutor checked your homework yet?", "options": ["Has", "Have", "Does", "Is"], "explain": "Your tutor = he/she: Has + checked."},
      {"type": "choice", "q": "I ___ three new expressions today, and the day is not over.", "options": ["have learnt", "has learnt", "have learn", "am learnt"], "explain": "Незаконченный период до сейчас: have learnt."},
      {"type": "choice", "q": "We ___ this grammar point before.", "options": ["haven't studied", "hasn't studied", "haven't study", "don't studied"], "explain": "Опыт: haven’t studied."},
      {"type": "choice", "q": "My brother ___ a new job. He starts tomorrow.", "options": ["has found", "have found", "has find", "is found"], "explain": "Результат сейчас: has found, find → found."},
      {"type": "choice", "q": "How long ___ she lived in this city?", "options": ["has", "have", "does", "is"], "explain": "How long + ситуация до настоящего: has she lived."}
    ],
    "future": [
      {"type": "choice", "q": "Your bag looks heavy. I ___ carry it for you.", "options": ["will", "am", "going to", "will to"], "explain": "Предложение помощи в момент речи: will + carry."},
      {"type": "choice", "q": "I promise I ___ forget our next lesson.", "options": ["won't", "don't", "am not", "won't to"], "explain": "Обещание: won’t + forget."},
      {"type": "choice", "q": "We ___ study together tomorrow. We made this plan yesterday.", "options": ["are going to", "is going to", "going to", "are go to"], "explain": "Заранее принятое намерение: are going to."},
      {"type": "choice", "q": "Watch out! That glass ___ fall off the table!", "options": ["is going to", "are going to", "going to", "is go to"], "explain": "Видна непосредственная опасность: is going to."},
      {"type": "choice", "q": "___ you send me the homework, please?", "options": ["Will", "Are", "Have", "Did"], "explain": "Will you…? — просьба о будущем действии."},
      {"type": "choice", "q": "I have decided: I ___ practise for ten minutes every morning.", "options": ["am going to", "is going to", "going to", "am go to"], "explain": "Решение уже принято: am going to."},
      {"type": "choice", "q": "I think online lessons ___ become more popular.", "options": ["will", "are", "going to", "will to"], "explain": "Прогноз: will + become."},
      {"type": "choice", "q": "Do not worry. I ___ explain it again.", "options": ["will", "am", "going to", "will to"], "explain": "Обещание помочь сейчас: will explain."},
      {"type": "choice", "q": "She ___ start a new English course next month. She has already chosen it.", "options": ["is going to", "are going to", "going to", "is go to"], "explain": "Заранее выбранный план, she → is going to."},
      {"type": "choice", "q": "Maybe we ___ need more time to finish this exercise.", "options": ["will", "are", "going to", "will to"], "explain": "Предположение о будущем: will need."},
      {"type": "choice", "q": "I am thirsty. I ___ get a glass of water.", "options": ["will", "am", "going to", "will to"], "explain": "Решение в момент речи: will get."},
      {"type": "choice", "q": "What ___ he going to study at university?", "options": ["is", "are", "will", "does"], "explain": "В конструкции be going to с he нужна is."},
      {"type": "choice", "q": "They ___ move house this year. They have decided to stay.", "options": ["aren't going to", "isn't going to", "don't going to", "aren't go to"], "explain": "Отрицание заранее принятого плана с they: aren’t going to."},
      {"type": "choice", "q": "I am sure your English ___ improve with practice.", "options": ["will", "is", "going to", "will to"], "explain": "Уверенный прогноз: will improve."},
      {"type": "choice", "q": "We ___ miss the train! It leaves in two minutes and we are still at home.", "options": ["are going to", "is going to", "going to", "are go to"], "explain": "Есть очевидные признаки будущего результата: are going to miss."}
    ]
  };
  window.CONTENT.sections[0].topics.forEach(function (topic) {
    (extraTenses[topic.id] || []).forEach(function (q) { topic.questions.push(q); });
  });
  window.CONTENT.sections.splice(1, 0, {"id": "prepositions-time", "icon": "📅", "title": "At / In / On", "desc": "Время, даты и исключения", "multi": true,
    "topics": [
      {"id": "time-months", "title": "Месяцы, годы и сезоны", "theory": "<p><b>In</b> ставим перед месяцами, годами, сезонами и длинными периодами: in May, in 2025, in winter, in the 1990s.</p><p>Если появляется конкретная дата, выбираем <b>on</b>: in May → on 12 May.</p><p><b>In ten minutes</b> — через десять минут. <b>In two hours</b> также может означать «за два часа»: смысл задаёт предложение.</p>",
        "questions": [
          {"type": "choice", "q": "My birthday is ___ April.", "options": ["in", "at", "on", "Без предлога"], "explain": "Месяц без числа: in April."},
          {"type": "choice", "q": "We moved to this city ___ 2021.", "options": ["in", "at", "on", "Без предлога"], "explain": "Перед годом: in 2021."},
          {"type": "choice", "q": "It often snows here ___ winter.", "options": ["in", "at", "on", "Без предлога"], "explain": "Перед временем года: in winter."},
          {"type": "choice", "q": "Our English course starts ___ September.", "options": ["in", "at", "on", "Без предлога"], "explain": "Перед месяцем: in September."},
          {"type": "choice", "q": "My grandmother was born ___ the 1950s.", "options": ["in", "at", "on", "Без предлога"], "explain": "Перед десятилетием: in the 1950s."},
          {"type": "choice", "q": "Many people worked on farms ___ the nineteenth century.", "options": ["in", "at", "on", "Без предлога"], "explain": "Перед веком: in the nineteenth century."},
          {"type": "choice", "q": "The flowers look beautiful ___ spring.", "options": ["in", "at", "on", "Без предлога"], "explain": "Время года: in spring."},
          {"type": "choice", "q": "We usually go swimming ___ summer.", "options": ["in", "at", "on", "Без предлога"], "explain": "Время года: in summer."},
          {"type": "choice", "q": "The leaves turn yellow ___ autumn.", "options": ["in", "at", "on", "Без предлога"], "explain": "Время года: in autumn. Американский вариант: in fall."},
          {"type": "choice", "q": "I first met my tutor ___ January.", "options": ["in", "at", "on", "Без предлога"], "explain": "Месяц: in January."},
          {"type": "choice", "q": "The next lesson begins ___ ten minutes.", "options": ["in", "at", "on", "Без предлога"], "explain": "До начала осталось десять минут: in ten minutes — через десять минут."},
          {"type": "choice", "q": "I will call you ___ an hour.", "options": ["in", "at", "on", "Без предлога"], "explain": "In an hour — через час."},
          {"type": "choice", "q": "She learnt the poem ___ two hours.", "options": ["in", "at", "on", "Без предлога"], "explain": "Здесь in two hours означает время, потребовавшееся на результат: за два часа."},
          {"type": "choice", "q": "People travelled differently ___ the past.", "options": ["in", "at", "on", "Без предлога"], "explain": "Устойчивое выражение: in the past — в прошлом."},
          {"type": "choice", "q": "I hope to speak more confidently ___ the future.", "options": ["in", "at", "on", "Без предлога"], "explain": "Устойчивое выражение: in the future — в будущем."},
          {"type": "choice", "q": "They got married ___ June 2020.", "options": ["in", "at", "on", "Без предлога"], "explain": "Месяц и год без конкретного дня: in June 2020."},
          {"type": "choice", "q": "The museum opened ___ 1998.", "options": ["in", "at", "on", "Без предлога"], "explain": "Перед годом: in 1998."},
          {"type": "choice", "q": "My holidays are usually ___ August.", "options": ["in", "at", "on", "Без предлога"], "explain": "Перед месяцем: in August."},
          {"type": "choice", "q": "Our city is very quiet ___ February.", "options": ["in", "at", "on", "Без предлога"], "explain": "Перед месяцем: in February."},
          {"type": "choice", "q": "The new term starts ___ the autumn.", "options": ["in", "at", "on", "Без предлога"], "explain": "Сезоны допускают артикль the: in autumn и in the autumn."}
        ]
      },
      {"id": "time-days", "title": "Дни, даты и конкретное утро", "theory": "<p><b>On</b> — дни недели и даты: on Monday, on 12 May, on my birthday.</p><p>Обычно говорим <b>in the morning</b>, но с конкретным днём — <b>on Monday morning</b>, on a cold winter evening.</p><p>On Christmas Day — именно день Рождества. Для периода рождественских праздников в британском английском: at Christmas.</p>",
        "questions": [
          {"type": "choice", "q": "I have an English lesson ___ Tuesday.", "options": ["on", "at", "in", "Без предлога"], "explain": "Перед днём недели: on Tuesday."},
          {"type": "choice", "q": "The meeting is ___ 14 March.", "options": ["on", "at", "in", "Без предлога"], "explain": "Конкретная дата: on 14 March."},
          {"type": "choice", "q": "We always have a family dinner ___ my birthday.", "options": ["on", "at", "in", "Без предлога"], "explain": "Особый конкретный день: on my birthday."},
          {"type": "choice", "q": "She called me ___ Monday morning.", "options": ["on", "at", "in", "Без предлога"], "explain": "Уточнено, какое утро: on Monday morning, а не in Monday morning."},
          {"type": "choice", "q": "The shop closes early ___ Fridays.", "options": ["on", "at", "in", "Без предлога"], "explain": "День недели во множественном числе: on Fridays — по пятницам."},
          {"type": "choice", "q": "They arrived ___ a cold winter evening.", "options": ["on", "at", "in", "Без предлога"], "explain": "Конкретный вечер с описанием: on a cold winter evening."},
          {"type": "choice", "q": "We open our presents ___ Christmas Day.", "options": ["on", "at", "in", "Без предлога"], "explain": "Christmas Day — конкретный день: on Christmas Day."},
          {"type": "choice", "q": "The banks are closed ___ New Year's Day.", "options": ["on", "at", "in", "Без предлога"], "explain": "Название конкретного праздничного дня: on New Year’s Day."},
          {"type": "choice", "q": "My exam is ___ the fifth of June.", "options": ["on", "at", "in", "Без предлога"], "explain": "Дата с порядковым числительным: on the fifth of June."},
          {"type": "choice", "q": "We met ___ Saturday afternoon.", "options": ["on", "at", "in", "Без предлога"], "explain": "Часть конкретного дня: on Saturday afternoon."},
          {"type": "choice", "q": "The concert is ___ Sunday evening.", "options": ["on", "at", "in", "Без предлога"], "explain": "Уточнённый вечер: on Sunday evening."},
          {"type": "choice", "q": "She was born ___ 2 November 1999.", "options": ["on", "at", "in", "Без предлога"], "explain": "Есть число, месяц и год: on 2 November 1999."},
          {"type": "choice", "q": "We usually practise speaking ___ Wednesdays.", "options": ["on", "at", "in", "Без предлога"], "explain": "On Wednesdays — по средам."},
          {"type": "choice", "q": "The train leaves ___ the first of July.", "options": ["on", "at", "in", "Без предлога"], "explain": "Конкретная дата: on the first of July."},
          {"type": "choice", "q": "He sent me flowers ___ Valentine's Day.", "options": ["on", "at", "in", "Без предлога"], "explain": "Конкретный день: on Valentine’s Day."},
          {"type": "choice", "q": "We went for a walk ___ a sunny Sunday.", "options": ["on", "at", "in", "Без предлога"], "explain": "Конкретный день с описанием: on a sunny Sunday."},
          {"type": "choice", "q": "Her flight arrives ___ Thursday night.", "options": ["on", "at", "in", "Без предлога"], "explain": "Уточнена конкретная ночь: on Thursday night."},
          {"type": "choice", "q": "The party is ___ the last day of the course.", "options": ["on", "at", "in", "Без предлога"], "explain": "Последний день курса — конкретный день: on the last day."},
          {"type": "choice", "q": "We had our first lesson ___ a rainy September morning.", "options": ["on", "at", "in", "Без предлога"], "explain": "Не утро вообще, а конкретное описанное утро: on a rainy September morning."},
          {"type": "choice", "q": "I do not work ___ Sundays.", "options": ["on", "at", "in", "Без предлога"], "explain": "Дни недели: on Sundays."}
        ]
      },
      {"id": "time-hours", "title": "Часы, части суток и night", "theory": "<p><b>At</b> — точное время: at seven, at 8:30, at noon, at midnight. Также: at lunchtime, at night, at the moment.</p><p><b>In</b> — in the morning, in the afternoon, in the evening.</p><p><b>At night</b> — ночью вообще, по ночам. <b>In the night</b> — в течение определённой ночи; в американском английском часто during the night.</p>",
        "questions": [
          {"type": "choice", "q": "My lesson starts ___ seven o'clock.", "options": ["at", "in", "on", "Без предлога"], "explain": "Точное время: at seven o’clock."},
          {"type": "choice", "q": "We have lunch ___ noon.", "options": ["at", "in", "on", "Без предлога"], "explain": "Noon — полдень, точка во времени: at noon."},
          {"type": "choice", "q": "The last train leaves ___ midnight.", "options": ["at", "in", "on", "Без предлога"], "explain": "Midnight — полночь: at midnight."},
          {"type": "choice", "q": "I usually study English ___ the evening.", "options": ["in", "at", "on", "Без предлога"], "explain": "Часть суток без конкретного дня: in the evening."},
          {"type": "choice", "q": "She goes running ___ the morning.", "options": ["in", "at", "on", "Без предлога"], "explain": "Часть суток: in the morning."},
          {"type": "choice", "q": "We often feel sleepy ___ the afternoon.", "options": ["in", "at", "on", "Без предлога"], "explain": "Часть суток: in the afternoon."},
          {"type": "choice", "q": "My brother works ___ night.", "options": ["at", "in", "on", "Без предлога"], "explain": "Ночь вообще, регулярная работа: at night."},
          {"type": "choice", "q": "I cannot answer the phone ___ the moment.", "options": ["at", "in", "on", "Без предлога"], "explain": "Устойчивое выражение at the moment — в данный момент."},
          {"type": "choice", "q": "The film begins ___ 8:30 p.m.", "options": ["at", "in", "on", "Без предлога"], "explain": "Точное время: at 8:30 p.m."},
          {"type": "choice", "q": "We usually talk ___ lunchtime.", "options": ["at", "in", "on", "Без предлога"], "explain": "Время приёма пищи: at lunchtime."},
          {"type": "choice", "q": "I wake up ___ six every weekday.", "options": ["at", "in", "on", "Без предлога"], "explain": "Точное время: at six."},
          {"type": "choice", "q": "The streets are very quiet ___ dawn.", "options": ["at", "in", "on", "Без предлога"], "explain": "At dawn — на рассвете."},
          {"type": "choice", "q": "We reached the village ___ sunset.", "options": ["at", "in", "on", "Без предлога"], "explain": "At sunset — на закате."},
          {"type": "choice", "q": "I prefer reading ___ the evening, after dinner.", "options": ["in", "at", "on", "Без предлога"], "explain": "Вечер как часть суток: in the evening."},
          {"type": "choice", "q": "She usually takes a short walk ___ the afternoon.", "options": ["in", "at", "on", "Без предлога"], "explain": "Часть суток: in the afternoon."},
          {"type": "choice", "q": "My alarm rings ___ 6:45.", "options": ["at", "in", "on", "Без предлога"], "explain": "Часы и минуты: at 6:45."},
          {"type": "choice", "q": "We do not make much noise ___ night.", "options": ["at", "in", "on", "Без предлога"], "explain": "Ночью вообще: at night."},
          {"type": "choice", "q": "I heard a strange noise ___ the night.", "options": ["in", "at", "on", "Без предлога"], "explain": "В течение определённой ночи: in the night. Подсказка — артикль the."},
          {"type": "choice", "q": "She told me the news ___ breakfast.", "options": ["at", "in", "on", "Без предлога"], "explain": "За завтраком: at breakfast."},
          {"type": "choice", "q": "Please call me ___ midday.", "options": ["at", "in", "on", "Без предлога"], "explain": "Midday — полдень: at midday."}
        ]
      },
      {"id": "time-no-preposition", "title": "Когда предлог не нужен", "theory": "<p>Перед <b>next, last, this, every, each</b> + временем обычно нет at / in / on: next Monday, last year, this evening, every morning.</p><p>Также без предлога: <b>today, tomorrow, yesterday, tonight, all day</b>.</p><p>Но <b>in the next few days</b> — другая конструкция с the. Сравни: next week — in the next few weeks.</p>",
        "questions": [
          {"type": "choice", "q": "I have a lesson ___ next Monday.", "options": ["Без предлога", "at", "in", "on"], "explain": "Перед next + день недели предлог не нужен: next Monday."},
          {"type": "choice", "q": "We moved here ___ last year.", "options": ["Без предлога", "at", "in", "on"], "explain": "Перед last + время предлог не нужен: last year."},
          {"type": "choice", "q": "I am busy ___ this evening.", "options": ["Без предлога", "at", "in", "on"], "explain": "Перед this + время предлог не нужен: this evening."},
          {"type": "choice", "q": "She revises new words ___ every morning.", "options": ["Без предлога", "at", "in", "on"], "explain": "Перед every + время предлог не нужен: every morning."},
          {"type": "choice", "q": "I will call you ___ tomorrow.", "options": ["Без предлога", "at", "in", "on"], "explain": "Перед tomorrow нет at / in / on."},
          {"type": "choice", "q": "We had a great lesson ___ yesterday.", "options": ["Без предлога", "at", "in", "on"], "explain": "Перед yesterday предлог не нужен."},
          {"type": "choice", "q": "Are you free ___ tonight?", "options": ["Без предлога", "at", "in", "on"], "explain": "Tonight употребляется без предлога."},
          {"type": "choice", "q": "I have already practised ___ today.", "options": ["Без предлога", "at", "in", "on"], "explain": "Today употребляется без предлога."},
          {"type": "choice", "q": "The course starts ___ next month.", "options": ["Без предлога", "at", "in", "on"], "explain": "Next month — без предлога. Сравни: in May."},
          {"type": "choice", "q": "She visited London ___ last summer.", "options": ["Без предлога", "at", "in", "on"], "explain": "Last summer — без предлога. Сравни: in summer."},
          {"type": "choice", "q": "We meet ___ every Tuesday.", "options": ["Без предлога", "at", "in", "on"], "explain": "Every Tuesday — без предлога. Сравни: on Tuesdays."},
          {"type": "choice", "q": "I studied ___ all day.", "options": ["Без предлога", "at", "in", "on"], "explain": "All day — весь день, предлог не нужен."},
          {"type": "choice", "q": "My tutor gives me a short test ___ each week.", "options": ["Без предлога", "at", "in", "on"], "explain": "Each week — без предлога."},
          {"type": "choice", "q": "We are going away ___ this weekend.", "options": ["Без предлога", "at", "in", "on"], "explain": "This weekend — без предлога в обоих вариантах английского."},
          {"type": "choice", "q": "The meeting was ___ last Friday.", "options": ["Без предлога", "at", "in", "on"], "explain": "Last Friday — без предлога."},
          {"type": "choice", "q": "I want to travel more ___ next year.", "options": ["Без предлога", "at", "in", "on"], "explain": "Next year — без предлога."},
          {"type": "choice", "q": "I spoke to my tutor ___ this morning.", "options": ["Без предлога", "at", "in", "on"], "explain": "This morning — без предлога."},
          {"type": "choice", "q": "They will arrive ___ tomorrow evening.", "options": ["Без предлога", "at", "in", "on"], "explain": "Tomorrow evening — без предлога."},
          {"type": "choice", "q": "I listen to a podcast ___ every night.", "options": ["Без предлога", "at", "in", "on"], "explain": "Every night — без предлога. Сравни: at night."},
          {"type": "choice", "q": "We stayed at home ___ last weekend.", "options": ["Без предлога", "at", "in", "on"], "explain": "Last weekend — без предлога."}
        ]
      },
      {"id": "time-traps", "title": "Исключения и похожие выражения", "theory": "<p><b>On time</b> — вовремя, по расписанию. <b>In time</b> — успеть до того, как станет поздно: in time to catch the bus.</p><p><b>At the end of</b> — в конце конкретного периода. <b>In the end</b> — в итоге.</p><p>Британский вариант: <b>at the weekend / at weekends</b>. Американский: <b>on the weekend / on weekends</b>. В вопросах нужный вариант указан явно.</p><p>Перед месяцем — in May; перед датой — on 5 May. Перед Christmas Day — on; перед Christmas как периодом праздников в британском английском — at.</p>",
        "questions": [
          {"type": "choice", "q": "The train left exactly ___ time, as scheduled.", "options": ["on", "at", "in", "Без предлога"], "explain": "On time — точно по расписанию."},
          {"type": "choice", "q": "We arrived just ___ time to catch the last bus.", "options": ["in", "at", "on", "Без предлога"], "explain": "In time to… — успеть сделать что-то до того, как станет поздно."},
          {"type": "choice", "q": "I will send the report ___ the end of the week.", "options": ["at", "in", "on", "Без предлога"], "explain": "At the end of + конкретный период: в конце недели."},
          {"type": "choice", "q": "We discussed several plans. ___ the end, we decided to stay home.", "options": ["in", "at", "on", "Без предлога"], "explain": "In the end — в итоге. Это результат обсуждения, а не конец периода."},
          {"type": "choice", "q": "In Britain, people often visit relatives ___ the weekend.", "options": ["at", "in", "on", "Без предлога"], "explain": "В стандартном британском варианте: at the weekend. В американском on the weekend тоже правильно.", "hint": "Выберите британский вариант."},
          {"type": "choice", "q": "In the US, people often visit relatives ___ the weekend.", "options": ["on", "at", "in", "Без предлога"], "explain": "В стандартном американском варианте: on the weekend. В британском at the weekend тоже правильно.", "hint": "Выберите американский вариант."},
          {"type": "choice", "q": "We usually get together ___ Christmas.", "options": ["at", "in", "on", "Без предлога"], "explain": "В британском английском at Christmas — в период рождественских праздников.", "hint": "Британский вариант; речь о периоде праздников."},
          {"type": "choice", "q": "We have a special family lunch ___ Christmas Day.", "options": ["on", "at", "in", "Без предлога"], "explain": "Christmas Day — конкретный день: on Christmas Day."},
          {"type": "choice", "q": "My course starts ___ May.", "options": ["in", "at", "on", "Без предлога"], "explain": "Месяц без конкретной даты: in May."},
          {"type": "choice", "q": "My course starts ___ 5 May.", "options": ["on", "at", "in", "Без предлога"], "explain": "Есть число: on 5 May."},
          {"type": "choice", "q": "I usually read ___ the morning.", "options": ["in", "at", "on", "Без предлога"], "explain": "Утро вообще: in the morning."},
          {"type": "choice", "q": "We met ___ Friday morning.", "options": ["on", "at", "in", "Без предлога"], "explain": "Конкретное утро пятницы: on Friday morning."},
          {"type": "choice", "q": "I do not study ___ night.", "options": ["at", "in", "on", "Без предлога"], "explain": "Ночью вообще: at night."},
          {"type": "choice", "q": "I woke up twice ___ the night.", "options": ["in", "at", "on", "Без предлога"], "explain": "В течение той ночи: in the night. Сравни: at night — ночью вообще."},
          {"type": "choice", "q": "We are travelling ___ next week.", "options": ["Без предлога", "at", "in", "on"], "explain": "Next week — без предлога."},
          {"type": "choice", "q": "I will finish the book ___ the next few days.", "options": ["in", "at", "on", "Без предлога"], "explain": "In the next few days — в ближайшие несколько дней. Не путай с next week без артикля."},
          {"type": "choice", "q": "She called me ___ the beginning of the lesson.", "options": ["at", "in", "on", "Без предлога"], "explain": "At the beginning of + конкретный период."},
          {"type": "choice", "q": "___ first, the rule seemed difficult, but now I understand it.", "options": ["at", "in", "on", "Без предлога"], "explain": "At first — сначала, поначалу."},
          {"type": "choice", "q": "We finally found the answer ___ the end.", "options": ["in", "at", "on", "Без предлога"], "explain": "In the end — в итоге, в конце концов."},
          {"type": "choice", "q": "She reached the station ___ time for the last train.", "options": ["in", "at", "on", "Без предлога"], "explain": "In time for… — успеть к событию, пока не поздно."}
        ]
      }
    ]
  });
})();
