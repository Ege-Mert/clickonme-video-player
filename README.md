# Touch Me - Dramatic Scale-Reactive Video Player

A dramatic website with a pitch black background and an enticing "Touch Me" button. When clicked, it transitions to a video playing "Paradisio - Bailando" with extremely dramatic scaling effects that pulse with the music's beat.

## Features

- Pitch black background for dramatic effect
- Eye-catching pink "Touch Me" button with glow and pulse animation
- Full-screen video display when activated
- Video reacts to the music with MASSIVE scaling effects:
  - Dramatic pulsing/scaling on bass beats (up to 300% the original size!)
  - Very slight rotation on mid-range frequencies (minimal effect)
  - Minimal movement on high frequencies (minimal effect)
- Starting size is 30% of the container to allow room for the dramatic scaling
- No cropping of video content at any point
- Attempts to enter fullscreen mode for maximum impact

## How to Use

1. Clone this repository
2. Add your video file as `bailando.mp4` (Paradisio - Bailando)
3. Open `index.html` in a web browser

## Dramatic Scale-Reactive Effects

The video will react to different aspects of the music with a focus on extremely visible scaling:
- **Bass beats**: The video dramatically scales up and down (by a factor of 2-3x)
- **Mid frequencies**: Very minor rotation for subtle dynamic feel
- **High frequencies**: Minimal movement/translation effects

The bass-driven scaling effect is extremely pronounced and impossible to miss. The initial video size is kept small (30% of screen) to allow plenty of room for the dramatic scaling effects without being cut off.

## Technical Details

- Uses the Web Audio API to analyze audio frequencies in real-time
- Applies CSS transforms for scaling and movement
- Focuses on the bass frequencies for the main scaling effect
- Uses a multiplier of 2.0 for the scale factor, resulting in scaling up to 300% on strong beats
- Lower bass threshold (0.10) to detect more beats and create more frequent scaling

## Customization

You can customize the intensity of the scaling in `script.js`:
- The scaling factor multiplier is currently set to 2.0, which gives dramatic scaling
- If it's still not visible enough, you can increase this value even further
- Adjust bass sensitivity by changing `beatDetector.threshold` (currently 0.10)