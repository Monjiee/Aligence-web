function sendOTP() {
    const email = document.getElementById('email').value;
    if (email) {
        alert(`OTP sent to ${email}`);
    } else {
        alert("Please enter your email.");
    }
}

function verifyOTP() {
    const otp = document.getElementById('otp').value;
    if (otp) {
        alert("OTP Verified");
    } else {
        alert("Please enter the OTP.");
    }
}

function togglePasswordVisibility(fieldId) {
    const field = document.getElementById(fieldId);
    if (field.type === "password") {
        field.type = "text";
    } else {
        field.type = "password";
    }
}

document.getElementById('passwordForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (newPassword === confirmPassword) {
        alert("Password changed successfully!");
    } else {
        alert("New Password and Confirm Password do not match.");
    }
});

// prevent navigating back to previous page

window.history.pushState(null, null, window.location.dashboard.html);
window.onpopstate = function () {
    window.history.go(1);
};

function logout() {
    // Firebase sign-out
    firebase.auth().signOut().then(() => {
        // Redirect to login page after successful logout
        window.location.href = '../login.html';
    }).catch((error) => {
        console.error('Error during logout:', error);
    });
}