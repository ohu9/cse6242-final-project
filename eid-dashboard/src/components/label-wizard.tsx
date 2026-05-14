"use client";

import React, { useState, useEffect } from "react";
import Checkbox from '@mui/joy/Checkbox';
import Label from './ui/label';
import { labels, LabelType } from './label-select';

export default function LabelWizard() {
  const [selectedLabel, setSelectedLabel] = useState<LabelType>(labels[0]);
  const [containsLivable, setContainsLivable] = useState<boolean>(false);
  const [infrastructureDamage, setInfrastructureDamage] = useState<boolean>(false);
  const [damageRatioOverHalf, setDamageRatioOverHalf] = useState<boolean>(false);

  useEffect(() => {
    let label = "DS0";
    if (!containsLivable) {
      label = "DS3";
    } else if (!infrastructureDamage) {
      label = "DS1"; {/* DS0 alternative handled below */}
    } else if (!damageRatioOverHalf) {
      label = "DS2";
    } else {
      label = "DS3";
    }
    const recommendedLabel = labels.find(l => l.id === label) || labels[0];
    setSelectedLabel(recommendedLabel);
  }, [containsLivable, infrastructureDamage, damageRatioOverHalf]);

  return (
    <div className="flex flex-col min-h-full p-6 rounded-lg w-90">
      <h1 className="font-semibold text-lg mb-4">Label Wizard ✨ </h1>
      <div className="mb-6">

        {/* Question 1: Contains Livable/Usable Infrastructure */}
        <Checkbox
          checked={containsLivable}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const isChecked = (e.target as HTMLInputElement).checked;
            setContainsLivable(isChecked);
            if (!isChecked) {
              // clear dependent states when parent is unchecked
              setInfrastructureDamage(false);
              setDamageRatioOverHalf(false);
            }
          }}
          label="Contains Livable/Usable Infrastructure"
        />

        {/* Question 2: Contains Infrastructure Damage */}
        {containsLivable && (
          <Checkbox
            checked={infrastructureDamage}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const isChecked = (e.target as HTMLInputElement).checked;
              setInfrastructureDamage(isChecked);
              if (!isChecked) {
                // clear dependent child when this is unchecked
                setDamageRatioOverHalf(false);
              }
            }}
            label="Contains Infrastructure Damage"
          />
        )}

        {/* Question 3: Damage Ratio >50% */}
        {containsLivable && infrastructureDamage && (
          <Checkbox
            checked={damageRatioOverHalf}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const isChecked = (e.target as HTMLInputElement).checked;
              setDamageRatioOverHalf(isChecked);
            }}
            label="Damage Ratio >50%"
          />
        )}
      </div>

      {/* Display recommended label based on selections */}
      <h1 className="font-semibold text-lg mb-4">Recommended Label </h1>
      {selectedLabel.id === 'DS1' && (
        <div className="flex items-center mb-2">
        <Label name={labels[0].name} color={labels[0].color} dotSize={8} gap={8} />
        <span className="mx-2 font-semibold">OR</span>
        </div>
      )}
      <Label name={selectedLabel.name} color={selectedLabel.color} dotSize={8} gap={8} />

    </div>
  );
}
