const fs = require('fs');
const path = require('path');
const categories = JSON.parse(fs.readFileSync(path.join(__dirname, 'categories.json'), 'utf8'));

let globalPageNum = 4;
let fileCounter = 4;

const brandLogos = {
  'JOTUN': 'assets/logos/b27.png',
  'WEBER': 'assets/logos/b18.png',
  'WEBER SODAMCO': 'assets/logos/b18.png',
  'WEBER / SODAMCO': 'assets/logos/b18.png',
  'SODAMCO': 'assets/logos/b17.png',
  'DR. FIXIT': 'assets/logos/b42.png',
  'DR FIXIT': 'assets/logos/b42.png',
  'MAPEI': 'assets/logos/b45.png',
  'MAPIE': 'assets/logos/b45.png',
  'NATIONAL PAINTS': 'assets/logos/b12.png',
  'FOSROC': 'assets/logos/b43.png',
  'LATICRETE': 'assets/logos/b44.png',
  'HENKEL POLYBIT': 'assets/logos/b5.png',
  'HENKEL': 'assets/logos/b5.png',
  'TERRACO': 'assets/logos/b46.png',
  '3M': 'assets/logos/b4.png',
  'HPX': 'assets/logos/b47.png',
  'AL JAZEERA PAINTS': 'assets/logos/b26.png',
  'AL JAZEERA': 'assets/logos/b26.png',
  'BOSCH': 'assets/logos/b24.png',
  'DEWALT': 'assets/logos/b19.png',
  'STANLEY': 'assets/logos/b7.png',
  'MAKITA': 'assets/logos/b15.png',
  'CLARKE': 'assets/logos/b25.png',
  'UKEN': 'assets/logos/b37.png',
  'JTECH': 'assets/logos/b35.png',
  'TERRAIN': 'assets/logos/b28.png',
  'RAKTHERM': 'assets/logos/b29.png',
  'ULTRATECH CEMENT': 'assets/logos/b1.png',
  'ULTRATECH': 'assets/logos/b1.png',
  'SIKA': 'assets/logos/sika.png',
  'DULUX': 'assets/logos/dulux.png',
  'BERGER PAINTS': 'assets/logos/berger paints.png',
  'BERGER': 'assets/logos/berger paints.png',
  'CAPAROL': 'assets/logos/caparol_logo.png',
  'HEMPEL': 'assets/logos/hempel.png',
  'KNAUF': 'assets/logos/b30.png',
  'GYPROC': 'assets/logos/gyproc.png',
  'GYPROC / SAINT-GOBAIN': 'assets/logos/gyproc.png',
  'FISCHER': 'assets/logos/fishcher.png',
  'HILTI': 'assets/logos/hilti.png',
  'SOUDAL': 'assets/logos/soudal.png',
  'BOSTIK': 'assets/logos/bostik.png',
  'DOWSIL / DOW CORNING': 'assets/logos/dow.png',
  'DOW': 'assets/logos/dow.png',
  'ARMSTRONG': 'assets/logos/armstrong.png',
  'USG BORAL': 'assets/logos/usg boral.png',
  'ROCKFON': 'assets/logos/rockfon.png',
  'HUNTER DOUGLAS': 'assets/logos/hunterdouglas.png',
  'ECOPHON': 'assets/logos/ecophone.png',
  'MASTER BUILDERS': 'assets/logos/master builders.png',
  'EMIRATES CEMENT': 'assets/logos/emirates cement.png',
  'RAK WHITE CEMENT': 'assets/logos/rak cements.png',
  'NATIONAL CEMENT CO': 'assets/logos/national cement.png',
  'NATIONAL CEMENT': 'assets/logos/national cement.png',
  'JSP / MSA': 'assets/logos/jsp.png',
  'JSP': 'assets/logos/jsp.png',
  'WACKER': 'assets/logos/wacker.png',
  'SIKKENS': 'assets/logos/sikkens.png',
  'PPG / SIGMA': 'assets/logos/ppg.png',
  'HARRIS': 'assets/logos/harris.png',
  'PURDY': 'assets/logos/purdy.png',
  'WAGNER': 'assets/logos/wagner.png'
};

function generatePageHtml(category, content, isFirstPage, pageNum) {
  return `<div class="page" style="background-color: #faf9f7; position: relative; font-family: 'Inter', sans-serif; overflow: hidden;">
  <!-- Background Image with White Overlay -->
  <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-image: url('assets/images/bgc.jpeg'); background-size: cover; background-position: center; z-index: 1;"></div>
  <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(255, 255, 255, 0.88); z-index: 2;"></div>

  <!-- Angled Header Bar -->
  <div style="position: absolute; top: 0; left: 0; width: 114mm; height: 18mm; background: #a68a61; clip-path: polygon(0 0, 100% 0, 85% 100%, 0 100%); z-index: 9;"></div>
  <div style="position: absolute; top: 0; left: 0; width: 112mm; height: 18mm; background: #1a2b3d; clip-path: polygon(0 0, 100% 0, 85% 100%, 0 100%); z-index: 10; display: flex; align-items: center; padding-left: 14mm; box-sizing: border-box;">
    <div style="display: flex; align-items: center; gap: 2.5mm;">
      <img src="assets/logos/herologo.png" alt="SAQ Logo" style="height: 5.2mm; width: auto; object-fit: contain; filter: brightness(0) invert(1);">
      <span style="color: #ffffff; font-size: 7.2pt; letter-spacing: 0.08em; font-weight: 600; text-transform: uppercase;">Building Materials Supplier</span>
    </div>
  </div>

  <div class="container" style="z-index: 20; padding-top: 26mm; display: flex; flex-direction: column; height: 100%; box-sizing: border-box;">
    
    ${isFirstPage ? `<!-- Title Area -->
    <div style="display: flex; align-items: flex-start; margin-bottom: 4mm; border-bottom: 1.5px solid rgba(166,138,97,0.3); padding-bottom: 3mm;">
      <div style="font-family: 'Cormorant Garamond', serif; font-size: 48pt; color: #a68a61; line-height: 0.8; margin-right: 5mm; font-weight: 600;">${category.number}.</div>
      <div style="display: flex; flex-direction: column; justify-content: flex-end; padding-top: 1mm;">
        <div style="font-size: 12pt; font-weight: 700; color: #a68a61; letter-spacing: 0.08em; line-height: 1; text-transform: uppercase;">${category.title_1}</div>
        <div style="font-family: 'Cormorant Garamond', serif; font-size: 28pt; font-weight: 600; color: #1a2b3d; line-height: 0.95; letter-spacing: -0.01em;">${category.title_2}</div>
      </div>
    </div>` : `<!-- Continuation Header -->
    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 4mm; border-bottom: 1px solid rgba(166,138,97,0.2); padding-bottom: 2mm;">
      <div style="font-size: 10pt; font-weight: 700; color: #a68a61; text-transform: uppercase; letter-spacing: 0.05em;">${category.number}. ${category.name} <span style="font-size: 8pt; color: #888; font-weight: 500;">(Continued)</span></div>
      <div style="font-size: 7.5pt; color: #888; text-transform: uppercase; letter-spacing: 0.08em;">Product Range</div>
    </div>`}
    
    <!-- Brand & Products List -->
    <div style="display: flex; flex-direction: column; gap: 3.5mm; width: 100%;">
      ${content}
    </div>
    
    <div class="page-number" style="position: absolute; bottom: 10mm; right: 15mm; font-size: 9pt; font-weight: 600; color: #a68a61;">${String(pageNum).padStart(2, '0')}</div>
  </div>
</div>`;
}

function renderBrandBlock(brand, category) {
  let productsHtml = '';
  brand.products.forEach(product => {
    productsHtml += `
      <div style="display: flex; align-items: center; gap: 2.5mm; background: #faf9f7; border: 1px solid #eee; border-left: 2.5px solid #a68a61; border-radius: 3px; padding: 2mm 3mm; box-sizing: border-box;">
        <span style="width: 4px; height: 4px; border-radius: 50%; background: #a68a61; flex-shrink: 0;"></span>
        <span style="font-size: 8pt; font-weight: 600; color: #222222; line-height: 1.25;">${product}</span>
      </div>
    `;
  });

  const upperBrandName = brand.name.toUpperCase().trim();
  const logoPath = brandLogos[upperBrandName];
  
  let logoHtml = '';
  if (logoPath) {
    logoHtml = `
      <div style="width: 22mm; height: 11mm; background: #ffffff; border-radius: 3px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; padding: 1mm; box-sizing: border-box; border: 1px solid #eee; box-shadow: 0 1px 3px rgba(0,0,0,0.03);">
        <img src="${logoPath}" alt="${brand.name}" style="max-width: 100%; max-height: 100%; object-fit: contain;">
      </div>
    `;
  }

  return `
    <!-- BRAND: ${brand.name} -->
    <div style="background: #ffffff; border-radius: 4px; padding: 3.5mm 4.5mm; box-shadow: 0 1.5px 6px rgba(0,0,0,0.03); border: 1px solid rgba(0,0,0,0.05); width: 100%; box-sizing: border-box;">
      <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid #f0ede6; padding-bottom: 2.5mm; margin-bottom: 2.5mm;">
        <div style="display: flex; align-items: center; gap: 3.5mm;">
          ${logoHtml ? logoHtml : `<span style="width: 3.5px; height: 14px; background: #a68a61; border-radius: 2px; display: inline-block;"></span>`}
          <div>
            <h3 style="font-size: 11pt; font-weight: 800; color: #1a2b3d; letter-spacing: 0.03em; margin: 0; text-transform: uppercase; line-height: 1.1;">${brand.name}</h3>
            <div style="font-size: 6.5pt; color: #888; font-weight: 500; text-transform: uppercase; letter-spacing: 0.05em; margin-top: 0.5mm;">${logoHtml ? 'Official Partner Range' : 'Standard Supply Range'}</div>
          </div>
        </div>
        <span style="font-size: 6.5pt; color: #a68a61; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; background: rgba(166,138,97,0.1); padding: 1mm 2.5mm; border-radius: 12px;">${logoHtml ? 'GENUINE RANGE' : 'BULK SUPPLY'}</span>
      </div>
      <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 2mm 3.5mm;">
        ${productsHtml}
      </div>
    </div>
  `;
}

// Clean old generated product files first
const pagesDir = path.join(__dirname, 'pages');
fs.readdirSync(pagesDir).forEach(file => {
  if (file.endsWith('-products.html')) {
    fs.unlinkSync(path.join(pagesDir, file));
  }
});

categories.forEach(category => {
  let isFirstPage = true;
  let currentContent = '';
  let currentCost = 0;
  
  for (let i = 0; i < category.brands.length; i++) {
    const brand = category.brands[i];
    // Height estimation in mm: brand header (14mm) + rows of 2 items (8.5mm per row)
    const brandHeight = 14 + Math.ceil(brand.products.length / 2) * 8.5;
    const maxCapacity = isFirstPage ? 200 : 235;
    
    if (currentCost > 0 && (currentCost + brandHeight > maxCapacity)) {
      // Flush current page
      const fileName = String(fileCounter).padStart(2, '0') + '-products.html';
      fs.writeFileSync(path.join(pagesDir, fileName), generatePageHtml(category, currentContent, isFirstPage, globalPageNum));
      fileCounter++;
      globalPageNum++;
      
      isFirstPage = false;
      currentContent = '';
      currentCost = 0;
    }
    
    currentContent += renderBrandBlock(brand, category);
    currentCost += brandHeight + 4; // Add spacing margin
  }
  
  if (currentContent !== '') {
    const fileName = String(fileCounter).padStart(2, '0') + '-products.html';
    fs.writeFileSync(path.join(pagesDir, fileName), generatePageHtml(category, currentContent, isFirstPage, globalPageNum));
    fileCounter++;
    globalPageNum++;
  }
});

console.log('Pages generated successfully with brand logos. Total product pages:', fileCounter - 4);
