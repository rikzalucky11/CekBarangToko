import path from "path";
import * as XLSX from "xlsx";

export default function handler(req, res) {
  const { q } = req.query; // query pencarian
  if (!q) return res.status(400).json({ error: "Query kosong" });

  // Baca file Excel
  const filePath = path.join(process.cwd(), "data", "barang.xlsx");
  const workbook = XLSX.readFile(filePath);
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const data = XLSX.utils.sheet_to_json(sheet);

  // Hilangkan semua spasi pada query
  const queryNoSpace = q.toLowerCase().replace(/\s+/g, "");

  // Filter data: hilangkan spasi pada nama barang saat pencarian
  const hasil = data.filter((item) => {
    const namaBarang = String(item["Nama"] || "").toLowerCase().replace(/\s+/g, "");
    return namaBarang.includes(queryNoSpace);
  });

  res.status(200).json(hasil);
}
