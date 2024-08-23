import Link from "next/link";
import React from "react";

const NotFoundPage = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center bg-slate-50 text-gray-900">
      <h1 className="text-8xl font-bold">404</h1>
      <p className="text-4xl font-medium">このページは現在編集中です</p>
      <Link
        href="/properties"
        className="mt-4 text-xl text-blue-600 hover:underline"
      >
        ホームページへ戻る
      </Link>
    </div>
  );
};

export default NotFoundPage;
