import re

with open(r'C:\Users\HP\.gemini\antigravity-ide\brain\f7298256-5f0a-40c5-b227-a1b695ed3a3e\.system_generated\steps\718\content.md', 'r', encoding='utf-8') as f:
    content = f.read()

# Try to find words that look like products in the giant blob
# Look for anything like "Bosch XXX" or "Makita XXX" or "Drill" etc.
matches = re.findall(r'([A-Za-z0-9\-\s]{0,30}(?:Drill|Grinder|Saw|Hammer|Sander|Cutter|Makita|Bosch|DeWalt|Crown)[A-Za-z0-9\-\s]{0,30})', content, re.IGNORECASE)

unique_matches = set(matches)
for m in list(unique_matches)[:50]:
    if len(m.strip()) > 5:
        print(m.strip())
