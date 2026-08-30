#!/usr/bin/env python3
"""Persistent local Kokoro/MLX speech worker for Openleaf.

The process speaks JSON Lines on stdin/stdout. Model/library diagnostics are
redirected to stderr so the Electron bridge always receives valid JSON.
"""

import contextlib
import json
import os
import sys
import traceback
import wave

import numpy as np


MODEL_ID = "mlx-community/Kokoro-82M-bf16"
VOICE_IDS = {"af_bella", "af_sarah", "am_michael", "am_adam", "af_heart"}
SAMPLE_WIDTH = 2

model = None
pipeline = None


def ensure_model():
    global model, pipeline
    if model is not None and pipeline is not None:
        return
    with contextlib.redirect_stdout(sys.stderr):
        from mlx_audio.tts.utils import load_model

        model = load_model(MODEL_ID)
        pipeline = model._get_pipeline("a")


def write_wav(audio, sample_rate, output_path):
    samples = np.asarray(audio, dtype=np.float32).reshape(-1)
    pcm = (np.clip(samples, -1.0, 1.0) * 32767.0).astype("<i2")
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    temporary_path = f"{output_path}.tmp-{os.getpid()}"
    with wave.open(temporary_path, "wb") as output:
        output.setnchannels(1)
        output.setsampwidth(SAMPLE_WIDTH)
        output.setframerate(int(sample_rate))
        output.writeframes(pcm.tobytes())
    os.replace(temporary_path, output_path)
    return len(samples) / sample_rate


def synthesize(text, speed, voice, output_path):
    ensure_model()
    with contextlib.redirect_stdout(sys.stderr):
        result = next(
            pipeline(
                text,
                voice=voice,
                speed=speed,
                split_pattern=None,
            )
        )

    duration = write_wav(result.audio, model.sample_rate, output_path)
    timings = []
    for token in result.tokens or []:
        token_text = str(getattr(token, "text", "") or "")
        start = getattr(token, "start_ts", None)
        end = getattr(token, "end_ts", None)
        if not token_text.strip() or start is None or end is None:
            continue
        timings.append({"text": token_text, "start": float(start), "end": float(end)})

    return {
        "duration": duration,
        "sampleRate": int(model.sample_rate),
        "timings": timings,
        "model": "Kokoro-82M",
        "voice": voice,
    }


for raw_line in sys.stdin:
    request_id = ""
    try:
        request = json.loads(raw_line)
        request_id = str(request.get("id", ""))
        text = str(request.get("text", "")).strip()
        speed = max(0.5, min(2.0, float(request.get("speed", 1.0))))
        voice = str(request.get("voice", "af_bella"))
        output_path = os.path.abspath(str(request.get("outputPath", "")))
        if not text:
            raise ValueError("Speech text is empty.")
        if len(text) > 1200:
            raise ValueError("Speech chunk is too long.")
        if voice not in VOICE_IDS:
            raise ValueError("Unknown local voice.")
        if not output_path.endswith(".wav"):
            raise ValueError("Speech output path is invalid.")
        response = {"id": request_id, "ok": True, **synthesize(text, speed, voice, output_path)}
    except Exception as error:
        response = {
            "id": request_id,
            "ok": False,
            "error": str(error),
            "traceback": traceback.format_exc(limit=4),
        }
    print(json.dumps(response, separators=(",", ":")), flush=True)
