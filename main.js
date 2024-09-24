"use strict";

const calculateButton = document.querySelector(".calculate-button");
const mortgageAmountInput = document.querySelector("#mortgage-amount-input");
const mortgageTermInput = document.querySelector("#mortgage-term-input");
const interestRateInput = document.querySelector("#interest-rate-input");
const repaymentOption = document.querySelector("#repayment-option");
const interestOnlyOption = document.querySelector("#interest-only-option");
const clearButton = document.querySelector(".clear-button");
const errorMessages = document.querySelectorAll(".error-msg");
const symbolElements = document.querySelectorAll(".symbol-background");
const inputElements = document.querySelectorAll("input");
const repaymentLabel = document.querySelector(".repayment-label");
const interestOnlyLabel = document.querySelector(".interestonly-label");
const resultHeader = document.querySelector(".results-header");
const resultDetails = document.querySelector(".results-details");
const labelAmount = document.querySelectorAll(".label-amount");

function showError(index, msg) {
  errorMessages[index].textContent = msg;
  inputElements[index].classList.add("error-border");
  symbolElements[index].classList.add("error-background");
}

function hideError(index, msg) {
  errorMessages[index].textContent = msg;
  inputElements[index].classList.remove("error-border");
  symbolElements[index].classList.remove("error-background");
}

function validInput(input, index) {
  if (input === "") {
    showError(index, "This Field is required");
  } else {
    hideError(index, null);
    return +input;
  }
}

const formatNumber = (number) =>
  Intl.NumberFormat("en-UK", {
    style: "currency",
    currency: "GBP",
  }).format(number);

function checkRadioButton() {
  const repayment = repaymentOption.checked;
  const interestOnly = interestOnlyOption.checked;
  let option = null;

  if (repayment === true && interestOnly === false) {
    option = "repayment";
    return option;
  } else if (interestOnly === true && repayment === false) {
    option = "interestOnly";
    return option;
  } else {
    return (errorMessages[3].textContent = "This Field is required");
  }
}

function calculateRepayment() {
  const mortgageAmount = validInput(mortgageAmountInput.value, 0);
  const mortgageTerm = validInput(mortgageTermInput.value, 1);
  const mortgageInterest = validInput(interestRateInput.value, 2);
  const isRadioButtonChecked = checkRadioButton();

  if (mortgageAmount && mortgageTerm && mortgageInterest) {
    if (isRadioButtonChecked === "repayment") {
      //Convert annual Interest Rate to monthly interest
      const monthlyInterest = mortgageInterest / 100 / 12;
      //Calculate number of payment
      const numberOfPayment = mortgageTerm * 12;
      //Calculate (1+r)n
      const onePlusPowerN = Math.pow(1 + monthlyInterest, numberOfPayment);
      //Calculate Monthly Mortgage payment
      const monthly =
        (mortgageAmount * (monthlyInterest * onePlusPowerN)) /
        (onePlusPowerN - 1);
      //Calculate Total repayment
      const totalRepayment = monthly * numberOfPayment;
      //Round it to two decimal and format Into Currency
      const monthlyRepayment = formatNumber(monthly);
      const totalRepaymentRounded = formatNumber(totalRepayment);

      resultHeader.classList.add("hide");
      resultDetails.classList.add("show");
      labelAmount[0].textContent = monthlyRepayment;
      labelAmount[1].textContent = totalRepaymentRounded;
    } else if (isRadioButtonChecked === "interestOnly") {
      //Convert annual Interest Rate to monthly interest
      const monthlyInterest = mortgageInterest / 100 / 12;
      //Calculate monthly Interest payment
      const monthlyInterestPayment = mortgageAmount * monthlyInterest;
      //Total Interest Payment overLoan Term
      const totalInterest = monthlyInterestPayment * mortgageTerm * 12;
      //Round it to two decimal and format Into Currency
      const interestPayment = formatNumber(monthlyInterestPayment);
      const interestPaidOverTerm = formatNumber(totalInterest);

      resultHeader.classList.add("hide");
      resultDetails.classList.add("show");
      labelAmount[0].textContent = interestPayment;
      labelAmount[1].textContent = interestPaidOverTerm;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

function handleClearAllButton() {
  resultHeader.classList.remove("hide");
  resultDetails.classList.remove("show");
  inputElements.forEach(
    (element) => ((element.checked = false), (element.value = null))
  );
  repaymentLabel.classList.remove("select");
  interestOnlyLabel.classList.remove("select");
  labelAmount[0].textContent = null;
  labelAmount[1].textContent = null;
  errorMessages.forEach((element) => (element.textContent = null));
  inputElements.forEach((element) => element.classList.remove("error-border"));
  symbolElements.forEach((element) =>
    element.classList.remove("error-background")
  );
}

clearButton.addEventListener("click", handleClearAllButton);

calculateButton.addEventListener("click", function (e) {
  e.preventDefault();
  calculateRepayment();
});

mortgageAmountInput.addEventListener("focus", function () {
  hideError(0, null);
});

mortgageTermInput.addEventListener("focus", function () {
  hideError(1, null);
});
interestRateInput.addEventListener("focus", function () {
  hideError(2, null);
});
repaymentOption.addEventListener("click", function () {
  repaymentLabel.classList.add("select");
  interestOnlyLabel.classList.remove("select");
  errorMessages[3].textContent = null;
});
interestOnlyOption.addEventListener("click", function () {
  repaymentLabel.classList.remove("select");
  interestOnlyLabel.classList.add("select");
  errorMessages[3].textContent = null;
});





























/*const defaultText = document.getElementById('default-text')
const calculationsContainer = document.getElementById('calculations-container')


document.querySelectorAll('.mortgage-type').forEach(input => {
    input.addEventListener('change', function() {
        document.querySelectorAll('.radio-inputs').forEach(div => {

        })

        if (this.checked) {
            this.parentElement.classList.add('selected') 
        }
    })
})


document.getElementById('calculate-btn').addEventListener('click', () => {
    const amount = parseFloat(document.getElementById('mortgage-amount').value)
    const term = parseFloat(document.getElementById('mortgage-term').value)
    const rate = parseFloat(document.getElementById('interest-rate').value) / 100
    const mortgageType = document.querySelector('input[name="mortgage-type"]:checked')

    let isValid = true

    document.querySelectorAll('.form-flex').forEach(el => {
        el.classList.remove('error')
    })

    if(isNaN(amount) || amount <= 0) {
        document.getElementById('amount-alert').style.display = 'block'
        document.getElementById('mortgage-amount-main').classList.add('error')
        isValid = false
    }else {
        document.getElementById('amount-alert').style.display = 'none'
    }

    if(isNaN(amount) || amount <= 0) {
        document.getElementById('term-alert').style.display = 'block'
        document.getElementById('mortgage-amount-main').classList.add('error')
        isValid = false
    }else {
        document.getElementById('term-alert').style.display = 'none'
    }

    if(isNaN(amount) || amount <= 0) {
        document.getElementById('rate-alert').style.display = 'block'
        document.getElementById('interest-rate-main').classList.add('error')
        isValid = false
    }else {
        document.getElementById('rate-alert').style.display = 'none'
    }

    if (!mortgageType) {
        document.getElementById('type-alert').style.display = 'block'
        document.querySelectorAll('.radio-inputs').forEach(el => {
            el.classList.add('error')
        })
        isValid = false
    }else{
        document.getElementById('type-alert').style.display = 'none'
        document.querySelectorAll('.radio-inputs').forEach(el => {
            el.classList.remove('error')
        })
    }

    if(isValid) {
        let monthlyPayment = 0
        let totalRepayment = 0

        defaultText.classList.add('hide')
        calculationsContainer.classList.add('show')

        if (mortgageType.value === 'repayment'){
            const monthlyRate = rate / 12
            const n = term * 12
            monthlyPayment = (amount * monthlyRate) / (1 - Math.pow((1 + monthlyRate),-n))
            totalRepayment - monthlyPayment * n
        }else if (mortgageType.value === 'interest-only'){
            monthlyPayment = (amount * rate) / 12
            totalRepayment =  monthlyPayment * term * 12
        }

        document.getElementById('result').innerText = $$(monthlyPayment.toFixed(2))
        document.getElementById('term-result').innerText = $$(totalRepayment.toFixed(2))
    } else{
        document.getElementById('result').innerText = ''
        document.getElementById('term-result').innerText = ''

        defaultText.classList.remove('hide')
        calculationsContainer.classList.remove('show')
    }

})


document.getElementById('clear-btn').addEventListener('click', () => {
    document.getElementById('mortgage-form').reset()
    document.getElementById('result').innerText = ''
    document.getElementById('term-result').innerText = ''
    document.getElementById('.form-alert').forEach(alert => {
        alert.style.display = 'none'
    })


    defaultText.classList.remove('hide')
    calculationsContainer.classList.remove('show')

    document.querySelectorAll('.radio-inputs').forEach(div => {
        div.classList.remove('selected')
    })

    document.querySelectorAll('.form-flex').forEach(el => {
        el.classList.remove('error')
    })
})


document.querySelectorAll('.form-alert').forEach(alert => {
    alert.style.display = 'none'
})*/