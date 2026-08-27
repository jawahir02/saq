const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

async function buildCatalogue() {
  console.log('Building PDF Catalogue...');
  const pagesDir = path.join(__dirname, 'pages');
  const outputDir = path.join(__dirname, 'output');
  
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Read all HTML files in pages directory
  // We expect them to be numbered like 01-cover.html, 02-intro.html, etc.
  const files = fs.readdirSync(pagesDir)
    .filter(f => f.endsWith('.html'))
    .sort();

  let allPagesContent = '';
  for (const file of files) {
    console.log(`Adding page: ${file}`);
    const content = fs.readFileSync(path.join(pagesDir, file), 'utf-8');
    allPagesContent += `\n<!-- Start of ${file} -->\n${content}\n<!-- End of ${file} -->\n`;
  }

  // Create the master HTML file
  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>SAQ Building Materials Catalogue</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Cormorant+Garamond:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="styles/main.css">
  <link rel="stylesheet" href="styles/print.css">
</head>
<body>
  ${allPagesContent}
</body>
</html>
  `;

  const indexHtmlPath = path.join(__dirname, 'index.html');
  fs.writeFileSync(indexHtmlPath, htmlContent);

  console.log('Master index.html generated. Launching Playwright...');

  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // Use file protocol to load the local index.html
  const fileUrl = 'file://' + indexHtmlPath.replace(/\\/g, '/');
  await page.goto(fileUrl, { waitUntil: 'networkidle' });

  // Explicitly wait for fonts to load
  await page.evaluate(() => document.fonts.ready);

  const outputPath = path.join(outputDir, 'SAQ-Building-Materials-Catalogue.pdf');
  
  await page.pdf({
    path: outputPath,
    format: 'A4',
    printBackground: true, // Preserve backgrounds
    margin: {
      top: '0',
      right: '0',
      bottom: '0',
      left: '0'
    }
  });

  await browser.close();
  console.log(`PDF successfully generated at: ${outputPath}`);
}

buildCatalogue().catch(console.error);
