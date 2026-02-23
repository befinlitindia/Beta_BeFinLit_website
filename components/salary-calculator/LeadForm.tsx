import React from 'react';
import { ArrowRight } from 'lucide-react';

const LeadForm: React.FC = () => {
    return (
        <div className="bg-befinlit-cream border border-befinlit-gold/30 p-8 md:p-12 rounded-sm text-center w-full shadow-sm relative overflow-hidden">
            <div className="relative z-10">
                <h3 className="text-2xl md:text-3xl font-bold text-befinlit-navy mb-4 font-serif">Need Expert Tax Filing?</h3>
                <p className="text-sm md:text-base text-befinlit-navy/70 mb-8 leading-relaxed italic font-serif max-w-4xl mx-auto">
                    Our Professional partners can help you plan your taxes effectively and file your ITR accurately.
                    Get a personalized consultation today to find your optimal path with our specialized tax simulation models.
                </p>
                <div className="max-w-md mx-auto">
                    <button className="w-full bg-befinlit-navy text-befinlit-cream px-8 py-5 rounded-sm font-bold hover:bg-befinlit-gold hover:text-befinlit-navy transition-all shadow-md text-sm uppercase tracking-widest flex items-center justify-center gap-3">
                        Schedule a Consultation <ArrowRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LeadForm;
