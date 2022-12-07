import { isPast, addYears } from 'date-fns'

export function birthdayIsToday(inputDate) {
  inputDate.setHours(23, 59);

  // Get the current date
  let currentDate = new Date();
  let currentYear = currentDate.getFullYear();

  // Change the year of the birthday being compared to the current year
  inputDate.setFullYear(currentYear);

  // If the date being compared is in the past, add one extra year to make it a future year.
  // Else keep the year.
  let sameDay = inputDate.getDay() === currentDate.getDay()
  let sameDate = inputDate.getDate() === currentDate.getDate()
  let sameMonth = inputDate.getMonth() === currentDate.getMonth()

  return (sameDay && sameDate && sameMonth);
}

export function updateBirthday(inputDate) {

  if (isPast(inputDate) && !birthdayIsToday(inputDate)) {
    return addYears(new Date(inputDate), 1).toDateString()
  } else {
    return (new Date(inputDate).toDateString())
  }

}
