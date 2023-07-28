console.log("initial");

/**
 * Function easy to hard list
 * 1. compare password and confirm password
 * 2. check if email includes @ and a domain
 * 3. compare zipcode to country
 * 4. create regex for each country
 */

const form = document.querySelector("form");
const password = form.querySelector("input#password");
const confirmPassword = form.querySelector("input#confirmPassword");
const email = form.querySelector("input#email");
form.oninput = () => {
  verify("#password");
  verifyPasswordsAreEqual();
  verifyEmail();
};

function verify(selectorID) {
  const errorMessage = form.querySelector("small" + selectorID);
  const formElement = form.querySelector("input" + selectorID);
  // if (formElement.classList.contains("valid")) return;

  console.log(formElement.value.length);
  if (formElement.value.length < 5 || formElement.value.length > 20) {
    errorMessage.textContent = "Must be bewtween 5 - 20 characters long";
    formElement.classList.add("invalid");
  } else {
    errorMessage.textContent = "";
    formElement.classList.remove("invalid");
  }
}

function verifyPasswordsAreEqual() {
  if (
    confirmPassword.value === password.value &&
    !password.classList.contains("invalid")
  ) {
    confirmPassword.classList.remove("invalid");
  } else confirmPassword.classList.add("invalid");
}

verify("#password");
verifyPasswordsAreEqual();
verifyEmail();

function verifyEmail() {
  if (
    email.value.includes("@") &&
    email.value.includes(".") &&
    email.value[email.value.length - 1] !== "."
  ) {
    email.classList.remove("invalid");
  } else email.classList.add("invalid");
}
