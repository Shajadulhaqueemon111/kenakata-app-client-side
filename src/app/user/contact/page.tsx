"use client";

import Image from "next/image";
import { useState } from "react";
const faqs = [
  {
    question: "How can I apply for an internship?",
    answer:
      "You can apply by sending your updated CV to our email address or by filling out the application form on our website.",
  },
  {
    question: "What is the duration of the internship?",
    answer:
      "Our internship program usually lasts for 3 to 6 months, depending on the department and project needs.",
  },
  {
    question: "Is the internship paid?",
    answer:
      "Some internships are paid and others are not, depending on the role and current availability. Details will be mentioned during the selection process.",
  },
];
const ContactPage = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Banner Section */}
      <div className="max-w-6xl mx-auto rounded-xl overflow-hidden relative h-[250px] sm:h-[500px] lg:max-w-7xl md:h-[500px] ">
        <Image
          src="https://i.ibb.co/N2ZZrqvY/hand-drawn-grocery-store-facebook-cover-23-2151042335.jpg"
          alt="Fruits Banner"
          fill
          className="object-cover"
          priority
          unoptimized
        />
      </div>

      <div className="max-w-4xl mx-auto py-12 px-4 text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          We love to hear from you!
        </h2>
        <p className="text-gray-600 mb-10">
          Whether you have a question, feedback, or just want to say hello —
          feel free to reach out.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white shadow-md rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-2 text-gray-800">Email</h3>
            <p className="text-gray-600">contact@mdemon.com</p>
          </div>

          <div className="bg-white shadow-md rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-2 text-gray-800">Phone</h3>
            <p className="text-gray-600">+8801483748347</p>
          </div>

          <div className="bg-white shadow-md rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-2 text-gray-800">
              Address
            </h3>
            <p className="text-gray-600">123 City Road, Dhaka, Bangladesh</p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-12 px-4">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-8">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border rounded-xl p-4 bg-white shadow-md cursor-pointer"
              onClick={() => toggle(index)}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-800">
                  {faq.question}
                </h3>
                <span className="text-gray-500">
                  {openIndex === index ? "-" : "+"}
                </span>
              </div>
              {openIndex === index && (
                <p className="text-gray-600 mt-2 transition duration-300">
                  {faq.answer}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
