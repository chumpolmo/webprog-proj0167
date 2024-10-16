import { Link } from "@remix-run/react";

export default function Posts() {
    return (
      <main>
        <h1>Posts</h1>
        <div className="mx-auto mt-16 max-w-7xl text-center">
        <Link
          to="/"
          className="text-xl text-blue-600 underline"
        >
          Back to home
        </Link>
      </div>
      </main>
    );
}