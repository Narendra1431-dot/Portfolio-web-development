<?php
/**
 * Contact Form Handler
 * Processes contact form submissions and stores data in database
 */

header('Content-Type: text/plain; charset=utf-8');

// Include database configuration
require_once 'config.php';

// Check if form is submitted via POST
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    sendResponse(RESPONSE_BAD_REQUEST, "Invalid request method. Only POST is allowed.");
}

// Get and validate form inputs
$name = isset($_POST['name']) ? sanitizeInput($_POST['name']) : '';
$email = isset($_POST['email']) ? sanitizeInput($_POST['email']) : '';
$phone = isset($_POST['phone']) ? sanitizeInput($_POST['phone']) : '';
$subject = isset($_POST['subject']) ? sanitizeInput($_POST['subject']) : '';
$message = isset($_POST['message']) ? sanitizeInput($_POST['message']) : '';

// Validation
$errors = [];

// Validate required fields
if (empty($name)) {
    $errors[] = "Name is required.";
}

if (empty($email)) {
    $errors[] = "Email is required.";
} elseif (!isValidEmail($email)) {
    $errors[] = "Invalid email format.";
}

if (empty($subject)) {
    $errors[] = "Subject is required.";
}

if (empty($message)) {
    $errors[] = "Message is required.";
} elseif (strlen($message) < 10) {
    $errors[] = "Message must be at least 10 characters long.";
}

// Validate optional phone
if (!empty($phone)) {
    $phoneRegex = '/^[\d\s\-\+\(\)]{10,}$/';
    if (!preg_match($phoneRegex, $phone)) {
        $errors[] = "Invalid phone number format.";
    }
}

// Return errors if validation failed
if (!empty($errors)) {
    echo implode("\n", $errors);
    exit;
}

// Prepare and execute database query
$stmt = $conn->prepare("INSERT INTO contacts (name, email, phone, subject, message, created_at) VALUES (?, ?, ?, ?, ?, NOW())");

if (!$stmt) {
    error_log("Prepare failed: " . $conn->error);
    echo "Database error: Unable to prepare statement.";
    exit;
}

$stmt->bind_param("sssss", $name, $email, $phone, $subject, $message);

if ($stmt->execute()) {
    // Success
    echo "Thank you for your message! We will get back to you soon.";
    
    // Optional: Send confirmation email
    // sendConfirmationEmail($email, $name);
    
    // Log submission
    error_log("Contact form submitted - Name: $name, Email: $email");
} else {
    error_log("Execute failed: " . $stmt->error);
    echo "Error: Unable to send message. Please try again later.";
}

// Close statement and connection
$stmt->close();
$conn->close();
?>
