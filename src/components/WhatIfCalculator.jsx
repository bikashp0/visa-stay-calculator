import React, { useState } from 'react';
import { Calculator, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { calculateFutureStay } from '../utils/visaCalculations';

export default function WhatIfCalculator({ travelHistory }) {
  const [plannedDate, setPlannedDate] = useState('');
  const [result, setResult] = useState(null);

  const handleCalculate = () => {
    if (!plannedDate) return;
    
    const futureResult = calculateFutureStay(travelHistory, plannedDate);
    setResult(futureResult);
  };

  const handleReset = () => {
    setPlannedDate('');
    setResult(null);
  };

  return (
    <div className="card mt-6">
      <div className="flex items-center space-x-2 mb-6">
        <Calculator className="text-blue-600" size={24} />
        <h2 className="text-xl font-bold text-gray-900">"What If" Scenario Planner</h2>
      </div>

      <p className="text-sm text-gray-600 mb-4">
        Plan your next trip by entering a future arrival date to see how long you can stay.
      </p>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Planned Arrival Date
          </label>
          <input
            type="date"
            value={plannedDate}
            onChange={(e) => setPlannedDate(e.target.value)}
            min={new Date().toISOString().split('T')[0]}
            className="input-field"
          />
        </div>
        
        <div className="flex items-end gap-2">
          <button
            onClick={handleCalculate}
            disabled={!plannedDate}
            className="btn-primary"
          >
            Calculate
          </button>
          {result && (
            <button
              onClick={handleReset}
              className="btn-secondary"
            >
              Reset
            </button>
          )}
        </div>
      </div>

      {result && (
        <div className={`rounded-lg p-4 border-l-4 ${
          result.isViable 
            ? 'bg-green-50 border-green-500' 
            : 'bg-red-50 border-red-500'
        }`}>
          {result.isViable ? (
            <div>
              <p className="font-bold text-green-900 mb-3">✅ Travel is Possible</p>
              <div className="space-y-2 text-sm text-green-800">
                <p>
                  <strong>Arrival Date:</strong> {format(result.plannedArrival, 'dd MMM yyyy')}
                </p>
                <p>
                  <strong>Days Already Used at Arrival:</strong> {result.daysUsedAtArrival} days 
                  ({result.percentageUsed.toFixed(1)}%)
                </p>
                <p>
                  <strong>Maximum Stay Duration:</strong>{' '}
                  <span className="font-bold text-green-900">{result.daysAvailable} days</span>
                </p>
                <p>
                  <strong>Must Exit By:</strong>{' '}
                  <span className="font-bold text-green-900">{format(result.mustExitBy, 'dd MMM yyyy')}</span>
                </p>
              </div>
              <p className="text-xs text-green-700 mt-3">
                💡 Remember to factor in your visa expiry date as well!
              </p>
            </div>
          ) : (
            <div>
              <p className="font-bold text-red-900 mb-2">❌ Cannot Travel</p>
              <p className="text-sm text-red-800">
                You will have already exceeded the 12-month limit by this date. 
                You need to wait until your 18-month window has reset.
              </p>
              <p className="text-sm text-red-800 mt-2">
                <strong>Days used at arrival:</strong> {result.daysUsedAtArrival} days 
                (exceeds 365-day limit)
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}