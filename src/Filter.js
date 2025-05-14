import {
  getAllProducts,
  loadItems,
  currentLoadedProducts,
} from "./LoadItems.js";
import { clearContainer } from "./Searchbar.js";
const filterWrapper = document.querySelector(".filters-container");
async function getCategories() {
  const products = await getAllProducts();
  const getCategories = [
    ...new Set(products.map((product) => product.category)),
  ];
  getCategories.unshift("Filter by Categories");
  return getCategories;
}

getCategories();
async function createFilterElement() {
  const categories = await getCategories();
  const filterElement = document.createElement("select");
  filterElement.classList.add("filter");
  const optionsElementsList = categories.map((category) => {
    const optionElement = document.createElement("option");
    optionElement.value = category;
    optionElement.textContent = category;
    return optionElement;
  });

  optionsElementsList.forEach((optionElement) =>
    filterElement.appendChild(optionElement)
  );

  filterWrapper.appendChild(filterElement);
  return filterElement;
}

async function filterElementUsage() {
  const filterElement = await createFilterElement();

  filterElement.addEventListener("change", (event) => {
    const category = event.target.value;
    if (category === "Filter by Categories") {
      clearContainer();
      const currentLoadedProductsCopy = [...currentLoadedProducts];
      loadItems(currentLoadedProductsCopy, currentLoadedProductsCopy.length);
    } else {
      const currentLoadedProductsFiltered = currentLoadedProducts.filter(
        (product) => product.category === category
      );
      clearContainer();
      loadItems(
        currentLoadedProductsFiltered,
        currentLoadedProductsFiltered.length,
        null,
        null,
        true
      );
    }
  });
}

filterElementUsage();
