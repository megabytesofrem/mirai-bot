/*
 * Convert a length in seconds to a timestamp string, e.g. 3:56:34
 * @param {int} seconds - Time in seconds
 * @returns {string} - Timestamp string
 */
export function secondsToTimestamp(seconds) {
    const h = Math.floor(seconds / 3600)
    const m = Math.floor(seconds % 3600 / 60)
    const s = Math.floor(seconds % 3600 % 60)
    
    return `${h > 0 ? "1:" : ""}${h > 0 && m < 10 ? "0" : ""}${m}:${s < 10 ? "0" : ""}${s}`
}

/*
 * Convert a timestamp string to second, e.g. 1:30 to 90 seconds
 * @param {string} timestamp - Timestamp string to convert
 * @returns {number} - Timestamp in seconds
 */
export function timestampToSeconds(timestamp) {
    const x = timestamp.split(":").reverse().slice(0, 3)
    var seconds = 0
    var multiplier = 1
    for (var y of x) {
        const number = parseInt(y)
        if (number == NaN) {
            return 0
        }
        seconds += number * multiplier
        multiplier *= 60
    }
    return seconds
}

/*
 * Convert a JS Date to a human readable string in "January 1, 2000" format
 * @param {object} date - Date to format
 */
export function humanReadableDate(date) {
    // en-US is the best format
    return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
}

/*
 * Insert commas between portions of a number
 * @param {int} number - Number to insert commas between
 */
export function numberWithCommas(number) {
    // https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}