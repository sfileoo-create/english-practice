/*
  Общие правила для озвучки: как из текста получается имя аудиофайла.
  Используется и приложением (app.js), и скриптом сбора фраз (collect_texts.js),
  поэтому обе стороны всегда находят один и тот же файл.
*/
(function (root) {
  function speechText(t) {
    return String(t).replace(/…/g, '').replace(/\s*\/\s*/g, '. ').replace(/\s+/g, ' ').trim();
  }
  function speechKey(t) {
    var s = speechText(t).toLowerCase();
    var h = 0x811c9dc5;
    for (var i = 0; i < s.length; i++) {
      h ^= s.charCodeAt(i);
      h = Math.imul(h, 0x01000193) >>> 0;
    }
    return ('0000000' + h.toString(16)).slice(-8);
  }
  root.speechText = speechText;
  root.speechKey = speechKey;
  if (typeof module !== 'undefined') module.exports = { speechText: speechText, speechKey: speechKey };
})(typeof window !== 'undefined' ? window : globalThis);
