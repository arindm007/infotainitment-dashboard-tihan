import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Categories.css";

const Categories = () => {
  const [apps, setApps] = useState([]);
  const [categories, setCategories] = useState({});

  // Fetch data from the JSON file
  useEffect(() => {
    fetch("/data/data.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((data) => {
        setApps(data);

        // Group apps by category
        const groupedCategories = data.reduce((acc, app) => {
          acc[app.category] = (acc[app.category] || []).concat(app);
          return acc;
        }, {});
        setCategories(groupedCategories);
      })
      .catch((error) => console.error("Error fetching apps data:", error));
  }, []);

  return (
    <div className="categories">
      <h1>TiHAN Store</h1>
      <h2>Browse by Categories</h2>
      <div className="categories-grid">
        {Object.keys(categories).map((category, index) => (
          <Link to={`/store/${category}`} className="category-card" key={index}>
            <h3>{category}</h3>
            <p>{categories[category].length} apps</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;
