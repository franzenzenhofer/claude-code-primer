/**
 * Cookie Consent Banner for Claude Code Primer
 * Simple privacy notice banner for compliance with GDPR/CCPA
 */

(function() {
    'use strict';
    
    // Check if consent has already been given
    const CONSENT_KEY = 'claude-primer-privacy-consent';
    const CONSENT_VERSION = '1.0';
    
    function hasConsent() {
        try {
            const consent = localStorage.getItem(CONSENT_KEY);
            return consent === CONSENT_VERSION;
        } catch (e) {
            return false;
        }
    }
    
    function setConsent() {
        try {
            localStorage.setItem(CONSENT_KEY, CONSENT_VERSION);
        } catch (e) {
            // LocalStorage not available, continue anyway
        }
    }
    
    function createConsentBanner() {
        const banner = document.createElement('div');
        banner.id = 'privacy-consent-banner';
        banner.innerHTML = `
            <div style="
                position: fixed;
                bottom: 0;
                left: 0;
                right: 0;
                background: #2c3e50;
                color: white;
                padding: 15px 20px;
                box-shadow: 0 -2px 10px rgba(0,0,0,0.1);
                z-index: 10000;
                font-family: Georgia, 'Times New Roman', serif;
                font-size: 14px;
                line-height: 1.4;
            ">
                <div style="max-width: 1200px; margin: 0 auto; display: flex; align-items: center; gap: 20px; flex-wrap: wrap;">
                    <div style="flex: 1; min-width: 300px;">
                        <strong>Privacy Notice:</strong> This website does not use cookies or tracking. 
                        We only collect basic server logs for security. 
                        <a href="/privacy-policy.html" style="color: #3498db; text-decoration: underline;">Read our Privacy Policy</a>
                    </div>
                    <div style="flex-shrink: 0;">
                        <button id="privacy-accept-btn" style="
                            background: #3498db;
                            color: white;
                            border: none;
                            padding: 8px 16px;
                            border-radius: 4px;
                            cursor: pointer;
                            font-size: 14px;
                            font-weight: bold;
                        ">
                            Got it
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(banner);
        
        // Add click handler
        const acceptBtn = document.getElementById('privacy-accept-btn');
        acceptBtn.addEventListener('click', function() {
            setConsent();
            banner.style.transform = 'translateY(100%)';
            banner.style.transition = 'transform 0.3s ease';
            setTimeout(() => {
                banner.remove();
            }, 300);
        });
        
        // Add hover effect
        acceptBtn.addEventListener('mouseover', function() {
            this.style.backgroundColor = '#2980b9';
        });
        
        acceptBtn.addEventListener('mouseout', function() {
            this.style.backgroundColor = '#3498db';
        });
    }
    
    // Initialize when DOM is ready
    function init() {
        if (!hasConsent()) {
            createConsentBanner();
        }
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();