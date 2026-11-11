/*
  Собирает все английские фразы и слова, которые приложение может озвучить,
  и печатает JSON: [{ "key": "имя файла", "text": "текст для озвучки" }, ...]
  Запуск: node tools/collect_texts.js > texts.json
*/
const path = require('path');
global.window = globalThis;
require(path.join(__dirname, '..', 'exercises.js'));
const { speechText, speechKey, questionSpeech } = require('./speech-key.js');

const out = new Map();
function add(t) {
  if (!t) return;
  const text = speechText(t);
  if (!text) return;
  const key = speechKey(text);
  if (!out.has(key)) out.set(key, text);
}
function words(text) {
  return (String(text).match(/a\.m\.|p\.m\.|[A-Za-z]+(?:['’][A-Za-z]+)?/g) || []);
}

// Фраза для проверки голоса в настройках
add("Hi! I'm going to help you practise your English.");

window.CONTENT.sections.forEach((sec) => {
  sec.topics.forEach((t) => {
    (t.questions || []).forEach((q) => {
      if (q.type === 'order') add(q.en);
      if (q.type === 'choice' && q.q.indexOf('___') !== -1) {
        add(questionSpeech(q));
        words(q.q.replace(/___/g, ' ')).forEach(add);   // слова, на которые можно нажать
      }
    });
    (t.phrases || []).forEach((p) => add(p[1]));
    (t.words || []).forEach((w) => add(w[0]));
    (t.verbs || []).forEach((v) => add(v[0] + ', ' + v[1].replace('/', ', ') + ', ' + v[2]));
  });
});
Object.keys(window.GLOSSARY || {}).forEach(add);

process.stdout.write(JSON.stringify([...out].map(([key, text]) => ({ key, text })), null, 1));
