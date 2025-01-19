import React, { useState } from "react";
import Card from "./components/Card";
import SearchBar from "./components/SearchBar";
import Header from "./components/Header";
import "./App.css";
import Profile from "./components/Profile";

function App() {
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const profiles = [
    {
      name: "John Doe",
      description: "Passionate about developing scalable software solutions.",
      email: "john.doe@example.com",
      status: "active",
      img: "https://images.unsplash.com/photo-1530268729831-4b0b9e170218?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      address: "123 Main St, San Francisco, CA, USA",
      location: {
        lat: 37.7749,
        lng: -122.4194,
      },
    },
    {
      name: "Jane Smith",
      description:
        "Expert in managing large projects with cross-functional teams.",
      email: "jane.smith@example.com",
      status: "inactive",
      img: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      address: "456 Park Ave, New York, NY, USA",
      location: {
        lat: 40.7128,
        lng: -74.006,
      },
    },
    {
      name: "Alice Johnson",
      description:
        "Designs user-friendly interfaces with a focus on accessibility.",
      email: "alice.johnson@example.com",
      status: "active",
      img: "https://plus.unsplash.com/premium_photo-1688350808212-4e6908a03925?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      address: "789 Elm St, Austin, TX, USA",
      location: {
        lat: 30.2672,
        lng: -97.7431,
      },
    },
    {
      name: "Bob Brown",
      description:
        "Loves analyzing data to uncover hidden patterns and trends.",
      email: "bob.brown@example.com",
      status: "inactive",
      img: "https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      address: "321 Oak Dr, Seattle, WA, USA",
      location: {
        lat: 47.6062,
        lng: -122.3321,
      },
    },
    {
      name: "Charlie Davis",
      description:
        "Innovates and drives product development from idea to launch.",
      email: "charlie.davis@example.com",
      status: "active",
      img: "https://images.unsplash.com/photo-1600180758890-6b94519a8ba6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      address: "654 Pine Rd, Boston, MA, USA",
      location: {
        lat: 42.3601,
        lng: -71.0589,
      },
    },
    {
      name: "Vaishali Nile",
      description:
        "Crafts marketing strategies that drive customer engagement.",
      email: "emma.wilson@example.com",
      status: "active",
      img: "https://plus.unsplash.com/premium_photo-1661726660137-61b182d93809?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      address: "987 Maple Ln, Chicago, IL, USA",
      location: {
        lat: 19.8541041,
        lng: 75.3517558,
      },
    },
  ];

  const filteredProfiles = profiles.filter((profile) => {
    const matchesFilter = filter === "all" || profile.status === filter;
    const matchesSearch =
      profile.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      profile.role.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="container">
      <div className="top">
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        {/* <Profile /> */}
      </div>
      <Header setFilter={setFilter} filter={filter} />
      <div className="card-container">
        {filteredProfiles.map((profile, index) => (
          <Card key={index} profile={profile} />
        ))}
      </div>
    </div>
  );
}

export default App;
