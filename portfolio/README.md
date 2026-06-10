# 🚀 3D Interactive Developer Portfolio

Welcome to my interactive 3D developer portfolio! This web application is a premium, results-oriented showcase of my engineering expertise in backend systems, AI/ML architectures, and full-stack software development. It features immersive WebGL components, an interactive schematic circuit board, and real-time integration setups.

---

## ✨ Core Features

### 🌌 1. 3D Interactive Skills Constellation (WebGL)
*   **Immersive Stardust Sphere**: A custom Three.js and React Three Fiber (R3F) interactive sphere featuring floating connection nodes and orbiting particles.
*   **Responsive Resource Management**: Dynamically mounts/unmounts WebGL elements based on screen width (`window.innerWidth >= 1024px`), preventing context lost errors and minimizing CPU/GPU load on mobile devices.
*   **Aesthetic Integration**: Implements transparent, glowing glassmorphic text labels and orbital control physics.

### 🔌 2. Skill Blueprint Circuit Board
*   **Visual Logic Flows**: An SVG schematic graph that renders custom category connection traces (e.g. `C++` leading to `PyTorch`/`TensorFlow` and `React` tracing to `Vercel`/`CI/CD`), modeling a modern software pipeline.
*   **Domain-Specific Color Accents**: Features individual glowing badges and highlights mapping Web/DB and AI/ML capabilities.
*   **Fully Responsive Scaling**: Responsive dimension calculations prevent text overflowing or clipping on smaller devices.

### 📊 3. Live LeetCode Solver Counter
*   **Dynamic Data Fetching**: Retrieves problem statistics in real-time from my LeetCode profile using Faisal Shohag's API wrapper.
*   **Local Fallback Mechanism**: Gracefully falls back to a preset stat count if the API is offline or rate-limited, keeping the user interface populated.

### 🖥️ 4. Interactive UNIX Terminal Simulator
*   **Command Simulator**: A fully functional retro-neon command terminal supporting standard shell actions:
    *   `help`: View list of available commands.
    *   `about`: Display biography summary.
    *   `skills`: List core technical competencies.
    *   `experience`: Show professional work timeline.
    *   `leetcode`: Output live solved problems status.
    *   `clear`: Wipe the terminal history.
*   **Typing Animation**: Safe animation rendering that eliminates character trailing bugs during closure updates.

### 📧 5. Secure EmailJS Integration
*   **Direct-from-Client Delivery**: Powered by the official `@emailjs/browser` SDK.
*   **Client-Side Validation**: Performs format checking, text trimming, and minimum length checks for name and message fields.
*   **Submit Protection**: Disables the submit CTA and displays an active loading state during transit.
*   **Success Toast Notification**: Displays a checkmark toast and resets input fields on successful delivery.
*   **Mock Fallback Loop**: Integrates a local mock sandbox loop for easy local testing when API keys are undefined.

---

## 🛠️ Technology Stack

*   **Core**: React 19, Vite, TypeScript
*   **Styling**: Tailwind CSS (Utility classes & custom animations)
*   **3D Graphics**: Three.js, `@react-three/fiber` (R3F), `@react-three/drei`
*   **Animations**: Framer Motion (page transitions, mobile menu slide-ins)
*   **Form Handling & Delivery**: EmailJS Browser SDK
*   **Icons**: `react-icons` (Feather Icons, Simple Icons, FontAwesome)
*   **Notifications**: `react-hot-toast`

---

## 📁 Project Structure

```text
portfolio/
├── public/                 # Static assets (Favicon, CV PDF)
│   └── Munish_v5.pdf       # My latest developer CV
├── src/
│   ├── components/
│   │   ├── 3d/             # Three.js / WebGL components (Constellation, Globe, Canvas)
│   │   ├── sections/       # Modular page tabs (About, Projects, Experience, Skills, Certifications, Contact)
│   │   └── ui/             # Global layout elements (Navbar, Footer)
│   ├── data/
│   │   └── portfolio.ts    # Main dataset configuration (projects, credentials, info)
│   ├── App.tsx             # Root React component (Tab router and state controller)
│   ├── index.css           # Global theme colors and Tailwind configurations
│   └── main.tsx            # Application entry point
├── .env                    # Environment keys (Ignored by Git)
├── package.json            # Active dependencies registry
└── vite.config.ts          # Vite configuration details
```

---

## ⚙️ Environment Configuration

To set up the contact form email delivery system, create a `.env` file inside the `portfolio/` directory:

```env
VITE_EMAILJS_SERVICE_ID=your_emailjs_service_id
VITE_EMAILJS_ADMIN_TEMPLATE_ID=your_emailjs_admin_template_id
VITE_EMAILJS_GREETING_TEMPLATE_ID=your_emailjs_greeting_template_id
VITE_EMAILJS_PUBLIC_KEY=your_emailjs_public_key
```

*Note: If these variables are not declared, the contact form will automatically fall back to local UI simulation.*

---

## 🚀 Getting Started

### 1. Prerequisites
*   Node.js (v18.0.0 or higher)
*   npm or yarn package manager

### 2. Local Installation

```bash
# Clone the repository
git clone https://github.com/MunishUpadhyay/Portfolio.git

# Enter project folder
cd portfolio

# Install dependencies
npm install

# Run development server
npm run dev
```

### 3. Open Browser
Navigate to [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📦 Production & Deployment

### Build Command
Compile and minify code for production:

```bash
npm run build
```

This generates optimized static files inside the `dist/` directory, ready to be deployed.

### Deploy to Vercel (Recommended)
1.  Import your GitHub repository on the [Vercel Dashboard](https://vercel.com).
2.  Configure the environment variables (`VITE_EMAILJS_*`) in the Project Settings under the **Environment Variables** tab.
3.  Deploy! Vercel will build the Vite bundles and deploy them to a CDN.

---

## 📄 License

This project is licensed under the MIT License - feel free to use it for your own developer portfolio!

---

*Made with ❤️ by Munish Upadhyay*
