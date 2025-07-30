# Dockerfile
FROM python:3.12-slim

# Set environment variables for TensorFlow
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
ENV TF_CPP_MIN_LOG_LEVEL=2
ENV CUDA_VISIBLE_DEVICES=-1

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements first for better caching
COPY requirements.txt .
RUN pip install --no-cache-dir --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application
COPY . .

# Expose the port (Cloud Run will set PORT environment variable)
EXPOSE 8080

# Use the PORT environment variable that Cloud Run provides
CMD uvicorn api:app --host 0.0.0.0 --port ${PORT:-8080}
