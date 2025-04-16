document.addEventListener('DOMContentLoaded', () => {
    const playButton = document.getElementById('playButton');
    const videoContainer = document.getElementById('videoContainer');
    const musicVideo = document.getElementById('musicVideo');
    const visualizer = document.getElementById('visualizer');
    const overlay = document.querySelector('.music-reactive-overlay');
    
    // Context for the audio visualization
    let audioContext;
    let analyser;
    let visualizerContext;
    let dataArray;
    let bufferLength;
    
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
        
        // Configure the analyzer
        analyser.fftSize = 256;
        bufferLength = analyser.frequencyBinCount;
        dataArray = new Uint8Array(bufferLength);
        
        // Set up the canvas
        visualizerContext = visualizer.getContext('2d');
        visualizer.width = window.innerWidth;
        visualizer.height = window.innerHeight;
        
        // Start the animation loop
        requestAnimationFrame(visualize);
        
        // Resize canvas if window size changes
        window.addEventListener('resize', () => {
            visualizer.width = window.innerWidth;
            visualizer.height = window.innerHeight;
        });
    }
    
    function visualize() {
        // Continue the loop
        requestAnimationFrame(visualize);
        
        // Get frequency data
        analyser.getByteFrequencyData(dataArray);
        
        // Calculate average frequency for low, mid, and high ranges
        const bassRange = Math.floor(bufferLength / 8);  // Low frequencies (bass)
        const midRange = Math.floor(bufferLength / 2);   // Mid frequencies
        
        let bassSum = 0;
        let midSum = 0;
        let highSum = 0;
        
        // Sum bass frequencies
        for (let i = 0; i < bassRange; i++) {
            bassSum += dataArray[i];
        }
        
        // Sum mid frequencies
        for (let i = bassRange; i < midRange; i++) {
            midSum += dataArray[i];
        }
        
        // Sum high frequencies
        for (let i = midRange; i < bufferLength; i++) {
            highSum += dataArray[i];
        }
        
        // Calculate averages
        const bassAvg = bassSum / bassRange;
        const midAvg = midSum / (midRange - bassRange);
        const highAvg = highSum / (bufferLength - midRange);
        
        // Clear canvas
        visualizerContext.clearRect(0, 0, visualizer.width, visualizer.height);
        
        // Draw visualizer - circle that reacts to the beat
        const centerX = visualizer.width / 2;
        const centerY = visualizer.height / 2;
        
        // Base circle size + bass impact
        const maxRadius = Math.min(visualizer.width, visualizer.height) / 2;
        const baseRadius = maxRadius * 0.2;
        const bassImpact = mapRange(bassAvg, 0, 255, 0, maxRadius * 0.3);
        
        // Draw bass circle
        visualizerContext.beginPath();
        visualizerContext.arc(centerX, centerY, baseRadius + bassImpact, 0, 2 * Math.PI);
        visualizerContext.fillStyle = `rgba(0, 162, 255, ${mapRange(bassAvg, 0, 255, 0.1, 0.3)})`;
        visualizerContext.fill();
        
        // Draw mid frequency ring
        visualizerContext.beginPath();
        visualizerContext.arc(centerX, centerY, baseRadius + bassImpact + mapRange(midAvg, 0, 255, 0, maxRadius * 0.2), 0, 2 * Math.PI);
        visualizerContext.strokeStyle = `rgba(255, 255, 255, ${mapRange(midAvg, 0, 255, 0.1, 0.5)})`;
        visualizerContext.lineWidth = mapRange(midAvg, 0, 255, 1, 10);
        visualizerContext.stroke();
        
        // Draw high frequency particles
        const particles = Math.floor(mapRange(highAvg, 0, 255, 3, 20));
        const particleRadius = mapRange(highAvg, 0, 255, 1, 5);
        
        for (let i = 0; i < particles; i++) {
            const angle = (Math.PI * 2) * (i / particles);
            const distance = baseRadius + bassImpact + mapRange(midAvg, 0, 255, maxRadius * 0.3, maxRadius * 0.7);
            
            const x = centerX + Math.cos(angle) * distance;
            const y = centerY + Math.sin(angle) * distance;
            
            visualizerContext.beginPath();
            visualizerContext.arc(x, y, particleRadius, 0, 2 * Math.PI);
            visualizerContext.fillStyle = `rgba(255, 255, 255, ${mapRange(highAvg, 0, 255, 0.3, 0.8)})`;
            visualizerContext.fill();
        }
        
        // Overlay effect for strong bass
        if (bassAvg > 150) {
            overlay.classList.add('react');
            setTimeout(() => {
                overlay.classList.remove('react');
            }, 100);
        }
    }
    
    // Utility function to map a value from one range to another
    function mapRange(value, inMin, inMax, outMin, outMax) {
        return (value - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
    }
});