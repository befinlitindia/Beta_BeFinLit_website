import React, { useState } from 'react';
import { ShieldCheck, Calendar, FileText, Info, AlertTriangle, ChevronDown, ChevronUp } from 'lucide-react';

const Compliances: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const complianceList = [
        {
            title: "TDS on Rent (Section 194-IB)",
            description: "If your monthly rent exceeds ₹50,000, you are required to deduct 5% TDS and file Form 26QC.",
            icon: <FileText size={18} />,
            severity: "high"
        },
        {
            title: "Form 12BB Submission",
            description: "Submit Form 12BB to your employer with all investment proofs (80C, 80D, HRA, Home Loan) by Jan/Feb to avoid excess TDS.",
            icon: <ShieldCheck size={18} />,
            severity: "critical"
        },
        {
            title: "ITR Filing Due Date",
            description: "The standard deadline for salaried individuals is July 31st of the assessment year.",
            icon: <Calendar size={18} />,
            severity: "high"
        },
        {
            title: "Advance Tax Obligations",
            description: "If your total tax liability exceeds ₹10,000 after TDS, you must pay Advance Tax in quarterly installments.",
            icon: <AlertTriangle size={18} />,
            severity: "medium"
        }
    ];

    return (
        <div className="mt-12 bg-white rounded-sm border border-slate-200 shadow-sm overflow-hidden">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full px-8 py-5 flex items-center justify-between bg-slate-50 hover:bg-slate-100 transition-colors group"
            >
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-[#000a2e] text-yellow-400 rounded-sm">
                        <ShieldCheck size={20} />
                    </div>
                    <div className="text-left">
                        <h3 className="text-lg font-bold font-serif text-[#000a2e]">Compliances to Keep in Mind</h3>
                        <p className="text-[10px] text-slate-500 font-medium italic">Statutory requirements for salaried taxpayers</p>
                    </div>
                </div>
                {isOpen ? <ChevronUp size={20} className="text-slate-400" /> : <ChevronDown size={20} className="text-slate-400" />}
            </button>

            {isOpen && (
                <div className="p-8 border-t border-slate-100 animate-in slide-in-from-top-2 duration-300">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {complianceList.map((item, index) => (
                            <div key={index} className="flex gap-4 p-4 rounded-sm border border-slate-100 hover:border-slate-200 transition-colors bg-slate-50/30">
                                <div className={`mt-1 shrink-0 ${item.severity === 'critical' ? 'text-red-600' : 'text-befinlit-gold'}`}>
                                    {item.icon}
                                </div>
                                <div className="space-y-1">
                                    <h4 className="text-sm font-bold text-[#000a2e]">{item.title}</h4>
                                    <p className="text-xs text-slate-600 leading-relaxed font-medium">{item.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 p-4 bg-red-50 border-l-4 border-red-500 rounded-sm">
                        <div className="flex gap-3">
                            <Info size={18} className="text-red-600 shrink-0 mt-0.5" />
                            <div className="space-y-2">
                                <p className="text-xs font-black text-red-700 uppercase tracking-wider">Statutory Warning</p>
                                <p className="text-[11px] text-red-800 leading-relaxed font-medium italic">
                                    Non-compliance with TDS or Advance Tax rules can lead to interest penalties under Section 234A/B/C and potential notices from the Income Tax Department. Always consult a tax professional for complex scenarios.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Compliances;
