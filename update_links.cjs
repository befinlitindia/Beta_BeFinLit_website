const fs = require('fs');

let content1 = fs.readFileSync('components/FinancialGuide.tsx', 'utf8');
content1 = content1.replace(/44ADA<sup\s*>\*<\/sup>/g, `<span onClick={() => onNavigate && onNavigate('glossary-changes', '44ADA')} className="text-befinlit-gold underline cursor-pointer hover:text-befinlit-navy transition-colors">44ADA<sup>*</sup></span>`);
content1 = content1.replace(/44AD<sup\s*>\*<\/sup>/g, `<span onClick={() => onNavigate && onNavigate('glossary-changes', '44AD')} className="text-befinlit-gold underline cursor-pointer hover:text-befinlit-navy transition-colors">44AD<sup>*</sup></span>`);
content1 = content1.replace(/44AA\*/g, `<span onClick={() => onNavigate && onNavigate('glossary-changes', '44AA')} className="text-befinlit-gold underline cursor-pointer hover:text-befinlit-navy transition-colors">44AA*</span>`);
fs.writeFileSync('components/FinancialGuide.tsx', content1);

let content2 = fs.readFileSync('components/ArticleContent.tsx', 'utf8');
content2 = content2.replace(/44ADA<sup\s*>\*<\/sup>/g, `<span onClick={() => onNavigate && onNavigate('glossary-changes', '44ADA')} className="text-befinlit-gold underline cursor-pointer hover:text-befinlit-navy transition-colors">44ADA<sup>*</sup></span>`);
content2 = content2.replace(/44AD<sup\s*>\*<\/sup>/g, `<span onClick={() => onNavigate && onNavigate('glossary-changes', '44AD')} className="text-befinlit-gold underline cursor-pointer hover:text-befinlit-navy transition-colors">44AD<sup>*</sup></span>`);
content2 = content2.replace(/44AA\*/g, `<span onClick={() => onNavigate && onNavigate('glossary-changes', '44AA')} className="text-befinlit-gold underline cursor-pointer hover:text-befinlit-navy transition-colors">44AA*</span>`);
fs.writeFileSync('components/ArticleContent.tsx', content2);

console.log('Done replacement');
