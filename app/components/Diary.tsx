"use client";

import { useState } from "react";

export default function Diary() {
  const [entries, setEntries] = useState<string[]>([]);
  const [input, setInput] = useState("");

  const addEntry = () => {
    if (!input.trim()) return;
    setEntries([input, ...entries]);
    setInput("");
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">📔 My Diary</h1>

      <div className="flex space-x-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Write something..."
          className="flex-1 border rounded px-3 py-2 text-black"
        />
        <button
          onClick={addEntry}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Save
        </button>
      </div>

      <ul className="space-y-2">
        {entries.map((entry, i) => (
          <li
            key={i}
            className="p-3 border rounded bg-gray-100 text-black"
          >
            {entry}
          </li>
        ))}
      </ul>
    </div>
  );
}
