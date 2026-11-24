
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

            // Mobile Hamburger Menu
            const menuToggle = document.getElementById("menu-toggle");
            const navLinks = document.getElementById("nav-links");

            if (menuToggle && navLinks) {
                menuToggle.addEventListener("click", () => {
                    const isOpen = navLinks.classList.toggle("show");

                    menuToggle.setAttribute("aria-expanded", isOpen);
                    menuToggle.innerHTML = isOpen
                        ? '<i class="fa-solid fa-xmark"></i>'
                        : '<i class="fa-solid fa-bars"></i>';
                });
            }

            // Donor Dropdown
            const donorDropdown = document.querySelector(".dropdown");
            const dropdownToggle = document.querySelector(".dropdown-toggle");

            if (donorDropdown && dropdownToggle) {
                dropdownToggle.addEventListener("click", (event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    donorDropdown.classList.toggle("open");
                });
            }

            // Profile Dropdown
            const profileDropdown = document.querySelector(".profile-dropdown");
            const profileToggle = document.getElementById("profileToggle");

            if (profileDropdown && profileToggle) {

                profileToggle.addEventListener("click", (event) => {
                    event.preventDefault();
                    event.stopPropagation();

                    const isOpen = profileDropdown.classList.toggle("open");

                    profileToggle.setAttribute("aria-expanded", isOpen);
                });

            } else {
                console.error("Profile dropdown elements not found!");
            }

            // Close dropdowns when clicking outside
            document.addEventListener("click", (event) => {

                if (donorDropdown && !donorDropdown.contains(event.target)) {
                    donorDropdown.classList.remove("open");
                }

                if (profileDropdown && !profileDropdown.contains(event.target)) {
                    profileDropdown.classList.remove("open");
                    profileToggle?.setAttribute("aria-expanded", "false");
                }

            });

        } catch (error) {
            console.error("Navbar loading error:", error);
        }
    }
});
