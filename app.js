(function () {
  const money = (value) =>
    Number(value || 0).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL"
    });

  const fallbackImage = (name = "Produto") => {
    const text = encodeURIComponent(name);
    return `data:image/svg+xml;utf8,
      <svg xmlns='http://www.w3.org/2000/svg' width='600' height='600'>
        <rect width='100%25' height='100%25' fill='%23f4f7fb'/>
        <rect x='20' y='20' width='560' height='560' rx='30' fill='%23ffffff' stroke='%23dfe7f3'/>
        <text x='50%25' y='48%25' text-anchor='middle' dominant-baseline='middle'
          font-family='Arial' font-size='26' fill='%230c1f5f'>${text}</text>
        <text x='50%25' y='56%25' text-anchor='middle' dominant-baseline='middle'
          font-family='Arial' font-size='18' fill='%23667085'>Imagem do produto</text>
      </svg>`;
  };

  const getCart = () => JSON.parse(localStorage.getItem("di_cart") || "[]");
  const saveCart = (cart) => localStorage.setItem("di_cart", JSON.stringify(cart));

  const getUser = () => JSON.parse(localStorage.getItem("di_user") || "null");
  const saveUser = (user) => localStorage.setItem("di_user", JSON.stringify(user));

  const getCurrentQty = () => Number(document.getElementById("productQtyValue")?.textContent || 1);

  const updateHeaderUser = () => {
    const user = getUser();
    const accountName = document.getElementById("accountName");
    const accountAvatar = document.getElementById("accountAvatar");
    const dropdownUserName = document.getElementById("dropdownUserName");
    const dropdownUserEmail = document.getElementById("dropdownUserEmail");
    const shipToText = document.getElementById("shipToText");

    if (user) {
      const firstName = user.name?.split(" ")[0] || "Cliente";
      if (accountName) accountName.textContent = firstName;
      if (accountAvatar) accountAvatar.textContent = firstName.slice(0, 2).toUpperCase();
      if (dropdownUserName) dropdownUserName.textContent = user.name || "Cliente";
      if (dropdownUserEmail) dropdownUserEmail.textContent = user.email || "";
      if (shipToText) {
        shipToText.textContent = `Enviar para ${firstName} • ${user.street || ""}${user.street ? ", " : ""}${user.number || ""}`;
      }
    } else {
      if (accountName) accountName.textContent = "Entrar";
      if (accountAvatar) accountAvatar.textContent = "DI";
      if (dropdownUserName) dropdownUserName.textContent = "Visitante";
      if (dropdownUserEmail) dropdownUserEmail.textContent = "Faça login para continuar";
    }
  };

  const updateCartCount = () => {
    const count = getCart().reduce((sum, item) => sum + Number(item.qty || 0), 0);
    const allCounts = document.querySelectorAll("#cartCount, #cartCountDesktop, .cart-count");
    allCounts.forEach((el) => {
      el.textContent = count;
    });
  };

  const getCartDetailed = () => {
    return getCart()
      .map((item) => {
        const product = getProductById(item.productId);
        if (!product) return null;
        return {
          ...item,
          product,
          total: Number(product.price) * Number(item.qty)
        };
      })
      .filter(Boolean);
  };

  const getCartTotal = () => {
    return getCartDetailed().reduce((sum, item) => sum + item.total, 0);
  };

  const addToCart = (productId, qty = 1) => {
    const cart = getCart();
    const existing = cart.find((item) => item.productId === productId);

    if (existing) {
      existing.qty += qty;
    } else {
      cart.push({ productId, qty });
    }

    saveCart(cart);
    updateCartCount();
    alert("Produto adicionado ao carrinho.");
  };

  const changePageProductQty = (delta) => {
    const qtyEl = document.getElementById("productQtyValue");
    if (!qtyEl) return;

    let qty = Number(qtyEl.textContent || 1);
    qty += delta;
    if (qty < 1) qty = 1;
    qtyEl.textContent = qty;
  };

  const buyNow = (productId, qty = 1) => {
    saveCart([{ productId, qty }]);
    updateCartCount();
    window.location.href = "checkout.html";
  };

  const renderSystems = () => {
    const wrap = document.getElementById("systemGrid");
    if (!wrap) return;

    wrap.innerHTML = SYSTEMS.map((system) => `
      <article class="system-card">
        <div class="system-card-media">
          <img src="${system.image}" alt="${system.name}" onerror="this.onerror=null;this.src='${fallbackImage(system.name)}';" />
        </div>
        <div class="system-card-body">
          <h3>${system.name}</h3>
          <p>${system.shortDescription}</p>
          <button class="btn-primary" type="button" onclick="window.DI.showSystemInfo(${system.id})">Saber mais</button>
        </div>
      </article>
    `).join("");
  };

  const showSystemInfo = (systemId) => {
    const system = getSystemById(systemId);
    if (!system) return;
    alert(`${system.name}\n\n${system.description}`);
  };

  const productCardHTML = (product) => `
    <article class="product-card">
      <a href="produto.html?id=${product.id}" class="product-image-wrap">
        <img
          class="product-image"
          src="${product.image}"
          alt="${product.name}"
          onerror="this.onerror=null;this.src='${fallbackImage(product.name)}';"
        />
      </a>

      <div class="product-body">
        <span class="product-code">Código: ${product.code}</span>
        <a href="produto.html?id=${product.id}" class="product-title">${product.name}</a>
        <span class="product-category">${product.category}</span>

        <div class="price-row">
          <span class="product-price">${money(product.price)}</span>
          ${product.oldPrice ? `<span class="product-old-price">${money(product.oldPrice)}</span>` : ""}
        </div>

        <span class="stock">Estoque disponível: ${product.stock}</span>

        <div class="product-actions">
          <button class="small-btn primary" type="button" onclick="window.DI.addToCart(${product.id}, 1)">
            Adicionar ao carrinho
          </button>
          <button class="small-btn secondary" type="button" onclick="window.DI.buyNow(${product.id}, 1)">
            Comprar agora
          </button>
        </div>
      </div>
    </article>
  `;

  const renderHomeProducts = (products = PRODUCTS, title = "Todos os produtos", subtitle = "Escolha sua categoria e veja os produtos filtrados aqui embaixo.") => {
    const allProducts = document.getElementById("allProducts");
    const titleEl = document.getElementById("productsSectionTitle");
    const subtitleEl = document.getElementById("productsSectionSubtitle");

    if (titleEl) titleEl.textContent = title;
    if (subtitleEl) subtitleEl.textContent = subtitle;

    if (!allProducts) return;

    if (!products.length) {
      allProducts.innerHTML = `<p>Nenhum produto encontrado.</p>`;
      return;
    }

    allProducts.innerHTML = products.map(productCardHTML).join("");
  };

  const filterProducts = (search = "", category = "todos") => {
    const term = String(search).trim().toLowerCase();

    return PRODUCTS.filter((product) => {
      const name = String(product.name || "").toLowerCase();
      const code = String(product.code || "").toLowerCase();
      const brand = String(product.brand || "").toLowerCase();
      const productCategory = String(product.category || "").toLowerCase();

      const categoryMatch =
        category === "todos" ||
        productCategory === String(category).toLowerCase();

      const searchMatch =
        !term ||
        name.includes(term) ||
        code.includes(term) ||
        brand.includes(term) ||
        productCategory.includes(term);

      return categoryMatch && searchMatch;
    });
  };

  const goToCategory = (category, targetId = "produtosSection") => {
    const filtered = filterProducts("", category);

    const titles = {
      "todos": "Todos os produtos",
      "informática": "Produtos de informática",
      "automação comercial": "Automação comercial",
      "impressão": "Produtos de impressão",
      "redes": "Produtos de redes",
      "gamer": "Produtos gamer"
    };

    if (category === "automação comercial") {
      const target = document.getElementById("sistemasSection");
      if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      renderHomeProducts(
        filtered,
        titles[category] || "Produtos",
        `Mostrando itens da categoria ${category}.`
      );

      const target = document.getElementById(targetId);
      if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    document.querySelectorAll(".nav-chip").forEach((btn) => {
      btn.classList.remove("active");
      if (btn.dataset.category === category) btn.classList.add("active");
    });
  };

  const setupSearch = () => {
    const form = document.getElementById("searchForm");
    const input = document.getElementById("searchInput");

    if (!form || !input) return;

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const value = input.value.trim();

      if (!value) {
        renderHomeProducts(PRODUCTS);
        const section = document.getElementById("produtosSection");
        if (section) section.scrollIntoView({ behavior: "smooth" });
        return;
      }

      const filtered = filterProducts(value, "todos");

      if (document.getElementById("allProducts")) {
        renderHomeProducts(
          filtered,
          `Resultados para "${value}"`,
          `Busca feita por nome, marca, código ou categoria.`
        );

        const section = document.getElementById("produtosSection");
        if (section) section.scrollIntoView({ behavior: "smooth" });
      } else {
        window.location.href = `index.html?busca=${encodeURIComponent(value)}`;
      }
    });
  };

  const applySearchFromUrl = () => {
    const params = new URLSearchParams(window.location.search);
    const search = params.get("busca");
    if (!search) return;

    const input = document.getElementById("searchInput");
    if (input) input.value = search;

    const filtered = filterProducts(search, "todos");
    renderHomeProducts(
      filtered,
      `Resultados para "${search}"`,
      `Busca feita por nome, marca, código ou categoria.`
    );
  };

  const setupNavButtons = () => {
    const buttons = document.querySelectorAll(".nav-chip");
    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        const category = button.dataset.category || "todos";
        const target = button.dataset.target || "produtosSection";
        goToCategory(category, target);
      });
    });
  };

  const renderProductPage = () => {
    const wrap = document.getElementById("productPage");
    if (!wrap) return;

    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    const product = getProductById(id);

    if (!product) {
      wrap.innerHTML = `<div class="product-left"><p>Produto não encontrado.</p></div>`;
      return;
    }

    const gallery = Array.isArray(product.images) && product.images.length ? product.images : [product.image];

    const related = PRODUCTS.filter((item) => item.id !== product.id && item.category === product.category).slice(0, 4);

    wrap.innerHTML = `
      <div class="product-page-layout">
        <section class="product-left">
          <div class="product-left-top">
            <div class="product-thumbs">
              ${gallery.map((img) => `
                <button type="button" class="product-thumb" onclick="window.DI.changeMainImage('${img.replace(/'/g, "\\'")}', '${product.name.replace(/'/g, "\\'")}')">
                  <img src="${img}" alt="${product.name}" onerror="this.onerror=null;this.src='${fallbackImage(product.name)}';" />
                </button>
              `).join("")}
            </div>

            <div class="product-main-image-box" id="productMainImageBox">
              <img
                id="mainProductImage"
                src="${gallery[0]}"
                alt="${product.name}"
                onerror="this.onerror=null;this.src='${fallbackImage(product.name)}';"
              />
            </div>
          </div>

          <div class="product-details-sections">
            <div class="product-info-box">
              <h3>Descrição do produto</h3>
              <p>${product.description}</p>
            </div>

            <div class="product-info-box">
              <h3>Características detalhadas</h3>
              <div class="product-specs-grid">
                ${Object.entries(product.specs || {}).map(([key, value]) => `
                  <div class="spec-item">
                    <strong>${key}</strong>
                    <span>${value}</span>
                  </div>
                `).join("")}
              </div>
            </div>
          </div>
        </section>

        <aside class="product-right">
          <div class="product-meta">
            <span>Novo</span>
            <span>Estoque: ${product.stock}</span>
          </div>

          <h1>${product.name}</h1>

          <div class="price-row">
            <span class="product-price">${money(product.price)}</span>
            ${product.oldPrice ? `<span class="product-old-price">${money(product.oldPrice)}</span>` : ""}
          </div>

          <p>${product.shortDescription}</p>

          <p class="stock">Estoque disponível: <strong>${product.stock}</strong> unidades</p>

          <div class="quantity-box">
            <span>Quantidade:</span>
            <button type="button" class="qty-btn" onclick="window.DI.changePageProductQty(-1)">−</button>
            <span class="qty-value" id="productQtyValue">1</span>
            <button type="button" class="qty-btn" onclick="window.DI.changePageProductQty(1)">+</button>
          </div>

          <div class="product-side-actions">
            <button type="button" class="btn-primary" onclick="window.DI.addCurrentProductToCart(${product.id})">Adicionar ao carrinho</button>
            <button type="button" class="btn-secondary" onclick="window.DI.buyCurrentProductNow(${product.id})">Comprar agora</button>
          </div>

          <div class="related-products">
            <h3>Produtos relacionados</h3>
            ${related.map((item) => `
              <a href="produto.html?id=${item.id}" class="related-card">
                <img src="${item.image}" alt="${item.name}" onerror="this.onerror=null;this.src='${fallbackImage(item.name)}';" />
                <div>
                  <strong>${item.name}</strong>
                  <p>${money(item.price)}</p>
                </div>
              </a>
            `).join("")}
          </div>
        </aside>
      </div>
    `;

    setupImageZoom();
  };

  const setupImageZoom = () => {
    const box = document.getElementById("productMainImageBox");
    if (!box) return;

    box.addEventListener("mousemove", () => {
      box.classList.add("zooming");
    });

    box.addEventListener("mouseleave", () => {
      box.classList.remove("zooming");
    });
  };

  const changeMainImage = (src, alt) => {
    const mainImage = document.getElementById("mainProductImage");
    if (!mainImage) return;
    mainImage.src = src;
    mainImage.alt = alt;
  };

  const addCurrentProductToCart = (productId) => {
    addToCart(productId, getCurrentQty());
  };

  const buyCurrentProductNow = (productId) => {
    buyNow(productId, getCurrentQty());
  };

  const setupSlider = () => {
    const slides = document.querySelectorAll(".hero-slide");
    const dotsWrap = document.getElementById("sliderDots");
    const prevBtn = document.getElementById("prevSlideBtn");
    const nextBtn = document.getElementById("nextSlideBtn");

    if (!slides.length || !dotsWrap) return;

    let current = 0;

    const renderDots = () => {
      dotsWrap.innerHTML = slides
        .map((_, index) => `<button type="button" class="slider-dot ${index === current ? "active" : ""}" data-slide="${index}"></button>`)
        .join("");

      dotsWrap.querySelectorAll(".slider-dot").forEach((dot) => {
        dot.addEventListener("click", () => {
          current = Number(dot.dataset.slide);
          showSlide(current);
        });
      });
    };

    const showSlide = (index) => {
      slides.forEach((slide, i) => {
        slide.classList.toggle("active", i === index);
      });
      renderDots();
    };

    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        current = current === 0 ? slides.length - 1 : current - 1;
        showSlide(current);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        current = current === slides.length - 1 ? 0 : current + 1;
        showSlide(current);
      });
    }

    setInterval(() => {
      current = current === slides.length - 1 ? 0 : current + 1;
      showSlide(current);
    }, 5000);

    showSlide(current);
  };

  const setupNotifications = () => {
    const openBtn = document.getElementById("openNotificationsBtn");
    const closeBtn = document.getElementById("closeNotificationsBtn");
    const panel = document.getElementById("notificationPanel");

    if (!panel) return;

    if (openBtn) {
      openBtn.addEventListener("click", () => {
        panel.classList.toggle("open");
      });
    }

    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        panel.classList.remove("open");
      });
    }
  };

  const setupDomBot = () => {
    const toggle = document.getElementById("domBotToggle");
    const panel = document.getElementById("domBotPanel");
    const close = document.getElementById("closeDomBot");
    const options = document.querySelectorAll(".dombot-option");
    const customMessage = document.getElementById("domBotCustomMessage");
    const send = document.getElementById("sendDomBotMessage");

    if (toggle && panel) {
      toggle.addEventListener("click", () => panel.classList.toggle("open"));
    }

    if (close && panel) {
      close.addEventListener("click", () => panel.classList.remove("open"));
    }

    options.forEach((button) => {
      button.addEventListener("click", () => {
        const message = button.dataset.message || "Olá!";
        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank");
      });
    });

    if (send && customMessage) {
      send.addEventListener("click", () => {
        const message = customMessage.value.trim() || "Olá! Quero tirar uma dúvida.";
        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank");
      });
    }
  };

  const setupLogin = () => {
    const form = document.getElementById("loginForm");
    if (!form) return;

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const user = {
        name: document.getElementById("loginName")?.value.trim() || "",
        email: document.getElementById("loginEmail")?.value.trim() || "",
        phone: document.getElementById("loginPhone")?.value.trim() || "",
        cpf: document.getElementById("loginCpf")?.value.trim() || "",
        street: document.getElementById("loginStreet")?.value.trim() || "",
        number: document.getElementById("loginNumber")?.value.trim() || "",
        neighborhood: document.getElementById("loginNeighborhood")?.value.trim() || "",
        city: document.getElementById("loginCity")?.value.trim() || "",
        state: document.getElementById("loginState")?.value.trim() || "",
        reference: document.getElementById("loginReference")?.value.trim() || ""
      };

      saveUser(user);
      alert("Cadastro salvo com sucesso.");
      window.location.href = "index.html";
    });
  };

  const setupLogout = () => {
    const btn = document.getElementById("logoutBtn");
    if (!btn) return;

    btn.addEventListener("click", () => {
      localStorage.removeItem("di_user");
      alert("Você saiu da conta.");
      window.location.href = "index.html";
    });
  };

  const renderCheckoutSummary = () => {
    const itemsWrap = document.getElementById("checkoutItems");
    const subtotalEl = document.getElementById("checkoutSubtotal");
    const totalEl = document.getElementById("checkoutTotal");

    if (!itemsWrap) return;

    const items = getCartDetailed();

    if (!items.length) {
      itemsWrap.innerHTML = "<p>Seu carrinho está vazio.</p>";
      if (subtotalEl) subtotalEl.textContent = money(0);
      if (totalEl) totalEl.textContent = money(0);
      return;
    }

    itemsWrap.innerHTML = items.map((item) => `
      <div class="checkout-item">
        <img src="${item.product.image}" alt="${item.product.name}" onerror="this.onerror=null;this.src='${fallbackImage(item.product.name)}';" />
        <div>
          <strong>${item.product.name}</strong>
          <p>${item.qty} x ${money(item.product.price)}</p>
          <p><strong>${money(item.total)}</strong></p>
        </div>
      </div>
    `).join("");

    const total = getCartTotal();
    if (subtotalEl) subtotalEl.textContent = money(total);
    if (totalEl) totalEl.textContent = money(total);

    updateInstallmentSimulation();
  };

  const renderCheckoutUserData = () => {
    const userData = document.getElementById("checkoutUserData");
    if (!userData) return;

    const user = getUser();

    if (!user) {
      userData.innerHTML = `
        <p>Você precisa fazer login antes de finalizar.</p>
        <a href="login.html" class="btn-primary">Fazer login</a>
      `;
      return;
    }

    userData.innerHTML = `
      <p><strong>${user.name}</strong></p>
      <p>${user.email}</p>
      <p>${user.phone}</p>
      <p>${user.street}, ${user.number} - ${user.neighborhood}</p>
      <p>${user.city} / ${user.state}</p>
    `;

    const street = document.getElementById("checkoutStreet");
    const number = document.getElementById("checkoutNumber");
    const neighborhood = document.getElementById("checkoutNeighborhood");
    const reference = document.getElementById("checkoutReference");

    if (street) street.value = user.street || "";
    if (number) number.value = user.number || "";
    if (neighborhood) neighborhood.value = user.neighborhood || "";
    if (reference) reference.value = user.reference || "";
  };

  const setupCheckoutOptions = () => {
    const deliveryRadios = document.querySelectorAll('input[name="deliveryType"]');
    const deliveryFields = document.getElementById("deliveryFields");
    const paymentRadios = document.querySelectorAll('input[name="paymentMethod"]');
    const pixBox = document.getElementById("pixBox");
    const cashBox = document.getElementById("cashBox");
    const cardBox = document.getElementById("cardBox");

    deliveryRadios.forEach((radio) => {
      radio.addEventListener("change", () => {
        document.querySelectorAll('input[name="deliveryType"]').forEach((input) => {
          input.closest(".checkout-option")?.classList.remove("selected");
        });

        radio.closest(".checkout-option")?.classList.add("selected");

        if (radio.value === "entrega") {
          deliveryFields?.classList.remove("hidden");
        } else {
          deliveryFields?.classList.add("hidden");
        }
      });
    });

    paymentRadios.forEach((radio) => {
      radio.addEventListener("change", () => {
        document.querySelectorAll('input[name="paymentMethod"]').forEach((input) => {
          input.closest(".checkout-option")?.classList.remove("selected");
        });

        radio.closest(".checkout-option")?.classList.add("selected");

        pixBox?.classList.add("hidden");
        cashBox?.classList.add("hidden");
        cardBox?.classList.add("hidden");

        if (radio.value === "pix") pixBox?.classList.remove("hidden");
        if (radio.value === "dinheiro") cashBox?.classList.remove("hidden");
        if (radio.value === "cartao") cardBox?.classList.remove("hidden");

        updateInstallmentSimulation();
      });
    });
  };

  const getCardFee = (installments) => {
    const fees = {
      8: 16.09,
      9: 16.69,
      10: 17.39,
      11: 18.39,
      12: 18.79
    };
    return fees[installments] || 0;
  };

  const updateInstallmentSimulation = () => {
    const select = document.getElementById("installments");
    const result = document.getElementById("installmentResult");
    if (!select || !result) return;

    const total = getCartTotal();
    const installments = Number(select.value || 1);
    const fee = getCardFee(installments);
    const totalWithFee = fee > 0 ? total * (1 + fee / 100) : total;
    const installmentValue = totalWithFee / installments;

    result.textContent = `Total no cartão: ${money(totalWithFee)} • ${installments}x de ${money(installmentValue)}`;
  };

  const setupPixCopy = () => {
    const copyBtn = document.getElementById("copyPixKeyBtn");
    const pixKey = document.getElementById("pixKey");
    const alreadyPaidBtn = document.getElementById("alreadyPaidBtn");

    if (copyBtn && pixKey) {
      copyBtn.addEventListener("click", async () => {
        try {
          await navigator.clipboard.writeText(pixKey.value);
          alert("Chave Pix copiada.");
        } catch (e) {
          alert("Não foi possível copiar automaticamente.");
        }
      });
    }

    if (alreadyPaidBtn) {
      alreadyPaidBtn.addEventListener("click", () => {
        window.open(
          `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Olá! Já fiz o pagamento via Pix e vou enviar o comprovante.")}`,
          "_blank"
        );
      });
    }
  };

  const finishOrder = () => {
    const user = getUser();

    if (!user) {
      alert("Você precisa fazer login antes de finalizar.");
      window.location.href = "login.html";
      return;
    }

    const cart = getCartDetailed();
    if (!cart.length) {
      alert("Seu carrinho está vazio.");
      return;
    }

    const deliveryType = document.querySelector('input[name="deliveryType"]:checked')?.value || "retirada";
    const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked')?.value || "pix";

    const itemsText = cart.map((item) =>
      `• ${item.product.name} | Cód: ${item.product.code} | Qtd: ${item.qty} | Total: ${money(item.total)}`
    ).join("\n");

    let deliveryText = "Retirada na loja";
    if (deliveryType === "entrega") {
      deliveryText =
        `Entrega no endereço:\n` +
        `Rua: ${document.getElementById("checkoutStreet")?.value || ""}\n` +
        `Número: ${document.getElementById("checkoutNumber")?.value || ""}\n` +
        `Bairro: ${document.getElementById("checkoutNeighborhood")?.value || ""}\n` +
        `Referência: ${document.getElementById("checkoutReference")?.value || ""}\n` +
        `Local de trabalho: ${document.getElementById("checkoutWorkplace")?.value || ""}`;
    }

    let paymentText = "";
    if (paymentMethod === "pix") paymentText = `Pix\nChave: ${PIX_KEY}`;
    if (paymentMethod === "dinheiro") paymentText = `Dinheiro\nTroco para: ${document.getElementById("cashChange")?.value || "Não informado"}`;
    if (paymentMethod === "cartao") {
      const installments = Number(document.getElementById("installments")?.value || 1);
      const fee = getCardFee(installments);
      const totalWithFee = fee > 0 ? getCartTotal() * (1 + fee / 100) : getCartTotal();
      paymentText = `Cartão\nParcelamento: ${installments}x\nTotal: ${money(totalWithFee)}`;
    }

    const notes = document.getElementById("checkoutNotes")?.value || "Nenhuma";

    const message =
      `Olá! Quero finalizar meu pedido.\n\n` +
      `Cliente: ${user.name}\n` +
      `E-mail: ${user.email}\n` +
      `WhatsApp: ${user.phone}\n\n` +
      `Itens:\n${itemsText}\n\n` +
      `Recebimento:\n${deliveryText}\n\n` +
      `Pagamento:\n${paymentText}\n\n` +
      `Observações: ${notes}\n\n` +
      `Total: ${money(getCartTotal())}`;

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank");
  };

  const setupCheckout = () => {
    renderCheckoutUserData();
    renderCheckoutSummary();
    setupCheckoutOptions();
    setupPixCopy();

    const finishBtn = document.getElementById("finishOrderBtn");
    if (finishBtn) finishBtn.addEventListener("click", finishOrder);

    const installments = document.getElementById("installments");
    if (installments) installments.addEventListener("change", updateInstallmentSimulation);

    updateInstallmentSimulation();
  };

  window.DI = {
    addToCart,
    buyNow,
    goToCategory,
    showSystemInfo,
    changeMainImage,
    changePageProductQty,
    addCurrentProductToCart,
    buyCurrentProductNow
  };

  document.addEventListener("DOMContentLoaded", () => {
    updateHeaderUser();
    updateCartCount();
    renderSystems();
    renderHomeProducts(PRODUCTS);
    renderProductPage();
    setupSearch();
    applySearchFromUrl();
    setupNavButtons();
    setupSlider();
    setupNotifications();
    setupDomBot();
    setupLogin();
    setupLogout();
    setupCheckout();
  });
})();
