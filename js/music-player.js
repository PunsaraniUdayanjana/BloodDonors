
document.addEventListener("DOMContentLoaded", async () => {

    const playerContainer = document.getElementById("music-player");

    if (!playerContainer) return;

    try {
        const response = await fetch("../components/music-player.html");

        if (!response.ok) {
            throw new Error("Music player could not be loaded");
        }

        playerContainer.innerHTML = await response.text();

    } catch (error) {
        console.error("Music Player Error:", error);
        return;
    }

    const music = document.getElementById("background-music");
    const toggleButton = document.getElementById("music-toggle");

    if (!music || !toggleButton) return;

    music.volume = 0.2;

    let musicEnabled = localStorage.getItem("musicPreference") !== "off";

    function updateIcon() {
        const isPlaying = !music.paused;

        toggleButton.innerHTML = isPlaying
            ? '<i class="fa-solid fa-volume-high"></i>'
            : '<i class="fa-solid fa-volume-xmark"></i>';

        toggleButton.setAttribute(
            "aria-label",
            isPlaying ? "Turn music off" : "Turn music on"
        );
    }

    async function playMusic() {
        if (!musicEnabled) return;

        try {
            await music.play();
        } catch (error) {
            console.log("Browser blocked automatic music playback.");
        }

        updateIcon();
    }

    function pauseMusic() {
        music.pause();
        updateIcon();
    }

    updateIcon();

    if (musicEnabled) {
        playMusic();
    }

    // Update icon when audio starts or pauses
    music.addEventListener("play", updateIcon);
    music.addEventListener("pause", updateIcon);

    // Handle browser Back / Forward button
    window.addEventListener("pageshow", () => {
       if (musicEnabled) {
        window.addEventListener("load", () => {
        playMusic();
    });
}
    });

    toggleButton.addEventListener("click", async () => {

        musicEnabled = !musicEnabled;

        localStorage.setItem(
            "musicPreference",
            musicEnabled ? "on" : "off"
        );

        if (musicEnabled) {
            await playMusic();
        } else {
            pauseMusic();
        }

        updateIcon();
    });

});
