const PRODUCTS = [
  {
    code: "3899",
    name: "Mouse Bright USB 0106 Preto",
    ref: "BRIGHT",
    price: 15.00,
    stock: 4,
    category: "Mouses",
    isNew: true,
    sold: 0,
    description: "Mouse USB para escritório e uso diário.",
    specs: {
      "Tipo de mouse": "Convencional",
      "Conexão": "Com fio",
      "Tipo de sensor": "Óptico",
      "Resolução": "1000 DPI",
      "Cor": "Preto"
    },
    images: [
      "mouse-bright-1.png",
      "mouse-bright-2.png",
      "mouse-bright-3.png",
      "mouse-bright-4.png"
    ]
  },
  {
    code: "4963",
    name: "Teclado STD USB Fortrek SKL106 PT",
    ref: "FORTREK",
    price: 50.00,
    stock: 1,
    category: "Teclados",
    isNew: true,
    sold: 0,
    description: "Teclado USB Fortrek para digitação e operação diária.",
    specs: {
      "Tipo": "Teclado USB",
      "Padrão": "ABNT2",
      "Conexão": "Com fio",
      "Cor": "Preto",
      "Marca": "Fortrek"
    },
    images: [
      "teclado-fortrek-1.png",
      "teclado-fortrek-2.png",
      "teclado-fortrek-3.png",
      "teclado-fortrek-4.png",
      "teclado-fortrek-5.png"
    ]
  },
  {
    code: "5105",
    name: "Mouse Movitec OMFC-01 USB 1000DPI",
    ref: "MOVITEC",
    price: 18.00,
    stock: 1,
    category: "Mouses",
    isNew: true,
    sold: 0,
    description: "Mouse USB com 1000 DPI para rotina comercial e escritório.",
    specs: {
      "Tipo de mouse": "Convencional",
      "Conexão": "Com fio",
      "Tipo de sensor": "Óptico",
      "Resolução": "1000 DPI",
      "Marca": "Movitec"
    },
    images: [
      "mouse-movitec-1.png",
      "mouse-movitec-2.png",
      "mouse-movitec-3.png"
    ]
  },
  {
    code: "5269",
    name: "Mouse Kross USB KE-M108 Preto",
    ref: "KROSS",
    price: 16.00,
    stock: 31,
    category: "Mouses",
    isNew: true,
    sold: 0,
    description: "Mouse USB Kross para uso comum e tarefas diárias.",
    specs: {
      "Tipo de mouse": "Convencional",
      "Conexão": "Com fio",
      "Cor": "Preto",
      "Marca": "Kross"
    },
    images: [
      "mouse-kross-1.png",
      "mouse-kross-2.png",
      "mouse-kross-3.png"
    ]
  },
  {
    code: "5276",
    name: "Mouse Maxprint USB Universitário PTO",
    ref: "MAXPRINT",
    price: 16.00,
    stock: 2,
    category: "Mouses",
    isNew: true,
    sold: 0,
    description: "Mouse USB Maxprint para escritório e uso diário.",
    specs: {
      "Tipo de mouse": "Convencional",
      "Conexão": "Com fio",
      "Cor": "Preto",
      "Marca": "Maxprint"
    },
    images: [
      "mouse-maxprint-1.png",
      "mouse-maxprint-2.png",
      "mouse-maxprint-3.png"
    ]
  },
  {
    code: "5803",
    name: "Combo Kross Tec/Mouse C/Fio KE-KM400V1",
    ref: "KM400",
    price: 72.11,
    stock: 3,
    category: "Combos",
    isNew: true,
    sold: 0,
    description: "Combo teclado e mouse com fio para setup e escritório.",
    specs: {
      "Tipo": "Combo teclado + mouse",
      "Conexão": "Com fio",
      "Cor": "Preto",
      "Marca": "Kross"
    },
    images: []
  },
  {
    code: "5890",
    name: "Tecl USB Mult KB-M40BK Preto C3Tech",
    ref: "M40",
    price: 42.00,
    stock: 7,
    category: "Teclados",
    isNew: true,
    sold: 0,
    description: "Teclado multimídia C3Tech para escritório e operação diária.",
    specs: {
      "Tipo": "Teclado multimídia",
      "Conexão": "Com fio",
      "Padrão": "ABNT2",
      "Cor": "Preto",
      "Marca": "C3Tech"
    },
    images: [
      "teclado-m40-1.png"
    ]
  },
  {
    code: "5892",
    name: "Mouse USB MS-35BK Preto C3Tech",
    ref: "35BK",
    price: 25.00,
    stock: 4,
    category: "Mouses",
    isNew: true,
    sold: 0,
    description: "Mouse C3Tech com fio para uso diário e escritório.",
    specs: {
      "Tipo de mouse": "Convencional",
      "Conexão": "Com fio",
      "Cor": "Preto",
      "Marca": "C3Tech"
    },
    images: []
  },
  {
    code: "6078",
    name: "Impressora Térmica Tanca TLP-300",
    ref: "TLP-300",
    price: 1400.00,
    stock: 1,
    category: "Impressoras",
    isNew: true,
    sold: 0,
    description: "Impressora térmica para automação comercial.",
    specs: {
      "Tipo": "Impressora térmica",
      "Marca": "Tanca",
      "Modelo": "TLP-300"
    },
    images: []
  },
  {
    code: "6083",
    name: "Impressora Térmica de Etiquetas Elgin L42PRO Full",
    ref: "L42PRO",
    price: 2600.00,
    stock: 2,
    category: "Impressoras",
    isNew: true,
    sold: 0,
    description: "Impressora de etiquetas para automação e identificação.",
    specs: {
      "Tipo": "Impressora de etiquetas",
      "Marca": "Elgin",
      "Modelo": "L42PRO"
    },
    images: []
  },
  {
    code: "6197",
    name: "Kit Tecl+Mouse S/Fio KW211 Preto Lecoo",
    ref: "KW211",
    price: 219.01,
    stock: 2,
    category: "Combos",
    isNew: true,
    sold: 0,
    description: "Kit sem fio teclado e mouse para escritório e uso diário.",
    specs: {
      "Tipo": "Kit teclado + mouse",
      "Conexão": "Sem fio",
      "Marca": "Lecoo"
    },
    images: []
  },
  {
    code: "6199",
    name: "Tecl USB Mult KB-M100BK Preto C3T",
    ref: "KBM100",
    price: 85.60,
    stock: 2,
    category: "Teclados",
    isNew: true,
    sold: 0,
    description: "Teclado USB multimídia para operação e produtividade.",
    specs: {
      "Tipo": "Teclado multimídia",
      "Conexão": "Com fio",
      "Marca": "C3Tech"
    },
    images: []
  },
  {
    code: "6200",
    name: "Tecl USB Mult KB-M10BK Preto C3T",
    ref: "KBM10",
    price: 35.00,
    stock: 12,
    category: "Teclados",
    isNew: true,
    sold: 0,
    description: "Teclado USB para uso diário e escritório.",
    specs: {
      "Tipo": "Teclado USB",
      "Conexão": "Com fio",
      "Marca": "C3Tech"
    },
    images: []
  },
  {
    code: "6213",
    name: "Teclado KMEX Compacto KBD428 USB Preto",
    ref: "KBD428",
    price: 48.56,
    stock: 3,
    category: "Teclados",
    isNew: true,
    sold: 0,
    description: "Teclado compacto KMEX para uso diário.",
    specs: {
      "Tipo": "Teclado compacto",
      "Conexão": "Com fio",
      "Marca": "KMEX"
    },
    images: []
  },
  {
    code: "6215",
    name: "Teclado Genius KB100XP USB Preto ABNT2",
    ref: "GENIUS KB100X",
    price: 89.82,
    stock: 1,
    category: "Teclados",
    isNew: true,
    sold: 0,
    description: "Teclado Genius USB para produtividade e rotina comercial.",
    specs: {
      "Tipo": "Teclado USB",
      "Conexão": "Com fio",
      "Marca": "Genius"
    },
    images: []
  },
  {
    code: "6244",
    name: "Mouse Sem Fio Vinik Feather VF120 1200DPI Preto",
    ref: "VINIK",
    price: 39.72,
    stock: 2,
    category: "Mouses",
    isNew: true,
    sold: 0,
    description: "Mouse sem fio Vinik para escritório e mobilidade.",
    specs: {
      "Tipo de mouse": "Convencional",
      "Conexão": "Sem fio",
      "Resolução": "1200 DPI",
      "Marca": "Vinik"
    },
    images: []
  },
  {
    code: "6361",
    name: "Imp. Epson Não Fiscal TM-T20X-II SER/USB",
    ref: "T20X",
    price: 1350.00,
    stock: 2,
    category: "Impressoras",
    isNew: true,
    sold: 0,
    description: "Impressora Epson não fiscal para automação comercial.",
    specs: {
      "Tipo": "Impressora não fiscal",
      "Marca": "Epson",
      "Modelo": "TM-T20X-II"
    },
    images: []
  },
  {
    code: "6505",
    name: "Mouse USB MS-31BK S/SN Preto C3T",
    ref: "31BK",
    price: 35.00,
    stock: 58,
    category: "Mouses",
    isNew: true,
    sold: 0,
    description: "Mouse C3Tech com fio para rotina diária e operação.",
    specs: {
      "Tipo de mouse": "Convencional",
      "Conexão": "Com fio",
      "Marca": "C3Tech"
    },
    images: []
  },
  {
    code: "6506",
    name: "Mouse S/Fio WS212 Preto Lecoo",
    ref: "WS212",
    price: 42.00,
    stock: 2,
    category: "Mouses",
    isNew: true,
    sold: 0,
    description: "Mouse sem fio Lecoo para escritório e mobilidade.",
    specs: {
      "Tipo de mouse": "Convencional",
      "Conexão": "Sem fio",
      "Marca": "Lecoo"
    },
    images: []
  },
  {
    code: "6507",
    name: "Kit Tecl+Mouse USB Gaming GK1100 PTO HP",
    ref: "GK1100",
    price: 182.54,
    stock: 1,
    category: "Combos",
    isNew: true,
    sold: 0,
    description: "Kit gamer HP com teclado e mouse USB.",
    specs: {
      "Tipo": "Kit gamer",
      "Conexão": "Com fio",
      "Marca": "HP"
    },
    images: []
  },
  {
    code: "6510",
    name: "Kit Tecl+Mouse S/Fio K-W20BK C3T",
    ref: "K-W20BK",
    price: 130.00,
    stock: 3,
    category: "Combos",
    isNew: true,
    sold: 0,
    description: "Kit sem fio C3Tech para produtividade e praticidade.",
    specs: {
      "Tipo": "Kit teclado + mouse",
      "Conexão": "Sem fio",
      "Marca": "C3Tech"
    },
    images: []
  },
  {
    code: "6513",
    name: "Kit Tecl+Mouse USB Gaming GK-20V2BK C3T",
    ref: "GK20V",
    price: 120.00,
    stock: 4,
    category: "Combos",
    isNew: true,
    sold: 0,
    description: "Kit gamer USB C3Tech para setup e uso diário.",
    specs: {
      "Tipo": "Kit gamer",
      "Conexão": "Com fio",
      "Marca": "C3Tech"
    },
    images: []
  }
];

function getProductByCode(code) {
  return PRODUCTS.find(p => p.code === code);
}

function formatBRL(value) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function cartGet() {
  return JSON.parse(localStorage.getItem("dominio_cart") || "[]");
}

function cartSet(items) {
  localStorage.setItem("dominio_cart", JSON.stringify(items));
}

function addToCart(code, qty = 1) {
  const product = getProductByCode(code);
  if (!product) return;
  const cart = cartGet();
  const existing = cart.find(i => i.code === code);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ code, qty });
  }
  cartSet(cart);
}

function cartCount() {
  return cartGet().reduce((acc, item) => acc + item.qty, 0);
}

function openCartWhatsApp() {
  const cart = cartGet();
  if (!cart.length) {
    alert("Seu carrinho está vazio.");
    return;
  }

  let msg = "Olá! Quero comprar estes itens:%0A%0A";
  cart.forEach((item, index) => {
    const p = getProductByCode(item.code);
    if (p) {
      msg += `${index + 1}. ${p.name}%0A`;
      msg += `Código: ${p.code}%0A`;
      msg += `Quantidade: ${item.qty}%0A`;
      msg += `Preço unitário: ${formatBRL(p.price)}%0A%0A`;
    }
  });

  window.open(`https://wa.me/5594992627580?text=${msg}`, "_blank");
}
