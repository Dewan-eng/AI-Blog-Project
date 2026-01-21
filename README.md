# ✨ AI-Powered Cloud Blog

![Project Status](https://img.shields.io/badge/Status-Live-success?style=for-the-badge)
![Tech Stack](https://img.shields.io/badge/Stack-HTML%20%7C%20CSS%20%7C%20Firebase-blue?style=for-the-badge)

A modern, full-stack blogging platform that combines **Glassmorphism UI** with real-time cloud storage and **Artificial Intelligence**. 

Users can write posts, let AI generate catchy titles automatically, and publish them instantly to the cloud.


> *Preview of the Admin Dashboard showing the Glassmorphism UI.*

## 🚀 Live Demo
Check out the live website here:  
👉 **[CLICK HERE TO VIEW LIVE SITE](https://ai-blogging-60692b.netlify.app/)**

## 📸 Project Screenshots
<img width="1919" height="914" alt="Screenshot 2026-01-21 195919" src="https://github.com/user-attachments/assets/1ead731c-b7a7-48ff-9926-2e9a5c7af790" />


---

## 🌟 Key Features

* **☁️ Real-Time Database:** Powered by **Google Firebase Firestore**. Posts sync instantly across all devices without refreshing the page.
* **🤖 AI Integration:** Connects to **OpenAI (GPT-3.5)** to automatically generate engaging titles based on your content.
* **🎨 Modern UI/UX:** Features a "Glassmorphism" design with frosted glass effects, CSS Grid layouts, and smooth fade-in animations.
* **📱 Fully Responsive:** Works perfectly on desktops, tablets, and mobile phones.
* **🔒 Admin vs. Public View:** * **Admin Dashboard:** Create, edit, and delete posts.
    * **Public Page:** A read-only view for visitors.

---

## 🛠️ Tech Stack

* **Frontend:** HTML5, CSS3, JavaScript (ES6 Modules)
* **Backend:** Firebase Firestore (NoSQL Database)
* **AI:** OpenAI API (Fetch API)
* **Deployment:** Netlify / GitHub Pages

---

## 📂 Project Structure

```bash
├── index.html      # Admin Dashboard (Create/Delete posts)
├── stories.html    # Public View (Read-only)
├── style.css       # Global styles & Glassmorphism effects
├── script.js       # Admin logic (Firebase Write + OpenAI)
└── stories.js      # Public logic (Firebase Read-only)
