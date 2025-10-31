import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp } from 'lucide-react';

export default function VisualTimeline({ results }) {
  if (!results || results.breakdown.length === 0) return null;

  const chartData = results.breakdown
    .filter(entry => entry.inWindow)
    .map((entry, index) => ({
      name: `Entry ${index + 1}`,
      days: entry.daysInWindow,
      totalDays: entry.totalDays
    }));

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
          <p className="font-semibold text-gray-900">{payload[0].payload.name}</p>
          <p className="text-sm text-blue-600">
            Days in window: <strong>{payload[0].value}</strong>
          </p>
          <p className="text-sm text-gray-600">
            Total days: <strong>{payload[0].payload.totalDays}</strong>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="card mt-6">
      <div className="flex items-center space-x-2 mb-6">
        <TrendingUp className="text-blue-600" size={24} />
        <h2 className="text-xl font-bold text-gray-900">Stay Duration Breakdown</h2>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis label={{ value: 'Days', angle: -90, position: 'insideLeft' }} />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar dataKey="days" fill="#3b82f6" name="Days in 18-month window" />
        </BarChart>
      </ResponsiveContainer>

      <div className="mt-4 p-4 bg-blue-50 rounded-lg">
        <p className="text-sm text-blue-900">
          This chart shows how many days from each travel entry count toward your 18-month rolling window. 
          Only stays within the window are shown.
        </p>
      </div>
    </div>
  );
}