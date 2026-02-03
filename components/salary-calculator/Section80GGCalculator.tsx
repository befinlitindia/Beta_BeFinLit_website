import React from 'react';
import { HelpCircle } from 'lucide-react';
import { UserInput, ComparisonResult } from './types';

interface Section80GGCalculatorProps {
    inputs: UserInput;
    breakdown: ComparisonResult['section80GG_Breakdown'];
    onChange: (name: keyof UserInput, value: any) => void;
}

const Section80GGCalculator: React.FC<Section80GGCalculatorProps> = ({ inputs, breakdown, onChange }) => {
    const isHraAvailable = inputs.hraReceived > 0;
    const formatINR = (val: number) => Math.round(val).toLocaleString('en-IN');

    // Logic: If HRA is available, displayed rent is 0. Otherwise, take from inputs.
    const annualRentFromHRA = inputs.rentFrequency === 'monthly' ? inputs.actualRentPaid * 12 : inputs.actualRentPaid;
    const displayRent = isHraAvailable ? 0 : annualRentFromHRA;

    return (
        <div className={`bg-white p-6 rounded-sm border border-slate-200 shadow-sm col-span-full ${isHraAvailable ? 'opacity-50' : ''}`}>
            <h4 className="text-sm font-bold text-[#000a2e] mb-5 flex items-center gap-2">
                Section 80GG: Rent Paid (No HRA)
                <div className="group/tooltip relative">
                    <HelpCircle className="w-3 h-3 text-slate-300 cursor-help" />
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 bg-[#000a2e] text-white text-[10px] rounded-sm opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none z-10 font-normal shadow-lg leading-relaxed">
                        Only available if HRA is not part of your salary and you pay rent for your accommodation. <strong>Condition:</strong> No house property owned by self, spouse, or minor child at the place of employment.
                    </div>
                </div>
            </h4>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                <div className="lg:col-span-7 space-y-5">
                    <div className="relative">
                        <label className="block text-xs font-bold text-slate-600 mb-2">Annual Rent Paid (Synced from HRA module)</label>
                        <div className="p-3 bg-slate-50 border border-slate-200 rounded-sm">
                            <p className="text-sm font-black text-[#000a2e]">₹{formatINR(displayRent)}</p>
                            <p className="text-[10px] text-slate-400 mt-1 font-semibold italic leading-snug">Auto-calculated based on HRA inputs above</p>
                        </div>
                    </div>
                    {isHraAvailable ? (
                        <div className="p-3 bg-red-50 border border-red-100 rounded-sm">
                            <p className="text-[10px] text-red-600 font-bold italic">
                                Section 80GG is disabled because HRA is received in Section B.
                            </p>
                        </div>
                    ) : (
                        <div className="p-3 bg-slate-50 rounded-sm">
                            <p className="text-[10px] text-slate-500 font-bold italic leading-relaxed">
                                Form 10BA must be filed to claim this deduction. The deduction is the least of the three calculated limits.
                            </p>
                        </div>
                    )}
                </div>

                <div className="lg:col-span-5 bg-[#000a2e] p-6 rounded-sm flex flex-col shadow-xl text-white">
                    <h5 className="text-[11px] font-bold text-slate-400 mb-6 border-b border-white/10 pb-2">80GG relief summary</h5>

                    <div className="space-y-4 mb-8">
                        <div className="flex justify-between items-center">
                            <span className="text-[10px] font-bold text-slate-400">Adjusted Total Income (ATI)</span>
                            <span className="text-xs font-black">₹{formatINR(breakdown.ati)}</span>
                        </div>

                        <div className="space-y-2 mt-4">
                            <div className="flex justify-between text-[10px] font-medium opacity-80">
                                <span>1. ₹5,000 per month (Max 60k)</span>
                                <span>₹{formatINR(breakdown.limit1)}</span>
                            </div>
                            <div className="flex justify-between text-[10px] font-medium opacity-80">
                                <span>2. 25% of ATI</span>
                                <span>₹{formatINR(breakdown.limit2)}</span>
                            </div>
                            <div className="flex justify-between text-[10px] font-medium opacity-80">
                                <span>3. Rent Paid minus 10% of ATI</span>
                                <span>₹{formatINR(breakdown.limit3)}</span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-auto pt-6 border-t border-yellow-400/30 text-center">
                        <p className="text-[10px] font-bold text-slate-400 mb-1">Eligible deduction (Lowest of the three)</p>
                        <p className="text-4xl font-black text-yellow-400">₹{formatINR(breakdown.eligibleDeduction)}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Section80GGCalculator;
