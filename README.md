# 🎓 EduCircle  

**EduCircle** is an interactive platform designed for managing assignments in an online group study environment. It enables users to create, submit, and grade assignments while promoting collaboration and accountability. With user authentication, peer grading, and a customizable theme, **EduCircle** provides an engaging and flexible experience for students and educators.  

🔗 **Live Website:** [EduCircle](https://educircle-839d0.web.app/) 

---

## 📌 Features  

✅ **User Authentication** – Sign up and log in via form or Google authentication.  
✅ **Assignment Management** – Create, modify, and delete assignments easily.  
✅ **Assignment Submission** – Submit assignments with "pending" or "completed" status.  
✅ **Peer Grading** – Users can grade others' assignments but not their own.  
✅ **Pending Status** – Only "pending" assignments are shown in the status list.  
✅ **Dark/Light Theme** – Switch between dark and light mode for a better experience.  

---

## 📜 Table of Contents  

- [Tech Stack](#-tech-stack)  
- [Dependencies](#-dependencies)  
- [Installation](#-installation)  
- [Usage Guide](#-usage-guide)  
- [Configuration](#-configuration)  
- [Development Commands](#-development-commands)  
- [Contributing](#-contributing)  
- [License](#-license)  

---

## 🛠 Tech Stack  

### **Frontend:**  
- **React** – Component-based UI development  
- **React Router** – Navigation and routing  
- **Tailwind CSS & DaisyUI** – Modern and responsive styling  
- **Firebase** – Authentication and database management  

---

## 📦 Dependencies  

- **State Management:** React Query  
- **Authentication:** Firebase  
- **Forms & Validation:** React Hook Form  
- **UI Components:** DaisyUI, SweetAlert2, React Icons  
- **Animations:** Lottie React, AOS  
- **SEO Optimization:** React Helmet  
- **Date Handling:** Date-fns  

🔹 Full dependency list available in [`package.json`](package.json).  

---

## 📥 Installation  

1️⃣ Clone the repository:  
```sh
git clone https://github.com/istiak19/EduCircle-client.git
cd EduCircle-client
```  

2️⃣ Install dependencies:  
```sh
npm install
```  

3️⃣ Start the development server:  
```sh
npm run dev
```  

---

## 🎯 Usage Guide  

- **Students** → Create, submit, and track assignments.  
- **Peer Graders** → Review and grade assignments (except their own).  
- **Admins** → Oversee assignment management and user interactions.  

💡 **Ensure Firebase credentials are set up in the `.env` file before running the project.**  

---

## 🔧 Configuration  

- **Firebase Setup** → Add Firebase credentials in `firebaseConfig.js`.  
- **Theme Customization** → Default theme settings can be modified in `tailwind.config.js`.  

---

## 🚀 Development Commands  

🔹 **Start Development Server:**  
```sh
npm run dev
```  

🔹 **Build for Production:**  
```sh
npm run build
```  

🔹 **Run Linter:**  
```sh
npm run lint
```  

🔹 **Preview Build:**  
```sh
npm run preview
```  