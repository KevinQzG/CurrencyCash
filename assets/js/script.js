document.addEventListener('DOMContentLoaded', () => {
   const selectElement = document.querySelector('.custom-select1');
   selectElement.setAttribute('tabindex', '0');
   let lastSelectedIndexForKey = {};

   selectElement.addEventListener('keydown', (e) => {
       if (!e.key.match(/^[a-z]$/i)) return;

       const options = selectElement.querySelectorAll('.option');
       const pressedKey = e.key.toLowerCase();
       let startIndex = lastSelectedIndexForKey[pressedKey] + 1 || 0;

       for (let i = startIndex; i < startIndex + options.length; i++) {
           let option = options[i % options.length];
           if (option.textContent.trim().toLowerCase().startsWith(pressedKey)) {
               option.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
               lastSelectedIndexForKey[pressedKey] = i % options.length;
               break;
           }
       }
   });
});

document.addEventListener('DOMContentLoaded', () => {
   const selectElement = document.querySelector('.custom-select2');
   selectElement.setAttribute('tabindex', '0');
   let lastSelectedIndexForKey = {};

   selectElement.addEventListener('keydown', (e) => {
       if (!e.key.match(/^[a-z]$/i)) return;

       const options = selectElement.querySelectorAll('.option');
       const pressedKey = e.key.toLowerCase();
       let startIndex = lastSelectedIndexForKey[pressedKey] + 1 || 0;

       for (let i = startIndex; i < startIndex + options.length; i++) {
           let option = options[i % options.length];
           if (option.textContent.trim().toLowerCase().startsWith(pressedKey)) {
               option.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
               lastSelectedIndexForKey[pressedKey] = i % options.length;
               break;
           }
       }
   });
});


document.addEventListener('DOMContentLoaded', () => {
   const fromCurrency = document.getElementById('from-currency');
   const toCurrency = document.getElementById('to-currency');
   const fromAmount = document.getElementById('from-amount');
   const toAmount = document.getElementById('to-amount');
   const exchangeRateDisplay = document.getElementById('exchange-rate');
   const exchangeButton = document.getElementById('exchange-button');

   const apiKey = '4bbf5123f1497f13b1d689b3';
   const apiBaseUrl = 'https://v6.exchangerate-api.com/v6/';

   const currencies = {
       'USD': { name: 'Dollar', flag: 'us.svg' },
       'EUR': { name: 'Euro', flag: 'eu.svg' },
       'GBP': { name: 'Pound Sterling', flag: 'gb.svg' },
       'CNY': { name: 'Chinese Yuan', flag: 'cn.svg' },
       'JPY': { name: 'Japanese Yen', flag: 'jp.svg' },
       'AED': { name: 'UAE Dirham', flag: 'ae.svg' },
       'AFN': { name: 'Afghan Afghani', flag: 'af.svg' },
       'ALL': { name: 'Albanian Lek', flag: 'al.svg' },
       'AMD': { name: 'Armenian Dram', flag: 'am.svg' },
       'ANG': { name: 'Guilder', flag: 'an.svg' },
       'AOA': { name: 'Angolan Kwanza', flag: 'ao.svg' },
       'ARS': { name: 'Argentine Peso', flag: 'ar.svg' },
       'AUD': { name: 'Australian Dollar', flag: 'au.svg' },
       'AWG': { name: 'Aruban Florin', flag: 'aw.svg' },
       'AZN': { name: 'Azerbaijani Manat', flag: 'az.svg' },
       'BAM': { name: 'Convertible Mark', flag: 'ba.svg' },
       'BBD': { name: 'Barbadian Dollar', flag: 'bb.svg' },
       'BDT': { name: 'Bangladeshi Taka', flag: 'bd.svg' },
       'BGN': { name: 'Bulgarian Lev', flag: 'bg.svg' },
       'BHD': { name: 'Bahraini Dinar', flag: 'bh.svg' },
       'BIF': { name: 'Burundian Franc', flag: 'bi.svg' },
       'BMD': { name: 'Bermudian Dollar', flag: 'bm.svg' },
       'BND': { name: 'Brunei Dollar', flag: 'bn.svg' },
       'BOB': { name: 'Bolivian Boliviano', flag: 'bo.svg' },
       'BRL': { name: 'Brazilian Real', flag: 'br.svg' },
       'BSD': { name: 'Bahamian Dollar', flag: 'bs.svg' },
       'BTN': { name: 'Ngultrum', flag: 'bt.svg' },
       'BWP': { name: 'Botswana Pula', flag: 'bw.svg' },
       'BYN': { name: 'Belarusian Ruble', flag: 'by.svg' },
       'BZD': { name: 'Belize Dollar', flag: 'bz.svg' },
       'CAD': { name: 'Canadian Dollar', flag: 'ca.svg' },
       'CDF': { name: 'Congolese Franc', flag: 'cd.svg' },
       'CHF': { name: 'Swiss Franc', flag: 'ch.svg' },
       'CLP': { name: 'Chilean Peso', flag: 'cl.svg' },
       'COP': { name: 'Colombian Peso', flag: 'co.svg' },
       'CRC': { name: 'Colón', flag: 'cr.svg' },
       'CUP': { name: 'Cuban Peso', flag: 'cu.svg' },
       'CVE': { name: 'CV Escudo', flag: 'cv.svg' },
       'CZK': { name: 'Czech Koruna', flag: 'cz.svg' },
       'DJF': { name: 'Djiboutian Franc', flag: 'dj.svg' },
       'DKK': { name: 'Danish Krone', flag: 'dk.svg' },
       'DOP': { name: 'Dominican Peso', flag: 'do.svg' },
       'DZD': { name: 'Algerian Dinar', flag: 'dz.svg' },
       'EGP': { name: 'Egyptian Pound', flag: 'eg.svg' },
       'ERN': { name: 'Eritrean Nakfa', flag: 'er.svg' },
       'ETB': { name: 'Ethiopian Birr', flag: 'et.svg' },
       'FJD': { name: 'Fijian Dollar', flag: 'fj.svg' },
       'GEL': { name: 'Georgian Lari', flag: 'ge.svg' },
       'GGP': { name: 'Guernsey Pound', flag: 'gg.svg' },
       'GHS': { name: 'Ghanaian Cedi', flag: 'gh.svg' },
       'GIP': { name: 'Gibraltar Pound', flag: 'gi.svg' },
       'GMD': { name: 'Gambian Dalasi', flag: 'gm.svg' },
       'GNF': { name: 'Guinean Franc', flag: 'gn.svg' },
       'GTQ': { name: 'Quetzal', flag: 'gt.svg' },
       'HKD': { name: 'Hong Kong Dollar', flag: 'hk.svg' },
       'HNL': { name: 'Honduran Lempira', flag: 'hn.svg' },
       'HTG': { name: 'Haitian Gourde', flag: 'ht.svg' },
       'HUF': { name: 'Hungarian Forint', flag: 'hu.svg' },
       'IDR': { name: 'Indonesian Rupiah', flag: 'id.svg' },
       'ILS': { name: 'Israeli New Shekel', flag: 'il.svg' },
       'IMP': { name: 'Isle of Man Pound', flag: 'im.svg' },
       'INR': { name: 'Indian Rupee', flag: 'in.svg' },
       'IQD': { name: 'Iraqi Dinar', flag: 'iq.svg' },
       'IRR': { name: 'Iranian Rial', flag: 'ir.svg' },
       'ISK': { name: 'Icelandic Króna', flag: 'is.svg' },
       'JEP': { name: 'Jersey Pound', flag: 'je.svg' },
       'JMD': { name: 'Jamaican Dollar', flag: 'jm.svg' },
       'JOD': { name: 'Jordanian Dinar', flag: 'jo.svg' },
       'KES': { name: 'Kenyan Shilling', flag: 'ke.svg' },
       'KGS': { name: 'Kyrgyzstani Som', flag: 'kg.svg' },
       'KHR': { name: 'Cambodian Riel', flag: 'kh.svg' },
       'KID': { name: 'Kiribati Dollar', flag: 'ki.svg' },
       'KMF': { name: 'Comorian Franc', flag: 'km.svg' },
       'KRW': { name: 'South Korean Won', flag: 'kr.svg' },
       'KWD': { name: 'Kuwaiti Dinar', flag: 'kw.svg' },
       'KYD': { name: 'KYD Dollar', flag: 'ky.svg' },
       'KZT': { name: 'Kazakhstani Tenge', flag: 'kz.svg' },
       'LAK': { name: 'Lao Kip', flag: 'la.svg' },
       'LBP': { name: 'Lebanese Pound', flag: 'lb.svg' },
       'LKR': { name: 'Sri Lankan Rupee', flag: 'lk.svg' },
       'LRD': { name: 'Liberian Dollar', flag: 'lr.svg' },
       'LSL': { name: 'Lesotho Loti', flag: 'ls.svg' },
       'LYD': { name: 'Libyan Dinar', flag: 'ly.svg' },
       'MAD': { name: 'Moroccan Dirham', flag: 'ma.svg' },
       'MDL': { name: 'Moldovan Leu', flag: 'md.svg' },
       'MGA': { name: 'Malagasy Ariary', flag: 'mg.svg' },
       'MMK': { name: 'Myanmar Kyat', flag: 'mm.svg' },
       'MNT': { name: 'Mongolian Tögrög', flag: 'mn.svg' },
       'MOP': { name: 'Macanese Pataca', flag: 'mo.svg' },
       'MRU': { name: 'Ouguiya', flag: 'mr.svg' },
       'MUR': { name: 'Mauritian Rupee', flag: 'mu.svg' },
       'MVR': { name: 'Maldivian Rufiyaa', flag: 'mv.svg' },
       'MWK': { name: 'Malawian Kwacha', flag: 'mw.svg' },
       'MXN': { name: 'Mexican Peso', flag: 'mx.svg' },
       'MYR': { name: 'Malaysian Ringgit', flag: 'my.svg' },
       'MZN': { name: 'Metical', flag: 'mz.svg' },
       'NAD': { name: 'Namibian Dollar', flag: 'na.svg' },
       'NGN': { name: 'Nigerian Naira', flag: 'ng.svg' },
       'NIO': { name: 'Córdoba', flag: 'ni.svg' },
       'NOK': { name: 'Norwegian Krone', flag: 'no.svg' },
       'NPR': { name: 'Nepalese Rupee', flag: 'np.svg' },
       'NZD': { name: 'NZD Dollar', flag: 'nz.svg' },
       'OMR': { name: 'Omani Rial', flag: 'om.svg' },
       'PEN': { name: 'Peruvian Sol', flag: 'pe.svg' },
       'PGK': { name: 'Papua NG Kina', flag: 'pg.svg' },
       'PHP': { name: 'Philippine Peso', flag: 'ph.svg' },
       'PKR': { name: 'Pakistani Rupee', flag: 'pk.svg' },
       'PLN': { name: 'Polish Złoty', flag: 'pl.svg' },
       'PYG': { name: 'Guaraní', flag: 'py.svg' },
       'QAR': { name: 'Qatari Riyal', flag: 'qa.svg' },
       'RON': { name: 'Romanian Leu', flag: 'ro.svg' },
       'RSD': { name: 'Serbian Dinar', flag: 'rs.svg' },
       'RUB': { name: 'Russian Ruble', flag: 'ru.svg' },
       'RWF': { name: 'Rwandan Franc', flag: 'rw.svg' },
       'SAR': { name: 'Saudi Riyal', flag: 'sa.svg' },
       'SBD': { name: 'SBD Dollar', flag: 'sb.svg' },
       'SCR': { name: 'Seychellois Rupee', flag: 'sc.svg' },
       'SDG': { name: 'Sudanese Pound', flag: 'sd.svg' },
       'SEK': { name: 'Swedish Krona', flag: 'se.svg' },
       'SGD': { name: 'Singapore Dollar', flag: 'sg.svg' },
       'SOS': { name: 'Somali Shilling', flag: 'so.svg' },
       'SRD': { name: 'Surinamese Dollar', flag: 'sr.svg' },
       'SSP': { name: 'SSP Pound', flag: 'ss.svg' },
       'STN': { name: 'Dobra', flag: 'st.svg' },
       'SYP': { name: 'Syrian Pound', flag: 'sy.svg' },
       'SZL': { name: 'Eswatini Lilangeni', flag: 'sz.svg' },
       'THB': { name: 'Thai Baht', flag: 'th.svg' },
       'TJS': { name: 'Tajikistani Somoni', flag: 'tj.svg' },
       'TMT': { name: 'Manat', flag: 'tm.svg' },
       'TND': { name: 'Tunisian Dinar', flag: 'tn.svg' },
       'TOP': { name: 'Tongan Paʻanga', flag: 'to.svg' },
       'TRY': { name: 'Turkish Lira', flag: 'tr.svg' },
       'TTD': { name: 'TTD Dollar', flag: 'tt.svg' },
       'TVD': { name: 'Tuvaluan Dollar', flag: 'tv.svg' },
       'TWD': { name: 'New Taiwan Dollar', flag: 'tw.svg' },
       'TZS': { name: 'Tanzanian Shilling', flag: 'tz.svg' },
       'UAH': { name: 'Ukrainian Hryvnia', flag: 'ua.svg' },
       'UGX': { name: 'Ugandan Shilling', flag: 'ug.svg' },
       'UYU': { name: 'Uruguayan Peso', flag: 'uy.svg' },
       'UZS': { name: 'Uzbekistani Som', flag: 'uz.svg' },
       'VES': { name: 'Bolívar Soberano', flag: 've.svg' },
       'VND': { name: 'Vietnamese Đồng', flag: 'vn.svg' },
       'VUV': { name: 'Vanuatu Vatu', flag: 'vu.svg' },
       'WST': { name: 'Samoan Tala', flag: 'ws.svg' },
       'XAF': { name: 'XAF CFA Franc', flag: 'cm.svg' },
       'XCD': { name: 'XCD Dollar', flag: 'ag.svg' },
       'XOF': { name: 'XAF CFA Franc', flag: 'bj.svg' },
       'XPF': { name: 'CFP Franc', flag: 'pf.svg' },
       'YER': { name: 'Yemeni Rial', flag: 'ye.svg' },
       'ZAR': { name: 'South African Rand', flag: 'za.svg' },
       'ZMW': { name: 'Zambian Kwacha', flag: 'zm.svg' },
       'ZWL': { name: 'Zimbabwean Dollar', flag: 'zw.svg' },
   };

   const lastKeyPress = {};

   const loadCurrencies = () => {
       Object.keys(currencies).forEach(code => {
           const currency = currencies[code];
           const optionFrom = document.createElement('div');
           optionFrom.classList.add('option');
           optionFrom.innerHTML = `<img src="./assets/images/${currency.flag}" class="flag-icon" alt="${currency.name} flag"> ${currency.name} (${code})`;
           optionFrom.setAttribute('data-value', code);



           const optionTo = optionFrom.cloneNode(true);
           fromCurrency.querySelector('.select-items').appendChild(optionFrom);
           toCurrency.querySelector('.select-items').appendChild(optionTo);
       });
   };

   const setupCustomSelect = (selectContainer) => {
       const selected = selectContainer.querySelector('.select-selected');
       const items = selectContainer.querySelector('.select-items');

       selected.addEventListener('click', () => {
           closeAllSelect(selected);
           items.classList.toggle('select-hide');
           selected.classList.toggle('select-arrow-active');
       });

       items.addEventListener('click', (e) => {
           const selectedOption = e.target.closest('.option');
           if (selectedOption) {
               selected.innerHTML = selectedOption.innerHTML;
               selectContainer.setAttribute('data-value', selectedOption.getAttribute('data-value'));
               updateExchangeRate();
               items.classList.add('select-hide');
               selected.classList.remove('select-arrow-active');
           }
       });

       document.addEventListener('keydown', function (e) {
           if (!items.classList.contains('select-hide')) {
               const options = items.querySelectorAll('.option');
               const key = e.key.toLowerCase();

               if (!lastKeyPress[key]) {
                   lastKeyPress[key] = -1;
               }

               let nextIndex = -1;
               for (let i = lastKeyPress[key] + 1; i < options.length; i++) {
                   if (options[i].textContent.toLowerCase().startsWith(key)) {
                       nextIndex = i;
                       break;
                   }
               }

               if (nextIndex === -1) {
                   for (let i = 0; i <= lastKeyPress[key]; i++) {
                       if (options[i].textContent.toLowerCase().startsWith(key)) {
                           nextIndex = i;
                           break;
                       }
                   }
               }

               if (nextIndex !== -1) {
                   options[nextIndex].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                   lastKeyPress[key] = nextIndex;
               }
           }
       });
   };

   const closeAllSelect = (element) => {
       const allItems = document.getElementsByClassName('select-items');
       const allSelected = document.getElementsByClassName('select-selected');
       for (let i = 0; i < allSelected.length; i++) {
           if (element === allSelected[i]) continue;
           allSelected[i].classList.remove('select-arrow-active');
       }
       for (let i = 0; i < allItems.length; i++) {
           if (element.parentElement.contains(allItems[i])) continue;
           allItems[i].classList.add('select-hide');
       }
   };

   const updateExchangeRate = async () => {
      const from = fromCurrency.getAttribute('data-value');
      const to = toCurrency.getAttribute('data-value');
      const amount = parseFloat(fromAmount.value.replace(/,/g, '')); // Cambio: Asegurarse de eliminar comas antes de convertir a número

      if (!from || !to || isNaN(amount)) return; // Verificar que amount sea un número válido

      const response = await fetch(`${apiBaseUrl}${apiKey}/latest/${from}`);
      const data = await response.json();

      const rate = data.conversion_rates[to];
      const formattedRate = rate.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 });
      exchangeRateDisplay.textContent = `1 ${from} = ${formattedRate} ${to}`;

      const convertedAmount = (amount * rate).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2}); // Cambio: Asegurarse de formatear correctamente el monto convertido
      toAmount.value = convertedAmount; // Cambio: Actualizar el valor del campo de entrada
  };

   loadCurrencies();
   setupCustomSelect(fromCurrency);
   setupCustomSelect(toCurrency);

   fromAmount.addEventListener('input', updateExchangeRate); 
   exchangeButton.addEventListener('click', updateExchangeRate);

   document.addEventListener('click', (e) => {
       closeAllSelect(e.target);
   });

   updateExchangeRate();
});

document.getElementById('from-amount').addEventListener('input', function (e) {
    const input = e.target;
    const value = input.value;

    const filteredValue = value.replace(/[^0-9.,]/g, '').replace(/e/g, '');

    if (value !== filteredValue) {
        input.value = filteredValue;
    }
});


document.addEventListener("DOMContentLoaded", function () {
   const languageOptions = document.querySelectorAll(".language-option");
   const fromCurrencySelect = document.getElementById('from-currency');
   const toCurrencySelect = document.getElementById('to-currency');
   const fromAmountInput = document.getElementById('from-amount');
   const toAmountInput = document.getElementById('to-amount');
   const exchangeRateDisplay = document.getElementById('exchange-rate');
   const exchangeButton = document.querySelector('.exchange-icon');

   const translations = {
      en: {
         home: "Home",
         about: "About us",
         currencyConverter: "Currency Converter",
         description: "Quickly find out the value of one currency against another, choose from hundreds of them.",
         amount: "Amount",
         exchangeRate: "Indicative Exchange Rate:",
         selectCurrency: "Select currency",
         convertedAmount: "Converted Amount",
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

      fromCurrencySelect.addEventListener('change', updateExchangeRate);
      toCurrencySelect.addEventListener('change', updateExchangeRate);
      fromAmountInput.addEventListener('input', updateExchangeRate);
      exchangeButton.addEventListener('click', swapCurrencies);
      updateExchangeRate();
   }
   
   async function updateExchangeRate() {
      const fromCurrency = fromCurrencySelect.getAttribute('data-value');
      const toCurrency = toCurrencySelect.getAttribute('data-value');
      if (!fromCurrency || !toCurrency) return;
   
      const apiKey = '4bbf5123f1497f13b1d689b3';
      const apiBaseUrl = 'https://v6.exchangerate-api.com/v6/';
      const response = await fetch(`${apiBaseUrl}${apiKey}/latest/${fromCurrency}`);
      const data = await response.json();
   
      const rate = data.conversion_rates[toCurrency];
      const formattedRate = new Intl.NumberFormat(document.documentElement.lang, { minimumFractionDigits: 0, maximumFractionDigits: 2 }).format(rate);
      const lang = document.documentElement.lang || 'en';
      const translatedRateText = translations[lang].exchangeRate;
   
      exchangeRateDisplay.innerHTML = `${translatedRateText} 1 ${fromCurrency} = ${formattedRate} ${toCurrency}`;
      
      const amount = parseFloat(fromAmountInput.value.replace(/,/g, '')); 
      if (!isNaN(amount)) {
         const convertedAmount = amount * rate;
         const formattedAmount = new Intl.NumberFormat(document.documentElement.lang, { minimumFractionDigits: 0, maximumFractionDigits: 2 }).format(convertedAmount);
         toAmountInput.value = formattedAmount;
      } else {
         toAmountInput.value = '';
      }
   }

   function swapCurrencies() {
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
   }

   languageOptions.forEach(option => {
      option.addEventListener("click", function () {
         const lang = this.getAttribute("data-lang");
         document.documentElement.lang = lang;
         changeLanguage(lang);
      });
   });

   fromCurrencySelect.addEventListener('change', updateExchangeRate);
   toCurrencySelect.addEventListener('change', updateExchangeRate);
   fromAmountInput.addEventListener('input', updateExchangeRate);
   exchangeButton.addEventListener('click', swapCurrencies);

   updateExchangeRate();
});
