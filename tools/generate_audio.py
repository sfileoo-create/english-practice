"""
Озвучивает фразы из texts.json нейросетевым голосом Kokoro и кладёт mp3 в папку audio/.
Уже готовые файлы не пересоздаются, лишние удаляются.
Запуск: python tools/generate_audio.py texts.json
"""
import json
import os
import subprocess
import sys
import tempfile

import soundfile as sf
from kokoro_onnx import Kokoro

VOICE = os.environ.get("VOICE", "af_heart")     # американский женский голос
SPEED = float(os.environ.get("SPEED", "0.95"))
OUT = "audio"

items = json.load(open(sys.argv[1], encoding="utf-8"))
os.makedirs(OUT, exist_ok=True)

# Если сменили голос — переозвучиваем всё
meta_path = os.path.join(OUT, "voice.txt")
old_voice = open(meta_path).read().strip() if os.path.exists(meta_path) else None
force = old_voice != f"{VOICE} {SPEED}"

kokoro = Kokoro("models/kokoro-v1.0.onnx", "models/voices-v1.0.bin")
keys = set()
made = failed = 0
for it in items:
    key, text = it["key"], it["text"]
    mp3 = os.path.join(OUT, key + ".mp3")
    if os.path.exists(mp3) and not force:
        keys.add(key)
        continue
    try:
        samples, rate = kokoro.create(text, voice=VOICE, speed=SPEED, lang="en-us")
        with tempfile.NamedTemporaryFile(suffix=".wav", delete=False) as tmp:
            sf.write(tmp.name, samples, rate)
        subprocess.run(
            ["ffmpeg", "-y", "-loglevel", "error", "-i", tmp.name, "-ac", "1", "-b:a", "48k", mp3],
            check=True,
        )
        os.unlink(tmp.name)
        keys.add(key)
        made += 1
    except Exception as e:  # одна неудачная фраза не должна ломать всё
        failed += 1
        print(f"FAILED {text!r}: {e}")

for f in os.listdir(OUT):
    if f.endswith(".mp3") and f[:-4] not in keys:
        os.remove(os.path.join(OUT, f))

json.dump(sorted(keys), open(os.path.join(OUT, "index.json"), "w"))
open(meta_path, "w").write(f"{VOICE} {SPEED}\n")
print(f"Done: {len(keys)} files, {made} new, {failed} failed")
