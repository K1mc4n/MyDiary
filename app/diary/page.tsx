"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type DiaryEntry = {
  id: string;
  title: string;
  content: string;
  date: string;
};

export default function DiaryPage() {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    // Ambil data dari localStorage
    const saved = localStorage.getItem("diaryEntries");
    if (saved) {
      setEntries(JSON.parse(saved));
    }
  }, []);

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">📔 My Diary</h1>

      {/* Tombol tambah catatan */}
      <Link
        href="/diary/new"
        className="inline-block mb-6 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700"
      >
        ➕ Tambah Catatan
      </Link>

      {/* List catatan */}
      {entries.length === 0 ? (
        <p className="text-gray-500">Belum ada catatan.</p>
      ) : (
        <div className="space-y-4">
          {entries.map((entry) => (
            <Link
              key={entry.id}
              href={`/diary/${entry.id}`}
              className="block p-4 border rounded-xl shadow hover:bg-gray-50"
            >
              <h2 className="text-lg font-semibold">{entry.title}</h2>
              <p className="text-sm text-gray-600">{entry.date}</p>
              <p className="mt-1 text-gray-700 line-clamp-2">{entry.content}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
} 
