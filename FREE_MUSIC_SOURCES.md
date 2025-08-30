# Free Music Sources for Your Portfolio

## 🎵 **Best Free Music Platforms**

### 1. **Free Music Archive (FMA)**
- **URL**: https://freemusicarchive.org
- **License**: Creative Commons & Public Domain
- **Best For**: Ambient, Electronic, Classical
- **Direct Links**:
  - Ambient: `https://freemusicarchive.org/music/Kevin_MacLeod/`
  - Chill: `https://freemusicarchive.org/genre/Ambient/`

### 2. **Pixabay Music**
- **URL**: https://pixabay.com/music/
- **License**: Pixabay License (Free for commercial use)
- **Best For**: Background music, Ambient
- **Format**: MP3, Direct download

### 3. **Zapsplat** (Free with account)
- **URL**: https://zapsplat.com
- **License**: Free with attribution
- **Best For**: High-quality ambient tracks

### 4. **YouTube Audio Library**
- **URL**: https://studio.youtube.com/channel/UC.../music
- **License**: Creative Commons
- **Best For**: Various genres, No attribution required

### 5. **Incompetech (Kevin MacLeod)**
- **URL**: https://incompetech.com
- **License**: Creative Commons (with attribution)
- **Best For**: Professional quality ambient music

## 🎧 **Recommended Tracks for Portfolio**

### Ambient/Focus Music:
```javascript
const recommendedTracks = [
  {
    title: "Peaceful Morning",
    artist: "Kevin MacLeod",
    url: "https://incompetech.com/music/royalty-free/index.html?isrc=USUAN1100301",
    license: "CC BY 3.0"
  },
  {
    title: "Meditation Impromptu 02",
    artist: "Kevin MacLeod", 
    url: "https://incompetech.com/music/royalty-free/index.html?isrc=USUAN1100298",
    license: "CC BY 3.0"
  },
  {
    title: "Ambient Relaxation",
    artist: "Pixabay",
    url: "https://pixabay.com/music/ambient-relaxation-12099/",
    license: "Pixabay License"
  }
];
```

## 📁 **How to Add Music to Your Project**

### Option 1: Host Locally
1. Download MP3 files from free sources
2. Place in `/public/music/` folder
3. Update file paths in MusicPlayer component

### Option 2: Use CDN Links
```javascript
const songs = [
  {
    src: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
    title: "Ambient Bell",
    artist: "SoundJay"
  },
  // Add more tracks...
];
```

## ⚖️ **License Requirements**

### Creative Commons (CC BY):
- **Required**: Attribution to artist
- **Allowed**: Commercial use, modification
- **Attribution**: "Music by [Artist] (https://link)"

### Public Domain:
- **Required**: Nothing
- **Allowed**: Any use without restriction

### Pixabay License:
- **Required**: Nothing (but attribution appreciated)
- **Allowed**: Commercial use, modification

## 🎼 **Suggested Music Categories**

### For Portfolio Websites:
1. **Ambient/Atmospheric** - Non-distracting background
2. **Lo-fi/Chill** - Modern, relaxing vibes
3. **Minimal Electronic** - Tech-focused feel
4. **Classical/Piano** - Professional atmosphere

### Avoid:
- Music with vocals (distracting)
- High-energy tracks (overwhelming)
- Copyrighted mainstream music
- Very long tracks (>5 minutes)

## 🔧 **Implementation Tips**

### File Optimization:
- Use MP3 format (best compatibility)
- Keep file size under 5MB per track
- Use 128kbps quality (good balance)
- Consider lazy loading for performance

### User Experience:
- Start with volume at 50-70%
- Provide easy mute/volume controls
- Auto-pause on page visibility change
- Remember user preferences

## 📝 **Attribution Examples**

```html
<!-- In your footer or credits -->
<p>Music: "Track Name" by Artist Name (https://source-link) 
   Licensed under CC BY 3.0</p>
```

```javascript
// In your component
const musicCredits = [
  "Music: 'Peaceful Morning' by Kevin MacLeod (incompetech.com)",
  "Licensed under Creative Commons: By Attribution 3.0 License",
  "http://creativecommons.org/licenses/by/3.0/"
];
```

## 🚀 **Quick Start - Ready-to-Use Tracks**

### Immediate Use (No Attribution Required):
1. **Pixabay**: https://pixabay.com/music/search/ambient/
2. **Freesound** (CC0): https://freesound.org/search/?q=ambient&f=license:%22Creative+Commons+0%22

### High Quality (Attribution Required):
1. **Kevin MacLeod**: https://incompetech.com/music/royalty-free/music.html
2. **Free Music Archive**: https://freemusicarchive.org/genre/Ambient

Choose tracks that match your portfolio's mood and always check the specific license requirements!
