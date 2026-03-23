const WHATSAPP_NUMBER = "5594992627580";
const PIX_KEY = "b476bb76-75e0-4b0d-85e8-621710f271a2";

const PRODUCTS = [
  {
    id: 1,
    code: "NB001",
    name: "Notebook Lenovo IdeaPad 3",
    category: "informática",
    brand: "Lenovo",
    price: 2899.90,
    oldPrice: 3199.90,
    stock: 8,
    image: "notebook-lenovo-ideapad-3.png",
    description: "Notebook para trabalho, estudos e uso diário com ótimo desempenho.",
    shortDescription: "Notebook para uso diário, estudos e escritório.",
    specs: [
      "Tela de 15,6 polegadas",
      "SSD rápido",
      "Ideal para escritório e estudos"
    ]
  },
  {
    id: 2,
    code: "MON002",
    name: "Monitor 24 Polegadas Full HD",
    category: "informática",
    brand: "LG",
    price: 799.90,
    oldPrice: 899.90,
    stock: 10,
    image: "monitor-24-full-hd.png",
    description: "Monitor Full HD ideal para escritório, loja e uso doméstico.",
    shortDescription: "Imagem nítida e ótimo custo-benefício.",
    specs: [
      "24 polegadas",
      "Resolução Full HD",
      "Conexão HDMI"
    ]
  },
  {
    id: 3,
    code: "LEI003",
    name: "Leitor de Código de Barras",
    category: "automação",
    brand: "C3Tech",
    price: 249.90,
    oldPrice: 279.90,
    stock: 15,
    image: "leitor-codigo-barras.png",
    description: "Leitor rápido e preciso para uso em caixa e balcão.",
    shortDescription: "Leitura rápida para automação comercial.",
    specs: [
      "Leitura 1D",
      "USB Plug and Play",
      "Uso em PDV"
    ]
  },
  {
    id: 4,
    code: "BOB004",
    name: "Bobina Térmica 80x40",
    category: "automação",
    brand: "Genérica",
    price: 9.90,
    oldPrice: 12.90,
    stock: 120,
    image: "bobina-termica-80x40.png",
    description: "Bobina para impressora térmica, ideal para mercados e comércios.",
    shortDescription: "Bobina térmica para cupom e comprovante.",
    specs: [
      "80x40",
      "Térmica",
      "Alta qualidade"
    ]
  },
  {
    id: 5,
    code: "TON005",
    name: "Toner Compatível HP 107A",
    category: "impressão",
    brand: "HP",
    price: 129.90,
    oldPrice: 149.90,
    stock: 18,
    image: "toner-hp-107a.png",
    description: "Toner compatível com ótimo rendimento para impressoras HP.",
    shortDescription: "Impressão econômica e de qualidade.",
    specs: [
      "Compatível HP",
      "Ótimo rendimento",
      "Preto"
    ]
  },
  {
    id: 6,
    code: "MOU006",
    name: "Mouse Gamer RGB",
    category: "gamer",
    brand: "Redragon",
    price: 89.90,
    oldPrice: 109.90,
    stock: 12,
    image: "mouse-gamer-rgb.png",
    description: "Mouse gamer com pegada confortável e iluminação RGB.",
    shortDescription: "Performance e estilo para jogos.",
    specs: [
      "RGB",
      "Alta precisão",
      "Conexão USB"
    ]
  },
  {
    id: 7,
    code: "FON007",
    name: "Headset Gamer com Microfone",
    category: "gamer",
    brand: "Fortrek",
    price: 139.90,
    oldPrice: 169.90,
    stock: 9,
    image: "headset-gamer-microfone.png",
    description: "Headset com bom áudio e microfone para jogos e chamadas.",
    shortDescription: "Áudio confortável para jogar e conversar.",
    specs: [
      "Com microfone",
      "Conector P2/USB",
      "Espuma confortável"
    ]
  },
  {
    id: 8,
    code: "ROT008",
    name: "Roteador Dual Band",
    category: "redes",
    brand: "TP-Link",
    price: 229.90,
    oldPrice: 259.90,
    stock: 11,
    image: "roteador-dual-band.png",
    description: "Roteador para casa ou empresa com sinal estável.",
    shortDescription: "Internet estável para seu ambiente.",
    specs: [
      "Dual Band",
      "Boa cobertura",
      "Fácil configuração"
    ]
  }
];

function getProductById(id) {
  return PRODUCTS.find(product => product.id === Number(id));
}
