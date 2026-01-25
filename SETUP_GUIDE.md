# 🚀 Complete Setup Guide

## Step 1: Google Sheets Setup

### Create your Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it "Chatbot Knowledge Base"
4. Set up the following structure:

| A (Question)                  | B (Answer)                                                                                         |
| ----------------------------- | -------------------------------------------------------------------------------------------------- |
| What is your name?            | I'm Shiraj's AI chatbot assistant!                                                                 |
| Who is Shiraj?                | Shiraj is a talented frontend engineer who built this chatbot.                                     |
| What can you do?              | I can chat with you using text or voice! I get my knowledge from Google Sheets.                    |
| How are you?                  | I'm doing great! Thanks for asking. How can I help you today?                                      |
| What technologies do you use? | I'm built with Next.js, React, and Google Sheets API.                                              |
| Tell me about web development | Web development involves creating websites using HTML, CSS, JavaScript, and frameworks like React. |

### Make Sheet Public

1. Click "Share" button (top right)
2. Click "Change to anyone with the link"
3. Set permission to "Viewer"
4. Copy the link
5. Extract the Sheet ID from the URL:
   ```
   https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID/edit#gid=0
   ```

## Step 2: Google Cloud Console Setup

### Enable Google Sheets API

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Go to "APIs & Services" → "Library"
4. Search for "Google Sheets API"
5. Click "Enable"

### Create API Key

1. Go to "APIs & Services" → "Credentials"
2. Click "Create Credentials" → "API Key"
3. Copy the API key
4. (Optional) Click "Restrict Key" to limit usage to Google Sheets API only

## Step 3: Environment Variables

Edit the `.env.local` file:

```env
# Replace with your actual values
GOOGLE_SHEETS_API_KEY=AIzaSyC-your-actual-api-key-here
GOOGLE_SHEET_ID=1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms

# For client-side access (same values)
AI_CHAT_GOOGLE_SHEETS_API_KEY=AIzaSyC-your-actual-api-key-here
AI_CHAT_GOOGLE_SHEET_ID=1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms
```

## Step 4: Install and Run

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

## Step 5: Test the Chatbot

1. Open [http://localhost:3000](http://localhost:3000)
2. Try typing: "What is your name?"
3. Try voice input (click microphone button)
4. The bot should respond with answers from your Google Sheet

## Step 6: Deploy to Vercel

### Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/voice-chatbot.git
git push -u origin main
```

### Deploy on Vercel

1. Go to [Vercel](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Add environment variables:
   - `GOOGLE_SHEETS_API_KEY`
   - `GOOGLE_SHEET_ID`
   - `AI_CHAT_GOOGLE_SHEETS_API_KEY`
   - `AI_CHAT_GOOGLE_SHEET_ID`
5. Deploy!

## 🔧 Customization Ideas

### Add More Knowledge

Just add more rows to your Google Sheet:

- Column A: Questions
- Column B: Answers

### Change Voice Settings

Edit `app/utils/textToSpeech.js`:

```javascript
currentUtterance.rate = 0.9; // Speech speed (0.1 to 10)
currentUtterance.pitch = 1.0; // Voice pitch (0 to 2)
currentUtterance.volume = 0.8; // Volume (0 to 1)
```

### Customize Appearance

Edit `app/components/Chatbot.js`:

```javascript
// Change background colors
className = "bg-white/10 backdrop-blur-lg"; // Main container
className = "bg-blue-500 text-white"; // User messages
className = "bg-white/20 text-white"; // Bot messages
```

### Add New Features

1. **Message History**: Store chats in localStorage
2. **Voice Selection**: Let users choose voice
3. **Language Support**: Add multiple languages
4. **Admin Panel**: Add/edit knowledge through UI

## 🐛 Common Issues

### "Speech not supported"

- Use Chrome or Edge browser
- Ensure HTTPS (required for speech)
- Check microphone permissions

### "Google Sheets API error"

- Verify API key is correct
- Check if Google Sheets API is enabled
- Ensure sheet is publicly readable

### "No responses"

- Check if questions in sheet match user input
- Adjust fuzzy search threshold
- Verify sheet structure (A=questions, B=answers)

## 📱 Mobile Optimization

The chatbot is fully responsive and works on mobile devices:

- Touch-friendly interface
- Voice input works on mobile Chrome
- Responsive design adapts to screen size

## 🎯 Production Tips

1. **API Key Security**: Restrict API key to your domain only
2. **Rate Limiting**: Monitor API usage in Google Cloud Console
3. **Caching**: Consider caching Google Sheets data
4. **Analytics**: Add Google Analytics for usage tracking
5. **Error Handling**: Monitor errors in production

## 🤝 Need Help?

If you encounter any issues:

1. Check the browser console for errors
2. Verify all environment variables are set
3. Test Google Sheets API manually
4. Ensure microphone permissions are granted

---

**Happy coding! 🚀**
