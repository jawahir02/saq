import os

files = [f for f in os.listdir('.') if f.endswith('.html')]
for f in files:
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    
    modified = False
    if ' style="border: none; background: transparent;"' in content:
        content = content.replace(' style="border: none; background: transparent;"', '')
        modified = True
    if ' style="background: transparent;"' in content:
        content = content.replace(' style="background: transparent;"', '')
        modified = True
        
    if modified:
        with open(f, 'w', encoding='utf-8') as file:
            file.write(content)
        print(f'Fixed {f}')
