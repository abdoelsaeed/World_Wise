import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

import styles from "./AppNav.module.css";
function AppNav() {
  const { t } = useTranslation();

  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <NavLink to="cities">{t("cities")}</NavLink>
        </li>
        <li>
          <NavLink to="countries">{t("countries")}</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default AppNav;
