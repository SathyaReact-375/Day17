import React, { useState, useEffect } from "react";
import axios from "axios";

const Miniproject2 = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/photos"
        );
        setImages(response.data);
      } catch (err) {
        setError("Failed to fetch images. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  const styles = {
    gallery: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
      gridGap: "16px",
      padding: "16px",
    },
    galleryItem: {
      position: "relative",
    },
    image: {
      width: "100%",
      height: "auto",
      objectFit: "cover",
      borderRadius: "8px",
      transition: "transform 0.3s ease",
    },
    loader: {
      textAlign: "center",
      fontSize: "1.2rem",
      marginTop: "40px",
      color: "#555",
    },
    error: {
      textAlign: "center",
      fontSize: "1.2rem",
      marginTop: "40px",
      color: "red",
    },
    noImages: {
      textAlign: "center",
      fontSize: "1.2rem",
      marginTop: "40px",
      color: "#555",
    },
  };

  if (loading) {
    return <div style={styles.loader}>Loading...</div>;
  }

  if (error) {
    return <div style={styles.error}>{error}</div>;
  }

  return (
    <div style={styles.gallery}>
    <h1>Miniproject2</h1>{" "}
      {images.length > 0 ? (
        images.map((image) => (
          <div key={image.id} style={styles.galleryItem}>
           {" "}
            <img
              src={image.thumbnailUrl}
              alt={image.title || "Gallery Image"}
              style={styles.image}
            />
           {" "}
          </div>
        ))
      ) : (
        <div style={styles.noImages}>No images available.</div>
      )}
      {" "}
    </div>
  );
};

export default Miniproject2;
