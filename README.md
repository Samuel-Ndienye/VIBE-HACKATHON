# Mood Journal - AI-Powered Emotion Tracker

## 📖 Overview

Mood Journal is an AI-powered emotion tracking application that helps users understand their emotional patterns through sentiment analysis. Users can write journal entries, get AI-powered emotion analysis, and visualize their mood trends over time.

![Mood Journal](https://img.shields.io/badge/Version-1.0.0-blue) ![License](https://img.shields.io/badge/License-MIT-green)

## ✨ Features

### Core Features
- **Journal Entries**: Write and save daily journal entries
- **AI Sentiment Analysis**: Automatic emotion detection using Hugging Face API
- **Mood Visualization**: Interactive charts showing mood trends over time
- **Statistics Dashboard**: Track entries, average sentiment, and streaks

### Premium Features (Monetization)
- **Unlimited Entries**: Free tier limited to 5 entries
- **Advanced Analytics**: Detailed emotional insights and patterns
- **Data Export**: Download your journal data for offline analysis
- **Custom Themes**: Personalize the appearance of your journal

### Payment Integration
- **Multi-Payment Support**: M-Pesa, PayPal, Visa, Mastercard, Cash App, Apple Pay
- **Secure Processing**: Powered by IntaSend with PCI DSS compliance
- **Subscription Plans**: Monthly ($4.99) and Yearly ($49.99) options

## 🛠️ Technology Stack

### Frontend
- **HTML5**: Structure and semantics
- **CSS3**: Styling with modern features (Grid, Flexbox, Variables)
- **JavaScript**: Application logic and interactivity
- **Chart.js**: Data visualization for mood trends
- **Font Awesome**: Icons and UI elements

### Backend (Simulated in this demo)
- **Python Flask**: RESTful API server
- **MySQL**: Data storage for journal entries
- **Hugging Face API**: AI sentiment analysis

### Payment Processing
- **IntaSend**: Secure payment processing
- **Multiple Methods**: Support for various payment options

## 🚀 How It Works

1. **User writes a journal entry** through the HTML form
2. **Text is sent to backend** (Python/Flask) and stored in MySQL
3. **Backend sends text to Hugging Face API** for sentiment analysis
4. **AI returns emotion score** (e.g., "happy: 85%")
5. **Frontend displays results** and updates mood trend charts

## 📦 Installation

### Option 1: Direct HTML File
1. Copy the entire HTML code from above
2. Save as `mood-journal.html`
3. Open in any modern web browser

### Option 2: Deploy to Web
1. **Using Bolt.new**:
   - Visit [https://bolt.new](https://bolt.new)
   - Create new project
   - Paste the HTML code
   - Deploy and share the link

2. **Using Netlify**:
   - Drag and drop the HTML file to [Netlify Drop](https://app.netlify.com/drop)
   - Get instant deployment URL

3. **Using GitHub Pages**:
   - Upload to GitHub repository
   - Enable GitHub Pages in settings

## 💰 Monetization

Mood Journal uses a freemium model with IntaSend integration:

### Free Tier
- Limited to 5 journal entries
- Basic mood tracking
- Standard charts

### Premium Tier ($4.99/month or $49.99/year)
- Unlimited journal entries
- Advanced analytics and insights
- Data export functionality
- Priority support
- Custom themes

### Payment Methods Supported
- M-Pesa
- PayPal
- Visa/Mastercard
- Cash App
- Apple Pay

## 🔧 API Integration

### Hugging Face Sentiment Analysis
```javascript
// Example API call (simulated in demo)
async function analyzeSentiment(text) {
  // Real implementation would call:
  // POST https://api-inference.huggingface.co/models/{model_name}
  // With headers: {Authorization: Bearer {API_KEY}}
  // Returns: {sentiment: 'positive', score: 0.95}
}
```

### IntaSend Payment Processing
```javascript
// Example payment processing (simulated in demo)
function processPayment(method, details) {
  // Real implementation would call IntaSend API
  // https://api.intasend.com/v1/payment/initiate/
  // Secure payment processing for multiple methods
}
```

## 🎨 UI/UX Features

- **Responsive Design**: Works on desktop, tablet, and mobile
- **Modern Interface**: Clean, card-based design with soothing colors
- **Interactive Elements**: Smooth animations and transitions
- **Accessibility**: Proper contrast and keyboard navigation support
- **Visual Feedback**: Notifications, loading states, and success messages

## 🔒 Security Features

- **Input Validation**: Client and server-side validation
- **Payment Security**: PCI DSS compliant processing via IntaSend
- **Error Handling**: Graceful degradation on API failures
- **Data Privacy**: Journal entries stored securely

## 📊 Data Structure

### Journal Entry Object
```javascript
{
  id: Number,           // Unique identifier
  text: String,         // Journal content
  date: ISOString,      // Entry timestamp
  sentiment: String,    // 'positive', 'neutral', or 'negative'
  score: Number         // Sentiment percentage (0-100)
}
```

## 🔮 Future Enhancements

- [ ] Mobile app (iOS/Android)
- [ ] Social features (secure sharing)
- [ ] Email reminders and prompts
- [ ] Integration with health apps
- [ ] Advanced AI insights (pattern detection)
- [ ] Multi-language support

## 🐛 Troubleshooting

### Common Issues
1. **Payments not processing**: Check internet connection
2. **Analysis taking too long**: Hugging Face API might be slow
3. **Charts not loading**: Ensure JavaScript is enabled

### Browser Compatibility
- Chrome 60+ (recommended)
- Firefox 55+
- Safari 12+
- Edge 79+

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## 🤝 Contributing

We welcome contributions! Please feel free to submit issues, feature requests, or pull requests.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

For support, please open an issue on GitHub or contact us at support@moodjournal.app.

## 🙏 Acknowledgments

- Hugging Face for sentiment analysis API
- IntaSend for payment processing
- Chart.js for data visualization
- Font Awesome for icons

---

**Note**: This is a frontend demonstration. A full implementation would require:
- Python Flask backend
- MySQL database
- Hugging Face API integration
- IntaSend payment processing setup

For a production environment, please implement proper backend services and security measures.
