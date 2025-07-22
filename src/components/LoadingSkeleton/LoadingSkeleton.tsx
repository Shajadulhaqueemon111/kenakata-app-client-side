"use client";
export default function LoadingSkeleton() {
  return (
    <div className="animate-pulse space-y-4 p-4 max-w-md mx-auto">
      <div className="h-6 bg-gray-300 rounded"></div>
      <div className="h-4 bg-gray-300 rounded w-5/6"></div>
      <div className="h-4 bg-gray-300 rounded w-4/6"></div>
      <div className="h-4 bg-gray-300 rounded w-3/6"></div>
    </div>
  );
}
