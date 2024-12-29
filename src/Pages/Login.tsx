import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { useDispatch } from "react-redux";
import { setCurrentPage } from "../features/Navbar/navbarSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    dispatch(setCurrentPage("login"));
  }, [dispatch]);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(
        "https://server-invoice.vercel.app/api/auth/login",
        {
          email,
          password,
        }
      );

      const token = response.data.token;
      if (token) {
        localStorage.setItem("token", token);
        console.log("Token:", token);
        navigate("/addproducts");
      }
    } catch (error) {
      console.error("Login failed:", error);
      if (axios.isAxiosError(error) && error.response) {
        alert(error.response.data.message || "Login failed. Please try again.");
      } else {
        alert("Login failed. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between max-w-6xl w-full p-6 lg:p-12 gap-8">
        {/* Left Section: Auto-scrollable Images */}
        <div className="flex-shrink-0 w-full lg:w-1/2 rounded-xl overflow-hidden">
          <Swiper
            modules={[Autoplay]}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            loop={true}
            spaceBetween={10}
            slidesPerView={1}
            className="rounded-xl shadow-lg"
          >
            <SwiperSlide>
              <img
                src="https://res.cloudinary.com/dalptk18r/image/upload/v1735464567/munbtcce96vvsrbzzspl.png"
                alt="Slide 1"
                className="w-full h-[600px] object-cover rounded-xl"  
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src="https://res.cloudinary.com/dalptk18r/image/upload/v1735465382/ho677d0iqenwbips43tr.png"
                alt="Slide 2"
                className="w-full h-[600px] object-cover rounded-xl" // Increased height
              />
            </SwiperSlide>
          </Swiper>
        </div>

        {/* Right Section: Login Form */}
        <div className="w-full lg:w-1/2 bg-gray-800 p-8 lg:p-12 rounded-xl shadow-lg">
          <h1 className="text-3xl font-bold mb-4">Let the Journey Begin!</h1>
          <p className="text-gray-400 mb-6">
            This is a basic login page used for assignment purposes.
          </p>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-300"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Email ID"
                required
                className="w-full px-4 py-2 mt-2 bg-gray-700 text-white rounded focus:outline-none focus:ring focus:ring-green-500"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-300"
              >
                Current Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                className="w-full px-4 py-2 mt-2 bg-gray-700 text-white rounded focus:outline-none focus:ring focus:ring-green-500"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full px-4 py-2 ${
                isLoading ? "bg-gray-500" : "bg-green-500 hover:bg-green-600"
              } text-white rounded`}
            >
              {isLoading ? "Logging in..." : "Login now"}
            </button>
          </form>
          <p className="text-sm mt-4 text-right">
            <a
              href="#"
              className="text-green-400 hover:underline underline-offset-4"
            >
              Forgot password?
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
