const form = document.querySelector("form");

// Inputs

const enableCapitalizationCheckbox = document.querySelector('input[name="capital"]');
const capitalizationPeriod = document.querySelector("select");

const amountInput = document.querySelector('input[name="vklad"]');
const amountRangeInput = document.querySelector('input[type="range"]');
const yearBetInput = document.querySelector('input[name="yearBet"]');
const daysPeriodInput = document.querySelector('input[name="daysLength"]');

const result = document.querySelector(".value");

amountInput.value = amountRangeInput.value;

amountRangeInput.addEventListener("input", (e) => {
  amountInput.value = e.target.value;
});

amountInput.addEventListener("input", (e) => {
  if (+e.target.value > 100000000) amountInput.value = 100000000;
  if (+e.target.value < 10000) amountInput.value = 10000;
  amountRangeInput.value = e.target.value;
});

yearBetInput.addEventListener("input", (e) => {
  if (+e.target.value < 1) yearBetInput.value = 1;
});

daysPeriodInput.addEventListener("input", (e) => {
  if (+e.target.value < 1) yearBetInput.value = 1;
});

function calcWithoutCapitalization(amount, rate, days) {
  const balance = +amountInput.value;
  const percent = (+amount * +rate * +days) / 365 / 100;
  return balance + percent;
}

function calcWithCapitalization(amount, rate, days, capitalizationPeriod) {
  let balance = +amount;
  const numberOfCapitalizations = Math.floor(days / capitalizationPeriod);
  for (let i = 0; i < numberOfCapitalizations; i++) {
    const percent = (balance * +rate * +capitalizationPeriod) / 365 / 100;
    balance += percent;
  }
  return balance;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (enableCapitalizationCheckbox.checked) {
    result.textContent = calcWithCapitalization(amountInput.value, yearBetInput.value, daysPeriodInput.value, capitalizationPeriod.value).toFixed(0);
  } else {
    result.textContent = calcWithoutCapitalization(amountInput.value, yearBetInput.value, daysPeriodInput.value).toFixed(0);
  }
});
