import React from 'react';

const Compliances: React.FC = () => {
    return (
        <div className="bg-white rounded-sm border-l-4 border-yellow-400 shadow-sm p-8 text-center hover:shadow-md transition-all">
            <h3 className="text-lg font-bold text-[#000a2e] tracking-tight mb-2">Advance Tax Compliance</h3>
            <p className="text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed">
                If your tax liability exceeds ₹10,000 in a financial year, you are liable to pay Advance Tax.
                Calculations here are estimates. Always verify with specific challans.
            </p>
        </div>
    );
};

export default Compliances;
