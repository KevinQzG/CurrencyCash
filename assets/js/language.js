document.addEventListener("DOMContentLoaded", function() {
   const languageOptions = document.querySelectorAll(".language-option");
   const fromCurrencySelect = document.getElementById('from-currency');
   const toCurrencySelect = document.getElementById('to-currency');
   const fromAmountInput = document.getElementById('from-amount');
   const toAmountInput = document.getElementById('to-amount');
   const exchangeRateDisplay = document.getElementById('exchange-rate');
   const exchangeButton = document.querySelector('.exchange-button');

   const translations = {
       en: {
           home: "Home",
           about: "About us",
           currencyConverter: "Currency Converter",
           description: "Quickly find out the value of one currency against another, choose from hundreds of them.",
           amount: "Amount",
           selectCurrency: "Select currency",
           convertedAmount: "Converted Amount",
           exchangeRate: "Indicative Exchange Rate:"
       },
       es: {
           home: "Inicio",
           about: "Sobre nosotros",
           currencyConverter: "Convertidor de divisas",
           description: "Descubre rápidamente el valor de una moneda frente a otra, elige entre cientos de ellas.",
           amount: "Cantidad",
           selectCurrency: "Seleccionar moneda",
           convertedAmount: "Cantidad Convertida",
           exchangeRate: "Tasa de Cambio Indicativa:"
       },
       pt: {
           home: "Início",
           about: "Sobre nós",
           currencyConverter: "Conversor de Moedas",
           description: "Descubra rapidamente o valor de uma moeda em relação a outra, escolha entre centenas delas.",
           amount: "Quantidade",
           selectCurrency: "Selecionar moeda",
           convertedAmount: "Quantidade Convertida",
           exchangeRate: "Taxa de Câmbio Indicativa:"
       },
       fr: {
           home: "Accueil",
           about: "À propos de nous",
           currencyConverter: "Convertisseur de devises",
           description: "Découvrez rapidement la valeur d'une devise par rapport à une autre, choisissez parmi des centaines d'entre elles.",
           amount: "Montant",
           selectCurrency: "Sélectionner la devise",
           convertedAmount: "Montant Converti",
           exchangeRate: "Taux de Change Indicatif:"
       },
       de: {
           home: "Zuhause",
           about: "Über uns",
           currencyConverter: "Währungsumrechner",
           description: "Finden Sie schnell den Wert einer Währung gegenüber einer anderen heraus, wählen Sie aus Hunderten von ihnen.",
           amount: "Menge",
           selectCurrency: "Währung auswählen",
           convertedAmount: "Konvertierter Betrag",
           exchangeRate: "Indikativer Wechselkurs:"
       },
       it: {
           home: "Casa",
           about: "Chi siamo",
           currencyConverter: "Convertitore di valuta",
           description: "Scopri rapidamente il valore di una valuta rispetto a un'altra, scegli tra centinaia di esse.",
           amount: "Quantità",
           selectCurrency: "Seleziona valuta",
           convertedAmount: "Importo convertito",
           exchangeRate: "Tasso di cambio indicativo:"
       }
   };

   function changeLanguage(lang) {
       document.querySelector("nav ul li a[href='#home']").innerHTML = `<i class="fa-solid fa-home"></i> ${translations[lang].home}`;
       document.querySelector("nav ul li a[href='#about']").innerHTML = `<i class="fa-solid fa-address-card"></i> ${translations[lang].about}`;
       document.querySelector(".converter-container h1").textContent = translations[lang].currencyConverter;
       document.querySelector(".converter-container p").textContent = translations[lang].description;
       document.querySelector(".currency-row label[for='from-amount']").textContent = translations[lang].amount;
       document.querySelector(".currency-row label[for='to-amount']").textContent = translations[lang].convertedAmount;
       document.querySelector(".exchange-rate").innerHTML = `${translations[lang].exchangeRate} <span id="exchange-rate"></span>`;
       document.querySelectorAll(".select-selected").forEach(el => el.textContent = translations[lang].selectCurrency);

       // Call updateExchangeRate to update the exchange rate display
       updateExchangeRate();
   }

   async function updateExchangeRate() {
       const fromCurrency = fromCurrencySelect.getAttribute('data-value');
       const toCurrency = toCurrencySelect.getAttribute('data-value');
       if (!fromCurrency || !toCurrency) return;

       const apiKey = 'f26cc902b8d80e55570a162c';
       const apiBaseUrl = 'https://v6.exchangerate-api.com/v6/';
       const response = await fetch(`${apiBaseUrl}${apiKey}/latest/${fromCurrency}`);
       const data = await response.json();

       const rate = data.conversion_rates[toCurrency];
       exchangeRateDisplay.textContent = `1 ${fromCurrency} = ${rate} ${toCurrency}`;
       toAmountInput.value = (fromAmountInput.value * rate).toFixed(2);
   }

   languageOptions.forEach(option => {
       option.addEventListener("click", function() {
           const lang = this.getAttribute("data-lang");
           changeLanguage(lang);
       });
   });

   fromCurrencySelect.addEventListener('change', updateExchangeRate);
   toCurrencySelect.addEventListener('change', updateExchangeRate);
   fromAmountInput.addEventListener('input', updateExchangeRate);

   exchangeButton.addEventListener('click', () => {
       const fromSelected = fromCurrencySelect.getAttribute('data-value');
       const toSelected = toCurrencySelect.getAttribute('data-value');

       if (fromSelected && toSelected) {
           fromCurrencySelect.setAttribute('data-value', toSelected);
           toCurrencySelect.setAttribute('data-value', fromSelected);

           const fromSelectedText = fromCurrencySelect.querySelector('.select-selected').innerHTML;
           fromCurrencySelect.querySelector('.select-selected').innerHTML = toCurrencySelect.querySelector('.select-selected').innerHTML;
           toCurrencySelect.querySelector('.select-selected').innerHTML = fromSelectedText;

           updateExchangeRate();
       }
   });

   updateExchangeRate();
});
