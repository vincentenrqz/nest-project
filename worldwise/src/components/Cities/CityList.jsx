import React from "react";
import styles from "../../styles/CityList.module.css";
import Spinner from "../Spinner";
import Message from "../Message";
import CityItem from "./CityItem";

const CityList = ({ cities, isLoading, emojiFlag }) => {
  if (isLoading) return <Spinner />;
  if (!cities.length)
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );

  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem city={city} key={city.id} emojiFlag={emojiFlag} />
      ))}
    </ul>
  );
};

export default CityList;
