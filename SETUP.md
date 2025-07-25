# 🛠️ Setup Guide – Text Extractor App

A step‑by‑step guide to run the **Text Extractor App** locally.

## 📂 Project Structure

```
text-extractor-app/
├─ backend/   # Flask OCR API
├─ frontend/  # React UI
```

## ✅ 1️⃣ Prerequisites

Make sure you have the following installed:

- **Python 3.8+**
- **Node.js 18+**
- **npm** (comes with Node)
- **Tesseract OCR**

### 🔧 Tesseract Installation:

- **Windows:** Install from [https://github.com/UB-Mannheim/tesseract/wiki](https://github.com/UB-Mannheim/tesseract/wiki) and add path to Environment Variables.
- **Linux/WSL:**
  ```bash
  sudo apt update && sudo apt install tesseract-ocr -y
  ```
- **Mac:**
  ```bash
  brew install tesseract
  ```

## ✅ 2️⃣ Backend Setup (Flask)

Navigate to the backend directory:

```bash
cd backend
```

Create a virtual environment:

```bash
python3 -m venv venv
```

Activate the virtual environment:

**Linux/WSL/Mac:**
```bash
source venv/bin/activate
```

**Windows (PowerShell):**
```bash
venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Run the Flask server:

```bash
python app.py
```

Flask will start at: **http://localhost:5000**

## ✅ 3️⃣ Frontend Setup (React)

Open a new terminal and go to the root directory

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

React will start at: **http://localhost:5173** (or similar)

## ✅ 4️⃣ How to Use

1. Go to **http://localhost:5173**
2. Upload an image containing text.
3. Click the **Extract Text** button.
4. The frontend will send a POST request to **http://localhost:5000/extract**
5. The extracted text will appear below.

## ✅ 5️⃣ Deployment Tips

### Frontend:
- Deploy using **Netlify** or **Vercel**.
- Before deploying, update the `axios.post(...)` URL to point to the deployed Flask backend.

### Backend:
- Deploy using **Render** or **Railway**.
- Add a `build.sh` file to install tesseract-ocr:
  ```bash
  # build.sh
  #!/usr/bin/env bash
  apt-get update && apt-get install -y tesseract-ocr
  ```
- Add a `Procfile`:
  ```
  web: gunicorn app:app
  ```

### All-in-One Option:
After building React (`npm run build`), move the build folder into the backend and serve it with Flask:

```python
app = Flask(__name__, static_folder="frontend/dist", static_url_path="")

@app.route('/')
def serve():
    return send_from_directory(app.static_folder, "index.html")
```

## ✅ 6️⃣ Troubleshooting

🔴 **Tesseract not found?**  
Make sure it's properly installed and accessible via your system PATH.

🔴 **CORS error?**  
Confirm `flask-cors` is installed and `CORS(app)` is used in `app.py`.

## ✅ 7️⃣ Summary Commands

```bash
# Backend
cd backend
python3 -m venv venv
source venv/bin/activate   # or venv\Scripts\activate on Windows
pip install -r requirements.txt
python app.py

# Frontend (in a new terminal)
cd frontend
npm install
npm run dev
```