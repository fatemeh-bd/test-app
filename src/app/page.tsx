"use client";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex items-center text-xl text-sky-400 justify-center h-[100vh]">
      <Link href={"/chat"} className="bg-sky-100 w-52 text-center p-2 rounded-xl">Go Chat</Link>
    </div>
  );
}
