import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import Homepage from "./pages/Homepage";
import AppLayout from "./pages/AppLayout";
import PageNotFound from "./pages/PageNotFound";
import Login from "./pages/Login";
import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import Form from './components/Form';
import City from './components/City';
import { CitiesProvider } from "./contexts/CitiesContext";
import { AuthProvider } from "./contexts/FakeAuth";
import LanguageSwitcher from "./components/LanguageSwitcher";
export const flagemojiToPNG = (flag) => {
  var countryCode = Array.from(flag, (codeUnit) => codeUnit.codePointAt())
    .map((char) => String.fromCharCode(char - 127397).toLowerCase())
    .join("");
  return (
    <img src={`https://flagcdn.com/24x18/${countryCode}.png`} alt="flag" />
  );
};
function App() {

  return (
    <AuthProvider>
      <CitiesProvider>
        <div>
          <BrowserRouter>
            <LanguageSwitcher/>
            <Routes>
              <Route index element={<Homepage />} />
              <Route path="app" element={<AppLayout />}>
                <Route index element={<Navigate replace to="cities" />} />

                <Route path="cities" element={<CityList />} />
                <Route path="cities/:id" element={<City />} />
                <Route path="countries" element={<CountryList />} />
                <Route path="form" element={<Form />} />
              </Route>
              <Route path="/login" element={<Login />} />
              <Route path="product" element={<Product />} />
              <Route path="pricing" element={<Pricing />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </BrowserRouter>
        </div>
      </CitiesProvider>
    </AuthProvider>
  );
}

export default App;
