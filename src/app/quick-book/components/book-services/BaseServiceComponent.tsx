{/*

'use client';

import { Check } from 'lucide-react';


export interface BaseServiceProps {
    id: string;
    title: string;
    description?: string;
    selectedRoomSize: string;
    isSelected: boolean;
    onSelect: (id: string) => void;
}

export default function BaseServiceComponent({
    id,
    title,
    isSelected,
    onSelect
}: BaseServiceProps) {
    return (
        <div
            onClick={() => onSelect(id)}
            className={`relative border rounded-lg transition-all cursor-pointer p-4
                ${isSelected
                    ? 'border-[#1E3D8F] bg-[#e6f0fa]'
                    : 'border-gray-200 hover:border-[#90c2f7]'
                }`}
        >
            <div className="flex justify-between items-center">
                <h3 className="font-semibold">{title}</h3>
                {isSelected && <Check className="w-5 h-5 text-[#1E3D8F]" />}
            </div>
        </div>
    );
} 

*/}