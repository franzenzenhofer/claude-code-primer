#!/bin/bash

echo "🚀 Direct deployment to Hetzner server..."

# Server details
SERVER="91.99.153.175"
USER="franz"
WEBROOT="/var/www/html"

# Create deployment package
echo "📦 Creating deployment package..."
tar -czf /tmp/primer-deploy.tar.gz *.html *.css *.js package.json

echo "📤 Uploading to server..."
echo "Please enter password for $USER@$SERVER when prompted:"

# Upload archive
scp -o StrictHostKeyChecking=no /tmp/primer-deploy.tar.gz $USER@$SERVER:/tmp/

# Extract on server
echo "📂 Extracting files on server..."
ssh -o StrictHostKeyChecking=no $USER@$SERVER "cd $WEBROOT && sudo tar -xzf /tmp/primer-deploy.tar.gz && sudo chown -R www-data:www-data . && sudo systemctl restart nginx"

echo "🧹 Cleaning up..."
rm /tmp/primer-deploy.tar.gz
ssh -o StrictHostKeyChecking=no $USER@$SERVER "rm /tmp/primer-deploy.tar.gz"

echo "✅ Deployment complete!"
echo "🌐 Check live site: http://$SERVER/primer-chapter-02-transformer-v2-cited.html"