import styles from "../../styles/CountryItem.module.css";

const CountryItem = ({ country, emojiFlag }) => {
  return (
    <li className={styles.countryItem}>
      <span>{emojiFlag(country.emoji)}</span>
      <span>{country.country}</span>
    </li>
  );
};

export default CountryItem;
