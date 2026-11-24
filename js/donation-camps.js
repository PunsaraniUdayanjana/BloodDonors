
// document.addEventListener("DOMContentLoaded", () => {

//     // =====================================
//     // Get HTML Elements
//     // =====================================

//     const donationCampsForm = document.getElementById("donationCampsForm");
//     const campPoster = document.getElementById("campPoster");
//     const posterPreview = document.getElementById("posterPreview");
//     const posterPlaceholder = document.getElementById("posterPlaceholder");

//     const campPostsContainer = document.getElementById("campPostsContainer");

//     const posterModal = document.getElementById("posterModal");
//     const modalPosterImage = document.getElementById("modalPosterImage");
//     const closePosterModal = document.getElementById("closePosterModal");

//     const campNotification = document.getElementById("campNotification");
//     const publishCampBtn = document.getElementById("publishCampBtn");


//     // =====================================
//     // Current User
//     // =====================================

//     // Temporary login check.
//     // Change this key according to your login.js implementation.

//     function getCurrentUser() {

//         const storedUser = localStorage.getItem("loggedInUser");

//         if (!storedUser) {
//             return null;
//         }

//         try {
//             const user = JSON.parse(storedUser);

//             if (typeof user === "string") {
//                 return user;
//             }

//             return user.id || user.email || user.username || null;

//         } catch (error) {
//             return storedUser;
//         }
//     }


//     // =====================================
//     // Load Camp Posts from Local Storage
//     // =====================================

//     let campPosts = [];

//     try {
//         campPosts = JSON.parse(localStorage.getItem("donationCampPosts")) || [];
//     } catch (error) {
//         campPosts = [];
//     }

//     let editingPostId = null;


//     function saveCampPosts() {

//         try {
//             localStorage.setItem(
//                 "donationCampPosts",
//                 JSON.stringify(campPosts)
//             );

//             return true;

//         } catch (error) {
//             showNotification("Unable to save post. Storage may be full.", "error");
//             return false;
//         }
//     }


//     // =====================================
//     // Notification Message
//     // =====================================

//     let notificationTimer;

//     function showNotification(message, type = "success") {

//         campNotification.textContent = message;
//         campNotification.style.display = "block";

//         campNotification.style.background =
//             type === "error" ? "#d62828" : "#07823d";

//         clearTimeout(notificationTimer);

//         notificationTimer = setTimeout(() => {
//             campNotification.style.display = "none";
//         }, 3000);
//     }


//     // =====================================
//     // Poster Image Preview
//     // =====================================

//     campPoster.addEventListener("change", () => {

//         const file = campPoster.files[0];

//         if (!file) {
//             return;
//         }

//         if (!file.type.startsWith("image/")) {
//             showNotification("Please select an image file.", "error");
//             campPoster.value = "";
//             return;
//         }

//         const reader = new FileReader();

//         reader.onload = (event) => {

//             posterPreview.src = event.target.result;
//             posterPreview.style.display = "block";

//             posterPlaceholder.style.display = "none";
//         };

//         reader.readAsDataURL(file);
//     });


//     // =====================================
//     // Reset Form
//     // =====================================

//     function resetCampForm() {

//         donationCampsForm.reset();

//         posterPreview.src = "";
//         posterPreview.style.display = "none";

//         posterPlaceholder.style.display = "block";

//         editingPostId = null;

//         publishCampBtn.innerHTML =
//             '<i class="fa-solid fa-paper-plane"></i> Post';
//     }


//     // =====================================
//     // CREATE / UPDATE Camp Post
//     // =====================================

//     donationCampsForm.addEventListener("submit", async (event) => {

//         event.preventDefault();

//         const currentUser = getCurrentUser();

//         // Only logged-in users can publish or update posts.

//         if (!currentUser) {

//             showNotification("Please login to publish a camp.", "error");

//             setTimeout(() => {
//                 window.location.href = "login.html";
//             }, 1500);

//             return;
//         }

//         const file = campPoster.files[0];

//         let posterImage = posterPreview.src;

//         // New posts must have a poster.
//         if (!editingPostId && !file) {
//             showNotification("Please upload a camp poster.", "error");
//             return;
//         }

//         // Read selected image.
//         if (file) {

//             try {
//                 posterImage = await new Promise((resolve, reject) => {

//                     const reader = new FileReader();

//                     reader.onload = () => resolve(reader.result);
//                     reader.onerror = reject;

//                     reader.readAsDataURL(file);
//                 });

//             } catch (error) {
//                 showNotification("Unable to read poster image.", "error");
//                 return;
//             }
//         }

//         const campData = {

//             campName: document.getElementById("campName").value.trim(),

//             organizerName: document.getElementById("organizerName").value.trim(),

//             contactNumber: document.getElementById("contactNumber").value.trim(),

//             campDate: document.getElementById("campDate").value,

//             campTime: document.getElementById("campTime").value,

//             campLocation: document.getElementById("campLocation").value.trim(),

//             campDescription: document.getElementById("campDescription").value.trim(),

//             posterImage: posterImage
//         };


//         // UPDATE existing post

//         if (editingPostId) {

//             const postIndex = campPosts.findIndex(
//                 post => post.id === editingPostId
//             );

//             if (postIndex === -1) {
//                 showNotification("Camp post not found.", "error");
//                 resetCampForm();
//                 return;
//             }

//             // Check ownership again.
//             if (campPosts[postIndex].ownerId !== currentUser) {
//                 showNotification("You cannot edit this post.", "error");
//                 resetCampForm();
//                 return;
//             }

//             campPosts[postIndex] = {
//                 ...campPosts[postIndex],
//                 ...campData
//             };

//             if (!saveCampPosts()) {
//                 return;
//             }

//             showNotification("Camp post updated successfully!");

//         }

//         // CREATE new post

//         else {

//             const newCampPost = {

//                 id: Date.now().toString(),

//                 ownerId: currentUser,

//                 ...campData,

//                 createdAt: new Date().toISOString()
//             };

//             campPosts.unshift(newCampPost);

//             if (!saveCampPosts()) {
//                 campPosts.shift();
//                 return;
//             }

//             showNotification("Camp posted successfully!");
//         }

//         resetCampForm();

//         renderCampPosts();
//     });


//     // =====================================
//     // READ - Display Camp Posts
//     // =====================================

//     function renderCampPosts() {

//         campPostsContainer.innerHTML = "";

//         if (campPosts.length === 0) {

//             const emptyMessage = document.createElement("p");

//             emptyMessage.textContent = "No donation camp posts available yet.";

//             emptyMessage.style.textAlign = "center";
//             emptyMessage.style.color = "#777";

//             campPostsContainer.appendChild(emptyMessage);

//             return;
//         }

//         const currentUser = getCurrentUser();

//         campPosts.forEach((post) => {

//             const campPost = document.createElement("div");
//             campPost.className = "camp-post";

//             // Poster Image

//             const posterImage = document.createElement("img");

//             posterImage.className = "camp-post-poster";
//             posterImage.src = post.posterImage;
//             posterImage.alt = post.campName + " Poster";

//             posterImage.addEventListener("click", () => {
//                 openPosterModal(post.posterImage);
//             });


//             // Camp Details

//             const details = document.createElement("div");
//             details.className = "camp-post-details";

//             const campTitle = document.createElement("h3");
//             campTitle.textContent = post.campName;

//             details.appendChild(campTitle);


//             const fields = [

//                 {
//                     icon: "fa-users",
//                     text: "Organizer: " + post.organizerName
//                 },

//                 {
//                     icon: "fa-phone",
//                     text: "Contact: " + post.contactNumber
//                 },

//                 {
//                     icon: "fa-calendar-days",
//                     text: "Date: " + post.campDate
//                 },

//                 {
//                     icon: "fa-clock",
//                     text: "Time: " + post.campTime
//                 },

//                 {
//                     icon: "fa-location-dot",
//                     text: "Location: " + post.campLocation
//                 },

//                 {
//                     icon: "fa-align-left",
//                     text: "Description: " + post.campDescription
//                 }
//             ];


//             fields.forEach((field) => {

//                 const paragraph = document.createElement("p");

//                 const icon = document.createElement("i");
//                 icon.className = "fa-solid " + field.icon;

//                 paragraph.appendChild(icon);
//                 paragraph.appendChild(
//                     document.createTextNode(field.text)
//                 );

//                 details.appendChild(paragraph);
//             });


//             // Edit and Delete Buttons - Owner Only

//             if (currentUser && post.ownerId === currentUser) {

//                 const actions = document.createElement("div");
//                 actions.className = "camp-post-actions";

//                 const editButton = document.createElement("button");
//                 editButton.type = "button";
//                 editButton.className = "edit-camp-btn";
//                 editButton.innerHTML =
//                     '<i class="fa-solid fa-pen-to-square"></i> Edit';

//                 editButton.addEventListener("click", () => {
//                     editCampPost(post.id);
//                 });


//                 const deleteButton = document.createElement("button");
//                 deleteButton.type = "button";
//                 deleteButton.className = "delete-camp-btn";
//                 deleteButton.innerHTML =
//                     '<i class="fa-solid fa-trash"></i> Delete';

//                 deleteButton.addEventListener("click", () => {
//                     deleteCampPost(post.id);
//                 });


//                 actions.appendChild(editButton);
//                 actions.appendChild(deleteButton);

//                 details.appendChild(actions);
//             }


//             campPost.appendChild(posterImage);
//             campPost.appendChild(details);

//             campPostsContainer.appendChild(campPost);
//         });
//     }


//     // =====================================
//     // UPDATE - Edit Camp Post
//     // =====================================

//     function editCampPost(postId) {

//         const currentUser = getCurrentUser();

//         const post = campPosts.find(
//             item => item.id === postId
//         );

//         if (!post) {
//             showNotification("Camp post not found.", "error");
//             return;
//         }

//         if (!currentUser || post.ownerId !== currentUser) {
//             showNotification("You cannot edit this post.", "error");
//             return;
//         }

//         document.getElementById("campName").value = post.campName;

//         document.getElementById("organizerName").value = post.organizerName;

//         document.getElementById("contactNumber").value = post.contactNumber;

//         document.getElementById("campDate").value = post.campDate;

//         document.getElementById("campTime").value = post.campTime;

//         document.getElementById("campLocation").value = post.campLocation;

//         document.getElementById("campDescription").value = post.campDescription;


//         posterPreview.src = post.posterImage;
//         posterPreview.style.display = "block";

//         posterPlaceholder.style.display = "none";


//         editingPostId = postId;

//         publishCampBtn.innerHTML =
//             '<i class="fa-solid fa-floppy-disk"></i> Update Post';

//         donationCampsForm.scrollIntoView({
//             behavior: "smooth",
//             block: "start"
//         });
//     }


//     // =====================================
//     // DELETE - Delete Camp Post
//     // =====================================

//     function deleteCampPost(postId) {

//         const currentUser = getCurrentUser();

//         const post = campPosts.find(
//             item => item.id === postId
//         );

//         if (!post) {
//             showNotification("Camp post not found.", "error");
//             return;
//         }

//         if (!currentUser || post.ownerId !== currentUser) {
//             showNotification("You cannot delete this post.", "error");
//             return;
//         }

//         const confirmation = confirm(
//             "Are you sure you want to delete this donation camp post?"
//         );

//         if (!confirmation) {
//             return;
//         }

//         const previousPosts = [...campPosts];

//         campPosts = campPosts.filter(
//             item => item.id !== postId
//         );

//         if (!saveCampPosts()) {
//             campPosts = previousPosts;
//             return;
//         }

//         renderCampPosts();

//         showNotification("Camp post deleted successfully!");
//     }


//     // =====================================
//     // Poster Preview Modal
//     // =====================================

//     function openPosterModal(imageSource) {

//         modalPosterImage.src = imageSource;

//         posterModal.classList.add("show");
//     }


//     function closeModal() {

//         posterModal.classList.remove("show");

//         modalPosterImage.src = "";
//     }


//     closePosterModal.addEventListener("click", closeModal);


//     posterModal.addEventListener("click", (event) => {

//         if (event.target === posterModal) {
//             closeModal();
//         }
//     });


//     document.addEventListener("keydown", (event) => {

//         if (event.key === "Escape") {
//             closeModal();
//         }
//     });


//     // =====================================
//     // Initial Page Load
//     // =====================================

//     renderCampPosts();

// });



document.addEventListener("DOMContentLoaded", () => {

    // =====================================
    // Get HTML Elements
    // =====================================

    const donationCampsForm = document.getElementById("donationCampsForm");

    const campPoster = document.getElementById("campPoster");
    const posterPreview = document.getElementById("posterPreview");
    const posterPlaceholder = document.getElementById("posterPlaceholder");

    const campPostsContainer = document.getElementById("campPostsContainer");

    const posterModal = document.getElementById("posterModal");
    const modalPosterImage = document.getElementById("modalPosterImage");
    const closePosterModal = document.getElementById("closePosterModal");

    const campNotification = document.getElementById("campNotification");
    const publishCampBtn = document.getElementById("publishCampBtn");


    // =====================================
    // Temporary User for Testing
    // =====================================

    function getCurrentUser() {
        return "test-user";
    }


    // =====================================
    // Load Camp Posts
    // =====================================

    let campPosts = [];

    try {
        campPosts = JSON.parse(
            localStorage.getItem("donationCampPosts")
        ) || [];

    } catch (error) {
        campPosts = [];
    }

    let editingPostId = null;


    // =====================================
    // Save Camp Posts
    // =====================================

    function saveCampPosts() {

        try {

            localStorage.setItem(
                "donationCampPosts",
                JSON.stringify(campPosts)
            );

            return true;

        } catch (error) {

            showNotification(
                "Unable to save post. Storage may be full.",
                "error"
            );

            return false;
        }
    }


    // =====================================
    // Notification Message
    // =====================================

    let notificationTimer;

    function showNotification(message, type = "success") {

        campNotification.textContent = message;

        campNotification.style.display = "block";

        campNotification.style.background =
            type === "error" ? "#d62828" : "#07823d";

        clearTimeout(notificationTimer);

        notificationTimer = setTimeout(() => {

            campNotification.style.display = "none";

        }, 3000);
    }


    // =====================================
    // Poster Image Preview
    // =====================================

    campPoster.addEventListener("change", () => {

        const file = campPoster.files[0];

        if (!file) {
            return;
        }

        if (!file.type.startsWith("image/")) {

            showNotification(
                "Please select an image file.",
                "error"
            );

            campPoster.value = "";
            return;
        }

        const reader = new FileReader();

        reader.onload = (event) => {

            posterPreview.src = event.target.result;

            posterPreview.style.display = "block";

            posterPlaceholder.style.display = "none";
        };

        reader.readAsDataURL(file);
    });


    // =====================================
    // Reset Form
    // =====================================

    function resetCampForm() {

        donationCampsForm.reset();

        posterPreview.src = "";

        posterPreview.style.display = "none";

        posterPlaceholder.style.display = "block";

        editingPostId = null;

        publishCampBtn.innerHTML =
            '<i class="fa-solid fa-paper-plane"></i> Post';
    }


    // =====================================
    // CREATE & UPDATE Camp Post
    // =====================================

    donationCampsForm.addEventListener("submit", async (event) => {

        event.preventDefault();

        const currentUser = getCurrentUser();

        const file = campPoster.files[0];

        let posterImage = posterPreview.src;

        // Poster is required for new posts.

        if (!editingPostId && !file) {

            showNotification(
                "Please upload a camp poster.",
                "error"
            );

            return;
        }


        // Read uploaded image.

        if (file) {

            try {

                posterImage = await new Promise((resolve, reject) => {

                    const reader = new FileReader();

                    reader.onload = () => resolve(reader.result);

                    reader.onerror = () => reject(reader.error);

                    reader.readAsDataURL(file);
                });

            } catch (error) {

                showNotification(
                    "Unable to read poster image.",
                    "error"
                );

                return;
            }
        }


        // Collect Form Data.

        const campData = {

            campName: document.getElementById("campName").value.trim(),

            organizerName: document.getElementById("organizerName").value.trim(),

            contactNumber: donationCampsForm.querySelector('[name="contactNumber"]').value.trim(),
            
            campDate: document.getElementById("campDate").value,

            campTime: document.getElementById("campTime").value,

            campLocation: document.getElementById("campLocation").value.trim(),

            campDescription: document.getElementById("campDescription").value.trim(),

            posterImage: posterImage
        };

        console.log("Camp Data:", campData);
        console.log("Contact Number:", campData.contactNumber);


        // UPDATE Existing Post.

        if (editingPostId) {

            const postIndex = campPosts.findIndex(
                post => post.id === editingPostId
            );

            if (postIndex === -1) {

                showNotification("Camp post not found.", "error");

                return;
            }

            if (campPosts[postIndex].ownerId !== currentUser) {

                showNotification(
                    "You cannot edit this post.",
                    "error"
                );

                return;
            }

            const previousPost = { ...campPosts[postIndex] };

            campPosts[postIndex] = {
                ...campPosts[postIndex],
                ...campData
            };

            if (!saveCampPosts()) {

                campPosts[postIndex] = previousPost;

                return;
            }

            showNotification("Camp post updated successfully!");
        }


        // CREATE New Post.

        else {

            const newCampPost = {

                id: Date.now().toString(),

                ownerId: currentUser,

                ...campData,

                createdAt: new Date().toISOString()
            };

            campPosts.unshift(newCampPost);

            if (!saveCampPosts()) {

                campPosts.shift();

                return;
            }

            showNotification("Camp posted successfully!");
        }

        resetCampForm();

        renderCampPosts();
    });


    // =====================================
    // READ - Display Camp Posts
    // =====================================

    function renderCampPosts() {

        campPostsContainer.innerHTML = "";

        if (campPosts.length === 0) {

            const emptyMessage = document.createElement("p");

            emptyMessage.textContent =
                "No donation camp posts available yet.";

            emptyMessage.style.textAlign = "center";

            emptyMessage.style.color = "#777";

            campPostsContainer.appendChild(emptyMessage);

            return;
        }


        const currentUser = getCurrentUser();


        campPosts.forEach((post) => {

            // Main Post Container.

            const campPost = document.createElement("div");

            campPost.className = "camp-post";


            // Poster Image.

            const posterImage = document.createElement("img");

            posterImage.className = "camp-post-poster";

            posterImage.src = post.posterImage;

            posterImage.alt = post.campName + " Poster";

            posterImage.addEventListener("click", () => {

                openPosterModal(post.posterImage);

            });


            // Camp Details.

            const details = document.createElement("div");

            details.className = "camp-post-details";


            const campTitle = document.createElement("h3");

            campTitle.textContent = post.campName;

            details.appendChild(campTitle);


            // Post Information.

            const fields = [

                {
                    icon: "fa-users",
                    text: "Organizer: " + post.organizerName
                },

                {
                    icon: "fa-phone",
                    text: "Contact: " + (post.contactNumber || "Not provided")
                },

                {
                    icon: "fa-calendar-days",
                    text: "Date: " + post.campDate
                },

                {
                    icon: "fa-clock",
                    text: "Time: " + post.campTime
                },

                {
                    icon: "fa-location-dot",
                    text: "Location: " + post.campLocation
                },

                {
                    icon: "fa-align-left",
                    text: "Description: " + post.campDescription
                }
            ];


            fields.forEach((field) => {

                const paragraph = document.createElement("p");

                const icon = document.createElement("i");

                icon.className = "fa-solid " + field.icon;

                paragraph.appendChild(icon);

                paragraph.appendChild(
                    document.createTextNode(field.text)
                );

                details.appendChild(paragraph);
            });


            // EDIT & DELETE Buttons.

            if (post.ownerId === currentUser) {

                const actions = document.createElement("div");

                actions.className = "camp-post-actions";


                // Edit Button.

                const editButton = document.createElement("button");

                editButton.type = "button";

                editButton.className = "edit-camp-btn";

                editButton.innerHTML =
                    '<i class="fa-solid fa-pen-to-square"></i> Edit';

                editButton.addEventListener("click", () => {

                    editCampPost(post.id);

                });


                // Delete Button.

                const deleteButton = document.createElement("button");

                deleteButton.type = "button";

                deleteButton.className = "delete-camp-btn";

                deleteButton.innerHTML =
                    '<i class="fa-solid fa-trash"></i> Delete';

                deleteButton.addEventListener("click", () => {

                    deleteCampPost(post.id);

                });


                actions.appendChild(editButton);

                actions.appendChild(deleteButton);

                details.appendChild(actions);
            }


            // Add Elements.

            campPost.appendChild(posterImage);

            campPost.appendChild(details);

            campPostsContainer.appendChild(campPost);
        });
    }


    // =====================================
    // UPDATE - Edit Camp Post
    // =====================================

    function editCampPost(postId) {

        const currentUser = getCurrentUser();

        const post = campPosts.find(
            item => item.id === postId
        );

        if (!post) {

            showNotification("Camp post not found.", "error");

            return;
        }

        if (post.ownerId !== currentUser) {

            showNotification(
                "You cannot edit this post.",
                "error"
            );

            return;
        }


        // Load Existing Data into Form.

        document.getElementById("campName").value =
            post.campName;

        document.getElementById("organizerName").value =
            post.organizerName;

        document.getElementById("contactNumber").value =
            post.contactNumber;

        document.getElementById("campDate").value =
            post.campDate;

        document.getElementById("campTime").value =
            post.campTime;

        document.getElementById("campLocation").value =
            post.campLocation;

        document.getElementById("campDescription").value =
            post.campDescription;


        // Load Existing Poster.

        posterPreview.src = post.posterImage;

        posterPreview.style.display = "block";

        posterPlaceholder.style.display = "none";


        editingPostId = postId;


        // Change Button Text.

        publishCampBtn.innerHTML =
            '<i class="fa-solid fa-floppy-disk"></i> Update Post';


        // Scroll to Form.

        donationCampsForm.scrollIntoView({

            behavior: "smooth",

            block: "start"
        });
    }


    // =====================================
    // DELETE - Delete Camp Post
    // =====================================

    function deleteCampPost(postId) {

        const currentUser = getCurrentUser();

        const post = campPosts.find(
            item => item.id === postId
        );

        if (!post) {

            showNotification("Camp post not found.", "error");

            return;
        }

        if (post.ownerId !== currentUser) {

            showNotification(
                "You cannot delete this post.",
                "error"
            );

            return;
        }


        // Confirmation Message.

        const confirmation = confirm(
            "Are you sure you want to delete this donation camp post?"
        );

        if (!confirmation) {
            return;
        }


        const previousPosts = [...campPosts];


        // Remove Post.

        campPosts = campPosts.filter(
            item => item.id !== postId
        );


        if (!saveCampPosts()) {

            campPosts = previousPosts;

            return;
        }


        renderCampPosts();

        showNotification("Camp post deleted successfully!");
    }


    // =====================================
    // Poster Preview Modal
    // =====================================

    function openPosterModal(imageSource) {

        modalPosterImage.src = imageSource;

        posterModal.classList.add("show");
    }


    function closeModal() {

        posterModal.classList.remove("show");

        modalPosterImage.src = "";
    }


    closePosterModal.addEventListener("click", closeModal);


    // Close Modal when clicking outside image.

    posterModal.addEventListener("click", (event) => {

        if (event.target === posterModal) {

            closeModal();
        }
    });


    // Close Modal using Escape key.

    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape") {

            closeModal();
        }
    });


    // =====================================
    // Initial Page Load
    // =====================================

    renderCampPosts();

});
