/**
 * About Section
 * 
 * Handles the about section's Rough.js drawings.
 * Edit this file to customize the about section's visual elements.
 */

class AboutSection {
    constructor() {
        this.canvas = document.getElementById('about-canvas');
        this.drawer = null;
    }

    /**
     * Initialize the about section
     * Call this after DOM is loaded
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
        const container = this.canvas.parentElement;
        const rect = container.getBoundingClientRect();
        this.canvas.width = rect.width;
        this.canvas.height = rect.height;
        this.drawer.resize();
    }

    /**
     * Draw about section decorations
     * Customize this function to change what's drawn
     */
    draw() {
        if (!this.drawer) return;

        this.drawer.clear();
        
        const width = this.canvas.width;
        const height = this.canvas.height;
        
        // Draw subtle background decorations
        const decorationOptions = {
            fill: 'none',
            strokeWidth: 1,
            roughness: 1.5,
            opacity: 0.3
        };
        
        // Draw some geometric shapes in the background
        // Top area
        this.drawer.drawEllipse(
            width * 0.2,
            height * 0.2,
            100,
            60,
            decorationOptions
        );
        
        // Middle area
        this.drawer.drawRectangle(
            width * 0.7,
            height * 0.4,
            80,
            80,
            decorationOptions
        );
        
        // Bottom area
        this.drawer.drawCircle(
            width * 0.3,
            height * 0.8,
            70,
            decorationOptions
        );
        
        // Draw connecting lines
        this.drawer.drawLine(
            width * 0.25,
            height * 0.25,
            width * 0.75,
            height * 0.45,
            {
                strokeWidth: 1,
                roughness: 1.2
            }
        );
        
        this.drawer.drawLine(
            width * 0.35,
            height * 0.85,
            width * 0.75,
            height * 0.5,
            {
                strokeWidth: 1,
                roughness: 1.2
            }
        );
    }
}

// Initialize when DOM is loaded
let aboutSection;
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        aboutSection = new AboutSection();
        aboutSection.init();
    });
} else {
    aboutSection = new AboutSection();
    aboutSection.init();
}

