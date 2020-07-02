let calendar = document.querySelector('#calendar')
let info = calendar.querySelector('.info')
let body = calendar.querySelector('.body')
let prev = calendar.querySelector('.prev')
let next = calendar.querySelector('.next')

let date = new Date()
let year = date.getFullYear()
let month = date.getMonth()

let diffCount = 0

draw(body, year, month)

function draw(body, year, month) {
    body.innerHTML = ''
    let arr = range(getLastDay(year, month))

    let firstWeekDay = getFirstWeekDay(year, month)
    let lastWeekDay = getLastWeekDay(year, month)

    let nums = chunk(normalize(arr, firstWeekDay, 6 - lastWeekDay), 7)
    createTable(body, nums)
    doDate(year, month)
}

function range(count) {
    let i = 1
    let result = []

    while (i <= count) {
        result.push(i++)
    }

    return result
}

function getLastDay(year, month) {
    return new Date(year, month + 1, 0).getDate()
}

function getFirstWeekDay(year, month) {
    let num = new Date(year, month, 1).getDay()

    if (num == 0) {
        return 6
    } else {
        return num - 1
    }
}

function getLastWeekDay(year, month) {
    let num = new Date(year, month, getLastDay(year, month)).getDay()

    if (num == 0) {
        return 6
    } else {
        return num - 1
    }
}

function normalize(arr, left, right) {
    let i = 0
    let j = 0

    while (i < left) {
        arr.unshift('')
        i++
    }

    while (j < right) {
        arr.push('')
        j++
    }

    return arr
}

function chunk(arr, n) {
    let result = []
    let length = Math.ceil(arr.length / n)

    for (let i = 0; i < length; i++) {
        let elems = arr.splice(0, n)
        result.push(elems)
    }

    return result
}

function createTable(body, nums) {
    parent.innerHTML = ''
    let cells = []

    for (let elem of nums) {
        let tr = document.createElement('tr')

        for (let sub of elem) {
            let td = document.createElement('td')
            td.innerHTML = sub
            tr.appendChild(td)

            cells.push(td)
        }

        body.appendChild(tr)
    }

    return cells
}

next.addEventListener('click', function () {
    draw(body, getNextYear(year, month), getNextMonth(month))
})

prev.addEventListener('click', function () {
    draw(body, getPrevYear(year, month), getPrevMonth(month))
})

function getNextYear(year, month) {
    return new Date(year, month + diffCount + 1).getFullYear()
}

function getNextMonth(month) {
    diffCount++
    return month + diffCount
}

function getPrevYear(year, month) {
    return new Date(year, month + diffCount - 1).getFullYear()
}

function getPrevMonth(month) {
    diffCount--
    return month + diffCount
}

function doDate(year, month) {
    info.innerHTML = ''

    let months = [
        'Янв',
        'Фев',
        'Мар',
        'Апр',
        'Май',
        'Июн',
        'Июл',
        'Авг',
        'Сен',
        'Окт',
        'Ноя',
        'Дек',
    ]
    let curMonth = months[new Date(year, month).getMonth()]

    info.innerHTML = curMonth + ' ' + year
}