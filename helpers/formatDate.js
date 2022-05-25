function formatDate(date) {
    let day = date.getDate()
    let month = date.getMonth() + 1
    let year = date.getFullYear()
    let hour = date.getHours()
    let minute = date.getMinutes()

    return `${day}-${month}-${year} ${hour}:${minute} WIB`
}

module.exports = formatDate