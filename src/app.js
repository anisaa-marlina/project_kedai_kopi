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

    // Format ke rupiah
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
    total: 0,

    // Menambahkan item ke keranjang
    add(newItem) {
      const cartItem = this.items.find((item) => item.id === newItem.id);

      if (!cartItem) {
        this.items.push({
          ...newItem,
          quantity: 1,
          total: newItem.price,
        });
      } else {
        cartItem.quantity++;
        cartItem.total = cartItem.price * cartItem.quantity;
      }

      this.total += newItem.price;
    },

    // Menambah jumlah 1 item
    increase(item) {
      item.quantity++;
      item.total = item.price * item.quantity;
      this.total += item.price;
    },

    // Mengurangi jumlah 1 item
    decrease(item) {
      if (item.quantity > 1) {
        item.quantity--;
        item.total = item.price * item.quantity;
        this.total -= item.price;
      } else {
        this.items = this.items.filter((i) => i.id !== item.id);
        this.total -= item.price;
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

    // Jumlah total item dari semua quantity
    get quantity() {
      return this.items.reduce((sum, item) => sum + item.quantity, 0);
    },
  });
});
