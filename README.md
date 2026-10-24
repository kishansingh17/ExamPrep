# ExamPrep 📚

**ExamPrep** is a web-based exam preparation platform designed to help students practise multiple-choice questions (MCQs), test their knowledge, and prepare for university exams.

## ✨ Features

- 📝 **Interactive Quizzes** — Answer MCQs in an interactive quiz interface.
- ⏱️ **Timed Tests** — Practise within a time limit.
- 📊 **Instant Results** — View your score after completing a test.
- 💡 **Answer Explanations** — Understand why an answer is correct.
- 🗂️ **Supabase Integration** — Fetch quiz questions from a database.
- ✍️ **Manual Test Creation** — Build your own MCQ tests.
- 🔗 **Shareable Tests** — Planned feature for sharing tests with classmates.

## 🛠️ Tech Stack

- **Frontend:** React, JavaScript, CSS
- **Build Tool:** Vite
- **Database:** Supabase (PostgreSQL)
- **Version Control:** Git and GitHub
- **Deployment:** Planned with Vercel

## 🚀 Run Locally

### 1. Clone the repository

```bash
git clone https://github.com/kishansingh17/ExamPrep.git
cd ExamPrep
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file in the project root:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
```

Replace the placeholder values with your own Supabase project details.

**Security:** Never commit `.env.local` or any Supabase secret/service-role keys to GitHub.

### 4. Start the development server

```bash
npm run dev
```

Open the local URL printed in your terminal, usually `http://localhost:5173`.

## 📌 Project Status

ExamPrep is under active development. The current focus is improving quiz functionality, building a manual test creator, saving tests to Supabase, and enabling classmates to access shared tests.

## 🎯 Goals

- [x] Build the initial quiz interface
- [x] Fetch questions from Supabase
- [ ] Save custom tests to the database
- [ ] Create shareable test links
- [ ] Add test creator and student workflows
- [ ] Deploy the application publicly

## 🤝 Contributing

Suggestions and contributions are welcome! Feel free to open an issue or submit a pull request.

## 👨‍💻 Author

**Kishan Singh**

Git
