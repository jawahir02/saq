import glob
import os

for file in glob.glob('*.html'):
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    modified = False
    
    # Remove inline transparent background overriding the white background
    target_style = 'style="background-color: transparent;"'
    if target_style in content:
        content = content.replace(target_style, '')
        modified = True
        
    # Fix broken image paths pointing to root instead of assets/
    for b_num in range(1, 45):
        wrong_src = f'src="b{b_num}.png"'
        correct_src = f'src="assets/b{b_num}.png"'
        if wrong_src in content:
            content = content.replace(wrong_src, correct_src)
            modified = True
            
    if modified:
        with open(file, 'w', encoding='utf-8') as f:
            f.write(content)
        print('Fixed', file)
