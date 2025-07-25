import { useState } from "react";

export default function Home() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const formatRupiah = (angka) => {
    return new Intl.NumberFormat('id-ID').format(angka);
  };

  const searchItems = async () => {
    if (!query.trim()) return;
    setLoading(true);
    const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
    const data = await res.json();
    setResults(data);
    setLoading(false);
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <div style={{ backgroundColor: "#004aad", color: "white", padding: "15px 30px", fontSize: "24px", fontWeight: "bold" }}>
        Reza Jaya Elektronik
      </div>

      {/* Konten di tengah */}
      <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
        <div style={{ textAlign: "center", width: "80%", maxWidth: "600px", backgroundColor: "#f8f9fa", padding: "30px", borderRadius: "10px", boxShadow: "0 4px 10px rgba(0,0,0,0.1)" }}>
          <h1 style={{ marginBottom: "20px", color: "#333" }}>Pencarian Barang</h1>
          <div style={{ marginBottom: "20px" }}>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ketik nama barang..."
              style={{ padding: "10px", width: "70%", border: "1px solid #ccc", borderRadius: "5px", marginRight: "10px" }}
            />
            <button
              onClick={searchItems}
              style={{ padding: "10px 20px", backgroundColor: "#004aad", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}
            >
              Cari
            </button>
          </div>

          {loading && <p>Sedang mencari...</p>}

          {results.length > 0 && (
            <table style={{ margin: "0 auto", borderCollapse: "collapse", width: "100%" }}>
              <thead>
                <tr style={{ backgroundColor: "#004aad", color: "white" }}>
                  <th style={{ padding: "10px", border: "1px solid #ddd" }}>Kode</th>
                  <th style={{ padding: "10px", border: "1px solid #ddd" }}>Nama</th>
                  <th style={{ padding: "10px", border: "1px solid #ddd" }}>Harga</th>
                </tr>
              </thead>
              <tbody>
                {results.map((item, index) => (
                  <tr key={index} style={{ backgroundColor: index % 2 === 0 ? "#ffffff" : "#f1f1f1" }}>
                    <td style={{ padding: "10px", border: "1px solid #ddd" }}>{item["Kode"]}</td>
                    <td style={{ padding: "10px", border: "1px solid #ddd", textAlign: "left" }}>{item["Nama"]}</td>
                    <td style={{ padding: "10px", border: "1px solid #ddd" }}>{formatRupiah(item["Harga"])}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {results.length === 0 && !loading && query.trim() !== "" && (
            <p style={{ color: "#888", marginTop: "20px" }}>Tidak ada barang ditemukan.</p>
          )}
        </div>
      </div>
    </div>
  );
}
