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
      </svg>`;
  };

  const getCart = () => JSON.parse(localStorage.getItem("di_cart") || "[]");
  const saveCart = (cart) => localStorage.setItem("di_cart", JSON.stringify(cart));
  const getUser = () => JSON.parse(localStorage.getItem("di_user") || "null");
  const saveUser = (user) => localStorage.setItem("di_user", JSON.stringify(user));
  const getOrders = () => JSON.parse(localStorage.getItem("di_orders") || "[]");
  const saveOrders = (orders) => localStorage.setItem("di_orders", JSON.stringify(orders));

 let currentCategory = "todos";

const updateHeaderUser = () => {
  const user = getUser();
  const accountName = document.getElementById("accountName");
  const accountAvatar = document.getElementById("accountAvatar");
  const dropdownUserName = document.getElementById("dropdownUserName");
  const dropdownUserEmail = document.getElementById("dropdownUserEmail");
  const shipToBtn = document.getElementById("shipToBtn");
  const profileLink = document.getElementById("profileLink");
  const myOrdersBtn = document.getElementById("myOrdersBtn");
  const logoutBtn = document.getElementById("logoutBtn");

  if (user) {
    const firstName = (user.name || "Cliente").split(" ")[0];

    if (accountName) accountName.textContent = firstName.toUpperCase();
    if (accountAvatar) accountAvatar.textContent = firstName.slice(0, 2).toUpperCase();
    if (dropdownUserName) dropdownUserName.textContent = user.name || "Cliente";
    if (dropdownUserEmail) dropdownUserEmail.textContent = user.email || "";

    if (profileLink) {
      profileLink.textContent = "Meu perfil";
      profileLink.style.display = "none";
    }

    if (myOrdersBtn) myOrdersBtn.style.display = "block";
    if (logoutBtn) logoutBtn.style.display = "block";

    const addressText = [user.street, user.number, user.neighborhood].filter(Boolean).join(", ");
    if (shipToBtn) {
      shipToBtn.textContent = addressText ? `Enviar para • ${addressText}` : "Enviar para •";
    }
  } else {
    if (accountName) accountName.textContent = "Entrar";
    if (accountAvatar) accountAvatar.textContent = "DI";
    if (dropdownUserName) dropdownUserName.textContent = "Visitante";
    if (dropdownUserEmail) dropdownUserEmail.textContent = "Faça login para continuar";

    if (profileLink) {
      profileLink.textContent = "Entrar / Cadastro";
      profileLink.style.display = "block";
      profileLink.href = "login.html";
    }

    if (myOrdersBtn) myOrdersBtn.style.display = "none";
    if (logoutBtn) logoutBtn.style.display = "none";

    if (shipToBtn) shipToBtn.textContent = "Enviar para •";
  }
};

const setupAccountDropdown = () => {
  const trigger = document.getElementById("accountTrigger");
  const dropdown = document.getElementById("accountDropdown");

  if (!trigger || !dropdown) return;

  trigger.addEventListener("click", (event) => {
    event.stopPropagation();
    dropdown.classList.toggle("open");
  });

  dropdown.addEventListener("click", (event) => {
    event.stopPropagation();
  });

  document.addEventListener("click", () => {
    dropdown.classList.remove("open");
  });
};
  const updateCartCount = () => {
    const count = getCart().reduce((sum, item) => sum + Number(item.qty || 0), 0);
    document.querySelectorAll("#cartCount, .cart-count").forEach((node) => {
      node.textContent = count;
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
          total: Number(product.price || 0) * Number(item.qty || 0)
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
      cart.push({ productId, qty, selected: true });
    }

    saveCart(cart);
    updateCartCount();
    alert("Produto adicionado ao carrinho.");
  };

  const buyNow = (productId, qty = 1) => {
    saveCart([{ productId, qty, selected: true }]);
    updateCartCount();
    window.location.href = "checkout.html";
  };

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) section.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const renderSystems = () => {
    const wrap = document.getElementById("systemGrid");
    if (!wrap || typeof SYSTEMS === "undefined") return;

    wrap.innerHTML = SYSTEMS.map((system) => `
      <article class="system-card">
        <a href="${system.page}" class="system-card-media">
          <img
            src="${system.image}"
            alt="${system.name}"
            onerror="this.onerror=null;this.src='${fallbackImage(system.name)}';"
          />
        </a>
        <div class="system-card-body">
          <h3>${system.name}</h3>
          <p>${system.shortDescription}</p>
          <a class="btn-primary" href="${system.page}">Saber mais</a>
        </div>
      </article>
    `).join("");
  };

  const productCardHTML = (product) => `
    <article class="product-card">
      <a href="product.html?id=${product.id}" class="product-image-wrap">
        <img
          class="product-image"
          src="${product.image}"
          alt="${product.name}"
          onerror="this.onerror=null;this.src='${fallbackImage(product.name)}';"
        />
      </a>

      <div class="product-body">
        <span class="product-code">Código: ${product.code}</span>
        <a href="product.html?id=${product.id}" class="product-title">${product.name}</a>
        <span class="product-category">${product.category}</span>

        <div class="price-row">
          <span class="product-price">${money(product.price)}</span>
          ${product.oldPrice ? `<span class="product-old-price">${money(product.oldPrice)}</span>` : ""}
        </div>

        <span class="stock">Estoque disponível: ${product.stock}</span>

        <div class="product-actions">
          <button class="small-btn primary" type="button" onclick="window.DI.addToCart(${product.id}, 1)">Adicionar ao carrinho</button>
          <button class="small-btn secondary" type="button" onclick="window.DI.buyNow(${product.id}, 1)">Comprar agora</button>
        </div>
      </div>
    </article>
  `;

  const renderHomeProducts = (products, title, subtitle) => {
    const wrap = document.getElementById("allProducts");
    const titleEl = document.getElementById("productsSectionTitle");
    const subtitleEl = document.getElementById("productsSectionSubtitle");

    if (titleEl) titleEl.textContent = title || "Todos os produtos";
    if (subtitleEl) subtitleEl.textContent = subtitle || "Mostrando todos os itens cadastrados.";

    if (!wrap) return;

    if (!products.length) {
      wrap.innerHTML = `<p class="empty-message">Nenhum produto encontrado.</p>`;
      return;
    }

    wrap.innerHTML = products.map(productCardHTML).join("");
  };

  const filterProducts = (search = "", category = "todos") => {
    const term = String(search || "").trim().toLowerCase();

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

  const updateActiveCategoryButton = (category) => {
    document.querySelectorAll(".nav-chip[data-category]").forEach((button) => {
      button.classList.toggle("active", button.dataset.category === category);
    });
  };

  const applyCategoryFilter = (category) => {
    currentCategory = category;
    updateActiveCategoryButton(category);

    if (category === "automação comercial") {
      scrollToSection("systemsSection");
      return;
    }

    const titles = {
      todos: "Todos os produtos",
      "informática": "Produtos de informática",
      "impressão": "Produtos de impressão",
      redes: "Produtos de redes",
      gamer: "Produtos gamer"
    };

    const filtered = filterProducts("", category);
    renderHomeProducts(
      filtered,
      titles[category] || "Produtos",
      category === "todos" ? "Mostrando todos os itens cadastrados." : `Mostrando itens da categoria ${category}.`
    );

    scrollToSection("productsSection");
  };

  const setupNavButtons = () => {
    document.querySelectorAll(".nav-chip[data-category]").forEach((button) => {
      button.addEventListener("click", () => {
        const category = button.dataset.category || "todos";
        applyCategoryFilter(category);
      });
    });
  };

  const setupSearch = () => {
    const form = document.getElementById("searchForm");
    const input = document.getElementById("searchInput");

    if (!form || !input) return;

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const value = input.value.trim();
      window.location.href = `index.html?busca=${encodeURIComponent(value)}#productsSection`;
    });
  };

  const applySearchFromUrl = () => {
    const params = new URLSearchParams(window.location.search);
    const search = params.get("busca");
    const category = params.get("cat");
    const input = document.getElementById("searchInput");
    const wrap = document.getElementById("allProducts");

    if (category && wrap) {
      applyCategoryFilter(category);
    }

    if (!search || !wrap) return;

    if (input) input.value = search;

    const filtered = filterProducts(search, category || "todos");
    renderHomeProducts(
      filtered,
      `Resultados para "${search}"`,
      "Busca feita por nome, marca, código ou categoria."
    );

    setTimeout(() => {
      scrollToSection("productsSection");
    }, 120);
  };

  const setupSlider = () => {
    const slides = document.querySelectorAll(".hero-slide");
    const dotsWrap = document.getElementById("sliderDots");
    const prevBtn = document.getElementById("prevSlideBtn");
    const nextBtn = document.getElementById("nextSlideBtn");

    if (!slides.length || !dotsWrap) return;

    let current = 0;
    let timer = null;

    const renderDots = () => {
      dotsWrap.innerHTML = slides
        .map((_, index) => `<button type="button" class="slider-dot ${index === current ? "active" : ""}" data-slide="${index}"></button>`)
        .join("");

      dotsWrap.querySelectorAll(".slider-dot").forEach((dot) => {
        dot.addEventListener("click", () => {
          current = Number(dot.dataset.slide);
          showSlide(current);
          restartAuto();
        });
      });
    };

    const showSlide = (index) => {
      slides.forEach((slide, i) => slide.classList.toggle("active", i === index));
      renderDots();
    };

    const next = () => {
      current = current === slides.length - 1 ? 0 : current + 1;
      showSlide(current);
    };

    const prev = () => {
      current = current === 0 ? slides.length - 1 : current - 1;
      showSlide(current);
    };

    const restartAuto = () => {
      if (timer) clearInterval(timer);
      timer = setInterval(next, 5000);
    };

    if (prevBtn) prevBtn.addEventListener("click", () => { prev(); restartAuto(); });
    if (nextBtn) nextBtn.addEventListener("click", () => { next(); restartAuto(); });

    showSlide(current);
    restartAuto();
  };

  const setupNotifications = () => {
    const openBtn = document.getElementById("openNotificationsBtn");
    const closeBtn = document.getElementById("closeNotificationsBtn");
    const panel = document.getElementById("notificationPanel");

    if (!panel) return;

    if (openBtn) openBtn.addEventListener("click", () => panel.classList.toggle("open"));
    if (closeBtn) closeBtn.addEventListener("click", () => panel.classList.remove("open"));

    if (localStorage.getItem("di_show_verify_notice") === "1") {
      panel.classList.add("open");
      localStorage.removeItem("di_show_verify_notice");
    }
  };

  const setupOrdersPanel = () => {
    const openBtn = document.getElementById("myOrdersBtn");
    const closeBtn = document.getElementById("closeOrdersBtn");
    const panel = document.getElementById("ordersPanel");
    const content = document.getElementById("ordersContent");

    if (!panel || !content) return;

    const renderOrders = () => {
      const orders = getOrders();

      if (!orders.length) {
        content.innerHTML = `<div class="notification-item">Você ainda não tem compras registradas.</div>`;
        return;
      }

      content.innerHTML = orders
        .slice()
        .reverse()
        .map((order) => `
          <div class="notification-item">
            <strong>Pedido ${order.id}</strong>
            <div>${order.date}</div>
            <div>Total: ${money(order.total)}</div>
            <div>${order.items.map((item) => `${item.name} (${item.qty})`).join(", ")}</div>
          </div>
        `)
        .join("");
    };

    if (openBtn) {
      openBtn.addEventListener("click", () => {
        renderOrders();
        panel.classList.add("open");
      });
    }

    if (closeBtn) {
      closeBtn.addEventListener("click", () => panel.classList.remove("open"));
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

  const setupCustomOrder = () => {
    const btn = document.getElementById("sendCustomOrderBtn");
    const textarea = document.getElementById("customOrderMessage");

    if (!btn || !textarea) return;

    btn.addEventListener("click", () => {
      const text = textarea.value.trim() || "Olá! Quero fazer uma encomenda.";
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, "_blank");
    });
  };

  const setupShipTo = () => {
    const btn = document.getElementById("shipToBtn");
    if (!btn) return;

    btn.addEventListener("click", () => {
      window.location.href = "login.html";
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

  const changeMainImage = (src, alt) => {
    const image = document.getElementById("mainProductImage");
    const zoomImage = document.getElementById("zoomImage");
    if (image) {
      image.src = src;
      image.alt = alt;
    }
    if (zoomImage) {
      zoomImage.src = src;
      zoomImage.alt = alt;
    }
  };

  const changePageProductQty = (delta) => {
    const qtyEl = document.getElementById("productQtyValue");
    if (!qtyEl) return;
    let qty = Number(qtyEl.textContent || 1) + delta;
    if (qty < 1) qty = 1;
    qtyEl.textContent = qty;
  };

  const addCurrentProductToCart = (productId) => {
    const qty = Number(document.getElementById("productQtyValue")?.textContent || 1);
    addToCart(productId, qty);
  };

  const buyCurrentProductNow = (productId) => {
    const qty = Number(document.getElementById("productQtyValue")?.textContent || 1);
    buyNow(productId, qty);
  };

  const setupImageZoom = () => {
    const box = document.getElementById("productMainImageBox");
    const image = document.getElementById("mainProductImage");
    const zoomPane = document.getElementById("productZoomPane");
    const zoomImage = document.getElementById("zoomImage");

    if (!box || !image || !zoomPane || !zoomImage) return;

    box.addEventListener("mouseenter", () => {
      zoomPane.classList.add("active");
    });

    box.addEventListener("mousemove", (e) => {
      const rect = box.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      zoomImage.style.transformOrigin = `${x}% ${y}%`;
    });

    box.addEventListener("mouseleave", () => {
      zoomPane.classList.remove("active");
      zoomImage.style.transformOrigin = "center center";
    });
  };

  const renderProductPage = () => {
    const wrap = document.getElementById("productPage");
    if (!wrap) return;

    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    const product = getProductById(id);

    if (!product) {
      wrap.innerHTML = `<div class="product-layout"><div class="product-main-card"><p class="empty-message">Produto não encontrado.</p></div></div>`;
      return;
    }

    const gallery = Array.isArray(product.images) && product.images.length ? product.images : [product.image];
    const related = PRODUCTS.filter((item) => item.id !== product.id && item.category === product.category).slice(0, 4);

    wrap.innerHTML = `
      <div class="product-layout">
        <section class="product-main-card">
          <div class="product-top-grid">
            <div class="product-gallery-side">
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

  <div class="product-zoom-float" id="productZoomPane">
    <img
      id="zoomImage"
      src="${gallery[0]}"
      alt="${product.name}"
      onerror="this.onerror=null;this.src='${fallbackImage(product.name)}';"
    />
  </div>
</div>

              <div class="product-zoom-pane" id="productZoomPane">
                <img
                  id="zoomImage"
                  src="${gallery[0]}"
                  alt="${product.name}"
                  onerror="this.onerror=null;this.src='${fallbackImage(product.name)}';"
                />
              </div>
            </div>

            <div class="product-info-side">
              <div class="product-meta-line">Novo | Estoque disponível</div>
              <h1 class="product-title-page">${product.name}</h1>

              <div class="price-row product-page-price-row">
                <span class="product-price">${money(product.price)}</span>
                ${product.oldPrice ? `<span class="product-old-price">${money(product.oldPrice)}</span>` : ""}
              </div>

              <div class="what-you-need-box">
                <h3>O que você precisa saber sobre este produto</h3>
                <ul>
                  ${Object.entries(product.specs || {}).slice(0, 6).map(([key, value]) => `<li><strong>${key}:</strong> ${value}</li>`).join("")}
                </ul>
              </div>
            </div>

            <aside class="product-buy-side">
              <div class="seller-stock">Estoque disponível<br><strong>${product.stock} unidades</strong></div>

              <div class="quantity-box product-qty-box">
                <span>Quantidade:</span>
                <button type="button" class="qty-btn" onclick="window.DI.changePageProductQty(-1)">−</button>
                <span class="qty-value" id="productQtyValue">1</span>
                <button type="button" class="qty-btn" onclick="window.DI.changePageProductQty(1)">+</button>
              </div>

              <button type="button" class="btn-primary full" onclick="window.DI.buyCurrentProductNow(${product.id})">Comprar agora</button>
              <button type="button" class="btn-secondary full" onclick="window.DI.addCurrentProductToCart(${product.id})">Adicionar ao carrinho</button>

              <div class="seller-box">
                <p><strong>Vendido por Domínio Informática</strong></p>
                <p>Loja da cidade • atendimento local</p>
              </div>

              <div class="trust-box">
                <p><strong>Devolução em 30 dias</strong></p>
                <p><strong>Compra garantida</strong></p>
              </div>
            </aside>
          </div>

          <div class="product-description-block">
            <h2>Sobre o produto</h2>
            <p>${product.description}</p>
          </div>

          <div class="product-specs-block">
            <h2>Características do produto</h2>
            <div class="product-specs-grid">
              ${Object.entries(product.specs || {}).map(([key, value]) => `
                <div class="spec-item">
                  <strong>${key}</strong>
                  <span>${value}</span>
                </div>
              `).join("")}
            </div>
          </div>

          <div class="product-gallery-block">
            <h2>Fotos do produto</h2>
            <div class="product-large-photos">
              ${gallery.map((img) => `
                <div class="product-large-photo">
                  <img src="${img}" alt="${product.name}" onerror="this.onerror=null;this.src='${fallbackImage(product.name)}';" />
                </div>
              `).join("")}
            </div>
          </div>
        </section>

        <aside class="product-right-ads">
          <div class="ad-box">
            <h3>Publicidade Domínio</h3>
            <p>Divulgue promoções, banners e avisos da sua loja aqui.</p>
          </div>

          <div class="ad-box">
            <h3>Produtos relacionados</h3>
            <div class="related-products-side">
              ${related.map((item) => `
                <a href="product.html?id=${item.id}" class="related-side-card">
                  <img src="${item.image}" alt="${item.name}" onerror="this.onerror=null;this.src='${fallbackImage(item.name)}';" />
                  <div>
                    <strong>${item.name}</strong>
                    <p>${money(item.price)}</p>
                  </div>
                </a>
              `).join("")}
            </div>
          </div>

          <div class="ad-box">
            <h3>Publicidade Domínio</h3>
            <p>Aqui você pode colocar informações da loja, promoções e meios de pagamento.</p>
          </div>
        </aside>
      </div>
    `;

    setupImageZoom();
  };

  const renderCartPage = () => {
    const wrap = document.getElementById("cartItemsPage");
    const productsEl = document.getElementById("cartSummaryProducts");
    const totalEl = document.getElementById("cartSummaryTotal");
    if (!wrap) return;

    const items = getCartDetailed();

    if (!items.length) {
      wrap.innerHTML = `<p class="empty-message">Seu carrinho está vazio.</p>`;
      if (productsEl) productsEl.textContent = money(0);
      if (totalEl) totalEl.textContent = money(0);
      return;
    }

    wrap.innerHTML = items.map((item) => `
      <div class="cart-item-row">
        <label class="cart-check-wrap">
          <input type="checkbox" ${item.selected !== false ? "checked" : ""} onchange="window.DI.toggleCartItem(${item.product.id}, this.checked)" />
        </label>

        <div class="cart-item-image">
          <img src="${item.product.image}" alt="${item.product.name}" onerror="this.onerror=null;this.src='${fallbackImage(item.product.name)}';" />
        </div>

        <div class="cart-item-info">
          <strong>${item.product.name}</strong>
          <p>${item.product.shortDescription || ""}</p>
        </div>

        <div class="cart-item-qty">
          <button type="button" class="qty-btn" onclick="window.DI.changeCartQty(${item.product.id}, -1)">−</button>
          <span>${item.qty}</span>
          <button type="button" class="qty-btn" onclick="window.DI.changeCartQty(${item.product.id}, 1)">+</button>
        </div>

        <div class="cart-item-price">${money(item.total)}</div>

        <button type="button" class="cart-delete-btn" onclick="window.DI.removeCartItem(${item.product.id})">🗑️</button>
      </div>
    `).join("");

    const selectedItems = items.filter(item => item.selected !== false);
    const total = selectedItems.reduce((sum, item) => sum + item.total, 0);

    if (productsEl) productsEl.textContent = money(total);
    if (totalEl) totalEl.textContent = money(total);
  };

  const changeCartQty = (productId, delta) => {
    const cart = getCart();
    const item = cart.find((i) => i.productId === productId);
    if (!item) return;

    item.qty += delta;
    if (item.qty < 1) item.qty = 1;

    saveCart(cart);
    updateCartCount();
    renderCartPage();
    renderCheckoutSummary();
  };

  const removeCartItem = (productId) => {
    const cart = getCart().filter((i) => i.productId !== productId);
    saveCart(cart);
    updateCartCount();
    renderCartPage();
    renderCheckoutSummary();
  };

  const toggleCartItem = (productId, checked) => {
    const cart = getCart();
    const item = cart.find((i) => i.productId === productId);
    if (!item) return;

    item.selected = checked;
    saveCart(cart);
    renderCartPage();
  };

  const getSelectedCartDetailed = () => {
    return getCartDetailed().filter(item => item.selected !== false);
  };

  const getSelectedCartTotal = () => {
    return getSelectedCartDetailed().reduce((sum, item) => sum + item.total, 0);
  };

  const renderCheckoutUserData = () => {
    const box = document.getElementById("checkoutUserData");
    if (!box) return;

    const user = getUser();
    if (!user) {
      box.innerHTML = `
        <div class="checkout-user-empty">
          <p>Você ainda não está logado.</p>
          <a href="login.html" class="btn-primary">Entrar / Cadastro</a>
        </div>
      `;
      return;
    }

    box.innerHTML = `
      <div class="checkout-user-card">
        <p><strong>${user.name}</strong></p>
        <p>${user.email}</p>
        <p>${user.phone}</p>
        <p>${[user.street, user.number, user.neighborhood].filter(Boolean).join(", ")}</p>
        <p>${[user.city, user.state].filter(Boolean).join(" / ")}</p>
      </div>
    `;
  };

  const renderCheckoutSummary = () => {
    const itemsWrap = document.getElementById("checkoutItems");
    const subtotalEl = document.getElementById("checkoutSubtotal");
    const totalEl = document.getElementById("checkoutTotal");
    if (!itemsWrap) return;

    const items = getSelectedCartDetailed();

    if (!items.length) {
      itemsWrap.innerHTML = `<p class="empty-message">Nenhum item selecionado no carrinho.</p>`;
      if (subtotalEl) subtotalEl.textContent = money(0);
      if (totalEl) totalEl.textContent = money(0);
      return;
    }

    itemsWrap.innerHTML = items.map((item) => `
      <div class="checkout-item-card">
        <img src="${item.product.image}" alt="${item.product.name}" onerror="this.onerror=null;this.src='${fallbackImage(item.product.name)}';" />
        <div>
          <strong>${item.product.name}</strong>
          <p>${item.qty} x ${money(item.product.price)}</p>
          <p><strong>${money(item.total)}</strong></p>
        </div>
      </div>
    `).join("");

    const total = getSelectedCartTotal();
    if (subtotalEl) subtotalEl.textContent = money(total);
    if (totalEl) totalEl.textContent = money(total);

    updateInstallmentSimulation();
  };

  const setupCheckoutOptions = () => {
    const deliveryRadios = document.querySelectorAll('input[name="deliveryType"]');
    const paymentRadios = document.querySelectorAll('input[name="paymentMethod"]');
    const deliveryFields = document.getElementById("deliveryFields");
    const pixBox = document.getElementById("pixBox");
    const cashBox = document.getElementById("cashBox");
    const cardBox = document.getElementById("cardBox");

    deliveryRadios.forEach((radio) => {
      radio.addEventListener("change", () => {
        document.querySelectorAll('input[name="deliveryType"]').forEach((input) => {
          input.closest(".checkout-option-card")?.classList.remove("selected");
        });
        radio.closest(".checkout-option-card")?.classList.add("selected");

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
          input.closest(".checkout-option-card")?.classList.remove("selected");
        });
        radio.closest(".checkout-option-card")?.classList.add("selected");

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

    const total = getSelectedCartTotal();
    const installments = Number(select.value || 1);
    const fee = getCardFee(installments);
    const totalWithFee = fee > 0 ? total * (1 + fee / 100) : total;
    const installmentValue = installments ? totalWithFee / installments : totalWithFee;

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
        } catch (error) {
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
    const cartItems = getSelectedCartDetailed();

    if (!user) {
      alert("Você precisa entrar ou fazer cadastro antes de finalizar.");
      window.location.href = "login.html";
      return;
    }

    if (!cartItems.length) {
      alert("Nenhum item selecionado no carrinho.");
      return;
    }

    const deliveryType = document.querySelector('input[name="deliveryType"]:checked')?.value || "retirada";
    const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked')?.value || "pix";
    const notes = document.getElementById("checkoutNotes")?.value.trim() || "Nenhuma";

    let deliveryText = "Retirada na loja";
    if (deliveryType === "entrega") {
      deliveryText =
        `Entrega\n` +
        `Rua: ${document.getElementById("checkoutStreet")?.value || ""}\n` +
        `Número: ${document.getElementById("checkoutNumber")?.value || ""}\n` +
        `Bairro: ${document.getElementById("checkoutNeighborhood")?.value || ""}\n` +
        `Referência: ${document.getElementById("checkoutReference")?.value || ""}\n` +
        `Local de trabalho: ${document.getElementById("checkoutWorkplace")?.value || ""}`;
    }

    let paymentText = "Pix";
    if (paymentMethod === "dinheiro") {
      paymentText = `Dinheiro\nTroco para: ${document.getElementById("cashChange")?.value || "Não informado"}`;
    }
    if (paymentMethod === "cartao") {
      const installments = Number(document.getElementById("installments")?.value || 1);
      paymentText = `Cartão\nParcelamento: ${installments}x`;
    }

    const itemsText = cartItems.map((item) =>
      `• ${item.product.name} | Qtd: ${item.qty} | Total: ${money(item.total)}`
    ).join("\n");

    const total = getSelectedCartTotal();

    const order = {
      id: `#${Date.now()}`,
      date: new Date().toLocaleString("pt-BR"),
      total,
      items: cartItems.map((item) => ({
        name: item.product.name,
        qty: item.qty
      }))
    };

    const orders = getOrders();
    orders.push(order);
    saveOrders(orders);

    const message =
      `Olá! Quero finalizar meu pedido.\n\n` +
      `Cliente: ${user.name}\n` +
      `E-mail: ${user.email}\n` +
      `Telefone: ${user.phone}\n\n` +
      `Itens:\n${itemsText}\n\n` +
      `Recebimento:\n${deliveryText}\n\n` +
      `Pagamento:\n${paymentText}\n\n` +
      `Observações: ${notes}\n\n` +
      `Total: ${money(total)}`;

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank");
  };

  window.DI = {
    addToCart,
    buyNow,
    applyCategoryFilter,
    scrollToSection,
    changeMainImage,
    changePageProductQty,
    addCurrentProductToCart,
    buyCurrentProductNow,
    changeCartQty,
    removeCartItem,
    toggleCartItem
  };

 document.addEventListener("DOMContentLoaded", () => {
  updateHeaderUser();
  updateCartCount();
  setupAccountDropdown();
  renderSystems();
    if (typeof PRODUCTS !== "undefined" && document.getElementById("allProducts")) {
      renderHomeProducts(PRODUCTS, "Todos os produtos", "Mostrando todos os itens cadastrados.");
    }
    renderProductPage();
    renderCartPage();
    setupNavButtons();
    setupSearch();
    applySearchFromUrl();
    setupSlider();
    setupNotifications();
    setupOrdersPanel();
    setupDomBot();
    setupCustomOrder();
    setupShipTo();
    setupLogout();

    renderCheckoutUserData();
    renderCheckoutSummary();
    setupCheckoutOptions();
    setupPixCopy();

    const installments = document.getElementById("installments");
    if (installments) installments.addEventListener("change", updateInstallmentSimulation);

    const finishBtn = document.getElementById("finishOrderBtn");
    if (finishBtn) finishBtn.addEventListener("click", finishOrder);
  });
})();
