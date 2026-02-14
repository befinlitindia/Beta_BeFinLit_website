import React from 'react';
import { UserInput, ComparisonResult } from './types';
import { Lightbulb, TrendingUp, Heart, Home, Coins, CalendarCheck, Shield, GraduationCap, Building, Wallet } from 'lucide-react';

interface TaxSavingSuggestionsProps {
    inputs: UserInput;
    results: ComparisonResult;
}

export const TaxSavingSuggestions: React.FC<TaxSavingSuggestionsProps> = ({ inputs, results }) => {
    const suggestions: Array<{ icon: React.ReactNode; title: string; description: string; impact?: string; priority: 'high' | 'medium' | 'low' }> = [];

    const oldRegime = results.oldRegime;
    const newRegime = results.newRegime;
    const basicPlusDA = inputs.basicSalary + inputs.da;
    const totalGross = oldRegime.grossTotalIncome;

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(val);
    };

    // 1. HRA vs 80GG Analysis
    const hasHRA = inputs.hraReceived > 0;
    const hraExemption = results.hraBreakdown.exemption;
    const annualRent = inputs.rentFrequency === 'monthly' ? inputs.actualRentPaid * 12 : inputs.actualRentPaid;

    if (!hasHRA && annualRent === 0) {
        suggestions.push({
            icon: <Home />,
            title: "Claim Rent Deduction u/s 80GG",
            description: "If you pay rent but don't receive HRA from your employer, you can claim deduction under Section 80GG. This can significantly reduce your taxable income in the Old Regime.",
            impact: "Maximum deduction: ₹60,000/year",
            priority: 'high',
        });
    }

    if (hasHRA && annualRent > 0 && hraExemption === 0) {
        suggestions.push({
            icon: <Home />,
            title: "Claim Your HRA Exemption",
            description: "You receive HRA and pay rent. Ensure you have submitted your rent receipts to your employer or entered details accurately to claim HRA exemption under the Old Regime.",
            impact: "Could save significant tax under Old Regime",
            priority: 'high',
        });
    }

    // 2. Health Insurance Analysis
    const selfLim = inputs.userAge >= 60 ? 50000 : 25000;
    const parentsLim = Math.max(inputs.fatherAge || 0, inputs.motherAge || 0) >= 60 ? 50000 : 25000;

    if (inputs.section80D_Self === 0) {
        suggestions.push({
            icon: <Heart />,
            title: "Get Health Insurance for Yourself",
            description: `Health insurance premium is deductible u/s 80D. You can claim up to ₹${selfLim.toLocaleString('en-IN')} for yourself and family.`,
            impact: `Potential savings: ${formatCurrency(selfLim * 0.30)}`,
            priority: 'high',
        });
    }

    if (inputs.section80D_Parents === 0 && inputs.section80D_Self > 0) {
        suggestions.push({
            icon: <Heart />,
            title: "Cover Your Parents Under 80D",
            description: `You can claim additional deduction for parents' health insurance - up to ₹${parentsLim.toLocaleString('en-IN')}. Even preventive check-ups up to ₹5,000 qualify.`,
            impact: `Additional deduction possible: up to ${formatCurrency(parentsLim)}`,
            priority: 'high',
        });
    }

    // 3. Section 80C Optimization
    if (inputs.section80C < 150000) {
        const remaining = 150000 - inputs.section80C;
        suggestions.push({
            icon: <Coins />,
            title: "Maximize Section 80C Investments",
            description: `You can invest ₹${remaining.toLocaleString('en-IN')} more in ELSS, PPF, LIC, or principal repayment of home loan to maximize your 80C limit.`,
            impact: `Potential savings: ${formatCurrency(Math.min(remaining * 0.30, 45000))}`,
            priority: 'high',
        });
    }

    // 4. NPS Contribution
    if (inputs.section80CCD1B < 50000) {
        const remaining = 50000 - inputs.section80CCD1B;
        suggestions.push({
            icon: <TrendingUp />,
            title: "Additional NPS Deduction (80CCD1B)",
            description: "Section 80CCD(1B) allows an additional ₹50,000 deduction for NPS contributions, over and above the 80C limit.",
            impact: `Potential savings: ${formatCurrency(remaining * 0.30)}`,
            priority: 'medium',
        });
    }

    if (inputs.section80CCD2 === 0 && totalGross > 1000000) {
        suggestions.push({
            icon: <TrendingUp />,
            title: "Request Employer NPS (80CCD2)",
            description: "Employer's contribution to NPS (up to 10% of Basic+DA) is deductible in BOTH Old and New regimes. This is a highly efficient tax planning tool.",
            impact: `Deduction: Request up to ${formatCurrency(Math.round(basicPlusDA * 0.10))}`,
            priority: 'high',
        });
    }

    // 5. Advance Tax
    if (oldRegime.totalTax > 10000 || newRegime.totalTax > 10000) {
        suggestions.push({
            icon: <CalendarCheck />,
            title: "Pay Advance Tax to Avoid Interest",
            description: "If your net tax liability exceeds ₹10,000, you must pay advance tax in quarterly installments to avoid interest u/s 234B & 234C.",
            priority: 'medium',
        });
    }

    // Sort and Filter
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    suggestions.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
    const displaySuggestions = suggestions.slice(0, 5);

    if (displaySuggestions.length === 0) {
        displaySuggestions.push({
            icon: <Lightbulb />,
            title: "Efficient tax planning!",
            description: "You are utilizing most common tax-saving avenues. Keep an eye on new investment opportunities.",
            priority: 'low',
        });
    }

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'high': return 'bg-red-50 border-red-100 text-red-700';
            case 'medium': return 'bg-amber-50 border-amber-100 text-amber-700';
            default: return 'bg-blue-50 border-blue-100 text-blue-700';
        }
    };

    return (
        <div className="bg-white rounded-sm p-8 border border-befinlit-navy/10 shadow-2xl animate-in zoom-in duration-500">
            <div className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-[#000a2e]/5 rounded-sm">
                    <Lightbulb className="w-5 h-5 text-yellow-500" />
                </div>
                <div>
                    <h4 className="text-sm font-black text-[#000a2e] uppercase tracking-wider">Tax Saving Suggestions</h4>
                    <p className="text-[10px] text-slate-400 font-bold tracking-widest uppercase">Personalized optimization strategy</p>
                </div>
            </div>

            <div className="space-y-4">
                {displaySuggestions.map((s, i) => (
                    <div key={i} className="group p-4 rounded-sm border border-slate-100 bg-slate-50/30 hover:bg-white hover:shadow-xl hover:border-[#000a2e]/10 transition-all duration-300">
                        <div className="flex gap-4">
                            <div className="mt-1 p-2 bg-white rounded-sm shadow-sm text-[#000a2e] group-hover:bg-[#000a2e] group-hover:text-white transition-colors duration-300">
                                {React.isValidElement(s.icon) ? React.cloneElement(s.icon as React.ReactElement, { size: 16 }) : null}
                            </div>
                            <div className="flex-1">
                                <div className="flex items-start justify-between mb-1 gap-2">
                                    <h5 className="text-xs font-black text-[#000a2e] group-hover:translate-x-1 transition-transform duration-300">{s.title}</h5>
                                    <span className={`text-[9px] uppercase font-black px-2 py-0.5 rounded-full tracking-tighter shadow-sm ${getPriorityColor(s.priority)}`}>
                                        {s.priority}
                                    </span>
                                </div>
                                <p className="text-xs text-slate-600 leading-relaxed font-medium mb-2">{s.description}</p>
                                {s.impact && (
                                    <div className="inline-flex items-center gap-1.5 px-2 py-1 bg-yellow-400/10 rounded-sm">
                                        <TrendingUp size={10} className="text-yellow-600" />
                                        <span className="text-[10px] font-black text-yellow-700 uppercase tracking-wider">{s.impact}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-8 p-4 bg-slate-50 border border-slate-100 rounded-sm italic">
                <p className="text-[10px] text-slate-400 font-bold leading-relaxed">
                    * This is a logic-based simulation based on current Indian Tax Laws for FY 2025-26. Consult a professional CA for personalized advice.
                </p>
            </div>
        </div>
    );
};
