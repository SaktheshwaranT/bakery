<?php
// Database connection setup
$servername = "localhost";  // Typically "localhost" for XAMPP
$username = "root";  // Default username for XAMPP MySQL
$password = "";  // Default password is blank
$dbname = "bakery";  // Database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Check if form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Collect form data
    $username = $_POST['username'];
    $email = $_POST['email'];
    $password = $_POST['password']; // Collecting the password from form

    // Hash the password for security

    // Prepare and bind
    $stmt = $conn->prepare("INSERT INTO sign_up (Name, Email, Password) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $username, $email, $password);

    // Execute the statement
    if ($stmt->execute()) {
        echo "New record created successfully";
    } else {
        echo "Error: " . $stmt->error;
    }

    // Close statement and connection
    $stmt->close();
    $conn->close();
}
?>
