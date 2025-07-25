"use client";

import { useAuth } from "@/app/authcontext/context";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

type Feedback = {
  id: string;
  rating: number;
  text: string;
  date: string;
  email?: string;
};

const FeedbackForm = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(0);
  const [feedbackList, setFeedbackList] = useState<Feedback[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    setIsMounted(true);

    // Load feedback from localStorage on mount
    const saved = localStorage.getItem("feedbacks");
    if (saved) {
      setFeedbackList(JSON.parse(saved));
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (rating === 0) {
      toast.error("Please select a rating before submitting.");
      return;
    }

    const newFeedback: Feedback = {
      id: crypto.randomUUID(),
      rating,
      text: feedback,
      date: new Date().toLocaleString(),
      email: user?.email || "Guest",
    };

    const updatedList = [newFeedback, ...feedbackList];
    setFeedbackList(updatedList);
    localStorage.setItem("feedbacks", JSON.stringify(updatedList));

    toast.success("Thanks for your feedback!");
    setRating(0);
    setFeedback("");
  };

  const handleDelete = (id: string) => {
    const updated = feedbackList.filter((item) => item.id !== id);
    setFeedbackList(updated);
    localStorage.setItem("feedbacks", JSON.stringify(updated));
  };

  if (!isMounted) return null;

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-semibold mb-4 text-center">
        Give Your Feedback
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-4 flex justify-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={`cursor-pointer text-2xl ${
                rating >= star ? "text-yellow-400" : "text-gray-300"
              }`}
              onClick={() => setRating(star)}
              aria-label={`${star} star${star > 1 ? "s" : ""}`}
            >
              ★
            </span>
          ))}
        </div>

        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          className="w-full border border-gray-300 rounded p-3 mb-4"
          rows={4}
          placeholder="Write your opinion here..."
          required
        ></textarea>

        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
        >
          Submit Feedback
        </button>
      </form>

      {/* Feedback List */}
      {feedbackList.length > 0 && (
        <div className="mt-10">
          <h3 className="text-xl font-semibold mb-4">All Feedbacks</h3>
          <ul className="space-y-4">
            {feedbackList.map((fb) => (
              <li
                key={fb.id}
                className="border p-4 rounded-md bg-gray-50 relative"
              >
                <div className="text-yellow-500 mb-1">
                  {"★".repeat(fb.rating)}
                  {"☆".repeat(5 - fb.rating)}
                </div>
                <p className="text-gray-700">{fb.text}</p>
                <p className="text-sm text-gray-500 italic">By: {fb.email}</p>
                <small className="text-gray-400 block mt-1">{fb.date}</small>
                <button
                  onClick={() => handleDelete(fb.id)}
                  className="absolute top-2 right-2 text-red-500 text-sm hover:underline"
                  aria-label="Delete feedback"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FeedbackForm;
