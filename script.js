    function formatRupiah(angka) {
    return new Intl.NumberFormat('id-ID', { style: 'decimal' }).format(angka);
}

function hitungPembayaran() {
    // Harga
    const hargaPahaAyam = 12000;
    const hargaDadaAyam = 12000;
    const hargaSayapAyam = 10000;
    const hargaNasi = 5000;
    const hargaKentang = 5000;
    const hargaPopIce = 2500;
    const hargaGeprek = 16000;

    // Mengambil jumlah dari input
    let jumlahPahaAyam = parseInt(document.getElementById('pahaAyam').value) || 0;
    const jumlahDadaAyam = parseInt(document.getElementById('dadaAyam').value) || 0;
    const jumlahSayapAyam = parseInt(document.getElementById('sayapAyam').value) || 0;
    const jumlahNasi = parseInt(document.getElementById('nasi').value) || 0;
    const jumlahKentang = parseInt(document.getElementById('kentang').value) || 0;
    const jumlahGeprek = parseInt(document.getElementById('ayamgeprek').value) || 0;
    const jumlahPopIce = parseInt(document.getElementById('popice').value) || 0;

    console.log("Jumlah Ayam Geprek:", jumlahGeprek); // Log to check if value is correctly retrieved

    // Menghitung total pembayaran
    const total = Math.round(
        (jumlahPahaAyam * hargaPahaAyam) +
        (jumlahDadaAyam * hargaDadaAyam) +
        (jumlahSayapAyam * hargaSayapAyam) + // Use the Sayap Ayam input
        (jumlahNasi * hargaNasi) +
        (jumlahKentang * hargaKentang) +
        (jumlahPopIce * hargaPopIce) +
        (jumlahGeprek * hargaGeprek)
    );

    // Menghitung diskon
    let discount = 0;
    let discountMessage = ''; // Initialize discount message
    if (total > 100000) {
        discount = total * 0.1; // 10% discount
        discountMessage = 'Karena membeli item lebih dari Rp. 100.000, Anda diberi diskon 10%.';
    }

    const totalAfterDiscount = total - discount;

    // Menampilkan total pembayaran dengan format tanpa desimal
    document.getElementById('totalPembayaran').innerText = formatRupiah(totalAfterDiscount);

    // Menampilkan pesan diskon jika ada
    const discountInfo = document.getElementById('discountInfo');
    discountInfo.innerText = discountMessage;

    const rincianBody = document.getElementById('rincianPembelianBody');
    rincianBody.innerHTML = ''; // Clear previous details

    // Menambahkan rincian pembelian dengan harga
    if (jumlahPahaAyam > 0) tambahRincian('Paha Ayam', jumlahPahaAyam, hargaPahaAyam);
    if (jumlahPopIce > 0) tambahRincian('Pop Ice', jumlahPopIce, hargaPopIce);
    if (jumlahGeprek > 0) tambahRincian('Ayam Geprek', jumlahGeprek, hargaGeprek);
    if (jumlahDadaAyam > 0) tambahRincian('Dada Ayam', jumlahDadaAyam, hargaDadaAyam);
    if (jumlahSayapAyam > 0) tambahRincian('Sayap Ayam', jumlahSayapAyam, hargaSayapAyam); // Include Sayap Ayam
    if (jumlahNasi > 0) tambahRincian('Nasi', jumlahNasi, hargaNasi);
    if (jumlahKentang > 0) tambahRincian('Kentang Goreng', jumlahKentang, hargaKentang);

    // Menampilkan bonus di bagian Bonus
    const bonusBody = document.getElementById('Bonus');
    bonusBody.innerHTML = ''; // Clear previous bonus details
    if (jumlahPahaAyam > 5) {
        bonusBody.innerHTML += `<tr><td>Sayap Ayam</td><td>1</td></tr>`; // Show bonus Sayap Ayam if applicable
    }
    if (jumlahPahaAyam > 5 && jumlahDadaAyam > 5) {
        bonusBody.innerHTML += `<tr><td>Sayap Ayam</td><td>2</td></tr>`; // Show bonus Sayap Ayam if both conditions are met
    }
    if (jumlahPahaAyam > 5 && jumlahDadaAyam > 5 && jumlahNasi > 5) {
      bonusBody.innerHTML += `<tr><td>Pop Ice</td><td>1</td></tr>`;
    }
}

function tambahRincian(item, jumlah, harga) {
    const rincianBody = document.getElementById('rincianPembelianBody');
    const totalHarga = jumlah * harga; // Calculate total price for the item
    rincianBody.innerHTML += `<tr><td>${item}</td><td>${jumlah}</td><td>Rp. ${formatRupiah(totalHarga)}</td></tr>`;
}