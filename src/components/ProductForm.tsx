import { useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "@/features/products/productslice";

const ProductForm = () => {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const dispatch = useDispatch();

  const handleAddProduct = () => {
    if (productName && productPrice && quantity) {
      const price = parseFloat(productPrice);
      const qty = parseInt(quantity, 10);
      const total = price * qty; // Calculate total
      const gst = total * 0.18; // Calculate GST (18%)
  
      const product = {
        name: productName,
        quantity: qty,
        rate: price,  
        price,  
        total,
        gst,
        totalPrice: total + gst,  
      };
  
      dispatch(addProduct(product)); // Add product to Redux
      setProductName("");
      setProductPrice("");
      setQuantity("");
    } else {
      alert("Please fill all fields.");
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <input
        type="text"
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
        placeholder="Enter the product name"
        className="px-4 py-2 bg-gray-800 text-white rounded"
      />
      <input
        type="number"
        value={productPrice}
        onChange={(e) => setProductPrice(e.target.value)}
        placeholder="Enter the price"
        className="px-4 py-2 bg-gray-800 text-white rounded"
      />
      <input
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        placeholder="Enter the Qty"
        className="px-4 py-2 bg-gray-800 text-white rounded"
      />
      <button
        onClick={handleAddProduct}
        className="col-span-1 lg:col-span-1 place-items-centerpx-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        Add Product +
      </button>
    </div>
  );
};

export default ProductForm;