
const correctPassword = "Abes@2026";
const maxAttempts = 3;

// Login functionality
const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", function(event) {

        event.preventDefault();

        let password = document.getElementById("password").value;
        let attempts = Number(localStorage.getItem("attempts")) || 0;
        let message = document.getElementById("message");

        if (attempts >= maxAttempts) {
            message.textContent = "Access Denied! Maximum attempts reached.";
            return;
        }

        if (password === correctPassword) {

            localStorage.setItem("authenticated", "true");
            localStorage.removeItem("attempts");

            window.location.href = "vault.html";

        } else {

            attempts++;

            localStorage.setItem("attempts", attempts);

            if (attempts >= maxAttempts) {
                message.textContent = "Access Denied! Maximum attempts reached.";
            } else {
                message.textContent =
                    "Incorrect Password! Attempts left: " +
                    (maxAttempts - attempts);
            }
        }
    });
}


// Vault authentication
if (window.location.pathname.endsWith("vault.html")) {

    if (localStorage.getItem("authenticated") !== "true") {
        window.location.href = "index.html";
    }
}


// Save notes
function saveNotes() {

    let content = document.getElementById("notes").value;

    localStorage.setItem("savedNotes", content);

    document.getElementById("message").textContent =
        "Notes saved successfully!";
}


// Load notes
function loadNotes() {

    let content = localStorage.getItem("savedNotes") || "";

    document.getElementById("notes").value = content;

    document.getElementById("message").textContent =
        "Notes loaded successfully!";
}


// Clear notes
function clearNotes() {

    document.getElementById("notes").value = "";

    localStorage.removeItem("savedNotes");

    document.getElementById("message").textContent =
        "Notes cleared successfully!";
}


// Logout
function logout() {

    localStorage.removeItem("authenticated");

    window.location.href = "index.html";
}
