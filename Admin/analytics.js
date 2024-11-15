// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyC197CiJGypDz6qJxD0xPrBhrN0u0tTqH4",
    authDomain: "aligence-4587c.firebaseapp.com",
    databaseURL: "https://aligence-4587c-default-rtdb.asia-southeast1.firebasedatabase.app/",
    projectId: "aligence-4587c",
    storageBucket: "aligence-4587c.appspot.com",
    messagingSenderId: "483459083057",
    appId: "1:483459083057:android:9f97de59a19f3a8968de10"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Default filter for roles
let selectedRole = "all";

// Function to fetch and render users in the table
function fetchAndRenderUsers(roleFilter = "all") {
    const tableBody = document.querySelector("#usersTable tbody");
    tableBody.innerHTML = ""; // Clear existing rows

    database.ref("users").once("value")
        .then(snapshot => {
            console.log("Fetched data:", snapshot.val()); // Log retrieved data for debugging
            if (!snapshot.exists()) {
                tableBody.innerHTML = "<tr><td colspan='5'>No data available.</td></tr>";
                return;
            }

            let index = 1;
            snapshot.forEach(childSnapshot => {
                const user = childSnapshot.val();
                console.log("Processing user:", user); // Log each user
                const role = user.role || "N/A";
                const status = user.status && user.status.toLowerCase() === "online" ? "Online" : "Offline";

                // Filter by role
                if (roleFilter !== "all" && role !== roleFilter) {
                    console.log(`Skipping user due to role filter: ${roleFilter}`);
                    return;
                }

                // Add row to the table
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${index++}</td>
                    <td>${user.lastName || "N/A"}</td>
                    <td>${user.firstName || "N/A"}</td>
                    <td>${role.charAt(0).toUpperCase() + role.slice(1)}</td>
                    <td>${status}</td>
                `;
                tableBody.appendChild(row);
            });
        })
        .catch(error => {
            console.error("Error fetching users:", error);
            tableBody.innerHTML = "<tr><td colspan='5'>Error loading data.</td></tr>";
        });
}

// Initialize the table with all roles on page load
window.onload = () => {
    fetchAndRenderUsers();
};
