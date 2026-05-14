"use client";

import React, { useMemo } from "react";
import { SimpleBarChart, LabelAgreementChart, ModelAgreementChart } from "./charts";
import { useState, useEffect } from "react";
import { fetchWithAuth } from "@/lib/fetcher";
import * as d3 from "d3";

// Type definitions
export interface UserLabelData {
  label: string;
  count: number;
}

export interface AgreementData {
  x: number; // DS label
  y: number; // DS label
  confusion: number;
}

export default function AnalyticsPage() {
  const [totalLabeled, setTotalLabeled] = useState(0);
  const [userSkew, setUserSkew] = useState(0);
  const [allUserSkew, setAllUserSkew] = useState(0);
  const [userLabelData, setUserLabelData] = useState<UserLabelData[]>([]); // data for user label freq chart
  const [allUserLabelData, setAllUserLabelData] = useState<UserLabelData[]>([]); // data for all users label freq chart
  const [labelAgreementData, setLabelAgreementData] = useState<AgreementData[]>([]); // data for label agreement plot
  const [modelAgreementData, setModelAgreementData] = useState<AgreementData[]>([]); // data for model agreement plot

  useEffect(() => {
    fetchWithAuth("/analytics/me")
      .then((data) => {
        // Set total labeled and skew
        setTotalLabeled(data["num_comments"]);
        setUserSkew(data["user_skew"].toFixed(2));

        // Format user label data
        const damageAggregates = [
          { label: "DS0", count: 0 },
          { label: "DS1", count: 0 },
          { label: "DS2", count: 0 },
          { label: "DS3", count: 0 },
        ];
        Object.values(data["damage_aggregates"]).forEach((e, i) => {
          damageAggregates[i].count = e as number;
        });
        setUserLabelData(damageAggregates);

        // Format model agreement data
        const modelAgreement = data["predictions_and_confusions"].map((d) => {
          const jitterX = (Math.random() - 0.5) * 0.07;
          const jitterY = (Math.random() - 0.5) * 0.07;
          return {
            x: d.damage_sev + jitterX,
            y: d.model_prediction + jitterY,
            confusion: d.confusion,
          };
        });
        setModelAgreementData(modelAgreement);
      })
      .catch((e) => {
        console.log("Error, ", e);
      });

    fetchWithAuth("/analytics/overview")
      .then((data) => {
        // Set all users skew
        setAllUserSkew(data["total_skew"].toFixed(2));

        // Format all users label data
        const damageAggregatesAll = [
          { label: "DS0", count: 0 },
          { label: "DS1", count: 0 },
          { label: "DS2", count: 0 },
          { label: "DS3", count: 0 },
        ];
        Object.values(data["damage_aggregates_all"]).forEach((e, i) => {
          damageAggregatesAll[i].count = e as number;
        });
        setAllUserLabelData(damageAggregatesAll);

        // Format label agreement data
        const labelAgreement = data["top_ds_vs_avg_ds"].map((d) => {
          const jitterX = (Math.random() - 0.5) * 0.07;
          return {
            x: d.top_severity + jitterX,
            y: d.avg_damage_sev,
            confusion: d.confusion,
          };
        });
        setLabelAgreementData(labelAgreement);
      })
      .catch((e) => {
        console.log("Error, ", e);
      });
  }, []);

  // Calculate metrics
  const totalImages = 200;
  const percentageLabeled = Math.round((totalLabeled / totalImages) * 100);
  const normalize = (v: number) => ((Math.min(3, Math.max(-3, v)) + 3) / 6) * 100;

  return (
    <div className="min-h-screen bg-gray-50 p-6 pb-12">
      <div className="max-w-7xl mx-auto">
        {/* Top Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="flex flex-col justify-between h-full">
            {/* TOTAL LABELED CARD */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="text-5xl font-bold text-amber-700 mb-2">{percentageLabeled}%</div>
              {/* Progress bar */}
              <div className="relative h-2 bg-gray-300 rounded-full mb-4">
                <div
                  className="absolute top-0 left-0 h-full bg-amber-700 rounded-full transition-all duration-300"
                  style={{ width: `${percentageLabeled}%` }}
                >
                  {/* Circle indicator */}
                  <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-amber-700 rounded-full border-2 border-white group">
                    {/* Tooltip */}
                    <div className="absolute -translate-x-1/2 -translate-y-11 px-2 py-1 w-[90px] text-xs rounded bg-white text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity shadow-md border-1 border-gray-100">
                      Images labeled: {totalLabeled}
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-sm text-gray-500">
                <span className="text-sm font-semibold text-gray-500 tracking-wide">TOTAL LABELED</span>
                <span className="float-right">
                  {totalLabeled} / {totalImages}
                </span>
              </div>
            </div>

            {/* LABEL SKEWNESS CARD */}
            <div className="grid grid-cols-1 gap-6 mt-6">
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                {/* Large skewness number */}
                <div className="text-6xl font-bold text-amber-700">{userSkew}</div>

                {/* AVG MARKER */}
                <div className="relative -mb-1 h-8">
                  <div
                    className="absolute flex flex-col items-center"
                    style={{
                      left: `${normalize(allUserSkew)}%`,
                      transform: "translateX(-50%)",
                    }}
                  >
                    <div className="text-sm font-bold text-amber-700">AVG {allUserSkew}</div>
                    <div className="w-0 h-0 border-l-[7px] border-r-[7px] border-t-[8px] border-l-transparent border-r-transparent border-t-amber-700"></div>
                  </div>
                </div>

                {/* PROGRESS BAR */}
                <div className="relative h-2 bg-gray-300 rounded-full mb-2">
                  {/* Colored bar */}
                  <div
                    className="absolute top-0 h-full bg-amber-700 rounded-full transition-all duration-300"
                    style={{
                      left: `${userSkew >= 0 ? 50 : normalize(userSkew)}%`,
                      width: `${Math.abs(normalize(userSkew) - 50)}%`,
                    }}
                  >
                    {/* Circle indicator */}
                    <div
                      className="absolute top-1/2 transform w-3 h-3 bg-amber-700 rounded-full border-2 border-white group"
                      style={{
                        [userSkew >= 0 ? "right" : "left"]: 0,
                        transform: `translate(${userSkew >= 0 ? "50%" : "-50%"}, -50%)`,
                      }}
                    >
                      {/* Tooltip */}
                      <div className="absolute -translate-x-1/2 -translate-y-8 px-2 py-1 w-[110px] text-xs rounded bg-white text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity shadow-md border-1 border-gray-100">
                        Your skew: {userSkew}
                      </div>
                    </div>
                  </div>

                  {/* Center marker */}
                  <div className="absolute top-1/2 -translate-y-1/2 w-[2px] h-4 bg-gray-400 left-1/2"></div>
                </div>

                {/* SCALE LABELS */}
                <div className="flex justify-between text-xs font-medium text-gray-400">
                  <span>-3.0</span>
                  <span>0.0</span>
                  <span>3.0</span>
                </div>

                {/* Title and info icon */}
                <div className="flex items-center justify-between mb-1">
                  <div className="text-sm font-semibold text-gray-500 tracking-wide">LABEL SKEWNESS</div>
                  <button className="text-gray-400 hover:text-gray-600 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"></svg>
                  </button>
                </div>

                {/* Description text */}
                <div className="text-xs text-gray-400 italic">
                  Skewness of your label distribution, compared with with average skewness of <b>{allUserSkew}</b>{" "}
                  across all users.
                </div>
              </div>
            </div>
          </div>
          <SimpleBarChart
            data={userLabelData}
            title="My label frequencies"
            description="This plot visualizes the distributions of labels you have submitted so far."
          />
          <SimpleBarChart
            data={allUserLabelData}
            title="Label frequencies across all users"
            description="This plot visualizes the frequencies for the most popular labels for all the images in the EID database."
          />
        </div>

        {/* Bottom Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <LabelAgreementChart data={labelAgreementData} />
          <ModelAgreementChart data={modelAgreementData} />
        </div>
      </div>
    </div>
  );
}
