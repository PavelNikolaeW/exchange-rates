function getRow(valute) {
    const trendRow = getTrend(valute.Value, valute.Previous);
    return `
		<tr title="${valute.Name}">
				<th><a href="./oldData.html?${valute.CharCode}?${translit(valute.Name)}">${valute.CharCode}</a></th>
				<td>${valute.Value}</td>
				<td class="${trendRow[3] === "-" ? "text-danger" : "text-success"}">${trendRow}</td>
		</tr>`;
}

function CBR_XML_Daily_Ru(rates) {
    let tBody = document.querySelector("tbody");
    for (var key in rates.Valute) {
        tBody.insertAdjacentHTML("beforeend", getRow(rates.Valute[key]))
    }
}