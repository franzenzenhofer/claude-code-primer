# Cloudflare Pages Setup Guide

## Manual Setup Steps

1. **Create Cloudflare Pages Project**
   - Go to Cloudflare Dashboard > Pages
   - Click "Create a project"
   - Connect to Git > Select GitHub account
   - Select repository: `franzenzenhofer/claude-code-primer`
   - Project name: `claude-code-primer`

2. **Build Settings**
   - Framework preset: None
   - Build command: (leave empty - we're serving static files)
   - Build output directory: `/`
   - Root directory: `/`

3. **Environment Variables**
   - None required for static site

4. **Custom Domain Setup**
   - After first deployment, go to Custom domains
   - Add custom domain: `claude-code-primer.franzai.com`
   - This will automatically create the CNAME record

## GitHub Secrets Required

Add these secrets to the GitHub repository:
- `CLOUDFLARE_API_TOKEN` - Create at https://dash.cloudflare.com/profile/api-tokens
- `CLOUDFLARE_ACCOUNT_ID` - Found in Cloudflare dashboard

## Alternative: Using Wrangler CLI

```bash
# Install wrangler
npm install -g wrangler

# Login to Cloudflare
wrangler login

# Deploy directly
wrangler pages deploy . --project-name=claude-code-primer
```

## DNS Configuration

The deployment will automatically handle DNS configuration by creating:
- CNAME record: `claude-code-primer` -> `claude-code-primer.pages.dev`

## Files Served

The deployment includes:
- All HTML files (chapters)
- CSS files for styling
- JavaScript files for navigation
- Screenshots for documentation
- index.html as the main entry point