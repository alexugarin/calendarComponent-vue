import { ref } from 'vue'

const updateDateGrid = date => {
    const [ _, monthName, __, year ] = date.dateString.split(' ') // extracting month name and year
    const numberOfDays = getNumberOfDays(monthName, year) // recieving number of days
    const currentMonthDates = [] // will contain dates of current month
    const monthNumber = date.str.getMonth() + 1 // current month number 1 - 12
    for(let i = 0; i < numberOfDays; i++){
        const item = {} // creating an object that will contain day & date
        const day = new Date(`${year}-${monthNumber}-${i+1}`).getDay() // getting day number 0 - 6
        item.id = i + 1
        item.dt = i + 1
        item.day = DAYS[day] // getting day from DAYS array
        currentMonthDates.push(item) // adding item object containing day and date to currentMonthDates array
    }
    return arrangeGridAccordingToDays(currentMonthDates)
}

export const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const arrangeGridAccordingToDays = currentMonthDates => {
    let newDateGrid = []
    const firstDay = DAYS.indexOf(currentMonthDates[0].day) // getting index of first day
    for(let i = 0; i <= firstDay; i++){
        if(i < firstDay){
            newDateGrid = [...newDateGrid, {
                id: Math.random(),
                dt: '', //  adding empty date value
                day: DAYS[i]
            }]
        }else{
            newDateGrid = [...newDateGrid, ...currentMonthDates]
        }
    }
    return newDateGrid
}


const getNumberOfDays = (month, year) => {
    const thirtyOneDays = ['Jan', 'Mar', 'May', 'Jul', 'Aug', 'Oct', 'Dec'] // months having 31 days
    if(thirtyOneDays.includes(month)) return 31
    else if(month === 'Feb') return isLeapYear(year) ? 29 : 28 // checking if year is a leap year
    return 30
}

const isLeapYear = year => {
    const firstCondition = year % 4 === 0 && year % 100 !== 0 // If a year is divisible by 4 and is not divisible by 100
    const secondCondition = year % 4 === 0 && year % 100 === 0 && year % 400 === 0 // If a year is divisible by 4 and 100 and 400
    if(firstCondition || secondCondition) return true
    return false
}

const increase = (month, year) => {
    const obj = {}
    // checking month is not December👇🏻
    if(month !== 12){
        obj.str = new Date(`${year}-${month+1}`)
        obj.dateString = new Date(`${year}-${month+1}`).toDateString()
    }else{
        obj.str = new Date(`${year+1}-01`)
        obj.dateString = new Date(`${year+1}-01`).toDateString()
    }
    return obj
}
const decrease = (month, year) => {
    const obj = {}
    // checking month is not January👇🏻
    if(month !== 1){
        obj.str = new Date(`${year}-${month-1}`)
        obj.dateString = new Date(`${year}-${month-1}`).toDateString()
    }else{
        obj.str = new Date(`${year-1}-12`)
        obj.dateString = new Date(`${year-1}-12`).toDateString()
    }
    return obj
}

const updateDate = (date, payload) => {
    const year = date.str.getFullYear()
    const month = date.str.getMonth() + 1
    let newDate = {}
    if(payload.direction === 'next-month') {
        newDate = increase(month, year)
    }
    else newDate = decrease(month, year)
    return newDate
}

export const state = ref({
    date: {
        str: new Date(),
        dateString: new Date().toDateString()
    },
    dateGrid: updateDateGrid({str:new Date(),dateString:new Date().toDateString()}),
    current: {
        currentDay: DAYS[new Date().getDay()],
        currentDate: new Date().getDate(),
        currentMonth: new Date().getMonth()+1,
        currentYear: new Date().getFullYear()
    }
})

export const dispatch = (action) => {
    if(action.type === 'updateDate'){
        const newDate = updateDate(state.value.date, action.payload)
        const newGrid = updateDateGrid(newDate)
        state.value = {...state.value, 
            date: newDate, 
            dateGrid: newGrid, 
            current:{...state.value.current, 
                currentMonth:newDate.str.getMonth()+1,
                currentYear:newDate.str.getFullYear(), 
                currentDate:undefined
            }}
    } else if (action.type === 'clickDate') {
        state.value = {...state.value, 
            current:{...state.value.current, 
                currentDay:action.payload.date.day,
                currentDate:action.payload.date.dt
            }}
    }
}