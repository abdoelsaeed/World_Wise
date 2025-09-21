import styles from "./CountryList.module.css";
import Spinner from "./Spinner";
import Message from "./Message";
import CountryItem from './CountryItem';
import { useTranslation } from "react-i18next";
import { useCities } from "../contexts/CitiesContext";
function CountryList() {
  const { t } = useTranslation();
  const { cities, isLoading } = useCities();
  if (isLoading) return <Spinner />;
  if (!cities.length) {
    return <Message message={t("addFirstCity")} />;
  }
  
  const seen = new Set();
  const countries = cities.filter((city) => {
    if (seen.has(city.country)) {
      return false;
    }
    seen.add(city.country);
    return true;
  });
  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem key={country.country} country ={country}/>
      ))}
    </ul>
  );
}

export default CountryList;
