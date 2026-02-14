import React from 'react';
import { HelpCircle, Plus, Trash2 } from 'lucide-react';
import { CustomComponent } from './types';

interface SectionProps {
    title: string;
    description: string;
    children: React.ReactNode;
    delay?: number;
}

export const Section: React.FC<SectionProps> = ({ title, description, children, delay = 0 }) => (
    <div
        className="bg-white rounded-sm p-8 shadow-sm border-t border-slate-100 hover:shadow-xl transition-all duration-500 animate-in slide-in-from-bottom-8 fade-in"
        style={{ animationDelay: `${delay}ms` }}
    >
        <div className="mb-10">
            <h3 className="text-lg font-bold font-serif text-befinlit-navy mb-4">{title}</h3>
            <p className="text-xs text-slate-500 font-medium italic opacity-80">{description}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {children}
        </div>
    </div>
);

interface InputFieldProps {
    label: string;
    name: string;
    value: number;
    onChange: (name: any, value: any) => void;
    tooltip?: string;
    helpText?: string;
    showCurrency?: boolean;
    warning?: string;
}

export const InputField: React.FC<InputFieldProps> = ({ label, name, value, onChange, tooltip, helpText, showCurrency = true, warning }) => (
    <div className="relative group">
        <label className="block text-sm font-bold text-slate-700 mb-2.5 flex items-center gap-1.5 transition-colors group-hover:text-[#000a2e]">
            {label}
            {tooltip && (
                <div className="group/tooltip relative">
                    <HelpCircle className="w-3 h-3 text-slate-300 cursor-help hover:text-[#000a2e] transition-colors" />
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-52 p-3 bg-[#000a2e] text-white text-[10px] rounded-sm opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none z-10 font-normal shadow-2xl leading-relaxed">
                        {tooltip}
                    </div>
                </div>
            )}
        </label>
        <div className="relative">
            {showCurrency && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xs group-focus-within:text-[#000a2e]">₹</span>}
            <input
                type="number"
                value={value === 0 ? '' : value}
                onChange={(e) => onChange(name, parseFloat(e.target.value) || 0)}
                className={`w-full ${showCurrency ? 'pl-8' : 'pl-3'} pr-3 py-2 bg-slate-50 border ${warning ? 'border-amber-400' : 'border-slate-200'} rounded-sm text-sm text-[#000a2e] font-bold focus:outline-none focus:ring-1 ${warning ? 'focus:ring-amber-500' : 'focus:ring-[#000a2e]'} focus:bg-white transition-all hover:border-slate-300 placeholder-slate-300`}
                placeholder="0"
            />
        </div>
        {warning && <p className="text-[10px] text-amber-600 mt-1 font-bold flex items-center gap-1">⚠️ {warning}</p>}
        {helpText && <p className="text-[10px] text-slate-400 mt-2 font-semibold italic">{helpText}</p>}
    </div>
);

interface ToggleFieldProps {
    label: string;
    name: string;
    value: boolean;
    onChange: (name: any, value: any) => void;
    leftLabel: string;
    rightLabel: string;
    subText?: string;
}

export const ToggleField: React.FC<ToggleFieldProps> = ({ label, name, value, onChange, leftLabel, rightLabel, subText }) => (
    <div className="flex flex-col group">
        <label className="block text-sm font-bold text-slate-700 mb-2.5 transition-colors group-hover:text-[#000a2e]">{label}</label>
        <div className="flex bg-slate-100 p-1.5 rounded-sm gap-1.5">
            <button
                onClick={() => onChange(name, true)}
                className={`flex-1 py-2 rounded-sm text-xs font-bold transition-all duration-300 ${value ? 'bg-[#000a2e] text-white shadow-lg' : 'text-slate-500 hover:bg-white/50'}`}
            >
                {leftLabel}
            </button>
            <button
                onClick={() => onChange(name, false)}
                className={`flex-1 py-2 rounded-sm text-xs font-bold transition-all duration-300 ${!value ? 'bg-[#000a2e] text-white shadow-lg' : 'text-slate-500 hover:bg-white/50'}`}
            >
                {rightLabel}
            </button>
        </div>
        {subText && <p className="text-[10px] text-slate-400 mt-2 font-semibold">{subText}</p>}
    </div>
);

interface DynamicRowProps {
    items: CustomComponent[];
    onAdd: () => void;
    onRemove: (id: string) => void;
    onChange: (id: string, field: 'name' | 'value', value: any) => void;
    title: string;
}

export const DynamicRow: React.FC<DynamicRowProps> = ({ items, onAdd, onRemove, onChange, title }) => {
    return (
        <div className="md:col-span-2 lg:col-span-3 mt-6">
            <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-2">
                <span className="text-sm font-black text-[#000a2e] tracking-tight">{title}</span>
                <button
                    onClick={onAdd}
                    className="text-xs font-bold text-[#000a2e] flex items-center gap-1.5 hover:bg-slate-100 px-3 py-1.5 rounded-sm transition-colors border border-slate-200"
                >
                    <Plus className="w-4 h-4" /> Add Component
                </button>
            </div>

            <div className="space-y-4">
                {items.length === 0 && <p className="text-[10px] text-slate-400 font-bold italic py-2">No additional components added yet.</p>}
                {items.map((item) => (
                    <div key={item.id} className="flex gap-4 animate-in fade-in slide-in-from-left-4 duration-500">
                        <input
                            type="text"
                            value={item.name}
                            onChange={(e) => onChange(item.id, 'name', e.target.value)}
                            placeholder="Component Name"
                            className="flex-1 py-2 px-4 bg-white border border-slate-200 rounded-sm text-sm text-[#000a2e] font-bold focus:outline-none focus:border-[#000a2e]"
                        />
                        <div className="relative w-40 md:w-56">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xs">₹</span>
                            <input
                                type="number"
                                value={item.value === 0 ? '' : item.value}
                                onChange={(e) => onChange(item.id, 'value', parseFloat(e.target.value) || 0)}
                                placeholder="0"
                                className="w-full pl-8 pr-3 py-2 bg-white border border-slate-200 rounded-sm text-sm text-[#000a2e] font-bold focus:outline-none focus:border-[#000a2e] placeholder-slate-300"
                            />
                        </div>
                        <button
                            onClick={() => onRemove(item.id)}
                            className="p-3 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-sm transition-all"
                        >
                            <Trash2 className="w-5 h-5" />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
