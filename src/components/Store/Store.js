import React from "react";
import "./Store.css";

const Store = () => {
  const apps = [
    {
      id: 1,
      name: "Notion",
      category: "Note taking and productivity App",
      likes: "Most Like",
      downloads: "100K",
      rating: 4.8,
      description: "Notion is a freemium productivity and note-taking web application developed by Notion Labs Inc.",
    },
    {
      id: 2,
      name: "Figma",
      category: "UI/UX Tools",
      likes: "Most Popular",
      downloads: "100K",
      rating: 4.8,
      description: "Figma is a collaborative web application for interface design, with additional offline features enabled.",
    },
    {
      id: 3,
      name: "Slack",
      category: "Digital HQ",
      downloads: "74K",
      rating: 4.8,
      description: "Slack is your digital HQ. Great teamwork starts with a digital HQ with all your people, tools, and partners.",
    },
    {
      id: 4,
      name: "InVision",
      category: "Online Whiteboard",
      downloads: "70K",
      rating: 4.5,
      description: "The all-in-one collaborative online whiteboard. InVision's Freehand has everything your team needs.",
    },
    {
      id: 5,
      name: "Canva",
      category: "Graphic Design Tool",
      downloads: "80K",
      rating: 4.7,
      description: "Canva is a graphic design platform used to create social media graphics, presentations, posters, and more.",
    },
    {
      id: 6,
      name: "Adobe XD",
      category: "UI/UX Design",
      downloads: "50K",
      rating: 4.6,
      description: "Adobe XD is a powerful, collaborative, easy-to-use platform that helps you and your team create designs for apps.",
    },
    {
      id: 7,
      name: "Sketch",
      category: "UI Design Tool",
      downloads: "65K",
      rating: 4.5,
      description: "Sketch is a vector graphics editor for macOS, primarily used for designing user interfaces and wireframes.",
    },
    {
      id: 8,
      name: "Sketch-Pro",
      category: "UI Design Tool",
      downloads: "65K",
      rating: 4.5,
      description: "Sketch is a vector graphics editor for macOS, primarily used for designing user interfaces and wireframes.",
    },
  ];

  return (
    <div className="store">
      <h2>Our Recommendation for You</h2>
      <p>Favourite design apps in 2023</p>
      <div className="store-grid">
        {apps.map((app) => (
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
