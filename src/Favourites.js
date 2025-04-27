import { clearContainer } from "./Searchbar.js";
import {
  favouritesCopy,
  loadItems,
  initialItemsCopy,
  cartItemsCopy,
  homeBtn,
} from "./LoadItems.js";
const ICON_ACTIVE = "fa-solid";
const ICON_INACTIVE = "fa-regular";
const favouritesStoreIcon = document.querySelector(".fa-star");
favouritesStoreIcon.addEventListener("click", () => {
  clearContainer();

  if (favouritesStoreIcon.classList.contains(ICON_INACTIVE))
    loadItems(
      favouritesCopy,
      favouritesCopy.length,
      favouritesCopy,
      cartItemsCopy
    );
  else
    loadItems(
      initialItemsCopy,
      initialItemsCopy.length,
      favouritesCopy,
      cartItemsCopy
    );

  favouritesStoreIcon.classList.toggle(ICON_INACTIVE);
  favouritesStoreIcon.classList.toggle(ICON_ACTIVE);

  if (favouritesStoreIcon.classList.contains(ICON_ACTIVE))
    homeBtn.style.fill = "none";
  if (favouritesStoreIcon.classList.contains(ICON_INACTIVE))
    homeBtn.style.fill = "black";
});

homeBtn.addEventListener("click", () => {
  homeBtn.style.fill = "black";
  favouritesStoreIcon.classList.remove(ICON_ACTIVE);
  favouritesStoreIcon.classList.add(ICON_INACTIVE);
  clearContainer();
  loadItems(
    initialItemsCopy,
    initialItemsCopy.length,
    favouritesCopy,
    cartItemsCopy
  );
});
