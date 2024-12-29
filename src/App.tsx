import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./Pages/SignUp";
import LoginPage from "./Pages/Login";
import { store } from "./app/store";
import { Provider } from "react-redux";
import AddProductsPage from "./Pages/AddProductPage";
import Navbar from "./components/Navbar";
import ForgotPasswordPage from "./Pages/ForgotPasswordPage";
import ResetPasswordPage from "./Pages/ResetPasswordPage";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/addproducts" element={<AddProductsPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
