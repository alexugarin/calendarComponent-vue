import { ref } from 'vue'

const updateDateGrid = (date) => {
  const [_, monthName, __, year] = date.dateString.split(' ')
  const numberOfDays = getNumberOfDays(monthName, year)
  const currentMonthDates = []
  const monthNumber = date.str.getMonth() + 1
  for (let i = 0; i < numberOfDays; i++) {
    const item = {}
    const day = new Date(`${year}-${monthNumber}-${i + 1}`).getDay()
    item.id = i + 1
    item.dt = i + 1
    item.day = DAYS[day]
    currentMonthDates.push(item)
  }
  return arrangeGridAccordingToDays(currentMonthDates)
}

export const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const arrangeGridAccordingToDays = (currentMonthDates) => {
  let newDateGrid = []
  const firstDay = DAYS.indexOf(currentMonthDates[0].day)
  for (let i = 0; i <= firstDay; i++) {
    if (i < firstDay) {
      newDateGrid = [
        ...newDateGrid,
        {
          id: Math.random(),
          dt: '',
          day: DAYS[i]
        }
      ]
    } else {
      newDateGrid = [...newDateGrid, ...currentMonthDates]
    }
  }
  return newDateGrid
}

const getNumberOfDays = (month, year) => {
  const thirtyOneDays = ['Jan', 'Mar', 'May', 'Jul', 'Aug', 'Oct', 'Dec']
  if (thirtyOneDays.includes(month)) return 31
  else if (month === 'Feb') return isLeapYear(year) ? 29 : 28
  return 30
}

const isLeapYear = (year) => {
  const firstCondition = year % 4 === 0 && year % 100 !== 0
  const secondCondition = year % 4 === 0 && year % 100 === 0 && year % 400 === 0
  if (firstCondition || secondCondition) return true
  return false
}

const increase = (month, year) => {
  const obj = {}

  if (month !== 12) {
    obj.str = new Date(`${year}-${month + 1}`)
    obj.dateString = new Date(`${year}-${month + 1}`).toDateString()
  } else {
    obj.str = new Date(`${year + 1}-01`)
    obj.dateString = new Date(`${year + 1}-01`).toDateString()
  }
  return obj
}
const decrease = (month, year) => {
  const obj = {}

  if (month !== 1) {
    obj.str = new Date(`${year}-${month - 1}`)
    obj.dateString = new Date(`${year}-${month - 1}`).toDateString()
  } else {
    obj.str = new Date(`${year - 1}-12`)
    obj.dateString = new Date(`${year - 1}-12`).toDateString()
  }
  return obj
}

const updateDate = (date, payload) => {
  const year = date.str.getFullYear()
  const month = date.str.getMonth() + 1
  let newDate = {}
  if (payload.direction === 'next-month') {
    newDate = increase(month, year)
  } else newDate = decrease(month, year)
  return newDate
}

export const state = ref({
  date: {
    str: new Date(),
    dateString: new Date().toDateString()
  },
  dateGrid: updateDateGrid({ str: new Date(), dateString: new Date().toDateString() }),
  current: {
    currentDay: DAYS[new Date().getDay()],
    currentDate: new Date().getDate(),
    currentMonth: new Date().getMonth() + 1,
    currentYear: new Date().getFullYear()
  }
})

export const dispatch = (action) => {
  if (action.type === 'updateDate') {
    const newDate = updateDate(state.value.date, action.payload)
    const newGrid = updateDateGrid(newDate)

    state.value = {
      ...state.value,
      date: newDate,
      dateGrid: newGrid,
      current: {
        ...state.value.current,
        currentMonth: newDate.str.getMonth() + 1,
        currentYear: newDate.str.getFullYear(),
        currentDate:
          state.value.current.currentDate <=
          getNumberOfDays(newDate.dateString.split(' ')[1], newDate.str.getFullYear())
            ? state.value.current.currentDate
            : getNumberOfDays(newDate.dateString.split(' ')[1], newDate.str.getFullYear())
      }
    }
  } else if (action.type === 'clickDate') {
    state.value = {
      ...state.value,
      current: {
        ...state.value.current,
        currentDay: action.payload.date.day,
        currentDate: action.payload.date.dt
      }
    }
  }
}
