import React, { useState, useEffect } from "react";
import "./App.css";

export default function App() {
  const accessKey = process.env.REACT_APP_UNSPLASH_ACCESS_KEY;
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      const res = await fetch(
        `https://api.unsplash.com/photos/?client_id=${accessKey}`
      );
      if (res) {
        const data = await res.json();
        setImages(data);
      }
    };
    fetchImages();
  }, [accessKey]);

  if (!accessKey) {
    return (
      <a className="error" href="https://unsplash.com/documentation">
        Click on to get accessKey
      </a>
    );
  }

  return (
    <div className="app">
      <h1>Unsplash Image Gallery!</h1>

      <form>
        <input type="text" placeholder="Search Unsplash..." />
        <button>Search</button>
      </form>

      <div className="image-grid">
        {images.map((image, index) => (
          <div className="image" key={index}>
            <img src={image.urls.regular} alt={image.alt_description} />
          </div>
        ))}
      </div>
    </div>
  );
}
