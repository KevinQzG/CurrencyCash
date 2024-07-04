document.addEventListener('DOMContentLoaded', () => {
    const fromCurrency = document.getElementById('from-currency');
    const toCurrency = document.getElementById('to-currency');
    const fromAmount = document.getElementById('from-amount');
    const toAmount = document.getElementById('to-amount');
    const exchangeRateDisplay = document.getElementById('exchange-rate');
    const exchangeButton = document.getElementById('exchange-button');

    const apiKey = 'f26cc902b8d80e55570a162c';
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
        'CRC': { name: 'Costa Rican Colón', flag: 'cr.svg' },
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

    document.addEventListener('click', (e) => {
        closeAllSelect(e.target);
    });

    const updateExchangeRate = async () => {
        const from = fromCurrency.getAttribute('data-value');
        const to = toCurrency.getAttribute('data-value');
        if (!from || !to) return;

        const response = await fetch(`${apiBaseUrl}${apiKey}/latest/${from}`);
        const data = await response.json();

        const rate = data.conversion_rates[to];
        exchangeRateDisplay.textContent = `1 ${from} = ${rate} ${to}`;
        toAmount.value = (fromAmount.value * rate).toFixed(2);
    };

    exchangeButton.addEventListener('click', () => {
        const fromSelected = fromCurrency.getAttribute('data-value');
        const toSelected = toCurrency.getAttribute('data-value');

        if (fromSelected && toSelected) {
            fromCurrency.setAttribute('data-value', toSelected);
            toCurrency.setAttribute('data-value', fromSelected);

            const fromSelectedText = fromCurrency.querySelector('.select-selected').innerHTML;
            fromCurrency.querySelector('.select-selected').innerHTML = toCurrency.querySelector('.select-selected').innerHTML;
            toCurrency.querySelector('.select-selected').innerHTML = fromSelectedText;

            updateExchangeRate();
        }
    });

    loadCurrencies();
    setupCustomSelect(fromCurrency);
    setupCustomSelect(toCurrency);
    updateExchangeRate();

    fromAmount.addEventListener('input', updateExchangeRate);
});
