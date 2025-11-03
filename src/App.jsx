import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import TravelEntryForm from './components/TravelEntryForm';
import TravelHistoryList from './components/TravelHistoryList';
import ResultsSummary from './components/ResultsSummary';
import VisualTimeline from './components/VisualTimeline';
import WhatIfCalculator from './components/WhatIfCalculator';
import { useTravelHistory } from './hooks/useTravelHistory';
import { calculateVisaStay } from './utils/visaCalculations';
import AdSense from './utils/Adsense';
import BuyMeCoffeeButton from './utils/BuyMeCoffeeButton';

function App() {
  const { travelHistory, addEntry, deleteEntry, clearAll } = useTravelHistory();
  const [results, setResults] = useState(null);
  const [showInfo, setShowInfo] = useState(true);

  useEffect(() => {
    if (travelHistory.length > 0) {
      const calculatedResults = calculateVisaStay(travelHistory);
      setResults(calculatedResults);
    } else {
      setResults(null);
    }
  }, [travelHistory]);

  return (
    <div className="min-h-screen pb-12">
      <Header />

      <div className="container mx-auto px-4">
        {/* Info Banner */}
        {showInfo && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 rounded-lg">
            <div className="flex items-start">
              <div className="flex-1">
                <p className="text-sm text-yellow-900 mb-2">
                  <strong>How to use this calculator:</strong>
                </p>
                <ol className="text-sm text-yellow-800 list-decimal list-inside space-y-1">
                  <li>Add all your past trips to Australia (arrival and exit dates)</li>
                  <li>If currently in Australia, check "Currently in Australia" box</li>
                  <li>The calculator will show you how many days you can still stay</li>
                  <li>Use the "What If" planner to plan future trips</li>
                </ol>
              </div>
              <button
                onClick={() => setShowInfo(false)}
                className="text-yellow-600 hover:text-yellow-700 font-bold ml-3"
              >
                ✕
              </button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Input Form */}
          <div className="lg:col-span-1 space-y-6">
            <TravelEntryForm onAddEntry={addEntry} />
            <TravelHistoryList
              travelHistory={travelHistory}
              onDelete={deleteEntry}
              onClear={clearAll}
            />
          </div>

          {/* Right Column - Results */}
          <div className="lg:col-span-2 space-y-6">
            {travelHistory.length === 0 ? (
              <div className="card text-center py-12">
                <div className="text-gray-400 mb-4">
                  <svg
                    className="mx-auto h-24 w-24"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No Travel History Yet
                </h3>
                <p className="text-gray-600 max-w-md mx-auto">
                  Add your travel entries on the left to calculate your remaining visa stay duration 
                  under Condition 8558.
                </p>
              </div>
            ) : (
              <>
                <ResultsSummary results={results} travelHistory={travelHistory} />
                <VisualTimeline results={results} />
                <WhatIfCalculator travelHistory={travelHistory} />

                {/* Second AdSense below results */}
                <div className="container mx-auto mt-6">
                  <div className="hidden sm:block">
                    <AdSense
                      client="ca-pub-1519742476496426"
                      slot="1308011147"
                      style={{ display: 'block', width: '100%', minHeight: '90px' }}
                    />
                  </div>
                  <div className="block sm:hidden">
                    <AdSense
                      client="ca-pub-1519742476496426"
                      slot="1308011147"
                      style={{ display: 'block', width: '100%', minHeight: '60px' }}
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
            <h3 className="font-bold text-gray-900 mb-2">About This Calculator</h3>
            <p className="text-sm text-gray-600 mb-4">
              This tool helps Subclass 600 visa holders calculate their remaining stay under Condition 8558, 
              which limits stays to 12 months within any 18-month period.
            </p>
            {/* <div className="mt-4 mb-8"> 
                <BuyMeCoffeeButton />
            </div> */}
            
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <a
                href="https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/visitor-600"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Official Visa Information
              </a>
              <span className="text-gray-400">•</span>
              <a
                href="https://www.mara.gov.au/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Find a Migration Agent
              </a>
            </div>
            <p className="text-xs text-gray-500 mt-4">
              Made with ❤️ for travelers | Your data is stored locally in your browser
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
