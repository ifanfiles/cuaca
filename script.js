async function loadForecast(adm4) {
    const url = `https://ibnux.github.io/BMKG-importer/cuaca/${adm4}.json`;
    const res = await fetch(url);
    const data = await res.json();

    // tampilkan JSON mentah di <pre>
    document.getElementById("rawData").textContent = JSON.stringify(data, null, 2);

    if (!data.cuaca || data.cuaca.length === 0) {
        document.getElementById("forecastTable").innerHTML = "<p>Tidak ada data prakiraan.</p>";
        return;
    }

    // ambil semua key dari object pertama di array cuaca
    const keys = Object.keys(data.cuaca[0]);

    // buat header tabel
    let html = "<table border='1' cellspacing='0' cellpadding='5'><thead><tr>";
    keys.forEach(k => html += `<th>${k}</th>`);
    html += "</tr></thead><tbody>";

    // isi data
    data.cuaca.forEach(item => {
        html += "<tr>";
        keys.forEach(k => html += `<td>${item[k]}</td>`);
        html += "</tr>";
    });

    html += "</tbody></table>";
    document.getElementById("forecastTable").innerHTML = html;
}

// event handler tombol
document.getElementById("btnLoad").addEventListener("click", () => {
    const adm4 = document.getElementById("wilayah").value;
    if (adm4) loadForecast(adm4);
});
