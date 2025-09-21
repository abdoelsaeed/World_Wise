import { NavLink } from "react-router-dom";
import styles from "./PageNav.module.css";
import Logo from "./Logo";
import { useTranslation } from "react-i18next";

function PageNav() {
  const { t } = useTranslation();
  return (
    <nav className={styles.nav}>
      <Logo></Logo>
      <ul>
        <li>
          <NavLink to="/product">{t("PRODUCT")}</NavLink>
        </li>

        <li>
          <NavLink to="/pricing">{t("PRICING")}</NavLink>
        </li>
        <li>
          <NavLink to="/login" className={styles.ctaLink}>
            {t("LOGIN")}
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default PageNav;
