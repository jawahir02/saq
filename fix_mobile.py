import os
import glob

html_files = glob.glob('c:/Users/HP/Desktop/saq-building-materials/*.html')

# Don't touch index, about, contact, products, interior, brands
exclude = ['index.html', 'about.html', 'contact.html', 'products.html', 'interior.html', 'brands.html']

def process_file(filepath):
    filename = os.path.basename(filepath)
    if filename in exclude:
        return
        
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # We need to replace the content inside @media (max-width: 768px) { ... }
    # Since each file might have slight variations, we'll use regex or string replacements.
    
    # 1. Fix .brands-grid
    content = content.replace('.brands-grid { grid-template-columns: repeat(1, 1fr);', '.brands-grid { grid-template-columns: repeat(2, 1fr);')
    
    # 2. Fix .pt-grid
    content = content.replace('.pt-grid { grid-template-columns: repeat(1, 1fr);', '.pt-grid { grid-template-columns: repeat(2, 1fr);')
    
    # 3. Fix .intro-video-wrapper
    content = content.replace('.intro-video-wrapper { width: 100%; padding-bottom: 56.25%; float: none; margin: 0 0 1rem 0; }', '.intro-video-wrapper { width: 45%; padding-bottom: 25.3%; margin: 0.5rem 0 0.5rem 1rem; float: right; }')
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Processed {filename}")

for f in html_files:
    process_file(f)
