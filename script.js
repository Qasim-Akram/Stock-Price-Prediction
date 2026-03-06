import { dates } from "./utills/dates.js"

const tickers = []

const input = document.getElementById('ticker-input')
const submitButton = document.getElementById('ticker-submit')
const addedTicker = document.getElementById('added-ticker')
const generateReportBtn = document.getElementById('generate-report')

generateReportBtn.disabled = true

submitButton.addEventListener('click', () => {
    if (input.value) {
        tickers.push((input.value).toUpperCase())
        input.value = ''
        renderTicker(tickers)
        generateReportBtn.disabled = (tickers.length === 0)
    } else {
        const instruction = document.getElementById('instruction')
        instruction.textContent = "You must add at least one ticker. A ticker is a 3 letter or more code for a stock. For example, AAPL for Apple Inc. or TSLA for Tesla Inc."
        instruction.style.color = 'red'
    }
})

function renderTicker(arrayofticker) {
    if (arrayofticker.length === 0) return
    addedTicker.textContent = arrayofticker.join(', ')
}

generateReportBtn.addEventListener('click', fetchStockData)

async function fetchStockData() {
    document.querySelector('#generate-report').style.display = 'none'
    document.querySelector('#instruction').style.display = 'none'
    document.querySelector('.action-panel').style.display = 'block'
    document.querySelector('.loading-area').style.display = 'flex'

    try {
        const stockData = await Promise.all(tickers.map(async (ticker) => {
            const url = `http://localhost:3000/api/stock?ticker=${ticker}&startDate=${dates.startDate}&endDate=${dates.endDate}`

            const response = await fetch(url)
            const status = response.status

            if (status === 200) {
                const data = await response.json()
                document.querySelector('.loading-area p').innerText = 'Creating report...'
                return JSON.stringify(data) 
            } else {
                document.querySelector('.loading-area p').innerText = 'There was an error fetching stock data.'
            }
        }))

        await fetchReport(stockData.join(' '))

    } catch(err) {
        document.querySelector('.loading-area p').innerText = 'There was an error fetching stock data.'
        console.error('error: ', err)
    }
}

async function fetchReport(stockData) {
    try {
        const response = await fetch('http://localhost:3000/api/report', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ stockData })
        })

        const data = await response.json()
        renderReport(data.report)

    } catch(err) {
        document.querySelector('.loading-area p').innerText = 'There was an error generating the report.'
        console.error('Report generation failed:', err)
    }
}

function renderReport(report) {
    document.querySelector('.loading-area').style.display = 'none'
    document.querySelector('.action-panel').innerHTML = `
        <div class="report">
            ${marked.parse(report)}
        </div>
    `
}