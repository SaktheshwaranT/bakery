<?php
// Database connection setup
$servername = "localhost";
$username_db = "root"; // XAMPP default username
$password_db = ""; // XAMPP default password
$dbname = "bakery"; // Database name

// Create connection
$conn = new mysqli($servername, $username_db, $password_db, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Check if form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Collect form data
    $username = $_POST['username'];
    $password = $_POST['password'];

    // Prepare the SQL statement to get user details
    $stmt = $conn->prepare("SELECT Password FROM sign_up WHERE Name = ?");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $stmt->store_result();
    
    // If user exists, fetch the stored password
    if ($stmt->num_rows > 0) {
        $stmt->bind_result($stored_hashed_password);
        $stmt->fetch();

        // Verify the submitted password with the stored hashed password
        if (password_verify($password, $stored_hashed_password)) {
            // Password is correct, redirect to a new page or display a success message
            echo "Login successful. Welcome, $username!";
            // Redirect to another page (e.g., dashboard)
            // header("Location: dashboard.php");
            exit();
        } else {
            // Invalid password
            echo "Incorrect password!";
        }
    } else {
        // User does not exist
        echo "No user found with that username!";
    }

    // Close statement and connection
    $stmt->close();
    $conn->close();
}
?>
