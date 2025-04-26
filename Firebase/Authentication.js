import {
  db,
  auth,
  setDoc,
  doc,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "./FirebaseInit.js";
import { products } from "../src/LoadItems.js";
//na parw user apo signup gia create
console.log("sd");

const submitRegister = document.querySelector("#submit-register");
const submitLogin = document.querySelector("#submit-login");
console.log(products);
function createUser(email, password) {
  createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      console.log(userCredential.user);
      const user = userCredential.user;
      // Signed up
      try {
        const docRef = await setDoc(doc(db, "users", user.uid), {
          userId: user.uid,
          userEmail: email,
          userPassword: password,
          initItems: [...products.slice(0, 6)],
          favourites: [],
          cartItems: [],
        });
        console.log(docRef.id);

        window.location.href = "./index.html";
      } catch (e) {
        console.log(e);
      }

      console.log(user);

      // ...
    })
    .catch((error) => {
      console.log(error);
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
}

//edw user
function passwordAuthentication(email, password) {
  signInWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      // Signed in

      const user = userCredential.user;
      console.log(user);
      console.log(window.location.href);
      sessionStorage.setItem("session", user.uid);
      window.location.href = "./index.html";
      // ...
    })
    .catch((error) => {
      console.log(error);
      const errorCode = error.code;
      const errorMessage = error.message;
    });
}

submitRegister &&
  submitRegister.addEventListener("click", (event) => {
    event.preventDefault();
    const email = document.querySelector("#email-register").value;
    const password = document.querySelector("#password-register").value;
    console.log(email, password);
    createUser(email, password);
  });

submitLogin &&
  submitLogin.addEventListener("click", (event) => {
    event.preventDefault();
    const email = document.querySelector("#email-login").value;
    const password = document.querySelector("#password-login").value;
    passwordAuthentication(email, password);
  });
