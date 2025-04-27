import Product from "./productsClass.js";
import { db, getDoc, doc, onSnapshot } from "../Firebase/FirebaseInit.js";
const productWrapper = document.querySelector(".products-wrapper");
const homeBtn = document.querySelector(".home-btn");

const currentLoadedProducts = [];
let favouritesCopy = [];
let cartItemsCopy = [];
let initialItemsCopy = [];
console.log(sessionStorage);
if (sessionStorage.length > 1) {
  const docId = sessionStorage.getItem("session");

  //Get updated data for each operation user do
  const unsub = onSnapshot(
    doc(db, "users", docId),
    { includeMetadataChanges: true, source: "cache" },
    (doc) => {
      const source = doc.metadata.hasPendingWrites ? "Local" : "Server";
      if (!doc.data()) return;
      const { favourites: favouritesJSON } = doc.data();
      const { cartItems: cartItemsJSON } = doc.data();
      const favourites = favouritesJSON.map((favourite) =>
        JSON.parse(favourite)
      );
      const cartItems = cartItemsJSON.map((cartItem) => JSON.parse(cartItem));

      favouritesCopy = [...favourites];
      cartItemsCopy = [...cartItems];
    }
  );

  //Get data from firestore when user authenticated
  const docSnapshot = await getDoc(doc(db, "users", docId));
  if (docSnapshot.exists()) {
    const documentFirestore = docSnapshot.data();
    const initialItems = documentFirestore.initItems;
    const favouritesJSON = documentFirestore.favourites;
    const cartItemsJSON = documentFirestore.cartItems;
    const favourites = favouritesJSON.map((favourite) => JSON.parse(favourite));
    const cartItems = cartItemsJSON.map((cartItem) => JSON.parse(cartItem));

    favouritesCopy = [...favourites];
    cartItemsCopy = [...cartItems];
    initialItemsCopy = [...initialItems];
    loadItems(initialItems, initialItems.length, favourites, cartItems);
  } else console.log("No doc");

  sessionStorage.removeItem("session");
}

//Get products to have a sample
async function getAllProducts() {
  try {
    const response = await fetch("https://fakestoreapi.com/products?limit");
    if (!response.ok) throw new Error(message);
    const products = await response.json();
    return products;
  } catch (error) {
    console.log(error.message);
  }
}
//products from search-bar
async function getSearchedProducts(input) {
  try {
    const products = await getAllProducts();
    return filterProductsByInput(products, input);
  } catch (error) {
    console.log(error.message);
  }
}
function filterProductsByInput(products, input) {
  if (!input) return [];

  return products.filter((product) =>
    product.title.startsWith(input.replace(input[0], input[0].toUpperCase()))
  );
}
function clearCurrentLoadedProducts() {
  while (currentLoadedProducts.length > 0) currentLoadedProducts.pop();
}
function checkProductInCollection(collection, product) {
  console.log(collection, product);
  return collection.some(({ id }) => id === product.id);
}

function loadItems(
  products,
  itemsNumber,
  favourites,
  cartItems,
  filter = false
) {
  const usableProducts = products.slice(0, itemsNumber);

  if (!filter) clearCurrentLoadedProducts();
  for (const product of usableProducts) {
    if (!filter) currentLoadedProducts.push(product);

    const itemInFavourites =
      favourites && checkProductInCollection(favourites, product);
    const itemInCart =
      cartItems && checkProductInCollection(cartItems, product);

    //Initial data that were stored from api have rating slightly different
    //from objects in favourite and cart item in rating
    //so when load items is called for both to work i need this
    product.rating = product.rating?.rate || product.rating;

    const { category, description, id, image, price, rating, title } = product;

    const newProduct = new Product(
      id,
      category,
      image,
      price,
      rating,
      title,
      description,
      itemInFavourites,
      itemInCart
    );

    productWrapper.appendChild(newProduct.makeProductCard());
  }

  console.log(currentLoadedProducts);
}
function getCurrentLoadedProducts() {
  return currentLoadedProducts;
}

const products = await getAllProducts();

export {
  getAllProducts,
  products,
  getSearchedProducts,
  loadItems,
  currentLoadedProducts,
  clearCurrentLoadedProducts,
  getCurrentLoadedProducts,
  favouritesCopy,
  cartItemsCopy,
  initialItemsCopy,
  homeBtn,
};
