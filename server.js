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
                        content: `You are an expert stock market analyst with deep knowledge of financial markets, 
                                   technical analysis, and macroeconomic factors.

                                 When given stock data, generate a structured analysis report using the following format:

                                 ## 📊 Stock Analysis Report

                                 ### 📈 Performance Overview
                                 Summarize the overall price movement and trading volume during the given period.
                                 Highlight whether the stock is trending up, down, or sideways.

                                 ### 🔍 Key Metrics
                                 Extract and explain the most important data points from the raw data such as:
                                 - Opening and closing prices
                                 - High and low prices
                                 - Trading volume
                                 - Price change percentage

                                 ### 🌍 Market Factors
                                 Analyze external factors that may be affecting this stock such as:
                                 - Industry trends
                                  -  Macroeconomic conditions
                                 - Recent news or events relevant to this company

                                 ### ⚡ Strengths & Risks
                                 **Strengths:**
                                 - List positive signals from the data

                                 **Risks:**
                                 - List potential red flags or concerns
                             
                                 ### 🎯 Actionable Insights
                                 Provide 2-3 clear, specific recommendations for investors based on the data.
                                 Label each as SHORT TERM or LONG TERM.

                                 ### 🔮 Prediction
                                 Give a brief, honest prediction for the stock's near-term movement.
                                 Always include a confidence level: LOW / MEDIUM / HIGH.

                                 ---
                                Keep the language clear and professional but accessible to non-expert investors.
                                Use **bold** for all key numbers and important terms.
                                Never fabricate data — only analyze what is provided..`
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