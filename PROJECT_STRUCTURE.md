# Project Structure Guide

## Overview
Moruf Adebola's AI Automation & Systems Portfolio - A modern React + TypeScript portfolio showcasing AI automation projects with an interactive chatbot.

## Directory Structure

```
moruf-prompt-engineer-portfolio-main/
├── src/
│   ├── pages/                    # Route pages
│   │   ├── Index.tsx            # Home page
│   │   ├── NotFound.tsx         # 404 page
│   │   ├── BookACall.tsx        # Contact/Lead capture page
│   │   └── CaseStudyTeacherAI.tsx # AI Teaching Assistant case study
│   │
│   ├── components/              # Reusable React components
│   │   ├── ui/                  # shadcn/ui components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── toaster.tsx
│   │   │   ├── toast.ts
│   │   │   ├── sonner.tsx
│   │   │   └── tooltip.tsx
│   │   ├── ChatBot.tsx          # Floating chatbot widget (Moruf)
│   │   ├── AnimatedBackground.tsx # Animated gradient background
│   │   ├── Hero.tsx             # Hero section
│   │   ├── FocusAreas.tsx       # Focus areas section
│   │   ├── Process.tsx          # Process workflow section
│   │   ├── Projects.tsx         # Featured projects section
│   │   ├── CaseStudies.tsx      # Case studies grid
│   │   ├── Contact.tsx          # Contact CTA section
│   │   ├── Experiments.tsx      # Experiments section
│   │   ├── Footer.tsx           # Footer component
│   │   └── ScrollToTop.tsx      # Scroll-to-top button
│   │
│   ├── hooks/                   # Custom React hooks
│   │   ├── use-mobile.tsx       # Mobile viewport detection
│   │   └── use-toast.ts         # Toast notifications hook
│   │
│   ├── lib/                     # Utility functions
│   │   └── utils.ts             # Helper utilities (cn, etc.)
│   │
│   ├── assets/                  # Static assets
│   │   └── hero-bg.jpg          # Hero background image
│   │
│   ├── App.tsx                  # Root app component
│   ├── main.tsx                 # React app entry point
│   ├── index.css                # Global styles (Tailwind, animations)
│   └── vite-env.d.ts            # Vite types
│
├── api/
│   └── book-call.ts             # (Deprecated - use Vercel serverless)
│
├── public/
│   ├── robots.txt               # SEO robots file
│   └── site.webmanifest         # PWA manifest
│
├── Configuration Files
│   ├── vite.config.ts           # Vite build configuration
│   ├── tailwind.config.ts       # Tailwind CSS setup
│   ├── postcss.config.js        # PostCSS configuration
│   ├── tsconfig.json            # TypeScript base config
│   ├── tsconfig.app.json        # TypeScript app config
│   ├── tsconfig.node.json       # TypeScript Node config
│   ├── eslint.config.js         # ESLint rules
│   └── components.json          # shadcn/ui config
│
├── Deployment
│   └── vercel.json              # Vercel deployment config
│
├── Documentation
│   ├── README.md                # Main documentation
│   ├── PROJECT_STRUCTURE.md     # This file
│   └── CHANGELOG.md             # Version history
│
├── Environment
│   ├── .env.example             # Example env variables
│   ├── .gitignore               # Git ignore rules
│   └── package.json             # Project dependencies
```

## Key Features

### 1. **Responsive Portfolio**
- Mobile-first design
- Fully responsive on all devices
- Touch-friendly interactions

### 2. **Interactive Chatbot (Moruf)**
- Floating chat widget in bottom-right corner
- Animated typing indicator
- 3-second response delay for realism
- Auto-scroll on new messages
- Promotional message card (pops up every 20 seconds)
- Red notification badge
- Ultra-thin cyan scrollbar

### 3. **Lead Capture**
- "Book a Call" form with validation
- Email notifications via Resend
- Fields: Name, Email, Phone, Project Type, Description
- International phone support

### 4. **Case Studies**
- Detailed case study pages
- Structured content (Problem, Solution, Implementation, Results)
- Professional design system

### 5. **Design System**
- Tailwind CSS for styling
- shadcn/ui component library
- Consistent color scheme (Cyan primary: #00D9FF)
- Dark theme optimized
- Custom animations

## Component Hierarchy

```
App
├── Providers (QueryClient, Router, Tooltip, Toaster)
├── AnimatedBackground (global)
├── BrowserRouter
│   ├── ScrollToTop
│   ├── Routes
│   │   ├── / → Index
│   │   │   ├── Hero
│   │   │   ├── FocusAreas
│   │   │   ├── Process
│   │   │   ├── Projects
│   │   │   ├── Experiments
│   │   │   ├── CaseStudies
│   │   │   ├── Contact
│   │   │   └── Footer
│   │   ├── /book-call → BookACall
│   │   ├── /case-study/teacher-ai → CaseStudyTeacherAI
│   │   └── * → NotFound
│   └── ChatBot (global, all pages)
```

## Technology Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **shadcn/ui** - Component library
- **React Router** - Client-side routing
- **React Hook Form** - Form handling
- **Zod** - Schema validation
- **Lucide React** - Icons
- **Sonner** - Toast notifications

### Backend/Deployment
- **Vercel** - Hosting & deployment
- **Resend** - Email service
- **Express** - API (local dev only)

### Development
- **TypeScript** - Type checking
- **ESLint** - Linting
- **PostCSS** - CSS processing
- **Tailwind CSS** - Utility CSS

## Development Workflow

### Local Development
```bash
npm install
npm run dev
# Navigate to http://localhost:5173
```

### Build for Production
```bash
npm run build
npm run preview
```

### Linting
```bash
npm run lint
```

### Deployment to Vercel
```bash
git push origin main
# Vercel automatically deploys
```

## Environment Variables

Create `.env.local`:
```
VITE_RESEND_API_KEY=your_resend_key
RESEND_API_KEY=your_resend_key
```

## Styling Convention

### Color Palette
- **Primary**: Cyan (#00D9FF / hsl(188 94% 55%))
- **Secondary**: Dark Cyan (#0FA5A8 / hsl(193 82% 31%))
- **Background**: Dark (#1A1A23 / hsl(220 18% 8%))
- **Foreground**: Light (#F8F9FF / hsl(210 40% 98%))
- **Muted**: Gray (#2B2B35 / hsl(220 15% 18%))
- **Destructive**: Red (#E74C3C / hsl(0 84.2% 60.2%))

### Typography
- Body: Inter (default)
- Headings: Bold weights
- Line Heights: 1.6 (body), 1.2 (headings)

## Performance Considerations

- Code splitting via React Router
- Lazy component loading
- Image optimization (hero-bg.jpg)
- CSS tree-shaking via Tailwind
- Minimal bundle size
- Optimized animations

## SEO & Accessibility

- Semantic HTML
- ARIA labels
- Proper heading hierarchy
- Meta tags ready
- robots.txt configured
- Sitemap ready

## Future Enhancements

- [ ] Add more case studies
- [ ] Implement real chatbot backend
- [ ] Add blog section
- [ ] Email newsletter signup
- [ ] Analytics integration
- [ ] Dark/Light theme toggle
- [ ] Internationalization (i18n)
- [ ] Performance monitoring

## Maintenance

### Regular Tasks
- Update dependencies monthly
- Run ESLint checks
- Test on multiple devices
- Monitor Vercel deployment logs

### Code Quality
- Keep components focused and single-purpose
- Use TypeScript strictly
- Write meaningful comments for complex logic
- Follow existing style conventions

## Support & Contact

For questions or issues, see the main README.md file.
