import { NextRequest, NextResponse } from "next/server";
import { db } from "../../lib/db";
import { gpt } from "../../lib/gpt";
import { HumanMessage } from "@langchain/core/messages";

export async function POST(req: NextRequest) {
  const { question } = await req.json();

  const prompt = `
Database kamu punya tabel:
- kategori(id_kategori, nama_kategori)
- produk(id_produk, nama_produk, deskripsi, harga, gambar, id_kategori)
- users(id, username, password, nama_lengkap, email, no_hp, alamat)
- pesanan(id_pesanan, id_users, tanggal_pesanan, status, total)
- detail_pesanan(id_detail, id_pesanan, id_produk, jumlah, harga)
- keranjang(id_keranjang, id_users, id_produk, jumlah)
- testimoni(id_testimoni, nama, isi, rating)

Jika ada nama kolom yang sama di beberapa tabel (misalnya harga, jumlah), tulis dengan format tabel.kolom, misalnya: produk.harga atau detail_pesanan.harga.

Jika user menyebut nama produk secara tidak lengkap (seperti "barca" atau "madrid"), maka gunakan klausa LIKE, contoh:
WHERE nama_produk LIKE '%barca%'

Jika menghitung total harga, pastikan menyebut tabel kolom secara eksplisit: produk.harga, dll.

Berikan hanya satu baris query SQL tanpa penjelasan untuk pertanyaan berikut:
"${question}"
`;

  try {
    const messages = [new HumanMessage(prompt)];
    const response = await gpt.call(messages);
    const sql = response.content;

    console.log("✅ SQL dari GPT:", sql);
    const [rows] = await db.execute(sql);
    return NextResponse.json({ data: rows });
  } catch (err: any) {
    console.error("❌ Error:", err);
    return NextResponse.json(
      { error: "Gagal", detail: err.message },
      { status: 500 }
    );
  }
}
