import { getSearchedProducts, loadItems } from "./LoadItems.js";
const searchWrapper = document.querySelector(".search-wrapper");
const searchBtn = document.querySelector(".search-btn");
const searchInput = document.querySelector(".searchbar-input");
const productWrapper = document.querySelector(".products-wrapper");
searchInput.addEventListener("input", async (event) => {
  const input = event.target.value;

  const products = await getSearchedProducts(input);

  if (!products) return;
  console.log(products);
  const autoCompleteList = makeAutoCompleteList(products);

  resetPrevAutoCompleteList(searchWrapper);
  searchWrapper.appendChild(autoCompleteList);

  autoCompleteListClickHandler(autoCompleteList);

  autoCompleteList.classList.add("autocomplete-container");
});

searchInput.addEventListener("keyup", (event) => {
  if (event.key !== "Enter") return;

  const input = event.target.value;

  loadSearchProducts(input);
});
searchBtn.addEventListener("click", () => {
  const input = searchInput.value;

  loadSearchProducts(input);
});
function autoCompleteListClickHandler(autoCompleteList) {
  autoCompleteList.addEventListener("click", (event) => {
    const input = event.target.textContent;
    console.log(input);

    loadSearchProducts(input);
  });
}

async function loadSearchProducts(input) {
  const products = await getSearchedProducts(input);

  if (products.length > 0) clearContainer();
  loadItems(products, products.length);
}
function clearContainer() {
  while (productWrapper.children.length > 0) {
    productWrapper.removeChild(productWrapper.lastChild);
  }
}

function resetPrevAutoCompleteList(autoCompleteList) {
  if (
    Array.from(autoCompleteList.children).find((element) =>
      element.classList.contains("autocomplete-container")
    )
  ) {
    autoCompleteList.removeChild(autoCompleteList.lastChild);
  }
}
function makeAutoCompleteList(itemsList) {
  const containerList = document.createElement("ul");
  //make itemListElements
  const itemsListElements = itemsList.map(({ title }) => {
    const itemElement = document.createElement("li");
    itemElement.textContent = title;
    return itemElement;
  });
  //append Elements into ul
  itemsListElements.forEach((itemElement) =>
    containerList.appendChild(itemElement)
  );
  return containerList;
}
export { clearContainer };
