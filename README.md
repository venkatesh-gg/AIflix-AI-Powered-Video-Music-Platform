# AIflix - AI-Powered Streaming Platform

A modern, full-featured streaming platform that leverages artificial intelligence to generate videos and music content. Built with React, TypeScript, and Tailwind CSS.

![AIflix Banner](https://images.pexels.com/photos/2524874/pexels-photo-2524874.jpeg?auto=compress&cs=tinysrgb&w=1200&h=400&fit=crop)

## ✨ Features

### 🎬 Content Generation
- **AI Video Generation**: Create stunning videos from text descriptions
- **AI Music Composition**: Generate original music tracks in any genre
- **Multiple Styles**: Choose from various artistic styles and moods
- **Real-time Progress**: Track generation progress with live updates

### 🎯 User Experience
- **Modern UI/UX**: Clean, intuitive interface with smooth animations
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Dark Theme**: Eye-friendly dark mode throughout the application
- **Advanced Search**: Powerful search and filtering capabilities

### 👥 User Management
- **Authentication System**: Secure login and registration
- **User Profiles**: Customizable profiles with avatar support
- **Subscription Tiers**: Free, Pro, and Premium plans
- **Credit System**: Generation credits based on subscription level

### 🎵 Content Library
- **Browse Content**: Explore AI-generated videos and music
- **Content Player**: Built-in video and audio player
- **Social Features**: Like, share, and discover content
- **Personalized Recommendations**: AI-powered content suggestions

### 🛡️ Admin Panel
- **User Management**: Comprehensive user administration
- **Content Moderation**: Review and manage platform content
- **Analytics Dashboard**: Detailed platform metrics and insights
- **Subscription Management**: Monitor revenue and user plans

## 🚀 Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **Media Player**: React Player
- **Notifications**: React Hot Toast
- **Build Tool**: Vite
- **Code Quality**: ESLint + TypeScript ESLint

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/aiflix.git
   cd aiflix
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 🎮 Usage

### Getting Started
1. **Sign Up**: Create a new account or use demo credentials
2. **Explore**: Browse the content library and featured videos
3. **Generate**: Create your own AI content using the generation tools
4. **Watch**: Enjoy content with the built-in media player

### Demo Credentials
- **Email**: `user@example.com`
- **Password**: `password`

For admin access:
- **Email**: `admin@aiflix.com`
- **Password**: `password`

### Subscription Plans

| Plan | Price | Video Credits | Music Credits | Max Duration |
|------|-------|---------------|---------------|--------------|
| Free | $0/month | 2 | 5 | 30 seconds |
| Pro | $19.99/month | 20 | 50 | 5 minutes |
| Premium | $49.99/month | Unlimited | Unlimited | 20 minutes |

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Auth/           # Authentication components
│   ├── Content/        # Content-related components
│   └── Layout/         # Layout components
├── contexts/           # React Context providers
├── pages/              # Page components
├── services/           # API services and utilities
├── types/              # TypeScript type definitions
└── styles/             # Global styles
```

## 🎨 Key Components

### Pages
- **LandingPage**: Marketing homepage with features showcase
- **AuthPage**: Login and registration forms
- **Dashboard**: User dashboard with stats and recent activity
- **Browse**: Content discovery with search and filters
- **Generate**: AI content generation interface
- **Watch**: Media player for videos and music
- **Profile**: User profile management
- **Subscription**: Plan management and billing
- **AdminPanel**: Administrative interface

### Components
- **ContentCard**: Displays content with metadata
- **Header**: Navigation with search and user menu
- **Sidebar**: Main navigation menu
- **ProtectedRoute**: Route protection for authenticated users

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:

```env
VITE_APP_NAME=AIflix
VITE_API_URL=http://localhost:3000/api
```

### Tailwind Configuration
The project uses a custom Tailwind configuration with:
- Extended color palette (primary, secondary, accent, dark themes)
- Custom fonts (Inter, Poppins)
- Additional spacing and animation utilities

## 🎯 Features in Detail

### AI Content Generation
- **Video Generation**: Transform text prompts into videos
- **Music Composition**: Create original music from descriptions
- **Style Selection**: Choose from multiple artistic styles
- **Progress Tracking**: Real-time generation progress updates
- **Quality Options**: Different quality levels based on subscription

### User Authentication
- **Secure Login**: Email/password authentication
- **Registration**: New user account creation
- **Profile Management**: Update personal information and preferences
- **Password Security**: Secure password handling

### Content Management
- **Upload System**: Support for user-generated content
- **Metadata Management**: Title, description, tags, and categories
- **Thumbnail Generation**: Automatic thumbnail creation
- **Content Moderation**: Admin review and approval system

### Subscription System
- **Flexible Plans**: Multiple subscription tiers
- **Credit System**: Usage-based credit allocation
- **Payment Processing**: Secure payment handling
- **Plan Management**: Easy upgrade/downgrade options

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Deploy to Netlify
1. Build the project: `npm run build`
2. Deploy the `dist` folder to Netlify
3. Configure redirects for SPA routing

### Deploy to Vercel
1. Connect your GitHub repository to Vercel
2. Configure build settings:
   - Build Command: `npm run build`
   - Output Directory: `dist`
3. Deploy automatically on push

## 🧪 Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Code Style
- **TypeScript**: Strict type checking enabled
- **ESLint**: Code quality and consistency
- **Prettier**: Code formatting (recommended)

### Adding New Features
1. Create components in appropriate directories
2. Add TypeScript types in `src/types/`
3. Update routing in `src/App.tsx`
4. Add necessary context providers

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Pexels**: Stock photos and images
- **Lucide**: Beautiful icon library
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Animation library
- **React Community**: Amazing ecosystem and tools

## 📞 Support

For support and questions:
- 📧 Email: venkateshgogula0917@gmail.com
- 💬 Discord: [Join our community](https://discord.gg/aiflix)
- 📖 Documentation: [docs.aiflix.com](https://docs.aiflix.com)

---

**Made with ❤️ by the AIflix Team**
