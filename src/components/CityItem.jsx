/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";
import styles from "./CityItem.module.css";
import { useCities } from "../context/CitiesContext";

const formatDate = (date) => {
  const formattedDate = new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    weekday: "long",
    year: "numeric",
  }).format(new Date(date));

  return formattedDate;
};

export default function CityItem({ city }) {
  const { currentCity, deleteCity } = useCities();
  const { cityName, date, id, latitude, longitude } = city;

  function handleDelete(e) {
    e.preventDefault();
    deleteCity(id);
  }

  return (
    <li>
      <Link
        to={`${id}?lat=${latitude}&lng=${longitude}`}
        className={`${styles.cityItem} ${
          id === currentCity.id ? styles["cityItem--active"] : ""
        }`}
      >
        {/* <span className={styles.emoji}>{emoji}</span> */}
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>{formatDate(date)}</time>

        <button className={styles.deleteBtn} onClick={handleDelete}>
          &times;
        </button>
      </Link>
    </li>
  );
}
