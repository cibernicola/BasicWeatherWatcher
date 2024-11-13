## Basic Weather Watcher
![demo_1](https://github.com/user-attachments/assets/f1b2a1b8-ea43-43f9-8543-5961ac4bae95)

## Descripción

Basic Weather Watcher es un dashboard básico a que muestra en tres streams de cámaras web y un embeed con pronóstico del tiempo. Esta herramienta utiliza tecnologías como Video.js, HLS.js y HTML5 para proporcionar una experiencia de visualización fluida.

## Características
  Extremadamente simple y funcional.
  
1. **Mapa Interactivo**: 
   - Integra un mapa interactivo que muestra las ubicaciones de las cámaras web.
   - La ubicación inicial se centra en Salou (38.031° N, 1.143° O).

2. **Cámaras Web en VIVO**:
   - Se han integrado tres camaras web diferentes para mostrar diferentes vistas de la ciudad de Salou.
   - Auto play on
     
3. **Pronóstico del Tiempo**:
   - Se utiliza Windy (https://embed.windy.com/) para mostrar el pronóstico meteorológico en vivo.
   - Las métricas de temperatura, lluvia y viento se muestran en una escala internacional.

## Requisitos

- **Navegador Web**: 
  - Recomendamos usar un navegador web moderno con soporte para HTML5, CSS3 y JavaScript.

## Configuración y Uso

1. **Copia el Repositorio**:
   - Clona o descarga este repositorio en tu máquina local.
   ```bash
   git clone https://github.com/tu-usuario/SalouCams.git
   ```

2. **Ejecuta la Aplicación**:
   - Abre el archivo `basic_weatrcher_watcher.html` en tu navegador web.

3. **Personalización**:
   Abre el archivo html con un editor de texto:
   
   - Personaliza las URLs de las cámaras web modificando la variable `videoSources`.
   ```javascript
   const videoSources = {
       'video1': 'URL_DEL_VIDEO_1',
       'video2': 'URL_DEL_VIDEO_2',
       'video3': 'URL_DEL_VIDEO_3'
   };
   ```
  - Personaliza el mapa en la accediendo a https://embed.windy.com/config/map y añade el contenido de src = del coódigo proporcionado:
   ```
          <iframe width="650" height="450" src="URL_LARGA" frameborder="0"></iframe>
   ```
en el src del iframe dentro del html:
   ```
    <div class="map-container">
        <iframe 
            src="URL_LARGA" 
            frameborder="0"
        </iframe>
    </div>
   ```
## Tecnologías Utilizadas

- **Video.js**: Un framework de JavaScript para el manejo de videos HTML5.
- **HLS.js**: Una biblioteca JavaScript que implementa la especificación HLS (HTTP Live Streaming).
- **Wind Embed Map**: Para integrar un mapa interactivo con pronóstico meteorológico en vivo.


