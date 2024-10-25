<?php
// Database connection setup
$servername = "localhost";  // XAMPP default server
$username_db = "root";  // XAMPP default username
$password_db = "";  // XAMPP default password
$dbname = "bakery";  // Your database name

// Create connection
$conn = new mysqli($servername, $username_db, $password_db, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Check if form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Collect form data
    $first_name = $_POST['first_name'];
    $last_name = $_POST['last_name'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];
    $food = $_POST['food'];
    $how_much = $_POST['how_much'];
    $address = $_POST['address'];

    // Prepare and bind the SQL statement
    $stmt = $conn->prepare("INSERT INTO details (FIRST_NAME, LAST_NAME, PHONE, EMAIL, FOOD, HOW_MUCH, ADDRESS) VALUES (?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("ssissss", $first_name, $last_name, $phone, $email, $food, $how_much, $address);

    // Execute the statement
    if ($stmt->execute()) {
        // Order was successfully placed
        echo "<script>alert('Your order has been placed successfully!'); window.location.href = '1.html';</script>";
    } else {
        // Something went wrong
        echo "Error: " . $stmt->error;
    }

    // Close the statement and connection
    $stmt->close();
    $conn->close();
}
?>
