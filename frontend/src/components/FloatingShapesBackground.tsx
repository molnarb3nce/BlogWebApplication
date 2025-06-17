import { useEffect, useRef } from "react";

const FloatingShapesBackground = () => {
  const requestRef = useRef<number>(0);
  const shapesRef = useRef<HTMLElement[]>([]);

  useEffect(() => {
    const root = document.getElementById("root");
    if (!root) return;

    // Dinamikusan adjuk hozzá a CSS stílusokat
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
    
    for (let i = 0; i < 10; i++) {
      const shape = document.createElement("div");
      const randomShape = shapes[Math.floor(Math.random() * shapes.length)];
      shape.classList.add("shape", randomShape);

      // Véletlenszerű méret és pozíció
      let size = Math.random() * 100 + 50; // 50px - 150px
      
      // A háromszög méretét külön kezeljük
      if (randomShape !== "triangle") {
        shape.style.width = `${size}px`;
        shape.style.height = `${size}px`;
      } else {
        // A háromszög méretét a border-width határozza meg a CSS-ben
        size = 50; // Alapméret
      }

      // Kezdeti pozíció a képernyőn belül
      const maxX = window.innerWidth - size * 2;
      const maxY = window.innerHeight - size * 2;
      const x = Math.random() * maxX;
      const y = Math.random() * maxY;
      shape.style.left = `${x}px`;
      shape.style.top = `${y}px`;
      
      // Véletlenszerű sebesség (pixelek per frame) - lassabb mozgás
      const speedX = (Math.random() * 2 - 1) * 0.7; // -0.7 és 0.7 között (lassabb)
      const speedY = (Math.random() * 2 - 1) * 0.7; // -0.7 és 0.7 között (lassabb)
      
      // Mentjük a sebességet és egyéb adatokat
      shape.dataset.speedX = speedX.toString();
      shape.dataset.speedY = speedY.toString();
      shape.dataset.rotation = "0";
      shape.dataset.size = size.toString();
      
      root.appendChild(shape);
      createdShapes.push(shape);
    }

    shapesRef.current = createdShapes;

    // Ütközés ellenőrzése két alakzat között
    const checkCollision = (shape1: HTMLElement, shape2: HTMLElement) => {
      const rect1 = shape1.getBoundingClientRect();
      const rect2 = shape2.getBoundingClientRect();
      
      // Egyszerű téglalap-alapú ütközésdetektálás
      return !(
        rect1.right < rect2.left ||
        rect1.left > rect2.right ||
        rect1.bottom < rect2.top ||
        rect1.top > rect2.bottom
      );
    };

    // Animációs loop
    const animate = () => {
      const shapes = shapesRef.current;
      
      // Minden alakzat mozgatása
      shapes.forEach((shape, index) => {
        const rect = shape.getBoundingClientRect();
        let speedX = parseFloat(shape.dataset.speedX || "0.5");
        let speedY = parseFloat(shape.dataset.speedY || "0.5");
        
        let x = parseFloat(shape.style.left);
        let y = parseFloat(shape.style.top);
        
        // Új pozíció
        x += speedX;
        y += speedY;
        
        // Ellenőrizzük a képernyő határait
        if (x <= 0 || x + rect.width >= window.innerWidth) {
          // Irány megfordítása
          speedX = -speedX;
          shape.dataset.speedX = speedX.toString();
          // Korrekció, hogy ne menjen ki
          x = x <= 0 ? 0 : window.innerWidth - rect.width;
        }
        
        if (y <= 0 || y + rect.height >= window.innerHeight) {
          // Irány megfordítása
          speedY = -speedY;
          shape.dataset.speedY = speedY.toString();
          // Korrekció, hogy ne menjen ki
          y = y <= 0 ? 0 : window.innerHeight - rect.height;
        }
        
        // Új pozíció beállítása
        shape.style.left = `${x}px`;
        shape.style.top = `${y}px`;
        
        // Forgás hozzáadása - lassabb forgás
        const rotation = (parseFloat(shape.dataset.rotation || "0") + 0.2) % 360; // lassabb forgás
        shape.style.transform = `rotate(${rotation}deg)`;
        shape.dataset.rotation = rotation.toString();
        
        // Ütközés ellenőrzése más alakzatokkal
        for (let j = index + 1; j < shapes.length; j++) {
          const otherShape = shapes[j];
          if (checkCollision(shape, otherShape)) {
            // Az első alakzat irányváltoztatása
            shape.dataset.speedX = (-parseFloat(shape.dataset.speedX || "0.5")).toString();
            shape.dataset.speedY = (-parseFloat(shape.dataset.speedY || "0.5")).toString();
            
            // A második alakzat irányváltoztatása
            otherShape.dataset.speedX = (-parseFloat(otherShape.dataset.speedX || "0.5")).toString();
            otherShape.dataset.speedY = (-parseFloat(otherShape.dataset.speedY || "0.5")).toString();
          }
        }
      });
      
      requestRef.current = requestAnimationFrame(animate);
    };
    
    requestRef.current = requestAnimationFrame(animate);

    // Ablak átméretezés kezelése
    const handleResize = () => {
      shapesRef.current.forEach((shape) => {
        const rect = shape.getBoundingClientRect();
        // Ha az alakzat részben kilóg az ablakból, visszatesszük a képernyőre
        if (rect.right > window.innerWidth) {
          shape.style.left = `${window.innerWidth - rect.width}px`;
        }
        if (rect.bottom > window.innerHeight) {
          shape.style.top = `${window.innerHeight - rect.height}px`;
        }
      });
    };
    
    window.addEventListener("resize", handleResize);

    // Tisztítás
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
