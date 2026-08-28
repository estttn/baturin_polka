"""Grab one JPEG frame from Motionsites public mp4 previews."""
from __future__ import annotations

import json
import subprocess
import urllib.parse
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parent
STILLS = ROOT / "stills"
REVIEW = ROOT / "review.json"
CATALOG = ROOT / "official_catalog.json"


def ffmpeg_exe() -> str:
    import imageio_ffmpeg

    return imageio_ffmpeg.get_ffmpeg_exe()


def is_mp4(url: str) -> bool:
    path = urllib.parse.urlparse(url).path.lower()
    return path.endswith(".mp4")


def download(url: str, dest: Path) -> None:
    req = urllib.request.Request(
        url,
        headers={"User-Agent": "Mozilla/5.0 (compatible; baturin-polka-stills)"},
    )
    with urllib.request.urlopen(req, timeout=90) as r:
        dest.write_bytes(r.read())


def main() -> None:
    STILLS.mkdir(exist_ok=True)
    catalog = {str(r["id"]): r for r in json.loads(CATALOG.read_text(encoding="utf-8"))}
    review = json.loads(REVIEW.read_text(encoding="utf-8"))
    missing = [it["id"] for it in review if not it.get("img")]
    ff = ffmpeg_exe()
    ok = 0
    fail = []
    for pid in missing:
        vid = (catalog.get(pid, {}).get("video_preview_url") or "").strip()
        if not is_mp4(vid):
            fail.append((pid, "no-mp4", vid[:80]))
            continue
        tmp = STILLS / f"{pid}.mp4"
        out = STILLS / f"{pid}.jpg"
        try:
            download(vid, tmp)
            subprocess.run(
                [ff, "-y", "-ss", "0.5", "-i", str(tmp), "-frames:v", "1", "-q:v", "4", str(out)],
                check=True,
                capture_output=True,
            )
            tmp.unlink(missing_ok=True)
            if out.exists() and out.stat().st_size > 1000:
                ok += 1
                print("ok", pid, out.stat().st_size)
            else:
                fail.append((pid, "tiny", ""))
        except Exception as e:
            tmp.unlink(missing_ok=True)
            err = getattr(e, "stderr", None)
            msg = err.decode("utf-8", "replace")[:200] if isinstance(err, bytes) else str(e)[:200]
            fail.append((pid, "err", msg))
            print("fail", pid, msg)
    print(f"extracted {ok}, failed {len(fail)}")
    for row in fail:
        print(" ", row)


if __name__ == "__main__":
    main()
