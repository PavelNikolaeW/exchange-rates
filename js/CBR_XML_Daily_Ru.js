function translit(word) {
    var answer = '';
    var converter = {
        'а': 'a',
        'б': 'b',
        'в': 'v',
        'г': 'g',
        'д': 'd',
        'е': 'e',
        'ё': 'e',
        'ж': 'zh',
        'з': 'z',
        'и': 'i',
        'й': 'y',
        'к': 'k',
        'л': 'l',
        'м': 'm',
        'н': 'n',
        'о': 'o',
        'п': 'p',
        'р': 'r',
        'с': 's',
        'т': 't',
        'у': 'u',
        'ф': 'f',
        'х': 'h',
        'ц': 'c',
        'ч': 'ch',
        'ш': 'sh',
        'щ': 'sch',
        'ь': '',
        'ы': 'y',
        'ъ': '',
        'э': 'e',
        'ю': 'yu',
        'я': 'ya',

        'А': 'A',
        'Б': 'B',
        'В': 'V',
        'Г': 'G',
        'Д': 'D',
        'Е': 'E',
        'Ё': 'E',
        'Ж': 'Zh',
        'З': 'Z',
        'И': 'I',
        'Й': 'Y',
        'К': 'K',
        'Л': 'L',
        'М': 'M',
        'Н': 'N',
        'О': 'O',
        'П': 'P',
        'Р': 'R',
        'С': 'S',
        'Т': 'T',
        'У': 'U',
        'Ф': 'F',
        'Х': 'H',
        'Ц': 'C',
        'Ч': 'Ch',
        'Ш': 'Sh',
        'Щ': 'Sch',
        'Ь': '',
        'Ы': 'Y',
        'Ъ': '',
        'Э': 'E',
        'Ю': 'Yu',
        'Я': 'Ya'
    };

    for (var i = 0; i < word.length; ++i) {
        if (converter[word[i]] == undefined) {
            answer += word[i];
        } else {
            answer += converter[word[i]];
        }
    }

    return answer;
}

function CBR_XML_Daily_Ru(rates) {

    function getTrend(current, previous) {
        var rounded = function(number) {
            return +number.toFixed(3);
        }
        if (current > previous) return " ▲  " + rounded((current - previous) / current * 100) + "%";
        if (current < previous) return " ▼ " + rounded((current - previous) / current * 100) + "%";
        return "";
    }

    function getRow(valute) {
        const trendRow = getTrend(valute.Value, valute.Previous);
        return `
					<tr title="${valute.Name}">
							<th><a href="./oldData.html?${valute.CharCode}?${translit(valute.Name)}">${valute.CharCode}</a></th>
							<td>${valute.Value}</td>
							<td class="${trendRow[3] === "-" ? "text-danger" : "text-success"}">${trendRow}</td>
					</tr>`;
    }
    let tBody = document.querySelector("tbody");
    for (var key in rates.Valute) {
        tBody.insertAdjacentHTML("beforeend", getRow(rates.Valute[key]))
    }
}