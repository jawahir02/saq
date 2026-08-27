import os
import re

mapping = {
    '--color-charcoal': '--charcoal',
    '--color-black': '--navy-blue',
    '--color-warm-white': '--off-white',
    '--color-white': '--off-white',
    '--color-soft-grey': '--warm-beige',
    '--color-concrete-light': '--warm-beige',
    '--color-concrete-dark': '--charcoal',
    '--color-concrete': '--charcoal',
    '--color-sand': '--warm-beige',
    '--color-accent': '--navy-blue',
    '--color-dark-blue': '--navy-blue',
    '--color-dark-blue-overlay': '--navy-blue'
}

def replace_in_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    new_content = content
    # Order matters if there are prefixes, but these are distinct
    # Let's sort by length descending to avoid partial matches
    for old in sorted(mapping.keys(), key=len, reverse=True):
        new = mapping[old]
        new_content = new_content.replace(old, new)
        
    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated {filepath}")

for root, dirs, files in os.walk('.'):
    if 'node_modules' in root or '.git' in root:
        continue
    for file in files:
        if file.endswith(('.css', '.js', '.html')):
            replace_in_file(os.path.join(root, file))

print("Done")
