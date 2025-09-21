import { useCities } from "../contexts/CitiesContext";
import styles from "./CityItem.module.css";
import { Link } from "react-router-dom";
import { flagemojiToPNG } from "./../App";
const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

function CiteItem({ city }) {
  const { currentCity } = useCities();
  const { cityName, emoji, date, id, position } = city;
  const { deleteCity } = useCities();
  return (
    <li>
      <Link
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
        className={`${styles.cityItem} ${
          id === currentCity.id ? styles["cityItem--active"] : ""
        }`}
      >
        <span className={styles.emoji}>{flagemojiToPNG(emoji)}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>({formatDate(date)}) </time>
        <button
          className={styles.deleteBtn}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            deleteCity(city.id);
          }}
        >
          &times;
        </button>
      </Link>
    </li>
  );
}

export default CiteItem;
