const fs = require('fs');

let content1 = fs.readFileSync('components/FinancialGuide.tsx', 'utf8');
content1 = content1.replace(/194J<sup\s*>\*<\/sup>/g, `<span onClick={() => onNavigate && onNavigate('glossary-changes', '194J')} className="text-befinlit-gold underline cursor-pointer hover:text-befinlit-navy transition-colors">194J<sup>*</sup></span>`);
fs.writeFileSync('components/FinancialGuide.tsx', content1);

console.log('Done 194J replacement');
