# 🌟 Flowell E-Commerce App (Client)  

Welcome to the **Flowell E-Commerce App** front-end repository! This project is built with **Next.js 15.2** and provides a seamless shopping experience with modern web technologies.  

---

## 🚀 Features  

### 🛠️ Core Functionality  
- **User Authentication**:  
    - Register new users.  
    - Login and logout functionality.  
    - Update or delete personal information.  
- **Product Browsing**:  
    - Browse products with filtering by color or categories.  
- **Shopping Cart**:  
    - Add items to the cart and update quantities.  
    - Instant UI updates using **Context API** and **LocalStorage**.  
- **Checkout & Payments**:  
    - Secure payments powered by **Stripe** (handled on the backend).  

### ⚙️ Technical Highlights  
- **Authentication**:  
    - Front-end authentication with **NextAuth.js**.  
    - Middleware for route protection.  
- **Rendering**:  
    - Server-Side Rendering (SSR) for most pages (static or dynamic).  
- **Image Optimization**:  
    - Images served via **Cloudinary** and optimized using Next.js `<Image>` component.  
- **Performance**:  
    - Dynamic imports for optimized bundle size.  
    - Static params for dynamic routes.  

---

## 🛒 Shopping Experience  

1. **Browse Products**:  
     - Explore a wide range of products with filtering options.  
2. **Add to Cart**:  
     - Add items to your cart and adjust quantities with instant feedback.  
3. **Checkout**:  
     - Complete your purchase securely with Stripe integration.  

---

## 🧰 Tech Stack  

- **Framework**: [Next.js 15.2](https://nextjs.org/)  
- **Authentication**: [NextAuth.js](https://next-auth.js.org/)  
- **State Management**: Context API + LocalStorage  
- **Image Hosting**: [Cloudinary](https://cloudinary.com/)  
- **Payments**: [Stripe](https://stripe.com/)  

---

## 📂 Project Structure  

```plaintext

public/               # Static assets  
src/                  # Main folder
├── actions/          # Server actions 
├── app/              # Application pages
├──├──api/            # Route for frontend authentication with next-auth library
├── components/       # UI components for data presentation 
├── context/          # Context API for state management  
├── lib/              # Fetching functions GET and reusable functions  
├── UI/               # Reusable UI components (buttons, modals) 
└── provider/         # Context API Store Provider (handle cart logic)
middleware.js         # Next.js middleware (protected routes)
```  

---

## 🛠️ Getting Started  

### Prerequisites  
- Node.js >= 16.x  
- npm or yarn  

### Installation  

1. Clone the repository:  
     ```bash  
     git clone https://github.com/your-repo/flowell-ecommerce-client.git  
     cd flowell-ecommerce-client  
     ```  

2. Install dependencies:  
     ```bash  
     npm install  
     ```  

3. Start the development server:  
     ```bash  
     npm run dev  
     ```  

4. Open your browser at `http://localhost:3000`.  

---

## 🔑 Environment Variables  

To run this project, you will need to set up the following environment variables in a `.env.local` file:  

```plaintext  
NEXT_PUBLIC_BACKEND_URL=http://fake-backend-url.com/api  
NEXTAUTH_URL=http://fake-client-url.com  
NEXTAUTH_SECRET=FAKE_SECRET_KEY_1234567890  
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_FAKE_STRIPE_KEY_1234567890  
```  

---

## 🌐 Deployment  

This project is optimized for deployment on platforms like **Vercel**.  

---

## 🤝 Contributing  

Contributions are welcome! Feel free to open issues or submit pull requests.  

---

## 📜 License  

This project is licensed under the [MIT License](LICENSE).  

---

## 💬 Contact  

For questions or feedback, reach out to us at **support@flowell.com**.  

Happy coding! 🎉  
