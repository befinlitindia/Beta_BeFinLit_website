import React, { useState } from 'react';
import { Calculator, ArrowRight, Info } from 'lucide-react';

const TaxCalculator: React.FC = () => {
  const [revenue, setRevenue] = useState<string>('');
  const [result, setResult] = useState<{taxable: number; savings: number} | null>(null);

  const calculateTax = () => {
    const income = parseFloat(revenue.replace(/,/g, ''));
    if (isNaN(income)) return;

    // 44ADA Logic: 50% is deemed profit
    const deemedProfit = income * 0.5;
    
    // Simple comparison assuming 30% expense ratio vs 50% presumptive
    // This is a simplified illustrative calculation
    const actualExpenseAssumption = income * 0.3; 
    const profitRegular = income - actualExpenseAssumption;
    
    setResult({
      taxable: deemedProfit,
      savings: profitRegular - deemedProfit // Hypothetical savings in taxable base
    });
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <div className="my-12 bg-befinlit-navy text-befinlit-cream p-8 rounded-sm shadow-xl relative overflow-hidden group">
      {/* Decorative Background Element */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-befinlit-gold/10 rounded-full blur-3xl group-hover:bg-befinlit-gold/20 transition-all duration-700"></div>

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
          <Calculator className="text-befinlit-gold" size={24} />
          <h3 className="text-2xl font-serif font-bold italic">The 44ADA Benefit Estimator</h3>
        </div>

        <p className="text-white/80 mb-6 text-sm leading-relaxed max-w-lg">
          Under Section 44ADA, professionals can declare 50% of their gross receipts as income and pay tax only on that amount. See what your taxable base looks like.
        </p>

        <div className="grid md:grid-cols-2 gap-8 items-end">
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-wider text-befinlit-gold font-semibold">
              Annual Side-Hustle Revenue (₹)
            </label>
            <div className="relative">
              <input
                type="number"
                value={revenue}
                onChange={(e) => setRevenue(e.target.value)}
                placeholder="e.g. 800000"
                className="w-full bg-white/5 border border-white/20 text-white px-4 py-3 rounded-sm focus:outline-none focus:border-befinlit-gold focus:ring-1 focus:ring-befinlit-gold transition-all font-serif text-lg placeholder-white/30"
              />
            </div>
          </div>

          <button
            onClick={calculateTax}
            className="bg-befinlit-gold text-befinlit-navy px-6 py-3 rounded-sm font-bold hover:bg-white hover:text-befinlit-navy transition-all duration-300 flex items-center justify-center gap-2 group/btn"
          >
            Calculate Impact
            <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
          </button>
        </div>

        {result && (
          <div className="mt-8 pt-6 border-t border-white/10 grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
            <div className="bg-white/5 p-4 rounded-sm border-l-2 border-befinlit-gold">
              <p className="text-xs text-white/60 uppercase tracking-widest mb-1">Deemed Income (Taxable)</p>
              <p className="text-2xl font-bold text-white">{formatCurrency(result.taxable)}</p>
              <p className="text-[10px] text-white/40 mt-1 italic">Only 50% of your revenue is taxed.</p>
            </div>
            
            <div className="flex items-start gap-3 p-4">
              <Info className="text-befinlit-gold shrink-0 mt-1" size={18} />
              <p className="text-xs text-white/70 leading-relaxed">
                By opting for presumptive taxation, you don't need to maintain detailed books of accounts if your income is below ₹75 Lakhs (updated limit). <br/>
                <span className="text-befinlit-gold underline cursor-pointer mt-1 inline-block">Read more about Sec 44ADA</span>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaxCalculator;