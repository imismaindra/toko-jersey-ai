# 🧠 Tanya Database Jersey (Next.js + GPT via OpenRouter)

Aplikasi web sederhana berbasis Next.js yang memanfaatkan GPT (melalui OpenRouter) untuk menjawab pertanyaan natural language tentang data toko jersey langsung dari database MySQL.

---

## 🚀 Fitur

- Input pertanyaan dalam bahasa alami (natural language)
- Model GPT menerjemahkan pertanyaan jadi SQL otomatis
- Query dieksekusi langsung ke database dan hasil ditampilkan
- Desain UI gelap seperti ChatGPT
- Menggunakan OpenRouter (alternatif OpenAI API)

---

## 📦 Teknologi yang Digunakan

- [Next.js 13+ App Router](https://nextjs.org)
- [LangChain + OpenRouter](https://openrouter.ai)
- [MySQL + mysql2](https://www.npmjs.com/package/mysql2)
- [Tailwind CSS](https://tailwindcss.com)

---

## ⚙️ Instalasi

### 1. Clone Proyek & Install Dependensi

```bash
git clone https://github.com/yourusername/tanya-jersey.git
cd tanya-jersey
npm install
```

### 2. Setup Database

- Buat database MySQL: `tokojersey`
- Import struktur dan data dari `Hafiz_database.sql`

### 3. Konfigurasi Environment

Buat file `.env.local`:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=tokojersey

OPENROUTER_API_KEY=sk-or-xxxxxx
```

Dapatkan API key dari [https://openrouter.ai/keys](https://openrouter.ai/keys)

### 4. Jalankan Aplikasi

```bash
npm run dev
```

Buka di browser: [http://localhost:3000](http://localhost:3000)

---

## 🧪 Contoh Pertanyaan

- "Tampilkan semua produk dengan harga di atas 100"
- "Apa saja kategori produk yang tersedia?"
- "Jika saya beli produk barca 2 dan madrid 1, berapa total harganya?"

> Pastikan produk sesuai nama di database, atau ubah prompt agar menggunakan LIKE

---

## 📁 Struktur Folder

```
app/
├─ page.tsx            # UI utama
├─ api/ask/route.ts    # API GPT → SQL → DB

lib/
├─ db.ts               # Koneksi database
├─ gpt.ts              # Koneksi OpenRouter GPT

.env.local             # Environment config
```

---

## 💡 Pengembangan Lanjutan (Opsional)

- Validasi query GPT
- Log pertanyaan & hasil query
- Export ke CSV/Excel
- Filter produk berdasarkan kategori
- Autocomplete atau dropdown produk

---

## 📝 Lisensi

MIT © 2025 – Your Name
