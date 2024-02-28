import {
  NotebookPen,
  BookMinus,
  BookPlus,
  User,
  PlusSquareIcon,
  MinusSquareIcon,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { AdminProductCard } from "../AdminProductCard/AdminProductCard";
import { PanelLeftIcon, PanelRightIcon } from "lucide-react";
import { hostName } from "../../ulits/GlobalHostName";
import { useDispatch } from "react-redux";
import { sendUpdateProps } from "../../features/authSlice";

export function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // const hostName = window.location.hostname;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fetchData = async () => {
    try {
      console.log(hostName);
      const response = await fetch(`http://${hostName}:3000/product/getAll`);
      const data = await response.json();
      data.forEach((item) => {
        const name = item.imagePath.split("\\")[1];
        item.imagePath = `http://${hostName}:3000/${name}`;
      });
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleUpdate = (product) => {
    console.log("Update product:", product);
    dispatch(sendUpdateProps(product));
    navigate("/edit/" + product.id);
  };

  // Delete functionality
  const handleDelete = async (id) => {
    console.log("Delete product:", id);
    try {
      await fetch(`http://${hostName}:3000/product/${id}`, {
        method: "DELETE",
      });
      // Assuming endpoint to fetch products
      setProducts(products.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  return (
    <div className="flex flex-row flex-wrap">
      {/* Admin Dashboard */}
      <aside
        className={`w-64 min-w-2 overflow-y-auto border-r bg-slate-200 px-5 py-8 ${
          isMenuOpen ? "block" : "hidden"
        } lg:block`}
      >
        <div className="mt-6">
          <nav className="space-y-3">
            <label className="text-sm font-semibold uppercase text-gray-950 block">
              Admin Functions:
            </label>
            <NavLink
              className="flex items-center rounded-lg px-3 py-2 text-gray-800 transition-colors duration-300 hover:bg-gray-200 hover:text-gray-900"
              to="/add"
              onClick={closeMenu}
            >
              <BookPlus className="h-5 w-5" aria-hidden="true" />
              <span className="mx-2 text-sm font-medium">Add Product</span>
            </NavLink>
            <NavLink
              className="flex items-center rounded-lg px-3 py-2 text-gray-800 transition-colors duration-300 hover:bg-gray-200 hover:text-gray-900"
              to="/"
              onClick={closeMenu}
            >
              <NotebookPen className="h-5 w-5" aria-hidden="true" />
              <span className="mx-2 text-sm font-medium">Update Product</span>
            </NavLink>
            <NavLink
              className="flex items-center rounded-lg px-3 py-2 text-gray-800 transition-colors duration-300 hover:bg-gray-200 hover:text-gray-900"
              to="/"
              onClick={closeMenu}
            >
              <BookMinus className="h-5 w-5" aria-hidden="true" />
              <span className="mx-2 text-sm font-medium">Delete Product</span>
            </NavLink>
            <NavLink
              className="flex items-center rounded-lg px-3 py-2 text-gray-800 transition-colors duration-300 hover:bg-gray-200 hover:text-gray-900"
              to="/"
              onClick={closeMenu}
            >
              <User className="h-5 w-5" aria-hidden="true" />
              <span className="mx-2 text-sm font-medium">Profile</span>
            </NavLink>
          </nav>
        </div>
      </aside>

      {/* Product Cards */}
      <div
        className="flex-1"
        style={{ overflowY: "scroll", height: "calc(100vh - 55px)" }}
      >
        <div className="w-full text-center bg-black text-white p-2">
          <h1>Product Cards</h1>
        </div>
        <div className="flex justify-evenly gap-3 px-3 py-3 flex-wrap grid-cols-5 mb-[50px]">
          {products.map((product, index) => (
            <AdminProductCard
              key={product.id}
              name={product.name}
              description={product.description}
              price={product.price}
              quantity={product.quantity}
              imagePath={product.imagePath}
              onUpdate={() => handleUpdate(product)}
              onDelete={() => handleDelete(product.id)}
            />
          ))}
        </div>
      </div>

      {/* Menu Button for Mobile */}
      <div className="lg:hidden">
        {isMenuOpen ? (
          <div className="fixed inset-0 bg-gray-700 bg-opacity-75 z-50 top-14">
            <div className="absolute inset-y-0 left-0 w-64 bg-slate-200">
              <div className="p-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-bold">Admin Functions</span>
                  <button
                    onClick={toggleMenu}
                    className="text-gray-950 hover:text-gray-700"
                  >
                    <MinusSquareIcon className="h-6 w-6" />
                  </button>
                </div>
                <nav className="space-y-3">
                  <NavLink
                    className="block text-gray-950 hover:text-white hover:bg-slate-500"
                    to="/add"
                    onClick={closeMenu}
                  >
                    Add Product
                  </NavLink>
                  <NavLink
                    className="block text-gray-950 hover:text-white
                  hover:bg-slate-500"
                    to="/"
                    onClick={closeMenu}
                  >
                    Update Product
                  </NavLink>
                  <NavLink
                    className="block text-gray-950 hover:text-white hover:bg-slate-500"
                    to="/"
                    onClick={closeMenu}
                  >
                    Delete Product
                  </NavLink>
                  <NavLink
                    className="block text-gray-950 hover:text-white hover:bg-slate-500"
                    to="/"
                    onClick={closeMenu}
                  >
                    Profile
                  </NavLink>
                </nav>
              </div>
            </div>
          </div>
        ) : (
          <PlusSquareIcon
            onClick={toggleMenu}
            className="text-slate-50 h-6 w-6 cursor-pointer fixed top-14 left-8 z-50"
          />
        )}
      </div>
    </div>
  );
}
