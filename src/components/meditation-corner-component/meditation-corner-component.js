let audioPlayingIndex = 0;
let audioSource = [
  {
    link: 'https://cdn.pixabay.com/download/audio/2021/04/03/audio_fa6288c939.mp3?filename=warm-ocean-waves-chill-out-music-3683.mp3',
    obj: null
  },
  {
    link: 'https://cdn.pixabay.com/download/audio/2021/08/27/audio_6013a54b35.mp3?filename=cinematic-ambient-feeling-ambient-piano-music-for-videos-7767.mp3',
    obj: null
  },
  {
    link: 'https://cdn.pixabay.com/download/audio/2021/08/18/audio_9f4da11782.mp3?filename=scandinavianz-nature-7504.mp3',
    obj: null
  }
];

let moodsAndBg = [
  {
    theme: 'ocean',
    bg: 'https://ik.imagekit.io/pzrj7oa3hsd/timathon-health/original_PbKdW1IY3.gif?updatedAt=1631091715527',
    icon: 'https://cdn-icons-png.flaticon.com/512/616/616877.png'
  },
  {
    theme: 'mountain',
    bg: 'https://ik.imagekit.io/pzrj7oa3hsd/timathon-health/QZhN_M0_GeKiikI.gif?updatedAt=1631091702362',
    icon: 'https://cdn-icons-png.flaticon.com/512/105/105527.png'
  },
  {
    theme: 'nature',
    bg: 'https://ik.imagekit.io/pzrj7oa3hsd/timathon-health/eaae197127169573df345cef728ddaf3_YX7MO4bSic.gif?updatedAt=1631091725283',
    icon: 'https://cdn-icons-png.flaticon.com/512/905/905036.png'
  }
];

let mediationCornerStyle = `
.meditation-corner {
  height: 100vh;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
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
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  display: grid;
  place-items: center;
  color: #F2F2F2;
}

.circle.breathing {
  animation-name: breathing-circle;
  animation-duration: 11s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}

.circle p {
  display: none;
  user-select: none;
  pointer-events: none;
}

.circle.breathing p {
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

.circle.breathing .inhale {
  animation-name: inhale;
  animation-duration: 11s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}

.circle.breathing .exhale {
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

.popup-button {
  position: fixed;
  bottom: 1rem;
  left: 50%;
  transform: translate(-50%, 0%);
  outline: none;
  border: none;
  border-radius: 50%;
  width: 3rem;
  height: 3rem;
  z-index: 20;
}

.mood-button-container {
  position: absolute;
  top: -4.5rem;
  display: flex;
  flex-direction: row;
  left: 50%;
  transform: translate(-50%, 0) scale(0) translateY(-4.5rem);
  background-color: #F2F2F2;
  box-shadow: rgba(81, 88, 185, 1.0);
  border-radius: 30px;
  justify-content: space-around;
  transition: all 0.3s ease;
}

.mood-button-container:after {
  content: " ";
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -15px;
  border-width: 15px;
  border-style: solid;
  border-radius: 2px;
  border-color: #F2F2F2 transparent transparent transparent;
}

.mood-button {
  width: 2.5rem;
  height: 2.5rem;
  margin: 5px 5px;
  border-radius: 50%;
  padding: 5px;
  background-color: #F2F2F2;
  box-shadow: 0 0 5px 0 rgba(81, 88, 185, 1.0);
  transition: all 0.3s ease;
}

.mood-button-container.active {
  transform: translate(-50%, 0) scale(1) translateY(0);
}
`;

class MeditationCornerComponent extends HTMLElement {
  content = null;
  constructor() {
    super();
    let shadow = this.attachShadow({ mode: 'open' });
    
    this.content = document.createElement('div');
    this.content.classList.add('meditation-corner');
    this.setBG(moodsAndBg[0].bg);
    
    let context = this;

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
    
    audioSource.forEach(v => {
      let source = new Audio(v.link);
      v.obj = source;
      source.addEventListener('ended', this.playNextMusic.bind(context));
    });
    
    let popupButton = document.createElement('button');
    popupButton.classList.add('popup-button');
    popupButton.innerText = '\u2771';
    
    let moodImgBtnContainer = document.createElement('div');
    moodImgBtnContainer.classList.add('mood-button-container');
    moodsAndBg.forEach((moodAndBg, i) => {
      let moodImgBtn = document.createElement('img');
      moodImgBtn.classList.add('mood-button');
      moodImgBtn.setAttribute('bgUrl', moodAndBg.bg);
      moodImgBtn.setAttribute('index', i);
      moodImgBtn.src = moodAndBg.icon;
      moodImgBtn.addEventListener('click', (ev) => {
        ev.preventDefault();
        this.setBG(ev.target.getAttribute('bgUrl'));
        audioPlayingIndex = ev.target.getAttribute('index');
      });
      moodImgBtnContainer.appendChild(moodImgBtn);
    });
    
    popupButton.addEventListener('mouseover', (ev) => {
      ev.preventDefault();
      moodImgBtnContainer.classList.add('active');
    });
    
    popupButton.addEventListener('mouseout', (ev) => {
      ev.preventDefault();
      moodImgBtnContainer.classList.remove('active');
    });
    
    this.content.appendChild(inhaleExhaleCircle);
    popupButton.appendChild(moodImgBtnContainer);
    this.content.appendChild(popupButton);
    
    let style = document.createElement('style');
    style.innerHTML = mediationCornerStyle;
    this.content.appendChild(style);
    
    shadow.appendChild(this.content);
  }
  setBG(bgUrl) {
    this.content.style.backgroundImage = "linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(" + bgUrl + ")";
  }
  startOrResumeAudio(ev) {
    if(audioSource[audioPlayingIndex].obj.paused) {
      ev.target.classList.add('breathing');
      audioSource[audioPlayingIndex].obj.play();
    }
  }
  pauseAudio(ev) {
    if(!audioSource[audioPlayingIndex].obj.paused) {
      ev.target.classList.remove('breathing');
      audioSource[audioPlayingIndex].obj.pause();
    }
  }
  playNextMusic() {
    audioPlayingIndex += 1;
    if(audioPlayingIndex === audioSource.length) {
      audioPlayingIndex = 0;
    }
    this.setBG(moodsAndBg[audioPlayingIndex].bg);
    audioSource[audioPlayingIndex].obj.play();
  }
  disconnectedCallback() {
    audioSource[audioPlayingIndex].obj.pause();
    audioSource[audioPlayingIndex].obj.currentTime = 0; 
  }
};

customElements.define('meditation-corner-component', MeditationCornerComponent);

export {
  MeditationCornerComponent
};