//My file

const BASE_URL =
  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");		//*****
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for (let select of dropdowns) {
  for (currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;    				// selecting attributes
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";				// marking usd and inr as selected that is when page gets loaded then by default these will be selected
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }

  select.addEventListener("change", (evt) => {			//*****
    updateFlag(evt.target); 					// evt gets us all information about the change and evt target specifically gives where the change occured
  });
}

const updateExchangeRate = async () => {
  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;					//*****
  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amount.value = "1";
  }
  const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
  let response = await fetch(URL);
  let data = await response.json();
  let rate = data[toCurr.value.toLowerCase()];				//we get data as an object containing conatining key-value pairs of which keys are date and inr(example)

  let finalAmount = amtVal * rate;
  msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
};

const updateFlag = (element) => {		// here element will be <select>
  let currCode = element.value;			// here element.value will give currCode where the change was captured
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");			//*****
  img.src = newSrc;
};

btn.addEventListener("click", (evt) => {
  evt.preventDefault();					//its default behavior was to refresh the page and load some other url
  updateExchangeRate();
});

window.addEventListener("load", () => {			//here we are trying to show the content when page gets loaded
  updateExchangeRate();
});
