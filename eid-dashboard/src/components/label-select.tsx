"use client";

import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import React from 'react';
import Label from './ui/label';

export type LabelType = {
	id: string;
	name: string;
	color: string; // Color class like 'bg-red-500'
  value: number;
};

export const labels: LabelType[] = [
	{ id: 'DS0', name: 'Irrelevant or non-informative (DS0)', color: 'bg-gray-400', value: 0 },
	{ id: 'DS1', name: 'Little-to-no damage (DS1)', color: 'bg-green-500', value: 1 },
	{ id: 'DS2', name: 'Mild damage (DS2)', color: 'bg-yellow-500', value: 2 },
	{ id: 'DS3', name: 'Severe damage (DS3)', color: 'bg-red-500', value: 3 },
];

interface LabelSelectProps {
  labels: LabelType[];
  disabled?: boolean;
  selectedLabelName?: string | null;
  onChange: (name: string, value: number | null) => void;
  sx?: any;
}

export default function LabelSelect({ labels, disabled, selectedLabelName, onChange, sx }: LabelSelectProps) {
  const selectedId = labels.find(l => l.name === selectedLabelName)?.id || '';
  return (
    <Select
      placeholder="Select a label"
      value={selectedId} 
      disabled={disabled}
      onChange={(_, val) => {
        const label = labels.find(l => l.id === val);
        if (label) {
          onChange(label.name, label.value); 
        } else {
          onChange('', null);
        }
      }}
      renderValue={(selected) => {
        const selectedValueId = (typeof selected === 'object' ? (selected as any)?.value : selected) as string;
        const label = labels.find((l) => l.id === selectedValueId);
        return label ? <Label name={label.name} color={label.color} dotSize={8} gap={8} /> : null;
      }}
      sx={{ width: '100%', ...(sx || {}) }}
    >
      {labels.map((label) => (
        <Option key={label.id} value={label.id} sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
          <Label name={label.name} color={label.color} dotSize={8} gap={8} />
        </Option>
      ))}
    </Select>
  );
}
