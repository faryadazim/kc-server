export function capitalizeFirstLetter(str) {
    if (typeof str !== 'string' || str.length === 0) {
        return str; // return as is if input is not a string or empty
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export function parseDateString(dateString) {
    const [day, month, year] = dateString.split('-').map(Number);
  
    // Month is 0-indexed in JavaScript Date objects, so subtract 1 from the month
    return new Date(year, month - 1, day);
  }