import { useEffect } from "react";
import ProductForm from "../components/ProductForm";
import ProductTable from "../components/ProductTable";
import { useDispatch } from "react-redux";
import { setCurrentPage } from "../features/Navbar/navbarSlice";
import axios from "axios";

const AddProductsPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCurrentPage("addProduct"));
  }, [dispatch]);

  const handleGeneratePDF = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("User not logged in. Please log in to generate the invoice.");
        return;
      }
  
      const htmlContent = `
        <html>
          <body>
            <h1>Invoice</h1>
            <p>This is a test invoice.</p>
          </body>
        </html>
      `;
  
      const response = await axios.post(
        "http://server-invoice.vercel.app/api/invoices/generate-pdf",
        { htmlContent },
        {
          headers: { Authorization: `Bearer ${token}` },
          responseType: "blob", // Ensure responseType is blob
        }
      );
  
      // Verify Blob
      const blob = new Blob([response.data], { type: "application/pdf" });
      console.log("Blob Size:", blob.size); // Debug blob size
  
      if (blob.size === 0) {
        alert("Failed to generate PDF. Please check the server.");
        return;
      }
  
      const url = URL.createObjectURL(blob);
  
      // Open PDF in a new tab
      window.open(url, "_blank");
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Failed to generate PDF.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white px-6 py-12">
      <h1 className="text-3xl font-bold mt-8">Add Products</h1>
      <div className="mt-8">
        <ProductForm />
      </div>
      <div className="mt-8">
        <ProductTable />
      </div>
      <button
        onClick={handleGeneratePDF}
        className="mt-8 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        Generate PDF Invoice
      </button>
    </div>
  );
};

export default AddProductsPage;