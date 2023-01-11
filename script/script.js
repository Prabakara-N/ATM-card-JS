// elements
const formEl = document.getElementById("form");
const numInputEl = document.getElementById("card-number");
const nameInputEl = document.getElementById("holder-name");
const monthInputEl = document.getElementById("month-input");
const yearInputEl = document.getElementById("year-input");
const cvvInputEl = document.getElementById("cvv-input");
const completeCardEl = document.getElementById("completed-container");

// card
const frontCardEl = document.getElementById("front");
const backCardEl = document.getElementById("back");

// btns
const btnForm = document.querySelector(".submit-btn");
const btnTy = document.getElementById("btn-complete");

// innertexts
const cardNumber = document.querySelector(".card-number-box");
const holderName = document.querySelector(".card-holder-name");
const month = document.querySelector(".exp-month");
const year = document.querySelector(".exp-year");
const cvv = document.querySelector(".back-cvv");

// global variable
let noOfInputs = 0;

// functions
// initial setting
function init() {
  noOfInputs = 0;

  // Card
  cardNumber.innerText = "0000 0000 0000 0000";
  holderName.innerText = "Cristiano Ronaldo";
  month.innerText = "MM /";
  year.innerText = "YY";
  cvv.innerText = "CVV";

  // values
  numInputEl.value = "";
  nameInputEl.value = "";
  monthInputEl.value = "month";
  yearInputEl.value = "year";
  cvvInputEl.value = "";
}

// error function
function setError(element, message) {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector(".error-msg");

  errorDisplay.style.visibility = "visible";
  errorDisplay.innerText = message;
}

// success function
const setSuccess = (element) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector(".error-msg");

  errorDisplay.style.visibility = "hidden";
  errorDisplay.innerText = "";
};

// validating inputs
function validation() {
  const nameValue = nameInputEl.value.trim();
  const numValue = numInputEl.value.trim();
  const cvvValue = cvvInputEl.value.trim();

  // holder name
  if (nameValue === "") {
    setError(nameInputEl, `Can't be blank`);
  } else {
    noOfInputs++;
    setSuccess(nameInputEl);
  }

  // card number
  if (numValue === "") {
    setError(numInputEl, `Can't be blank`);
  } else if (numValue.length < 16) {
    setError(numInputEl, `Card number must be 16 digits`);
  } else {
    noOfInputs++;
    setSuccess(numInputEl);
  }

  // month
  if (monthInputEl.value === "month") {
    setError(monthInputEl, `Can't be blank`);
    month.innerHTML = `MM /`;
  } else {
    noOfInputs++;
    setSuccess(monthInputEl);
  }

  // year
  if (yearInputEl.value === "year") {
    setError(yearInputEl, `Can't be blank`);
    year.innerHTML = `YY`;
  } else {
    noOfInputs++;
    setSuccess(yearInputEl);
  }

  // cvv
  if (cvvValue === "") {
    setError(cvvInputEl, `Can't be blank`);
  } else if (cvvValue.length < 3) {
    setError(cvvInputEl, `cvv number must be 3 digits`);
  } else {
    noOfInputs++;
    setSuccess(cvvInputEl);
  }

  if (noOfInputs === 5) {
    formEl.style.display = "none";
    completeCardEl.style.display = "block";
  }
}

// event listners
// oninputs

numInputEl.addEventListener("input", () => {
  let cNumber = numInputEl.value;

  let formattedNumber = cNumber.replace(/\D/g, "");

  // card number
  if (numInputEl.value) {
    // Split the card numbers into 4 group in cardNumberSections as array
    let cardNumberSections = formattedNumber.match(/\d{1,4}/g);

    // join group of cardNumberSections with join
    if (cardNumberSections !== null) {
      formattedNumber = cardNumberSections.join(" ");
    }
    // update number on card
    cardNumber.innerText = formattedNumber;
  }
});

nameInputEl.addEventListener("input", () => {
  // holder to capitalize
  let hName = nameInputEl.value;
  holderName.innerText = `${hName.charAt(0).toUpperCase() + hName.slice(1)}`;
});

monthInputEl.addEventListener("input", () => {
  month.innerText = `${monthInputEl.value} /`;
});

yearInputEl.addEventListener("input", () => {
  year.innerText = `${yearInputEl.value}`;
});

cvvInputEl.addEventListener("input", () => {
  cvv.innerText = `${cvvInputEl.value}`;
});

// to rotate the card back side
cvvInputEl.addEventListener("mouseenter", () => {
  frontCardEl.style.transform = "perspective(1000px) rotateY(-180deg)";
  backCardEl.style.transform = "perspective(1000px) rotateY(0deg)";
});

// back to original position
cvvInputEl.addEventListener("mouseleave", () => {
  frontCardEl.style.transform = "perspective(1000px) rotateY(0deg)";
  backCardEl.style.transform = "perspective(1000px) rotateY(180deg)";
});

// form submit
formEl.addEventListener("submit", (e) => {
  e.preventDefault();
  validation();
});

// init
btnTy.addEventListener("click", function () {
  init();
  formEl.style.display = "block";
  completeCardEl.style.display = "none";
});
