import { useSelector } from "react-redux";
import { RootState } from "@/app/store";

const ProductTable = () => {
  const products = useSelector((state: RootState) => state.products.products);

  const subtotal = products.reduce((total, product) => total + product.totalPrice, 0);
  const gst = (subtotal * 18) / 100;
  const totalWithGST = subtotal + gst;

  return (
    <div className="mt-8">
      <table className="w-full text-left bg-gray-800 text-white rounded">
        <thead>
          <tr className="bg-gray-700">
            <th className="px-4 py-2">Product Name</th>
            <th className="px-4 py-2">Price</th>
            <th className="px-4 py-2">Quantity</th>
            <th className="px-4 py-2">Total Price</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index} className="border-t border-gray-700">
              <td className="px-4 py-2">{product.name}</td>
              <td className="px-4 py-2">{product.price}</td>
              <td className="px-4 py-2">{product.quantity}</td>
              <td className="px-4 py-2">{product.totalPrice}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4">
        <p>Sub-Total: INR {subtotal.toFixed(2)}</p>
        <p>Incl + GST 18%: INR {totalWithGST.toFixed(2)}</p>
      </div>
 
    </div>
  );
};

export default ProductTable;