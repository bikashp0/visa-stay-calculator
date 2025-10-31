import React from 'react';

export default function BuyMeCoffeeButton() {
  return (
    <div className="flex justify-center mt-6">
      <a
        href="https://buymeacoffee.com/bikashp0"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-orange-400 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded flex items-center space-x-2 shadow-lg transition-colors"
      >
        <img
          src="https://cdn.buymeacoffee.com/buttons/bmc-new-btn-logo.svg"
          alt="Buy Me a Coffee"
          className="h-6 w-6"
        />
        <span>Buy Me a Coffee</span>
      </a>
    </div>
  );
}
