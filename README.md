# JobOS

**An AI-powered job application tracker.**

JobOS is a web application designed to simplify the process of managing job applications. Instead of manually entering every detail, users can paste a job posting URL and let AI extract the relevant information.

## Features

- **AI-powered extraction:** Automatically extracts company, job summary, workload and location from job posting URLs using the Gemini API.
- **Application management:** Add, edit and delete job applications.
- **Dashboard:** Track application statistics and progress.
- **Local storage:** Applications remain saved after refreshing the page.
- **Responsive design:** Interface designed for desktop and mobile devices.

## Tech Stack

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Python, Flask
- **AI:** Google Gemini API
- **Storage:** Browser localStorage

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/JobOS.git
cd JobOS
```

### 2. Install dependencies

```bash
pip install -r requirements.txt
```

### 3. Configure environment variables

Create a `.env` file in the project root:

```env
GEMINI_API_KEY=your_api_key_here
GEMINI_MODEL=your_model_name_here
```

You can obtain an API key from [Google AI Studio](https://aistudio.google.com/apikey).

### 4. Start the backend

```bash
python backend.py
```

The Flask server runs at `http://127.0.0.1:5050`.

### 5. Start the frontend

Open the project using VS Code Live Server, configured to use port `5502`, and navigate to `index.html`.

## How It Works

1. The user enters a job posting URL.
2. JavaScript sends the URL to the Flask backend.
3. Flask uses the Gemini API to analyse the job posting.
4. The extracted information is returned as JSON.
5. JavaScript displays and stores the application in localStorage.

## Limitations

- AI extraction depends on website accessibility and Gemini API availability.
- Application data is stored locally in the browser, not in a cloud database.
- The Flask backend must be running for AI extraction to work.

## Future Improvements

- Search and filtering
- Advanced application statistics
- Cloud storage and user accounts

## Author

Developed by Fatlum Rexhepi.