"""Map unique Motionsites cards → local prompt file + poster + live URL."""
from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent
PROMPTS = ROOT / "_upstream" / "prompts"
POSTERS = ROOT / "posters"
STILLS = ROOT / "stills"


def keyify(name: str) -> str:
    return re.sub(r"[^a-z0-9]", "", (name or "").lower())


def stem(name: str) -> str:
    n = (name or "").lower().replace("_", "-").replace(" ", "-")
    n = re.sub(r"^\d+-", "", n)
    n = re.sub(r"-(hero|landing|focus)$", "", n)
    return re.sub(r"[^a-z0-9]", "", n)


def main() -> None:
    items = json.loads((ROOT / "review.json").read_text(encoding="utf-8"))
    files = {keyify(p.stem): p for p in PROMPTS.glob("*.md")}
    by_stem: dict[str, Path] = {}
    for p in PROMPTS.glob("*.md"):
        by_stem.setdefault(stem(p.stem), p)

    posters = {}
    if POSTERS.exists():
        for p in POSTERS.iterdir():
            posters[keyify(p.stem)] = f"posters/{p.name}"
    if STILLS.exists():
        for p in STILLS.glob("*.jpg"):
            posters.setdefault(keyify(p.stem), f"stills/{p.name}")

    rows = []
    missing_prompt = 0
    missing_poster = 0
    for it in items:
        names = [it.get("id") or "", it.get("name") or "", it.get("title") or ""] + list(it.get("aliases") or [])
        prompt = None
        for n in names:
            k = keyify(n)
            if k in files:
                prompt = files[k]
                break
            s = stem(n)
            if s in by_stem:
                prompt = by_stem[s]
                break
        poster = None
        for n in names:
            k = keyify(n)
            if k in posters:
                poster = posters[k]
                break
        if prompt is None:
            missing_prompt += 1
        if not it.get("img") and poster is None:
            missing_poster += 1
        rows.append(
            {
                "id": it.get("id") or it.get("name"),
                "title": it.get("title"),
                "name": it.get("name"),
                "aliases": it.get("aliases") or [],
                "cat": it.get("cat"),
                "live": it.get("live"),
                "img": it.get("img") or "",
                "prompt": str(prompt.relative_to(ROOT)).replace("\\", "/") if prompt else None,
                "poster": poster,
                "dupes": it.get("dupes") or 1,
            }
        )

    lookup = {}
    for row in rows:
        for key in [row["title"], row["name"], row.get("id"), *row["aliases"]]:
            if key:
                lookup[key] = row["title"]
                lookup[key.lower()] = row["title"]

    index = {
        "version": 1,
        "how": "Пользователь пишет название с доски. Агент ищет title/aliases, читает prompt, смотрит img/poster, собирает сайт по каркасу, не копирует бренд.",
        "counts": {
            "cards": len(rows),
            "with_prompt": sum(1 for r in rows if r["prompt"]),
            "with_poster_file": sum(1 for r in rows if r["poster"]),
            "with_img_url": sum(1 for r in rows if r["img"]),
            "missing_prompt": missing_prompt,
        },
        "lookup": lookup,
        "items": rows,
    }
    (ROOT / "library.json").write_text(json.dumps(index, ensure_ascii=False, indent=2), encoding="utf-8")
    print(index["counts"])


if __name__ == "__main__":
    main()
