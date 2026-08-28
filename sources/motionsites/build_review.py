"""Rebuild Motionsites review board with official stills (poster PNG / webp, not paid prompts)."""
from __future__ import annotations

import json
import re
import urllib.parse
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parent
BUNDLED_JS = "https://motionsites.ai/assets/dist-CEzqpxFh.js"


def keyify(name: str) -> str:
    return re.sub(r"[^a-z0-9]", "", (name or "").lower())


def slugify(name: str) -> str:
    s = (name or "").strip()
    s = re.sub(r"^\d+-", "", s)
    s = s.replace("_", "-").replace(" ", "-")
    s = re.sub(r"-{2,}", "-", s)
    return s.lower()


def fetch(url: str, timeout: int = 60) -> bytes:
    req = urllib.request.Request(url, headers={"User-Agent": "baturin-polka-stills"})
    with urllib.request.urlopen(req, timeout=timeout) as r:
        return r.read()


def abs_asset(path: str) -> str:
    if not path:
        return ""
    if path.startswith("http"):
        return path
    if path.startswith("/"):
        return "https://motionsites.ai" + path
    return path


def bundled_posters() -> tuple[dict[str, dict[str, str]], dict[str, str], dict[str, str]]:
    js = fetch(BUNDLED_JS).decode("utf-8", "replace")
    vars_: dict[str, str] = {}
    for m in re.finditer(
        r"(?:var |,|;)([A-Za-z][A-Za-z0-9]*)=`(/assets/[A-Za-z0-9_.-]+\.(?:gif|png|webp))`",
        js,
    ):
        vars_[m.group(1)] = m.group(2)
    by_id: dict[str, dict[str, str]] = {}
    for m in re.finditer(
        r"\{id:`([^`]+)`,title:`([^`]*)`,image:([A-Za-z0-9]+),poster:([A-Za-z0-9]+)",
        js,
    ):
        pid, title, img_var, poster_var = m.groups()
        by_id[pid] = {
            "title": title,
            "image": abs_asset(vars_.get(img_var, "")),
            "poster": abs_asset(vars_.get(poster_var, "")),
        }
    by_key: dict[str, str] = {}
    gif_by_key: dict[str, str] = {}
    for m in re.finditer(r"/assets/[A-Za-z0-9_.-]+\.(?:png|gif|webp)", js):
        url = abs_asset(m.group(0))
        stem = Path(m.group(0)).stem
        kind = Path(m.group(0)).suffix.lower()
        base = re.sub(r"-(?:poster|preview)-[A-Za-z0-9_-]+$", "", stem)
        parts = base.split("-")
        cands = [base]
        if parts and parts[0] in ("hero", "footer", "cta", "landing", "features"):
            cands.append("-".join(parts[1:] + [parts[0]]))
            cands.append("-".join(parts[1:]))
        target = by_key if kind == ".png" else gif_by_key
        if kind == ".png" and "-poster-" not in stem:
            continue
        for c in cands:
            target[keyify(c)] = url
    for pid, rec in list(by_id.items()):
        if rec.get("poster"):
            continue
        rec["poster"] = by_key.get(keyify(pid), "")
    return by_id, by_key, gif_by_key


def is_image_url(url: str) -> bool:
    if not url:
        return False
    if "images.higgs.ai" in url or "output=webp" in url:
        return True
    path = urllib.parse.urlparse(url).path.lower()
    return path.endswith((".png", ".jpg", ".jpeg", ".webp", ".gif", ".avif"))


def is_gif(url: str) -> bool:
    return urllib.parse.urlparse(url).path.lower().endswith(".gif")


def mux_thumb(url: str) -> str:
    m = re.search(r"stream\.mux\.com/([A-Za-z0-9]+)", url)
    if not m:
        return ""
    return f"https://image.mux.com/{m.group(1)}/thumbnail.jpg?time=1&width=1280"


def higgs_still(url: str) -> str:
    if "images.higgs.ai" in url:
        return url
    if "cloudfront.net" in url and url.lower().split("?")[0].endswith(".png"):
        return (
            "https://images.higgs.ai/?default=1&output=webp&url="
            + urllib.parse.quote(url, safe="")
            + "&w=1280&q=85"
        )
    return url


def lookup_asset(pid: str, title: str, table: dict[str, str]) -> str:
    keys = [
        keyify(pid),
        keyify(title),
        keyify(re.sub(r"-(hero|landing|focus|footer|cta)$", "", pid)),
    ]
    for k in keys:
        if k and k in table:
            return table[k]
    if pid.isdigit():
        compact = keyify(title)
        hits = [(k, url) for k, url in table.items() if k and len(k) >= 5 and k in compact]
        if hits:
            hits.sort(key=lambda x: len(x[0]), reverse=True)
            return hits[0][1]
    return ""


def catalog_still(
    row: dict,
    bundled: dict[str, dict[str, str]],
    by_key: dict[str, str],
    gif_by_key: dict[str, str],
) -> str:
    img = (row.get("image_preview_url") or "").strip()
    vid = (row.get("video_preview_url") or "").strip()
    pid = str(row.get("id") or "")
    title = str(row.get("title") or "")
    bun = bundled.get(pid) or {}
    poster = bun.get("poster") or lookup_asset(pid, title, by_key)

    local = ROOT / "stills" / f"{pid}.jpg"
    local_url = f"stills/{pid}.jpg" if local.exists() else ""

    still_src = higgs_still(img) if img and is_image_url(img) and not is_gif(img) else ""
    if still_src:
        return still_src
    if poster:
        return poster
    if vid and is_image_url(vid) and not is_gif(vid):
        return higgs_still(vid)
    mux = mux_thumb(vid)
    if mux:
        return mux
    if local_url:
        return local_url
    gif = ""
    if bun.get("image"):
        gif = bun["image"]
    elif img and is_gif(img):
        gif = img
    elif vid and is_gif(vid):
        gif = vid
    else:
        gif = lookup_asset(pid, title, gif_by_key)
    return gif


def load_cluster_badges() -> dict[str, str]:
    path = ROOT / "clusters.yaml"
    if not path.exists():
        return {}
    text = path.read_text(encoding="utf-8")
    badges: dict[str, str] = {}
    status = ""
    for line in text.splitlines():
        if line.startswith("    status:"):
            status = line.split(":", 1)[1].strip()
        if line.strip().startswith("- prompts/") or "motionsites-prompts/" in line:
            src = line.strip()[2:]
            name = src.split("/")[-1]
            if name == "working-prompt.md":
                name = src.split("/")[-2]
            name = name.replace(".md", "")
            badges[keyify(name)] = status
            badges[keyify(slugify(name))] = status
    return badges


def main() -> None:
    catalog = json.loads((ROOT / "official_catalog.json").read_text(encoding="utf-8"))
    bundled, by_key, gif_by_key = bundled_posters()
    badges = load_cluster_badges()
    print(f"bundled poster map: {len(bundled)} filename keys: {len(by_key)}")

    items = []
    with_img = 0
    for row in catalog:
        pid = str(row.get("id") or "")
        title = (row.get("title") or pid).strip()
        bun = bundled.get(pid) or {}
        still = catalog_still(row, bundled, by_key, gif_by_key)
        if still:
            with_img += 1
        k = keyify(pid) or keyify(title)
        items.append(
            {
                "id": pid,
                "title": title,
                "name": pid,
                "cat": row.get("category") or bun.get("category") or "Other",
                "type": row.get("type") or row.get("page_type") or "",
                "img": still,
                "live": f"https://motionsites.ai/?prompt={pid}",
                "badge": badges.get(k, badges.get(keyify(title), "")),
                "dupes": 1,
                "aliases": [],
                "free": bool(row.get("is_free")),
            }
        )

    items = sorted(items, key=lambda x: (0 if x["img"] else 1, x["cat"] or "", x["title"].lower()))
    cats = sorted({x["cat"] for x in items if x["cat"]})
    payload = json.dumps(items, ensure_ascii=False)
    cats_json = json.dumps(cats, ensure_ascii=False)
    html = (
        HTML.replace("__PAYLOAD__", payload)
        .replace("__CATS__", cats_json)
        .replace(
            "__STATS__",
            f"{len(items)} карточек с motionsites.ai. "
            f"{with_img} со стоп-кадром (постер PNG / webp). GIF не нужны — берём картинку.",
        )
    )
    (ROOT / "review.json").write_text(json.dumps(items, ensure_ascii=False, indent=2), encoding="utf-8")
    (ROOT / "review.html").write_text(html, encoding="utf-8")
    missing = [x["id"] for x in items if not x["img"]]
    print(f"wrote {len(items)} cards, {with_img} with still, missing {len(missing)}")
    print("missing:", missing)


HTML = r"""<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Карьер Motionsites — все карточки</title>
  <style>
    :root { --bg:#111; --fg:#f2f2f0; --muted:#8a8a86; --line:#2a2a28; --gap:#c9a227; --on:#6a9a6a; --skip:#9a6a6a; }
    * { box-sizing: border-box; }
    body { margin:0; font:15px/1.45 system-ui,sans-serif; background:var(--bg); color:var(--fg); }
    header { padding:24px 24px 12px; border-bottom:1px solid var(--line); position:sticky; top:0; background:var(--bg); z-index:2; }
    h1 { font-size:22px; font-weight:600; margin:0 0 6px; letter-spacing:-0.02em; }
    .lead { color:var(--muted); margin:0 0 12px; max-width:72ch; }
    .bar { display:flex; gap:8px; flex-wrap:wrap; align-items:center; }
    input[type=search], select {
      background:#181817; color:var(--fg); border:1px solid var(--line);
      padding:8px 10px; font:inherit; min-width:180px;
    }
    input[type=search] { flex:1; min-width:220px; }
    .bar button {
      background:transparent; color:var(--fg); border:1px solid var(--line);
      padding:7px 12px; cursor:pointer; font:inherit;
    }
    .bar button[aria-pressed="true"] { background:var(--fg); color:var(--bg); }
    #count { color:var(--muted); font-size:13px; margin-left:auto; }
    main { max-width:1480px; margin:0 auto; padding:16px 24px 64px; }
    .grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(240px,1fr)); gap:10px; }
    a.card {
      display:flex; flex-direction:column; color:inherit; text-decoration:none;
      border:1px solid var(--line); background:#181817; min-height:200px;
    }
    a.card:hover { border-color:#555; }
    .thumb { aspect-ratio:16/10; background:#0a0a0a; overflow:hidden; display:grid; place-items:center; color:var(--muted); font-size:12px; text-align:center; padding:8px; }
    .thumb img { width:100%; height:100%; object-fit:cover; display:block; }
    .meta { padding:8px 10px 10px; }
    .meta strong { display:block; font-size:13px; font-weight:600; }
    .meta span { color:var(--muted); font-size:11px; }
    .badge { font-size:10px; letter-spacing:.04em; text-transform:uppercase; margin-left:6px; }
    .badge.gap { color:var(--gap); }
    .badge.on_polka { color:var(--on); }
    .badge.skip { color:var(--skip); }
  </style>
</head>
<body>
  <header>
    <h1>Карьер Motionsites — все карточки</h1>
    <p class="lead">__STATS__. Клик — живой кадр на motionsites.ai. Назовите карточку в чате, соберём сайт по каркасу, без чужого бренда.</p>
    <div class="bar">
      <input type="search" id="q" placeholder="Поиск по имени…" />
      <select id="cat"><option value="">Все категории</option></select>
      <button type="button" data-img="all" aria-pressed="true">Все</button>
      <button type="button" data-img="yes" aria-pressed="false">Только с картинкой</button>
      <button type="button" data-img="no" aria-pressed="false">Без картинки</button>
      <span id="count"></span>
    </div>
  </header>
  <main><div class="grid" id="grid"></div></main>
  <script>
    const ITEMS = __PAYLOAD__;
    const CATS = __CATS__;
    const labels = { gap: "кандидат", on_polka: "на полке", skip: "не брать" };
    const catSel = document.getElementById("cat");
    CATS.forEach((c) => {
      const o = document.createElement("option");
      o.value = c; o.textContent = c;
      catSel.appendChild(o);
    });

    let imgMode = "all";
    function visible() {
      const q = document.getElementById("q").value.trim().toLowerCase();
      const cat = catSel.value;
      return ITEMS.filter((it) => {
        if (cat && it.cat !== cat) return false;
        if (imgMode === "yes" && !it.img) return false;
        if (imgMode === "no" && it.img) return false;
        if (q && !(it.title + " " + it.name + " " + it.cat).toLowerCase().includes(q)) return false;
        return true;
      });
    }

    function render() {
      const list = visible();
      document.getElementById("count").textContent = list.length + " из " + ITEMS.length;
      document.getElementById("grid").innerHTML = list.map((it) => {
        const badge = it.badge ? '<span class="badge ' + it.badge + '">' + (labels[it.badge] || it.badge) + "</span>" : "";
        const thumb = it.img
          ? '<img src="' + it.img + '" alt="" loading="lazy" />'
          : "Нет кадра — откройте живой";
        return '<a class="card" href="' + it.live + '" target="_blank" rel="noreferrer">' +
          '<div class="thumb">' + thumb + "</div>" +
          '<div class="meta"><strong>' + it.title + badge + "</strong><span>" +
          (it.cat || "") + (it.type ? " · " + it.type : "") + "</span></div></a>";
      }).join("");
    }

    document.getElementById("q").addEventListener("input", render);
    catSel.addEventListener("change", render);
    document.querySelectorAll(".bar button[data-img]").forEach((btn) => {
      btn.addEventListener("click", () => {
        imgMode = btn.dataset.img;
        document.querySelectorAll(".bar button[data-img]").forEach((b) =>
          b.setAttribute("aria-pressed", String(b === btn))
        );
        render();
      });
    });
    render();
  </script>
</body>
</html>
"""


if __name__ == "__main__":
    main()
