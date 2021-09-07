/*The css, nothing special to comment.*/
let meditationCornerComponentStyle = `
body {
    background-color: rgba(187, 187, 187, 0.521);
    background: no-repeat center center fixed;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
    background-image: url("images/background.jpg");
}

button {
    border: none;
    border-radius: 50%;
    height: 70px;
    width: 70px;
}

.mood_rainy {
    position: fixed;
    left: 20%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: rgba(255, 255, 255, 0.322);
    background-image: url("logos/rain.png");
    background-size: cover;
}

.mood_fresh {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: rgba(255, 255, 255, 0.322);
    background-image: url("logos/fresh.png");
    background-size: cover;
}

.mood_mountains {
    position: fixed;
    left: 80%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: rgba(255, 255, 255, 0.322);
    background-image: url("logos/mountains.png");
    background-size: cover;
}

.mood_mountains:hover {
    transition-duration: 0.28s;
    box-shadow: 0 1.2em 0.9em -0.38em rgb(255, 232, 131);
    top: 48%;
}

.mood_fresh:hover {
    transition-duration: 0.28s;
    box-shadow: 0 1.2em 0.9em -0.38em rgb(146, 255, 131);
    top: 48%;
}

.mood_rainy:hover {
    transition-duration: 0.28s;
    box-shadow: 0 1.2em 0.9em -0.38em rgb(131, 236, 255);
    top: 48%;
}

#detector {
    width: 1520px;
    height: 60px;
    display: none;
}

#arrow {
    position: fixed;
    top: 10%;
    left: 50%;
    transform: translate(-50%, -50%);
}

#circle {
    display: none;
    background-color: rgba(255, 255, 255, 0.85);
    width: 33vh;
    height: 33vh;
    border-radius: 50%;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -17.5vh;
    margin-left: -17.5vh;
}

#circle {
    animation-name: breathing-circle;
    animation-duration: 11s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
}

@keyframes breathing-circle {
    0% {
        transform: scale(1);
    }
    41% {
        transform: scale(1.4);
    }
    49% {
        transform: scale(1.4);
    }
    90% {
        transform: scale(1);
    }
    100% {
        transform: scale(1);
    }
}

.popup {
    font-size: 10vh;
    color: rgba(0, 0, 0, 0);
    font-family: 'Raleway', sans-serif;
    position: absolute;
    top: 33%;
    left: 11%;
}

@keyframes inh-direction {
    0% {
        color: rgba(253, 193, 140, 0);
    }
    10% {
        color: rgba(253, 193, 140, 1);
    }
    40% {
        color: rgba(253, 193, 140, 1);
    }
    50% {
        color: rgba(253, 193, 140, 0);
    }
}

@keyframes exh-direction {
    0% {
        color: rgba(253, 193, 140, 0);
    }
    50% {
        color: rgba(253, 193, 140, 0);
    }
    60% {
        color: rgba(253, 193, 140, 1);
    }
    90% {
        color: rgba(253, 193, 140, 1);
    }
    100% {
        color: rgba(253, 193, 140, 0);
    }
}

@keyframes link-jump {
    0% {
        color: rgba(0, 0, 0, 0.70);
    }
    100% {
        color: black;
    }
}

#the-explanation {
    display: none;
    font-size: 0;
    color: rgba(0, 0, 0, 0.70);
    font-size: 2.55vh;
    font-family: 'Raleway', sans-serif;
    padding: 10px;
    text-align: justify;
}

#me {
    font-family: 'Raleway', sans-serif;
    font-size: 2.5vh;
    color: rgba(0, 0, 0, 0.70);
    position: absolute;
    bottom: 35px;
    left: 50%;
    margin-right: -50%;
    transform: translate(-50%, -50%);
}

#close-explanation {
    cursor: pointer;
}

#arrow {
    display: none;
    font-size: 18px;
}
`;
class MeditationCornerComponent extends HTMLElement {
    content = null;
    constructor() {
        super()
        let shadow = this.attachShadow({ mode: 'open' });
        this.content = document.createElement('div');
        /*The html*/
        /*First the detector, then the buttons, then the inhale exhale button and then the audio*/
        this.content.innerHTML = `<div id="detector" onmouseover="detect()">
    <div id="arrow">DRAG UP HERE TO SEE BUTTONS AGAIN</div>
</div>
<button class="mood_rainy butto" id="mood_rainy" onclick="mood_rainy()"></button>
<button class="mood_fresh butto" id="mood_fresh" onclick="mood_fresh()"></button>
<button class="mood_mountains butto" id="mood_mountains" onclick="mood_mountains()"></button>

<div id="circle"></div>

<audio src="music/rainy.mp3" id="audio_rainy" loop>
</audio>
<audio src="music/fresh.mp3" id="audio_fresh" loop>
</audio>
<audio src="music/mountain.mp3" id="audio_mountains" loop>
</audio>`;
        let style = document.createElement('style');
        style.innerHTML = meditationCornerComponentStyle;
        this.content.appendChild(style);
        shadow.appendChild(this.content);
    }
    connectedCallbawck() {
        /*What happens when you press the blue prange (sets background, makes buttons dissaper, starts the detector and starts the music)*/
        function mood_rainy() {
            this.content.getElementById("mood_rainy").style.transitionDuration = "1s";
            this.content.getElementById("mood_rainy").style.top = "-100px";
            this.content.getElementById("mood_fresh").style.transitionDuration = "1s";
            this.content.getElementById("mood_fresh").style.top = "-100px";
            this.content.getElementById("mood_mountains").style.transitionDuration = "1s";
            this.content.getElementById("mood_mountains").style.top = "-100px";
            this.content.getElementById("detector").style.display = 'block';

            this.content.body.style.backgroundImage = 'url(images/reainy.jpg)';

            this.content.getElementById("detector").style.display = 'block';

            this.content.getElementById("circle").style.display = 'block';

            this.content.getElementById("arrow").style.display = 'block';
            setTimeout(function() {
                this.content.getElementById("arrow").style.display = 'none';
            }, 3000);

            this.content.getElementById("audio_rainy").play();

        }
        /*What happens when you press the blue prange (sets background, makes buttons dissaper, starts the detector and starts the music)*/
        function mood_fresh() {
            this.getElementById("mood_rainy").style.transitionDuration = "1s";
            this.getElementById("mood_rainy").style.top = "-100px";
            this.getElementById("mood_fresh").style.transitionDuration = "1s";
            this.getElementById("mood_fresh").style.top = "-100px";
            this.getElementById("mood_mountains").style.transitionDuration = "1s";
            this.getElementById("mood_mountains").style.top = "-100px";

            this.body.style.backgroundImage = 'url(images/fresh.jpg)';


            this.getElementById("detector").style.display = 'block';

            this.getElementById("circle").style.display = 'block';

            this.getElementById("arrow").style.display = 'block';
            setTimeout(function() {
                this.getElementById("arrow").style.display = 'none';
            }, 3000);

            this.getElementById("audio_fresh").play();

        }
        /*What happens when you press the blue prange (sets background, makes buttons dissaper, starts the detector and starts the music)*/
        function mood_mountains() {
            this.getElementById("mood_rainy").style.transitionDuration = "1s";
            this.getElementById("mood_rainy").style.top = "-100px";
            this.getElementById("mood_fresh").style.transitionDuration = "1s";
            this.getElementById("mood_fresh").style.top = "-100px";
            this.getElementById("mood_mountains").style.transitionDuration = "1s";
            this.getElementById("mood_mountains").style.top = "-100px";

            this.body.style.backgroundImage = 'url(images/mountains.jpg)';


            this.getElementById("detector").style.display = 'block';

            this.getElementById("circle").style.display = 'block';

            this.getElementById("arrow").style.display = 'block';
            setTimeout(function() {
                this.getElementById("arrow").style.display = 'none';
            }, 2000);

            this.getElementById("audio_mountains").play();
        }

        /*The code that is executed when you hover over the top of the screen*/
        function detect() {

            /*Remove sthe buttons from sight*/
            this.getElementById("mood_rainy").style.transitionDuration = "1s";
            this.getElementById("mood_rainy").style.top = "50%";
            this.getElementById("mood_fresh").style.transitionDuration = "1s";
            this.getElementById("mood_fresh").style.top = "50%";
            this.getElementById("mood_mountains").style.transitionDuration = "1s";
            this.getElementById("mood_mountains").style.top = "50%";

            /*Removes himself*/
            this.getElementById("circle").style.display = 'none';
            this.getElementById("arrow").style.display = 'none';

            /*Pauses all audio*/
            this.getElementById("audio_mountains").pause();
            this.getElementById("audio_fresh").pause();
            this.getElementById("audio_rainy").pause();
        }
    }
}

customElements.define("meditation-corner-component", MeditationCornerComponent);
export {
    MeditationCornerComponent
}; 