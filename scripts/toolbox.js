/**
 * Toolbox
 * 
 * Creates a toolbox in the bottom right corner using Rough.js.
 * When clicked, opens a Fallout-style popup menu with tools.
 */

class Toolbox {
    constructor() {
        this.canvas = document.getElementById('toolbox-canvas');
        this.toolboxButton = document.getElementById('toolbox-button');
        this.popup = document.getElementById('toolbox-popup');
        this.isOpen = false;
        this.drawer = null;
        
        // Tools available
        this.tools = [
            {
                id: 'pickaxe',
                name: 'Pickaxe',
                description: 'Excavate hidden content and reveal buried information on the page.',
                icon: '⛏️'
            },
            {
                id: 'magnifying',
                name: 'Magnifying Glass',
                description: 'Zoom in and inspect details of elements and content.',
                icon: '🔍'
            }
        ];
        
        this.init();
    }

    /**
     * Initialize the toolbox
     */
    init() {
        if (!this.canvas || !this.toolboxButton || !this.popup) {
            console.error('Toolbox: Missing required elements', {
                canvas: !!this.canvas,
                button: !!this.toolboxButton,
                popup: !!this.popup
            });
            return;
        }
        
        this.drawer = new RoughDrawer(this.canvas);
        
        // Setup event listeners first (always)
        this.setupEventListeners();
        
        // Wait for main content to be revealed before showing toolbox
        const mainContent = document.getElementById('main-content');
        if (mainContent) {
            // Check if already revealed
            if (mainContent.classList.contains('revealed') || document.body.classList.contains('entered')) {
                this.show();
            } else {
                // Watch for when main content becomes visible
                const observer = new MutationObserver(() => {
                    if (mainContent.classList.contains('revealed') || document.body.classList.contains('entered')) {
                        this.show();
                        observer.disconnect();
                    }
                });
                observer.observe(mainContent, { attributes: true, attributeFilter: ['class'] });
                observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
            }
        } else {
            // If no main-content, show immediately (for testing)
            this.show();
        }
    }

    /**
     * Show the toolbox
     */
    show() {
        this.setupCanvas();
        this.draw();
        
        window.addEventListener('resize', () => {
            this.setupCanvas();
            this.draw();
        });
    }

    /**
     * Setup canvas size
     */
    setupCanvas() {
        const size = 80; // Toolbox size in pixels
        this.canvas.width = size;
        this.canvas.height = size;
        this.drawer.resize();
    }

    /**
     * Draw the toolbox with tools using Rough.js
     */
    draw() {
        if (!this.drawer) return;
        
        const ctx = this.canvas.getContext('2d');
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        const rc = rough.canvas(this.canvas);
        const size = this.canvas.width;
        
        const options = {
            stroke: '#000000',
            strokeWidth: 2,
            roughness: 1.5,
            bowing: 1.5,
            fill: null
        };
        
        // Draw toolbox (rectangle with handle on top)
        const toolboxWidth = size * 0.9;
        const toolboxHeight = size * 0.7;
        const toolboxX = (size - toolboxWidth) / 2;
        const toolboxY = size * 0.2;
        
        // Main toolbox body
        rc.rectangle(toolboxX, toolboxY, toolboxWidth, toolboxHeight, options);
        
        // Handle on top (small rectangle)
        const handleWidth = toolboxWidth * 0.4;
        const handleHeight = toolboxHeight * 0.15;
        const handleX = toolboxX + (toolboxWidth - handleWidth) / 2;
        const handleY = toolboxY - handleHeight * 0.5;
        rc.rectangle(handleX, handleY, handleWidth, handleHeight, options);
        
        // Draw tools inside (simplified representations)
        const toolOptions = { ...options, strokeWidth: 1.5 };
        
        // Hammer (left side)
        const hammerX = toolboxX + toolboxWidth * 0.2;
        const hammerY = toolboxY + toolboxHeight * 0.3;
        // Hammer head
        rc.rectangle(hammerX, hammerY, toolboxWidth * 0.15, toolboxHeight * 0.15, toolOptions);
        // Hammer handle
        rc.line(hammerX + toolboxWidth * 0.075, hammerY + toolboxHeight * 0.15, 
                hammerX + toolboxWidth * 0.075, toolboxY + toolboxHeight * 0.6, toolOptions);
        
        // Wrench (center) - simplified C-shape using path
        const wrenchX = toolboxX + toolboxWidth * 0.4;
        const wrenchY = toolboxY + toolboxHeight * 0.25;
        const wrenchRadius = toolboxWidth * 0.12;
        // Wrench head (C-shape using SVG path)
        const wrenchPath = `M ${wrenchX + toolboxWidth * 0.08 + wrenchRadius} ${wrenchY - wrenchRadius * 0.5} A ${wrenchRadius} ${wrenchRadius} 0 0 1 ${wrenchX + toolboxWidth * 0.08 + wrenchRadius * 0.3} ${wrenchY + wrenchRadius * 0.5} L ${wrenchX + toolboxWidth * 0.08 - wrenchRadius * 0.3} ${wrenchY + wrenchRadius * 0.5} A ${wrenchRadius} ${wrenchRadius} 0 0 1 ${wrenchX + toolboxWidth * 0.08 + wrenchRadius} ${wrenchY - wrenchRadius * 0.5}`;
        rc.path(wrenchPath, toolOptions);
        // Wrench handle
        rc.line(wrenchX + toolboxWidth * 0.15, wrenchY, wrenchX + toolboxWidth * 0.25, toolboxY + toolboxHeight * 0.5, toolOptions);
        
        // Screwdriver (right side)
        const screwX = toolboxX + toolboxWidth * 0.65;
        const screwY = toolboxY + toolboxHeight * 0.3;
        // Screwdriver handle
        rc.rectangle(screwX, screwY, toolboxWidth * 0.12, toolboxHeight * 0.2, toolOptions);
        // Screwdriver shaft
        rc.line(screwX + toolboxWidth * 0.06, screwY + toolboxHeight * 0.2, 
                screwX + toolboxWidth * 0.06, toolboxY + toolboxHeight * 0.55, toolOptions);
    }

    /**
     * Setup event listeners
     */
    setupEventListeners() {
        if (!this.toolboxButton || !this.popup) {
            console.error('Toolbox: Cannot setup event listeners - missing elements');
            return;
        }
        
        // Click handler for toolbox button
        this.toolboxButton.addEventListener('click', (e) => {
            e.stopPropagation();
            e.preventDefault();
            console.log('Toolbox clicked, toggling popup');
            this.togglePopup();
        });
        
        // Close button
        const closeButton = this.popup.querySelector('.toolbox-popup-close');
        if (closeButton) {
            closeButton.addEventListener('click', (e) => {
                e.stopPropagation();
                e.preventDefault();
                this.closePopup();
            });
        }
        
        // Close popup when clicking outside (use capture phase)
        document.addEventListener('click', (e) => {
            if (this.isOpen && this.popup && !this.popup.contains(e.target) && 
                this.toolboxButton && !this.toolboxButton.contains(e.target)) {
                this.closePopup();
            }
        }, true);
        
        // Close popup with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.closePopup();
            }
        });
        
        // Prevent popup from closing when clicking inside it
        this.popup.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }

    /**
     * Toggle popup open/closed
     */
    togglePopup() {
        if (this.isOpen) {
            this.closePopup();
        } else {
            this.openPopup();
        }
    }

    /**
     * Open the popup menu
     */
    openPopup() {
        if (!this.popup) {
            console.error('Toolbox: Cannot open popup - popup element not found');
            return;
        }
        
        console.log('Opening toolbox popup');
        this.isOpen = true;
        this.popup.classList.add('active');
        this.renderTools();
    }

    /**
     * Close the popup menu
     */
    closePopup() {
        if (!this.popup) return;
        
        console.log('Closing toolbox popup');
        this.isOpen = false;
        this.popup.classList.remove('active');
    }

    /**
     * Render tools in the popup
     */
    renderTools() {
        const toolsList = this.popup.querySelector('.toolbox-tools-list');
        if (!toolsList) return;
        
        toolsList.innerHTML = '';
        
        this.tools.forEach((tool, index) => {
            const toolItem = document.createElement('div');
            toolItem.className = 'toolbox-tool-item';
            toolItem.setAttribute('data-tool-id', tool.id);
            
            toolItem.innerHTML = `
                <div class="toolbox-tool-icon">${tool.icon}</div>
                <div class="toolbox-tool-info">
                    <div class="toolbox-tool-name">${tool.name}</div>
                    <div class="toolbox-tool-description">${tool.description}</div>
                </div>
            `;
            
            toolItem.addEventListener('click', () => {
                this.selectTool(tool);
            });
            
            toolsList.appendChild(toolItem);
        });
    }

    /**
     * Handle tool selection
     */
    selectTool(tool) {
        console.log('Tool selected:', tool.id);
        // TODO: Implement tool functionality
        // This will be expanded based on what each tool should do
    }
}

// Initialize when DOM is loaded
let toolbox;
function initToolbox() {
    // Wait a bit to ensure all elements are ready
    setTimeout(() => {
        toolbox = new Toolbox();
        window.toolbox = toolbox; // Make globally accessible for debugging
    }, 100);
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        initToolbox();
    });
} else {
    initToolbox();
}

