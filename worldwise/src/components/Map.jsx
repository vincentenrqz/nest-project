import React from "react";
import styles from "../styles/Map.module.css";
import { useNavigate, useSearchParams } from "react-router-dom";

const Map = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  return (
    <div
      className={styles.mapContainer}
      onClick={() => {
        navigate("form");
      }}
    >
      <h1>Map</h1>
      <h1>
        Position: {lat}, {lng}
      </h1>
      <button onClick={() => setSearchParams({ lat: 50, lng: 23 })}>
        Change position
      </button>
    </div>
  );
};

export default Map;
