# Use a Python slim image with Node.js
FROM python:3.10-slim

# Install Node.js (needed to build frontend)
RUN apt-get update && apt-get install -y curl && \
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get install -y nodejs && \
    rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# ------------------------------
# 1. Install BACKEND dependencies
# ------------------------------
COPY backend/requirements.txt ./backend/
RUN pip install --no-cache-dir -r ./backend/requirements.txt

# ------------------------------
# 2. Install FRONTEND dependencies
# ------------------------------
COPY frontend/package.json frontend/package-lock.json* ./frontend/
WORKDIR /app/frontend
RUN npm install

# ------------------------------
# 3. Copy the rest of the source code (excluding node_modules, etc.)
# ------------------------------
WORKDIR /app
COPY . .

# ------------------------------
# 4. Build the frontend
# ------------------------------
WORKDIR /app/frontend
RUN npm run build

# ------------------------------
# 5. Create the static directory and copy the built frontend there
# ------------------------------
RUN mkdir -p /app/backend/static
RUN cp -r /app/frontend/dist/* /app/backend/static/

# ------------------------------
# 6. Set up the backend runtime
# ------------------------------
WORKDIR /app/backend

EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]