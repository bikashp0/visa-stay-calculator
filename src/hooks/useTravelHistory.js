import { useState, useEffect } from 'react';

const STORAGE_KEY = 'visa_travel_history';

export function useTravelHistory() {
  const [travelHistory, setTravelHistory] = useState([]);
  
  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setTravelHistory(parsed);
      }
    } catch (error) {
      console.error('Error loading travel history:', error);
    }
  }, []);
  
  // Save to localStorage whenever history changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(travelHistory));
    } catch (error) {
      console.error('Error saving travel history:', error);
    }
  }, [travelHistory]);
  
  const addEntry = (entry) => {
    setTravelHistory(prev => [...prev, { ...entry, id: Date.now() }]);
  };
  
  const updateEntry = (id, updatedEntry) => {
    setTravelHistory(prev => 
      prev.map(entry => entry.id === id ? { ...entry, ...updatedEntry } : entry)
    );
  };
  
  const deleteEntry = (id) => {
    setTravelHistory(prev => prev.filter(entry => entry.id !== id));
  };
  
  const clearAll = () => {
    if (window.confirm('Are you sure you want to clear all travel history?')) {
      setTravelHistory([]);
      localStorage.removeItem(STORAGE_KEY);
    }
  };
  
  return {
    travelHistory,
    addEntry,
    updateEntry,
    deleteEntry,
    clearAll
  };
}