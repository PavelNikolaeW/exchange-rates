function rounded(number) {
    return +number.toFixed(3);
}

function getTrend(current, previous) {
    const trend = rounded((current - previous) / current * 100);
    if (current > previous) return " ▲  " + trend + "%";
    if (current < previous) return " ▼ " + trend + "%";
    return "";
}