import os
import re

css_fix = """
        .brand-block { display: block; }
        .brand-block::after { content: ""; display: table; clear: both; }
        .brand-block h3 { color: var(--navy-blue); margin-bottom: 0.3rem; font-size: 1.1rem; text-transform: uppercase; margin-top: -0.2rem; }
        .brands-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 2rem; margin-bottom: 2rem; }
        .brand-img { float: left; width: 85px; height: 85px; aspect-ratio: 1/1; background: #fff; border-radius: 4px; margin: 0 1rem 0.5rem 0; display: flex; align-items: center; justify-content: center; color: rgba(0,0,0,0.5); font-size: 0.8rem; text-align: center; border: 1px solid rgba(0,0,0,0.05); }
        .brand-block .text-content { font-size: 0.82rem; margin-bottom: 0.5rem; line-height: 1.4; }
"""

files = [f for f in os.listdir('.') if f.endswith('.html')]
for f in files:
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    
    if '.brand-block { display: block; }' in content:
        # replace the old CSS block with new one
        pattern = re.compile(r'\.brand-block \{ display: block; \}.*?\.brand-img \{.*?\}', re.DOTALL)
        if pattern.search(content):
            content = re.sub(pattern, css_fix.strip(), content)
            with open(f, 'w', encoding='utf-8') as file:
                file.write(content)
            print(f'Fixed CSS in {f}')
