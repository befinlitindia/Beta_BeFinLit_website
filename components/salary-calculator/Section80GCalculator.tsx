import React from 'react';
import { HelpCircle, Plus, Trash2 } from 'lucide-react';
import { UserInput, DonationItem, ComparisonResult } from './types';

interface Section80GCalculatorProps {
    inputs: UserInput;
    breakdown: ComparisonResult['section80G_Breakdown'];
    onChange: (name: keyof UserInput, value: any) => void;
}

const FUNDS = [
    // Block 1: 100% Deduction (No limit)
    { name: "National Defence Fund", block: 1 },
    { name: "PM's National Relief Fund", block: 1 },
    { name: "PM Citizen Assistance and Relief Fund", block: 1 },
    { name: "PM's Armenia Earthquake Relief Fund", block: 1 },
    { name: "Africa (Public Contributions - India) Fund", block: 1 },
    { name: "National Children's Fund", block: 1 },
    { name: "National Foundation for Communal Harmony", block: 1 },
    { name: "University or educational institution of national eminence", block: 1 },
    { name: "CM's Earthquake Relief Fund, Maharashtra", block: 1 },
    { name: "Gujarat State Government Earthquake Relief Fund", block: 1 },
    { name: "Zila Saksharta Samiti", block: 1 },
    { name: "National Blood Transfusion Council or any State Blood Transfusion Council", block: 1 },
    { name: "State Government Fund for medical relief to the poor", block: 1 },
    { name: "Army Central Welfare Fund, Indian Naval Benevolent Fund, or Air Force Central Welfare Fund", block: 1 },
    { name: "Andhra Pradesh CM's Cyclone Relief Fund, 1996", block: 1 },
    { name: "National Illness Assistance Fund", block: 1 },
    { name: "CM's Relief Fund or Lieutenant Governor's Relief Fund", block: 1 },
    { name: "National Sports Development Fund", block: 1 },
    { name: "National Cultural Fund", block: 1 },
    { name: "Fund for Technology Development and Application", block: 1 },
    { name: "National Trust for Welfare of Persons with Autism, Cerebral Palsy, Mental Retardation and Multiple Disabilities", block: 1 },
    { name: "Swachh Bharat Kosh", block: 1 },
    { name: "Clean Ganga Fund", block: 1 },
    { name: "National Fund for Control of Drug Abuse", block: 1 },

    // Block 2: 50% Deduction (No limit)
    { name: "PM's Drought Relief Fund", block: 2 },

    // Block 3: 100% Deduction (With limit)
    { name: "Government or approved local authority, institution or association for Family Planning", block: 3 },

    // Block 4: 50% Deduction (With limit)
    { name: "Others with 10BE certificate (registered charitable trusts, notified religious places, etc.)", block: 4 }
];

const Section80GCalculator: React.FC<Section80GCalculatorProps> = ({ inputs, breakdown, onChange }) => {

    const handleAddDonation = () => {
        const newItem: DonationItem = {
            id: Date.now().toString(),
            fundName: FUNDS[0].name,
            amount: 0,
            blockType: FUNDS[0].block as 1 | 2 | 3 | 4
        };
        onChange('donationsList', [newItem, ...(inputs.donationsList || [])]);
    };

    const handleRemoveDonation = (id: string) => {
        onChange('donationsList', (inputs.donationsList || []).filter(d => d.id !== id));
    };

    const handleUpdateDonation = (id: string, field: keyof DonationItem, value: any) => {
        const newList = (inputs.donationsList || []).map(d => {
            if (d.id === id) {
                const updated = { ...d, [field]: value };
                if (field === 'fundName') {
                    const fund = FUNDS.find(f => f.name === value);
                    if (fund) updated.blockType = fund.block as 1 | 2 | 3 | 4;
                }
                return updated;
            }
            return d;
        });
        onChange('donationsList', newList);
    };

    const formatINR = (val: number) => Math.round(val).toLocaleString('en-IN');
    const hasDonations = inputs.donationsList && inputs.donationsList.length > 0;

    return (
        <div className="bg-white p-6 rounded-sm border border-slate-200 shadow-sm col-span-full">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h4 className="text-sm font-bold text-[#000a2e] flex items-center gap-2">
                        Section 80G: Charitable Donations
                        <div className="group/tooltip relative">
                            <HelpCircle className="w-3 h-3 text-slate-300 cursor-help" />
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 bg-[#000a2e] text-white text-[10px] rounded-sm opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none z-10 font-normal shadow-lg leading-relaxed">
                                80G allows tax deductions for contributions made to specified relief funds and charitable institutions. <strong>Note:</strong> Cash donations over ₹2,000 are not eligible.
                            </div>
                        </div>
                    </h4>
                </div>
                <button
                    onClick={handleAddDonation}
                    className="flex items-center gap-2 px-4 py-2 bg-slate-50 border border-slate-200 rounded-sm text-xs font-black text-[#000a2e] hover:bg-slate-100 transition-colors uppercase tracking-widest shadow-sm"
                >
                    <Plus className="w-4 h-4" /> Add donation
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                <div className="lg:col-span-7 space-y-4">
                    {(!inputs.donationsList || inputs.donationsList.length === 0) && (
                        <div className="py-12 border-2 border-dashed border-slate-100 rounded-sm text-center">
                            <p className="text-xs font-bold text-slate-300 italic">No donations listed. Click 'Add donation' to begin.</p>
                        </div>
                    )}
                    {(inputs.donationsList || []).map((d) => (
                        <div key={d.id} className="grid grid-cols-1 md:grid-cols-12 gap-3 items-end animate-in slide-in-from-top-2 duration-300 bg-slate-50/30 p-3 rounded-sm border border-transparent hover:border-slate-200">
                            <div className="md:col-span-7">
                                <label className="block text-[10px] font-bold text-slate-400 mb-1">Fund / Institution name</label>
                                <select
                                    value={d.fundName}
                                    onChange={(e) => handleUpdateDonation(d.id, 'fundName', e.target.value)}
                                    className="w-full bg-white border border-slate-200 py-2.5 px-3 rounded-sm text-xs font-bold text-[#000a2e] focus:border-[#000a2e] outline-none transition-all"
                                >
                                    <optgroup label="Block 1: 100% (No limit)">
                                        {FUNDS.filter(f => f.block === 1).map(f => <option key={f.name} value={f.name}>{f.name}</option>)}
                                    </optgroup>
                                    <optgroup label="Block 2: 50% (No limit)">
                                        {FUNDS.filter(f => f.block === 2).map(f => <option key={f.name} value={f.name}>{f.name}</option>)}
                                    </optgroup>
                                    <optgroup label="Block 3: 100% (With limit)">
                                        {FUNDS.filter(f => f.block === 3).map(f => <option key={f.name} value={f.name}>{f.name}</option>)}
                                    </optgroup>
                                    <optgroup label="Block 4: 50% (With limit)">
                                        {FUNDS.filter(f => f.block === 4).map(f => <option key={f.name} value={f.name}>{f.name}</option>)}
                                    </optgroup>
                                </select>
                            </div>
                            <div className="md:col-span-4 relative">
                                <label className="block text-[10px] font-bold text-slate-400 mb-1">Amount</label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xs">₹</span>
                                    <input
                                        type="number"
                                        value={d.amount || ''}
                                        onChange={(e) => handleUpdateDonation(d.id, 'amount', parseFloat(e.target.value) || 0)}
                                        className="w-full pl-8 pr-3 py-2.5 bg-white border border-slate-200 rounded-sm text-xs font-bold text-[#000a2e] focus:border-[#000a2e] outline-none transition-all"
                                        placeholder="0"
                                    />
                                </div>
                            </div>
                            <div className="md:col-span-1 flex justify-center pb-1">
                                <button
                                    onClick={() => handleRemoveDonation(d.id)}
                                    className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-sm transition-all"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="lg:col-span-5 bg-[#000a2e] p-6 rounded-sm flex flex-col shadow-xl text-white">
                    <h5 className="text-[11px] font-bold text-slate-400 mb-6 border-b border-white/10 pb-2">80G relief summary</h5>

                    <div className="space-y-4 mb-8">
                        <div className="flex justify-between items-center">
                            <span className="text-[10px] font-bold text-slate-400">Adjusted Total Income (ATI)</span>
                            <span className="text-xs font-black">₹{hasDonations ? formatINR(breakdown.ati) : '0'}</span>
                        </div>
                        <div className="flex justify-between items-center pb-3 border-b border-white/10">
                            <span className="text-[10px] font-bold text-slate-400">Qualifying Limit (10% of ATI)</span>
                            <span className="text-xs font-black">₹{hasDonations ? formatINR(breakdown.ql) : '0'}</span>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between text-[10px] font-medium opacity-80">
                                <span>Block 1: 100% (No limit)</span>
                                <span>₹{formatINR(breakdown.reliefBlock1)}</span>
                            </div>
                            <div className="flex justify-between text-[10px] font-medium opacity-80">
                                <span>Block 2: 50% (No limit)</span>
                                <span>₹{formatINR(breakdown.reliefBlock2)}</span>
                            </div>
                            <div className="flex justify-between text-[10px] font-medium opacity-80">
                                <span>Block 3: 100% (With limit)</span>
                                <span>₹{formatINR(breakdown.reliefBlock3)}</span>
                            </div>
                            <div className="flex justify-between text-[10px] font-medium opacity-80">
                                <span>Block 4: 50% (With limit)</span>
                                <span>₹{formatINR(breakdown.reliefBlock4)}</span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-auto pt-6 border-t border-yellow-400/30 text-center">
                        <p className="text-[10px] font-bold text-slate-400 mb-1">Total eligible relief</p>
                        <p className="text-4xl font-black text-yellow-400">₹{formatINR(breakdown.total)}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Section80GCalculator;
