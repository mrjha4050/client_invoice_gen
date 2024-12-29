import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { useNavigate } from "react-router-dom";
import { setCurrentPage, logout } from "../features/Navbar/navbarSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentPage } = useSelector((state: RootState) => state.navbar);

  let buttonText = "";
  let buttonAction: () => void = () => {};
  
  if (currentPage === "signup") {
    buttonText = "Login";
    buttonAction = () => {
      dispatch(setCurrentPage("login"));  
      navigate("/login");  
    };
  } else if (currentPage === "login") {
    buttonText = "Connecting People With Technology";
    buttonAction = () => {};  
  } else if (currentPage === "addProduct") {
    buttonText = "Logout";
    buttonAction = () => {
      dispatch(logout());  
      dispatch(setCurrentPage("login"));  
      navigate("/");  
    };
  }

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-gray-800 text-white">
 <div className="text-xl font-bold">levitation infotech</div>
      <button
        onClick={buttonAction}
        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        {buttonText}
      </button>
    </nav>
  );
};

export default Navbar;