import React, { useRef, useEffect, useState } from 'react';

const TShirtDesigner = () => {
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);
  const [designElements, setDesignElements] = useState([]);
  const [activeElementIndex, setActiveElementIndex] = useState(-1);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  // Initialize canvas and load T-shirt background
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Load t-shirt background
    const tshirtImage = new Image();
    tshirtImage.src = "/api/placeholder/500/600";
    tshirtImage.onload = () => {
      ctx.drawImage(tshirtImage, 0, 0, canvas.width, canvas.height);
      redrawCanvas();
    };
  }, []);

  // Redraw the canvas whenever design elements change
  useEffect(() => {
    redrawCanvas();
  }, [designElements, activeElementIndex]);

  const redrawCanvas = () => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw t-shirt background
    const tshirtImage = new Image();
    tshirtImage.src = "http://localhost:5173/src/assets/luffy.png";
    ctx.drawImage(tshirtImage, 0, 0, canvas.width, canvas.height);
    
    // Draw all design elements
    designElements.forEach((element, index) => {
      const img = new Image();
      img.src = element.src;
      ctx.drawImage(
        img, 
        element.x, 
        element.y, 
        element.width, 
        element.height
      );
      
      // Draw selection box around active element
      if (index === activeElementIndex) {
        ctx.strokeStyle = '#0070f3';
        ctx.lineWidth = 2;
        ctx.strokeRect(
          element.x - 2, 
          element.y - 2, 
          element.width + 4, 
          element.height + 4
        );
      }
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      const imgUrl = event.target.result;
      
      // Create new image to get dimensions
      const img = new Image();
      img.src = imgUrl;
      img.onload = () => {
        // Scale image while maintaining aspect ratio
        const maxWidth = 200;
        const scale = maxWidth / img.width;
        const newWidth = maxWidth;
        const newHeight = img.height * scale;
        
        // Add new design element
        const newElement = {
          src: imgUrl,
          x: (canvasRef.current.width - newWidth) / 2,
          y: (canvasRef.current.height - newHeight) / 2,
          width: newWidth,
          height: newHeight
        };
        
        setDesignElements([...designElements, newElement]);
        setActiveElementIndex(designElements.length);
      };
    };
    reader.readAsDataURL(file);
  };

  const handleCanvasMouseDown = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Check if we clicked on an element
    for (let i = designElements.length - 1; i >= 0; i--) {
      const el = designElements[i];
      if (
        x >= el.x && 
        x <= el.x + el.width && 
        y >= el.y && 
        y <= el.y + el.height
      ) {
        setActiveElementIndex(i);
        setDragStart({ x: x - el.x, y: y - el.y });
        setIsDragging(true);
        return;
      }
    }
    
    // If click was not on an element, clear selection
    setActiveElementIndex(-1);
  };

  const handleCanvasMouseMove = (e) => {
    if (!isDragging || activeElementIndex === -1) return;
    
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Update position of active element
    const updatedElements = [...designElements];
    updatedElements[activeElementIndex] = {
      ...updatedElements[activeElementIndex],
      x: x - dragStart.x,
      y: y - dragStart.y
    };
    
    setDesignElements(updatedElements);
  };

  const handleCanvasMouseUp = () => {
    setIsDragging(false);
  };

  const handleSaveDesign = () => {
    const canvas = canvasRef.current;
    const dataUrl = canvas.toDataURL('image/png');
    
    // Create download link
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = 'tshirt-design.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDeleteElement = () => {
    if (activeElementIndex === -1) return;
    
    const updatedElements = designElements.filter((_, index) => index !== activeElementIndex);
    setDesignElements(updatedElements);
    setActiveElementIndex(-1);
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <h2 className="text-xl font-bold">T-Shirt Designer</h2>
      <p className="text-gray-600">Upload images to create your custom design</p>
      
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleImageUpload}
        className="p-2 border rounded"
      />
      
      <div className="border border-gray-300 rounded">
        <canvas
          ref={canvasRef}
          width={500}
          height={600}
          onMouseDown={handleCanvasMouseDown}
          onMouseMove={handleCanvasMouseMove}
          onMouseUp={handleCanvasMouseUp}
          onMouseLeave={handleCanvasMouseUp}
          className="cursor-pointer"
        />
      </div>
      
      <div className="flex gap-4">
        <button
          onClick={handleSaveDesign}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Save Design
        </button>
        
        <button
          onClick={handleDeleteElement}
          disabled={activeElementIndex === -1}
          className={`px-4 py-2 rounded ${
            activeElementIndex !== -1 
              ? 'bg-red-600 text-white hover:bg-red-700' 
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Delete Selected
        </button>
      </div>
    </div>
  );
};

export default TShirtDesigner;