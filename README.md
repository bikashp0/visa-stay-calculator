# 🇦🇺 Aussie Visa Stay Calculator

A web application to help Subclass 600 Visitor Visa holders calculate their remaining stay in Australia under **Condition 8558** (12 months in any 18-month period rule).

## ✨ Features

- ✅ **Add Travel History** - Record all your trips to Australia
- 📊 **Automatic Calculation** - Instantly see days used and remaining
- 📈 **Visual Timeline** - Chart showing your stay breakdown
- 🔮 **What-If Planner** - Plan future trips and see how long you can stay
- 📄 **PDF Export** - Download your calculation for visa applications
- 💾 **Auto-Save** - Your data is saved locally in your browser
- 📱 **Mobile Friendly** - Works on all devices

## 🚀 Quick Start

### Installation

```bash
# Clone or download this repository
cd visa-calculator

# Install dependencies
npm install

# Start development server
npm start
```

The app will open at `http://localhost:3000`

### Building for Production

```bash
# Create optimized production build
npm run build

# The build folder contains your production-ready app
```

## 📦 Deployment

### Deploy to Vercel (Recommended - Free)

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
vercel
```

3. Follow the prompts - your app will be live in minutes!

### Deploy to Netlify (Alternative - Free)

1. Build the app:
```bash
npm run build
```

2. Drag the `build` folder to [Netlify Drop](https://app.netlify.com/drop)

3. Done! Your app is live.

### Deploy to GitHub Pages

1. Install gh-pages:
```bash
npm install --save-dev gh-pages
```

2. Add to package.json:
```json
"homepage": "https://yourusername.github.io/visa-calculator",
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d build"
}
```

3. Deploy:
```bash
npm run deploy
```

## 🎯 How to Use

1. **Add Travel Entries**
   - Enter each arrival date to Australia
   - Enter exit date (or mark as "Currently in Australia")
   - Click "Add Entry"

2. **View Results**
   - See total days used and remaining
   - Check your maximum stay end date
   - View when your 18-month window resets

3. **Plan Future Trips**
   - Use the "What If" calculator
   - Enter a planned arrival date
   - See how long you can stay

4. **Export Your Data**
   - Click "Export PDF" to save your calculation
   - Use for visa applications or record-keeping

## 🛠️ Tech Stack

- **React** - UI framework
- **Tailwind CSS** - Styling
- **date-fns** - Date calculations
- **Recharts** - Data visualization
- **jsPDF** - PDF generation
- **Lucide React** - Icons

## 📝 Understanding Condition 8558

**Condition 8558** states that visa holders must not stay in Australia for more than **12 months (365 days) in any 18-month period**.

### How the 18-Month Window Works

- It's a **rolling calculation** - not calendar-based
- At any point in time, look back 18 months
- Count total days spent in Australia during that window
- Maximum allowed: 365 days

### Example

If you:
- Stayed 9 months (Jan-Sep 2024)
- Left and returned in Jan 2025
- You can stay ~3 more months before hitting the limit

The calculator handles all this automatically!

## ⚠️ Important Disclaimers

- This calculator is for **informational purposes only**
- Does **not constitute immigration advice**
- Always verify with [Department of Home Affairs](https://immi.homeaffairs.gov.au)
- Consult a [registered migration agent](https://www.mara.gov.au) for official advice
- Your individual circumstances may vary

## 🔒 Privacy & Data

- **All data is stored locally** in your browser
- **No data is sent to any server**
- **No tracking or analytics**
- Clear your browser data to reset the app

## 🐛 Known Issues

- PDF export works best on desktop browsers
- Date picker may vary by browser

## 🤝 Contributing

Feel free to:
- Report bugs
- Suggest features
- Submit pull requests
- Share with friends who need it!

## 📄 License

MIT License - Free to use and modify

## 💬 Support

For visa-related questions, contact:
- [Department of Home Affairs](https://immi.homeaffairs.gov.au)
- [Find a Migration Agent](https://www.mara.gov.au)

For app issues:
- Open an issue on GitHub
- Or contact: [your-email@example.com]

## 🙏 Acknowledgments

Built with ❤️ for travelers navigating Australian visa conditions.

---

**Remember**: This tool helps with calculations, but always verify with official sources!

Made by [Your Name] | [Your Website/GitHub]