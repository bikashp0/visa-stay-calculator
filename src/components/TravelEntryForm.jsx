import React, { useState } from 'react';
import { PlusCircle, Calendar } from 'lucide-react';
import { validateTravelEntry } from '../utils/visaCalculations';

export default function TravelEntryForm({ onAddEntry }) {
  const [arrivalDate, setArrivalDate] = useState('');
  const [exitDate, setExitDate] = useState('');
  const [isCurrentStay, setIsCurrentStay] = useState(false);
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);

    const entry = {
      arrivalDate,
      exitDate: isCurrentStay ? null : exitDate,
      isCurrentStay
    };

    const validation = validateTravelEntry(entry);
    
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    onAddEntry(entry);
    
    // Reset form
    setArrivalDate('');
    setExitDate('');
    setIsCurrentStay(false);
  };

  return (
    <div className="card">
      <div className="flex items-center space-x-2 mb-4">
        <Calendar className="text-blue-600" size={24} />
        <h2 className="text-xl font-bold text-gray-900">Add Travel Entry</h2>
      </div>
      
      {errors.length > 0 && (
        <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded-lg mb-4">
          <ul className="list-disc list-inside">
            {errors.map((error, index) => (
              <li key={index} className="text-sm">{error}</li>
            ))}
          </ul>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Arrival Date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            value={arrivalDate}
            onChange={(e) => setArrivalDate(e.target.value)}
            max={new Date().toISOString().split('T')[0]}
            className="input-field"
            required
          />
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="currentStay"
            checked={isCurrentStay}
            onChange={(e) => {
              setIsCurrentStay(e.target.checked);
              if (e.target.checked) setExitDate('');
            }}
            className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
          />
          <label htmlFor="currentStay" className="text-sm font-medium text-gray-700">
            Currently in Australia (no exit date)
          </label>
        </div>

        {!isCurrentStay && (
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Exit Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              value={exitDate}
              onChange={(e) => setExitDate(e.target.value)}
              min={arrivalDate}
              max={new Date().toISOString().split('T')[0]}
              className="input-field"
              required={!isCurrentStay}
            />
          </div>
        )}

        <button type="submit" className="btn-primary w-full flex items-center justify-center space-x-2">
          <PlusCircle size={20} />
          <span>Add Entry</span>
        </button>
      </form>
    </div>
  );
}