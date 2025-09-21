import { useTranslation } from "react-i18next";
import styles from "./LanguageSwitcher.module.css";
import * as React from "react";
import Button from "@mui/material/Button";

function LanguageSwitcher() {
  const { i18n, t } = useTranslation();
  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("lang", lang);
  };
  const isEnglish = i18n.language === "en";

  const button = {
    fontSize: "14px",
    padding: "8px 16px",
    border: "none",
    borderRadius: "25px",
    fontWeight: "600",
    textTransform: "none",
    transition: "all 0.6s ease",
    minWidth: "80px",
    position: "relative",
    marginLeft: "1px",
    overflow: "hidden",
  };
  return (
    <div className={styles.manageLang}>
      <Button
        variant="contained"
        disabled={isEnglish}
        onClick={() => changeLanguage("en")}
        style={{
          backgroundColor: isEnglish ? "#00c46a" : "#e0e0e0",
          color: isEnglish ? "white" : "black",
          ...button,
        }}
      >
        English
      </Button>
      <Button
        variant="contained"
        disabled={!isEnglish}
        onClick={() => changeLanguage("ar")}
        style={{
          backgroundColor: !isEnglish ? "#00c46a" : "#e0e0e0",
          color: !isEnglish ? "white" : "black",
          ...button,
        }}
      >
        العربية
      </Button>
    </div>
  );
}

export default LanguageSwitcher;
