import {
  currentLoadedProducts,
  loadItems,
  getCurrentLoadedProducts,
} from "./LoadItems.js";
import { clearContainer } from "./Searchbar.js";

const sortDdl = document.querySelector(".sorting-dropdrown-list");

const sortTypeMapped = {
  "name-ascending": sortByName,
  "name-descending": sortByName,
  "price-ascending": sortByPrice,
  "price-descending": sortByPrice,
};
console.log(currentLoadedProducts);
sortDdl.addEventListener("change", (event) => {
  const sortType = event.target.value;
  console.log(currentLoadedProducts);
  const currentLoadedProductsCopy = [...getCurrentLoadedProducts()];
  if (sortType === "sort") {
    clearContainer();
    loadItems(currentLoadedProductsCopy, currentLoadedProducts.length);
  } else {
    const sortOrder = sortType.slice(sortType.indexOf("-") + 1);

    const productsSorted = sortTypeMapped[sortType](
      currentLoadedProductsCopy,
      sortOrder
    );

    clearContainer();
    loadItems(productsSorted, productsSorted.length, true);
  }
});
function sortByName(products, type) {
  products.sort((productFirst, productSecond) => {
    if (type === "ascending")
      return productFirst.title < productSecond.title ? 1 : -1;
    if (type === "descending")
      return productFirst.title < productFirst.title ? 1 : -1;
  });
  return products;
}
function sortByPrice(products, type) {
  products.sort(({ price: priceFirst }, { price: priceSecond }) => {
    if (type === "ascending") return priceFirst - priceSecond;
    if (type === "descending") return priceSecond - priceFirst;
  });

  return products;
}
