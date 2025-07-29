import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <div className="text-center py-20  font-semibold text-lg sm:text-xl">
      <h1 className="text-2xl font-bold mb-4">🚫 Access Denied</h1>
      <p className="text-lg">You are not authorized to view this page.</p>
      <p className="mt-2">
        Please avoid unauthorized access attempts. If you are an authorized
        user, kindly log in using your registered email and password.
      </p>
      <div className="text-center mt-4">
        <Link href="/">
          <button className="text-xl font-bold bg-red-600 text-white rounded-2xl py-2 px-4">
            Home Page
          </button>
        </Link>
      </div>
    </div>
  );
}
