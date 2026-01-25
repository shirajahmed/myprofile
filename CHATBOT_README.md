# 🤖 Voice Chatbot with Google Sheets

A modern voice-enabled chatbot built with Next.js that uses Google Sheets as its knowledge base. Features both text and voice interaction using the Web Speech API.

## ✨ Features

- 💬 **Text Chat**: Type messages and get AI-like responses
- 🎤 **Voice Input**: Speak your questions using speech recognition
- 🔊 **Voice Output**: Bot responds with synthesized speech
- 📊 **Google Sheets Integration**: Uses Google Sheets as knowledge base
- 🔍 **Fuzzy Search**: Intelligent matching using Fuse.js
- 📱 **Responsive Design**: Works on desktop and mobile
- 🎨 **Beautiful UI**: Modern glassmorphism design with Tailwind CSS

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Google Sheets API

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google Sheets API
4. Create credentials (API Key)
5. Create a Google Sheet with the following structure:

| Question           | Answer                                   |
| ------------------ | ---------------------------------------- |
| What is your name? | I'm Shiraj's chatbot assistant!          |
| Who is Shiraj?     | Shiraj is a frontend engineer.           |
| What can you do?   | I can chat with you using text or voice! |

6. Make your Google Sheet publicly readable:
   - Click "Share" → "Anyone with the link can view"
   - Copy the Sheet ID from the URL

### 3. Configure Environment Variables

Edit `.env.local` file:

```env
GOOGLE_SHEETS_API_KEY=your_actual_api_key_here
GOOGLE_SHEET_ID=your_actual_sheet_id_here
AI_CHAT_GOOGLE_SHEETS_API_KEY=your_actual_api_key_here
AI_CHAT_GOOGLE_SHEET_ID=your_actual_sheet_id_here
```

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🛠️ Tech Stack

- **Framework**: Next.js 14
- **Styling**: Tailwind CSS
- **Icons**: React Icons
- **Search**: Fuse.js (fuzzy search)
- **Voice**: Web Speech API
- **Data**: Google Sheets API
- **Hosting**: Vercel (free tier)

## 🔧 Configuration

### Google Sheets Setup

Your Google Sheet should have this structure:

- Column A: Questions
- Column B: Answers
- First row: Headers (Question, Answer)

Example:

```
A1: Question          | B1: Answer
A2: What is your name? | B2: I'm your AI assistant!
A3: How are you?      | B3: I'm doing great, thanks!
```

### Voice Configuration

The chatbot uses the Web Speech API which is supported in:

- Chrome/Edge (recommended)
- Firefox (partial support)
- Safari (limited support)

## 🌐 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Connect your GitHub repo to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Environment Variables for Production

Make sure to add these in your Vercel dashboard:

- `GOOGLE_SHEETS_API_KEY`
- `GOOGLE_SHEET_ID`
- `AI_CHAT_GOOGLE_SHEETS_API_KEY`
- `AI_CHAT_GOOGLE_SHEET_ID`

## 📝 Usage

### Text Chat

1. Type your message in the input field
2. Press Enter or click Send
3. Bot will respond with the best matching answer

### Voice Chat

1. Click the microphone button
2. Speak your question
3. Bot will automatically process and respond with voice

### Adding New Knowledge

You can add new questions and answers directly to your Google Sheet:

1. Open your Google Sheet
2. Add new rows with questions and answers
3. The bot will automatically use the new data

## 🎨 Customization

### Styling

- Edit `tailwind.config.js` for theme customization
- Modify `app/globals.css` for custom animations
- Update colors in `app/components/Chatbot.js`

### Voice Settings

- Adjust speech rate, pitch, and volume in `app/utils/textToSpeech.js`
- Change speech recognition language in `app/utils/speechRecognition.js`

### Search Sensitivity

- Modify the `threshold` value in `findBestAnswer()` function
- Lower values = more strict matching
- Higher values = more fuzzy matching

## 🔍 Troubleshooting

### Common Issues

1. **Speech not working**: Check browser support and HTTPS requirement
2. **Google Sheets not loading**: Verify API key and sheet permissions
3. **Voice recognition not starting**: Check microphone permissions
4. **API errors**: Ensure environment variables are set correctly

### Browser Support

| Feature            | Chrome | Firefox | Safari | Edge |
| ------------------ | ------ | ------- | ------ | ---- |
| Speech Recognition | ✅     | ⚠️      | ⚠️     | ✅   |
| Speech Synthesis   | ✅     | ✅      | ✅     | ✅   |
| Overall Experience | ✅     | ⚠️      | ⚠️     | ✅   |

## 📊 Performance

- **Lighthouse Score**: 90+
- **First Load**: ~2s
- **Voice Response**: ~500ms
- **Sheet API**: ~1s

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Web Speech API for voice capabilities
- Google Sheets API for data storage
- Fuse.js for fuzzy search
- Tailwind CSS for styling
- Next.js for the framework

---

**Built with ❤️ by Shiraj**

For questions or support, please open an issue on GitHub.
