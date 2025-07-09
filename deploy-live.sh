#!/bin/bash

# Deploy to Hetzner server script

SERVER="91.99.153.175"
USER="franz"
REMOTE_DIR="/var/www/claude-code-primer"

echo "🚀 Deploying Claude Code Primer to live server..."

# Run tests first
echo "🧪 Running tests..."
npm test
if [ $? -ne 0 ]; then
    echo "❌ Tests failed! Aborting deployment."
    exit 1
fi

# Run Playwright tests
echo "🎭 Running Playwright tests..."
node playwright-tests.js
if [ $? -ne 0 ]; then
    echo "❌ Playwright tests failed! Aborting deployment."
    exit 1
fi

# Create deployment package
echo "📦 Creating deployment package..."
tar -czf primer-deploy.tar.gz \
    *.html \
    *.css \
    *.js \
    screenshots/ \
    --exclude node_modules \
    --exclude .git

# Deploy to server
echo "📤 Deploying to server..."
scp primer-deploy.tar.gz $USER@$SERVER:/tmp/

# Extract on server
ssh $USER@$SERVER << 'ENDSSH'
    sudo mkdir -p /var/www/claude-code-primer
    sudo tar -xzf /tmp/primer-deploy.tar.gz -C /var/www/claude-code-primer
    sudo chown -R www-data:www-data /var/www/claude-code-primer
    sudo chmod -R 755 /var/www/claude-code-primer
    rm /tmp/primer-deploy.tar.gz
    
    # Configure nginx if needed
    if [ ! -f /etc/nginx/sites-available/claude-primer ]; then
        sudo tee /etc/nginx/sites-available/claude-primer > /dev/null << 'NGINX'
server {
    listen 80;
    server_name 91.99.153.175;
    root /var/www/claude-code-primer;
    index index.html;
    
    location / {
        try_files $uri $uri/ =404;
    }
    
    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    
    # Cache static assets
    location ~* \.(jpg|jpeg|png|gif|css|js)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
NGINX
        sudo ln -sf /etc/nginx/sites-available/claude-primer /etc/nginx/sites-enabled/
        sudo nginx -t && sudo systemctl reload nginx
    fi
ENDSSH

# Clean up
rm primer-deploy.tar.gz

# Test live site
echo "🔍 Testing live site..."
curl -I http://$SERVER/index.html

echo "✅ Deployment complete!"
echo "🌐 Live at: http://$SERVER/"