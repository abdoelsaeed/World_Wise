import CiteItem from './CiteItem';
import styles from './CityList.module.css';
import Spinner from './Spinner';
import Message from './Message';
import { useCities } from '../contexts/CitiesContext';
import { useTranslation } from "react-i18next";

function CityList() {
  const { t } = useTranslation();

  const { cities, isLoading } = useCities();
  if (isLoading) return <Spinner />;
  if (!cities.length) return <Message message={t("addFirstCity")} />;

  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CiteItem key={city.id} city={city}/>
      ))}
    </ul>
  );
}

export default CityList
