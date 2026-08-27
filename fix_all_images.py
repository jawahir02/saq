import os
import glob
import re

html_files = glob.glob('*.html')

for filepath in html_files:
    if filepath == 'index.html' or filepath == 'contact.html' or filepath == 'about.html' or filepath == 'careers.html':
        pass

    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original_content = content

    # Replace .pt-img desktop
    content = re.sub(
        r'\.pt-img\s*\{[^\}]*?margin-bottom:\s*1rem;[^\}]*?\}',
        '.pt-img { margin-bottom: 1rem; display: flex; align-items: center; justify-content: center; }\n        .pt-img img { max-width: 100%; height: auto; max-height: 250px; object-fit: contain; }',
        content, count=1
    )

    # Replace .pt-img mobile
    content = re.sub(
        r'\.pt-img\s*\{\s*height:\s*100px;\s*font-size:\s*0\.7rem;\s*\}',
        '.pt-img { font-size: 0.7rem; }',
        content, count=1
    )

    # Replace .brand-img desktop
    if filepath != 'tapes.html':
        content = re.sub(
            r'\.brand-img\s*\{\s*float:\s*left;\s*width:\s*85px;\s*height:\s*85px;[^\}]*?\}',
            '.brand-img { float: left; width: 120px; margin: 0 1rem 0.5rem 0; }\n        .brand-img img { width: 100%; height: auto; display: block; border-radius: 4px; }',
            content, count=1
        )
        # Replace .brand-img mobile
        content = re.sub(
            r'\.brand-img\s*\{\s*width:\s*70px;\s*height:\s*70px;\s*margin:\s*0\s*0\.8rem\s*0\.5rem\s*0;\s*font-size:\s*0\.6rem;\s*\}',
            '.brand-img { width: 90px; margin: 0 0.8rem 0.5rem 0; font-size: 0.6rem; }',
            content, count=1
        )

    # Remove inline image styles inside these containers
    content = content.replace('style="max-width: 90%; max-height: 90%; object-fit: contain;"', 'style=""')
    content = content.replace('style="max-width:100%;max-height:100%;"', 'style=""')

    if content != original_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {filepath}")

print("Done.")
