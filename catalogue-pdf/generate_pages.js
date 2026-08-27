const fs = require('fs');
const path = require('path');
const categories = JSON.parse(fs.readFileSync(path.join(__dirname, 'categories.json'), 'utf8'));

let globalPageNum = 4;
let fileCounter = 4;

function generatePageHtml(category, content, isFirstPage, pageNum) {
  return `<div class="page" style="background-color: #faf9f7; position: relative; font-family: 'Inter', sans-serif;">
  <!-- Angled Header Bar -->
  <div style="position: absolute; top: 0; left: 0; width: 110mm; height: 20mm; background: #a68a61; clip-path: polygon(0 0, 100% 0, 85% 100%, 0 100%); z-index: 9;"></div>
  <div style="position: absolute; top: 0; left: 0; width: 108mm; height: 20mm; background: #222222; clip-path: polygon(0 0, 100% 0, 85% 100%, 0 100%); z-index: 10; display: flex; align-items: center; padding-left: 15mm; box-sizing: border-box;">
    <div style="color: #ffffff; font-size: 8pt; letter-spacing: 0.12em; font-weight: 500; text-transform: uppercase; border-bottom: 1px solid #a68a61; padding-bottom: 2mm;">SAQ Building Materials Supplier</div>
  </div>

  <!-- Background Texture (Subtle) -->
  <div style="position: absolute; top: 0; right: 0; width: 50%; height: 100%; background: linear-gradient(90deg, rgba(250,249,247,1) 0%, rgba(240,238,235,1) 100%); opacity: 0.5; z-index: 1;"></div>

  <div class="container" style="z-index: 20; padding-top: 32mm; display: flex; flex-direction: column; height: 100%;">
    
    ${isFirstPage ? `<!-- Title Area -->
    <div style="display: flex; align-items: flex-start; margin-bottom: 6mm;">
      <div style="font-family: 'Cormorant Garamond', serif; font-size: 60pt; color: #a68a61; line-height: 0.8; margin-right: 5mm;">${category.number}.</div>
      <div style="display: flex; flex-direction: column; justify-content: flex-end; padding-top: 2mm;">
        <div style="font-size: 16pt; font-weight: 700; color: #a68a61; letter-spacing: 0.05em; line-height: 1;">${category.title_1}</div>
        <div style="font-family: 'Cormorant Garamond', serif; font-size: 38pt; font-weight: 600; color: #222; line-height: 0.9; letter-spacing: -0.01em;">${category.title_2}</div>
      </div>
    </div>` : ''}
    
    <!-- Product Grid -->
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 4mm 8mm; align-content: start; width: 100%; margin-top: 2mm;">
      ${content}
    </div>
    
    <div class="page-number">${String(pageNum).padStart(2, '0')}</div>
  </div>
</div>`;
}

categories.forEach(category => {
  let isFirstPage = true;
  let currentContent = '';
  let currentCost = 0;
  
  for (let i = 0; i < category.brands.length; i++) {
    const brand = category.brands[i];
    const totalBrandCost = 1.5 + brand.products.length;
    let maxCost = isFirstPage ? 10 : 14;
    
    if (currentCost > 0 && (currentCost + totalBrandCost > maxCost)) {
      // Flush page
      const fileName = String(fileCounter).padStart(2, '0') + '-products.html';
      fs.writeFileSync(path.join(__dirname, 'pages', fileName), generatePageHtml(category, currentContent, isFirstPage, globalPageNum));
      fileCounter++;
      globalPageNum++;
      
      isFirstPage = false;
      currentContent = '';
      currentCost = 0;
      maxCost = 14;
    }
    
    currentContent += `
      <!-- BRAND: ${brand.name} -->
      <div style="grid-column: 1 / -1; margin-top: ${currentCost === 0 ? '0' : '4'}mm; margin-bottom: 2mm; display: flex; align-items: center; border-bottom: 1px solid #e0e0e0; padding-bottom: 3mm;">
        <div style="width: 25mm; height: 25mm; border-radius: 50%; background: #ffffff; box-shadow: 0 2px 8px rgba(0,0,0,0.05); border: 1px solid #f0f0f0; display: flex; align-items: center; justify-content: center; font-size: 7pt; color: #aaa; margin-right: 6mm; flex-shrink: 0;">LOGO</div>
        <h3 style="font-size: 16pt; color: #a68a61; font-weight: 700; letter-spacing: 0.05em; margin: 0;">${brand.name}</h3>
      </div>
    `;
    currentCost += 1.5;
    
    for (let j = 0; j < brand.products.length; j++) {
      const product = brand.products[j];
      currentContent += `
      <div style="background: #ffffff; border-radius: 4px; box-shadow: 0 4px 15px rgba(0,0,0,0.03); border-left: 4px solid #a68a61; display: flex; flex-direction: row; align-items: center; padding: 4mm;">
        <div style="width: 20mm; height: 20mm; background: #f8f8f8; border: 1px dashed #d0d0d0; display: flex; align-items: center; justify-content: center; font-size: 6pt; color: #aaa; flex-shrink: 0; margin-right: 4mm;">IMG</div>
        <div>
          <div style="font-size: 9pt; font-weight: 600; color: #222; line-height: 1.2;">${product}</div>
          <div style="font-size: 7.5pt; color: #666; margin-top: 1.5mm; line-height: 1.3;">${category.name}.</div>
        </div>
      </div>
      `;
      currentCost += 1;
    }
  }
  
  if (currentContent !== '') {
    const fileName = String(fileCounter).padStart(2, '0') + '-products.html';
    fs.writeFileSync(path.join(__dirname, 'pages', fileName), generatePageHtml(category, currentContent, isFirstPage, globalPageNum));
    fileCounter++;
    globalPageNum++;
  }
});
console.log('Pages generated successfully. Total pages generated:', fileCounter - 4);
