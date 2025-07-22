import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <h2 className="text-4xl font-bold text-gray-800 mb-6">
        404 - Page Not Found
      </h2>
      <p className="text-gray-600 mb-8">
        Sorry, the page you are looking for does not exist.
      </p>

      <Link href="/user">
        <p className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
          Return Home
        </p>
      </Link>
    </div>
  );
}
