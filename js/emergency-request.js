
document.addEventListener("DOMContentLoaded", async function () {

    const popupContainer = document.getElementById(
        "emergency-popup-container"
    );

    if (!popupContainer) {
        console.error("Emergency popup container not found!");
        return;
    }

    // Load popup HTML
    try {

        const response = await fetch("../components/emergency-request.html");

        if (!response.ok) {
            throw new Error("Failed to load popup HTML");
        }

        const html = await response.text();

        popupContainer.innerHTML = html;

        console.log("Emergency popup loaded successfully!");

    } catch (error) {

        console.error("Popup loading error:", error);
        return;

    }

    const overlay = document.getElementById("emergencyOverlay");
    const closeButton = document.getElementById("closeEmergency");
    const emergencyForm = document.getElementById("emergencyForm");

    // Open popup
    document.addEventListener("click", function (event) {

        const openButton = event.target.closest("[data-open-emergency]");

        if (openButton) {

            event.preventDefault();

            overlay.classList.add("active");
            document.body.classList.add("modal-open");

            console.log("Emergency popup opened!");

        }

    });

    // Close popup
    function closePopup() {

        overlay.classList.remove("active");
        document.body.classList.remove("modal-open");

    }

    closeButton.addEventListener("click", closePopup);

    // Click outside to close
    overlay.addEventListener("click", function (event) {

        if (event.target === overlay) {
            closePopup();
        }

    });

    // Escape key to close
    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape" && overlay.classList.contains("active")) {
            closePopup();
        }

    });

    // Form submission
    emergencyForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const age = Number(
            document.getElementById("requesterAge").value
        );

        if (age < 1 || age > 120) {
            alert("Please enter a valid age.");
            return;
        }

        alert("Emergency Request submitted successfully!");

        emergencyForm.reset();
        closePopup();

    });

});
