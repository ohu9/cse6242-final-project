"use client";

import React, { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ScatterChart,
  Scatter,
  Cell,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import * as d3 from "d3";
import { UserLabelData, AgreementData } from "./page";

// Simple Bar Chart Component
export function SimpleBarChart({
  data,
  title,
  description,
}: {
  data: UserLabelData[];
  title: string;
  description: string;
}) {
  const colors = ["#471901", "#7A3307", "#BA4D00", "#E27001"];

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-1">{title}</h3>
          <p className="text-sm text-gray-500 mb-4">{description}</p>
        </div>
        <button className="text-gray-400 hover:text-gray-600">
          {/* <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg> */}
        </button>
      </div>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data} margin={{ top: 5, right: 30, left: 15, bottom: 15 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis
            dataKey="label"
            tick={{ fontSize: 12 }}
            label={{ value: "Damage Severity Label", position: "insideBottom", offset: -10, style: { fontSize: 12 } }}
          />
          <YAxis
            tick={{ fontSize: 12 }}
            label={{ value: "Count", angle: -90, position: "insideLeft", offset: -10, style: { fontSize: 12 } }}
          />
          <Tooltip />
          <Bar dataKey="count" radius={[4, 4, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

// Label Agreement Distribution Chart
export function LabelAgreementChart({ data }: { data: AgreementData[] }) {
  const getConfusionColor = (confusion: number) => {
    const colorScale = d3.scaleSequential(d3.interpolateOrRd).domain([0, 1]);
    return colorScale(confusion);
  };

  return (
    <div className="bg-white rounded-lg px-8 pt-8 shadow-sm border border-gray-200">
      <div className="flex justify-between">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Label Agreement Plot</h3>
        <div className="flex flex-col justify-center items-start gap-2">
          <div className="text-xs text-gray-500 font-medium">Agreement Legend</div>
          <div className="flex items-center gap-2">
            <div className="text-xs text-gray-500">0.0</div>
            <div className="w-20 h-3 bg-gradient-to-r from-[#FEE1B8] to-[#950001]"></div>
            <div className="text-xs text-gray-500">1.0</div>
          </div>
        </div>
      </div>

      <div className="relative">
        <ResponsiveContainer width="100%" height={400}>
          <ScatterChart margin={{ top: 20, right: 40, bottom: 15, left: 10 }}>
            <CartesianGrid strokeDasharray="3 3" horizontalValues={[1, 2, 3]} verticalValues={[1, 2, 3]} />
            <XAxis
              type="number"
              dataKey="x"
              domain={[0, 3]}
              ticks={[0, 1, 2, 3]}
              label={{ value: "Top DS Label", position: "insideBottom", offset: -0, fontSize: 12 }}
              tick={{ fontSize: 12 }}
            />
            <YAxis
              type="number"
              dataKey="y"
              domain={[0, 3]}
              ticks={[0, 1, 2, 3]}
              label={{ value: "Average User DS Label", angle: -90, offset: 10, position: "insideLeft", fontSize: 12 }}
              tick={{ fontSize: 12 }}
            />
            <Tooltip
              formatter={(value: any, name: any) => {
                if (name === "x") return [Math.round(value), "Top DS Label"];
                if (name === "y") return [value.toFixed(2), "Average DS Label"];
                if (name === "confusion") return [value.toFixed(2), "Confusion Score"];
                return [value, name];
              }}
              labelFormatter={(value: any) => `User DS Label: ${Math.round(value)}`}
              contentStyle={{
                borderRadius: "8px",
                paddingBlock: "6px",
              }}
              itemStyle={{
                color: "#757475",
                fontSize: "11px",
                lineHeight: 0.8,
              }}
            />
            <Scatter data={data} fill="#8884d8">
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getConfusionColor(entry.confusion)} opacity={0.9} />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>

        {/* Description */}
        <p className="text-sm text-gray-500 mt-1 mb-6">
          This chart shows the extent to which users agree on the labels of each category. Each point represents an
          image plotted by the most popular damage severity label and the average of all users&apos; labels for that
          image. The color encodes the agreement, calculated by average pairwise distance, of each data point (image).
        </p>
      </div>
    </div>
  );
}

// Model Agreement Distribution Chart
export function ModelAgreementChart({ data }: { data: AgreementData[] }) {
  const getConfusionColor = (confusion: number) => {
    const colorScale = d3.scaleSequential(d3.interpolateYlOrBr).domain([1, 0]);
    return colorScale(confusion);
  };

  return (
    <div className="bg-white rounded-lg px-8 pt-8 shadow-sm border border-gray-200">
      <div className="flex justify-between">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Model Agreement Plot</h3>
        <div className="flex flex-col justify-center items-start gap-2">
          <div className="text-xs text-gray-500 font-medium">Confusion Legend</div>
          <div className="flex items-center gap-2">
            <div className="text-xs text-gray-500">0.0</div>
            <div className="w-20 h-3 bg-gradient-to-r from-[#FEEAA7] via-[#F68D24] to-[#692404]"></div>
            <div className="text-xs text-gray-500">1.0</div>
          </div>
        </div>
      </div>

      <div className="relative">
        <ResponsiveContainer width={"100%"} height={400}>
          <ScatterChart margin={{ top: 20, right: 50, left: 10, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" horizontalValues={[1, 2, 3]} verticalValues={[1, 2, 3]} />
            <XAxis
              type="number"
              dataKey="x"
              domain={[0, 3]}
              ticks={[0, 1, 2, 3]}
              label={{ value: "User DS Label", position: "insideBottom", offset: -10, fontSize: 12 }}
              tick={{ fontSize: 12 }}
            />
            <YAxis
              type="number"
              dataKey="y"
              domain={[0, 3]}
              label={{ value: "Model DS Label", angle: -90, position: "insideLeft", fontSize: 12 }}
              ticks={[0, 1, 2, 3]}
              tick={{ fontSize: 12 }}
            />
            <Tooltip
              formatter={(value: any, name: any) => {
                if (name === "x") return [Math.round(value), "User DS Label"];
                if (name === "y") return [Math.round(value), "Model DS Label"];
                if (name === "confusion") return [value.toFixed(3), "Confusion Score"];
                return [value, name];
              }}
              labelFormatter={(value: any) => `User DS Label: ${Math.round(value)}`}
              contentStyle={{
                borderRadius: "8px",
                paddingBlock: "6px",
              }}
              itemStyle={{
                color: "#757475",
                fontSize: "11px",
                lineHeight: 0.8,
              }}
            />

            {/* Perfect match line */}
            <ReferenceLine
              segment={[
                { x: 0, y: 0 },
                { x: 3, y: 3 },
              ]}
              stroke="gray"
              strokeWidth={1}
              strokeDasharray="3 3"
            />

            <Scatter data={data} fill="#8884d8">
              {data.map((entry: any, index: any) => (
                <Cell key={`cell-${index}`} fill={getConfusionColor(entry.confusion)} opacity={0.6} />
              ))}
            </Scatter>
            <Scatter name="Confusion" data={data} dataKey="confusion" fill="transparent" stroke="transparent" />
          </ScatterChart>
        </ResponsiveContainer>

        {/* Description */}
        <p className="text-sm text-gray-500 mt-2 mb-6">
          This chart shows your agreement with our AI model&apos;s suggested labels. The diagonal line indicates points
          where the user and model labels match exactly. The color encodes the overall user agreement level of each data
          point (image). Some jitter is added for visualization purposes.
        </p>
      </div>
    </div>
  );
}
