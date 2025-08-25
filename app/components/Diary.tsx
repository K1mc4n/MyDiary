"use client";
import { useState } from "react";

function DiaryForm({ onAddEntry }: { onAddEntry: (entry: string) => void }) {
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    onAddEntry(text);
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 flex gap-2">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write your diary..."
        className="flex-1 border rounded-lg px-3 py-2"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-lg"
      >
        Add
      </button>
    </form>
  );
}

function DiaryList({ entries }: { entries: string[] }) {
  if (!entries.length) return <p className="text-gray-500">No diary yet...</p>;
  return (
    <ul className="space-y-2">
      {entries.map((entry, i) => (
        <li key={i} className="p-3 bg-gray-100 rounded-lg shadow">
          {entry}
        </li>
      ))}
    </ul>
  );
}

export default function Diary() {
  const [entries, setEntries] = useState<string[]>([]);

  const addEntry = (entry: string) => {
    setEntries((prev) => [entry, ...prev]);
  };

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">My Diary</h1>
      <DiaryForm onAddEntry={addEntry} />
      <DiaryList entries={entries} />
    </div>
  );
}
