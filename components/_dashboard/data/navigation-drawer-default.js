export const items = [
  {
    icon: "mdi-gauge",
    title: "Dashboard",
    to: "/"
  },
  {
    icon: "mdi-office-building",
    title: "Perusahaan",
    children: [
      {
        title: "Data Perusahaan",
        to: "/company"
      },
      {
        title: "Aset & Peralatan",
        to: "/asset"
      },
      {
        title: "Role & Permission",
        to: "/role"
      },
      {
        title: "Pengguna",
        to: "/user"
      }
    ]
  },
  {
    icon: "mdi-database",
    title: "Data Induk",
    children: [
      {
        title: "Produk",
        to: "/product"
      }
    ]
  },
  {
    icon: "mdi-help-circle-outline",
    title: "Bantuan",
    children: [
      {
        title: "Petunjuk",
        to: "/help/howto"
      },
      {
        title: "Tentang",
        to: "/help/about"
      }
    ]
  }
];
