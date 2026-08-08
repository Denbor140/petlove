# 🐾 Petlove

![React](https://img.shields.io/badge/React-19-blue)
![Next.js](https://img.shields.io/badge/Next.js-15-black)
![TypeScript](https://img.shields.io/badge/TypeScript-blue)
![Formik](https://img.shields.io/badge/Formik-form_handling-orange)
![Yup](https://img.shields.io/badge/Yup-validation-yellow)
![React Router](https://img.shields.io/badge/React_Router-routing-red)
![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?logo=cloudinary&logoColor=white)

---

## 📜 About

🐾 **Petlove** is a web application for pet owners that combines a pet news feed, a pet search for adoption/sale, and a directory of partner companies (shelters, pet stores, vet clinics, etc.).

The app allows users to:

- browse pet news from around the world with pagination and keyword search
- search for pets by keywords, and filter them by category, gender, type, and location
- sort pets by popularity or price (from expensive to cheap and vice versa)
- browse a list of partner companies with contact information and working hours
- register and log in, manage their personal profile and their own pets

---

## ⚡ Features

- 📰 **News** page — a feed of pet news with pagination and keyword search
- 🐾 **Find Pet** page — search for pets by keywords, filtering by category, gender, type, and location, sorting by popularity/price, pagination
  - each pet card has **Learn more** (a modal window with full information about the pet) and **add to favorites** buttons
  - both buttons are available only to registered users — unregistered users see a modal warning that login or registration is required
- 🤝 **Our Friends** page — a list of company partners: logo, name, contact information, working hours
- 🔐 Registration and login
- 👤 **User Bar** — appears after registration/login and links to the profile page
- 🙋 **Profile** page (available only to registered users):
  - user information with the ability to edit it via a button
  - list of viewed pets
  - list of pets added to favorites
  - list of the user's own added pets, with the option to delete them
  - a button for adding your own pet (form: gender, avatar upload, name, date of birth, and type) — after adding, the user is redirected to the profile page, where the new pet is displayed right away
  - ⏳ Themed **Loader** — a dog image on the background with a percentage-based loading progress; the image changes depending on the screen width
- ☁️ User avatar and pet photo uploads are handled via **Cloudinary**
- 📱 Responsive layout from 320px to 1280px

---

## 🧰 Tech Stack

- **Framework:** React + Next.js (App Router)
- **Language:** TypeScript
- **Routing:** React Router
- **Forms:** Formik + Yup
- **Styling:** CSS Modules
- **Media Storage:** Cloudinary (avatar & pet photo uploads)
- **Backend:** REST API ([Swagger UI](https://petlove.b.goit.study/api-docs/))

---

## 🗂️ Project Structure

```
app/
components/
constants/
lib/
public/
types/
utils/
```

---

## 🚀 Getting Started

```bash
npm install
npm run dev
```

Open in browser:

```
http://localhost:3000
```

---

## 🔗 Links

- 🌐 Site: [PetLove](https://petlove-ochre.vercel.app/)
- 📄 Backend / Swagger UI: [petlove.b.goit.study/api-docs](https://petlove.b.goit.study/api-docs/)

---

## 👤 Author

**Denys Boreiko**

- GitHub: [@Denbor140](https://github.com/Denbor140)
- LinkedIn: [denys-b](https://www.linkedin.com/in/denys-b-/)
