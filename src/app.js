document.addEventListener("alpine:init", () => {
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

  Alpine.store("cart", {
    items: [],
    total: 0,
    quantity: 0,

    add(newItem) {
      const item = this.items.find((i) => i.id === newItem.id);
      if (item) {
        item.quantity++;
        item.total = item.price * item.quantity;
      } else {
        this.items.push({
          ...newItem,
          quantity: 1,
          total: newItem.price,
        });
      }

      this.quantity++;
      this.total += newItem.price;
    },

    increase(item) {
      item.quantity++;
      item.total = item.price * item.quantity;
      this.quantity++;
      this.total += item.price;
    },

    decrease(item) {
      if (item.quantity > 1) {
        item.quantity--;
        item.total = item.price * item.quantity;
        this.quantity--;
        this.total -= item.price;
      } else {
        this.items = this.items.filter((i) => i.id !== item.id);
        this.quantity--;
        this.total -= item.price;
      }
    },

    rupiah(number) {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
      }).format(number);
    },
  });
});
