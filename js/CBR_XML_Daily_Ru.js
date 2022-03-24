function CBR_XML_Daily_Ru(rates) {

    function trend(current, previous) {
        var rounded = function(number) {
            return +number.toFixed(3);
        }
        if (current > previous) return " ▲ " + rounded((current - previous) / current * 100) + "%";
        if (current < previous) return " ▼ " + rounded((current - previous) / current * 100) + "%";
        return "";
    }

    function getRow(valute) {
        return `
					<tr title="${valute.Name}">
							<th><a href="./oldData.html?${valute.CharCode}">${valute.CharCode}</a></th>
							<td>${valute.Value}</td>
							<td>${valute.Previous}</td>
							<td>${trend(valute.Value, valute.Previous)}</td>
					</tr>`;
    }
    let tBody = document.querySelector("tbody");
    for (var key in rates.Valute) {
        tBody.insertAdjacentHTML("beforeend", getRow(rates.Valute[key]))
    }
}