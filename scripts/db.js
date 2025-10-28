/* Static restaurant data (can later be replaced by an API) */
const RESTAURANT = {
  id: "paradise-noodles",
  name: "Paradise Noodles",
  deliveryFee: 3.5,
  heroImage: "assets/imgs/restaurant-hero.jpg",
  logo: "assets/Logo/Bestell App- Logo.svg",

  categories: [
    {
      id: "vorspeisen",
      title: "Vorspeisen",
      dishes: [
        { id: "vs1", name: "Gemüse Frühlingsrollen", desc: "mit Sweet-Chili Dip", price: 4.9 },
        { id: "vs2", name: "Gyoza", desc: "Hähnchen oder Veggie, Sesam", price: 6.5 },
        { id: "vs3", name: "Edamame", desc: "Meersalz, Zitrone", price: 5.2 }
      ]
    },
    {
      id: "salate",
      title: "Salate",
      dishes: [
        { id: "sa1", name: "Wakame Salat", desc: "Sesam, Gurke", price: 5.9 },
        { id: "sa2", name: "Mango-Avocado", desc: "Limette, Koriander", price: 7.9 },
        { id: "sa3", name: "Papaya Crunch", desc: "Erdnuss, Chili", price: 7.5 }
      ]
    },
    {
      id: "hauptgerichte",
      title: "Hauptgerichte",
      dishes: [
        { id: "hg1", name: "Pad Thai", desc: "Reisnudeln, Erdnuss, Limette", price: 11.9 },
        { id: "hg2", name: "Red Curry", desc: "Kokos, Gemüse, Jasminreis", price: 12.5 },
        { id: "hg3", name: "Sesam Ramen", desc: "Ei, Frühlingslauch", price: 12.9 }
      ]
    },
    {
      id: "beilagen",
      title: "Beilagen",
      dishes: [
        { id: "b1", name: "Jasminreis", desc: "duftend & locker", price: 3.0 },
        { id: "b2", name: "Knoblauchbrot", desc: "hausgemacht", price: 3.5 },
        { id: "b3", name: "Kimchi", desc: "fermentierter Kohl", price: 3.9 }
      ]
    },
    {
      id: "getraenke",
      title: "Getränke",
      dishes: [
        { id: "g1", name: "Mango Lassi", desc: "Joghurt, Kardamom", price: 4.5 },
        { id: "g2", name: "Ingwer-Zitrone Eistee", desc: "hausgemacht", price: 3.9 },
        { id: "g3", name: "Wasser still 0,5l", desc: "gekühlt", price: 2.2 }
      ]
    }
  ]
};
