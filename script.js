const introScreen = document.querySelector(".intro-screen");
const menuScreen = document.querySelector("#menu-screen");
const continueLink = document.querySelector(".intro__continue");
const backButton = document.querySelector("#back-to-intro");
const backToTopButton = document.querySelector("#back-to-top");
const themeToggle = document.querySelector("#theme-toggle");
const themeToggleIcon = themeToggle.querySelector("i");
const languageButtons = document.querySelectorAll("[data-language]");
const cartCount = document.querySelector("#cart-count");
const searchInput = document.querySelector("#food-search");
const foodCards = document.querySelectorAll(".card");
const categoryBlocks = document.querySelectorAll(".category-block");
const cartTrigger = document.querySelector(".cart-icon");
const cartModal = document.querySelector("#cart-modal");
const closeCartButton = document.querySelector(".cart-dialog__close");
const cartItemsList = document.querySelector("#cart-items-list");
const cartTotal = document.querySelector("#cart-total");
const cardHideTimers = new WeakMap();
const cartItems = [];
let nextCartItemId = 1;
let currentLanguage = "uk";

const translations = {
  uk: {
    chooseLanguage: "Оберіть мову",
    switchToDark: "Увімкнути темну тему",
    switchToLight: "Увімкнути світлу тему",
    introTagline: "Особлива та смачна їжа",
    continue: "Перейти до меню",
    back: "На головну",
    backToTop: "На початок сторінки",
    discover: "Меню",
    headerEyebrow: "Смачного щодня",
    categoriesHeading: "Категорії",
    categoryNavigation: "Навігація за категоріями",
    chefPick: "Рекомендація шефа",
    chefLink: "Переглянути піцу",
    footerTagline: "Смачна їжа — у кілька кліків.",
    footerMenu: "Категорії меню",
    footerAppetizers: "Закуски",
    footerPizza: "Піца",
    footerBurgers: "Бургери та сендвічі",
    footerDrinks: "Напої",
    footerOrdering: "Як замовити",
    footerOrderText: "Оберіть страви, додайте їх до кошика та заповніть форму доставки.",
    footerCopyright: "© FOOD HUB. Усі права захищені.",
    openCart: "Відкрити кошик",
    searchFood: "Пошук страв",
    searchPlaceholder: "Знайти страву",
    addCart: "До кошика",
    cartTitle: "Ваше замовлення",
    closeCart: "Закрити кошик",
    emptyCart: "Кошик порожній",
    remove: "Видалити",
    total: "Разом",
    name: "Ім'я",
    namePlaceholder: "Ваше ім'я",
    phone: "Телефон",
    address: "Адреса доставки",
    addressPlaceholder: "Ваша адреса",
    checkout: "Оформити доставку",
    currency: "грн",
    categories: {
      "appetizers-category-title": "Закуски",
      "pasta-dishes-category-title": "Страви з пасти",
      "pizza-category-title": "Піца",
      "burgers-category-title": "Бургери та сендвічі",
      "main-course-category-title": "Основні страви",
      "sweet-category-title": "Десерти",
      "drinks-category-title": "Напої",
    },
  },
  en: {
    chooseLanguage: "Choose language",
    switchToDark: "Switch to dark mode",
    switchToLight: "Switch to light mode",
    introTagline: "Special & Delicious food",
    continue: "Go to the menu",
    back: "Back to intro",
    backToTop: "Back to top",
    discover: "Discover",
    headerEyebrow: "GOOD FOOD, GOOD MOOD",
    categoriesHeading: "Categories",
    categoryNavigation: "Browse menu categories",
    chefPick: "Chef's recommendation",
    chefLink: "Explore pizzas",
    footerTagline: "Delicious food, just a few clicks away.",
    footerMenu: "Menu categories",
    footerAppetizers: "Appetizers",
    footerPizza: "Pizza",
    footerBurgers: "Burgers & Sandwiches",
    footerDrinks: "Drinks",
    footerOrdering: "How to order",
    footerOrderText: "Choose your dishes, add them to the cart, and fill out the delivery form.",
    footerCopyright: "© FOOD HUB. All rights reserved.",
    openCart: "Open cart",
    searchFood: "Search food",
    searchPlaceholder: "Search Food Here",
    addCart: "Add to Cart",
    cartTitle: "Your order",
    closeCart: "Close cart",
    emptyCart: "Your cart is empty",
    remove: "Remove",
    total: "Total",
    name: "Name",
    namePlaceholder: "Your name",
    phone: "Phone",
    address: "Delivery address",
    addressPlaceholder: "Your address",
    checkout: "Place order",
    currency: "UAH",
    categories: {
      "appetizers-category-title": "Appetizers",
      "pasta-dishes-category-title": "Pasta Dishes",
      "pizza-category-title": "Pizza",
      "burgers-category-title": "Burgers & Sandwiches",
      "main-course-category-title": "Main Course",
      "sweet-category-title": "Desserts",
      "drinks-category-title": "Drinks",
    },
  },
};

const products = {
  "Crispy Chicken Wings": {
    ukName: "Хрусткі курячі крильця",
    en: "Crispy chicken wings, fried until golden and served with a spicy sauce.",
  },
  "Chicken Nuggets": {
    ukName: "Курячі нагетси",
    en: "Tender chicken breast in a crispy coating, served with sauce.",
  },
  "Crispy Onion Rings": {
    ukName: "Хрусткі цибулеві кільця",
    en: "Juicy onion rings in a light golden coating, served with sauce.",
  },
  "Mozzarella Sticks": {
    ukName: "Палички моцарели",
    en: "Mozzarella sticks in a crispy coating, served with tomato sauce.",
  },
  "French Fries": {
    ukName: "Картопля фрі",
    en: "Crispy golden fries served with tomato sauce.",
  },
  "Grilled Chicken Skewers": {
    ukName: "Курячі шашлички",
    en: "Grilled chicken fillet with aromatic spices and dipping sauces.",
  },
  Noodles: {
    ukName: "Локшина",
    en: "Noodles with vegetables and a spicy sauce, topped with sesame and fresh herbs.",
  },
  "Pasta Brunch": {
    ukName: "Паста з томатами",
    en: "Pasta with cherry tomatoes, aromatic herbs, and grated Parmesan.",
  },
  "Pasta with Prawns": {
    ukName: "Паста з креветками",
    en: "Linguine with juicy prawns, garlic, and herbs in a light sauce.",
  },
  "Pasta Carbonara": {
    ukName: "Паста Карбонара",
    en: "Spaghetti with creamy egg sauce, crispy pancetta, and Parmesan.",
  },
  "Pizza Pepperoni": {
    ukName: "Піца Пепероні",
    en: "Hot pizza with melted mozzarella and spicy pepperoni.",
  },
  "Pepperoni Pizza": {
    ukName: "Піца Пепероні з грибами",
    en: "Pizza with sausage, mushrooms, olives, and mozzarella, served with sauces and cola.",
  },
  "Pizza Margherita": {
    ukName: "Піца Маргарита",
    en: "Classic Italian pizza with fresh tomatoes, tomato sauce, and aromatic basil.",
  },
  "Pizza Four Cheeses": {
    ukName: "Піца Чотири сири",
    en: "A premium blend of four fine cheeses: mozzarella, gorgonzola, Parmesan, and blue cheese.",
  },
  "Pizza BBQ Chicken": {
    ukName: "Піца BBQ з куркою",
    uk: "Копчена куряча грудка, бекон, соковита кукурудза та фірмовий соус барбекю.",
    en: "Smoked chicken breast, bacon, juicy corn, and our signature barbecue sauce.",
  },
  "Pizza Vegetarian": {
    ukName: "Вегетаріанська піца",
    en: "Pizza with mushrooms, tomatoes, mozzarella, peppers, and olives.",
  },
  "Premium Beef Burger": {
    ukName: "Фірмовий бургер з яловичиною",
    en: "Prime beef patty, cheddar, bacon, fresh vegetables, and house sauce in a sesame bun.",
  },
  "Double Beef Burger": {
    ukName: "Подвійний бургер з яловичиною",
    en: "Two beef patties with cheddar, lettuce, tomatoes, pickles, and house sauce.",
  },
  "Chicken Club Sandwich": {
    ukName: "Клаб-сендвіч із куркою",
    en: "Toasted bread with chicken, cheese, crisp lettuce, tomatoes, and a creamy sauce.",
  },
  "Grilled Veggie Sandwich": {
    ukName: "Сендвіч з овочами-гриль",
    en: "Golden grilled sandwich with cheese, juicy vegetables, and aromatic sauce.",
  },
  "Salmon Steak": {
    ukName: "Стейк із лосося",
    en: "Tender salmon steak with vegetables and herbs in our signature sauce.",
  },
  "Grilled Steak": {
    ukName: "Стейк на грилі",
    en: "Juicy grilled steak with vegetables, potatoes, and aromatic sauce.",
  },
  "Prawns in Savory Sauce": {
    ukName: "Креветки у фірмовому соусі",
    en: "Juicy prawns in a rich sauce with rice, spring onions, and fresh herbs.",
  },
  "Grilled Meat Platter": {
    ukName: "М'ясне асорті на грилі",
    en: "Grilled meats served with fries, vegetables, and barbecue sauce.",
  },
  Custard: {
    ukName: "Ванільний крем",
    en: "Silky vanilla custard with a creamy flavor, topped with fresh strawberries.",
  },
  "Apple Pie": {
    ukName: "Яблучний пиріг",
    en: "Fragrant pie filled with juicy apples and cinnamon under a crisp golden crust.",
  },
  Pastries: {
    ukName: "Свіжа випічка",
    en: "An assortment of delicate fresh pastries, perfect with coffee or tea.",
  },
  "Chocolate Fondant": {
    ukName: "Шоколадний фондан",
    en: "Warm chocolate dessert with a soft molten center and rich cocoa flavor.",
  },
  Cheesecake: {
    ukName: "Чізкейк",
    en: "Velvety cheesecake on a delicate base with a subtle creamy note.",
  },
  "Strawberry Macarons": {
    ukName: "Полуничні макарони",
    en: "Airy almond pastries with crisp shells and a delicate strawberry filling.",
  },
  "Craft Berry Lemonade (Bottle)": {
    ukName: "Ягідний лимонад (пляшка)",
    en: "Craft berry lemonade served in a bottle.",
  },
  "Iced Latte Macchiato (Thermo Cup)": {
    ukName: "Айс-лате макіато (термочашка)",
    en: "Chilled latte macchiato in an insulated cup.",
  },
  "Fresh Orange Juice (Bottle)": {
    ukName: "Апельсиновий сік (пляшка)",
    en: "Freshly squeezed orange juice served in a bottle.",
  },
  "Coca-Cola Zero": {
    ukName: "Coca-Cola Zero",
    en: "Chilled Coca-Cola Zero.",
  },
  "Fanta Orange (Can)": {
    ukName: "Fanta Orange (банка)",
    en: "Chilled Fanta Orange in a can.",
  },
  "Borjomi Mineral Water (Glass)": {
    ukName: "Мінеральна вода Borjomi (скло)",
    en: "Borjomi mineral water in a glass bottle.",
  },
  "Bonaqua Still Water (Plastic)": {
    ukName: "Негазована вода Bonaqua (пластик)",
    en: "Still Bonaqua water in a plastic bottle.",
  },
  "Cold Brew Coffee (Bottle)": {
    ukName: "Кава cold brew (пляшка)",
    en: "Cold brew coffee served in a bottle.",
  },
};

function applyLanguage(language, persist = false) {
  currentLanguage = language;
  const text = translations[language];
  document.documentElement.lang = language;
  document.querySelector(".intro__tagline").textContent = text.introTagline;
  continueLink.setAttribute("aria-label", text.continue);
  backButton.setAttribute("aria-label", text.back);
  backToTopButton.setAttribute("aria-label", text.backToTop);
  backToTopButton.title = text.backToTop;
  document.querySelector("#menu-title").textContent = text.discover;
  document.querySelector(".language-toggle").setAttribute("aria-label", text.chooseLanguage);
  document.querySelector(".category-sidebar").setAttribute("aria-label", text.categoryNavigation);
  document.querySelector(".category-nav").setAttribute("aria-label", text.categoriesHeading);
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = text[element.dataset.i18n];
  });
  document.querySelector("#footer-year").textContent = new Date().getFullYear();
  document.querySelector(".search-box .visually-hidden").textContent = text.searchFood;
  searchInput.placeholder = text.searchPlaceholder;
  cartTrigger.setAttribute("aria-label", text.openCart);
  document.querySelector("#cart-title").textContent = text.cartTitle;
  closeCartButton.setAttribute("aria-label", text.closeCart);
  document.querySelector(".checkout-form__submit").textContent = text.checkout;

  const formFields = document.querySelectorAll(".checkout-form__field");
  formFields[0].querySelector("span").textContent = text.name;
  formFields[0].querySelector("input").placeholder = text.namePlaceholder;
  formFields[1].querySelector("span").textContent = text.phone;
  formFields[2].querySelector("span").textContent = text.address;
  formFields[2].querySelector("input").placeholder = text.addressPlaceholder;

  Object.entries(text.categories).forEach(([id, title]) => {
    document.querySelector(`#${id}`).textContent = title;
    const categoryLink = document.querySelector(`[data-category-link="${id}"]`);
    categoryLink.textContent = title;
  });

  const chefProductKey = "Pizza BBQ Chicken";
  const chefProduct = products[chefProductKey];
  document.querySelector("#chef-pick-title").textContent =
    language === "uk" ? chefProduct.ukName : chefProductKey;
  document.querySelector(".chef-pick__description").textContent =
    language === "uk" ? chefProduct.uk : chefProduct.en;
  document.querySelector(".chef-pick__image").alt =
    document.querySelector("#chef-pick-title").textContent;
  foodCards.forEach((card) => {
    const nameElement = card.querySelector(".food-card__name");
    const productKey = card.dataset.productKey || nameElement.textContent.trim();
    const product = products[productKey];

    if (!product) {
      throw new Error(`Missing ${language} translation for menu item: ${productKey}`);
    }

    card.dataset.productKey = productKey;
    nameElement.textContent = language === "uk" ? product.ukName : productKey;
    card.querySelector(".food-card__image").alt = nameElement.textContent;
    const description = card.querySelector(".food-card__description");
    if (description) {
      description.textContent =
        language === "uk"
          ? card.dataset.ukDescription || (card.dataset.ukDescription = description.textContent)
          : product.en;
    }

    const deliveryNote = card.querySelector(".food-card__delivery-note");
    if (deliveryNote) {
      deliveryNote.textContent =
        language === "uk"
          ? "Доставляється у захищеній тарі"
          : "Delivered in protective packaging";
    }
    card.querySelector(".food-card__add").textContent = text.addCart;
  });

  languageButtons.forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.language === language));
  });

  applyMenuTheme(menuScreen.dataset.theme || "light");
  filterCards();
  renderCart();

  if (persist) {
    try {
      window.localStorage.setItem("food-hub-language", language);
    } catch (error) {
      console.warn("Unable to save the selected language.", error);
    }
  }
}

function applyMenuTheme(theme, persist = false) {
  const isDark = theme === "dark";
  const text = translations[currentLanguage];
  menuScreen.dataset.theme = theme;
  document.body.dataset.menuTheme = theme;
  themeToggle.setAttribute("aria-pressed", String(isDark));
  themeToggle.setAttribute("aria-label", isDark ? text.switchToLight : text.switchToDark);
  themeToggle.title = isDark ? text.switchToLight : text.switchToDark;
  themeToggleIcon.classList.toggle("fa-moon", !isDark);
  themeToggleIcon.classList.toggle("fa-sun", isDark);

  if (persist) {
    try {
      window.localStorage.setItem("food-hub-theme", theme);
    } catch (error) {
      console.warn("Unable to save the selected theme.", error);
    }
  }
}

let savedLanguage = null;
try {
  savedLanguage = window.localStorage.getItem("food-hub-language");
} catch (error) {
  console.warn("Unable to read the saved language.", error);
}
currentLanguage = savedLanguage === "en" ? "en" : "uk";

let savedTheme = null;
try {
  savedTheme = window.localStorage.getItem("food-hub-theme");
} catch (error) {
  console.warn("Unable to read the saved theme.", error);
}

const initialTheme =
  savedTheme === "light" || savedTheme === "dark"
    ? savedTheme
    : window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
applyMenuTheme(initialTheme);
applyLanguage(currentLanguage);

themeToggle.addEventListener("click", () => {
  const nextTheme = menuScreen.dataset.theme === "dark" ? "light" : "dark";
  applyMenuTheme(nextTheme, true);
});

languageButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (button.dataset.language !== currentLanguage) {
      applyLanguage(button.dataset.language, true);
    }
  });
});

function updateCartCount(animate = false) {
  cartCount.textContent = String(cartItems.length);

  if (animate) {
    cartCount.classList.remove("is-bumping");
    void cartCount.offsetWidth;
    cartCount.classList.add("is-bumping");
  }
}

function getProductName(productKey) {
  const product = products[productKey];
  if (!product) {
    throw new Error(`Missing translation for cart item: ${productKey}`);
  }
  return currentLanguage === "uk" ? product.ukName : productKey;
}

function renderCart() {
  cartItemsList.replaceChildren();

  if (cartItems.length === 0) {
    const emptyMessage = document.createElement("p");
    emptyMessage.className = "cart-empty";
    emptyMessage.textContent = translations[currentLanguage].emptyCart;
    cartItemsList.append(emptyMessage);
  } else {
    cartItems.forEach((item) => {
      const row = document.createElement("article");
      row.className = "cart-item";

      const image = document.createElement("img");
      image.className = "cart-item__image";
      image.src = item.image;
      image.alt = item.name;

      const details = document.createElement("div");
      details.className = "cart-item__details";

      const name = document.createElement("h3");
      name.className = "cart-item__name";
      name.textContent = getProductName(item.productKey);

      const price = document.createElement("p");
      price.className = "cart-item__price";
      price.textContent = `${item.price.toFixed(2)} ${translations[currentLanguage].currency}`;

      const removeButton = document.createElement("button");
      removeButton.className = "cart-item__remove";
      removeButton.type = "button";
      removeButton.dataset.cartItemId = String(item.id);
      removeButton.textContent = translations[currentLanguage].remove;
      removeButton.setAttribute(
        "aria-label",
        `${translations[currentLanguage].remove} ${getProductName(item.productKey)}`,
      );

      details.append(name, price);
      row.append(image, details, removeButton);
      cartItemsList.append(row);
    });
  }

  const total = cartItems.reduce((sum, item) => sum + item.price, 0);
  cartTotal.textContent =
    `${translations[currentLanguage].total}: ${total.toFixed(2)} ${translations[currentLanguage].currency}`;
  updateCartCount();
}

function openCart() {
  renderCart();
  cartModal.classList.remove("hidden");
  document.body.classList.add("modal-open");
  closeCartButton.focus();
}

function closeCart() {
  cartModal.classList.add("hidden");
  document.body.classList.remove("modal-open");
  cartTrigger.focus();
}

continueLink.addEventListener("click", (event) => {
  event.preventDefault();
  introScreen.classList.add("hidden");
  menuScreen.classList.remove("hidden");
  menuScreen.scrollIntoView({ behavior: "smooth", block: "start" });
});

backButton.addEventListener("click", () => {
  menuScreen.classList.add("hidden");
  introScreen.classList.remove("hidden");
  window.scrollTo({ top: 0, behavior: "smooth" });
});

function updateBackToTopButton() {
  const shouldShow = !menuScreen.classList.contains("hidden") && window.scrollY > 480;
  backToTopButton.classList.toggle("hidden", !shouldShow);
  backToTopButton.setAttribute("aria-hidden", String(!shouldShow));
  backToTopButton.tabIndex = shouldShow ? 0 : -1;
}

window.addEventListener("scroll", updateBackToTopButton, { passive: true });

backToTopButton.addEventListener("click", () => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
});

document.querySelectorAll(".food-card__add").forEach((button) => {
  button.addEventListener("click", () => {
    const card = button.closest(".card");
    const productKey = card.dataset.productKey;
    const name = getProductName(productKey);
    const price = Number.parseFloat(card.querySelector(".food-card__price").textContent);
    const image = card.querySelector(".food-card__image").src;

    if (!Number.isFinite(price)) {
      throw new Error(`Invalid price for cart item: ${name}`);
    }

    cartItems.push({ id: nextCartItemId++, productKey, price, image });
    renderCart();
    cartCount.classList.remove("is-bumping");
    void cartCount.offsetWidth;
    cartCount.classList.add("is-bumping");
  });
});

function filterCards() {
  const query = searchInput.value.trim().toLocaleLowerCase();
  const isSearching = query !== "";
  const wasSearching = menuScreen.classList.contains("is-searching");
  const matchingCards = [];

  menuScreen.classList.toggle("is-searching", isSearching);
  const matchesByCategory = new Map(
    [...categoryBlocks].map((category) => [category, 0]),
  );

  foodCards.forEach((card) => {
    card.classList.remove("is-last-search-result");
    const name = card.querySelector(".food-card__name").textContent.toLocaleLowerCase();
    const matches = name.startsWith(query);
    const hideTimer = cardHideTimers.get(card);

    if (matches) {
      matchingCards.push(card);
      const category = card.closest(".category-block");
      matchesByCategory.set(category, matchesByCategory.get(category) + 1);
      if (hideTimer !== undefined) {
        window.clearTimeout(hideTimer);
        cardHideTimers.delete(card);
      }

      if (card.classList.contains("hidden")) {
        card.classList.remove("hidden");
        card.classList.add("is-filter-hiding");
        void card.offsetWidth;
        card.classList.remove("is-filter-hiding");
      } else {
        card.classList.remove("is-filter-hiding");
      }
    } else {
      card.classList.remove("is-last-search-result");
      if (!card.classList.contains("hidden") && hideTimer === undefined) {
        card.classList.add("is-filter-hiding");
        cardHideTimers.set(
          card,
          window.setTimeout(() => {
            card.classList.add("hidden");
            card.classList.remove("is-filter-hiding");
            cardHideTimers.delete(card);
          }, window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 400),
        );
      }
    }
  });

  categoryBlocks.forEach((category) => {
    const isEmpty = isSearching && matchesByCategory.get(category) === 0;
    category.classList.toggle("is-empty", isEmpty);
    category.querySelector(".category-title").style.display = isSearching
      ? "none"
      : "block";
  });

  if (isSearching && matchingCards.length % 2 === 1) {
    matchingCards.at(-1).classList.add("is-last-search-result");
  }

  if (isSearching && !wasSearching) {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({
      top: menuScreen.getBoundingClientRect().top + window.scrollY,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  }
}

searchInput.addEventListener("input", filterCards);

cartTrigger.addEventListener("click", openCart);
closeCartButton.addEventListener("click", closeCart);
cartItemsList.addEventListener("click", (event) => {
  const removeButton = event.target.closest("[data-cart-item-id]");
  if (!removeButton) {
    return;
  }

  const itemId = Number(removeButton.dataset.cartItemId);
  const itemIndex = cartItems.findIndex((item) => item.id === itemId);
  if (itemIndex === -1) {
    return;
  }

  cartItems.splice(itemIndex, 1);
  renderCart();
});
cartModal.addEventListener("click", (event) => {
  if (event.target === cartModal) {
    closeCart();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !cartModal.classList.contains("hidden")) {
    closeCart();
  }
});