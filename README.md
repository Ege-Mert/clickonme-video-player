# Click On Me - Reactive Video Player

A dramatic website with a pitch black background and an eye-catching button. When clicked, it transitions to a video playing "Paradisio - Bailando" with the video itself reacting to the music beats.

## Features

- Pitch black background for dramatic effect
- Eye-catching blue button with glow and pulse animation
- Button text "Click On Me"
- Full-screen video display when activated
- Video reacts directly to the music with:
  - Pulsing/scaling on bass beats
  - Brightness changes on mid-range frequencies
  - Subtle shaking/movement on high frequencies
- 15% padding around the video to ensure it remains fully visible during reactive effects
- Attempts to enter fullscreen mode for maximum impact

## How to Use

1. Clone this repository
2. Add your video file as `bailando.mp4` (Paradisio - Bailando)
3. Open `index.html` in a web browser

## Reactive Effects

The video itself will react to the music in several ways:
- Strong bass beats will make the video pulse (scale up and down)
- Mid-range frequencies will adjust the brightness and add slight rotation
- High frequencies will add a slight vibration/shake effect

All these effects are calibrated to enhance the viewing experience without being too distracting, and the 15% padding ensures the full video remains visible even during the most intense effects.

## Technical Details

- Uses the Web Audio API to analyze audio frequencies in real-time
- Applies CSS transforms directly to the video element
- Separate frequency band analysis for bass, mid, and high frequencies
- Beat detection algorithm identifies significant audio events

## Customization

You can customize the website by:
- Replacing `bailando.mp4` with your own music video
- Adjusting the sensitivity thresholds in `script.js`
- Modifying the effect intensities in the `applyVideoEffects` function

## License

Feel free to use and modify for your own purposes.