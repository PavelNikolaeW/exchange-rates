function getWeekDay(day) {
    let days = ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'];
    return days[day];
}

function makeUrls() {
    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth();
    var date = now.getDate();
    let result = [];

    for (var i = 1; result.length < 10; i++) {
        let oldDate = new Date(year, month, date - i)
        let oldMonth = oldDate.getMonth() + 1;
        let day = oldDate.getDay();

        if (getWeekDay(day) === "ВС" || getWeekDay(day) === "ПН")
            continue;
        if (oldMonth < 10)
            oldMonth = "0" + oldMonth;

        result.push(`https://www.cbr-xml-daily.ru/archive/${oldDate.getFullYear()}/${oldMonth}/${oldDate.getDate()}/daily_json.js`)
    }
    return result;
}

function log(data) {
    function getTrend(current, previous) {
        var rounded = function(number) {
            return +number.toFixed(3);
        }
        if (current > previous) return " ▲  " + rounded((current - previous) / current * 100) + "%";
        if (current < previous) return " ▼ " + rounded((current - previous) / current * 100) + "%";
        return "";
    }

    function getRow(valute, date) {
        const trendRow = getTrend(valute.Value, valute.Previous)
        return `	
			<tr title="${valute.Name}">
					<th scope="row">${date}</th>
					<td>${valute.CharCode}</td>
					<td>${valute.Value}</td>
					<td class="${trendRow[3] === "-" ? "text-danger" : "text-success"}">${trendRow}</td>
			</tr>`;
    }
    let tBody = document.querySelector("tbody");
    let key = window.location.href.split("?")[1];
    let date = data.Date.split("T")[0];
    tBody.insertAdjacentHTML("beforeend", getRow(data.Valute[key], date))
}

let urls = makeUrls()
let valuteName = "";

for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    fetch(url)
        .then(res => {
            if (res.ok) {
                return res.json()
            } else {
                throw Error
            }
        })
        .then(data => log(data))
        .catch(error => {
            console.log(error);
        })
}
let title = document.querySelector("title");
title.insertAdjacentText("beforeend", "История курса для " + window.location.href.split("?")[2].replace("%20", " "));