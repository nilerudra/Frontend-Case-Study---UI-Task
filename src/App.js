import React, { useEffect, useState } from "react";
import Card from "./components/Card";
import SearchBar from "./components/SearchBar";
import Header from "./components/Header";
import "./App.css";
import Map from "./components/Map";
import Modal from "./components/Modal";
import profilesData from "./data";
import AddProfileModal from "./components/AddProfileModal";
function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState("Home Page");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [map, setMap] = useState(false);
  const [profiles, setProfiles] = useState(profilesData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch profiles from the server when the component mounts
  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await fetch(
          "https://frontend-case-study-ui-task-backend.onrender.com/api/users"
        ); // Your API URL
        if (!response.ok) {
          throw new Error("Failed to fetch profiles");
        }
        const data = await response.json();
        console.log(data);
        setProfiles(data); // Set the fetched profiles to state
      } catch (err) {
        setError(err.message); // Set error if any occurs
      } finally {
        setLoading(false); // Set loading to false once fetching is done
      }
    };

    fetchProfiles();
  }, []);

  const handleAddProfile = (newProfile) => {
    setProfiles([...profiles, newProfile]); // Add the new profile to the list
  };
  const handleCurrentPage = () => {
    if (currentPage === "Home Page") {
      setCurrentPage("Admin Panel");
    } else {
      setCurrentPage("Home Page");
    }
  };
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
        <div>
          <button onClick={handleCurrentPage}>
            {currentPage === "Home Page" ? "Admin Panel" : "Home Page"}
          </button>
          {currentPage === "Admin Panel" && (
            <button onClick={() => setIsModalOpen(true)}>Add Profile</button>
          )}
          <button onClick={handleMapClick}>Map</button>
        </div>
      </div>
      <Header currentPage={currentPage} />
      <div className="card-container">
        {filteredProfiles.map((profile, index) => (
          <Card key={index} profile={profile} currentPage={currentPage} />
        ))}
      </div>
      <Modal isOpen={map} onClose={handleMapClose}>
        <Map users={filteredProfiles} />
      </Modal>
      <AddProfileModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddProfile={handleAddProfile}
      />
    </div>
  );
}

export default App;
