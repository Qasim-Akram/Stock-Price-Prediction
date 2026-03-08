# 📈 Stock Price Prediction

A full stack web app that fetches real stock market data and generates AI-powered analysis reports using Groq's LLaMA model.



---

## 🚀 Features

- Add up to 3 stock tickers (e.g. AAPL, TSLA, MSFT)
- Fetches real historical stock data from Massive.io API
- Generates an AI-powered stock analysis report using Groq (LLaMA 3)
- Secure backend server — API keys never exposed to the browser
- Clean, minimal UI

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | HTML, CSS, JavaScript |
| Backend | Node.js, Express.js |
| Stock Data API | Polygon.io |
| AI Report | Groq API (LLaMA 3.3) |
| Environment | dotenv |

---

## 📁 Project Structure

```
Stock Price Prediction/
├── images/
├── utills/
│   └── dates.js          # Date helper functions
├── index.html            # Main UI
├── script.js             # Frontend logic
├── style.css             # Styling
├── server.js             # Express backend server
├── package.json
├── .env                  # API keys (never pushed to GitHub)
└── .gitignore
```

---

## ⚙️ Setup & Installation

### 1. Clone the repository
```bash
git clone https://github.com/Qasim-Akram/Stock-Price-Prediction.git
cd Stock-Price-Prediction
```

### 2. Install dependencies
```bash
npm install
```

### 3. Create a `.env` file in the project root
```
MASSIVE_API_KEY=your_polygon_api_key
GROQ_API_KEY=your_groq_api_key
```

### 4. Get your API keys
- **Polygon.io** (stock data): [polygon.io](https://massive.io) — free tier available
- **Groq** (AI reports): [console.groq.com](https://console.groq.com) — completely free

### 5. Start the backend server
```bash
node server.js
```
You should see:
```
Server running on http://localhost:3000
```

### 6. Open the app
Open `index.html` directly in your browser.

---

## 🔒 Security

- All API keys are stored in `.env` and never committed to GitHub
- The Express backend acts as a secure middleman — the browser never directly calls external APIs
- `.env` is included in `.gitignore`

---

## 👤 Author

**Muhammad Qasim**
- GitHub: [@Qasim-Akram](https://github.com/Qasim-Akram)
