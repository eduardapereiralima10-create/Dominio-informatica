(function () {
  const money = (value) =>
    Number(value || 0).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

  const fallbackImage = (name = "Produto") => {
    const text = encodeURIComponent(name);
    return `data:image/svg+xml;utf8,
      <svg xmlns='http://www.w3.org/2000/svg' width='500' height='500'>
        <rect width='100%25' height='100%25' fill='%23f3f7fb'/>
        <rect x='25' y='25' width='450' height='450' rx='26' fill='%23ffffff' stroke='%23d9e2ef'/>
        <text x='50%25' y='48%25' dominant-baseline='middle' text-anchor='middle'
          font-family='Arial' font-size='24' fill='%230a4ea3'>${text}</text>
        <text x='50%25' y='58%25' dominant-baseline='middle' text-anchor='middle'
          font-family='Arial' font-size='16' fill='%23667085'>Imagem do produto</text>
      </svg>`;
  };

  const getCart = () => JSON.parse(localStorage.getItem("di_cart") || "[]");
  const saveCart = (cart) => localStorage.setItem("di_cart", JSON.stringify(cart));

  const getUser = () => JSON.parse(localStorage.getItem("di_user") || "null");
  const saveUser = (user) => localStorage.setItem("di_user", JSON.stringify(user));

  const getWishlist = () => JSON.parse(localStorage.getItem("di_wishlist") || "[]");
  const saveWishlist = (list) => localStorage.setItem("di_wishlist", JSON.stringify(list));

  const getProductByIdSafe = (id) => {
    if (typeof getProductById === "function") {
      return getProductById(id);
    }
    return PRODUCTS.find((product) => product.id === Number(id));
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
    renderCartDrawer();
    renderCheckoutSummary();
  };

  const removeFromCart = (productId) => {
    const cart = getCart().filter((item) => item.productId !== productId);
    saveCart(cart);
    updateCartCount();
    renderCartDrawer();
    renderCheckoutSummary();
  };

  const changeQty = (productId, delta) => {
    const cart = getCart()
      .map((item) => {
        if (item.productId === productId) {
          return { ...item, qty: item.qty + delta };
        }
        return item;
      })
      .filter((item) => item.qty > 0);

    saveCart(cart);
    updateCartCount();
    renderCartDrawer();
    renderCheckoutSummary();
  };

  const clearCart = () => {
    saveCart([]);
    updateCartCount();
    renderCartDrawer();
    renderCheckoutSummary();
  };

  const getCartDetailed = () => {
    const cart = getCart();

    return cart
      .map((item) => {
        const product = getProductByIdSafe(item.productId);
        if (!product) return null;

        return {
          ...item,
          product,
          total: Number(product.price || 0) * Number(item.qty || 0),
        };
      })
      .filter(Boolean);
  };

  const getCartTotal = () =>
    getCartDetailed().reduce((sum, item) => sum + item.total, 0);

  const updateCartCount = () => {
    const count = getCart().reduce((sum, item) => sum + Number(item.qty || 0), 0);
    const countElements = document.querySelectorAll("#cartCount, .cart-count");

    countElements.forEach((el) => {
      el.textContent = count;
    });
  };

  const openCart = () => {
    const drawer = document.getElementById("cartDrawer");
    const overlay = document.getElementById("drawerOverlay");

    if (drawer) drawer.classList.add("open");
    if (overlay) overlay.classList.add("show");
  };

  const closeCart = () => {
    const drawer = document.getElementById("cartDrawer");
    const overlay = document.getElementById("drawerOverlay");

    if (drawer) drawer.classList.remove("open");
    if (overlay) overlay.classList.remove("show");
  };

  const renderCartDrawer = () => {
    const cartItems = document.getElementById("cartItems");
    const subtotalEl = document.getElementById("cartSubtotal");
    const totalEl = document.getElementById("cartTotal");

    if (!cartItems) return;

    const items = getCartDetailed();

    if (!items.length) {
      cartItems.innerHTML = `<p>Seu carrinho está vazio.</p>`;
      if (subtotalEl) subtotalEl.textContent = money(0);
      if (totalEl) totalEl.textContent = money(0);
      return;
    }

    cartItems.innerHTML = items
      .map(
        (item) => `
          <div class="cart-item">
            <img
              src="${item.product.image}"
              alt="${item.product.name}"
              onerror="this.onerror=null;this.src='${fallbackImage(item.product.name)}';"
            />

            <div>
              <h4>${item.product.name}</h4>
              <p>Código: ${item.product.code || "-"}</p>
              <p><strong>${money(item.product.price)}</strong></p>

              <div class="cart-item-controls">
                <button class="qty-btn" onclick="window.DI.changeQty(${item.product.id}, -1)">−</button>
                <strong>${item.qty}</strong>
                <button class="qty-btn" onclick="window.DI.changeQty(${item.product.id}, 1)">+</button>
                <button class="remove-btn" onclick="window.DI.removeFromCart(${item.product.id})">Remover</button>
              </div>
            </div>
          </div>
        `
      )
      .join("");

    const total = getCartTotal();
    if (subtotalEl) subtotalEl.textContent = money(total);
    if (totalEl) totalEl.textContent = money(total);
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
        <span class="product-code">Código: ${product.code || "-"}</span>
        <a href="produto.html?id=${product.id}" class="product-title">${product.name}</a>
        <span class="product-category">${product.category || ""}</span>

        <div class="price-row">
          <span class="product-price">${money(product.price)}</span>
          ${
            product.oldPrice
              ? `<span class="product-old-price">${money(product.oldPrice)}</span>`
              : ""
          }
        </div>

        <span class="stock">Em estoque: ${product.stock ?? 0}</span>

        <div class="product-actions">
          <button class="small-btn primary" onclick="window.DI.addToCart(${product.id}); window.DI.openCart();">
            Adicionar ao carrinho
          </button>
          <button class="small-btn secondary" onclick="window.DI.buyNow(${product.id})">
            Comprar agora
          </button>
        </div>
      </div>
    </article>
  `;

  const renderHomeProducts = (products = PRODUCTS) => {
    const featured = document.getElementById("featuredProducts");
    const all = document.getElementById("allProducts");

    if (featured) {
      featured.innerHTML = products.slice(0, 8).map(productCardHTML).join("");
    }

    if (all) {
      all.innerHTML = products.map(productCardHTML).join("");
    }
  };

  const filterProducts = (search = "", category = "todos") => {
    const term = String(search || "").trim().toLowerCase();

    return PRODUCTS.filter((product) => {
      const productCategory = String(product.category || "").toLowerCase();
      const productName = String(product.name || "").toLowerCase();
      const productCode = String(product.code || "").toLowerCase();
      const productBrand = String(product.brand || "").toLowerCase();

      const matchCategory =
        category === "todos" || productCategory === String(category).toLowerCase();

      const matchSearch =
        !term ||
        productName.includes(term) ||
        productCode.includes(term) ||
        productBrand.includes(term) ||
        productCategory.includes(term);

      return matchCategory && matchSearch;
    });
  };

  const renderProductPage = () => {
    const wrap = document.getElementById("productPage");
    if (!wrap) return;

    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    const product = getProductByIdSafe(id);

    if (!product) {
      wrap.innerHTML = `<p>Produto não encontrado.</p>`;
      return;
    }

    const gallery = Array.isArray(product.images) && product.images.length
      ? product.images
      : [product.image];

    wrap.innerHTML = `
      <div class="product-layout">
        <div class="product-gallery">
          <img
            id="mainProductImage"
            src="${gallery[0]}"
            alt="${product.name}"
            onerror="this.onerror=null;this.src='${fallbackImage(product.name)}';"
          />

          ${
            gallery.length > 1
              ? `
                <div class="product-thumbs" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(70px,1fr));gap:10px;margin-top:14px;">
                  ${gallery
                    .map(
                      (img) => `
                        <button
                          type="button"
                          class="thumb-btn"
                          style="border:1px solid #d9e2ef;border-radius:12px;padding:6px;background:#fff;cursor:pointer;"
                          onclick="window.DI.changeMainImage('${img.replace(/'/g, "\\'")}', '${product.name.replace(/'/g, "\\'")}')"
                        >
                          <img
                            src="${img}"
                            alt="${product.name}"
                            style="width:100%;height:60px;object-fit:contain;"
                            onerror="this.onerror=null;this.src='${fallbackImage(product.name)}';"
                          />
                        </button>
                      `
                    )
                    .join("")}
                </div>
              `
              : ""
          }
        </div>

        <div class="product-info">
          <div class="product-meta">
            <span>Código: ${product.code || "-"}</span>
            <span>Marca: ${product.brand || "-"}</span>
            <span>Categoria: ${product.category || "-"}</span>
          </div>

          <h1>${product.name}</h1>
          <p>${product.shortDescription || product.description || ""}</p>

          <div class="price-row">
            <span class="product-price">${money(product.price)}</span>
            ${
              product.oldPrice
                ? `<span class="product-old-price">${money(product.oldPrice)}</span>`
                : ""
            }
          </div>

          <p class="stock">Disponível em estoque: ${product.stock ?? 0}</p>

          <div class="product-tags">
            <span class="tag">Saiba mais</span>
            <span class="tag">Recursos e benefícios</span>
            <span class="tag">Conheça a interface</span>
          </div>

          <div class="product-cta">
            <button class="btn-primary" onclick="window.DI.addToCart(${product.id}); window.DI.openCart();">
              Adicionar ao carrinho
            </button>
            <button class="btn-secondary" onclick="window.DI.buyNow(${product.id})">
              Comprar agora
            </button>
          </div>

          <div class="product-tabs">
            <div class="product-tab-box">
              <h3>Saiba mais</h3>
              <p>${product.description || ""}</p>
            </div>

            <div class="product-tab-box">
              <h3>Recursos e benefícios</h3>
              <ul>
                ${(product.specs || []).map((spec) => `<li>${spec}</li>`).join("")}
              </ul>
            </div>

            <div class="product-tab-box">
              <h3>Conheça a interface</h3>
              <p>
                Produto ideal para seu ambiente, com compra facilitada, visual organizado
                e integração com WhatsApp no site da Domínio Informática.
              </p>
            </div>
          </div>
        </div>
      </div>
    `;
  };

  const changeMainImage = (src, alt) => {
    const mainImage = document.getElementById("mainProductImage");
    if (!mainImage) return;

    mainImage.src = src;
    mainImage.alt = alt;
  };

  const buyNow = (productId) => {
    saveCart([{ productId, qty: 1 }]);
    updateCartCount();
    window.location.href = "checkout.html";
  };

  const setupSearchAndCategory = () => {
    const searchForm = document.getElementById("searchForm");
    const searchInput = document.getElementById("searchInput");
    const categoryButtons = document.querySelectorAll(".nav-chip");

    let currentCategory = "todos";

    if (searchForm && searchInput) {
      searchForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const filtered = filterProducts(searchInput.value, currentCategory);
        renderHomeProducts(filtered);
      });

      searchInput.addEventListener("input", () => {
        const filtered = filterProducts(searchInput.value, currentCategory);
        renderHomeProducts(filtered);
      });
    }

    if (categoryButtons.length) {
      categoryButtons.forEach((button) => {
        button.addEventListener("click", () => {
          categoryButtons.forEach((btn) => btn.classList.remove("active"));
          button.classList.add("active");

          currentCategory = button.dataset.category || "todos";

          const term = searchInput ? searchInput.value : "";
          const filtered = filterProducts(term, currentCategory);
          renderHomeProducts(filtered);
        });
      });
    }
  };

  const setupCartEvents = () => {
    const openBtn = document.getElementById("openCartBtn");
    const closeBtn = document.getElementById("closeCartBtn");
    const overlay = document.getElementById("drawerOverlay");
    const clearBtn = document.getElementById("clearCartBtn");

    if (openBtn) openBtn.addEventListener("click", openCart);
    if (closeBtn) closeBtn.addEventListener("click", closeCart);
    if (overlay) overlay.addEventListener("click", closeCart);
    if (clearBtn) clearBtn.addEventListener("click", clearCart);
  };

  const setupRequestForm = () => {
    const form = document.getElementById("requestForm");
    if (!form) return;

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.getElementById("requestName")?.value.trim() || "";
      const product = document.getElementById("requestProduct")?.value.trim() || "";
      const details = document.getElementById("requestDetails")?.value.trim() || "";

      const text = `Olá! Meu nome é ${name}. Quero fazer uma encomenda.

Produto: ${product}
Detalhes: ${details || "Não informado"}`;

      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, "_blank");
    });
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

      const name = document.getElementById("loginName")?.value.trim() || "";
      const email = document.getElementById("loginEmail")?.value.trim() || "";
      const phone = document.getElementById("loginPhone")?.value.trim() || "";

      saveUser({ name, email, phone });
      alert("Login realizado com sucesso.");
      window.location.href = "checkout.html";
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

    itemsWrap.innerHTML = items
      .map(
        (item) => `
          <div class="checkout-item">
            <img
              src="${item.product.image}"
              alt="${item.product.name}"
              onerror="this.onerror=null;this.src='${fallbackImage(item.product.name)}';"
            />
            <div>
              <strong>${item.product.name}</strong>
              <p>${item.qty} x ${money(item.product.price)}</p>
              <p><strong>${money(item.total)}</strong></p>
            </div>
          </div>
        `
      )
      .join("");

    const total = getCartTotal();
    if (subtotalEl) subtotalEl.textContent = money(total);
    if (totalEl) totalEl.textContent = money(total);

    updateInstallmentSimulation();
  };

  const renderCheckoutLoginStatus = () => {
    const status = document.getElementById("checkoutLoginStatus");
    if (!status) return;

    const user = getUser();

    if (!user) {
      status.innerHTML = `
        <p>Você precisa entrar antes de finalizar.</p>
        <a href="login.html" class="btn-primary">Entrar agora</a>
      `;
      return;
    }

    status.innerHTML = `
      <p><strong>${user.name}</strong></p>
      <p>${user.email}</p>
      <p>${user.phone}</p>
    `;
  };

  const setupDeliveryOptions = () => {
    const radios = document.querySelectorAll('input[name="deliveryType"]');
    const fields = document.getElementById("deliveryFields");
    const cards = document.querySelectorAll(".option-card");

    if (!radios.length || !fields) return;

    radios.forEach((radio) => {
      radio.addEventListener("change", () => {
        cards.forEach((card) => card.classList.remove("selected"));

        const card = radio.closest(".option-card");
        if (card) card.classList.add("selected");

        if (radio.value === "entrega") {
          fields.classList.remove("hidden");
        } else {
          fields.classList.add("hidden");
        }
      });
    });
  };

  const getCardFee = (installments) => {
    const fees = {
      8: 16.09,
      9: 16.69,
      10: 17.39,
      11: 18.39,
      12: 18.79,
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

    const finalTotal = fee > 0 ? total * (1 + fee / 100) : total;
    const perInstallment = finalTotal / installments;

    result.textContent = `Total no cartão: ${money(finalTotal)} • ${installments}x de ${money(perInstallment)}`;
  };

  const setupPaymentOptions = () => {
    const radios = document.querySelectorAll('input[name="paymentMethod"]');
    const cards = document.querySelectorAll(".payment-card");
    const pixBox = document.getElementById("pixBox");
    const cashBox = document.getElementById("cashBox");
    const cardBox = document.getElementById("cardBox");
    const combineBox = document.getElementById("combineBox");
    const installments = document.getElementById("installments");
    const copyPixKeyBtn = document.getElementById("copyPixKeyBtn");
    const pixKey = document.getElementById("pixKey");
    const alreadyPaidBtn = document.getElementById("alreadyPaidBtn");

    if (!radios.length) return;

    const toggleBoxes = (method) => {
      [pixBox, cashBox, cardBox, combineBox].forEach((box) => {
        if (box) box.classList.add("hidden");
      });

      if (method === "pix" && pixBox) pixBox.classList.remove("hidden");
      if (method === "dinheiro" && cashBox) cashBox.classList.remove("hidden");
      if (method === "cartao" && cardBox) cardBox.classList.remove("hidden");
      if (method === "combinar" && combineBox) combineBox.classList.remove("hidden");
    };

    radios.forEach((radio) => {
      radio.addEventListener("change", () => {
        cards.forEach((card) => card.classList.remove("selected"));

        const selectedCard = radio.closest(".payment-card");
        if (selectedCard) selectedCard.classList.add("selected");

        toggleBoxes(radio.value);
        updateInstallmentSimulation();
      });
    });

    if (installments) {
      installments.addEventListener("change", updateInstallmentSimulation);
      updateInstallmentSimulation();
    }

    if (copyPixKeyBtn && pixKey) {
      copyPixKeyBtn.addEventListener("click", async () => {
        try {
          await navigator.clipboard.writeText(pixKey.value);
          alert("Chave Pix copiada.");
        } catch (error) {
          alert("Não foi possível copiar automaticamente. Copie manualmente.");
        }
      });
    }

    if (alreadyPaidBtn) {
      alreadyPaidBtn.addEventListener("click", () => {
        const text = "Olá! Já realizei o pagamento via Pix e vou enviar o comprovante.";
        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, "_blank");
      });
    }
  };

  const finishOrder = () => {
    const user = getUser();
    if (!user) {
      alert("Você precisa entrar antes de finalizar.");
      window.location.href = "login.html";
      return;
    }

    const cart = getCartDetailed();
    if (!cart.length) {
      alert("Seu carrinho está vazio.");
      return;
    }

    const deliveryType =
      document.querySelector('input[name="deliveryType"]:checked')?.value || "retirada";

    const paymentMethod =
      document.querySelector('input[name="paymentMethod"]:checked')?.value || "pix";

    const itemsText = cart
      .map(
        (item) =>
          `• ${item.product.name} | Cód: ${item.product.code || "-"} | Qtd: ${item.qty} | Total: ${money(item.total)}`
      )
      .join("\n");

    let deliveryText = "Retirada na loja";

    if (deliveryType === "entrega") {
      const street = document.getElementById("addressStreet")?.value || "";
      const number = document.getElementById("addressNumber")?.value || "";
      const neighborhood = document.getElementById("addressNeighborhood")?.value || "";
      const reference = document.getElementById("addressReference")?.value || "";
      const workplace = document.getElementById("workplace")?.value || "";
      const deliveryTime = document.getElementById("deliveryTime")?.value || "";

      deliveryText =
        `Entrega no endereço:\n` +
        `Rua: ${street}, Nº ${number}\n` +
        `Bairro: ${neighborhood}\n` +
        `Referência: ${reference}\n` +
        `Local de trabalho: ${workplace}\n` +
        `Horário de atendimento: ${deliveryTime}`;
    }

    const total = getCartTotal();
    let paymentText = "";

    if (paymentMethod === "pix") {
      paymentText = `Pix\nChave Pix: ${PIX_KEY}`;
    }

    if (paymentMethod === "dinheiro") {
      const change = document.getElementById("cashChange")?.value || "Não informado";
      paymentText = `Dinheiro\nTroco para: ${change}`;
    }

    if (paymentMethod === "cartao") {
      const installments = Number(document.getElementById("installments")?.value || 1);
      const fee = getCardFee(installments);
      const finalTotal = fee > 0 ? total * (1 + fee / 100) : total;

      paymentText =
        `Cartão\n` +
        `Parcelamento: ${installments}x\n` +
        `Taxa aplicada: ${fee}%\n` +
        `Total no cartão: ${money(finalTotal)}`;
    }

    if (paymentMethod === "combinar") {
      const details = document.getElementById("combineDetails")?.value || "Não informado";
      paymentText = `Combinar 2 meios\nDetalhes: ${details}`;
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
      `Subtotal/Total: ${money(total)}`;

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank");
  };

  const setupCheckout = () => {
    renderCheckoutLoginStatus();
    renderCheckoutSummary();
    setupDeliveryOptions();
    setupPaymentOptions();

    const finishBtn = document.getElementById("finishOrderBtn");
    if (finishBtn) {
      finishBtn.addEventListener("click", finishOrder);
    }
  };

  const setupCarrinhoPage = () => {
    const list = document.getElementById("cartPageItems");
    const subtotal = document.getElementById("cartPageSubtotal");
    const total = document.getElementById("cartPageTotal");
    const checkoutBtn = document.getElementById("goToCheckoutBtn");

    if (!list) return;

    const items = getCartDetailed();

    if (!items.length) {
      list.innerHTML = "<p>Seu carrinho está vazio.</p>";
      if (subtotal) subtotal.textContent = money(0);
      if (total) total.textContent = money(0);
      return;
    }

    list.innerHTML = items
      .map(
        (item) => `
          <div class="cart-item">
            <img
              src="${item.product.image}"
              alt="${item.product.name}"
              onerror="this.onerror=null;this.src='${fallbackImage(item.product.name)}';"
            />
            <div>
              <h4>${item.product.name}</h4>
              <p>Código: ${item.product.code || "-"}</p>
              <p><strong>${money(item.product.price)}</strong></p>
              <div class="cart-item-controls">
                <button class="qty-btn" onclick="window.DI.changeQty(${item.product.id}, -1); window.DI.renderCarrinhoPage();">−</button>
                <strong>${item.qty}</strong>
                <button class="qty-btn" onclick="window.DI.changeQty(${item.product.id}, 1); window.DI.renderCarrinhoPage();">+</button>
                <button class="remove-btn" onclick="window.DI.removeFromCart(${item.product.id}); window.DI.renderCarrinhoPage();">Remover</button>
              </div>
            </div>
          </div>
        `
      )
      .join("");

    const totalValue = getCartTotal();
    if (subtotal) subtotal.textContent = money(totalValue);
    if (total) total.textContent = money(totalValue);

    if (checkoutBtn) {
      checkoutBtn.onclick = () => {
        window.location.href = "checkout.html";
      };
    }
  };

  window.DI = {
    addToCart,
    removeFromCart,
    changeQty,
    clearCart,
    openCart,
    closeCart,
    buyNow,
    changeMainImage,
    renderCarrinhoPage: setupCarrinhoPage,
  };

  document.addEventListener("DOMContentLoaded", () => {
    updateCartCount();
    renderCartDrawer();
    renderHomeProducts();
    renderProductPage();
    setupSearchAndCategory();
    setupCartEvents();
    setupRequestForm();
    setupDomBot();
    setupLogin();
    setupCheckout();
    setupCarrinhoPage();
  });
})();
