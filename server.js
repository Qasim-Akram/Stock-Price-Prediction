require('dotenv').config()
const express = require('express')
const cors = require('cors')

const app = express()
app.use(express.json())  
app.use(cors())

app.get('/api/stock', async (req, res) => {
    const { ticker, startDate, endDate } = req.query

    const url = `https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/day/${startDate}/${endDate}?adjusted=true&apiKey=${process.env.MASSIVE_API_KEY}`

    try {
        const response = await fetch(url)
        const data = await response.json()
        res.json(data)
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch stock data' })
    }
})

app.post('/api/report', async (req, res) => {
    const { stockData } = req.body

    try {
        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.GROQ_API_KEY}`
            },
            body: JSON.stringify({
                model: 'llama-3.3-70b-versatile',
                messages: [
                    {
                        role: 'system',
                        content: `You are a stock market analyst. 
                        Analyze the provided stock data and write a short, 
                        clear report with insights and a simple prediction. 
                        Keep it under 200 words. Use plain English, no jargon. Also analyse the 
                        current situation and factors affecting the stock's performance. Provide actionable insights for investors.`
                    },
                    {
                        role: 'user',
                        content: `Here is the stock data: ${stockData}. Please analyze it and generate a report.`
                    }
                ]
            })
        })

        const data = await response.json()
        const report = data.choices[0].message.content
        res.json({ report })

    } catch (err) {
        res.status(500).json({ error: 'Failed to generate report' })
        console.error(err)
    }
})

app.listen(3000, () => {   
    console.log('Server running on http://localhost:3000')
})