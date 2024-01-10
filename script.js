"use strict";
// mes consts ici j'ai selectioné les elements de mon html et je l'ai sauvegadé dans des variable const:
const globascoreOne = document.getElementById("score_0");
const globalscoreDeux = document.getElementById("score_1");
const currentscoreone = document.getElementById("currentscore_0");
const currentscoredeux = document.getElementById("currentscore_1");
const playingone = document.getElementById("playing_0");
const playingtwo = document.getElementById("playing_1");
const diceElement = document.querySelector(".dicepin");
const roller = document.querySelector(".roller")
const hold = document.querySelector(".hold");
const sectionOne = document.querySelector(".section-0");
const sectionTwo = document.querySelector(".section-1");

const victoryone = document.getElementById("victory_0");
const victorytwo = document.getElementById("victory_1");

const restart = document.querySelector(".restart");


//initialisation des variables:
let score, activePlayer, currentScore, finish;

const variables = () => {
    currentscoreone.textContent = 0;
    currentscoredeux.textContent = 0;
    diceElement.classList.add("hidden");

    score = [0, 0];
    activePlayer = 0;
    currentScore = 0;
    finish = true;

    globascoreOne.textContent = 0;
    globalscoreDeux.textContent = 0;

    sectionOne.classList.remove("winner");
    sectionTwo.classList.remove("winner");
    sectionOne.classList.add("active");
    sectionTwo.classList.remove("active");

    playingone.classList.remove("hidden");
    playingtwo.classList.add("hidden");
    victoryone.classList.add("hidden");
    victorytwo.classList.add("hidden");

}

variables();

//cette fonction permet de changer de joueur
const changerJoueur = () => {
    document.getElementById(`currentscore_${activePlayer}`).textContent = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    currentScore = 0;
    sectionOne.classList.toggle("active");
    sectionTwo.classList.toggle("active");
    playingone.classList.toggle("hidden");
    playingtwo.classList.toggle("hidden");

}

//cette fonction permet de lancer le dé a plusieurs si on obtient pas 1:
roller.addEventListener("click", (e) => {
    if (finish) {
        diceElement.classList.remove("hidden");
        const dice = Math.floor(Math.random() * 6) + 1;
        diceElement.src = `/assets/image-${dice}.png`;

        if (dice !== 1) {

            //implementer le score si le chiffre est different de un on continu la partie en incrementant le score current
            currentScore += dice;
            document.getElementById(`currentscore_${activePlayer}`).textContent = currentScore;


        } else {

            //changer de joueur si le chiffre obtenu est egale a 1:
            changerJoueur();

        }
    }
});

//le bouton hold: en clickant sur hold on enregistre notre score final temporaire et on passe la main a son adversaire:
hold.addEventListener("click", (e) => {

    if (finish) {
        score[activePlayer] += currentScore;
        document.getElementById(`score_${activePlayer}`).textContent = score[activePlayer];

        if (score[activePlayer] >= 100) {
            finish = false;
            document.querySelector(`.section-${activePlayer}`).classList.add("winner");
            document.querySelector(`.section-${activePlayer}`).classList.remove("active");
            document.getElementById(`playing_${activePlayer}`).classList.add("hidden");
            document.getElementById(`victory_${activePlayer}`).classList.remove("hidden");
            diceElement.classList.add("hidden");
        } else {
            //ceder la main a son adversaire 
            changerJoueur();
        }
    }
});

//le boutton restart permet de recommencer le game:
restart.addEventListener("click", variables);