"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

type DiaryEntry = {
  id: string;
  title: string;
  content: string;
  date: string;
};

export default function DiaryDetailPage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params as { id: string };

  const [entry, setEntry] = useState<DiaryEntry | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // Ambil catatan berdasarkan ID
  useEffect(() => {
    const saved = localStorage.getItem("diaryEntries");
    if (saved) {
      const entries: DiaryEntry[] = JSON.parse(saved);
      const found = entries.find((e) => e.id === id);
      if (found) {
        setEntry(found);
        setTitle(found.title);
        setContent(found.content);
      }
    }
  }, [id]);

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!entry) return;

    const saved = localStorage.getItem("diaryEntries");
    if (saved) {
      let entries: DiaryEntry[] = JSON.parse(saved);
      entries = entries.map((e) =>
        e.id === id ? { ...e, title, content } : e
      );
      localStorage.setItem("diaryEntries", JSON.stringify(entries));
      router.push("/diary");
    }
  };

  const handleDelete = () => {
    const saved = localStorage.getItem("diaryEntries");
    if (saved) {
      let entries: DiaryEntry[] = JSON.parse(saved);
      entries = entries.filter((e) => e.id !== id);
      localStorage.setItem("diaryEntries", JSON.stringify(entries));
      router.push("/diary");
    }
  };

  if (!entry) {
    return (
      <div className="p-6 max-w-2xl mx-auto">
        <p className="text-gray-500">Catatan tidak ditemukan.</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">📖 Edit Catatan</h1>
      <p className="text-sm text-gray-600 mb-4">Dibuat: {entry.date}</p>

      <form onSubmit={handleUpdate} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Judul</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full p-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Isi Catatan</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={6}
            required
            className="w-full p-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700"
          >
            Simpan Perubahan
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="bg-red-600 text-white px-4 py-2 rounded-xl hover:bg-red-700"
          >
            Hapus
          </button>
        </div>
      </form>
    </div>
  );
}
