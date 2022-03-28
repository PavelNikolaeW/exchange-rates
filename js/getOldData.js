function getWeekDay(day) {
    let days = ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ']
    return days[day]
}

function makeUrls() {
    const now = new Date()
    const year = now.getFullYear()
    const month = now.getMonth()
    const date = now.getDate()
    let result = []

    for (var i = 1; result.length < 10; i++) {
        const oldDate = new Date(year, month, date - i)
        let oldMonth = oldDate.getMonth() + 1
        const day = getWeekDay(oldDate.getDay())

        if (day === "ВС" || day === "ПН")
            continue
        if (oldMonth < 10)
            oldMonth = "0" + oldMonth

        result.push(`https://www.cbr-xml-daily.ru/archive/${oldDate.getFullYear()}/${oldMonth}/${oldDate.getDate()}/daily_json.js`)
    }
    return result
}

function getRow(valute, date) {
    const trendRow = getTrend(valute.Value, valute.Previous)
    return `	
<tr title="${valute.Name}">
		<th scope="row">${date}</th>
		<td>${valute.CharCode}</td>
		<td>${valute.Value}</td>
		<td class="${trendRow[3] === "-" ? "text-danger" : "text-success"}">${trendRow}</td>
</tr>`
}

function log(data) {
    const tBody = document.querySelector("tbody")
    const key = window.location.href.split("?")[1]
    const date = data.Date.split("T")[0]
    tBody.insertAdjacentHTML("beforeend", getRow(data.Valute[key], date))
}

const urls = makeUrls()

for (let i = 0; i < urls.length; i++) {
    const url = urls[i]
    fetch(url)
        .then(res => {
            if (res.ok) {
                return res.json()
            } else {
                throw Error
            }
        })
        .then(data => {
            log(data)
            valuteName = data
        })
        .catch(error => {
            console.log(error)
        })
}

const title = document.querySelector("title")
title.insertAdjacentText("beforeend", "История курса для " + window.location.href.split("?")[1])