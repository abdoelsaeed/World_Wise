import styles from "./Homepage.module.css";
import {Link} from 'react-router-dom';
import PageNav from '../components/PageNav';
import { useTranslation } from "react-i18next";

export default function Homepage() {
  const { t } = useTranslation();
  return (
    <main className={styles.homepage}>
      <PageNav />
      <section>
        <h1>
          {t("HomePageH1")}
          <br />
          {t("HomePageH1AfterBr")}
        </h1>
        <h2>{t("HomePageH2")}</h2>
        <Link to="/login" className="cta">
          {t("StartButton")}
        </Link>
      </section>
    </main>
  );
}
