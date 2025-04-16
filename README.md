# Touch Me - Scale-Reactive Video Player

A dramatic website with a pitch black background and an enticing "Touch Me" button. When clicked, it transitions to a video playing "Paradisio - Bailando" with subtle scale-reactive effects that respond to the music's beat.

## Features

- Pitch black background for dramatic effect
- Eye-catching pink "Touch Me" button with glow and pulse animation
- Full-screen video display when activated
- Video reacts to the music with subtle scaling and gentle movement effects:
  - Gentle pulsing/scaling on bass beats (primary effect)
  - Very slight rotation on mid-range frequencies (minimal effect)
  - Minimal movement on high frequencies (minimal effect)
- 20% padding around the video to ensure it remains fully visible during reactive effects
- No cropping of video content at any point
- Attempts to enter fullscreen mode for maximum impact

## How to Use

1. Clone this repository
2. Add your video file as `bailando.mp4` (Paradisio - Bailando)
3. Open `index.html` in a web browser

## Scale-Reactive Effects

The video will react to different aspects of the music with a focus on clean, subtle scaling:
- **Bass beats**: The video scales up and down slightly (gentle pulsing effect)
- **Mid frequencies**: Very minor rotation for subtle dynamic feel
- **High frequencies**: Minimal movement/translation effects

All effects are intentionally subtle to ensure the scaling effect is clearly visible without being distracting. The video wrapper has `overflow: visible` to prevent any cropping, and the 20% padding ensures the full video remains visible during scaling animations.

## Technical Details

- Uses the Web Audio API to analyze audio frequencies in real-time
- Applies CSS transforms for scaling and movement
- Focuses on the bass frequencies for the main scaling effect
- Minimizes other effects to highlight the scaling

## Customization

You can customize the sensitivity and intensity of the effects in `script.js`:
- Adjust bass sensitivity by changing `beatDetector.threshold` (currently 0.12)
- Modify the scaling intensity by changing the scale factor multiplier (currently 0.08)
- Rotation and movement effects are intentionally minimal but can be adjusted if desired