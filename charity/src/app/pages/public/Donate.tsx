import { DollarSign, Package, Home, ShoppingBag, Heart } from "lucide-react";
import { useState } from "react";

export function Donate() {
  const [donationType, setDonationType] = useState<string>("money");
  const [amount, setAmount] = useState<string>("");

  const donationTypes = [
    { value: "money", label: "Money Donation", icon: DollarSign },
    { value: "materials", label: "Construction Materials", icon: Package },
    { value: "house", label: "Sponsor a House", icon: Home },
    { value: "daily", label: "Daily Needs", icon: ShoppingBag },
  ];

  const suggestedAmounts = [50, 100, 250, 500, 1000, 2500];

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-red-600 to-red-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Make a Donation
          </h1>
          <p className="text-xl text-red-100 max-w-2xl mx-auto">
            Your generosity transforms lives. Every contribution helps build
            hope and provide better futures for families in need.
          </p>
        </div>
      </section>

      {/* Donation Form */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-sm p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Choose Your Support Type
            </h2>

            {/* Donation Type Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {donationTypes.map((type) => {
                const Icon = type.icon;
                return (
                  <button
                    key={type.value}
                    onClick={() => setDonationType(type.value)}
                    className={`p-6 rounded-lg border-2 transition-all text-left ${
                      donationType === type.value
                        ? "border-red-600 bg-red-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <Icon
                      className={`w-8 h-8 mb-3 ${
                        donationType === type.value
                          ? "text-red-600"
                          : "text-gray-400"
                      }`}
                    />
                    <div
                      className={`font-semibold ${
                        donationType === type.value
                          ? "text-red-600"
                          : "text-gray-900"
                      }`}
                    >
                      {type.label}
                    </div>
                  </button>
                );
              })}
            </div>

            {donationType === "money" && (
              <>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Select Amount
                </h3>
                <div className="grid grid-cols-3 gap-3 mb-6">
                  {suggestedAmounts.map((suggestedAmount) => (
                    <button
                      key={suggestedAmount}
                      onClick={() => setAmount(suggestedAmount.toString())}
                      className={`py-3 rounded-lg border-2 font-semibold transition-all ${
                        amount === suggestedAmount.toString()
                          ? "border-red-600 bg-red-50 text-red-600"
                          : "border-gray-200 text-gray-700 hover:border-gray-300"
                      }`}
                    >
                      ${suggestedAmount}
                    </button>
                  ))}
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Or Enter Custom Amount
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500">$</span>
                    </div>
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="block w-full pl-7 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
                      placeholder="0.00"
                    />
                  </div>
                </div>
              </>
            )}

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Name
              </label>
              <input
                type="text"
                className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
                placeholder="John Doe"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
                placeholder="john@example.com"
              />
            </div>

            {donationType !== "money" && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description of Donation
                </label>
                <textarea
                  rows={4}
                  className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
                  placeholder="Please describe what you would like to donate..."
                />
              </div>
            )}

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Message (Optional)
              </label>
              <textarea
                rows={3}
                className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
                placeholder="Leave a message of hope..."
              />
            </div>

            <div className="mb-6">
              <label className="flex items-start gap-3">
                <input
                  type="checkbox"
                  className="mt-1 h-4 w-4 text-red-600 focus:ring-red-600 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-600">
                  I would like to remain anonymous
                </span>
              </label>
            </div>

            <button className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors">
              <Heart className="w-5 h-5 fill-white" />
              Complete Donation
            </button>

            <p className="text-sm text-gray-500 text-center mt-4">
              Your donation is secure and will be used to support families in
              need.
            </p>
          </div>

          {/* Impact Section */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="text-3xl font-bold text-red-600 mb-2">$100</div>
              <div className="text-sm text-gray-600">
                Provides basic furniture for a family
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="text-3xl font-bold text-red-600 mb-2">
                $500
              </div>
              <div className="text-sm text-gray-600">
                Covers essential utilities for 3 months
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="text-3xl font-bold text-red-600 mb-2">
                $5,000
              </div>
              <div className="text-sm text-gray-600">
                Helps build a complete home
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
