const WHATSAPP_NUMBER = "5594992627580";
const PIX_KEY = "b476bb76-75e0-4b0d-85e8-621710f271a2";

const SYSTEMS = [
  {
    id: 101,
    name: "EasySAC",
    category: "automação comercial",
    image: "logo-dominio.png.png",
    shortDescription: "Sistema para lojas, controle de vendas, estoque e atendimento.",
    description: "O EasySAC é ideal para lojas e comércios que precisam de organização, controle de vendas, cadastro de produtos, estoque, relatórios e gestão no dia a dia."
  },
  {
    id: 102,
    name: "EasyChef",
    category: "automação comercial",
    image: "logo-dominio.png.png",
    shortDescription: "Sistema para restaurantes, pedidos, mesas e produção.",
    description: "O EasyChef atende restaurantes, lanchonetes e estabelecimentos de alimentação, com controle de mesas, pedidos, comandas, cozinha e gestão operacional."
  },
  {
    id: 103,
    name: "EasyPDV",
    category: "automação comercial",
    image: "logo-dominio.png.png",
    shortDescription: "Sistema para mercados e operação em frente de caixa.",
    description: "O EasyPDV é voltado para mercados e estabelecimentos com necessidade de agilidade no caixa, controle de vendas, integração e produtividade."
  }
];

const PRODUCTS = [
  {
    id: 1,
    code: "MOU001",
    name: "Mouse C3Tech 31BK",
    category: "informática",
    brand: "C3Tech",
    price: 49.90,
    oldPrice: 59.90,
    stock: 15,
    image: "mouse-c3tech-31bk-1.jpeg",
    images: ["mouse-c3tech-31bk-1.jpeg", "mouse-c3tech-31bk-2.jpeg", "mouse-c3tech-31bk-3.jpeg", "mouse-c3tech-31bk-4.jpeg"],
    shortDescription: "Mouse confortável e preciso para uso diário.",
    description: "Mouse C3Tech 31BK com boa pegada, ótimo custo-benefício e uso ideal para rotina de escritório, estudos e operação diária.",
    specs: {
      Marca: "C3Tech",
      Modelo: "31BK",
      Conexão: "USB",
      Uso: "Escritório / rotina",
      Precisão: "Alta",
      Compatibilidade: "Plug and play"
    }
  },
  {
    id: 2,
    code: "MOU002",
    name: "Mouse C3Tech 35BK",
    category: "informática",
    brand: "C3Tech",
    price: 59.90,
    oldPrice: 69.90,
    stock: 12,
    image: "mouse-c3tech-35bk-1.jpg",
    images: ["mouse-c3tech-35bk-1.jpg", "mouse-c3tech-35bk-2.jpg", "mouse-c3tech-35bk-3.jpg"],
    shortDescription: "Mouse com ótimo custo-benefício.",
    description: "Mouse C3Tech 35BK ideal para uso diário, com precisão e visual discreto.",
    specs: {
      Marca: "C3Tech",
      Modelo: "35BK",
      Conexão: "USB",
      Uso: "Escritório / loja",
      Layout: "Convencional",
      Compatibilidade: "Plug and play"
    }
  },
  {
    id: 3,
    code: "MOU003",
    name: "Mouse Kross",
    category: "informática",
    brand: "Kross",
    price: 39.90,
    oldPrice: 49.90,
    stock: 20,
    image: "mouse-kross-1.png",
    images: ["mouse-kross-1.png", "mouse-kross-2.png", "mouse-kross-3.png"],
    shortDescription: "Mouse simples e funcional.",
    description: "Mouse Kross para rotina de escritório, atendimento e tarefas do dia a dia.",
    specs: {
      Marca: "Kross",
      Modelo: "Padrão",
      Conexão: "USB",
      Uso: "Básico",
      Compatibilidade: "Plug and play",
      Cor: "Preto"
    }
  },
  {
    id: 4,
    code: "MOU004",
    name: "Mouse Maxprint",
    category: "informática",
    brand: "Maxprint",
    price: 35.90,
    oldPrice: 45.90,
    stock: 14,
    image: "mouse-maxprint-1.png",
    images: ["mouse-maxprint-1.png", "mouse-maxprint-2.png", "mouse-maxprint-3.png"],
    shortDescription: "Mouse econômico para rotina diária.",
    description: "Mouse Maxprint com visual simples e bom custo-benefício para trabalho e estudos.",
    specs: {
      Marca: "Maxprint",
      Modelo: "Padrão",
      Conexão: "USB",
      Uso: "Básico",
      Compatibilidade: "Plug and play",
      Cor: "Preto"
    }
  },
  {
    id: 5,
    code: "MOU005",
    name: "Mouse Movitec",
    category: "informática",
    brand: "Movitec",
    price: 29.90,
    oldPrice: 39.90,
    stock: 18,
    image: "mouse-movitec-1.png",
    images: ["mouse-movitec-1.png", "mouse-movitec-2.png", "mouse-movitec-3.png"],
    shortDescription: "Mouse básico e funcional.",
    description: "Mouse Movitec para uso em escritório, atendimento e computador de rotina.",
    specs: {
      Marca: "Movitec",
      Modelo: "Padrão",
      Conexão: "USB",
      Uso: "Básico",
      Compatibilidade: "Plug and play",
      Cor: "Preto"
    }
  },
  {
    id: 6,
    code: "KIT001",
    name: "Kit C3Tech Gamer",
    category: "gamer",
    brand: "C3Tech",
    price: 149.90,
    oldPrice: 179.90,
    stock: 9,
    image: "kit-c3tech-gamer-1.jpeg",
    images: ["kit-c3tech-gamer-1.jpeg", "kit-c3tech-gamer-2.jpeg", "kit-c3tech-gamer-3.jpeg", "kit-c3tech-gamer-4.jpeg"],
    shortDescription: "Kit gamer completo.",
    description: "Kit gamer da C3Tech para quem busca visual bonito, praticidade e bom custo-benefício para montar setup.",
    specs: {
      Marca: "C3Tech",
      Tipo: "Kit Gamer",
      Conteúdo: "Teclado e mouse",
      Visual: "Gamer",
      Uso: "Jogos e rotina",
      Conexão: "USB"
    }
  },
  {
    id: 7,
    code: "KIT002",
    name: "Kit C3Tech Sem Fio",
    category: "informática",
    brand: "C3Tech",
    price: 129.90,
    oldPrice: 149.90,
    stock: 10,
    image: "kit-c3tech-sem-fio-1.jpeg",
    images: ["kit-c3tech-sem-fio-1.jpeg", "kit-c3tech-sem-fio-2.jpeg", "kit-c3tech-sem-fio-3.jpeg", "kit-c3tech-sem-fio-4.jpeg"],
    shortDescription: "Kit sem fio prático para rotina.",
    description: "Kit teclado e mouse sem fio ideal para escritórios, recepção e uso confortável no dia a dia.",
    specs: {
      Marca: "C3Tech",
      Tipo: "Kit sem fio",
      Conectividade: "Wireless",
      Uso: "Escritório",
      Cor: "Preto",
      Compatibilidade: "Plug and play"
    }
  },
  {
    id: 8,
    code: "KIT003",
    name: "Kit HP GK1100",
    category: "informática",
    brand: "HP",
    price: 139.90,
    oldPrice: 169.90,
    stock: 8,
    image: "kit-hp-gk1100-1.jpeg",
    images: ["kit-hp-gk1100-1.jpeg", "kit-hp-gk1100-2.jpeg", "kit-hp-gk1100-3.jpeg"],
    shortDescription: "Kit HP confiável e durável.",
    description: "Kit HP para rotina de trabalho, atendimento e uso contínuo.",
    specs: {
      Marca: "HP",
      Modelo: "GK1100",
      Conteúdo: "Teclado e mouse",
      Uso: "Escritório",
      Conexão: "USB",
      Cor: "Preto"
    }
  },
  {
    id: 9,
    code: "IMP001",
    name: "Impressora Elgin",
    category: "impressão",
    brand: "Elgin",
    price: 899.90,
    oldPrice: 999.90,
    stock: 5,
    image: "impressora-elgin-1.jpeg",
    images: ["impressora-elgin-1.jpeg", "impressora-elgin-2.jpeg", "impressora-elgin-3.jpeg", "impressora-elgin-4.jpeg"],
    shortDescription: "Impressora para automação comercial.",
    description: "Impressora Elgin indicada para operações comerciais, emissão e produtividade no caixa.",
    specs: {
      Marca: "Elgin",
      Categoria: "Impressora",
      Uso: "Automação comercial",
      Conexão: "USB",
      Aplicação: "PDV / operação comercial",
      Estrutura: "Compacta"
    }
  },
  {
    id: 10,
    code: "IMP002",
    name: "Impressora Epson T20X",
    category: "impressão",
    brand: "Epson",
    price: 1099.90,
    oldPrice: 1299.90,
    stock: 4,
    image: "impressora-epson-t20x-1.jpg",
    images: ["impressora-epson-t20x-1.jpg", "impressora-epson-t20x-2.jpg", "impressora-epson-t20x-3.jpg", "impressora-epson-t20x-4.jpg"],
    shortDescription: "Impressora profissional para operação comercial.",
    description: "Impressora Epson T20X com visual profissional e excelente desempenho para automação comercial.",
    specs: {
      Marca: "Epson",
      Modelo: "T20X",
      Categoria: "Impressão",
      Aplicação: "PDV / comércio",
      Conectividade: "USB / Ethernet",
      Estrutura: "Profissional"
    }
  },
  {
    id: 11,
    code: "IMP003",
    name: "Impressora Tanca",
    category: "impressão",
    brand: "Tanca",
    price: 799.90,
    oldPrice: 899.90,
    stock: 5,
    image: "impressora-tanca-1.webp",
    images: ["impressora-tanca-1.webp", "impressora-tanca-2.jpeg"],
    shortDescription: "Impressora econômica para comércio.",
    description: "Impressora Tanca com ótimo custo-benefício para operação comercial.",
    specs: {
      Marca: "Tanca",
      Categoria: "Impressora",
      Uso: "Automação comercial",
      Conexão: "USB",
      Aplicação: "PDV",
      Estrutura: "Compacta"
    }
  },
  {
    id: 12,
    code: "TEC001",
    name: "Teclado C3Tech KB-14BK",
    category: "informática",
    brand: "C3Tech",
    price: 32.77,
    oldPrice: 36.00,
    stock: 3,
    image: "teclado-kbm10-1.jpeg",
    images: ["teclado-kbm10-1.jpeg", "teclado-kbm10-2.jpeg", "teclado-kbm10-3.jpeg", "teclado-kbm10-4.jpeg"],
    shortDescription: "Teclado USB ABNT2 preto.",
    description: "Teclado KB-14BK C3Tech USB com fio, ideal para rotina de escritório. Design sofisticado, ajuste de altura e uso confortável no dia a dia.",
    specs: {
      Marca: "C3Tech",
      Modelo: "KB-14BK",
      Layout: "ABNT2",
      Arquitetura: "Qwerty",
      Altura: "3 cm",
      Largura: "43 cm",
      Profundidade: "12 cm"
    }
  }
];

function getProductById(id) {
  return PRODUCTS.find((product) => product.id === Number(id));
}

function getSystemById(id) {
  return SYSTEMS.find((system) => system.id === Number(id));
}
