"""Pull public Motionsites card stills (preview URLs only, not paid prompt text)."""
from __future__ import annotations

import json
import re
import urllib.error
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parent
CLIENT_JS = "https://motionsites.ai/assets/client-Bzd-NdgM.js"
SUPABASE = "https://xgdzyqfalbibzelpdpvr.supabase.co"
SELECT = ",".join(
    [
        "id",
        "title",
        "category",
        "sort_order",
        "type",
        "types",
        "created_at",
        "page_type",
        "row_span",
        "is_free",
        "image_preview_url",
        "video_preview_url",
        "has_assets",
        "natural_ratio",
        "github_url",
    ]
)


def fetch(url: str, headers: dict | None = None, timeout: int = 60) -> bytes:
    req = urllib.request.Request(
        url,
        headers={"User-Agent": "baturin-polka-stills", **(headers or {})},
    )
    with urllib.request.urlopen(req, timeout=timeout) as r:
        return r.read()


def anon_key() -> str:
    js = fetch(CLIENT_JS).decode("utf-8", "replace")
    m = re.search(
        r"https://xgdzyqfalbibzelpdpvr\.supabase\.co`,`?(eyJ[a-zA-Z0-9_-]+\.[a-zA-Z0-9_-]+\.[a-zA-Z0-9_-]+)",
        js,
    )
    if not m:
        m = re.search(r"(eyJ[a-zA-Z0-9_-]+\.[a-zA-Z0-9_-]+\.[a-zA-Z0-9_-]+)", js)
    if not m:
        raise SystemExit("anon key not found in public Motionsites client JS")
    return m.group(1) if m.lastindex else m.group(0)


def still_url(row: dict) -> str:
    img = (row.get("image_preview_url") or "").strip()
    if img:
        if img.endswith(".png") and "cloudfront.net" in img and "images.higgs.ai" not in img:
            from urllib.parse import quote

            return (
                "https://images.higgs.ai/?default=1&output=webp&url="
                + quote(img, safe="")
                + "&w=1280&q=85"
            )
        return img
    vid = (row.get("video_preview_url") or "").strip()
    if vid.lower().endswith((".png", ".webp", ".jpg", ".jpeg", ".gif")):
        return vid
    return ""


def fetch_prompts(key: str) -> list[dict]:
    rows: list[dict] = []
    start = 0
    page = 1000
    while True:
        url = f"{SUPABASE}/rest/v1/prompts?select={SELECT}&order=sort_order.asc"
        headers = {
            "apikey": key,
            "Authorization": f"Bearer {key}",
            "Prefer": "count=exact",
            "Range": f"{start}-{start + page - 1}",
        }
        req = urllib.request.Request(url, headers={"User-Agent": "baturin-polka-stills", **headers})
        with urllib.request.urlopen(req, timeout=90) as r:
            chunk = json.loads(r.read().decode("utf-8"))
            content_range = r.headers.get("Content-Range", "")
        rows.extend(chunk)
        print(f"  fetched {len(rows)}  range={content_range}")
        if len(chunk) < page:
            break
        start += page
    return rows


def main() -> None:
    key = anon_key()
    print("anon key ok", key[:20] + "…")
    try:
        rows = fetch_prompts(key)
    except urllib.error.HTTPError as e:
        print("HTTP", e.code, e.read()[:300])
        raise
    out = []
    with_img = 0
    with_vid = 0
    with_still = 0
    for row in rows:
        still = still_url(row)
        if row.get("image_preview_url"):
            with_img += 1
        if row.get("video_preview_url"):
            with_vid += 1
        if still:
            with_still += 1
        out.append(
            {
                "id": row.get("id"),
                "title": row.get("title"),
                "category": row.get("category"),
                "type": row.get("type"),
                "types": row.get("types"),
                "page_type": row.get("page_type"),
                "is_free": row.get("is_free"),
                "image_preview_url": row.get("image_preview_url"),
                "video_preview_url": row.get("video_preview_url"),
                "still": still,
                "github_url": row.get("github_url"),
            }
        )
    path = ROOT / "official_catalog.json"
    path.write_text(json.dumps(out, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"wrote {len(out)} prompts: image={with_img} video={with_vid} still={with_still} -> {path}")


if __name__ == "__main__":
    main()
