//APOTHIKEUSH SE MIA ALLH SELIDA POU THA EXEI FORM GIA
//APOSTOLH KAI PAYOUT BUTTON

//EPISHS STO CART NA MPORW NA VGALW KATI APO FAVOURITE
//TELOS GIA KATHE ANTIKEIMENO POU STO CART NA EXW ENA KOKKINO KYKLO
//KATW DEKSIA APO TO CART POU THA EXEI GRAMMENO TO NOUMERO TON ANTIKEIMENWN
//STO CART
import { clearContainer } from "./Searchbar.js";
import {
  cartItemsCopy,
  favouritesCopy,
  loadItems,
  homeBtn,
  initialItemsCopy,
} from "./LoadItems.js";
import { stripeKey } from "../Config/config.js";
const stripe = Stripe(stripeKey);
const shoppingCartBtn = document.querySelector(".fa-cart-shopping");
const body = document.querySelector("body");
const itemsInCartNumberIcon = document.querySelector(
  ".cart-shopping-number-icon"
);
console.log(stripe);
shoppingCartBtn.addEventListener("click", () => {
  clearContainer();
  loadItems(cartItemsCopy, cartItemsCopy.length, favouritesCopy, null);
  console.log(cartItemsCopy);
  const totalAmount = cartItemsCopy.reduce((sum, { price }) => price + sum, 0);

  itemsInCartNumberIcon.textContent = cartItemsCopy.length;
  if (
    Array.from(body.children).find(
      (element) => !element.classList.contains("payout-container")
    )
  ) {
    const paymentContainer = createPayment(totalAmount);
    body.appendChild(paymentContainer);

    const payoutButton = document.querySelector(".payout-button");

    const line_items = cartItemsCopy.map(({ title, price }) => {
      return {
        price_data: {
          currency: "eur",
          product_data: {
            name: title,
          },
          unit_amount: price * 100,
        },
        quantity: 1,
      };
    });
    console.log(line_items);
    payoutButton.addEventListener("click", async () => {
      const clientSecret = await createCheckoutSess;
      // const response = await fetch("/create-checkout-session", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     line_items: line_items,
      //   }),
      // });
      // console.log(response);
      // console.log(response.json());
      // const session = await response.json();

      // const result = await stripe.redirectToCheckout({ sessionId: session });
      // if (result.error) {
      //   console.log(result.error.message);
      // }
    });
  }
});
homeBtn.addEventListener("click", () => {
  clearContainer();
  loadItems(
    initialItemsCopy,
    initialItemsCopy.length,
    favouritesCopy,
    cartItemsCopy
  );
  itemsInCartNumberIcon.textContent = "";

  if (
    Array.from(body.children).find(
      (element) => !element.classList.contains("payout-container")
    )
  ) {
    body.removeChild(body.lastChild);
  }
});

function createPayment(amount) {
  const payoutButton = document.createElement("button");
  payoutButton.textContent = "Proced to payment";
  payoutButton.classList.add("payout-button");
  const totalAmountElement = document.createElement("p");
  totalAmountElement.textContent = `Total Amount:${amount}`;
  totalAmountElement.classList.add("total-amount");
  const payoutContainer = document.createElement("div");
  payoutContainer.appendChild(payoutButton);
  payoutContainer.appendChild(totalAmountElement);
  payoutContainer.classList.add("payout-container");
  return payoutContainer;
}
console.log(cartItemsCopy);
//Thelw ena summary tou athroismatos
//kai ena button me payout sthn stripe
