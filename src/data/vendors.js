const vendors = [
  {
    id: 1,
    name: "Cafe Mahallah Zubair",
    location: "Mahallah Zubair, International Islamic University Malaysia",
    openHours: "8:00 AM - 11:00 PM",
    isOpen: true,

    menu: [
      {
        id: 1,
        name: "Nasi Bangla",
        description: "Rice served with chicken and kuah kari",
        price: 5.0,
        category: "Rice",
        available: true,
      },
      {
        id: 2,
        name: "Mix Chicken",
        description:
          "Combination of fried chicken and potato wedges served with sauce",
        price: 6.5,
        category: "Chicken",
        available: true,
      },
      {
        id: 3,
        name: "Chicken Wrap",
        description: "Fried chicken wrapped in a tortilla with vegetables",
        price: 6.0,
        category: "Wraps",
        available: false,
      },
    ],
  },
  {
    id: 2,
    name: "Kafe Mahallah Aminah",
    location: "Mahallah Aminah",
    openHours: "7:00 am - 10:00 pm",
    isOpen: true,

    menu: [
      {
        id: 1,
        name: "Mee Goreng",
        description: "Fried noodles with vegetables and egg",
        price: 5.0,
        category: "Noodles",
        available: true,
      },
    ],
  },
];

export default vendors;
