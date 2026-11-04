document.addEventListener("DOMContentLoaded", async () => {

    // Login and Register functionality
    const container = document.querySelector(".container");
    const registerBtn = document.querySelector(".register-btn");
    const loginBtn = document.querySelector(".login-btn");

    if (container && registerBtn) {
        registerBtn.addEventListener("click", () => {
            container.classList.add("active");
        });
    }

    if (container && loginBtn) {
        loginBtn.addEventListener("click", () => {
            container.classList.remove("active");
        });
    }
});






