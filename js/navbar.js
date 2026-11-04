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

        } catch (error) {
            console.error("Navbar loading error:", error);
        }
    }
});

