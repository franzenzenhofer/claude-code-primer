# Cloudflare Custom Domain Setup for claude-code-primer.franzai.com

## Current Status
✅ **Site is LIVE at**: https://claude-code-primer.pages.dev

## Manual Steps Required (via Cloudflare Dashboard)

1. **Login to Cloudflare Dashboard**
   - Go to: https://dash.cloudflare.com
   - Login with your credentials

2. **Navigate to Pages**
   - Click on "Pages" in the left sidebar
   - Find and click on "claude-code-primer" project

3. **Add Custom Domain**
   - Go to "Custom domains" tab
   - Click "Set up a custom domain"
   - Enter: `claude-code-primer.franzai.com`
   - Click "Continue"

4. **DNS Configuration** (Automatic)
   - Cloudflare will automatically create a CNAME record:
     - Name: `claude-code-primer`
     - Target: `claude-code-primer.pages.dev`
   - Since franzai.com is already on Cloudflare, this will be instant

5. **SSL Certificate** (Automatic)
   - Cloudflare will automatically provision an SSL certificate
   - This usually takes 1-5 minutes

## Alternative: Using API (Advanced)

If you have API access, you can use:
```bash
# Get API Token from: https://dash.cloudflare.com/profile/api-tokens
# Need permissions: Zone:DNS:Edit, Account:Cloudflare Pages:Edit

curl -X POST "https://api.cloudflare.com/client/v4/zones/{zone_id}/dns_records" \
  -H "Authorization: Bearer {api_token}" \
  -H "Content-Type: application/json" \
  -d '{
    "type": "CNAME",
    "name": "claude-code-primer",
    "content": "claude-code-primer.pages.dev",
    "proxied": true
  }'
```

## Verification
Once setup is complete, the book will be accessible at:
- **Primary URL**: https://claude-code-primer.franzai.com
- **Pages URL**: https://claude-code-primer.pages.dev

Both URLs will work and serve the same content.