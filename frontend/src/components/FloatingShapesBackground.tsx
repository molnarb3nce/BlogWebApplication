import { useEffect, useRef } from "react";

/**
 * Creates an animated background with floating geometric shapes.
 * Dynamically generates shapes that move around the screen with collision detection.
 * Shapes include squares, circles, and triangles with rotation effects.
 * 
 * @component
 * @returns {null} Doesn't render any visible elements directly, instead modifies the DOM
 */
const FloatingShapesBackground = () => {
  const requestRef = useRef<number>(0);
  const shapesRef = useRef<HTMLElement[]>([]);

  useEffect(() => {
    const root = document.getElementById("root");
    if (!root) return;

    // Dynamically creates styles for shapes
    // To ensure the shapes have a consistent style
    const style = document.createElement("style");
    style.textContent = `
      .shape {
        position: absolute;
        border: 2px solid #1a2b6d;
        background-color: #1a2b6d;
        z-index: -1;
      }
      .square {
        border-radius: 5px;
      }
      .circle {
        border-radius: 50%;
      }
      .triangle {
        width: 0 !important;
        height: 0 !important;
        background-color: transparent;
        border-left: 50px solid transparent;
        border-right: 50px solid transparent;
        border-bottom: 86px solid #1a2b6d;
        border-top: 0;
      }
    `;
    document.head.appendChild(style);

    const shapes = ["square", "circle", "triangle"];
    const createdShapes: HTMLElement[] = [];
    
    // Creates 10 random shapes
    // Each shape has a random size, position, and speed
    for (let i = 0; i < 10; i++) {
      const shape = document.createElement("div");
      const randomShape = shapes[Math.floor(Math.random() * shapes.length)];
      shape.classList.add("shape", randomShape);

      // Randomized size between 50px and 150px
      let size = Math.random() * 100 + 50;
      
      // Handles the triangle size differently
      // because it uses border properties for its dimensions
      if (randomShape !== "triangle") {
        shape.style.width = `${size}px`;
        shape.style.height = `${size}px`;
      } else {
        // Triangle size is based on the height of the border
        size = 50;
      }

      // Initial position within the screen
      const maxX = window.innerWidth - size * 2;
      const maxY = window.innerHeight - size * 2;
      const x = Math.random() * maxX;
      const y = Math.random() * maxY;
      shape.style.left = `${x}px`;
      shape.style.top = `${y}px`;

      // Randomized speed (pixels per frame)
      const speedX = (Math.random() * 2 - 1) * 0.7; // between -0.7 and 0.7 (slower)
      const speedY = (Math.random() * 2 - 1) * 0.7; // between -0.7 and 0.7 (slower)
      
      // Saving speed and rotation in data attributes
      shape.dataset.speedX = speedX.toString();
      shape.dataset.speedY = speedY.toString();
      shape.dataset.rotation = "0";
      shape.dataset.size = size.toString();
      
      root.appendChild(shape);
      createdShapes.push(shape);
    }

    shapesRef.current = createdShapes;

    // Collision detection between two shapes
    const checkCollision = (shape1: HTMLElement, shape2: HTMLElement) => {
      const rect1 = shape1.getBoundingClientRect();
      const rect2 = shape2.getBoundingClientRect();

      // Simple rectangle-based collision detection
      return !(
        rect1.right < rect2.left ||
        rect1.left > rect2.right ||
        rect1.bottom < rect2.top ||
        rect1.top > rect2.bottom
      );
    };

    // Animation loop
    const animate = () => {
      const shapes = shapesRef.current;

      // Move each shape
      shapes.forEach((shape, index) => {
        const rect = shape.getBoundingClientRect();
        let speedX = parseFloat(shape.dataset.speedX || "0.5");
        let speedY = parseFloat(shape.dataset.speedY || "0.5");
        
        let x = parseFloat(shape.style.left);
        let y = parseFloat(shape.style.top);

        // New position
        x += speedX;
        y += speedY;

        // Check screen boundaries
        if (x <= 0 || x + rect.width >= window.innerWidth) {
          // Reverse direction
          speedX = -speedX;
          shape.dataset.speedX = speedX.toString();
          // Correction to prevent going out of bounds
          x = x <= 0 ? 0 : window.innerWidth - rect.width;
        }
        
        if (y <= 0 || y + rect.height >= window.innerHeight) {
          // Reverse direction
          speedY = -speedY;
          shape.dataset.speedY = speedY.toString();
          // Correction to prevent going out of bounds
          y = y <= 0 ? 0 : window.innerHeight - rect.height;
        }

        // Set new position
        shape.style.left = `${x}px`;
        shape.style.top = `${y}px`;

        // Add rotation
        const rotation = (parseFloat(shape.dataset.rotation || "0") + 0.2) % 360; // slower rotation
        shape.style.transform = `rotate(${rotation}deg)`;
        shape.dataset.rotation = rotation.toString();
        
        // Check for collisions with other shapes
        for (let j = index + 1; j < shapes.length; j++) {
          const otherShape = shapes[j];
          if (checkCollision(shape, otherShape)) {
            // Change direction of the first shape
            shape.dataset.speedX = (-parseFloat(shape.dataset.speedX || "0.5")).toString();
            shape.dataset.speedY = (-parseFloat(shape.dataset.speedY || "0.5")).toString();

            // Change direction of the second shape
            otherShape.dataset.speedX = (-parseFloat(otherShape.dataset.speedX || "0.5")).toString();
            otherShape.dataset.speedY = (-parseFloat(otherShape.dataset.speedY || "0.5")).toString();
          }
        }
      });
      
      requestRef.current = requestAnimationFrame(animate);
    };
    
    requestRef.current = requestAnimationFrame(animate);

    // Handles window resize events
    // Adjusts shapes' positions if they go out of bounds
    const handleResize = () => {
      shapesRef.current.forEach((shape) => {
        const rect = shape.getBoundingClientRect();
        // If the shape is partially out of the window, bring it back into view
        if (rect.right > window.innerWidth) {
          shape.style.left = `${window.innerWidth - rect.width}px`;
        }
        if (rect.bottom > window.innerHeight) {
          shape.style.top = `${window.innerHeight - rect.height}px`;
        }
      });
    };
    
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      cancelAnimationFrame(requestRef.current);
      document.head.removeChild(style);
      window.removeEventListener("resize", handleResize);
      shapesRef.current.forEach(shape => {
        if (root.contains(shape)) {
          root.removeChild(shape);
        }
      });
    };
  }, []);

  return null;
};

export default FloatingShapesBackground;
