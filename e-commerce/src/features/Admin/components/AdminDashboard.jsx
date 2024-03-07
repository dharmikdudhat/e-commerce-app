/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import {
  NotebookPen,
  BookMinus,
  BookPlus,
  User,
  PlusSquareIcon,
  MinusSquareIcon,
  Table,
  LogOut,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { AdminProductCard } from "./AdminProductCard";
import { PanelLeftIcon, PanelRightIcon } from "lucide-react";
import { hostName } from "../../../shared/constant/GlobalHostName";
import { useDispatch } from "react-redux";
import { logout, sendUpdateProps } from "../../../store/authSlice";
import ProductListModal from "../modals/ProductListModel";
import ProfileModal from "../modals/ProfileModal";
import AddProductModel from "../modals/AddProductModal";
// import AddProductModel from "../AddProduct/AddProductModel";

export function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false); // New state for the AddProduct modal
  const [isProductListOpen, setIsProductListOpen] = useState(false);
  const [isProfile, setProfile] = useState(false);
  const [isAddProduct, setAddProduct] = useState(false);

  const openProductList = () => {
    setIsProductListOpen(true);
  }
  const  closeProductList = () => {
    setIsProductListOpen(false)
  };

  const openProfile = () => {
    setProfile(true);
  }

  const closeProfile = () => {
    setProfile(false);
  }

  const  addNewProduct = ()=>{
    setAddProduct(true);
  }
  const closeNewProduct = () => {
    setAddProduct(false);
  }

  // const openAddProductModal = () => {
  //   setIsAddProductModalOpen(true);
  // };

  // const closeAddProductModal = () => {
  //   setIsAddProductModalOpen(false);
  // };

  const handleCardClick = (index) => {
    setSelectedCard(index);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleUpdate = (product) => {
    dispatch(sendUpdateProps(product));
    navigate("/edit/" + product.id);
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(`${hostName}/product/getAll`);
        const data = await response.json();
        data.forEach((item) => {
          const name = item.imagePath.split("\\")[1];
          item.imagePath = `${hostName}/${name}`;
        });
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    })();
  }, []);

  // Delete functionality
  const handleDelete = async (id) => {
    console.log("Delete product:", id);
    try {
      await fetch(`${hostName}/product/${id}`, {
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
        className={`w-64  min-w-2 overflow-y-auto border-r bg-slate-200 px-5 py-8 ${
          isMenuOpen ? "block" : "hidden"
        } lg:block`}
      >
        <div className="mt-6">
          <nav className="space-y-3 fixed">
            <label className="text-sm font-semibold uppercase text-gray-950 block">
              Admin Functions:
            </label>
            <div>
              <NavLink
                className="flex items-center rounded-lg px-3 py-2 text-gray-800 transition-colors duration-300 hover:bg-gray-200 hover:text-gray-900"
                // to="/add"
                onClick={addNewProduct}
              >
               {/* <span
                className="flex items-center rounded-lg px-3 py-2 text-gray-800 transition-colors duration-300 hover:bg-gray-200 hover:text-gray-900 cursor-pointer"
                onClick={openAddProductModal}
              > */}
                <BookPlus className="h-5 w-5" aria-hidden="true" />
                <span className="mx-2 text-sm font-medium">Add Product</span>
              {/* </span> */}
              </NavLink>
              <NavLink
                className="flex items-center rounded-lg px-3 py-2 text-gray-800 transition-colors duration-300 hover:bg-gray-200 hover:text-gray-900"
                // to="/add"
                onClick={openProductList}
              >
                <Table className="h-5 w-5" aria-hidden="true" />
                <span className="mx-2 text-sm font-medium" >Product List</span>
              </NavLink>
            </div>
            <div>
              <NavLink
                className="flex items-center rounded-lg px-3 py-2 text-gray-800 transition-colors duration-300 hover:bg-gray-200 hover:text-gray-900"
                // to="/"
                onClick={openProfile}
              >
                <User className="h-5 w-5" aria-hidden="true" />
                <span className="mx-2 text-sm font-medium bottom-3">
                  Profile
                </span>
              </NavLink>
              <NavLink
                to="/"
                className="flex items-center rounded-lg px-3 py-2 text-gray-800 transition-colors duration-300 hover:bg-gray-200 hover:text-gray-900"
                onClick={() => dispatch(logout())}
              >
                <LogOut className="h-5 w-5" aria-hidden="true" />
                <span className="mx-2 text-sm font-medium bottom-3">
                  {" "}
                  Sign Out
                </span>
              </NavLink>
            </div>
          </nav>
        </div>
      </aside>

      {/* Product Cards */}
      <div className="flex-1">
        <div className="w-full sticky mt-2 text-center bg-teal-600 text-white p-2">
          <h1>Product Cards</h1>
        </div>
        <div className="flex justify-evenly gap-3 px-3 py-3 flex-wrap grid-cols-5 mb-[50px]">
          {products.map((product, index) => (
            <div
              key={index}
              className={`${
                selectedCard === index ? "selected-card" : ""
              } card-container`}
              onClick={() => handleCardClick(index)}
            >
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
            </div>
          ))}
        </div>
      </div>

      {/* Menu Button for Mobile */}
      <div className="lg:hidden">
        {isMenuOpen ? (
          <div className="fixed inset-0 top-14 bg-gray-700 bg-opacity-75 z-50 ">
            <div className="absolute inset-y-0 left-0 w-64   bg-slate-200">
              <div className="p-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-bold">Admin Functions</span>
                  <button
                    onClick={toggleMenu}
                    className="text-gray-950 hover:text-gray-700"
                  >
                    <MinusSquareIcon className="h-6 w-6 cursor-pointer fixed top-4 left-56 z-50" />
                  </button>
                </div>
                <nav className="space-y-3">
                  <div>
                    <NavLink
                      className="flex items-center rounded-lg px-3 py-2 text-gray-800 transition-colors duration-300 hover:bg-gray-200 hover:text-gray-900"
                      // to="/add"
                      onClick={addNewProduct}
                    >
                      <BookPlus className="h-5 w-5" aria-hidden="true" />
                      <span className="mx-2 text-sm font-medium">
                        Add Product
                      </span>
                    </NavLink>
                    <NavLink
                      className="flex items-center rounded-lg px-3 py-2 text-gray-800 transition-colors duration-300 hover:bg-gray-200 hover:text-gray-900"
                      // to="/add"
                      onClick={openProductList}
                    >
                      <Table className="h-5 w-5" aria-hidden="true" />
                      <span className="mx-2 text-sm font-medium">
                        Product List
                      </span>
                    </NavLink>
                  </div>
                </nav>
                <div>
                  <NavLink
                    className="flex items-center rounded-lg px-3 py-2 text-gray-800 transition-colors duration-300 hover:bg-gray-200 hover:text-gray-900"
                    // to="/"
                    onClick={openProfile}
                  >
                    <User className="h-5 w-5" aria-hidden="true" />
                    <span className="mx-2 text-sm font-medium bottom-3">
                      Profile
                    </span>
                  </NavLink>
                  <NavLink
                    to="/"
                    className="flex items-center rounded-lg px-3 py-2 text-gray-800 transition-colors duration-300 hover:bg-gray-200 hover:text-gray-900"
                    onClick={() => dispatch(logout())}
                  >
                    <LogOut className="h-5 w-5" aria-hidden="true" />
                    <span className="mx-2 text-sm font-medium bottom-3">
                      {" "}
                      Sign Out
                    </span>
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <PlusSquareIcon
            onClick={toggleMenu}
            className="text-slate-50 h-6 w-6 cursor-pointer fixed top-4 left-8 z-50"
          />
        )}
      </div>
      {/* <AddProductModel
        isOpen={isAddProductModalOpen}
        onClose={closeAddProductModal}
      /> */}
      <ProductListModal 
      isOpen={isProductListOpen}
      onClose={closeProductList}
      ></ProductListModal>
      <ProfileModal
      showProfile={isProfile}
      closeProfile={closeProfile}
      />
      <AddProductModel
      showAddProduct={isAddProduct}
      closeAddProduct={closeNewProduct}
      />
    </div>
  );
}
