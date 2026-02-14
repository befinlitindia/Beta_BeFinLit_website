import React from 'react';
import { HelpCircle } from 'lucide-react';
import { UserInput, ComparisonResult } from './types';

interface Section80CCDCalculatorProps {
    inputs: UserInput;
    onChange: (name: keyof UserInput, value: any) => void;
    breakdown?: ComparisonResult['section80CCD_Breakdown'];
}

const Section80CCDCalculator: React.FC<Section80CCDCalculatorProps> = ({ inputs, onChange, breakdown }) => {
    // Fallback if breakdown is not yet available (initial render)
    const eligible1B = breakdown?.eligible1B ?? Math.min(inputs.section80CCD1B, 50000);
    const eligible2 = breakdown?.eligible2_Old ?? inputs.section80CCD2; // Defaulting to Old Regime eligible logic for summary

    return (
        <div className="bg-white p-6 rounded-sm border border-slate-200 shadow-sm col-span-full">
            <h4 className="text-sm font-bold text-[#000a2e] mb-5 flex items-center gap-2">
                Section 80CCD: National Pension System (NPS)
                <div className="group/tooltip relative">
                    <HelpCircle className="w-3 h-3 text-slate-300 cursor-help" />
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 bg-[#000a2e] text-white text-[10px] rounded-sm opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none z-10 font-normal shadow-lg leading-relaxed">
                        80CCD(1B): Additional voluntary contribution (Self).<br />80CCD(2): Employer's contribution.<br /><span className="text-yellow-300 font-bold block mt-1">Please enter actual contribution figures. Calculator will apply applicable limits.</span>
                    </div>
                </div>
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-5">
                    <div className="relative">
                        <label className="block text-xs font-bold text-slate-600 mb-2">80CCD(1B): Self Voluntary Contribution</label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xs">₹</span>
                            <input
                                type="number"
                                value={inputs.section80CCD1B || ''}
                                onChange={(e) => onChange('section80CCD1B', parseFloat(e.target.value) || 0)}
                                className="w-full pl-7 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-sm text-sm font-semibold focus:ring-1 focus:ring-[#000a2e] outline-none"
                                placeholder="0"
                            />
                        </div>
                        <p className="text-[9px] text-slate-400 mt-1 font-bold">Max deduction: ₹50,000 over Section 80C.</p>
                    </div>

                    <div className="relative">
                        <label className="block text-xs font-bold text-slate-600 mb-2">80CCD(2): Employer's Contribution</label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xs">₹</span>
                            <input
                                type="number"
                                value={inputs.section80CCD2 || ''}
                                onChange={(e) => onChange('section80CCD2', parseFloat(e.target.value) || 0)}
                                className="w-full pl-7 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-sm text-sm font-semibold focus:ring-1 focus:ring-[#000a2e] outline-none"
                                placeholder="0"
                            />
                        </div>
                        <p className="text-[9px] text-slate-400 mt-1 font-bold">Limited to 14%/10% of Salary (Basic + DA).</p>
                    </div>
                </div>

                <div className="bg-slate-50 p-4 rounded-sm space-y-3 h-fit border border-slate-100">
                    <p className="text-xs font-bold text-slate-400 mb-2 text-center">Aggregate NPS Relief</p>

                    <div className="space-y-3">
                        <div className="flex justify-between items-center text-xs font-semibold border-b border-slate-200 pb-2">
                            <span className="text-slate-500">80CCD(1B) (Self)</span>
                            <span className="text-[#000a2e]">₹{Math.round(eligible1B).toLocaleString('en-IN')}</span>
                        </div>
                        <div className="flex justify-between items-center text-xs font-semibold pt-1">
                            <span className="text-slate-500">80CCD(2) (Employer)</span>
                            <span className="text-[#000a2e]">₹{Math.round(eligible2).toLocaleString('en-IN')}</span>
                        </div>
                    </div>

                    <div className="mt-4 p-4 bg-[#000a2e] rounded-sm text-center">
                        <p className="text-[10px] font-bold text-slate-400 mb-1">Total Eligible Relief</p>
                        <p className="text-xl font-bold text-yellow-400">₹{Math.round(eligible1B + eligible2).toLocaleString('en-IN')}</p>
                    </div>
                    <p className="text-[9px] text-slate-400 text-center font-medium italic">Employer contribution is tax-free in both regimes.</p>
                </div>
            </div>
        </div>
    );
};

export default Section80CCDCalculator;
