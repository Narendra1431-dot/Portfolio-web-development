<<<<<<< HEAD
# Professional Portfolio Website

A fully responsive personal portfolio website built with **HTML5**, **CSS3**, **JavaScript**, **PHP**, and **MySQL**. Includes contact form integration, project showcase, skills section, and local server deployment.

## 🚀 Features

- **Semantic HTML5** - Proper structure with accessibility features
- **Responsive Design** - Mobile-first approach with Flexbox and CSS Grid
- **Advanced CSS** - Animations, gradients, and smooth transitions
- **JavaScript DOM Manipulation** - Form validation, smooth scrolling, animations
- **PHP Backend** - Form handling with GET/POST, error handling
- **MySQL Database** - Contact data storage with proper schema
- **Local Hosting** - Works with XAMPP/WAMP/LAMP servers
- **Version Control** - Git integration with meaningful commits
- **Deployment Ready** - Static pages deployable to GitHub Pages

## 📋 Project Structure

```
portfolio-website/
├── index.html                 # Main portfolio page
├── admin_contacts.php         # Admin panel for viewing messages
├── css/
│   └── style.css             # Responsive styles with Grid/Flexbox
├── js/
│   └── script.js             # Form validation and DOM manipulation
├── php/
│   ├── config.php            # Database configuration and helpers
│   ├── contact.php           # Contact form handler
│   ├── database.php          # Database setup script
│   └── api_projects.php      # Projects API endpoints
├── README.md                 # This file
└── .gitignore               # Git ignore file
```

## ⚙️ Setup Instructions

### Prerequisites
- **PHP 7.2+** installed
- **MySQL 5.7+** installed
- **XAMPP/WAMP/LAMP** or similar local server
- **Git** installed for version control
- **GitHub Account** for repository hosting

### Local Setup

#### 1. **Install and Configure XAMPP** (or WAMP/LAMP)

```bash
# Download from https://www.apachefriends.org/
# Install XAMPP with PHP and MySQL enabled
```

#### 2. **Clone or Extract Project**

```bash
# Clone from GitHub (if using version control)
git clone https://github.com/your-username/portfolio-website.git

# Or extract the project folder to htdocs
# Copy project to: C:\xampp\htdocs\portfolio-website (Windows)
#              or /Applications/XAMPP/htdocs/portfolio-website (Mac)
#              or /opt/lampp/htdocs/portfolio-website (Linux)
```

#### 3. **Start XAMPP Services**

- Open XAMPP Control Panel
- Click "Start" for Apache
- Click "Start" for MySQL

#### 4. **Setup Database**

```bash
# Option 1: Using phpMyAdmin
# 1. Open http://localhost/phpmyadmin
# 2. Run the SQL from php/database.php or:
# 3. Create the database and tables manually

# Option 2: Using the setup script
# 1. Place php/database.php in project root
# 2. Navigate to: http://localhost/portfolio-website/php/database.php
# 3. Refresh the page to execute setup
```

#### 5. **Access the Website**

```bash
# Open in browser
http://localhost/portfolio-website/

# View contact messages
http://localhost/portfolio-website/admin_contacts.php
```

## 📝 Configuration

### Database Configuration (php/config.php)

```php
$servername = "localhost";
$username = "root";
$password = "";              // Default for local XAMPP
$dbname = "portfolio_db";
```

### Email Settings

To enable email notifications, update contact.php:

```php
// Uncomment in contact.php line ~55
// sendConfirmationEmail($email, $name);
```

## 🗄️ Database Schema

### `contacts` table
```sql
- id (INT, PRIMARY KEY)
- name (VARCHAR 100)
- email (VARCHAR 100)
- phone (VARCHAR 20, optional)
- subject (VARCHAR 150)
- message (TEXT)
- status (ENUM: new, read, archived)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

### `projects` table
```sql
- id (INT, PRIMARY KEY)
- title (VARCHAR 150)
- description (TEXT)
- tech_stack (VARCHAR 255)
- url (VARCHAR 255)
- github_url (VARCHAR 255)
- image_url (VARCHAR 255)
- start_date (DATE)
- end_date (DATE)
- featured (BOOLEAN)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

## 🔧 Features Implemented

### HTML5 & Semantic Structure
- Proper DOCTYPE and meta tags
- Semantic elements (header, nav, main, section, article, aside, footer)
- ARIA labels and roles for accessibility
- Form with fieldset and legend

### CSS3 & Responsive Design
- CSS Variables for easy customization
- Flexbox for navigation and layouts
- CSS Grid for projects and skills sections
- Media queries for mobile (480px), tablet (768px), and desktop
- Smooth animations and transitions
- Gradient backgrounds

### JavaScript Features
- **Form Validation**
  - Real-time field validation
  - Email format checking
  - Phone number validation
  - Min length requirements
  
- **DOM Manipulation**
  - Smooth scrolling
  - Active navigation link highlighting
  - Error message display
  - Form reset on success
  
- **User Experience**
  - Scroll animations with Intersection Observer
  - Form data persistence using localStorage
  - Loading effects
  - Debounced scroll handlers for performance

### PHP Backend
- Database connection with error handling
- Input sanitization and validation
- Prepared statements for SQL injection prevention
- Custom response functions
- Email validation
- Error logging

### MySQL Integration
- Proper database schema with indexes
- Foreign key relationships (ready)
- Timestamps for tracking
- Status management

## 🔒 Security Features

- **Input Sanitization**: `htmlspecialchars()` and `trim()`
- **SQL Injection Prevention**: Prepared statements with bind_param
- **XSS Prevention**: Output encoding
- **Email Validation**: Filter_var and regex patterns
- **Error Logging**: Server-side error logging
- **HTTPS Ready**: Can be deployed with SSL/TLS

## 📱 Responsive Breakpoints

- **Desktop**: 1200px and above
- **Tablet**: 768px to 1199px
- **Mobile**: Below 768px
- **Small Mobile**: 480px and below

## 🎨 Customization

### Colors (CSS Variables)
Edit the `:root` section in `css/style.css`:

```css
:root {
    --primary-color: #2c3e50;
    --secondary-color: #3498db;
    --accent-color: #e74c3c;
    --success-color: #27ae60;
    /* ... more variables */
}
```

### Content
Edit `index.html` to update:
- Your name and title
- About section
- Skills
- Projects
- Contact information

## 🚀 Deployment

### GitHub Pages (Static Content)

1. **Create GitHub Repository**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Portfolio website"
   git remote add origin https://github.com/your-username/portfolio-website.git
   git push -u origin main
   ```

2. **Enable GitHub Pages**
   - Go to repository Settings → Pages
   - Select Source: main branch / root folder
   - Save

3. **Access Static Site**
   - Visit: `https://your-username.github.io/portfolio-website/`
   - Only HTML, CSS, JS will work (no PHP/MySQL)

### Full Stack Deployment (Heroku/Shared Hosting)

For full PHP + MySQL functionality:
- Use shared hosting (Bluehost, HostGator, etc.)
- Or use Heroku with ClearDB for MySQL
- Update `config.php` with production credentials
- Enable HTTPS

## 📊 API Endpoints

### Get Featured Projects
```
GET /php/api_projects.php?action=featured
Response: JSON with featured projects
```

### Get All Projects
```
GET /php/api_projects.php?action=all
Response: JSON with all projects
```

### Get Project Details
```
GET /php/api_projects.php?action=detail&id=1
Response: JSON with specific project details
```

## 🧪 Testing

### Form Validation Testing
1. Submit empty form → See required field errors
2. Enter invalid email → See email format error
3. Enter short message → See length error
4. Fill correctly → Form submits successfully

### Database Testing
1. Check `admin_contacts.php` for submissions
2. View `phpMyAdmin` for raw data
3. Test API endpoints with Postman

### Responsive Testing
1. Test on different screen sizes
2. Use browser DevTools (F12)
3. Test on mobile devices

## 📈 Future Enhancements

- [ ] Admin authentication system
- [ ] Email notifications for form submissions
- [ ] Blog section with dynamic posts
- [ ] Project portfolio with filters
- [ ] Dark mode toggle
- [ ] Multi-language support
- [ ] Google Analytics integration
- [ ] SEO optimization
- [ ] CDN integration for assets

## 📝 Git Workflow

Initial commits made:
1. Project structure setup
2. HTML semantic markup
3. Advanced CSS styling
4. JavaScript functionality
5. PHP backend implementation
6. Database schema
7. API endpoints
8. Admin panel
9. Documentation
10. Deployment configuration

## 🤝 Contributing

To contribute:
1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

**Your Name**
- Portfolio: [https://your-username.github.io/portfolio-website/](https://your-username.github.io/portfolio-website/)
- GitHub: [https://github.com/your-username](https://github.com/your-username)
- Email: your.email@example.com

## 📞 Support

For issues or questions:
1. Check existing GitHub issues
2. Create a new issue with detailed description
3. Include error messages and screenshots
4. Specify your setup (OS, PHP version, MySQL version)

## 📚 Resources

- [MDN Web Docs](https://developer.mozilla.org/)
- [PHP Official Documentation](https://www.php.net/docs.php)
- [MySQL Documentation](https://dev.mysql.com/doc/)
- [CSS Tricks](https://css-tricks.com/)
- [JavaScript.info](https://javascript.info/)

---

**Last Updated**: December 2025
**Version**: 1.0.0
=======
# Portfolio-web-development
>>>>>>> 53e1d949a03c52bfdddd00dbab6e55ab22d50d84
