// Load the common Navbar
document.addEventListener("DOMContentLoaded", async () => {

    const navbarContainer = document.getElementById("navbar");

    if (navbarContainer) {
        try {
            const response = await fetch("../components/navbar.html");

            if (!response.ok) {
                throw new Error("Failed to load navbar: " + response.status);
            }

            navbarContainer.innerHTML = await response.text();

            //Mobile menu
            const menuToggle = document.getElementById("menu-toggle");
            const navLinks = document.getElementById("nav-links");

            if (menuToggle && navLinks) {
                menuToggle.addEventListener("click", () => {
                    const isOpen = navLinks.classList.toggle("show");

                    menuToggle.setAttribute("aria-expanded", isOpen);
                    menuToggle.setAttribute(
                        "aria-label",
                        isOpen ? "Close navigation menu" : "Open navigation menu"
                    );

                    menuToggle.innerHTML = isOpen
                        ? '<i class="fa-solid fa-xmark"></i>'
                        : '<i class="fa-solid fa-bars"></i>';
                });
            }

             // Notification dropdown
            const notificationButton = document.getElementById("notificationButton");
            const notificationBox = document.getElementById("notificationBox");

            if (notificationButton && notificationBox) {

                notificationButton.addEventListener("click", () => {

                    const isOpen = notificationBox.classList.toggle("show");

                    notificationButton.setAttribute("aria-expanded", isOpen);

                });

                // Close notification box when clicking outside
                document.addEventListener("click", (event) => {

                    if (!notificationButton.contains(event.target) &&
                        !notificationBox.contains(event.target)) {

                        notificationBox.classList.remove("show");
                        notificationButton.setAttribute("aria-expanded", "false");

                    }

                });

            }

        } catch (error) {
            console.error("Navbar loading error:", error);
        }
    }
});

