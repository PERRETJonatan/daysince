# Days Since 🗓️

A habit tracking app to help you stay accountable and celebrate your progress. Track how many days it's been since you quit smoking, drinking, or any other habit you want to break.

![Ionic](https://img.shields.io/badge/Ionic-8.0.0-3880FF?style=flat-square&logo=ionic)
![Angular](https://img.shields.io/badge/Angular-20.0.0-DD0031?style=flat-square&logo=angular)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat-square&logo=typescript)
![CI/CD](https://github.com/PERRETJonatan/daysince/workflows/CI/CD%20Pipeline/badge.svg)
![Deploy](https://github.com/PERRETJonatan/daysince/workflows/Deploy%20to%20GitHub%20Pages/badge.svg)

## ✨ Features

- 📊 **Track Multiple Habits** - Monitor several habits simultaneously
- ⏱️ **Real-Time Counters** - Live countdown showing days, hours, minutes, and seconds
- 🎯 **Motivational Milestones** - Get encouraging messages as you hit progress milestones
- 💾 **Local Storage** - Your data is saved locally and persists between sessions
- 🔄 **Reset Functionality** - Restart tracking if you need to (we all slip up sometimes!)
- 🎨 **Color-Coded Events** - Each habit gets a unique color for easy identification
- 📱 **Responsive Design** - Works great on mobile, tablet, and desktop
- 🌐 **Progressive Web App** - Install it on your device for a native app experience

## 🏆 Milestone Messages

The app celebrates your progress with motivational messages:

- 🚀 **Day 1+**: Every day counts! Stay strong!
- ✨ **Week 1+**: One week down! You're doing great!
- 🎯 **30 days**: One month! Keep going strong!
- 💪 **90 days**: That's a major milestone!
- 🌟 **180 days**: Half a year! You're unstoppable!
- 🏆 **365 days+**: Over a year! Incredible achievement!

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/PERRETJonatan/daysince.git
cd daysince
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm start
# or
ionic serve
```

4. Open your browser to `http://localhost:8100`

## 🔨 Build

Build the app for production:

```bash
npm run build
# or
ionic build --prod
```

The build artifacts will be stored in the `www/` directory.

## 📱 Mobile Deployment

### Android

```bash
ionic cap add android
ionic build --prod
ionic cap copy android
ionic cap open android
```

### iOS

```bash
ionic cap add ios
ionic build --prod
ionic cap copy ios
ionic cap open ios
```

## 🌐 Web Deployment

Deploy to popular hosting platforms:

### GitHub Pages (Automated)

The app automatically deploys to GitHub Pages on every push to `main`:

- URL: `https://perretjonatan.github.io/daysince/`
- Workflow: `.github/workflows/deploy-pages.yml`

To enable:

1. Go to repository Settings → Pages
2. Set Source to "GitHub Actions"
3. Push to `main` branch - deployment is automatic!

### Netlify (Automated)

Set up automated Netlify deployment:

1. Add secrets to your GitHub repository:

   - `NETLIFY_AUTH_TOKEN`: Your Netlify personal access token
   - `NETLIFY_SITE_ID`: Your Netlify site ID

2. Push to `main` - the CI/CD pipeline will automatically deploy!

**Manual deployment:**

```bash
npm install -g netlify-cli
ionic build --prod
netlify deploy --dir=www --prod
```

### Vercel

```bash
npm install -g vercel
vercel --prod
```

## 🔄 CI/CD Pipeline

The project includes automated GitHub Actions workflows:

### Main CI/CD Pipeline (`.github/workflows/ci-cd.yml`)

- **Triggers**: Push to `main` or `develop`, Pull Requests
- **Matrix Testing**: Tests on Node 18.x and 20.x
- **Steps**:
  - Lint checking
  - Build verification
  - Unit tests with coverage
  - Artifact upload
  - Auto-deploy to Netlify (on `main` push)

### GitHub Pages Deployment (`.github/workflows/deploy-pages.yml`)

- **Triggers**: Push to `main`, manual dispatch
- **Auto-deploys** to GitHub Pages on every main branch update

### Pull Request Checks (`.github/workflows/pr-checks.yml`)

- **Triggers**: Pull Requests to `main` or `develop`
- **Validates**:
  - Code linting
  - TypeScript compilation
  - Build success
  - Test execution

## 🛠️ Tech Stack

- **Framework**: [Ionic 8](https://ionicframework.com/)
- **Frontend**: [Angular 20](https://angular.io/)
- **Language**: [TypeScript 5](https://www.typescriptlang.org/)
- **Mobile**: [Capacitor 7](https://capacitorjs.com/)
- **PWA**: Angular Service Worker
- **Storage**: LocalStorage API

## 📝 Usage

1. **Add a Habit**: Tap the `+` button to create a new tracker
2. **Enter Details**:
   - Name what you're tracking (e.g., "Smoking", "Drinking")
   - Select the date and time you quit
   - Optionally add a description
3. **View Progress**: Tap any habit to see detailed statistics
4. **Reset if Needed**: Use the reset button to restart tracking
5. **Delete**: Remove habits you no longer want to track

## 🤝 Contributing

Contributions are welcome! Feel free to:

- Report bugs
- Suggest new features
- Submit pull requests

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Jonatan PERRET**

- GitHub: [@PERRETJonatan](https://github.com/PERRETJonatan)

## 🙏 Acknowledgments

- Built with [Ionic Framework](https://ionicframework.com/)
- Icons from [Ionicons](https://ionic.io/ionicons)
- Inspired by the journey of self-improvement and breaking bad habits

---

⭐ If this app helps you on your journey, consider giving it a star!
