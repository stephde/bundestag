
export default {
  dateString: date => {
    return new Date(date).toLocaleDateString()
  },
  timeString: date => {
    return new Date(date).toLocaleTimeString()
  },
  dateTimeString: date => {
    const dateObject = new Date(date)
    return `${dateObject.toLocaleDateString()} ${dateObject.toLocaleTimeString()}`
  }
}
