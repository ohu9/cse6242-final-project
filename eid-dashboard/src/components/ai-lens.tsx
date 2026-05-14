"use client";

import React, { useEffect, useState } from "react";
import { Button } from './ui/button';
import { fetchWithAuth } from '@/lib/fetcher';
import { Loader2 } from 'lucide-react';
import { labels } from './label-select';
import Label from './ui/label';

interface AILensProps {
  ordinal?: number;
}

export default function AILens({ ordinal }: AILensProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setResults(null);
    setError(null);
  }, [ordinal]);

  const handleAnalyze = async () => {
    if (!ordinal) {
      setError('No image selected');
      return;
    }
    setIsAnalyzing(true);
    setError(null);
    try {
      const predictedLabel = await fetchWithAuth(`/infer/${ordinal}`);
      setResults(typeof predictedLabel === 'number' ? predictedLabel : null);
      console.log('Inference results:', predictedLabel);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to analyze image');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="flex flex-col min-h-full p-6 rounded-lg w-90">
      <h1 className="font-semibold text-lg mb-4">AI Lens 🔍 </h1>
      <div className="mb-6">
        <Button
          onClick={handleAnalyze}
          disabled={isAnalyzing}
        >
          {isAnalyzing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isAnalyzing ? 'Predicting...' : 'Analyze Image'}
        </Button>

        {error && (
          <p className="text-red-500 mt-4">{error}</p>
        )}

        {results !== null && (
          <div className="mt-4 space-y-4">
            <div className="space-y-2">
              <span className="font-medium block">Predicted Label:</span>
              <div className="ml-2">
                {(() => {
                  const matching = labels.find((l) => l.value === results);
                  return matching ? (
                    <Label
                      name={matching.name}
                      color={matching.color}
                      dotSize={8}
                      gap={8}
                    />
                  ) : 'Unknown label';
                })()}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
