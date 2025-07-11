# SSL/TLS Configuration for Claude Code Primer

## Overview
This document outlines the SSL/TLS configuration for the Claude Code Primer website deployed on Cloudflare Pages.

## Current Configuration

### 1. SSL Certificate
- **Provider**: Cloudflare Pages (Automatic)
- **Certificate Type**: Universal SSL Certificate
- **Encryption**: TLS 1.3 with TLS 1.2 fallback
- **Domain**: `claude-code-primer.franzai.com`
- **Coverage**: Full SSL/TLS encryption

### 2. Security Settings
- **SSL/TLS Mode**: Full (strict)
- **Minimum TLS Version**: TLS 1.2
- **HSTS**: Enabled with max-age=31536000 (1 year)
- **HSTS Preload**: Enabled
- **HSTS Include Subdomains**: Enabled

### 3. Security Headers
The following security headers are configured:
- `Strict-Transport-Security: max-age=31536000; includeSubDomains; preload`
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`
- `Referrer-Policy: strict-origin-when-cross-origin`

## Cloudflare Configuration

### DNS Settings
```
Type: CNAME
Name: claude-code-primer
Target: franzenzenhofer.github.io
Proxy: Enabled (orange cloud)
```

### Page Rules
1. **HTTPS Redirect**
   - URL: `http://claude-code-primer.franzai.com/*`
   - Setting: Always Use HTTPS

2. **Security Headers**
   - Applied via `_headers` file in repository root
   - Headers automatically applied to all responses

### SSL/TLS Settings in Cloudflare
1. **SSL/TLS Mode**: Full (strict)
2. **Edge Certificates**: 
   - Universal SSL: Active
   - Always Use HTTPS: On
   - HTTP Strict Transport Security (HSTS): On
   - Minimum TLS Version: 1.2
   - Opportunistic Encryption: On
   - TLS 1.3: On

## Testing SSL Configuration

### SSL Labs Test
Target: A+ rating
- Test URL: https://www.ssllabs.com/ssltest/
- Expected Results:
  - Certificate: 100%
  - Protocol Support: 95%+
  - Key Exchange: 90%+
  - Cipher Strength: 90%+

### Manual Testing Commands
```bash
# Test SSL certificate
openssl s_client -connect claude-code-primer.franzai.com:443 -servername claude-code-primer.franzai.com

# Test security headers
curl -I https://claude-code-primer.franzai.com

# Test HSTS
curl -I https://claude-code-primer.franzai.com | grep -i strict-transport-security
```

## Security Best Practices Implemented

1. **Perfect Forward Secrecy (PFS)**
   - Enabled through Cloudflare's SSL configuration
   - Uses ECDHE key exchange

2. **HTTP/2 Support**
   - Enabled by default on Cloudflare Pages
   - Improves performance and security

3. **Certificate Transparency**
   - All certificates logged to CT logs
   - Monitored through Cloudflare's system

4. **Automatic Certificate Renewal**
   - Cloudflare handles certificate lifecycle
   - No manual intervention required

## Monitoring and Maintenance

### Certificate Monitoring
- Cloudflare automatically monitors certificate expiration
- Alerts configured for any SSL-related issues
- Certificate transparency logs monitored

### Security Monitoring
- Regular SSL Labs tests (monthly)
- Security header validation
- HSTS compliance checks

## Troubleshooting

### Common Issues
1. **Mixed Content Warnings**
   - Ensure all resources load over HTTPS
   - Check for hardcoded HTTP URLs

2. **Certificate Validation Errors**
   - Verify Cloudflare proxy is enabled
   - Check DNS propagation

3. **HSTS Issues**
   - Clear browser HSTS cache if needed
   - Verify header configuration

### Support Contacts
- **Cloudflare Support**: Available through Cloudflare dashboard
- **Primary Contact**: privacy@franzai.com

## Compliance Status

### Standards Compliance
- ✅ TLS 1.3 Support
- ✅ Perfect Forward Secrecy
- ✅ HSTS Implementation
- ✅ Certificate Transparency
- ✅ HTTP/2 Support

### Security Ratings
- **SSL Labs**: Target A+ rating
- **Mozilla Observatory**: Target A+ rating
- **Security Headers**: All recommended headers implemented

## Update History
- **2025-07-11**: Initial SSL/TLS configuration documented
- **2025-07-11**: Security headers implemented
- **2025-07-11**: HSTS preload enabled