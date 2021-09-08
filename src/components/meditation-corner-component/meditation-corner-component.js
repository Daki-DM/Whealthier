let audioPlayingIndex = 0;
let audioSource = [
  new Audio('https://cdn.pixabay.com/download/audio/2021/04/03/audio_fa6288c939.mp3?filename=warm-ocean-waves-chill-out-music-3683.mp3'),
  new Audio('https://cdn.pixabay.com/download/audio/2021/08/08/audio_88447e769f.mp3?filename=melody-of-nature-main-6672.mp3'),
  new Audio('https://cdn.pixabay.com/download/audio/2021/08/27/audio_6013a54b35.mp3?filename=cinematic-ambient-feeling-ambient-piano-music-for-videos-7767.mp3')
];

let mediationCornerStyle = `
.meditation-corner {
  height: 100vh;
  background-color: rgba(81, 88, 185, 1.0);
}

.circle {
  width: 200px;
  height: 200px;
  background-color: rgba(212, 212, 212, 0.35);
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid rgba( 255, 255, 255, 0.18 );
  box-shadow: 0 8 px 32 px 0 rgba(31, 38, 135, 0.37);
  display: grid;
  place-items: center;
  color: #F2F2F2;
}

.circle:hover {
  animation-name: breathing-circle;
  animation-duration: 11s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}

.circle p {
  display: none;
  user-select: none;
}

.circle:hover p {
  display: block;
}

p {
  position: absolute;
  font-size: 2rem;
  font-family: 'Rubik', sans-serif;
  font-weight: 700;
  letter-spacing: 0.2ch;
}

@keyframes breathing-circle {
  0% {
    transform: translate(-50%, -50%) scale(1);
  }
  40%, 50%, 60% {
    transform: translate(-50%, -50%) scale(1.5);
  }
  90%, 100% {
    transform: translate(-50%, -50%) scale(1)
  }
}

.circle:hover .inhale {
  animation-name: inhale;
  animation-duration: 11s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}

.circle:hover .exhale {
  animation-name: exhale;
  animation-duration: 11s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}

@keyframes inhale {
  0% {
    opacity: 0;
  }
  5% {
    opacity: 1;
  }
  40%, 50%, 60% {
    opacity: 0;
  }
  90%, 100% {
    opacity: 0;
  }
}

@keyframes exhale {
  0% {
    opacity: 0;
  }
  40%, 50%, 60% {
    opacity: 0;
  }
  90% {
    opacity: 1;
  }
  95%, 100% {
    opacity: 0;
  }
}
`;

class MeditationCornerComponent extends HTMLElement {
  constructor() {
    super();
    let shadow = this.attachShadow({ mode: 'open' });
    
    let content = document.createElement('div');
    content.classList.add('meditation-corner');
    
    let inhaleExhaleCircle = document.createElement('div');
    inhaleExhaleCircle.classList.add('circle');
    
    inhaleExhaleCircle.addEventListener('mouseover', this.startOrResumeAudio);
    inhaleExhaleCircle.addEventListener('mouseout', this.pauseAudio);
    
    let inhaleText = document.createElement('p');
    inhaleText.innerHTML = 'Inhale';
    inhaleText.classList.add('inhale');
    let exhaleText = document.createElement('p');
    exhaleText.innerHTML = 'Exhale';
    exhaleText.classList.add('exhale');
    
    inhaleExhaleCircle.append(inhaleText, exhaleText);
    
    audioSource.forEach(source => {
      source.addEventListener('ended', this.playNextMusic);
    });
    
    content.appendChild(inhaleExhaleCircle);
    
    let style = document.createElement('style');
    style.innerHTML = mediationCornerStyle;
    content.appendChild(style);
    
    shadow.appendChild(content);
  }
  startOrResumeAudio() {
    audioSource[audioPlayingIndex].play();
  }
  pauseAudio() {
    audioSource[audioPlayingIndex].pause();
  }
  playNextMusic() {
    audioPlayingIndex += 1;
    if(audioPlayingIndex === audioSource.length) {
      audioPlayingIndex = 0;
    }
    audioSource[audioPlayingIndex].play();
  }
};

customElements.define('meditation-corner-component', MeditationCornerComponent);

export {
  MeditationCornerComponent
};