# Touch Me - Scale-Reactive Video Player

A dramatic website with a pitch black background and an enticing "Touch Me" button. When clicked, it transitions to a video playing "Paradisio - Bailando" with scale-reactive effects that respond to the music's beat.

## Features

- Pitch black background for dramatic effect
- Eye-catching pink "Touch Me" button with glow and pulse animation
- Full-screen video display when activated
- Video reacts to the music with scaling and movement effects:
  - Pulsing/scaling on bass beats
  - Slight rotation on mid-range frequencies
  - Subtle movement on high frequencies
- 15% padding around the video to ensure it remains fully visible during reactive effects
- Attempts to enter fullscreen mode for maximum impact

## How to Use

1. Clone this repository
2. Add your video file as `bailando.mp4` (Paradisio - Bailando)
3. Open `index.html` in a web browser

## Scale-Reactive Effects

The video will react to different aspects of the music:
- **Bass beats**: The video scales up and down (pulsing effect)
- **Mid frequencies**: Slight rotation for a dynamic feel
- **High frequencies**: Subtle movement/translation effects

All these effects are purely transformational (scaling/movement) with no color or filter changes. The 15% padding ensures the full video remains visible even during the most intense scaling effects.

## Technical Details

- Uses the Web Audio API to analyze audio frequencies in real-time
- Applies CSS transforms for scaling and movement
- Separate frequency band analysis for bass, mid, and high frequencies
- Beat detection algorithm identifies significant audio events

## Customization

You can customize the website by:
- Replacing `bailando.mp4` with your own music video
- Adjusting the sensitivity thresholds in `script.js` (higher values = less reactive, lower values = more reactive)
- Modifying the scale factor in the `applyVideoScalingEffects` function