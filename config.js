/**
 * Portfolio Configuration
 * Easy customization for site content and appearance
 */

const portfolioConfig = {
    // Personal Information
    personal: {
        name: "Your Name",
        title: "Full-Stack Web Developer",
        description: "Building responsive, user-friendly web applications with modern technologies",
        email: "your.email@example.com",
        phone: "+1 (555) 123-4567",
        location: "Your City, Country"
    },

    // Social Links
    social: {
        github: "https://github.com/your-username",
        linkedin: "https://linkedin.com/in/your-profile",
        twitter: "https://twitter.com/your-handle",
        instagram: "https://instagram.com/your-handle"
    },

    // Skills
    skills: {
        frontend: [
            "HTML5",
            "CSS3 (Flexbox, Grid)",
            "JavaScript (ES6+)",
            "Responsive Design",
            "Web Accessibility"
        ],
        backend: [
            "PHP",
            "Form Handling",
            "API Development",
            "Server-side Logic",
            "Security Best Practices"
        ],
        database: [
            "MySQL",
            "Database Design",
            "Query Optimization",
            "Data Security",
            "Backup & Recovery"
        ],
        tools: [
            "Git & GitHub",
            "XAMPP/WAMP",
            "phpMyAdmin",
            "VS Code",
            "DevTools"
        ]
    },

    // Projects (manually add to database for full functionality)
    projects: [
        {
            id: 1,
            title: "Personal Portfolio Website",
            description: "A responsive portfolio website built with HTML5, CSS3, JavaScript, PHP and MySQL. Features a contact form integrated with PHP and MySQL backend, responsive design with media queries, and smooth animations.",
            technologies: ["HTML5", "CSS3", "JavaScript", "PHP", "MySQL"],
            startDate: "2025-01",
            endDate: "2025-12",
            featured: true
        },
        {
            id: 2,
            title: "Task Management System",
            description: "A full-stack task management application with user authentication, CRUD operations, real-time updates, and a clean, intuitive user interface for productivity management.",
            technologies: ["PHP", "MySQL", "JavaScript", "CSS3"],
            startDate: "2024-06",
            endDate: "2024-11",
            featured: true
        },
        {
            id: 3,
            title: "E-Commerce Platform",
            description: "A complete e-commerce solution with product catalog, shopping cart, checkout system, and admin dashboard for managing inventory and orders.",
            technologies: ["HTML5", "CSS3", "JavaScript", "PHP", "MySQL"],
            startDate: "2024-01",
            endDate: "2024-05",
            featured: true
        }
    ],

    // Site Settings
    site: {
        title: "Professional Portfolio",
        description: "Full-stack web developer portfolio showcasing projects and skills",
        keywords: "portfolio, web developer, HTML5, CSS3, JavaScript, PHP, MySQL",
        favicon: "favicon.ico",
        author: "Your Name"
    },

    // Colors (match CSS variables)
    colors: {
        primary: "#2c3e50",
        secondary: "#3498db",
        accent: "#e74c3c",
        success: "#27ae60",
        light: "#f8f9fa",
        dark: "#2c3e50",
        gray: "#95a5a6"
    },

    // API Endpoints
    api: {
        contact: "/php/contact.php",
        projects: "/php/api_projects.php",
        projectDetail: "/php/api_projects.php?action=detail",
        adminPanel: "/admin_contacts.php"
    },

    // Form Settings
    form: {
        fields: {
            name: {
                required: true,
                minLength: 2,
                maxLength: 100,
                pattern: /^[a-zA-Z\s-']+$/
            },
            email: {
                required: true,
                pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            },
            phone: {
                required: false,
                minLength: 10,
                pattern: /^[\d\s\-\+\(\)]{10,}$/
            },
            subject: {
                required: true,
                minLength: 5,
                maxLength: 150
            },
            message: {
                required: true,
                minLength: 10,
                maxLength: 5000
            }
        }
    },

    // Feature Toggles
    features: {
        enableContactForm: true,
        enableBlog: false,
        enableComments: false,
        enableDarkMode: false,
        enableMultiLanguage: false,
        enableAnalytics: false,
        enableNewsletter: false
    },

    // Debug Mode
    debug: {
        enabled: false,
        verbose: false,
        logApiCalls: false
    }
};

// Export for use in JavaScript
if (typeof module !== 'undefined' && module.exports) {
    module.exports = portfolioConfig;
}
