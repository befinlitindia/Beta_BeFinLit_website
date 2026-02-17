import React from 'react';
import { HelpCircle } from 'lucide-react';
import { UserInput } from './types';
import { preventNonNumericInput } from '../utils';

interface Section80DCalculatorProps {
    inputs: UserInput;
    onChange: (name: keyof UserInput, value: any) => void;
}

const Section80DCalculator: React.FC<Section80DCalculatorProps> = ({ inputs, onChange }) => {
    return (
        <div className="bg-white p-6 rounded-sm border border-slate-200 shadow-sm col-span-full">
            <h4 className="text-sm font-bold text-[#000a2e] mb-5 flex items-center gap-2">
                Section 80D: Medical Insurance & Expenses
                <div className="group/tooltip relative">
                    <HelpCircle className="w-3 h-3 text-slate-300 cursor-help" />
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 bg-[#000a2e] text-white text-[10px] rounded-sm opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none z-10 font-normal shadow-lg leading-relaxed">
                        Deductions for medical insurance premiums. <strong>Note:</strong> Only payments via bank/digital modes are allowed. Cash payments (except for preventive checkups) are not eligible.
                    </div>
                </div>
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="space-y-2">
                    <label className="block text-xs font-bold text-slate-600">Insurance (Self/Spouse/Kids)</label>
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xs">₹</span>
                        <input
                            type="number"
                            onKeyDown={preventNonNumericInput}
                            onWheel={(e) => (e.target as HTMLInputElement).blur()}
                            value={inputs.section80D_SelfInsurance || ''}
                            onChange={(e) => onChange('section80D_SelfInsurance', parseFloat(e.target.value) || 0)}
                            className="w-full pl-7 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-sm text-sm font-semibold focus:ring-1 focus:ring-[#000a2e] outline-none"
                            placeholder="0"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="block text-xs font-bold text-slate-600">Insurance (Parents)</label>
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xs">₹</span>
                        <input
                            type="number"
                            onKeyDown={preventNonNumericInput}
                            onWheel={(e) => (e.target as HTMLInputElement).blur()}
                            value={inputs.section80D_ParentsInsurance || ''}
                            onChange={(e) => onChange('section80D_ParentsInsurance', parseFloat(e.target.value) || 0)}
                            className="w-full pl-7 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-sm text-sm font-semibold focus:ring-1 focus:ring-[#000a2e] outline-none"
                            placeholder="0"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="block text-xs font-bold text-slate-600 flex items-center gap-1">
                        Preventive Checkup
                        <div className="group/help relative">
                            <HelpCircle className="w-2.5 h-2.5 text-slate-300 cursor-help" />
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 w-40 p-2 bg-[#000a2e] text-white text-[9px] rounded-sm opacity-0 group-hover/help:opacity-100 pointer-events-none font-normal">
                                Max ₹5,000 as per Act.
                            </div>
                        </div>
                    </label>
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xs">₹</span>
                        <input
                            type="number"
                            onKeyDown={preventNonNumericInput}
                            onWheel={(e) => (e.target as HTMLInputElement).blur()}
                            value={inputs.section80D_PreventiveCheckup || ''}
                            onChange={(e) => onChange('section80D_PreventiveCheckup', parseFloat(e.target.value) || 0)}
                            className="w-full pl-7 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-sm text-sm font-semibold focus:ring-1 focus:ring-[#000a2e] outline-none"
                            placeholder="0"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Section80DCalculator;
