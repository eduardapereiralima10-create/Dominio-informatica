const STORE = {
  whatsapp: "5594992627580",
  pixKey: "SUA-CHAVE-PIX-AQUI",
  pixName: "Domínio Informática",
  cardRates: {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 16.09,
    9: 16.69,
    10: 17.39,
    11: 18.39,
    12: 18.79
  }
};

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
    badge: "Novo",
    description: "Mouse USB Bright 0106 preto para uso diário, escritório, caixa e rotinas comuns de informática. Produto com pegada confortável, conexão simples e boa usabilidade para atividades do dia a dia.",
    specs: {
      "Tipo de mouse": "Convencional",
      "Conexão": "Com fio",
      "Tipo de sensor": "Óptico",
      "Cor": "Preto",
      "Marca": "Bright"
    },
    images: [
      "mouse-brilhante-1.png",
      "mouse-brilhante-2.png",
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
    badge: "Novo",
    description: "Teclado USB Fortrek SKL106 para digitação, escritório e operação diária. Ideal para uso em balcão, recepção, caixa e ambientes de trabalho que precisam de praticidade.",
    specs: {
      "Tipo": "Teclado USB",
      "Conexão": "Com fio",
      "Cor": "Preto",
      "Marca": "Fortrek",
      "Uso": "Escritório e operação"
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
    badge: "Novo",
    description: "Mouse Movitec OMFC-01 USB com 1000 DPI, indicado para uso diário, trabalho e estudos. Modelo simples, funcional e prático para quem busca custo-benefício.",
    specs: {
      "Tipo de mouse": "Convencional",
      "Conexão": "Com fio",
      "Resolução": "1000 DPI",
      "Marca": "Movitec",
      "Cor": "Preto"
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
    badge: "Mais procurado",
    description: "Mouse Kross USB KE-M108 preto para escritório, trabalho e uso diário. Produto com visual discreto e boa praticidade para diversas rotinas.",
    specs: {
      "Tipo de mouse": "Convencional",
      "Conexão": "Com fio",
      "Marca": "Kross",
      "Cor": "Preto",
      "Uso": "Escritório e dia a dia"
    },
    images: [
      "mouse-kross-1.png",
      "mouse-kross-2.png",
      "mouse-kross-3.png"
    ]
  },
  {
    code: "5276",
    name: "Mouse Maxprint USB Universitário Preto",
    ref: "MAXPRINT",
    price: 16.00,
    stock: 2,
    category: "Mouses",
    isNew: true,
    sold: 0,
    badge: "Oferta",
    description: "Mouse Maxprint USB universitário preto para uso comum em escritório, home office e atividades básicas de informática.",
    specs: {
      "Tipo de mouse": "Convencional",
      "Conexão": "Com fio",
      "Marca": "Maxprint",
      "Cor": "Preto",
      "Uso": "Diário"
    },
    images: [
      "mouse-maxprint-1.png",
      "mouse-maxprint-2.png",
      "mouse-maxprint-3.png"
    ]
  },
  {
    code: "5803",
    name: "Combo Kross Teclado e Mouse KE-KM400V1",
    ref: "KM400",
    price: 72.11,
    stock: 3,
    category: "Combos",
    isNew: true,
    sold: 0,
    badge: "Combo",
    description: "Combo Kross com teclado e mouse com fio, indicado para escritório, atendimento e uso residencial. Solução prática para montar ou renovar seu setup.",
    specs: {
      "Tipo": "Combo teclado + mouse",
      "Conexão": "Com fio",
      "Marca": "Kross",
      "Cor": "Preto",
      "Uso": "Escritório e casa"
    },
    images: [
      "combo-kross-1.png",
      "combo-kross-2.png"
    ]
  },
  {
    code: "5890",
    name: "Teclado USB Multimídia KB-M40BK Preto C3Tech",
    ref: "M40",
    price: 42.00,
    stock: 7,
    category: "Teclados",
    isNew: true,
    sold: 0,
    badge: "Multimídia",
    description: "Teclado multimídia C3Tech KB-M40BK para escritório, estudo e tarefas diárias. Modelo confortável para digitação e boa organização da mesa.",
    specs: {
      "Tipo": "Teclado multimídia",
      "Conexão": "Com fio",
      "Marca": "C3Tech",
      "Cor": "Preto",
      "Padrão": "ABNT"
    },
    images: [
      "teclado-m40-1.png",
      "teclado-m40-2.png",
      "teclado-m40-3.png"
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
    badge: "C3Tech",
    description: "Mouse USB C3Tech MS-35BK preto para rotina de trabalho, atendimento e uso diário com praticidade.",
    specs: {
      "Tipo de mouse": "Convencional",
      "Conexão": "Com fio",
      "Marca": "C3Tech",
      "Cor": "Preto",
      "Uso": "Diário"
    },
    images: [
      "mouse-c3tech-35bk-1.jpg",
      "mouse-c3tech-35bk-2.jpg",
      "mouse-c3tech-35bk-3.jpg"
    ]
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
    badge: "Automação",
    description: "Impressora térmica Tanca TLP-300 para automação comercial, balcão, caixa e operações que exigem agilidade e praticidade na impressão.",
    specs: {
      "Tipo": "Impressora térmica",
      "Marca": "Tanca",
      "Modelo": "TLP-300",
      "Uso": "Automação comercial",
      "Conexão": "Consultar"
    },
    images: [
      "impressora-tanca-1.webp",
      "--tanca-2.jpeg"
    ]
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
    badge: "Etiquetas",
    description: "Impressora térmica de etiquetas Elgin L42PRO Full para identificação, automação, códigos e organização de produtos.",
    specs: {
      "Tipo": "Impressora de etiquetas",
      "Marca": "Elgin",
      "Modelo": "L42PRO",
      "Uso": "Etiquetas e automação",
      "Conexão": "Consultar"
    },
    images: [
      "impressora-elgin-1.jpeg",
      "-elgin-2.jpeg",
      "-elgin-3.jpeg",
      "-elgin-4.jpeg"
    ]
  },
  {
    code: "6197",
    name: "Kit Teclado + Mouse Sem Fio KW211 Preto Lecoo",
    ref: "KW211",
    price: 219.01,
    stock: 2,
    category: "Combos",
    isNew: true,
    sold: 0,
    badge: "Sem fio",
    description: "Kit teclado e mouse sem fio Lecoo KW211, ideal para praticidade, organização e conforto em escritório ou casa.",
    specs: {
      "Tipo": "Kit teclado + mouse",
      "Conexão": "Sem fio",
      "Marca": "Lecoo",
      "Cor": "Preto",
      "Uso": "Escritório e casa"
    },
    images: [
      "kit-lecoo-1.jpeg",
      "kit-lecoo-2.jpeg",
      "kit-lecoo-3.jpeg",
      "kit-lecoo-4.jpeg"
    ]
  },
  {
    code: "6199",
    name: "Teclado USB Multimídia KB-M100BK Preto C3T",
    ref: "KBM100",
    price: 85.60,
    stock: 2,
    category: "Teclados",
    isNew: true,
    sold: 0,
    badge: "Multimídia",
    description: "Teclado multimídia KB-M100BK para escritório, recepção e produtividade diária.",
    specs: {
      "Tipo": "Teclado multimídia",
      "Conexão": "Com fio",
      "Marca": "C3Tech",
      "Cor": "Preto",
      "Uso": "Produtividade"
    },
    images: [
      "teclado-kbm100-1.jpg",
      "teclado-kbm100-2.jpg",
      "teclado-kbm100-3.jpg"
    ]
  },
  {
    code: "6200",
    name: "Teclado USB Multimídia KB-M10BK Preto C3T",
    ref: "KBM10",
    price: 35.00,
    stock: 12,
    category: "Teclados",
    isNew: true,
    sold: 0,
    badge: "Oferta",
    description: "Teclado USB KB-M10BK para uso diário, atendimento, caixa e escritório.",
    specs: {
      "Tipo": "Teclado USB",
      "Conexão": "Com fio",
      "Marca": "C3Tech",
      "Cor": "Preto",
      "Uso": "Diário"
    },
    images: [
      "teclado-kbm10-1.jpeg",
      "teclado-kbm10-2.jpeg",
      "teclado-kbm10-3.jpeg",
      "teclado-kbm10-4.jpeg"
    ]
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
    badge: "Compacto",
    description: "Teclado compacto KMEX KBD428 USB preto, ideal para quem precisa de praticidade e economia de espaço.",
    specs: {
      "Tipo": "Teclado compacto",
      "Conexão": "Com fio",
      "Marca": "KMEX",
      "Cor": "Preto",
      "Uso": "Escritório"
    },
    images: [
      "teclado-kmex-1.jpg",
      "teclado-kmex-2.jpg",
      "teclado-kmex-3.jpg",
      "teclado-kmex-4.jpg"
    ]
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
    badge: "Genius",
    description: "Teclado Genius KB100XP USB preto para digitação, trabalho e produtividade.",
    specs: {
      "Tipo": "Teclado USB",
      "Conexão": "Com fio",
      "Marca": "Genius",
      "Cor": "Preto",
      "Padrão": "ABNT2"
    },
    images: [
      "teclado-gênio-1.jpeg",
      "teclado-genius-2.jpeg",
      "teclado-genius-3.jpeg"
    ]
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
    badge: "Sem fio",
    description: "Mouse sem fio Vinik Feather VF120 1200 DPI preto, ideal para escritório, mobilidade e praticidade no dia a dia.",
    specs: {
      "Tipo de mouse": "Convencional",
      "Conexão": "Sem fio",
      "Resolução": "1200 DPI",
      "Marca": "Vinik",
      "Cor": "Preto"
    },
    images: [
      "mouse-vinik-1.jpeg",
      "mouse-vinik-2.jpeg",
      "mouse-vinik-3.jpeg",
      "mouse-vinik-4.jpeg",
      "mouse-vinik-5.jpg"
    ]
  },
  {
    code: "6361",
    name: "Impressora Epson Não Fiscal TM-T20X-II SER/USB",
    ref: "T20X",
    price: 1350.00,
    stock: 2,
    category: "Impressoras",
    isNew: true,
    sold: 0,
    badge: "Epson",
    description: "Impressora Epson não fiscal TM-T20X-II para automação comercial e operações de balcão e caixa.",
    specs: {
      "Tipo": "Impressora não fiscal",
      "Marca": "Epson",
      "Modelo": "TM-T20X-II",
      "Uso": "Automação comercial",
      "Conexão": "SER/USB"
    },
    images: [
      "impressora-epson-t20x-1.jpg",
      "-epson-t20x-2.jpg",
      "-epson-t20x-3.jpg",
      "-epson-t20x-4.jpg"
    ]
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
    badge: "C3Tech",
    description: "Mouse USB C3Tech MS-31BK para escritório, caixa e operação diária.",
    specs: {
      "Tipo de mouse": "Convencional",
      "Conexão": "Com fio",
      "Marca": "C3Tech",
      "Cor": "Preto",
      "Uso": "Diário"
    },
    images: [
      "mouse-c3tech-31bk-1.jpeg",
      "mouse-c3tech-31bk-2.jpeg",
      "mouse-c3tech-31bk-3.jpeg",
      "mouse-c3tech-31bk-4.jpeg"
    ]
  },
  {
    code: "6506",
    name: "Mouse Sem Fio WS212 Preto Lecoo",
    ref: "WS212",
    price: 42.00,
    stock: 2,
    category: "Mouses",
    isNew: true,
    sold: 0,
    badge: "Sem fio",
    description: "Mouse sem fio Lecoo WS212 preto para mobilidade, escritório e uso diário.",
    specs: {
      "Tipo de mouse": "Convencional",
      "Conexão": "Sem fio",
      "Marca": "Lecoo",
      "Cor": "Preto",
      "Uso": "Mobilidade"
    },
    images: [
      "mouse-lecoo-1.jpeg",
      "mouse-lecoo-2.jpeg",
      "mouse-lecoo-3.jpeg",
      "mouse-lecoo-4.jpeg"
    ]
  },
  {
    code: "6507",
    name: "Kit Teclado + Mouse USB Gaming GK1100 HP",
    ref: "GK1100",
    price: 182.54,
    stock: 1,
    category: "Combos",
    isNew: true,
    sold: 0,
    badge: "Gaming",
    description: "Kit gamer HP GK1100 com teclado e mouse USB, indicado para setup, uso pessoal e ambientes gamers.",
    specs: {
      "Tipo": "Kit gamer",
      "Conexão": "Com fio",
      "Marca": "HP",
      "Cor": "Preto",
      "Uso": "Gaming"
    },
    images: [
      "kit-hp-gk1100-1.jpeg",
      "kit-hp-gk1100-2.jpeg",
      "kit-hp-gk1100-3.jpeg"
    ]
  },
  {
    code: "6510",
    name: "Kit Teclado + Mouse Sem Fio K-W20BK C3T",
    ref: "K-W20BK",
    price: 130.00,
    stock: 3,
    category: "Combos",
    isNew: true,
    sold: 0,
    badge: "Sem fio",
    description: "Kit sem fio C3Tech K-W20BK para produtividade, organização e praticidade.",
    specs: {
      "Tipo": "Kit teclado + mouse",
      "Conexão": "Sem fio",
      "Marca": "C3Tech",
      "Cor": "Preto",
      "Uso": "Escritório e casa"
    },
    images: [
      "kit-c3tech-sem-fio-1.jpeg",
      "kit-c3tech-sem-fio-2.jpeg",
      "kit-c3tech-sem-fio-3.jpeg",
      "kit-c3tech-sem-fio-4.jpeg"
    ]
  },
  {
    code: "6513",
    name: "Kit Teclado + Mouse USB Gaming GK-20V2BK C3T",
    ref: "GK20V",
    price: 120.00,
    stock: 4,
    category: "Combos",
    isNew: true,
    sold: 0,
    badge: "Gaming",
    description: "Kit gamer C3Tech GK-20V2BK com teclado e mouse USB para setup gamer e uso diário.",
    specs: {
      "Tipo": "Kit gamer",
      "Conexão": "Com fio",
      "Marca": "C3Tech",
      "Cor": "Preto",
      "Uso": "Gaming"
    },
    images: [
      "kit-c3tech-gamer-1.jpeg",
      "kit-c3tech-gamer-2.jpeg",
      "kit-c3tech-gamer-3.jpeg",
      "kit-c3tech-gamer-4.jpeg"
    ]
  }
];

function getProductByCode(code) {
  return PRODUCTS.find(p => p.code === code);
}

function formatBRL(value) {
  return Number(value || 0).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}

function cartGet() {
  return JSON.parse(localStorage.getItem("dominio_cart") || "[]");
}

function cartSet(items) {
  localStorage.setItem("dominio_cart", JSON.stringify(items));
}

function cartCount() {
  return cartGet().reduce((acc, item) => acc + Number(item.qty || 0), 0);
}

function addToCart(code, qty = 1) {
  const product = getProductByCode(code);
  if (!product) return;

  const cart = cartGet();
  const found = cart.find(i => i.code === code);

  if (found) {
    found.qty += qty;
  } else {
    cart.push({ code, qty });
  }

  cartSet(cart);
}

function removeFromCart(code) {
  const cart = cartGet().filter(item => item.code !== code);
  cartSet(cart);
}

function updateCartQty(code, qty) {
  const cart = cartGet();
  const item = cart.find(i => i.code === code);
  if (!item) return;

  item.qty = Math.max(1, Number(qty || 1));
  cartSet(cart);
}

function clearCart() {
  localStorage.removeItem("dominio_cart");
}

function setBuyNow(code, qty = 1) {
  localStorage.setItem("dominio_buy_now", JSON.stringify({ code, qty }));
}

function getBuyNow() {
  return JSON.parse(localStorage.getItem("dominio_buy_now") || "null");
}

function clearBuyNow() {
  localStorage.removeItem("dominio_buy_now");
}

function searchProduct(term) {
  const q = String(term || "").trim().toLowerCase();
  if (!q) return null;
  return PRODUCTS.find(p =>
    p.name.toLowerCase().includes(q) ||
    p.code.includes(q) ||
    p.ref.toLowerCase().includes(q) ||
    p.category.toLowerCase().includes(q)
  );
}

function calcInstallment(price, installments) {
  const rate = STORE.cardRates[installments] || 0;
  const total = price * (1 + rate / 100);
  return {
    installments,
    rate,
    total,
    perInstallment: total / installments
  };
}

function buildWhatsAppUrl(message) {
  return `https://wa.me/${STORE.whatsapp}?text=${encodeURIComponent(message)}`;
}
