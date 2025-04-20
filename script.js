const quote = document.getElementById("quote");
const clickSound = document.getElementById("click-sound");
const musicBtn = document.getElementById("music-btn");
const resetBtn = document.getElementById("reset");
const popContainer = document.getElementById("pop-icon");
const songInfo = document.getElementById("song-info");

let currentAudio = null;
let isMusicOn = true;

// Mood data
const moodTracks = {
    Happy: {
        quote: "Too blessed to be stressed! 😄",
        music: "audios/happy- MATARGASHTI .mp3",
        title: "Matargashti from Tamasha"
    },
    Sad: {
        quote: "Tears? Just my eyes vibing 😎",
        music: "audios/sad- Dandelions .mp3",
        title: "Dandelions- Ruth.B"
    },
    Anxious: {
        quote: "Overthinking in 4K resolution. 😬",
        music: "audios/anxious-Taylor Swift - Anti-Hero .mp3",
        title: "Anti-Hero – Taylor Swift"
    },
    Chill: {
        quote: "Just vibin’, no big deal. 🌿",
        music: "audios/anxious-Taylor Swift - Anti-Hero .mp3",
        title: "Sunny Sunny – Yo Yo Honey Singh"
    },
    Curious: {
        quote: "What happens if I press this button? 🧐",
        music: "audios/curios-Taylor Swift - Blank Space .mp3",
        title: "Blank Space – Taylor Swift"
    },
    Lazy: {
        quote: "Productivity? Never met her! 😴",
        music: "audios/lazy- LAZY SONG .mp3",
        title: "The Lazy Song – Bruno Mars"
    }
};

function playClickSound() {
    clickSound.currentTime = 0;
    clickSound.play().catch(() => {});
}

function showPopEffect() {
    const sparkle = document.createElement("img");
    sparkle.src = "images/popup-icon.png"; 
    sparkle.classList.add("sparkle");

    sparkle.style.position = "fixed";
    sparkle.style.left = `${Math.random() * 100}vw`;
    sparkle.style.top = `${Math.random() * 100}vh`;
    sparkle.style.width = "30px";
    sparkle.style.height = "30px";
    sparkle.style.pointerEvents = "none";
    sparkle.style.zIndex = "999";
    sparkle.style.opacity = "1";

    popContainer.appendChild(sparkle);

    setTimeout(() => sparkle.remove(), 1200);
}


function playMoodMusic(src) {
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
    }
    currentAudio = new Audio(src);
    currentAudio.loop = true;
    currentAudio.volume = 0.5;
    currentAudio.play().catch(() => {});
}

function handleMoodClick(mood) {
    const moodData = moodTracks[mood];
    if (!moodData) return;

    playClickSound();
    quote.textContent = moodData.quote;
    songInfo.textContent = `Now Playing: ${moodData.title}`;
    playMoodMusic(moodData.music);

    // Show sparkle icons one by one
    for (let i = 0; i < 50; i++) {
        setTimeout(showPopEffect, i * 50);
    }
}

// Mood button listeners
document.querySelectorAll(".mood-buttons button").forEach(btn => {
    btn.addEventListener("click", () => {
        const mood = btn.innerText.trim();
        handleMoodClick(mood);
    });
});

// Music toggle
musicBtn.addEventListener("click", () => {
    playClickSound();
    if (currentAudio) {
        if (isMusicOn) {
            currentAudio.pause();
        } else {
            currentAudio.play();
        }
        isMusicOn = !isMusicOn;
    }
});

// Reset
resetBtn.addEventListener("click", () => {
    playClickSound();
    quote.textContent = "";
    songInfo.textContent = "";
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
        currentAudio = null;
    }
});
//Dark-mode
const darkToggleBtn = document.getElementById("dark-mode-toggle");

darkToggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
});
