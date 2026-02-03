import React from 'react';
import { ArrowRight } from 'lucide-react';

const LeadForm: React.FC = () => {
    return (
        <div className="bg-[#000a2e] rounded-sm p-8 md:p-12 text-center text-white relative overflow-hidden shadow-lg">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
            <div className="relative z-10">
                <h3 className="text-3xl font-bold tracking-tight mb-4">Need Expert Tax Filing?</h3>
                <p className="text-slate-300 mb-8 max-w-xl mx-auto font-medium">
                    Our CA partners can help you file your ITR accurately and maximize your refunds.
                    Get a personalized consultation today.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-md mx-auto">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="px-6 py-3 rounded-sm text-[#000a2e] focus:outline-none focus:ring-2 focus:ring-yellow-400 font-medium"
                    />
                    <button className="px-6 py-3 bg-yellow-400 text-[#000a2e] font-bold rounded-sm hover:bg-yellow-300 transition-colors flex items-center justify-center gap-2 text-sm">
                        Get Started <ArrowRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LeadForm;
