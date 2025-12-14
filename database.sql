-- ===============================================
-- Portfolio Website Database Schema
-- ===============================================
-- This file contains the complete SQL schema for the portfolio website
-- Import this file into phpMyAdmin to create all tables and sample data
-- ===============================================

-- Create Database
CREATE DATABASE IF NOT EXISTS portfolio_db;
USE portfolio_db;

-- ===============================================
-- CONTACTS TABLE
-- ===============================================
-- Stores contact form submissions
CREATE TABLE IF NOT EXISTS contacts (
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
    INDEX idx_created_at (created_at),
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ===============================================
-- PROJECTS TABLE
-- ===============================================
-- Stores portfolio projects
CREATE TABLE IF NOT EXISTS projects (
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ===============================================
-- PORTFOLIO_SETTINGS TABLE
-- ===============================================
-- Stores portfolio configuration and settings
CREATE TABLE IF NOT EXISTS portfolio_settings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    setting_key VARCHAR(100) UNIQUE NOT NULL,
    setting_value TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ===============================================
-- SAMPLE DATA
-- ===============================================

-- Sample Contact (for testing)
INSERT INTO contacts (name, email, phone, subject, message) VALUES 
('John Doe', 'john@example.com', '+1 (555) 123-4567', 'Website Inquiry', 'I would like to discuss a potential project collaboration.');

-- Sample Projects
INSERT INTO projects (title, description, tech_stack, featured, start_date, end_date) VALUES 
('Personal Portfolio Website', 
 'A responsive portfolio website built with HTML5, CSS3, JavaScript, PHP and MySQL. Features a contact form integrated with PHP and MySQL backend, responsive design with media queries, and smooth animations.',
 'HTML5, CSS3, JavaScript, PHP, MySQL',
 TRUE,
 '2025-01-01',
 '2025-12-31'),

('Task Management System',
 'A full-stack task management application with user authentication, CRUD operations, real-time updates, and a clean, intuitive user interface for productivity management.',
 'PHP, MySQL, JavaScript, CSS3',
 TRUE,
 '2024-06-01',
 '2024-11-30'),

('E-Commerce Platform',
 'A complete e-commerce solution with product catalog, shopping cart, checkout system, and admin dashboard for managing inventory and orders.',
 'HTML5, CSS3, JavaScript, PHP, MySQL',
 TRUE,
 '2024-01-01',
 '2024-05-31'),

('Blog Platform',
 'A dynamic blogging platform with post management, comments system, and user authentication for content creators.',
 'PHP, MySQL, JavaScript',
 FALSE,
 '2023-09-01',
 '2023-12-31'),

('Weather Dashboard',
 'Real-time weather information application with location-based forecasts and interactive maps.',
 'JavaScript, HTML5, CSS3, API Integration',
 FALSE,
 '2023-05-01',
 '2023-08-31');

-- Sample Settings
INSERT INTO portfolio_settings (setting_key, setting_value) VALUES 
('site_name', 'Professional Portfolio'),
('site_description', 'Full-stack web developer portfolio'),
('author_name', 'Your Name'),
('author_email', 'your.email@example.com'),
('github_url', 'https://github.com/your-username'),
('linkedin_url', 'https://linkedin.com/in/your-profile'),
('twitter_url', 'https://twitter.com/your-handle');

-- ===============================================
-- INDEX VERIFICATION
-- ===============================================
-- The following queries can be used to verify indexes are working:
-- SHOW INDEX FROM contacts;
-- SHOW INDEX FROM projects;

-- ===============================================
-- QUERY EXAMPLES FOR DEVELOPMENT
-- ===============================================

-- Get all unread contacts
-- SELECT * FROM contacts WHERE status = 'new' ORDER BY created_at DESC;

-- Get featured projects
-- SELECT * FROM projects WHERE featured = TRUE ORDER BY created_at DESC;

-- Get contacts from specific date range
-- SELECT * FROM contacts WHERE created_at BETWEEN '2025-01-01' AND '2025-12-31';

-- Count total projects
-- SELECT COUNT(*) as total_projects FROM projects;

-- Get projects by technology
-- SELECT * FROM projects WHERE tech_stack LIKE '%PHP%';

-- ===============================================
-- MAINTENANCE QUERIES
-- ===============================================

-- Backup query (export data)
-- SELECT * INTO OUTFILE '/path/to/backup.csv' FIELDS TERMINATED BY ',' FROM contacts;

-- Clean old archived contacts (older than 6 months)
-- DELETE FROM contacts WHERE status = 'archived' AND created_at < DATE_SUB(NOW(), INTERVAL 6 MONTH);

-- Update all old projects as archived
-- UPDATE projects SET featured = FALSE WHERE created_at < DATE_SUB(NOW(), INTERVAL 1 YEAR);

-- ===============================================
-- SECURITY NOTES
-- ===============================================
-- 1. Always use prepared statements in PHP to prevent SQL injection
-- 2. Sanitize user input before storing in database
-- 3. Use proper character encoding (utf8mb4)
-- 4. Create regular backups of database
-- 5. Use strong database password (not 'root' on production)
-- 6. Implement proper authentication for admin panel
-- 7. Enable HTTPS for production deployment

-- ===============================================
-- END OF DATABASE SCHEMA
-- ===============================================
