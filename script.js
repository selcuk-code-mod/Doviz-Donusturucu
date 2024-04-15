async function fetchCurrencies() {
  const response = await fetch(
    `https://v6.exchangerate-api.com/v6/c1a5170f7204f5e45307626e/latest/USD`
  );
  const data = await response.json();
  const currencyOptions = Object.keys(data.conversion_rates)
    .sort()
    .map((currency) => `<option value="${currency}">${currency}</option>`)
    .join("");
  document.getElementById("fromCurrency").innerHTML = currencyOptions;
  document.getElementById("toCurrency").innerHTML = currencyOptions;
}

async function convertCurrency() {
  const amount = document.getElementById("amount").value;
  const fromCurrency = document.getElementById("fromCurrency").value;
  const toCurrency = document.getElementById("toCurrency").value;
  const resultText = document.getElementById("resultText");

  try {
    const response = await fetch(
      `https://v6.exchangerate-api.com/v6/c1a5170f7204f5e45307626e/pair/${fromCurrency}/${toCurrency}/${amount}`
    );
    const data = await response.json();
    resultText.textContent = `${amount} ${fromCurrency} = ${data.conversion_result} ${toCurrency}`;
  } catch (error) {
    console.log("Hata ", error);
    resultText.textContent = "Bir hata oluştu. Kodunu kontrol et.";
  }
}

fetchCurrencies();
