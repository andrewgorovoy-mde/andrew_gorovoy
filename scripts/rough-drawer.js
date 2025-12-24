/**
 * Rough.js Drawer Utility
 * 
 * This module provides reusable functions for drawing with Rough.js.
 * All drawing functions use black and white colors only.
 * 
 * Usage:
 *   const drawer = new RoughDrawer(canvas);
 *   drawer.drawRectangle(x, y, width, height, options);
 */

class RoughDrawer {
    /**
     * Initialize the RoughDrawer with a canvas element
     * @param {HTMLCanvasElement} canvas - The canvas element to draw on
     */
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.rc = rough.canvas(canvas);
        
        // Default drawing options - modify these to change the sketchy style
        this.defaultOptions = {
            roughness: 1.5,        // How rough/sketchy (0 = smooth, higher = rougher)
            bowing: 2,             // Curve of lines (0 = straight, higher = more curved)
            stroke: '#000000',     // Black stroke
            strokeWidth: 2,        // Line thickness
            fill: '#ffffff',       // White fill (or 'none' for no fill)
            fillStyle: 'hachure',  // Fill style: 'hachure', 'solid', 'zigzag', 'cross-hatch', 'dots'
            hachureAngle: 45,      // Angle of hachure lines
            hachureGap: 5          // Gap between hachure lines
        };
    }

    /**
     * Set canvas size to match container
     * Call this when window resizes or initially
     */
    resize() {
        const rect = this.canvas.getBoundingClientRect();
        this.canvas.width = rect.width;
        this.canvas.height = rect.height;
    }

    /**
     * Clear the canvas
     */
    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    /**
     * Draw a rectangle
     * @param {number} x - X position
     * @param {number} y - Y position
     * @param {number} width - Width
     * @param {number} height - Height
     * @param {object} options - Optional overrides for default options
     */
    drawRectangle(x, y, width, height, options = {}) {
        const opts = { ...this.defaultOptions, ...options };
        return this.rc.rectangle(x, y, width, height, opts);
    }

    /**
     * Draw a circle
     * @param {number} x - Center X position
     * @param {number} y - Center Y position
     * @param {number} diameter - Diameter
     * @param {object} options - Optional overrides for default options
     */
    drawCircle(x, y, diameter, options = {}) {
        const opts = { ...this.defaultOptions, ...options };
        return this.rc.circle(x, y, diameter, opts);
    }

    /**
     * Draw an ellipse
     * @param {number} x - Center X position
     * @param {number} y - Center Y position
     * @param {number} width - Width
     * @param {number} height - Height
     * @param {object} options - Optional overrides for default options
     */
    drawEllipse(x, y, width, height, options = {}) {
        const opts = { ...this.defaultOptions, ...options };
        return this.rc.ellipse(x, y, width, height, opts);
    }

    /**
     * Draw a line
     * @param {number} x1 - Start X position
     * @param {number} y1 - Start Y position
     * @param {number} x2 - End X position
     * @param {number} y2 - End Y position
     * @param {object} options - Optional overrides for default options
     */
    drawLine(x1, y1, x2, y2, options = {}) {
        const opts = { ...this.defaultOptions, ...options };
        return this.rc.line(x1, y1, x2, y2, opts);
    }

    /**
     * Draw an SVG path
     * @param {string} path - SVG path string (e.g., "M10 10 L20 20")
     * @param {object} options - Optional overrides for default options
     */
    drawPath(path, options = {}) {
        const opts = { ...this.defaultOptions, ...options };
        return this.rc.path(path, opts);
    }

    /**
     * Draw a polygon from points
     * @param {Array} points - Array of [x, y] pairs
     * @param {object} options - Optional overrides for default options
     */
    drawPolygon(points, options = {}) {
        const opts = { ...this.defaultOptions, ...options };
        return this.rc.polygon(points, opts);
    }

    /**
     * Draw multiple random decorative elements
     * Useful for background decorations
     * @param {number} count - Number of elements to draw
     * @param {object} options - Optional overrides for default options
     */
    drawRandomDecorations(count = 5, options = {}) {
        const decorations = [];
        const width = this.canvas.width;
        const height = this.canvas.height;
        
        for (let i = 0; i < count; i++) {
            const x = Math.random() * width;
            const y = Math.random() * height;
            const size = Math.random() * 50 + 20;
            const type = Math.floor(Math.random() * 3);
            
            const opts = {
                ...this.defaultOptions,
                ...options,
                fill: 'none', // Decorations typically don't have fill
                strokeWidth: 1
            };
            
            let decoration;
            switch (type) {
                case 0:
                    decoration = this.drawCircle(x, y, size, opts);
                    break;
                case 1:
                    decoration = this.drawRectangle(x, y, size, size, opts);
                    break;
                case 2:
                    decoration = this.drawEllipse(x, y, size, size * 0.6, opts);
                    break;
            }
            
            decorations.push(decoration);
        }
        
        return decorations;
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = RoughDrawer;
}

