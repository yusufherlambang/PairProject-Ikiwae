function formatRupiah (price) {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(price)
}



// let harga = 3000000
// console.log(formatRupiah(harga));
module.exports = formatRupiah