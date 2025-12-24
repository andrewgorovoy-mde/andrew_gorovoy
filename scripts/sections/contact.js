/**
 * Contact Section
 * 
 * Handles the contact section's Rough.js drawings.
 * Edit this file to customize the contact section's visual elements.
 */

class ContactSection {
    constructor() {
        this.canvas = document.getElementById('contact-canvas');
        this.drawer = null;
    }

    /**
     * Initialize the contact section
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
     * Draw contact section decorations
     * Customize this function to change what's drawn
     */
    draw() {
        if (!this.drawer) return;

        this.drawer.clear();
        
        const width = this.canvas.width;
        const height = this.canvas.height;
        
        // Draw decorative border
        const padding = 30;
        this.drawer.drawRectangle(
            padding,
            padding,
            width - padding * 2,
            height - padding * 2,
            {
                fill: 'none',
                strokeWidth: 2,
                roughness: 2
            }
        );
        
        // Draw decorative elements
        const decorationOptions = {
            fill: 'none',
            strokeWidth: 1.5,
            roughness: 1.5
        };
        
        // Top decorations
        this.drawer.drawCircle(
            width * 0.2,
            height * 0.15,
            25,
            decorationOptions
        );
        
        this.drawer.drawCircle(
            width * 0.8,
            height * 0.15,
            25,
            decorationOptions
        );
        
        // Bottom decorations
        this.drawer.drawRectangle(
            width * 0.15,
            height * 0.85,
            30,
            30,
            decorationOptions
        );
        
        this.drawer.drawRectangle(
            width * 0.85,
            height * 0.85,
            30,
            30,
            decorationOptions
        );
        
        // Connecting lines
        this.drawer.drawLine(
            width * 0.2,
            height * 0.15,
            width * 0.15,
            height * 0.85,
            {
                strokeWidth: 1,
                roughness: 1.2
            }
        );
        
        this.drawer.drawLine(
            width * 0.8,
            height * 0.15,
            width * 0.85,
            height * 0.85,
            {
                strokeWidth: 1,
                roughness: 1.2
            }
        );
    }
}

// Initialize when DOM is loaded
let contactSection;
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        contactSection = new ContactSection();
        contactSection.init();
    });
} else {
    contactSection = new ContactSection();
    contactSection.init();
}

