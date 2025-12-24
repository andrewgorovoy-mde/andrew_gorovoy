/**
 * Home Page
 * 
 * Handles the home page navigation buttons with Rough.js rectangles.
 */

class HomePage {
    constructor() {
        this.navButtons = document.querySelectorAll('.nav-button');
        this.init();
    }

    /**
     * Initialize home page
     */
    init() {
        this.setupButtonClicks();
        
        // Setup canvases after a short delay to ensure page is visible
        // This handles the case where the door animation needs to complete first
        setTimeout(() => {
            this.setupButtonCanvases();
        }, 500);
        
        // Also set up when home page becomes active
        const homePage = document.getElementById('home');
        if (homePage) {
            const observer = new MutationObserver(() => {
                if (homePage.classList.contains('active')) {
                    setTimeout(() => {
                        this.setupButtonCanvases();
                    }, 100);
                }
            });
            observer.observe(homePage, { attributes: true, attributeFilter: ['class'] });
        }
        
        // Redraw on window resize
        window.addEventListener('resize', () => {
            this.setupButtonCanvases();
        });
    }

    /**
     * Setup canvas for each navigation button
     */
    setupButtonCanvases() {
        this.navButtons.forEach(button => {
            const canvas = button.querySelector('.nav-button-canvas');
            if (!canvas) return;

            // Set canvas size to match button size
            const rect = button.getBoundingClientRect();
            canvas.width = rect.width;
            canvas.height = rect.height;

            // Draw rectangle on canvas
            this.drawButtonRectangle(canvas, button, false);

            // Setup hover listeners (only once)
            if (!button.hasAttribute('data-hover-setup')) {
                button.setAttribute('data-hover-setup', 'true');
                button.addEventListener('mouseenter', () => {
                    this.drawButtonRectangle(canvas, button, true);
                });

                button.addEventListener('mouseleave', () => {
                    this.drawButtonRectangle(canvas, button, false);
                });
            }
        });
    }

    /**
     * Draw button rectangle with optional hover state
     * @param {HTMLCanvasElement} canvas - Canvas element
     * @param {HTMLElement} button - Button element
     * @param {boolean} isHover - Whether button is being hovered
     */
    drawButtonRectangle(canvas, button, isHover = false) {
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const rc = rough.canvas(canvas);
        
        const options = {
            stroke: '#000000',
            strokeWidth: isHover ? 4 : 2,
            roughness: isHover ? 1.8 : 1.5,
            bowing: isHover ? 2 : 1.5,
            fill: null
        };

        // Draw rectangle border
        rc.rectangle(0, 0, canvas.width, canvas.height, options);
    }

    /**
     * Setup button click handlers for navigation
     */
    setupButtonClicks() {
        this.navButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const targetPage = button.getAttribute('data-page');
                if (targetPage && pageManager) {
                    pageManager.showPage(targetPage);
                }
            });
        });
    }
}

// Initialize when DOM is loaded
let homePage;
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        homePage = new HomePage();
    });
} else {
    homePage = new HomePage();
}

