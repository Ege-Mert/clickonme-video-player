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
        threshold: 0.10,  // Lower threshold to detect more beats
        decay: 0.98,      // How quickly the beat detection resets
        current: 0,
        peak: 0
    };
    
    // Mid frequency detection - reduced role
    let midDetector = {
        threshold: 0.15,  // Increased threshold to reduce effect
        decay: 0.97,
        current: 0,
        peak: 0
    };
    
    // High frequency detection - reduced role
    let highDetector = {
        threshold: 0.15,  // Increased threshold to reduce effect
        decay: 0.97,
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
        
        // Define frequency ranges
        const bassRange = Math.floor(bufferLength / 8);    // Low frequencies (bass)
        const midRange = Math.floor(bufferLength / 2);     // Mid frequencies
        
        // Calculate normalized values for different frequency bands
        let bassValue = 0;
        let midValue = 0;
        let highValue = 0;
        
        // Calculate bass (low frequencies)
        for (let i = 0; i < bassRange; i++) {
            bassValue += dataArray[i];
        }
        bassValue = bassValue / (bassRange * 255); // Normalize to 0-1
        
        // Calculate mids (mid frequencies)
        for (let i = bassRange; i < midRange; i++) {
            midValue += dataArray[i];
        }
        midValue = midValue / ((midRange - bassRange) * 255); // Normalize to 0-1
        
        // Calculate highs (high frequencies)
        for (let i = midRange; i < bufferLength; i++) {
            highValue += dataArray[i];
        }
        highValue = highValue / ((bufferLength - midRange) * 255); // Normalize to 0-1
        
        // Update beat detectors
        updateDetector(beatDetector, bassValue);
        updateDetector(midDetector, midValue);
        updateDetector(highDetector, highValue);
        
        // Reset video transformations
        musicVideo.style.transform = '';
        videoWrapper.style.transform = '';
        
        // Apply effects based on detected beats
        applyVideoScalingEffects();
        
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
    
    function applyVideoScalingEffects() {
        // Create a transformation string
        let videoTransform = '';
        let wrapperTransform = '';
        
        // Apply bass effect (scaling) - DRAMATICALLY increased
        if (beatDetector.current > beatDetector.threshold) {
            // Calculate scale factor - much more dramatic (2.0 instead of 0.08)
            // This will scale from 1.0 to 3.0 times the original size depending on beat strength
            const scaleFactor = 1 + (beatDetector.current - beatDetector.threshold) * 2.0;
            videoTransform += ` scale(${scaleFactor})`;
        }
        
        // Apply mid frequency effect - kept minimal
        if (midDetector.current > midDetector.threshold) {
            // Reduced rotation amount
            const rotateAngle = (midDetector.current - midDetector.threshold) * 0.5;
            wrapperTransform += ` rotate(${rotateAngle}deg)`;
        }
        
        // Apply high frequency effect - kept minimal
        if (highDetector.current > highDetector.threshold) {
            // Reduced translation amount
            const translateAmount = (highDetector.current - highDetector.threshold) * 3;
            const translateX = (Math.random() * 2 - 1) * translateAmount;
            const translateY = (Math.random() * 2 - 1) * translateAmount;
            
            wrapperTransform += ` translate(${translateX}px, ${translateY}px)`;
        }
        
        // Apply the transformations
        if (videoTransform) {
            musicVideo.style.transform = videoTransform;
        }
        
        if (wrapperTransform) {
            videoWrapper.style.transform = wrapperTransform;
        }
    }
});