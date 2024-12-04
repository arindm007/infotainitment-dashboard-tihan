import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./Store.css";

const Store = () => {
  const { category } = useParams();
  const [apps, setApps] = useState([]);

  useEffect(() => {
    // Fetch data from the JSON file
    fetch("/data/data.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((data) => setApps(data))
      .catch((error) => console.error("Error fetching apps data:", error));
  }, []);

  // Filter apps based on category
  const filteredApps = category
    ? apps.filter((app) => app.category === category)
    : apps;

  return (
    <div className="store">
      <h2>{category ? `Apps in ${category}` : "Our Recommendation for You"}</h2>
      <p>{category ? `Favourite ${category} in 2024` : "Favourite design apps in 2024"}</p>
      <div className="store-grid">
        {filteredApps.map((app) => (
          <div className="store-card" key={app.id}>
            <h3>{app.name}</h3>
            <p className="category">{app.category}</p>
            {app.likes && <span className="badge">{app.likes}</span>}
            <p>
              <strong>Downloads:</strong> {app.downloads}
            </p>
            <p>
              <strong>Rating:</strong> ⭐ {app.rating}
            </p>
            <p className="description">{app.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Store;
