
const donorForm = document.getElementById("donorForm");

donorForm.addEventListener("submit", function(event) {

    event.preventDefault();

    // Get input values
    const name = document.querySelector(".name").value.trim();
    const age = Number(document.querySelector(".age").value);
    const bloodGroup = document.querySelector(".group").value.trim().toUpperCase();
    const weight = Number(document.querySelector(".weight").value);
    const nic = document.querySelector(".nic").value.trim();
    const date = document.querySelector(".date").value;
    const town = document.querySelector(".town").value.trim();

    // 1. Check empty fields
    if (!name || !age || !bloodGroup || !weight || !nic || !town) {
        alert("Please fill in all required fields.");
        return;
    }

    // 2. Check age
    if (!Number.isInteger(age) || age < 18 || age > 60) {
        alert("Age must be between 18 and 60.");
        return;
    }

    // 3. Check weight
    if (weight < 50) {
        alert("Weight must be at least 50 kg.");
        return;
    }

    // 4. Check blood group
    const validGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

    if (!validGroups.includes(bloodGroup)) {
        alert("Please enter a valid blood group.");
        return;
    }

    // 5. Check NIC
    const nicPattern = /^([0-9]{9}[vVxX]|[0-9]{12})$/;

    if (!nicPattern.test(nic)) {
        alert("Please enter a valid NIC number.");
        return;
    }

    // 6. Check donation date
    
if (date) {
    const donatedDate = new Date(date + "T00:00:00");
    const today = new Date();

    today.setHours(0, 0, 0, 0);

    if (donatedDate > today) {
        alert("Last donated date cannot be in the future.");
        return;
    }

    // Calculate the date 3 months ago
    const threeMonthsAgo = new Date(today);
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

    if (donatedDate > threeMonthsAgo) {
        alert("You must wait at least 3 months after your last blood donation.");
        return;
    }
}










    // 7. Success message
    alert("Donor registration form submitted successfully!");

    donorForm.reset();

});
