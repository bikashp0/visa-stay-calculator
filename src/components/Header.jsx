import React from 'react';
import { Plane } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-white shadow-lg mb-8">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Plane className="text-white" size={32} />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Aussie Visa Stay Calculator
              </h1>
              <p className="text-gray-600 text-sm mt-1">
                Calculate your remaining stay under Condition 8558
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-4 bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
          <p className="text-sm text-blue-900">
            <strong>What is Condition 8558?</strong> Visitor visa holders (Subclass 600) with this condition 
            must not stay in Australia for more than <strong>12 months in any 18-month period</strong>.
          </p>
        </div>
      </div>
    </header>
  );
}