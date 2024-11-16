document.addEventListener('DOMContentLoaded', () => {
    // URLs de los videos
    const videoSources = {
        'video1': 'https://5940924978228.streamlock.net:443/8107/8107/playlist.m3u8',
        'video2': 'https://5940924978228.streamlock.net:443/8101/8101/playlist.m3u8',
        'video3': 'https://5940924978228.streamlock.net:443/8105/8105/playlist.m3u8'
    };

    const videos = ['video1', 'video2', 'video3'];
    const playAllVideosButton = document.getElementById('playAllVideos');
    const fullscreenButton = document.getElementById('fullscreenButton');

    // Initialize Video.js and hls.js
    if (Hls.isSupported()) {
        videos.forEach(videoId => {
            const videoElement = document.getElementById(videoId);
            const source = document.createElement('source');
            source.src = videoSources[videoId];
            source.type = 'application/x-mpegURL';
            videoElement.appendChild(source);

            const hlsInstance = new Hls();
            hlsInstance.loadSource(videoSources[videoId]);
            hlsInstance.attachMedia(videoElement);
            hlsInstance.on(Hls.Events.MANIFEST_PARSED, function() {
                videoElement.play().catch(error => {
                    console.error('Error al reproducir el video:', error);
                });
            });
        });
    }

    // Function to toggle full screen
    const toggleFullScreen = () => {
        if (document.fullscreenElement) {
            document.exitFullscreen().catch(error => {
                console.error('Error al intentar salir del modo de full screen:', error);
            });
            fullscreenButton.textContent = 'Full Screen';
            
        } else {
            document.body.requestFullscreen().catch(error => {
                console.error('Error al intentar entrar en modo de full screen:', error);
            });
            
            fullscreenButton.textContent = 'Exit';
            
        }
    };

    // Function to update button text based on video states
    const updateButtonText = () => {
        let allPaused = true;
        videos.forEach(videoId => {
            if (!document.getElementById(videoId).paused) {
                allPaused = false;
            }
        });
        playAllVideosButton.textContent = allPaused ? 'Play' : 'Stop';
    };

    // Add event listeners to each video
    videos.forEach(videoId => {
        const videoElement = document.getElementById(videoId);
        videoElement.addEventListener('play', updateButtonText);
        videoElement.addEventListener('pause', updateButtonText);
    });

    // Initial button text update
    updateButtonText();

    // Event listener for the playAllVideos button
    playAllVideosButton.addEventListener('click', () => {
        videos.forEach(videoId => {
            const videoElement = document.getElementById(videoId);
            if (videoElement.paused) {
                videoElement.play().catch(error => {
                    console.error('Error al reproducir el video:', error);
                });
            } else {
                videoElement.pause();
            }
        });
    });

    // Event listener for the fullscreenButton
    fullscreenButton.addEventListener('click', toggleFullScreen);
});


const menuButton = document.getElementById('menu_button');
const actionMenu = document.getElementById('action_menu');

menuButton.addEventListener('click', () => {
    actionMenu.classList.toggle('hidden');
});