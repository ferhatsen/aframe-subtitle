# A-FRAME SUBTITLE

A component for adding subtitles to a-frame VR 360 videos entities.

  * TODO: Screenshot

## DEPENDENCIES

  * aframe: https://aframe.io/
  * aframe-text-component: https://github.com/ngokevin/aframe-text-component
  * popcorn.js: https://github.com/mozilla/popcorn-js

## Usage

```html

<head>
  <title>My A-Frame Scene</title>
  <script src="https://aframe.io/releases/0.2.0/aframe.min.js"></script>
  <script src="https://rawgit.com/ngokevin/aframe-text-component/master/dist/aframe-text-component.min.js"></script>
  <script src="https://rawgit.com/robertogerson/aframe-subtitle/master/dist/aframe-subtitle.min.js"></script>
</head>

<body>
  <a-scene>
    <a-assets>
      <video id="video" src="Reel_Obuie_360_VR.mp4"
             autoplay loop></video>
    </a-assets>

    <a-videosphere src="#video" rotation="0 180 0"></a-videosphere>
    <a-entity subtitle="timeline: #video; srt: data.srt"
              material="color: white;"/>
  </a-scene>
/body>
```

## AUTHORS

  * Roberto Gerson Azevedo (robertogerson@telemidia.puc-rio.br)

## License
  * TODO
