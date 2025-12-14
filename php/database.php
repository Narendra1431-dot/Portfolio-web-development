<?php
/**
 * Database Setup Script
 * Creates database and tables for portfolio website
 * Run this file once to initialize the database
 */

$servername = "localhost";
$username = "root";
$password = "";

// Create connection without database
$conn = new mysqli($servername, $username, $password);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Create database
$sql = "CREATE DATABASE IF NOT EXISTS portfolio_db";
if ($conn->query($sql) === TRUE) {
    echo "Database created successfully or already exists.<br>";
} else {
    echo "Error creating database: " . $conn->error . "<br>";
}

// Select database
$conn->select_db("portfolio_db");

// Create contacts table
$createContactsTable = "CREATE TABLE IF NOT EXISTS contacts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    subject VARCHAR(150) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    status ENUM('new', 'read', 'archived') DEFAULT 'new',
    INDEX idx_email (email),
    INDEX idx_created_at (created_at)
)";

if ($conn->query($createContactsTable) === TRUE) {
    echo "Contacts table created successfully or already exists.<br>";
} else {
    echo "Error creating contacts table: " . $conn->error . "<br>";
}

// Create projects table
$createProjectsTable = "CREATE TABLE IF NOT EXISTS projects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    tech_stack VARCHAR(255),
    url VARCHAR(255),
    github_url VARCHAR(255),
    image_url VARCHAR(255),
    start_date DATE,
    end_date DATE,
    featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_featured (featured),
    INDEX idx_created_at (created_at)
)";

if ($conn->query($createProjectsTable) === TRUE) {
    echo "Projects table created successfully or already exists.<br>";
} else {
    echo "Error creating projects table: " . $conn->error . "<br>";
}

// Create portfolio_settings table
$createSettingsTable = "CREATE TABLE IF NOT EXISTS portfolio_settings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    setting_key VARCHAR(100) UNIQUE NOT NULL,
    setting_value TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)";

if ($conn->query($createSettingsTable) === TRUE) {
    echo "Settings table created successfully or already exists.<br>";
} else {
    echo "Error creating settings table: " . $conn->error . "<br>";
}

// Insert sample data if tables are empty
$checkContacts = $conn->query("SELECT COUNT(*) as count FROM contacts");
$row = $checkContacts->fetch_assoc();

if ($row['count'] == 0) {
    $sampleContact = "INSERT INTO contacts (name, email, phone, subject, message) VALUES 
    ('John Doe', 'john@example.com', '+1234567890', 'Website Inquiry', 'I would like to discuss a potential project.')";
    
    if ($conn->query($sampleContact) === TRUE) {
        echo "Sample contact inserted successfully.<br>";
    }
}

// Insert sample projects if empty
$checkProjects = $conn->query("SELECT COUNT(*) as count FROM projects");
$row = $checkProjects->fetch_assoc();

if ($row['count'] == 0) {
    $sampleProject = "INSERT INTO projects (title, description, tech_stack, featured) VALUES 
    ('Personal Portfolio Website', 'A responsive portfolio website built with HTML5, CSS3, JavaScript, PHP and MySQL', 'HTML5, CSS3, JavaScript, PHP, MySQL', TRUE)";
    
    if ($conn->query($sampleProject) === TRUE) {
        echo "Sample project inserted successfully.<br>";
    }
}

echo "<br><strong>Database setup completed successfully!</strong><br>";
echo "You can now delete this file or keep it for future database resets.<br>";

$conn->close();
?>
