/**
 * Page Navigation System
 * 
 * Handles navigation between pages (no scrolling, show/hide pages).
 */

class PageManager {
    constructor() {
        this.currentPage = 'home';
        this.pages = document.querySelectorAll('.page');
        this.init();
    }

    /**
     * Initialize page manager
     */
    init() {
        // Don't set home as active here - it's already active in HTML
        // Only set it if no page is active
        const activePage = document.querySelector('.page.active');
        if (!activePage) {
            this.showPage('home');
        }
        
        // Setup back buttons
        const backButtons = document.querySelectorAll('.back-button');
        backButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const targetPage = e.target.getAttribute('data-back');
                if (targetPage) {
                    this.showPage(targetPage);
                }
            });
        });
    }

    /**
     * Show a specific page and hide others
     * @param {string} pageId - ID of the page to show
     */
    showPage(pageId) {
        // Hide all pages
        this.pages.forEach(page => {
            page.classList.remove('active');
        });

        // Show target page
        const targetPage = document.getElementById(pageId);
        if (targetPage) {
            targetPage.classList.add('active');
            this.currentPage = pageId;
            
            // Update URL without reload (optional, for bookmarking)
            if (history.pushState) {
                const newUrl = pageId === 'home' ? '/' : `#${pageId}`;
                window.history.pushState({ page: pageId }, '', newUrl);
            }
        }
    }

    /**
     * Get current active page
     * @returns {string} Current page ID
     */
    getCurrentPage() {
        return this.currentPage;
    }
}

// Initialize when DOM is loaded
let pageManager;
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        pageManager = new PageManager();
    });
} else {
    pageManager = new PageManager();
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PageManager;
}

