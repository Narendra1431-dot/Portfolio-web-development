# Quick Start Guide - Portfolio Website

Get started in 5 minutes!

## 🚀 Super Quick Setup

### 1. Download & Install XAMPP
Visit: https://www.apachefriends.org/
Choose your OS (Windows, Mac, or Linux)

### 2. Copy Project
Copy the `portfolio-website` folder to:
- **Windows**: `C:\xampp\htdocs\`
- **Mac**: `/Applications/XAMPP/xamppfiles/htdocs/`
- **Linux**: `/opt/lampp/htdocs/`

### 3. Start Services
Open XAMPP Control Panel and click "Start":
- ✓ Apache
- ✓ MySQL

### 4. Create Database
Option A - Automatic (Recommended):
1. Open browser: `http://localhost/portfolio-website/php/database.php`
2. Done! Tables created automatically

Option B - Manual (phpMyAdmin):
1. Open: `http://localhost/phpmyadmin`
2. Create new database: `portfolio_db`
3. Run SQL from `database.sql` file

### 5. Visit Website
Open: `http://localhost/portfolio-website/`

**That's it! 🎉**

---

## 🧪 Quick Test

### Test Contact Form
1. Scroll to Contact section
2. Fill out form
3. Click "Send Message"
4. Should see success message
5. View messages at: `http://localhost/portfolio-website/admin_contacts.php`

### Test Responsive Design
1. Open in browser
2. Press F12 (DevTools)
3. Click device toggle (top-left)
4. Select different devices to see responsive design

---

## 📝 Quick Customization

### Change Your Name
Edit `index.html` - Line ~30:
```html
<p class="hero-subtitle">Your Name Here | Your Title</p>
```

### Change Colors
Edit `css/style.css` - Lines 7-20:
```css
--primary-color: #2c3e50;      /* Change this */
--secondary-color: #3498db;    /* And this */
```

### Update Contact Info
Edit `index.html` - Search for contact section and update:
- Email
- Phone
- Location
- Social links

### Add Your Projects
Edit `index.html` - Find projects section and modify:
- Project title
- Description
- Technologies used

---

## 🔍 File Locations

| What | Where |
|------|-------|
| Main Page | `index.html` |
| Styling | `css/style.css` |
| JavaScript | `js/script.js` |
| Contact Form | `php/contact.php` |
| Database Config | `php/config.php` |
| View Messages | `admin_contacts.php` |

---

## ⚠️ Common Issues & Fixes

### "Page Not Found (404)"
- Check project is in correct htdocs folder
- Verify Apache is running
- Try: `http://localhost/portfolio-website/`

### "Database Connection Failed"
- Check MySQL is running in XAMPP
- Create database: `portfolio_db`
- Run database setup script

### "CSS Not Loading"
- Check if Apache is running
- Clear browser cache (Ctrl+Shift+Delete)
- Check file paths in HTML

### "Contact Form Not Working"
- Verify MySQL is running
- Check database exists
- Check browser console (F12) for errors
- Verify table structure exists

---

## 📚 Documentation Files

| File | Purpose |
|------|---------|
| README.md | Full documentation |
| SETUP.md | Detailed setup guide |
| TESTING.html | Testing checklist |
| DEPLOYMENT.md | Deployment guide |
| PROJECT_SUMMARY.md | Project overview |

---

## 🎯 Next Steps

After setup:
1. ✓ Test the contact form
2. ✓ Check responsive design
3. ✓ View admin panel
4. ✓ Customize content
5. ✓ Add your information
6. ✓ Deploy to server

---

## 💡 Pro Tips

### Enable Form Emails
In `php/contact.php`, uncomment line:
```php
sendConfirmationEmail($email, $name);
```

### Add More Projects
Insert into database:
```sql
INSERT INTO projects (title, description, tech_stack, featured) 
VALUES ('Your Project', 'Description', 'HTML5, CSS3', TRUE);
```

### Customize Colors
Update CSS variables:
- Primary: Dark blue
- Secondary: Light blue
- Accent: Red

### Mobile Testing
Use Chrome DevTools:
1. Press F12
2. Click phone icon
3. Select device

---

## ✅ Success Checklist

- [ ] XAMPP installed and running
- [ ] Project copied to htdocs
- [ ] Apache and MySQL started
- [ ] Database created
- [ ] Website loads at localhost
- [ ] Contact form works
- [ ] Admin panel shows messages
- [ ] Responsive design works
- [ ] Ready to customize!

---

## 🆘 Need Help?

### Check These First
1. XAMPP Control Panel - Both running?
2. Database exists: `portfolio_db`?
3. Browser console (F12) - Any errors?
4. Server error log (XAMPP folder)

### Read Documentation
- Full docs: README.md
- Setup issues: SETUP.md
- Testing guide: TESTING.html

### Search Online
- Google: "XAMPP [error message]"
- Stack Overflow: Tag "xampp"
- PHP Docs: https://www.php.net/

---

## 🚀 Ready to Deploy?

When ready to go live:

1. **GitHub Pages** (Static only):
   - Best for: Learning, portfolios without backend
   - Time: 5 minutes
   - Cost: Free

2. **Shared Hosting** (Full stack):
   - Best for: Production use
   - Time: 30 minutes
   - Cost: $5-15/month

See `DEPLOYMENT.md` for full instructions.

---

## 🎓 Learning Resources

- HTML5 Tutorial: https://www.w3schools.com/html/
- CSS3 Guide: https://www.w3schools.com/css/
- JavaScript Basics: https://javascript.info/
- PHP Manual: https://www.php.net/manual/
- MySQL Guide: https://dev.mysql.com/doc/

---

## 🎉 You're All Set!

Your portfolio website is ready to use.

**Start with**: `http://localhost/portfolio-website/`

**Enjoy! 🚀**

---

**Last Updated**: December 2025  
**Version**: 1.0.0
