<?php
/**
 * Database Configuration File
 * Handles database connection and common settings
 */

// Database credentials
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "portfolio_db";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    // Log error for debugging
    error_log("Database Connection Failed: " . $conn->connect_error);
    
    // Send JSON response for AJAX requests
    header('Content-Type: application/json');
    http_response_code(500);
    echo json_encode([
        'status' => 'error',
        'message' => 'Database connection failed. Please try again later.'
    ]);
    die();
}

// Set charset to utf8mb4
$conn->set_charset("utf8mb4");

// Define response codes
define('RESPONSE_SUCCESS', 200);
define('RESPONSE_BAD_REQUEST', 400);
define('RESPONSE_SERVER_ERROR', 500);

/**
 * Send JSON response
 * @param int $statusCode - HTTP status code
 * @param string $message - Response message
 * @param array $data - Additional data
 */
function sendResponse($statusCode, $message, $data = []) {
    header('Content-Type: application/json');
    http_response_code($statusCode);
    
    $response = [
        'status' => $statusCode === RESPONSE_SUCCESS ? 'success' : 'error',
        'message' => $message
    ];
    
    if (!empty($data)) {
        $response['data'] = $data;
    }
    
    echo json_encode($response);
    die();
}

/**
 * Sanitize input data
 * @param string $input - Input to sanitize
 * @return string - Sanitized input
 */
function sanitizeInput($input) {
    return htmlspecialchars(trim($input), ENT_QUOTES, 'UTF-8');
}

/**
 * Validate email
 * @param string $email - Email to validate
 * @return bool - True if valid
 */
function isValidEmail($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL) !== false;
}
?>

