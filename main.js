function GetCryptoCurrencyPrice(binanceSymbolPair) {
    return new Promise(function(resolve, reject) {
        fetch(`https://api.binance.com/api/v3/ticker/price?symbol=${binanceSymbolPair}`)
            .then(response => response.json())
            .then(data => {
                if (data && data.price) {
                    return resolve(parseFloat(data.price).toFixed(2))
                }
            })
            .catch((error) => {
                return reject(error)
            })
    })
}

function numberWithSpaces(x) {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    return parts.join(".");
}

function GetBtcPrice() {
    setInterval(function() {
        GetCryptoCurrencyPrice("BTCBUSD")
            .then(data => document.getElementById("btcPrice").innerText = numberWithSpaces(data))
            .catch(err => console.error(err))
    }, 5000)
}

function GetEthPrice() {
    setInterval(function() {
        GetCryptoCurrencyPrice("ETHBUSD")
            .then(data => document.getElementById("ethPrice").innerText = numberWithSpaces(data))
            .catch(err => console.error(err))
    }, 5000)
}

function Onload() {
    GetBtcPrice()
    GetEthPrice()
}

Onload()