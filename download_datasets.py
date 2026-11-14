import os
import urllib.request
import ssl

RAW_DIR = os.path.join(os.path.dirname(__file__), "data", "raw")
os.makedirs(RAW_DIR, exist_ok=True)

URLS = {
    "M20_waypoints.json": "https://mars.nasa.gov/mmgis-maps/M20/Layers/json/M20_waypoints.json",
    "M20_traverse.json": "https://mars.nasa.gov/mmgis-maps/M20/Layers/json/M20_traverse.json",
    "MARS_nomenclature.kmz": "https://planetarynames.wr.usgs.gov/shapefiles/MARS_nomenclature.kmz",
}

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

for filename, url in URLS.items():
    dest = os.path.join(RAW_DIR, filename)
    print(f"Downloading {filename} from {url}...")
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req, context=ctx, timeout=30) as resp, open(dest, "wb") as f:
            data = resp.read()
            f.write(data)
        print(f"  -> Saved {dest} ({len(data):,} bytes)")
    except Exception as e:
        print(f"  -> ERROR downloading {filename}: {e}")
