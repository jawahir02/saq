import os, glob

b_files = glob.glob('assets/b*.png')
def get_num(f):
    base = os.path.basename(f)[1:-4]
    return int(base) if base.isdigit() else 0

b_files.sort(key=get_num)

brands_str = ',\n        '.join(f"{{ name: 'Brand {i+1}', img: '{f.replace(chr(92), '/')}' }}" for i, f in enumerate(b_files))

with open('js/data.js', 'r') as f:
    data = f.read()

new_data = data.replace('brands: []', f'brands: [\n        {brands_str}\n    ]')

with open('js/data.js', 'w') as f:
    f.write(new_data)
