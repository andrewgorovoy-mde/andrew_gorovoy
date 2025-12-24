/**
 * Main Entry Point
 * 
 * This file orchestrates the entire portfolio site.
 * Updated for page-based navigation (no scrolling).
 */

class PortfolioApp {
    constructor() {
        this.init();
    }

    /**
     * Initialize the application
     */
    init() {
        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.setup();
            });
        } else {
            this.setup();
        }
    }

    /**
     * Setup the application
     */
    setup() {
        // Page navigation is handled by pages.js
        // Home page buttons are handled by home.js
        // Entry door is handled by entry-door.js
        
        // Handle browser back/forward buttons
        window.addEventListener('popstate', (e) => {
            if (e.state && e.state.page) {
                if (pageManager) {
                    pageManager.showPage(e.state.page);
                }
            } else {
                if (pageManager) {
                    pageManager.showPage('home');
                }
            }
        });

        // Handle hash changes (for direct links)
        window.addEventListener('hashchange', () => {
            const hash = window.location.hash.substring(1);
            if (hash && pageManager) {
                const page = document.getElementById(hash);
                if (page) {
                    pageManager.showPage(hash);
                }
            }
        });
    }
}

// Initialize the application
const app = new PortfolioApp();

// Export for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PortfolioApp;
}
