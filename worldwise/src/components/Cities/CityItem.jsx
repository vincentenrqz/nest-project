import React from "react";
import styles from "../../styles/CityItem.module.css";
import { Link } from "react-router-dom";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

const CityItem = ({ city, emojiFlag }) => {
  const { id, cityName, emoji, date, position } = city;

  return (
    <Link
      className={styles.cityItem}
      to={`${id}?lat=${position.lat}&lng=${position.lng}`}
    >
      <span className={styles.emoji}>{emojiFlag(emoji)}</span>
      <h3 className={styles.name}>{cityName}</h3>
      <time className={styles.date}>({formatDate(date)})</time>

      <button className={styles.deleteBtn}>&times;</button>
    </Link>
  );
};

export default CityItem;