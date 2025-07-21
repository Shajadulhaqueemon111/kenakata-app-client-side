"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const FaqItem = ({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-gray-300 rounded-xl shadow-sm overflow-hidden transition-all duration-300 bg-white">
      <button
        className="w-full flex justify-between items-center px-6 py-4 text-left font-semibold text-gray-800 hover:bg-gray-100"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{question}</span>
        {isOpen ? <ChevronUp /> : <ChevronDown />}
      </button>
      {isOpen && (
        <div className="px-6 pb-4 text-gray-700 text-sm bg-gray-50">
          {answer}
        </div>
      )}
    </div>
  );
};

const BeautifulCollapsible = () => {
  return (
    <div className="max-w-xl mx-auto p-6 space-y-4">
      <h2 className="text-2xl font-bold text-center mb-4 text-teal-700">
        Frequently Asked Questions
      </h2>
      <FaqItem
        question="How much do deliveries cost?"
        answer="Dhaka - Order below: 49৳, above: 39৳. Chattogram - Order below: 29৳, above: 19৳. Jessore - Order below: 29৳, above: 19৳."
      />
      <FaqItem
        question="What is your return policy?"
        answer="You can return products within 7 days of delivery. The product must be unused and in original condition."
      />
      <FaqItem
        question="How long does delivery take?"
        answer="Delivery usually takes 2-5 business days depending on your location."
      />
    </div>
  );
};

export default BeautifulCollapsible;
