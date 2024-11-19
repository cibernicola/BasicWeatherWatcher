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




function toggleMenu() {
    const menu = document.getElementById('menu');
    menu.classList.toggle('active');
}


function fetchRSSFeed(url, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    
    xhr.onload = function() {
        if (xhr.status === 200) {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xhr.responseText, 'text/xml');
            
            callback(xmlDoc);
        } else {
            console.error('Error al cargar el feed RSS:', xhr.status, xhr.statusText);
        }
    };
    
    xhr.onerror = function() {
        console.error('Error en la solicitud de AJAX');
    };
    
    xhr.send();
}

// URL del feed RSS
const rssFeedUrl = 'https://corsproxy.io/?https://www.aemet.es/documentos_d/eltiempo/prediccion/avisos/rss/CAP_AFAC69_RSS.xml';

// Abrir la ventana modal al hacer clic en el botón
document.getElementById('openModal').addEventListener('click', function() {
    const modal = document.getElementById('rss-feed-modal');
    modal.style.display = 'block';
    
    // Limpiar el contenido del feed RSS si ya estaba abierto
    const feedContainer = document.getElementById('rss-feed');
    feedContainer.innerHTML = '';
    
    // Cargar el feed RSS dentro de la ventana modal
    fetchRSSFeed(rssFeedUrl, function(xmlDoc) {
        const items = xmlDoc.getElementsByTagName('item');
        
        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            
            const titleElement = item.getElementsByTagName('title')[0];
            const linkElement = item.getElementsByTagName('link')[0];
            if (linkElement) {
                const url = 'https://corsproxy.io/?' + encodeURIComponent(linkElement.href);
                // Ahora puedes usar 'url' como lo necesitas
            } else {
                console.error('No se encontró ningún elemento <link> en el nodo especificado.');
            }
            
            const descriptionElement = item.getElementsByTagName('description')[0];
            
            const titleText = titleElement ? titleElement.textContent : 'Sin título';
            const linkText = linkElement ? linkElement.textContent : '';
            const descriptionText = descriptionElement ? descriptionElement.textContent : 'Sin descripción';
            
            const rssItemDiv = document.createElement('div');
            rssItemDiv.className = 'rss-item';
            
            const titleLink = document.createElement('a');
            titleLink.href = 'https://corsproxy.io/?'+linkText;
            titleLink.target = '_blank';
            titleLink.textContent = titleText;
            
            rssItemDiv.appendChild(titleLink);
            rssItemDiv.innerHTML += `<br><small>${descriptionText}</small>`;
            
            feedContainer.appendChild(rssItemDiv);
        }
    });
});



// Mostrar contenido del feed RSS al hacer hover sobre los enlaces
document.addEventListener('mouseover', function(event) {
    if (event.target.tagName === 'A') {
        fetchRSSFeed(event.target.href, function(xmlDoc) {
            const hoverModal = document.getElementById('hover-modal');
            const hoverContent = document.getElementById('hover-content');
            
            // Limpiar el contenido del hover modal si ya estaba abierto
            hoverContent.innerHTML = '';
            
            // Mostrar el hover modal
            hoverModal.style.display = 'block';
            
            const languageElement = xmlDoc.getElementsByTagName('language')[0];
            if (languageElement && languageElement.textContent === 'es-ES') {
                const categoryElement = xmlDoc.getElementsByTagName('category')[0];
                if (categoryElement && categoryElement.textContent === 'Met') {
                    const eventElement = xmlDoc.getElementsByTagName('event')[0];
                    if (eventElement) hoverContent.innerHTML += `<p><strong>Event:</strong> ${eventElement.textContent}</p>`;
                    
                    const responseTypeElement = xmlDoc.getElementsByTagName('responseType')[0];
                    if (responseTypeElement) hoverContent.innerHTML += `<p><strong>Response Type:</strong> ${responseTypeElement.textContent}</p>`;
                    
                    const urgencyElement = xmlDoc.getElementsByTagName('urgency')[0];
                    if (urgencyElement) hoverContent.innerHTML += `<p><strong>Urgency:</strong> ${urgencyElement.textContent}</p>`;
                    
                    const severityElement = xmlDoc.getElementsByTagName('severity')[0];
                    if (severityElement) hoverContent.innerHTML += `<p><strong>Severity:</strong> ${severityElement.textContent}</p>`;
                    
                    const certaintyElement = xmlDoc.getElementsByTagName('certainty')[0];
                    if (certaintyElement) hoverContent.innerHTML += `<p><strong>Certainty:</strong> ${certaintyElement.textContent}</p>`;
                    
                    const eventCodeElements = xmlDoc.getElementsByTagName('eventCode');
                    for (let i = 0; i < eventCodeElements.length; i++) {
                        const valueNameElement = eventCodeElements[i].getElementsByTagName('valueName')[0];
                        if (valueNameElement) hoverContent.innerHTML += `<p><strong>Event Code Value Name:</strong> ${valueNameElement.textContent}</p>`;
                        
                        const valueElement = eventCodeElements[i].getElementsByTagName('value')[0];
                        if (valueElement) hoverContent.innerHTML += `<p><strong>Event Code Value:</strong> ${valueElement.textContent}</p>`;
                    }
                    
                    const effectiveElement = xmlDoc.getElementsByTagName('effective')[0];
                    if (effectiveElement) hoverContent.innerHTML += `<p><strong>Effective:</strong> ${effectiveElement.textContent}</p>`;
                    
                    const onsetElement = xmlDoc.getElementsByTagName('onset')[0];
                    if (onsetElement) hoverContent.innerHTML += `<p><strong>Onset:</strong> ${onsetElement.textContent}</p>`;
                    
                    const expiresElement = xmlDoc.getElementsByTagName('expires')[0];
                    if (expiresElement) hoverContent.innerHTML += `<p><strong>Expires:</strong> ${expiresElement.textContent}</p>`;
                    
                    const senderNameElement = xmlDoc.getElementsByTagName('senderName')[0];
                    if (senderNameElement) hoverContent.innerHTML += `<p><strong>Sender Name:</strong> ${senderNameElement.textContent}</p>`;
                    
                    const headlineElement = xmlDoc.getElementsByTagName('headline')[0];
                    if (headlineElement) hoverContent.innerHTML += `<p><strong>Headline:</strong> ${headlineElement.textContent}</p>`;
                    
                    const descriptionElement = xmlDoc.getElementsByTagName('description')[0];
                    if (descriptionElement) hoverContent.innerHTML += `<p><strong>Description:</strong> ${descriptionElement.textContent}</p>`;
                    
                    const instructionElement = xmlDoc.getElementsByTagName('instruction')[0];
                    if (instructionElement) hoverContent.innerHTML += `<p><strong>Instruction:</strong> ${instructionElement.textContent}</p>`;
                    
                    const webElement = xmlDoc.getElementsByTagName('web')[0];
                    if (webElement) hoverContent.innerHTML += `<p><strong>Web:</strong> ${webElement.textContent}</p>`;
                }
            }
        });
    }
});

// Ocultar la ventana modal de hover al hacer clic en el botón de cerrar
document.querySelector('.hover-close').addEventListener('click', function() {
    console.log('Botón de cerrar clickeado');
    const hoverModal = document.getElementById('hover-modal');
    hoverModal.style.display = 'none';
})
// Cerrar la ventana modal al hacer clic en el botón de cerrar
document.querySelector('.close').addEventListener('click', function() {
    const modal = document.getElementById('rss-feed-modal');
    modal.style.display = 'none';
});