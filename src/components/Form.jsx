// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { useUrlPosition } from "./../hooks/useUrlPosition";
import { flagemojiToPNG } from "./../App";
import styles from "./Form.module.css";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import Message from "./Message";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Spinner from "./Spinner";
import { useCities } from "../contexts/CitiesContext";
export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";
function Form() {
  const { t } = useTranslation();

  const [lat, lng] = useUrlPosition();
  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
  const [cityName, setCityName] = useState("");
  const { createCity, isLoading } = useCities();
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [emoji, setEmoji] = useState("");
  const [geocodingError, setGeocodingError] = useState("");
  const navigate = useNavigate();
  useEffect(
    function () {
      setGeocodingError("");
      async function fetchCityData() {
        try {
          setIsLoadingGeocoding(true);
          const res = await fetch(
            `${BASE_URL}?latitude=${lat}&longitude=${lng}`
          );
          const data = await res.json();
          if (!data.countryCode) {
            throw new Error(t("errorClickOnMap"));
          }
          setCityName(data.city || data.locality || "");
          setCountry(data.countryName);
          setEmoji(convertToEmoji(data.countryCode));
        } catch (err) {
          setGeocodingError(err.message);
        } finally {
          setIsLoadingGeocoding(false);
        }
      }
      fetchCityData();
    },
    [lat, lng]
  );
  async function handleSubmit(e) {
    e.preventDefault();
    if (!cityName || !date) return;
    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: { lat, lng },
    };
    await createCity(newCity);
    navigate('/app')
  }
  if (geocodingError) return <Message message={geocodingError} />;
  if (isLoadingGeocoding) return <Spinner />;
  if (!lat && !lng)
    return <Message message={"start by clicking somewhere on the map"} />;
  return (
    <form
      className={`${styles.form} ${isLoading ? styles.loading : ""}`}
      onSubmit={handleSubmit}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">{t("cityNameOnForm")}</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />

        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">
          {t("DateForm")} {cityName}?
        </label>
        <DatePicker
          id="date"
          selected={date}
          onChange={(date) => setDate(date)}
          dateFormat="dd/MM/yyyy"
          showYearDropdown
          showMonthDropdown
        />{" "}
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">
          {t("Notes")} {cityName}
        </label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <Button
          type="back"
          onClick={(e) => {
            e.preventDefault();
            navigate(-1);
          }}
        >
          &larr; Back
        </Button>
      </div>
    </form>
  );
}

export default Form;
