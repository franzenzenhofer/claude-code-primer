/**
 * Cookie Consent Manager
 * GDPR/CCPA Compliant Cookie Consent Implementation
 */

class CookieConsentManager {
    constructor() {
        this.cookieName = 'claude-code-primer-consent';
        this.cookieExpiry = 365; // days
        this.consentData = this.getConsentData();
        this.init();
    }

    init() {
        // Only show banner if consent hasn't been given
        if (!this.consentData.timestamp) {
            this.showConsentBanner();
        }
        
        // Apply current consent settings
        this.applyConsentSettings();
    }

    getConsentData() {
        const cookie = this.getCookie(this.cookieName);
        if (cookie) {
            try {
                return JSON.parse(cookie);
            } catch (e) {
                console.error('Error parsing consent cookie:', e);
            }
        }
        return {
            necessary: true,
            analytics: false,
            preferences: false,
            marketing: false,
            timestamp: null
        };
    }

    setConsentData(data) {
        this.consentData = { ...this.consentData, ...data, timestamp: Date.now() };
        this.setCookie(this.cookieName, JSON.stringify(this.consentData), this.cookieExpiry);
        this.applyConsentSettings();
    }

    getCookie(name) {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    setCookie(name, value, days) {
        const expires = new Date();
        expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
        document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;secure;samesite=strict`;
    }

    showConsentBanner() {
        const banner = document.createElement('div');
        banner.id = 'cookie-consent-banner';
        banner.innerHTML = `
            <div class="cookie-banner">
                <div class="cookie-banner-content">
                    <div class="cookie-banner-text">
                        <h3>🍪 Cookie Consent</h3>
                        <p>We use cookies to enhance your experience, analyze site usage, and provide personalized content. By continuing to use our site, you consent to our use of cookies.</p>
                        <div class="cookie-links">
                            <a href="/privacy-policy.html" target="_blank">Privacy Policy</a>
                            <a href="/cookie-policy.html" target="_blank">Cookie Policy</a>
                        </div>
                    </div>
                    <div class="cookie-banner-actions">
                        <button id="cookie-accept-all" class="cookie-btn cookie-btn-accept">Accept All</button>
                        <button id="cookie-customize" class="cookie-btn cookie-btn-customize">Customize</button>
                        <button id="cookie-reject-all" class="cookie-btn cookie-btn-reject">Reject All</button>
                    </div>
                </div>
                <div id="cookie-preferences" class="cookie-preferences" style="display: none;">
                    <h4>Cookie Preferences</h4>
                    <div class="cookie-category">
                        <label>
                            <input type="checkbox" id="necessary-cookies" checked disabled>
                            <span class="cookie-category-title">Necessary Cookies</span>
                        </label>
                        <p class="cookie-category-desc">Required for basic site functionality. Cannot be disabled.</p>
                    </div>
                    <div class="cookie-category">
                        <label>
                            <input type="checkbox" id="analytics-cookies">
                            <span class="cookie-category-title">Analytics Cookies</span>
                        </label>
                        <p class="cookie-category-desc">Help us understand how visitors interact with our website.</p>
                    </div>
                    <div class="cookie-category">
                        <label>
                            <input type="checkbox" id="preferences-cookies">
                            <span class="cookie-category-title">Preference Cookies</span>
                        </label>
                        <p class="cookie-category-desc">Remember your preferences and settings.</p>
                    </div>
                    <div class="cookie-category">
                        <label>
                            <input type="checkbox" id="marketing-cookies">
                            <span class="cookie-category-title">Marketing Cookies</span>
                        </label>
                        <p class="cookie-category-desc">Used to deliver targeted advertisements.</p>
                    </div>
                    <div class="cookie-preferences-actions">
                        <button id="cookie-save-preferences" class="cookie-btn cookie-btn-save">Save Preferences</button>
                        <button id="cookie-cancel" class="cookie-btn cookie-btn-cancel">Cancel</button>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(banner);
        this.attachEventListeners();
    }

    attachEventListeners() {
        const acceptAllBtn = document.getElementById('cookie-accept-all');
        const customizeBtn = document.getElementById('cookie-customize');
        const rejectAllBtn = document.getElementById('cookie-reject-all');
        const savePreferencesBtn = document.getElementById('cookie-save-preferences');
        const cancelBtn = document.getElementById('cookie-cancel');
        const preferencesDiv = document.getElementById('cookie-preferences');

        if (acceptAllBtn) {
            acceptAllBtn.addEventListener('click', () => {
                this.acceptAllCookies();
            });
        }

        if (customizeBtn) {
            customizeBtn.addEventListener('click', () => {
                preferencesDiv.style.display = 'block';
            });
        }

        if (rejectAllBtn) {
            rejectAllBtn.addEventListener('click', () => {
                this.rejectAllCookies();
            });
        }

        if (savePreferencesBtn) {
            savePreferencesBtn.addEventListener('click', () => {
                this.saveCustomPreferences();
            });
        }

        if (cancelBtn) {
            cancelBtn.addEventListener('click', () => {
                preferencesDiv.style.display = 'none';
            });
        }
    }

    acceptAllCookies() {
        this.setConsentData({
            necessary: true,
            analytics: true,
            preferences: true,
            marketing: true
        });
        this.hideBanner();
    }

    rejectAllCookies() {
        this.setConsentData({
            necessary: true,
            analytics: false,
            preferences: false,
            marketing: false
        });
        this.hideBanner();
    }

    saveCustomPreferences() {
        const analyticsConsent = document.getElementById('analytics-cookies').checked;
        const preferencesConsent = document.getElementById('preferences-cookies').checked;
        const marketingConsent = document.getElementById('marketing-cookies').checked;

        this.setConsentData({
            necessary: true,
            analytics: analyticsConsent,
            preferences: preferencesConsent,
            marketing: marketingConsent
        });
        this.hideBanner();
    }

    hideBanner() {
        const banner = document.getElementById('cookie-consent-banner');
        if (banner) {
            banner.remove();
        }
    }

    applyConsentSettings() {
        // Apply analytics consent
        if (this.consentData.analytics) {
            this.enableAnalytics();
        } else {
            this.disableAnalytics();
        }

        // Apply preferences consent
        if (this.consentData.preferences) {
            this.enablePreferences();
        } else {
            this.disablePreferences();
        }

        // Apply marketing consent
        if (this.consentData.marketing) {
            this.enableMarketing();
        } else {
            this.disableMarketing();
        }
    }

    enableAnalytics() {
        // Enable analytics tracking
        console.log('Analytics cookies enabled');
        // Add your analytics code here (e.g., Google Analytics)
    }

    disableAnalytics() {
        // Disable analytics tracking
        console.log('Analytics cookies disabled');
        // Remove analytics cookies and disable tracking
    }

    enablePreferences() {
        // Enable preference cookies
        console.log('Preference cookies enabled');
    }

    disablePreferences() {
        // Disable preference cookies
        console.log('Preference cookies disabled');
    }

    enableMarketing() {
        // Enable marketing cookies
        console.log('Marketing cookies enabled');
    }

    disableMarketing() {
        // Disable marketing cookies
        console.log('Marketing cookies disabled');
    }

    // Public method to show preferences again
    showPreferences() {
        this.showConsentBanner();
    }

    // Public method to get current consent status
    getConsentStatus() {
        return this.consentData;
    }
}

// Initialize cookie consent manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.cookieConsentManager = new CookieConsentManager();
});

// Expose global function for showing preferences
window.showCookiePreferences = () => {
    if (window.cookieConsentManager) {
        window.cookieConsentManager.showPreferences();
    }
};