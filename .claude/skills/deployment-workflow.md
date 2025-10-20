# Deployment & Git Workflow

## Purpose
Manage code deployment, version control, and collaboration workflow

## Git Branch Strategy
```
main (production) ← dev (staging) ← feature branches
```

## Common Git Commands

### Check Status
```bash
git status                    # See current changes
git log --oneline -5         # View recent commits
git diff                     # See unstaged changes
```

### Create Feature Branch
```bash
git checkout -b feature/new-feature
# Make changes
git add .
git commit -m "Add new feature"
git push origin feature/new-feature
```

### Merge to Dev
```bash
git checkout dev
git pull origin dev          # Get latest
git merge feature/new-feature
git push origin dev
```

### Deploy to Main
```bash
git checkout main
git pull origin main
git merge dev
git push origin main
```

## Commit Message Format
```
Type: Brief description

- Detail 1
- Detail 2

🤖 Generated with [Claude Code](https://claude.com/claude-code)
Co-Authored-By: Claude <noreply@anthropic.com>
```

### Types:
- `feat:` New feature
- `fix:` Bug fix
- `style:` CSS/formatting changes
- `perf:` Performance improvements
- `docs:` Documentation
- `refactor:` Code restructuring

## Testing Before Deploy

### Local Testing
```bash
# Start local server
python -m http.server 8000
# OR
npx http-server

# Test on:
# - Desktop: Chrome, Firefox, Safari
# - Mobile: iOS Safari, Chrome Android
# - Different screen sizes
```

### Pre-Deploy Checklist
- [ ] All console errors fixed
- [ ] Images optimized (<100KB each)
- [ ] Mobile responsive tested
- [ ] Forms working (WhatsApp links)
- [ ] SEO meta tags updated
- [ ] No broken links

## Deployment to Netlify

### Automatic Deploy (Connected to GitHub)
1. Push to main branch
2. Netlify auto-builds and deploys
3. Check deploy status at app.netlify.com

### Manual Deploy
```bash
# If using Netlify CLI
netlify deploy --prod --dir=.
```

### Environment Files
```
_headers     # HTTP headers config
_redirects   # URL redirects
robots.txt   # Search engine rules
sitemap.xml  # Site structure
```

## Rollback Procedure

### Git Rollback
```bash
# Revert last commit
git revert HEAD
git push

# Reset to specific commit (careful!)
git reset --hard <commit-hash>
git push --force
```

### Netlify Rollback
1. Go to Netlify dashboard
2. Deploys → Select previous deploy
3. Publish deploy

## Performance Monitoring

### Tools
- Lighthouse (Chrome DevTools)
- GTmetrix
- WebPageTest
- Netlify Analytics

### Key Metrics
- First Contentful Paint < 1.5s
- Time to Interactive < 3.5s
- Cumulative Layout Shift < 0.1
- Total Page Size < 2MB

## Emergency Fixes

### Hot Fix Process
```bash
# Create hotfix from main
git checkout main
git checkout -b hotfix/critical-fix

# Fix issue
git add .
git commit -m "hotfix: Fix critical issue"

# Deploy directly to main
git checkout main
git merge hotfix/critical-fix
git push

# Backport to dev
git checkout dev
git merge hotfix/critical-fix
git push
```

## Backup Strategy
- GitHub: Code repository
- Local: Regular git pulls
- Assets: Store in public/images
- Database: N/A (static site)

## Contact for Issues
- Repository: github.com/Heisenberga17/MICROCLEAN
- Deploy Status: Netlify dashboard
- Domain: microcleanpa.com