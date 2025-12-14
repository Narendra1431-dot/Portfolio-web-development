# Deployment Checklist

Complete checklist for deploying the portfolio website to production.

## Pre-Deployment

### Code Quality
- [ ] All HTML files validated (no errors)
- [ ] CSS has no unused selectors
- [ ] JavaScript console has no errors
- [ ] PHP files have no syntax errors
- [ ] All images optimized for web
- [ ] Removed all debug code and console.log statements

### Testing
- [ ] Contact form works on desktop
- [ ] Contact form works on tablet
- [ ] Contact form works on mobile
- [ ] Form validation works correctly
- [ ] Database connection verified
- [ ] All API endpoints tested
- [ ] Navigation links work correctly
- [ ] Animations run smoothly

### Security Audit
- [ ] Input validation implemented
- [ ] SQL injection prevented (prepared statements)
- [ ] XSS prevention enabled
- [ ] CSRF tokens (if needed)
- [ ] File upload validation (if applicable)
- [ ] Error messages don't expose sensitive info
- [ ] Database credentials secure
- [ ] PHP version current and secure

### Performance
- [ ] Images compressed
- [ ] CSS and JavaScript minified (optional)
- [ ] Lazy loading enabled (if needed)
- [ ] Cache headers configured
- [ ] CDN considered for assets
- [ ] Page load time acceptable
- [ ] Mobile performance tested

### SEO Preparation
- [ ] Meta tags complete
- [ ] og: tags for social sharing
- [ ] Sitemap created (if needed)
- [ ] Robots.txt configured
- [ ] Structured data added
- [ ] Canonical URLs set

### Documentation
- [ ] README.md updated
- [ ] API documentation complete
- [ ] Setup instructions clear
- [ ] Known issues documented
- [ ] Troubleshooting guide provided

## GitHub Pages Deployment (Static Only)

### Prerequisites
- [ ] GitHub account created
- [ ] Git installed locally
- [ ] Repository created

### Steps
```bash
# 1. Initialize Git
cd portfolio-website
git init

# 2. Add files
git add .

# 3. Commit
git commit -m "Initial commit: Portfolio website v1.0"

# 4. Add remote
git remote add origin https://github.com/YOUR_USERNAME/portfolio-website.git

# 5. Push
git branch -M main
git push -u origin main
```

### Enable GitHub Pages
- [ ] Go to Settings tab
- [ ] Scroll to Pages section
- [ ] Select "main" branch as source
- [ ] Select "root" folder
- [ ] Click Save
- [ ] Wait for deployment (5-10 minutes)
- [ ] Access at: https://YOUR_USERNAME.github.io/portfolio-website/

### Post-Deployment Checks
- [ ] Website accessible
- [ ] CSS loads correctly
- [ ] JavaScript works
- [ ] Images display
- [ ] Links work
- [ ] Mobile responsive
- [ ] No 404 errors
- [ ] Performance acceptable

## Full Stack Deployment (Shared Hosting)

### Choose Hosting
- [ ] Research providers (Bluehost, HostGator, SiteGround, etc.)
- [ ] Check PHP version support (7.2+)
- [ ] Check MySQL version support (5.7+)
- [ ] Verify disk space
- [ ] Check bandwidth limits
- [ ] Review support options

### Upload Files
- [ ] Download FTP/SFTP client
- [ ] Get FTP credentials from hosting
- [ ] Connect to server
- [ ] Upload all files to public_html or www
- [ ] Verify file permissions (644 for files, 755 for directories)

### Database Setup
- [ ] Log into cPanel/Hosting Dashboard
- [ ] Create MySQL database
- [ ] Create database user
- [ ] Import database.sql file
- [ ] Grant all privileges to user
- [ ] Update config.php with new credentials

### SSL Certificate
- [ ] Enable HTTPS (usually free with hosting)
- [ ] Update links to use https://
- [ ] Set up redirects from http:// to https://
- [ ] Verify certificate is valid

### Configuration
- [ ] Update admin_contacts.php access (add authentication)
- [ ] Configure email notifications (if desired)
- [ ] Set up error logging
- [ ] Configure backup routine
- [ ] Test contact form on live site

### Domain Setup
- [ ] Point domain to hosting
- [ ] Update DNS records if needed
- [ ] Wait for DNS propagation (up to 48 hours)
- [ ] Verify domain works

## Post-Deployment

### Monitoring
- [ ] Check error logs daily for first week
- [ ] Monitor contact form submissions
- [ ] Track website analytics
- [ ] Monitor performance metrics
- [ ] Check backup status

### Maintenance
- [ ] Keep PHP updated
- [ ] Keep MySQL updated
- [ ] Regular database backups (weekly)
- [ ] Monitor disk space
- [ ] Review security logs
- [ ] Update contact information if needed

### Improvements
- [ ] Gather user feedback
- [ ] Implement improvements
- [ ] Add new projects as completed
- [ ] Update skills section
- [ ] Improve content
- [ ] Enhance security measures

## Heroku Deployment (Alternative)

### Setup
- [ ] Create Heroku account
- [ ] Install Heroku CLI
- [ ] Create new Heroku app
- [ ] Add ClearDB MySQL addon

### Deploy
```bash
# 1. Create Procfile
echo "web: vendor/bin/heroku-php-apache2" > Procfile

# 2. Create composer.json
# (minimal PHP dependencies)

# 3. Initialize Git (if not done)
git init
git add .
git commit -m "Prepare for Heroku deployment"

# 4. Add Heroku remote
heroku git:remote -a your-app-name

# 5. Deploy
git push heroku main
```

### Configuration
- [ ] Set environment variables in Heroku
- [ ] Update config.php for Heroku database
- [ ] Run database migrations
- [ ] Test on live Heroku app

## Content Updates

- [ ] Update "About Me" section
- [ ] Add your real projects
- [ ] Update contact information
- [ ] Add social media links
- [ ] Update profile photo (if applicable)
- [ ] Add resume/CV link (if desired)
- [ ] Update footer copyright year

## Final Checks

- [ ] All links work
- [ ] Contact form sends emails
- [ ] Mobile version looks good
- [ ] Desktop version looks good
- [ ] Tablet version looks good
- [ ] No console errors
- [ ] Performance acceptable
- [ ] SEO optimized
- [ ] Analytics tracking works
- [ ] Backup system in place

## Rollback Plan

If issues occur after deployment:

1. Keep a backup of previous version
2. Document all changes made
3. Have rollback procedure ready:
   ```bash
   git revert <commit-hash>
   git push origin main
   # or restore from backup
   ```

## Version Control

### Git Workflow
- [ ] Commit messages are descriptive
- [ ] Use feature branches for major changes
- [ ] Pull requests for code review
- [ ] Keep main branch stable
- [ ] Tag releases: `git tag v1.0.0`

### Meaningful Commits
```
feat: Add new feature
fix: Fix bug
docs: Update documentation
style: Format code
refactor: Restructure code
perf: Improve performance
test: Add tests
```

## Long-term Maintenance

### Monthly
- [ ] Review error logs
- [ ] Check analytics
- [ ] Test all features
- [ ] Review security advisories

### Quarterly
- [ ] Update dependencies
- [ ] Review performance metrics
- [ ] Update content
- [ ] Add new projects

### Annually
- [ ] Full security audit
- [ ] Performance optimization
- [ ] Major feature additions
- [ ] Design refresh evaluation

## Support Resources

- PHP Security: https://www.php.net/manual/en/security.php
- OWASP Top 10: https://owasp.org/www-project-top-ten/
- Web Hosting Best Practices: https://developer.mozilla.org/en-US/docs/Learn
- MySQL Security: https://dev.mysql.com/doc/

---

**Last Updated**: December 2025
**Version**: 1.0.0
