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
const zipCode = form.querySelector("input#zipCode");
const country = form.querySelector("input#country");
const submitButton = form.querySelector("form > button");
submitButton.onclick = (event) => {
  if (!verifyForm()) event.preventDefault();
};

function verifyInputValueLength(element) {
  // const errorMessage = form.querySelector("small" + selectorID);
  // const formElement = form.querySelector("input" + selectorID);
  // if (formElement.classList.contains("valid")) return;

  console.log(element.value.length);
  if (element.value.length < 5 || element.value.length > 20) {
    // errorMessage.textContent = "Must be bewtween 5 - 20 characters long";
    // formElement.classList.add("invalid");
    return false;
  } else {
    return true;
    // errorMessage.textContent = "";
    // formElement.classList.remove("invalid");
  }
}

function verifyPasswordsAreEqual() {
  if (
    confirmPassword.value === password.value &&
    !password.classList.contains("invalid")
  ) {
    // confirmPassword.classList.remove("invalid");
    return true;
  } else {
    return false;
    // confirmPassword.classList.add("invalid");
  }
}

function verifyEmailCharacters() {
  if (
    email.value.includes("@") &&
    email.value.includes(".") &&
    email.value[email.value.length - 1] !== "."
  ) {
    // email.classList.remove("invalid");
    return true;
  } else {
    return false;
    // email.classList.add("invalid");
  }
}

// asked chat gpt to create this object with names as values and regex as keys
const countryZipRegex = {
  "United States": /^\d{5}(-\d{4})?$/,
  Canada: /^[A-Za-z]\d[A-Za-z] \d[A-Za-z]\d$/,
  "United Kingdom": /^[A-Z]{1,2}\d{1,2}[A-Z]?\s\d[A-Z]{2}$/,
  Australia: /^\d{4}$/,
  Germany: /^\d{5}$/,
  France: /^\d{5}$/,
  India: /^\d{6}$/,
  China: /^\d{6}$/,
  Japan: /^\d{3}-\d{4}$/,
  "South Korea": /^\d{3}-\d{3}$/,
  Brazil: /^\d{5}-\d{3}$/,
  Mexico: /^\d{5}$/,
  Russia: /^\d{6}$/,
  Spain: /^(?:0[1-9]|[1-4]\d|5[0-2])\d{3}$/,
  Italy: /^\d{5}$/,
  Sweden: /^\d{3}\s?\d{2}$/,
  Switzerland: /^\d{4}$/,
  Netherlands: /^\d{4}\s?[A-Z]{2}$/,
  Belgium: /^\d{4}$/,
  Austria: /^\d{4}$/,
  Greece: /^\d{3}\s?\d{2}$/,
  Turkey: /^\d{5}$/,
  "South Africa": /^\d{4}$/,
  "Saudi Arabia": /^\d{5}$/,
  "United Arab Emirates": /^\d{5}$/,
  Argentina: /^\d{4}$/,
  Chile: /^\d{7}$/,
  Thailand: /^\d{5}$/,
  Malaysia: /^\d{5}$/,
  Singapore: /^\d{6}$/,
  "New Zealand": /^\d{4}$/,
  Israel: /^\d{7}$/,
  Egypt: /^\d{5}$/,
  Nigeria: /^\d{6}$/,
  Kenya: /^\d{5}$/,
  Philippines: /^\d{4}$/,
  Pakistan: /^\d{5}$/,
  Bangladesh: /^\d{4}$/,
  Indonesia: /^\d{5}$/,
  Vietnam: /^\d{6}$/,
  Cambodia: /^\d{5}$/,
  Peru: /^\d{5}$/,
  Colombia: /^\d{6}$/,
  Venezuela: /^\d{4}$/,
  Uruguay: /^\d{5}$/,
  Paraguay: /^\d{4}$/,
  Ecuador: /^\d{6}$/,
  Bolivia: /^\d{4}$/,
  "Costa Rica": /^\d{5}$/,
  "Dominican Republic": /^\d{5}$/,
  "Puerto Rico": /^\d{5}$/,
  Guatemala: /^\d{5}$/,
  Honduras: /^\d{5}$/,
  "El Salvador": /^\d{4}$/,
  Nicaragua: /^\d{5}$/,
  Panama: /^\d{6}$/,
  Jamaica: /^[A-Za-z]{3}\d{2}$/,
  "Trinidad and Tobago": /^TT\d{5}$/,
  Barbados: /^BB\d{5}$/,
  Bahamas: /^NP\d{4}$/,
  // Add more countries and their regex formats here
  // ...
};

function verifyCountryAndZipcode(country, zipcode = "") {
  if (!countryZipRegex[country]) return;
  return countryZipRegex[country].test(zipcode);
}

function verifyCountry(country) {
  if (countryZipRegex[country]) return true;
  return false;
}

function verifyForm() {
  // verify country
  if (
    verifyCountry(country.value) &&
    // verify zipcode
    verifyCountryAndZipcode(country.value, zipCode.value) &&
    // verify email
    verifyEmailCharacters() &&
    // verify password
    verifyInputValueLength(password) &&
    //verify passwords are equal
    verifyPasswordsAreEqual()
  ) {
    return true;
  } else return false;
}

function showError(element, message) {
  const errorField = element.nextElementSibling;
  errorField.textContent = message;
}

function clearError(element) {
  const errorField = element.nextElementSibling;
  errorField.textContent = "";
}

form.addEventListener("focusout", (event) => {
  if (!event.target.nodeName === "INPUT") return;
  errorHandler(event.target);
});

function errorHandler(element) {
  switch (element.id) {
    case "country":
      if (!verifyCountry(country.value)) {
        showError(country, "Please enter a valid country");
        element.classList.add("invalid");
      } else {
        clearError(country);
        element.classList.remove("invalid");
      }
      break;
    case "zipCode":
      if (!verifyCountryAndZipcode(country.value, zipCode.value)) {
        showError(zipCode, "The zip code and country do not match");
        element.classList.add("invalid");
      } else {
        clearError(zipCode);
        element.classList.remove("invalid");
      }
      break;
    case "email":
      if (!verifyEmailCharacters()) {
        showError(email, "Please make sure your email includes an @ and a . ");
        element.classList.add("invalid");
      } else {
        clearError(email);
        element.classList.remove("invalid");
      }
      break;
    case "password":
      if (!verifyInputValueLength(password)) {
        showError(
          password,
          "Please enter a password between 5 and 20 characters"
        );
        element.classList.add("invalid");
      } else {
        clearError(password);
        element.classList.remove("invalid");
      }
      break;
    case "confirmPassword":
      if (!verifyPasswordsAreEqual()) {
        showError(confirmPassword, "These passwords do not match");
        element.classList.add("invalid");
      } else {
        clearError(confirmPassword);
        element.classList.remove("invalid");
      }
      break;
    default:
      break;
  }
}
