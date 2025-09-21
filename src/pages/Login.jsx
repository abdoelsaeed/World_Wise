import styles from "./Login.module.css";
import { useEffect, useState } from "react";
import PageNav from "../components/PageNav";
import Buttom from "../components/Button";
import { useTranslation } from "react-i18next";
import { useAuth } from "../contexts/FakeAuth";
import { useNavigate } from "react-router-dom";
export default function Login() {
  // PRE-FILL FOR DEV PURPOSES
  const { t } = useTranslation();

  const {login,isAuthenticated} = useAuth()
  const [email, setEmail] = useState("jack@example.com");
  const [password, setPassword] = useState("qwerty");
  const navigate = useNavigate()
  function handleSubmit(e){
    e.preventDefault();
    if(email&&password){
      login(email, password);
    }
  }
  useEffect(
    function () {
      if (isAuthenticated) {
        navigate("/app",{replace:true});
      }
    },
    [isAuthenticated, navigate]
  );
  return (
    <main className={styles.login}>
      <PageNav />
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <label htmlFor="email">{t("EMAIL")}</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">{t("PASSWORD")}</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <Buttom type="primary">{t("LOGINBUTTON")}</Buttom>
        </div>
      </form>
    </main>
  );
}
