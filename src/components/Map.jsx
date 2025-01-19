import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix default icon issue with Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const Map = ({ users }) => {
  const createCustomIcon = (imgUrl) => {
    return L.divIcon({
      className: "custom-icon",
      html: `
        <div style="
          width: 40px; 
          height: 40px; 
          border-radius: 50%; 
          overflow: hidden; 
          box-shadow: 0 0 5px rgba(0,0,0,0.3);
          transform: translate(-20px, -20px);">
          <img 
            src="${imgUrl}" 
            alt="User Icon" 
            style="width: 100%; height: 100%; object-fit: cover;" />
        </div>
      `,
    });
  };

  // Set a default center for the map
  const defaultCenter = [37.7749, -122.4194]; // San Francisco

  // Component to handle zooming to the location
  const ZoomToLocation = ({ lat, lng }) => {
    const map = useMap();
    const handleClick = () => {
      map.flyTo([lat, lng], 16, { duration: 1.5 });
    };

    return (
      <button
        onClick={handleClick}
        style={{
          display: "block",
          margin: "10px auto",
          padding: "5px 10px",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Zoom to Location
      </button>
    );
  };

  return (
    <MapContainer
      center={defaultCenter}
      zoom={4}
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {users.map((user, index) => (
        <Marker
          key={index}
          position={[user.location.lat, user.location.lng]}
          icon={createCustomIcon(user.img)}
        >
          <Popup>
            <div>
              <img
                src={user.img}
                alt={`${user.name}'s profile`}
                style={{
                  width: "100px",
                  height: "100px",
                  borderRadius: "50%",
                  marginBottom: "10px",
                  cursor: "pointer",
                }}
                onClick={() => {
                  const map =
                    document.querySelector(".leaflet-container")._leaflet_map; // Access the map instance
                  map.flyTo([user.location.lat, user.location.lng], 16, {
                    duration: 1.5,
                  }); // Smooth zoom
                }}
              />
              <h3>{user.name}</h3>
              <p>{user.description}</p>
              <p>{user.email}</p>
              <p>Status: {user.status}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;
