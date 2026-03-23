const WHATSAPP_NUMBER = "5594992627580";
const PIX_KEY = "b476bb76-75e0-4b0d-85e8-621710f271a2";

const PRODUCTS = [

  // ===== MOUSE =====
  {
    id: 1,
    code: "MOU001",
    name: "Mouse C3Tech 31BK",
    category: "informática",
    brand: "C3Tech",
    price: 49.90,
    stock: 15,
    image: "mouse-c3tech-31bk-1.jpeg",
    images: [
      "mouse-c3tech-31bk-1.jpeg",
      "mouse-c3tech-31bk-2.jpeg",
      "mouse-c3tech-31bk-3.jpeg",
      "mouse-c3tech-31bk-4.jpeg"
    ],
    description: "Mouse com excelente precisão e conforto para uso diário.",
    shortDescription: "Mouse confortável e preciso.",
    specs: ["USB", "Plug and Play", "Alta precisão"]
  },

  {
    id: 2,
    code: "MOU002",
    name: "Mouse C3Tech 35BK",
    category: "informática",
    brand: "C3Tech",
    price: 59.90,
    stock: 15,
    image: "mouse-c3tech-35bk-1.jpg",
    images: [
      "mouse-c3tech-35bk-1.jpg",
      "mouse-c3tech-35bk-2.jpg",
      "mouse-c3tech-35bk-3.jpg"
    ],
    description: "Mouse resistente com ótimo desempenho.",
    shortDescription: "Mouse custo-benefício.",
    specs: ["USB", "Ergonômico"]
  },

  {
    id: 3,
    code: "MOU003",
    name: "Mouse Kross",
    category: "informática",
    brand: "Kross",
    price: 39.90,
    stock: 20,
    image: "mouse-kross-1.png",
    images: [
      "mouse-kross-1.png",
      "mouse-kross-2.png",
      "mouse-kross-3.png"
    ],
    description: "Mouse simples, funcional e resistente.",
    shortDescription: "Mouse básico.",
    specs: ["USB"]
  },

  {
    id: 4,
    code: "MOU004",
    name: "Mouse Maxprint",
    category: "informática",
    brand: "Maxprint",
    price: 35.90,
    stock: 20,
    image: "mouse-maxprint-1.png",
    images: [
      "mouse-maxprint-1.png",
      "mouse-maxprint-2.png",
      "mouse-maxprint-3.png"
    ],
    description: "Mouse econômico para uso diário.",
    shortDescription: "Mouse barato e funcional.",
    specs: ["USB"]
  },

  {
    id: 5,
    code: "MOU005",
    name: "Mouse Movitec",
    category: "informática",
    brand: "Movitec",
    price: 29.90,
    stock: 20,
    image: "mouse-movitec-1.png",
    images: [
      "mouse-movitec-1.png",
      "mouse-movitec-2.png",
      "mouse-movitec-3.png"
    ],
    description: "Mouse simples para uso básico.",
    shortDescription: "Mouse econômico.",
    specs: ["USB"]
  },

  // ===== KITS =====
  {
    id: 6,
    code: "KIT001",
    name: "Kit Gamer C3Tech",
    category: "gamer",
    brand: "C3Tech",
    price: 149.90,
    stock: 10,
    image: "kit-c3tech-gamer-1.jpeg",
    images: [
      "kit-c3tech-gamer-1.jpeg",
      "kit-c3tech-gamer-2.jpeg",
      "kit-c3tech-gamer-3.jpeg",
      "kit-c3tech-gamer-4.jpeg"
    ],
    description: "Kit gamer completo com iluminação e desempenho.",
    shortDescription: "Kit gamer completo.",
    specs: ["RGB", "Teclado + Mouse"]
  },

  {
    id: 7,
    code: "KIT002",
    name: "Kit C3Tech Sem Fio",
    category: "informática",
    brand: "C3Tech",
    price: 129.90,
    stock: 12,
    image: "kit-c3tech-sem-fio-1.jpeg",
    images: [
      "kit-c3tech-sem-fio-1.jpeg",
      "kit-c3tech-sem-fio-2.jpeg",
      "kit-c3tech-sem-fio-3.jpeg",
      "kit-c3tech-sem-fio-4.jpeg"
    ],
    description: "Kit teclado e mouse sem fio prático.",
    shortDescription: "Kit sem fio.",
    specs: ["Wireless"]
  },

  {
    id: 8,
    code: "KIT003",
    name: "Kit HP GK1100",
    category: "informática",
    brand: "HP",
    price: 139.90,
    stock: 10,
    image: "kit-hp-gk1100-1.jpeg",
    images: [
      "kit-hp-gk1100-1.jpeg",
      "kit-hp-gk1100-2.jpeg",
      "kit-hp-gk1100-3.jpeg"
    ],
    description: "Kit HP confiável e durável.",
    shortDescription: "Kit HP.",
    specs: ["USB"]
  },

  // ===== IMPRESSORAS =====
  {
    id: 9,
    code: "IMP001",
    name: "Impressora Elgin",
    category: "automação",
    brand: "Elgin",
    price: 899.90,
    stock: 5,
    image: "impressora-elgin-1.jpeg",
    images: [
      "impressora-elgin-1.jpeg",
      "impressora-elgin-2.jpeg",
      "impressora-elgin-3.jpeg",
      "impressora-elgin-4.jpeg"
    ],
    description: "Impressora térmica ideal para PDV.",
    shortDescription: "Impressora térmica.",
    specs: ["USB", "Térmica"]
  },

  {
    id: 10,
    code: "IMP002",
    name: "Impressora Epson T20X",
    category: "automação",
    brand: "Epson",
    price: 1099.90,
    stock: 5,
    image: "impressora-epson-t20x-1.jpg",
    images: [
      "impressora-epson-t20x-1.jpg",
      "impressora-epson-t20x-2.jpg",
      "impressora-epson-t20x-3.jpg",
      "impressora-epson-t20x-4.jpg"
    ],
    description: "Impressora Epson de alta performance.",
    shortDescription: "Epson profissional.",
    specs: ["USB", "Ethernet"]
  },

  {
    id: 11,
    code: "IMP003",
    name: "Impressora Tanca",
    category: "automação",
    brand: "Tanca",
    price: 799.90,
    stock: 5,
    image: "impressora-tanca-1.webp",
    images: [
      "impressora-tanca-1.webp",
      "impressora-tanca-2.jpeg"
    ],
    description: "Impressora econômica para comércio.",
    shortDescription: "Custo-benefício.",
    specs: ["USB"]
  }

];

function getProductById(id) {
  return PRODUCTS.find(p => p.id === Number(id));
}
