
import React from "react";
import { useState } from "react";

function Landing() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-semibold text-blue-600">FinTrack</div>
          <a href="/register">
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Get Started
          </button>
        </a>
        </div>
      </nav>
    
      <main>
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-4 py-20 flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Take Control of Your Finances
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Track expenses, set budgets, and reach your financial goals with
              our easy-to-use financial tracking tools.
            </p>
            <a href="/dashboard">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg hover:bg-blue-700 transition-colors">
              Start Tracking Now
            </button>
            </a>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6">
              <div className="space-y-4">
                <div className="h-16 bg-blue-50 rounded-lg"></div>
                <div className="h-16 bg-green-50 rounded-lg"></div>
                <div className="h-16 bg-purple-50 rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="bg-white py-20">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-16 text-gray-900">
              Key Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <div className="w-8 h-8 bg-blue-600 rounded"></div>
                </div>
                <h3 className="text-xl font-semibold mb-4">Expense Tracking</h3>
                <p className="text-gray-600">
                  Monitor your spending habits with detailed categorization and
                  insights
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <div className="w-8 h-8 bg-green-600 rounded"></div>
                </div>
                <h3 className="text-xl font-semibold mb-4">Budget Planning</h3>
                <p className="text-gray-600">
                  Set and manage budgets to help you stay on track with your
                  financial goals
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <div className="w-8 h-8 bg-purple-600 rounded"></div>
                </div>
                <h3 className="text-xl font-semibold mb-4">
                  Financial Reports
                </h3>
                <p className="text-gray-600">
                  Get clear visual reports and analytics to understand your
                  financial health
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-blue-50 py-20">
          <div className="max-w-3xl mx-auto text-center px-4">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">
              Ready to Start Your Financial Journey?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Join thousands of users who are already managing their finances
              better.
            </p>
            <a href="/register">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg hover:bg-blue-700 transition-colors">
              Get Started
            </button>
            </a>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center text-gray-600">
            © 2025 FinTrack. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Landing;