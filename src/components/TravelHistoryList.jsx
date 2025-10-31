import React from 'react';
import { Trash2, Clock, List } from 'lucide-react';
import { format, differenceInDays, parseISO } from 'date-fns';

export default function TravelHistoryList({ travelHistory, onDelete, onClear }) {
  if (travelHistory.length === 0) {
    return (
      <div className="card">
        <div className="flex items-center space-x-2 mb-4">
          <List className="text-blue-600" size={24} />
          <h2 className="text-xl font-bold text-gray-900">Travel History</h2>
        </div>
        <div className="text-center py-8 text-gray-500">
          <Clock size={48} className="mx-auto mb-4 text-gray-300" />
          <p>No travel history yet. Add your first entry above.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <List className="text-blue-600" size={24} />
          <h2 className="text-xl font-bold text-gray-900">Travel History</h2>
        </div>
        <button
          onClick={onClear}
          className="text-sm text-red-600 hover:text-red-700 font-medium"
        >
          Clear All
        </button>
      </div>

      <div className="space-y-3">
        {travelHistory.map((entry, index) => {
          const arrival = parseISO(entry.arrivalDate);
          const exit = entry.exitDate ? parseISO(entry.exitDate) : new Date();
          const days = differenceInDays(exit, arrival) + 1;

          return (
            <div
              key={entry.id}
              className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded">
                      Entry {index + 1}
                    </span>
                    {entry.isCurrentStay && (
                      <span className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded">
                        Current Stay
                      </span>
                    )}
                  </div>
                  
                  <div className="text-sm text-gray-600 space-y-1">
                    <div>
                      <span className="font-semibold">Arrival:</span>{' '}
                      {format(arrival, 'dd MMM yyyy')}
                    </div>
                    <div>
                      <span className="font-semibold">Exit:</span>{' '}
                      {entry.exitDate ? format(exit, 'dd MMM yyyy') : 'Still in Australia'}
                    </div>
                    <div>
                      <span className="font-semibold">Duration:</span>{' '}
                      <span className="text-blue-600 font-bold">{days} days</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => onDelete(entry.id)}
                  className="text-red-600 hover:text-red-700 p-2 rounded hover:bg-red-50 transition-colors"
                  title="Delete entry"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}