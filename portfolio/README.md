# Modern Portfolio Website

A beautiful, interactive portfolio website built with React, TypeScript, and Framer Motion.

## Features

✨ **Interactive Elements**
- Smooth scroll animations
- Theme switcher (Light/Dark mode)
- Working contact form with email integration
- Animated transitions and hover effects

📧 **Contact Form**
- Real email delivery using EmailJS
- Form validation
- Success/error notifications
- Professional email templates

🎨 **Modern Design**
- Gradient effects and glassmorphism
- Responsive design for all devices
- Custom scrollbar
- Beautiful typography

📱 **Sections**
- Hero with animated introduction
- About Me with skill badges
- Education timeline
- Skills & Technologies
- Projects showcase with live links
- Contact form

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <your-repo-url>
cd portfolio
```

2. Install dependencies
```bash
npm install
```

3. Run the development server
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

## Customization

### 1. Personal Information

Edit `src/App.tsx` and update:
- Your name in the hero section
- About me description
- Education details
- Skills and technologies
- Projects with GitHub and live demo links
- Contact information

### 2. Email Setup

To enable the contact form:
1. Create a free account at [EmailJS](https://www.emailjs.com/)
2. Set up an email service
3. Create an email template
4. Get your Service ID, Template ID, and Public Key
5. Update these values in `src/App.tsx` (around line 35)

See `EMAIL_SETUP.md` for detailed instructions.

### 3. Resume

Place your resume PDF in the `public` folder as `resume.pdf`, or update the link in the hero section.

### 4. Theme Colors

To change the color scheme, edit the CSS variables in `src/index.css`:
```css
--accent-primary: #667eea;
--accent-secondary: #764ba2;
```

### 5. Social Links

Update your social media links in the contact section of `src/App.tsx`:
- GitHub
- LinkedIn
- Twitter
- Email

## Building for Production

```bash
npm run build
```

The build files will be in the `dist` folder, ready to deploy.

## Deployment

You can deploy this portfolio to:
- **Vercel** (Recommended)
- **Netlify**
- **GitHub Pages**
- **Any static hosting service**

### Deploy to Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts

Or connect your GitHub repo to Vercel for automatic deployments.

## Technologies Used

- **React** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Framer Motion** - Animations
- **EmailJS** - Email functionality
- **React Icons** - Icon library
- **React Hot Toast** - Notifications

## Project Structure

```
portfolio/
├── public/
│   └── resume.pdf          # Your resume (add this)
├── src/
│   ├── App.tsx            # Main component
│   ├── App.css            # Styles
│   ├── index.css          # Global styles & theme
│   └── main.tsx           # Entry point
├── EMAIL_SETUP.md         # Email setup guide
└── package.json
```

## Tips

1. **Images**: Add your photo or project screenshots to `public/` folder
2. **SEO**: Update the title and meta tags in `index.html`
3. **Analytics**: Add Google Analytics or similar in `index.html`
4. **Favicon**: Replace `vite.svg` with your own favicon

## License

MIT License - feel free to use this for your own portfolio!

## Support

If you have any questions or need help, feel free to open an issue or reach out.

---

Made with ❤️ using React and TypeScript
