document.addEventListener("alpine:init", () => {
  // Produk yang ditampilkan
  Alpine.data("products", () => ({
    items: [
      { id: 1, name: "Robusta Brazil", img: "1.jpeg", price: 20000 },
      { id: 2, name: "Arabica Blend", img: "2.jpg", price: 25000 },
      { id: 3, name: "Primo Passo", img: "3.jpg", price: 30000 },
      { id: 4, name: "Aceh Gayo", img: "4.jpg", price: 35000 },
      { id: 5, name: "Sumatra Mandheling", img: "5.jpg", price: 40000 },
    ],
    rupiah(number) {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
      }).format(number);
    },
  }));

  // Store untuk keranjang belanja
  Alpine.store("cart", {
    items: [],

    // Menambahkan item ke keranjang (selalu buat baris baru)
    add(newItem) {
      this.items.push({
        ...newItem,
        quantity: 1,
        total: newItem.price,
        key: Date.now() + Math.random(), // biar unik meskipun item sama
      });
    },

    // Tambah jumlah 1 item
    increase(item) {
      item.quantity++;
      item.total = item.price * item.quantity;
    },

    // Kurangi jumlah 1 item
    decrease(item) {
      if (item.quantity > 1) {
        item.quantity--;
        item.total = item.price * item.quantity;
      } else {
        this.items = this.items.filter((i) => i !== item);
      }
    },

    // Format harga
    rupiah(number) {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
      }).format(number);
    },

    // Jumlah total item
    get quantity() {
      return this.items.length;
    },
  });
});
