function makeUrls() {
    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth();
    var date = now.getDate();


    let result = [];

    for (var i = 1; i < 11; i++) {
        let oldDate = new Date(year, month, date - i)
        let oldMonth = oldDate.getMonth();
        if (oldMonth < 10) oldMonth = "0" + oldMonth;
        result.push(`https://www.cbr-xml-daily.ru/archive/${oldDate.getFullYear()}/${oldMonth}/${oldDate.getDate()}/daily_json.js`)
    }
    return result;
}

function log(data) {
    function trend(current, previous) {
        var rounded = function(number) {
            return +number.toFixed(3);
        }
        if (current > previous) return " ▲ " + rounded((current - previous) / current * 100) + "%";
        if (current < previous) return " ▼ " + rounded((current - previous) / current * 100) + "%";
        return "";
    }

    function getRow(valute, date) {
        return `	
			<tr title="${valute.Name}">
					<th scope="row">${date}</th>
					<td>${valute.CharCode}</td>
					<td>${valute.Value}</td>
					<td>${trend(valute.Value, valute.Previous)}</td>
			</tr>`;
    }


    let tBody = document.querySelector("tbody");
    let key = window.location.href.split("?")[1];
    let date = data.Date.split("T")[0];
    tBody.insertAdjacentHTML("beforeend", getRow(data.Valute[key], date))

    // for (let key in data.Valute) {
    //     tBody.insertAdjacentHTML("beforeend", getRow(data.Valute[key]))
    // }
}

let urls = makeUrls()
for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    // fetch(url).then(resp => resp.json()).then(data => log(data));

    try {
        fetch(url).then(resp => resp.json()).then(data => log(data));
    } catch (err) {
        console.log(err);
    }
}