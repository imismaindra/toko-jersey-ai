"use client";

import { useState } from "react";

export default function Home() {
  const [question, setQuestion] = useState("");
  const [result, setResult] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const askGPT = async () => {
    setLoading(true);
    setResult([]);
    setError("");

    const res = await fetch("/api/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question }),
    });

    const data = await res.json();
    setLoading(false);

    if (data.error) {
      setError(data.detail || "Terjadi kesalahan saat mengambil data.");
    } else if (data.data.length === 0) {
      setError("Tidak ada data ditemukan untuk pertanyaan ini.");
    } else {
      setResult(data.data);
    }
  };

  return (
    <main className="min-h-screen bg-[#121212] text-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-3xl bg-[#1e1e1e] rounded-xl shadow-lg p-8 border border-gray-700">
        <h1 className="text-2xl font-bold mb-6 text-center text-white">
          💬 Tanya Database Jersey
        </h1>

        <textarea
          className="w-full bg-[#2a2a2a] text-white border border-gray-700 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={4}
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Contoh: Tampilkan semua produk kategori Jersey"
        />

        <button
          onClick={askGPT}
          disabled={loading}
          className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
        >
          {loading ? "Memproses..." : "🎯 Kirim Pertanyaan"}
        </button>

        {/* Error */}
        {error && (
          <p className="mt-4 text-red-400 bg-red-900 bg-opacity-40 border border-red-700 px-4 py-2 rounded-md text-center">
            {error}
          </p>
        )}

        {/* Hasil */}
        {result.length > 0 && (
          <div className="overflow-x-auto mt-6 border border-gray-700 rounded-md">
            <table className="w-full text-sm text-white border-collapse">
              <thead>
                <tr className="bg-[#2f2f2f] text-blue-300">
                  {Object.keys(result[0]).map((key) => (
                    <th
                      key={key}
                      className="p-3 border-b border-gray-700 text-left"
                    >
                      {key}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {result.map((row, i) => (
                  <tr
                    key={i}
                    className={i % 2 === 0 ? "bg-[#1e1e1e]" : "bg-[#2a2a2a]"}
                  >
                    {Object.values(row).map((val, j) => (
                      <td key={j} className="p-3 border-b border-gray-800">
                        {String(val)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}
