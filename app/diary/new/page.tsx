"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewDiaryPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [mood, setMood] = useState("😊");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Ambil catatan lama
    const saved = localStorage.getItem("diaryEntries");
    const entries = saved ? JSON.parse(saved) : [];

    // Buat catatan baru
    const newEntry = {
      id: Date.now().toString(),
      title,
      content,
      mood,
      date: new Date().toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }),
    };

    // Simpan kembali
    const updated = [newEntry, ...entries];
    localStorage.setItem("diaryEntries", JSON.stringify(updated));

    // Kembali ke daftar catatan
    router.push("/diary");
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">✍️ Tambah Catatan</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
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

        <div>
          <label className="block mb-1 font-medium">Mood</label>
          <select
            value={mood}
            onChange={(e) => setMood(e.target.value)}
            className="w-full p-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="😊">😊 Senang</option>
            <option value="😐">😐 Biasa</option>
            <option value="😔">😔 Sedih</option>
            <option value="😡">😡 Marah</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700"
        >
          Simpan
        </button>
      </form>
    </div>
  );
}
