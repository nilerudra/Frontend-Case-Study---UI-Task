import React, { useState } from "react";
import Card from "./components/Card";
import SearchBar from "./components/SearchBar";
import Header from "./components/Header";
import "./App.css";
import Map from "./components/Map";
import Modal from "./components/Modal";
import profiles from "./data";
function App() {
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [map, setMap] = useState(false);

  const handleMapClick = () => {
    setMap(true);
  };
  const handleMapClose = () => {
    setMap(false);
  };

  const filteredProfiles = profiles.filter((profile) => {
    const matchesSearch = profile.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="container">
      <div className="top">
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <button onClick={handleMapClick}>Map</button>
      </div>
      <Header setFilter={setFilter} filter={filter} />
      <div className="card-container">
        {filteredProfiles.map((profile, index) => (
          <Card key={index} profile={profile} />
        ))}
      </div>
      <Modal isOpen={map} onClose={handleMapClose}>
        <Map users={filteredProfiles} />
      </Modal>
    </div>
  );
}

export default App;
