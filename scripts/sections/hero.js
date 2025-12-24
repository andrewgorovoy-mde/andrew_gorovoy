/**
 * Hero Section
 * 
 * Handles the hero section's Rough.js drawings.
 * Edit this file to customize the hero section's visual elements.
 */

class HeroSection {
    constructor() {
        this.canvas = document.getElementById('hero-canvas');
        this.drawer = null;
        this.animations = [];
    }

    /**
     * Initialize the hero section
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
     * Draw hero section decorations
     * Customize this function to change what's drawn
     */
    draw() {
        if (!this.drawer) return;

        this.drawer.clear();
        
        const width = this.canvas.width;
        const height = this.canvas.height;
        
        // Draw decorative border around hero content
        const padding = 50;
        const borderWidth = width - padding * 2;
        const borderHeight = height - padding * 2;
        
        this.drawer.drawRectangle(
            padding,
            padding,
            borderWidth,
            borderHeight,
            {
                fill: 'none',
                strokeWidth: 3,
                roughness: 2
            }
        );
        
        // Draw some decorative circles
        const circleOptions = {
            fill: 'none',
            strokeWidth: 2,
            roughness: 1.5
        };
        
        // Top left decoration
        this.drawer.drawCircle(
            padding + 30,
            padding + 30,
            40,
            circleOptions
        );
        
        // Bottom right decoration
        this.drawer.drawCircle(
            width - padding - 30,
            height - padding - 30,
            50,
            circleOptions
        );
        
        // Draw some connecting lines
        this.drawer.drawLine(
            padding + 50,
            padding + 50,
            width - padding - 50,
            height - padding - 50,
            {
                strokeWidth: 1.5,
                roughness: 1.2
            }
        );
    }
}

// Initialize when DOM is loaded
let heroSection;
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        heroSection = new HeroSection();
        heroSection.init();
    });
} else {
    heroSection = new HeroSection();
    heroSection.init();
}

