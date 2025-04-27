import {
  db,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "../Firebase/FirebaseInit.js";
const IN_CART = "In cart";
const ADD_TO_CART = "Add to cart";
class Product {
  #id;
  #category;
  #image;
  #price;
  #rating;
  #title;
  #description;
  #itemInFavourites;
  #itemInCart;
  static #sessionId = sessionStorage.getItem("session");
  constructor(
    id,
    category,
    image,
    price,
    rating,
    title,
    description,
    itemInFavourites,
    itemInCart
  ) {
    this.#id = id;
    this.#category = category;
    this.#image = image;
    this.#price = price;
    this.#rating = rating;
    this.#title = title;
    this.#description = this.#descriptionShortend(description);
    this.#itemInFavourites = itemInFavourites;
    this.#itemInCart = itemInCart;
  }
  #toJSON() {
    return {
      category: this.#category,
      description: this.#description,
      id: this.#id,
      image: this.#image,
      price: this.#price,
      rating: this.#rating,
      title: this.#title,
    };
  }
  #descriptionShortend(description) {
    return description.slice(0, description.indexOf(".") + 1);
  }
  makeProductCard() {
    const wrapperCard = document.createElement("div");

    const idElement = this.#makeElement(this.#id, "Id:");
    const categoryElement = this.#makeElement(this.#category, "Categorie:");

    const imageElement = document.createElement("img");
    imageElement.src = this.#image;

    const priceElement = this.#makeElement(this.#price, "Price:");
    const ratingElement = this.#makeElement(this.#rating, "Rating:");
    const titleElement = this.#makeElement(this.#title, "Title:");
    const descriptionElement = this.#makeElement(
      this.#description,
      "Description:"
    );

    const addTofavouriteBtn = this.#getFavouritesIcon();
    const addToCartBtn = this.#getAddToCartButton();

    const headerWrapper = this.#makeWrap(addTofavouriteBtn, titleElement);
    const cartWrapper = this.#makeWrap(addToCartBtn, priceElement);

    this.#appendToWrapper(
      wrapperCard,
      headerWrapper,
      imageElement,
      idElement,
      cartWrapper,
      categoryElement,
      descriptionElement,
      ratingElement
    );
    wrapperCard.classList.add("product-card");

    addTofavouriteBtn.addEventListener("click", () => {
      const state = addTofavouriteBtn.classList.contains("fa-solid")
        ? "remove"
        : "add";
      this.#updateCollections(state, addTofavouriteBtn, "favourites");
    });
    addToCartBtn.addEventListener("click", () => {
      const state = addToCartBtn.textContent === IN_CART ? "remove" : "add";
      this.#updateCollections(state, addToCartBtn, "cartItems");
    });

    return wrapperCard;
  }
  #makeWrap(button, element) {
    const elementCategory = element.classList.contains("product-Title")
      ? "title-wrapper"
      : "price-cart-wrapper";
    const wrapper = document.createElement("div");
    wrapper.appendChild(element);
    wrapper.appendChild(button);
    wrapper.classList.add(elementCategory);
    return wrapper;
  }
  #getFavouritesIcon() {
    const favouriteIcon = document.createElement("icon");
    favouriteIcon.classList.add(
      this.#itemInFavourites ? "fa-solid" : "fa-regular"
    );
    favouriteIcon.classList.add("fa-heart");
    favouriteIcon.classList.add("favourites-item-icon");
    return favouriteIcon;
  }
  #getAddToCartButton() {
    const addToCartBtn = document.createElement("button");
    addToCartBtn.textContent = this.#itemInCart ? IN_CART : ADD_TO_CART;
    return addToCartBtn;
  }
  #makeElement(...data) {
    const [elementProperty, tag] = data;
    const element = document.createElement("p");
    element.textContent = tag + elementProperty;
    element.classList.add(("product-" + tag).slice(0, -1));

    return element;
  }
  #appendToWrapper(wrapperCard, ...args) {
    args.forEach((element) => wrapperCard.appendChild(element));
  }

  async #updateCollections(state, btn, collectionType) {
    const userRef = doc(db, "users", Product.#sessionId);

    const operationInFirebase =
      state === "add"
        ? arrayUnion(JSON.stringify(this.#toJSON()))
        : arrayRemove(JSON.stringify(this.#toJSON()));
    console.log(collectionType);
    console.log(operationInFirebase);
    try {
      await updateDoc(userRef, {
        [collectionType]: operationInFirebase,
      });

      if (collectionType === "favourites") {
        btn.classList.toggle("fa-regular");
        btn.classList.toggle("fa-solid");
      }
      if (collectionType === "cartItems") {
        btn.textContent =
          btn.textContent === ADD_TO_CART ? IN_CART : ADD_TO_CART;
      }
    } catch (error) {
      console.log(`Error adding the product to cart ${error}`);
    }
  }
}
export default Product;
