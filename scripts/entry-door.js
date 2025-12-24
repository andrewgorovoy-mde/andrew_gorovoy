/**
 * Entry Door
 * 
 * Creates an illustrated door using Rough.js that serves as the entry point.
 * - Door is rendered with rectangles (panels) and circles (doorknob)
 * - Hover effect increases border weight
 * - Click triggers door swing open and zoom-through animation
 */

class EntryDoor {
    constructor() {
        this.entryScreen = document.getElementById('entry-screen');
        this.canvas = document.getElementById('door-canvas');
        this.mainContent = document.getElementById('main-content');
        this.drawer = null;
        this.isHovering = false;
        this.isAnimating = false;
        
        // Door dimensions (will be calculated based on canvas size)
        this.door = {
            x: 0,
            y: 0,
            width: 0,
            height: 0
        };
        
        // Drawing options
        this.normalOptions = {
            stroke: '#000000',
            strokeWidth: 2,
            roughness: 1.5,
            bowing: 1.5,
            fill: null
        };
        
        this.hoverOptions = {
            stroke: '#000000',
            strokeWidth: 4,
            roughness: 1.8,
            bowing: 2,
            fill: null
        };
    }

    /**
     * Initialize the entry door
     */
    init() {
        if (!this.canvas || !this.entryScreen) return;
        
        this.drawer = new RoughDrawer(this.canvas);
        this.setupCanvas();
        this.draw(this.normalOptions);
        this.setupEventListeners();
        
        window.addEventListener('resize', () => {
            this.setupCanvas();
            this.draw(this.isHovering ? this.hoverOptions : this.normalOptions);
        });
    }

    /**
     * Setup canvas size
     */
    setupCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.drawer.resize();
        this.calculateDoorDimensions();
    }

    /**
     * Calculate door dimensions based on canvas size
     */
    calculateDoorDimensions() {
        const canvasWidth = this.canvas.width;
        const canvasHeight = this.canvas.height;
        
        // Door should be roughly 1/3 of viewport width, max 300px
        const doorWidth = Math.min(canvasWidth * 0.25, 280);
        const doorHeight = doorWidth * 2; // Classic door proportions
        
        this.door = {
            x: (canvasWidth - doorWidth) / 2,
            y: (canvasHeight - doorHeight) / 2,
            width: doorWidth,
            height: doorHeight
        };
    }

    /**
     * Draw the door
     * @param {object} options - Drawing options
     */
    draw(options) {
        if (!this.drawer) return;
        
        const ctx = this.canvas.getContext('2d');
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        const { x, y, width, height } = this.door;
        const rc = rough.canvas(this.canvas);
        
        // Ensure fill is explicitly null for all shapes (outline only)
        const drawOptions = { ...options, fill: null, stroke: '#000000' };
        
        // Outer door frame
        rc.rectangle(x, y, width, height, drawOptions);
        
        // Inner frame (slightly inset)
        const frameInset = width * 0.05;
        rc.rectangle(
            x + frameInset,
            y + frameInset,
            width - frameInset * 2,
            height - frameInset * 2,
            { ...drawOptions, strokeWidth: drawOptions.strokeWidth * 0.8 }
        );
        
        // Panel dimensions
        const panelMargin = width * 0.12;
        const panelGap = width * 0.08;
        const panelWidth = width - panelMargin * 2;
        
        // Top two tall panels
        const topPanelHeight = height * 0.32;
        const topPanelY = y + panelMargin;
        const panelInnerWidth = (panelWidth - panelGap) / 2;
        
        // Left top panel
        rc.rectangle(
            x + panelMargin,
            topPanelY,
            panelInnerWidth,
            topPanelHeight,
            { ...drawOptions, strokeWidth: drawOptions.strokeWidth * 0.7 }
        );
        
        // Right top panel
        rc.rectangle(
            x + panelMargin + panelInnerWidth + panelGap,
            topPanelY,
            panelInnerWidth,
            topPanelHeight,
            { ...drawOptions, strokeWidth: drawOptions.strokeWidth * 0.7 }
        );
        
        // Middle section (shorter panels)
        const midPanelY = topPanelY + topPanelHeight + panelGap;
        const midPanelHeight = height * 0.18;
        
        // Left middle panel
        rc.rectangle(
            x + panelMargin,
            midPanelY,
            panelInnerWidth,
            midPanelHeight,
            { ...drawOptions, strokeWidth: drawOptions.strokeWidth * 0.7 }
        );
        
        // Right middle panel
        rc.rectangle(
            x + panelMargin + panelInnerWidth + panelGap,
            midPanelY,
            panelInnerWidth,
            midPanelHeight,
            { ...drawOptions, strokeWidth: drawOptions.strokeWidth * 0.7 }
        );
        
        // Bottom wide panel
        const bottomPanelY = midPanelY + midPanelHeight + panelGap;
        const bottomPanelHeight = height - (bottomPanelY - y) - panelMargin;
        
        rc.rectangle(
            x + panelMargin,
            bottomPanelY,
            panelWidth,
            bottomPanelHeight,
            { ...drawOptions, strokeWidth: drawOptions.strokeWidth * 0.7 }
        );
        
        // Door knob (right side, middle height)
        const knobX = x + width - panelMargin - width * 0.05;
        const knobY = y + height * 0.52;
        const knobSize = width * 0.07;
        
        rc.circle(knobX, knobY, knobSize, {
            ...drawOptions
        });
        
        // Keyhole (small vertical ellipse below knob)
        const keyholeY = knobY + knobSize * 0.8;
        rc.ellipse(knobX, keyholeY, knobSize * 0.3, knobSize * 0.6, {
            ...drawOptions,
            strokeWidth: drawOptions.strokeWidth * 0.5
        });
        
        // Door handle plate (decorative rectangle around knob area)
        const plateWidth = width * 0.08;
        const plateHeight = height * 0.12;
        rc.rectangle(
            knobX - plateWidth / 2,
            knobY - plateHeight / 3,
            plateWidth,
            plateHeight,
            { ...drawOptions, strokeWidth: drawOptions.strokeWidth * 0.5 }
        );
    }

    /**
     * Setup event listeners for hover and click
     */
    setupEventListeners() {
        this.canvas.addEventListener('mousemove', (e) => {
            if (this.isAnimating) return;
            
            const isOverDoor = this.isPointInDoor(e.clientX, e.clientY);
            
            if (isOverDoor && !this.isHovering) {
                this.isHovering = true;
                this.canvas.classList.add('door-hover');
                // Only draw once when entering hover state
                this.draw(this.hoverOptions);
            } else if (!isOverDoor && this.isHovering) {
                this.isHovering = false;
                this.canvas.classList.remove('door-hover');
                // Only draw once when leaving hover state
                this.draw(this.normalOptions);
            }
        });
        
        this.canvas.addEventListener('click', (e) => {
            if (this.isAnimating) return;
            
            if (this.isPointInDoor(e.clientX, e.clientY)) {
                this.openDoor();
            }
        });
    }

    /**
     * Check if a point is inside the door area
     */
    isPointInDoor(px, py) {
        const { x, y, width, height } = this.door;
        return px >= x && px <= x + width && py >= y && py <= y + height;
    }


    /**
     * Open door animation and zoom through
     */
    openDoor() {
        this.isAnimating = true;
        this.canvas.classList.add('door-opening');
        
        // Phase 1: Door swings open (3D perspective transform on canvas)
        this.entryScreen.classList.add('door-swing');
        
        // Phase 2: After swing, zoom through
        setTimeout(() => {
            this.entryScreen.classList.add('zoom-through');
            
            // Show main content
            this.mainContent.classList.add('revealed');
            
            // Remove entry screen after animation
            setTimeout(() => {
                this.entryScreen.style.display = 'none';
                document.body.classList.add('entered');
            }, 1000);
        }, 600);
    }
}

// Initialize when DOM is loaded
let entryDoor;
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        entryDoor = new EntryDoor();
        entryDoor.init();
    });
} else {
    entryDoor = new EntryDoor();
    entryDoor.init();
}


