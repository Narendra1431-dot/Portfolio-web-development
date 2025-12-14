<?php
/**
 * Projects API
 * Provides API endpoints for retrieving project data
 */

header('Content-Type: application/json; charset=utf-8');

require_once 'config.php';

// Get request method
$method = $_SERVER['REQUEST_METHOD'];
$path = isset($_GET['action']) ? $_GET['action'] : '';

// Handle GET requests
if ($method === 'GET') {
    switch ($path) {
        case 'all':
            getProjects();
            break;
        case 'featured':
            getFeaturedProjects();
            break;
        case 'detail':
            getProjectDetail($_GET['id'] ?? null);
            break;
        default:
            getFeaturedProjects();
            break;
    }
} else {
    sendResponse(RESPONSE_BAD_REQUEST, "Invalid request method");
}

/**
 * Get all projects
 */
function getProjects() {
    global $conn;
    
    $sql = "SELECT id, title, description, tech_stack, url, github_url, image_url, start_date, end_date, featured, created_at 
            FROM projects 
            ORDER BY created_at DESC";
    
    $result = $conn->query($sql);
    
    if (!$result) {
        sendResponse(RESPONSE_SERVER_ERROR, "Database query failed: " . $conn->error);
    }
    
    $projects = [];
    while ($row = $result->fetch_assoc()) {
        // Parse tech_stack as array
        $row['tech_stack'] = array_map('trim', explode(',', $row['tech_stack']));
        $projects[] = $row;
    }
    
    header('Content-Type: application/json');
    echo json_encode([
        'status' => 'success',
        'message' => 'Projects retrieved successfully',
        'data' => $projects,
        'count' => count($projects)
    ]);
    exit;
}

/**
 * Get featured projects only
 */
function getFeaturedProjects() {
    global $conn;
    
    $sql = "SELECT id, title, description, tech_stack, url, github_url, image_url, start_date, end_date, created_at 
            FROM projects 
            WHERE featured = TRUE 
            ORDER BY created_at DESC 
            LIMIT 6";
    
    $result = $conn->query($sql);
    
    if (!$result) {
        sendResponse(RESPONSE_SERVER_ERROR, "Database query failed: " . $conn->error);
    }
    
    $projects = [];
    while ($row = $result->fetch_assoc()) {
        // Parse tech_stack as array
        $row['tech_stack'] = array_map('trim', explode(',', $row['tech_stack']));
        $projects[] = $row;
    }
    
    header('Content-Type: application/json');
    echo json_encode([
        'status' => 'success',
        'message' => 'Featured projects retrieved successfully',
        'data' => $projects,
        'count' => count($projects)
    ]);
    exit;
}

/**
 * Get single project detail
 * @param int $id - Project ID
 */
function getProjectDetail($id) {
    if (empty($id) || !is_numeric($id)) {
        sendResponse(RESPONSE_BAD_REQUEST, "Invalid project ID");
    }
    
    global $conn;
    
    $sql = "SELECT id, title, description, tech_stack, url, github_url, image_url, start_date, end_date, featured, created_at 
            FROM projects 
            WHERE id = ?";
    
    $stmt = $conn->prepare($sql);
    if (!$stmt) {
        sendResponse(RESPONSE_SERVER_ERROR, "Prepare failed: " . $conn->error);
    }
    
    $stmt->bind_param("i", $id);
    
    if (!$stmt->execute()) {
        sendResponse(RESPONSE_SERVER_ERROR, "Execute failed: " . $stmt->error);
    }
    
    $result = $stmt->get_result();
    
    if ($result->num_rows === 0) {
        sendResponse(RESPONSE_BAD_REQUEST, "Project not found");
    }
    
    $project = $result->fetch_assoc();
    $project['tech_stack'] = array_map('trim', explode(',', $project['tech_stack']));
    
    $stmt->close();
    
    header('Content-Type: application/json');
    echo json_encode([
        'status' => 'success',
        'message' => 'Project details retrieved successfully',
        'data' => $project
    ]);
    exit;
}
?>
