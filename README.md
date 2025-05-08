# Racconnect – AI-Powered Web App Generator

Turn plain English into working fullstack web apps — instantly, and locally.

This project took insperation of [Lovable.dev](https://lovable.dev), built using **Next.js**, **Ollama**, and the **DeepSeek R1** model. Users can describe the app they want in natural language and get fully functional code (React, HTML, APIs, etc.) without writing a single line themselves.

---

## 🚀 Features

- 🧠 **Natural language to code** using DeepSeek (via Ollama)
- ⚡ **Runs locally** — no external API keys or billing required
- 📦 **Next.js + TailwindCSS** frontend
- 🧩 **Fullstack output**: React components, HTML, Express APIs
- 💾 **Copy or download generated code**
- 🎯 **Great learning project** for LLMs, developer tools, and AI UX

---

## 🖼️ Demo

![{2D781BCA-D0E9-46E7-8150-8D99926A54C9}](https://github.com/user-attachments/assets/484f46a5-3d78-455d-9579-ccc9af586bae)


---

## 🛠️ Tech Stack

- **Frontend:** Next.js (App Router), Tailwind CSS, React Hook Form
- **State Management:** Zustand
- **Backend:** API routes using Node/Edge runtime
- **AI Engine:** [Ollama](https://ollama.com/) + `deepseek-R1:7b`
- **Local LLM Interface:** HTTP calls to `http://localhost:11434/api/generate`
