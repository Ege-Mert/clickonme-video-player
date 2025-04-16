document.addEventListener('DOMContentLoaded', () => {
    const playButton = document.getElementById('playButton');
    const videoContainer = document.getElementById('videoContainer');
    const musicVideo = document.getElementById('musicVideo');
    const videoWrapper = document.getElementById('videoWrapper');
    
    // Context for the audio analysis
    let audioContext;
    let analyser;
    let dataArray;
    let bufferLength;
    
    // Beat detection variables
    let beatDetector = {
        threshold: 0.15,  // Adjust sensitivity
        decay: 0.98,      // How quickly the beat detection resets
        current: 0,
        peak: 0
    };
    
    // Add a subtle pulse animation to make button more intriguing
    setInterval(() => {
        playButton.classList.toggle('pulse');
    }, 1500);
    
    playButton.addEventListener('click', () => {
        // Show the video container
        videoContainer.classList.remove('hidden');
        videoContainer.classList.add('visible');
        
        // Hide the button
        playButton.style.display = 'none';
        
        // Play the video
        musicVideo.play();
        
        // Go full screen if possible
        try {
            if (document.documentElement.requestFullscreen) {
                document.documentElement.requestFullscreen();
            } else if (document.documentElement.webkitRequestFullscreen) {
                document.documentElement.webkitRequestFullscreen();
            } else if (document.documentElement.msRequestFullscreen) {
                document.documentElement.msRequestFullscreen();
            }
        } catch (e) {
            console.log("Fullscreen not supported");
        }
        
        // Initialize audio analysis when the video is playing
        musicVideo.addEventListener('playing', setupAudioAnalysis);
    });
    
    function setupAudioAnalysis() {
        // Create audio context
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        analyser = audioContext.createAnalyser();
        
        // Create a media element source from the video
        const source = audioContext.createMediaElementSource(musicVideo);
        source.connect(analyser);
        analyser.connect(audioContext.destination);
        
        // Configure the analyzer for frequency data
        analyser.fftSize = 256;
        bufferLength = analyser.frequencyBinCount;
        dataArray = new Uint8Array(bufferLength);
        
        // Start the animation loop
        requestAnimationFrame(analyzeAudio);
    }
    
    function analyzeAudio() {
        // Get frequency data
        analyser.getByteFrequencyData(dataArray);
        
        // Define frequency ranges for bass (where most beats occur)
        const bassRange = Math.floor(bufferLength / 8);
        
        // Calculate normalized values for bass frequencies
        let bassValue = 0;
        
        // Calculate bass (low frequencies)
        for (let i = 0; i < bassRange; i++) {
            bassValue += dataArray[i];
        }
        bassValue = bassValue / (bassRange * 255); // Normalize to 0-1
        
        // Update beat detector
        updateDetector(beatDetector, bassValue);
        
        // Reset video transformations
        musicVideo.style.transform = '';
        
        // Apply scale effect based on detected beats
        applyScaleEffect();
        
        // Continue the loop
        requestAnimationFrame(analyzeAudio);
    }
    
    function updateDetector(detector, currentValue) {
        // Update the current value
        detector.current = currentValue;
        
        // If we hit a beat
        if (detector.current > detector.threshold && detector.current > detector.peak) {
            detector.peak = detector.current;
            return true; // Beat detected
        }
        
        // Apply decay to the peak
        detector.peak *= detector.decay;
        return false; // No beat detected
    }
    
    function applyScaleEffect() {
        // Only apply scale effect based on bass beats
        if (beatDetector.current > beatDetector.threshold) {
            // Calculate scale factor based on how much above threshold
            // Using a more dramatic scale factor for the effect to be more noticeable
            const intensityFactor = (beatDetector.current - beatDetector.threshold) / (1 - beatDetector.threshold);
            const scaleFactor = 1 + intensityFactor * 0.15; // Scale up to 15% larger
            
            // Apply the scale transformation
            musicVideo.style.transform = `scale(${scaleFactor})`;
        }
    }
});