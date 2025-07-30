# 🚀 Tweet Performance Manager

Generate AI-powered tweets and predict their engagement using machine learning models!

## 🌟 What it does
- **Generate tweets** using Google's Gemini AI from company name and message prompts
- **Predict likes** using ensemble ML models (XGBoost + Neural Network)
- **Interactive React UI** for real-time testing and experimentation
- **RESTful API architecture** with separate microservices

## 🔗 Try it live
**[Live Demo](https://tweet-performance-manager.onrender.com/)**

## 🛠️ Tech Stack

### Frontend
- **React 19** - Modern UI framework
- **Material-UI** - Component library
- **JavaScript/JSX** - Interactive user interface

### Backend APIs
- **FastAPI** - High-performance Python web framework
- **Python 3.12** - Core backend language
- **Google Gemini AI** - Tweet generation
- **Uvicorn** - ASGI server

### Machine Learning
- **XGBoost** - Gradient boosting model
- **TensorFlow/Keras** - Neural network model
- **Scikit-learn** - Data preprocessing and scaling
- **Pandas/NumPy** - Data manipulation
- **TextBlob** - Sentiment analysis
- **TF-IDF Vectorization** - Text feature extraction

### Deployment
- **Docker** - Containerization
- **CORS** - Cross-origin resource sharing

## 📊 How it works
1. **Tweet Generation**: User inputs company name and message → Gemini AI generates optimized tweet
2. **Feature Engineering**: Extract temporal, textual, and sentiment features from tweet
3. **ML Prediction**: Ensemble model (70% XGBoost + 30% Neural Network) predicts engagement
4. **Real-time Results**: Interactive React frontend displays generated tweet and predicted likes

## 🚀 Run locally

### Prerequisites
- Python 3.12+
- Node.js 16+
- Google API Key (for Gemini AI)

### Backend Setup
```bash
# Clone the repository
git clone https://github.com/CrnchyBekfast/tweet-performance-manager
cd tweet-performance-manager

# Set up prediction API
cd predictionAPI
pip install -r requirements.txt

# Set up generation API  
cd ../generateAPI
pip install -r requirements.txt

# Create .env file in both API directories
echo "GOOGLE_API_KEY=your_google_api_key_here" > .env
```

### Frontend Setup
```bash
# Set up React frontend
cd Frontend
npm install
```

### Run the Application
```bash
# Terminal 1: Start prediction API (port 8000)
cd predictionAPI
uvicorn api:app --reload --port 8000

# Terminal 2: Start generation API (port 8001)
cd generateAPI
uvicorn main:app --reload --port 8001

# Terminal 3: Start React frontend (port 3000)
cd Frontend
npm start
```

Visit `http://localhost:3000` to use the application!

## 🐳 Docker Deployment
```bash
# Build and run prediction API
cd predictionAPI
docker build -t tweet-prediction-api .
docker run -p 8000:8000 tweet-prediction-api

# Build and run generation API
cd generateAPI
docker build -t tweet-generation-api .
docker run -p 8001:8001 tweet-generation-api
```

## 📁 Project Structure
```
tweet-performance-manager/
├── Frontend/           # React.js frontend
├── predictionAPI/      # ML prediction service
├── generateAPI/        # AI tweet generation service
├── .gitignore         # Git ignore rules
└── readme.md          # Project documentation
```

## 🔑 Environment Variables
Create `.env` files in both API directories:
```
GOOGLE_API_KEY=your_google_gemini_api_key
```

## 🎯 Features
- **Multi-model ML Pipeline**: Ensemble prediction using XGBoost and Neural Networks
- **Advanced Feature Engineering**: Temporal, sentiment, and TF-IDF text features
- **Microservices Architecture**: Separate services for generation and prediction
- **Real-time Processing**: Instant tweet generation and engagement prediction
- **Responsive Design**: Material-UI based responsive frontend