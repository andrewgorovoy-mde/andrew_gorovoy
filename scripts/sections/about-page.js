/**
 * About Page
 * 
 * Handles the about page decorations with Rough.js.
 */

class AboutPage {
    constructor() {
        this.canvas = document.querySelector('#about .portrait-canvas');
        this.drawer = null;
    }

    /**
     * Initialize the about page
     */
    init() {
        if (!this.canvas) return;

        this.drawer = new RoughDrawer(this.canvas);
        this.setupCanvas();
        this.draw();
        
        // Redraw on window resize
        window.addEventListener('resize', () => {
            this.setupCanvas();
            this.draw();
        });
    }

    /**
     * Setup canvas size
     */
    setupCanvas() {
        const portrait = this.canvas.parentElement;
        if (!portrait) return;
        
        const rect = portrait.getBoundingClientRect();
        this.canvas.width = rect.width;
        this.canvas.height = rect.height;
        this.drawer.resize();
    }

    /**
     * Draw decorative border around portrait
     */
    draw() {
        if (!this.drawer) return;

        this.drawer.clear();
        
        const width = this.canvas.width;
        const height = this.canvas.height;
        
        // Draw decorative border
        const padding = 10;
        const options = {
            stroke: '#000000',
            strokeWidth: 2,
            roughness: 1.5,
            bowing: 1.5,
            fill: null
        };
        
        this.drawer.drawRectangle(
            padding,
            padding,
            width - padding * 2,
            height - padding * 2,
            options
        );
        
        // Draw some decorative corner elements
        const cornerSize = 30;
        const cornerOptions = { ...options, strokeWidth: 1.5 };
        
        // Top left corner
        this.drawer.drawLine(
            padding,
            padding + cornerSize,
            padding + cornerSize,
            padding,
            cornerOptions
        );
        
        // Top right corner
        this.drawer.drawLine(
            width - padding - cornerSize,
            padding,
            width - padding,
            padding + cornerSize,
            cornerOptions
        );
        
        // Bottom left corner
        this.drawer.drawLine(
            padding,
            height - padding - cornerSize,
            padding + cornerSize,
            height - padding,
            cornerOptions
        );
        
        // Bottom right corner
        this.drawer.drawLine(
            width - padding - cornerSize,
            height - padding,
            width - padding,
            height - padding - cornerSize,
            cornerOptions
        );
    }
}

// Initialize when about page becomes active
function initAboutPage() {
    const aboutPage = document.getElementById('about');
    if (!aboutPage) return;
    
    const aboutPageInstance = new AboutPage();
    
    // Watch for when about page becomes active
    const observer = new MutationObserver(() => {
        if (aboutPage.classList.contains('active')) {
            setTimeout(() => {
                aboutPageInstance.init();
            }, 100);
        }
    });
    
    observer.observe(aboutPage, { attributes: true, attributeFilter: ['class'] });
    
    // Also initialize if already active
    if (aboutPage.classList.contains('active')) {
        setTimeout(() => {
            aboutPageInstance.init();
        }, 100);
    }
}

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        initAboutPage();
    });
} else {
    initAboutPage();
}

