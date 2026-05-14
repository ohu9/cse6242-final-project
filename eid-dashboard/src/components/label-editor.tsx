"use client";

import { useEffect, useState } from "react";
import { labels } from "./label-select";
import { fetchWithAuth } from "@/lib/fetcher";
import LabelSelect from "./label-select";

interface LabelEditorProps {
  selectedImageOrdinal: number | null;
  // when this prop changes the label selection will be reset to null
  resetTrigger?: number;
}

export default function LabelEditor({ selectedImageOrdinal, resetTrigger }: LabelEditorProps) {
  const [selectedLabelName, setSelectedLabelName] = useState<string | null>(null);
  const [selectedLabelValue, setSelectedLabelValue] = useState<number | null>(null);
  const [comment, setComment] = useState<string>("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedImageOrdinal !== null) {
      setLoading(true);
      setSelectedLabelName(null);
      fetchWithAuth(`/comments/read/${selectedImageOrdinal}`)
        .then((data) => {
          const damage =
            data && typeof data.damage === "number" && 0 <= data.damage && data.damage <= 3
              ? data.damage
              : null;
          const matching = labels.find((l) => l.value === damage);
          setSelectedLabelValue(damage);
          setSelectedLabelName(matching ? matching.name : null);
          setComment(data?.body || "");
        })
        .catch(() => {
          setSelectedLabelValue(null);
          setSelectedLabelName(null);
          setComment("");
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setSelectedLabelValue(null);
      setSelectedLabelName(null);
      setComment("");
    }
  }, [selectedImageOrdinal]);

  useEffect(() => {
    if (typeof resetTrigger !== 'undefined') {
      setSelectedLabelName(null);
      setSelectedLabelValue(null);
      setComment("");
    }
  }, [resetTrigger]);

  const assignLabel = async () => {
    if (selectedLabelName && selectedImageOrdinal !== null) {
      setLoading(true);
      await fetchWithAuth(`/comments/write/${selectedImageOrdinal}`, {
        method: "POST",
        body: JSON.stringify({
          damage_sev: selectedLabelValue,
          body: comment || "No comments for now",
        }),
      });
      console.log(JSON.stringify({
          damage_sev: selectedLabelValue,
          body: comment || "No comments for now",
        }));
      setSubmitted(true);
      setLoading(false);
      setTimeout(() => setSubmitted(false), 2000);
    }
  };

  return (
    <div className="flex flex-col min-h-full p-6 rounded-lg w-90">
      <h1 className="font-semibold text-lg mb-4">Label Editor</h1>

      {/* Assign a label */}
      <div className="mb-6">
        <label className="block mb-2 font-medium">Assign a Label</label>
        <LabelSelect
          labels={labels}
          selectedLabelName={selectedLabelName || null}
          onChange={(name, value) => {
            setSelectedLabelName(name);
            setSelectedLabelValue(value);
          }}
        />
      </div>

      {/* Comments field */}
      <div className="mb-6">
        <label className="block mb-2 font-medium">Comments</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write any notes or observations here..."
          className="w-full border border-gray-300 rounded-md p-2 text-sm min-h-[100px] resize-y focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Submit button */}
      <button
        onClick={assignLabel}
        disabled={selectedLabelValue === null || selectedImageOrdinal === null || loading}
        className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300 cursor-pointer disabled:cursor-not-allowed flex items-center justify-center"
      >
        {loading ? (
          <span className="flex items-center">
            <svg
              className="animate-spin h-5 w-5 mr-2 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              ></path>
            </svg>
            Loading...
          </span>
        ) : (
          "Assign Label"
        )}
      </button>
      <div
        className={`mt-2 text-green-600 font-medium transition-opacity duration-500 ${
          submitted ? "opacity-100" : "opacity-0"
        }`}
      >
        Label submitted!
      </div>
    </div>
  );
}
