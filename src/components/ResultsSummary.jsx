import React from 'react';
import { BarChart3, AlertCircle, CheckCircle, FileDown } from 'lucide-react';
import { format } from 'date-fns';
import { exportToPDF } from '../utils/pdfExport';

export default function ResultsSummary({ results, travelHistory }) {
  if (!results) return null;

  const {
    windowStart,
    windowEnd,
    totalDaysUsed,
    daysRemaining,
    maxStayEndDate,
    canReturnDate,
    percentageUsed,
    isOverLimit
  } = results;

  const getProgressColor = () => {
    if (percentageUsed > 90) return 'bg-red-600';
    if (percentageUsed > 70) return 'bg-yellow-500';
    return 'bg-green-600';
  };

  const handleExportPDF = () => {
    exportToPDF(travelHistory, results);
  };

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <BarChart3 className="text-blue-600" size={24} />
          <h2 className="text-2xl font-bold text-gray-900">Your Visa Stay Summary</h2>
        </div>
        <button
          onClick={handleExportPDF}
          className="btn-secondary flex items-center space-x-2"
        >
          <FileDown size={18} />
          <span>Export PDF</span>
        </button>
      </div>

      {/* Window Period */}
      <div className="bg-blue-50 rounded-lg p-4 mb-6">
        <p className="text-sm text-gray-600 mb-1 font-semibold">18-Month Rolling Window:</p>
        <p className="text-lg font-bold text-blue-900">
          {format(windowStart, 'dd MMM yyyy')} → {format(windowEnd, 'dd MMM yyyy')}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6">
          <p className="text-sm text-blue-600 font-semibold mb-2">Days Used</p>
          <p className={`text-4xl font-bold ${isOverLimit ? 'text-red-600' : 'text-blue-900'}`}>
            {totalDaysUsed}
          </p>
          <p className="text-sm text-blue-700 mt-1">out of 365 days</p>
        </div>
        
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6">
          <p className="text-sm text-green-600 font-semibold mb-2">Days Remaining</p>
          <p className={`text-4xl font-bold ${isOverLimit ? 'text-red-600' : 'text-green-900'}`}>
            {daysRemaining}
          </p>
          <p className="text-sm text-green-700 mt-1">
            {isOverLimit ? 'Over limit' : 'Available to stay'}
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <p className="text-sm font-semibold text-gray-700">Usage Progress</p>
          <p className="text-sm font-bold text-gray-900">{percentageUsed.toFixed(1)}%</p>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-8 overflow-hidden">
          <div
            className={`h-8 ${getProgressColor()} flex items-center justify-center text-white text-sm font-bold transition-all duration-500`}
            style={{ width: `${Math.min(percentageUsed, 100)}%` }}
          >
            {percentageUsed > 10 && `${percentageUsed.toFixed(0)}%`}
          </div>
        </div>
      </div>

      {/* Status Message */}
      {isOverLimit ? (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
          <div className="flex items-start space-x-3">
            <AlertCircle className="text-red-600 flex-shrink-0 mt-1" size={24} />
            <div>
              <p className="font-bold text-red-900 mb-2">⚠️ Warning: 12-Month Limit Exceeded!</p>
              <p className="text-sm text-red-800 mb-2">
                You have exceeded the maximum 12 months (365 days) allowed in an 18-month period under Condition 8558.
              </p>
              <p className="text-sm text-red-800">
                <strong>Cannot re-enter until:</strong> {format(canReturnDate, 'dd MMM yyyy')}
              </p>
              <p className="text-xs text-red-700 mt-2">
                Consult a registered migration agent immediately for advice on your situation.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
          <div className="flex items-start space-x-3">
            <CheckCircle className="text-green-600 flex-shrink-0 mt-1" size={24} />
            <div className="flex-1">
              <p className="font-bold text-green-900 mb-2">✅ You're Within the Limit</p>
              <div className="space-y-2 text-sm text-green-800">
                <p>
                  <strong>Can stay for approximately:</strong>{' '}
                  <span className="font-bold text-green-900">{daysRemaining} more days</span>
                </p>
                <p>
                  <strong>Must exit by:</strong>{' '}
                  <span className="font-bold text-green-900">{format(maxStayEndDate, 'dd MMM yyyy')}</span>
                </p>
                <p>
                  <strong>Window resets on:</strong>{' '}
                  <span className="font-bold text-green-900">{format(canReturnDate, 'dd MMM yyyy')}</span>
                </p>
              </div>
              <p className="text-xs text-green-700 mt-3">
                💡 Tip: Plan your exit before reaching the limit to avoid visa complications.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Disclaimer */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <p className="text-xs text-gray-600 leading-relaxed">
          <strong>⚠️ DISCLAIMER:</strong> This calculator is for informational purposes only and does not constitute 
          immigration advice. Visa conditions may vary based on individual circumstances. Always verify with the 
          Department of Home Affairs or consult a registered migration agent before making travel decisions.
        </p>
      </div>
    </div>
  );
}