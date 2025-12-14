# XAMPP/WAMP/LAMP Setup Guide for Portfolio Website

## Step-by-Step Setup Instructions

### 1. Download and Install XAMPP

**Windows:**
1. Visit: https://www.apachefriends.org/
2. Download XAMPP (version 8.0 or higher recommended)
3. Run the installer
4. During installation, select:
   - Apache
   - MySQL
   - PHP
   - phpMyAdmin (optional but recommended)

**Mac:**
```bash
# Using Homebrew
brew install xampp

# Or download from https://www.apachefriends.org/
```

**Linux:**
```bash
# Download from https://www.apachefriends.org/
# Make executable and install
chmod +x xampp-linux-x64-VERSION-installer.run
sudo ./xampp-linux-x64-VERSION-installer.run
```

### 2. Start XAMPP Services

**Windows:**
1. Open XAMPP Control Panel
2. Click "Start" next to Apache
3. Click "Start" next to MySQL
4. Wait for both to show "Running" status

**Mac/Linux:**
```bash
sudo /Applications/XAMPP/xamppfiles/xampp start
# or
sudo /opt/lampp/xampp start
```

### 3. Copy Project to htdocs

**Windows:**
```bash
xcopy "C:\Users\YOUR_USERNAME\Desktop\portfolio-website" "C:\xampp\htdocs\portfolio-website" /E /I
```

**Mac:**
```bash
cp -r ~/Desktop/portfolio-website /Applications/XAMPP/xamppfiles/htdocs/
```

**Linux:**
```bash
sudo cp -r ~/Desktop/portfolio-website /opt/lampp/htdocs/
```

### 4. Setup Database

**Method 1: Using phpMyAdmin**
1. Open http://localhost/phpmyadmin
2. Click "New" on the left sidebar
3. Create database named: `portfolio_db`
4. Select the new database
5. Click "SQL" tab
6. Copy and paste the following SQL:

```sql
-- Create contacts table
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
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Create projects table
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Create portfolio_settings table
CREATE TABLE IF NOT EXISTS portfolio_settings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    setting_key VARCHAR(100) UNIQUE NOT NULL,
    setting_value TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Insert sample project
INSERT INTO projects (title, description, tech_stack, featured) VALUES 
('Personal Portfolio Website', 'A responsive portfolio website built with HTML5, CSS3, JavaScript, PHP and MySQL', 'HTML5, CSS3, JavaScript, PHP, MySQL', TRUE);
```

7. Click "Go" to execute

**Method 2: Using Database Setup Script**
1. Copy `php/database.php` to project root or keep it where it is
2. Open: http://localhost/portfolio-website/php/database.php
3. The script will create everything automatically

### 5. Verify Setup

Open your browser and navigate to:
- **Main Site**: http://localhost/portfolio-website/
- **Admin Panel**: http://localhost/portfolio-website/admin_contacts.php
- **phpMyAdmin**: http://localhost/phpmyadmin

### 6. Testing the Contact Form

1. Go to http://localhost/portfolio-website/
2. Scroll to Contact section
3. Fill out the form:
   - Name: John Doe
   - Email: john@example.com
   - Phone: (555) 123-4567
   - Subject: Test Message
   - Message: This is a test message for the portfolio website.
4. Click "Send Message"
5. You should see success message
6. Check admin panel: http://localhost/portfolio-website/admin_contacts.php
7. Your message should appear in the table

## Troubleshooting

### "Connection refused" Error
- Make sure MySQL is running (check XAMPP Control Panel)
- Verify database name in `config.php` matches created database

### "404 Not Found" Error
- Verify project is in correct htdocs folder
- Check file names are correct
- Make sure Apache is running

### Form Not Submitting
- Open browser console (F12) for error messages
- Check PHP error logs in XAMPP
- Verify `contact.php` permissions

### Database Not Found
- Run `php/database.php` to create automatically
- Or manually create tables using phpMyAdmin

### Permission Denied
On Mac/Linux, you may need to set permissions:
```bash
sudo chmod -R 755 /opt/lampp/htdocs/portfolio-website
sudo chown -R nobody:nobody /opt/lampp/htdocs/portfolio-website
```

## File Structure After Setup

```
C:\xampp\htdocs\portfolio-website\
├── index.html
├── admin_contacts.php
├── README.md
├── .gitignore
├── SETUP.md (this file)
├── css/
│   └── style.css
├── js/
│   └── script.js
└── php/
    ├── config.php
    ├── contact.php
    ├── database.php
    └── api_projects.php
```

## Next Steps

1. **Customize Content**: Edit `index.html` with your information
2. **Update Styling**: Modify `css/style.css` colors and fonts
3. **Add Projects**: Insert data into `projects` table
4. **Deploy**: Follow GitHub Pages deployment in README.md

## Support Resources

- XAMPP Documentation: https://www.apachefriends.org/
- MySQL Documentation: https://dev.mysql.com/doc/
- PHP Manual: https://www.php.net/manual/
- Stack Overflow: https://stackoverflow.com/questions/tagged/xampp

---
**Last Updated**: December 2025
