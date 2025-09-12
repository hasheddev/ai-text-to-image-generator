# Imagify

## 📋 <a name="table">Table of Contents</a>

1. 🤖 [Introduction](#introduction)
2. ⚙️ [Tech Stack](#tech-stack)
3. 🔋 [Features](#features)
4. 🤸 [Quick Start](#quick-start)

## <a name="introduction">🤖 Introduction</a>

An ai powered text to image generator

## <a name="tech-stack">⚙️ Tech Stack</a>

- Frontend:

  - React 19 & Next.js 15: For a fast, server-side rendered, and scalable application.
  - TypeScript: To ensure code quality and maintainability.
  - TailwindCSS: For rapid, utility-first styling.

- Backend:

  - MongoDB: A flexible NoSQL database to store user data and image information.

- APIs & Services:
  - ClipDrop API: Powers the core text-to-image generation functionality.
  - Razorpay: Handles all payment processing for credit purchases.

## <a name="features">🔋 Features</a>

**User Authentication**: Secure User Authentication: Easily sign up, log in, and log out with secure JSON Web Token (JWT) authentication, ensuring your creations are safe and private.

**Instant Image Generation**: Simply describe your vision, and our powerful AI will generate a high-quality image in seconds.

**One-Click Downloads**: Instantly download and save your generated images in high resolution, giving you full ownership of your creations.

**Monetization with Razorpay**: Purchase credits to generate images using a seamless and secure payment gateway.

**Modern Responsive Design**: A fresh and minimalist UI that emphasizes usability, ensuring a clean aesthetic across all devices.

## <a name="quick-start">🤸 Quick Start</a>

Follow these steps to set up the project locally on your machine.

**Prerequisites**

Make sure you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/) (Node Package Manager)

**Cloning the Repository**

```bash
git clone https://github.com/hasheddev/ai-text-to-image-generator.git
cd ai-text-to-image-generator
```

**Installation**

Install the project dependencies using npm:

```bash
npm install
```

**Set Up Environment Variables**

Create a new file named `.env.local` in the root of your project and add the following content:

```env
JWT_SECRET_KEY
MONGOBD_URI
CLIP_DROP_API_KEY
CLIP_DROP_API
RAZORPAY_KEY_ID
NEXT_PUBLIC_RAZORPAY_KEY_ID
RAZORPAY_KEY_SECRET
CURRENCY
```

Replace the values with your actual Mongodb, clip drop api adn razorpau credentials from [mongodb](https://www.mongodb.com/), [clipdrop](https://clipdrop.co/) and [razorpay](https://razorpay.com/)

**Running the Project**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the project.
