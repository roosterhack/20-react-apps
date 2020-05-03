import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import "./App.css";

export default function App() {
  const accessKey = process.env.REACT_APP_UNSPLASH_ACCESS_KEY;
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetchImages();
    // eslint-disable-next-line
  }, [page]);

  const fetchImages = async () => {
    let apiUrl = `https://api.unsplash.com/photos?`;

    if (query) apiUrl = `https://api.unsplash.com/search/photos?query=${query}`;

    apiUrl += `&page=${page}`;
    apiUrl += `&client_id=${accessKey}`;

    const res = await fetch(apiUrl);
    if (res) {
      const data = await res.json();
      const imagesFromApi = data.results ?? data;

      //if page is 1, then we need a whole new array of images
      if (page === 1) setImages(imagesFromApi);

      //if page > 1, then we are adding for our infinite scroll
      setImages((images) => [...images, ...imagesFromApi]);
    }
  };

  const searchPhotos = (e) => {
    e.preventDefault();
    setPage(1);
    fetchImages();
  };

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

      <form onSubmit={searchPhotos}>
        <input
          type="text"
          placeholder="Search Unsplash..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button>Search</button>
      </form>

      <InfiniteScroll
        dataLength={images.length}
        next={() => setPage((page) => page + 1)}
        hasMore
        loader={<h4>Loading...</h4>}
      >
        <div className="image-grid">
          {images.map((image, index) => (
            <a
              href={image.links.html}
              target="_blank"
              rel="noopener noreferrer"
              className="image"
              key={index}
            >
              <img src={image.urls.regular} alt={image.alt_description} />
            </a>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
}
