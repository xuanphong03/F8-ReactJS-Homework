import PropTypes from "prop-types";
import { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import userApi from "~/apis/userApi";
import { AppContext } from "~/App";
import { logout } from "~/pages/Auth/userSlice";

Header.propTypes = {
  user: PropTypes.object,
};

function Header() {
  const dispatch = useDispatch();
  const {
    state: { totalQuantity },
  } = useContext(AppContext);

  const [showDropdownMenu, setShowDropdownMenu] = useState(false);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const getUserInfo = async () => {
    try {
      setLoading(true);
      const { data } = await userApi.getInfo();
      setUser(data.emailId);
    } catch (error) {
      throw new Error("Failed to get user info");
    } finally {
      setLoading(false);
    }
  };

  const handleToggleDropdownMenu = () => {
    setShowDropdownMenu(!showDropdownMenu);
  };

  const handleLogoutAccount = () => {
    const action = logout();
    dispatch(action);
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <header>
      <nav className="bg-gray-800">
        <div className="container mx-auto">
          <div className="relative flex h-16 items-center justify-between">
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex flex-shrink-0 items-center">
                <img
                  className="h-8 w-auto"
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                  alt="Logo"
                />
              </div>
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4">
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      `rounded-md px-3 py-2 text-sm font-medium text-white ${
                        isActive ? "bg-gray-700 " : ""
                      }`
                    }
                    aria-current="page"
                  >
                    Trang chủ
                  </NavLink>
                  <NavLink
                    to="/cart"
                    className={({ isActive }) =>
                      `relative rounded-md px-3 py-2 text-sm font-medium text-white ${
                        isActive ? "bg-gray-700 " : ""
                      }`
                    }
                  >
                    Giỏ hàng
                    <span className="absolute top-0 right-0 flex size-4 rounded-full items-center justify-center text-xs leading-none bg-red-500 text-white">
                      {totalQuantity < 100 ? totalQuantity : "99+"}
                    </span>
                  </NavLink>
                </div>
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <h4 className="text-white">
                {loading ? "Đang loading..." : user?.name}
              </h4>
              {/* Profile dropdown */}
              <div className="relative ml-3">
                <div>
                  <button
                    onClick={handleToggleDropdownMenu}
                    type="button"
                    className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  >
                    <img
                      className="h-8 w-8 rounded-full"
                      src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                      alt="avatar"
                    />
                  </button>
                </div>

                {showDropdownMenu && (
                  <div
                    className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                    tabIndex={-1}
                  >
                    <button
                      className="block px-4 py-2 text-sm text-gray-700 w-full text-left hover:text-red-500"
                      tabIndex={-1}
                      onClick={handleLogoutAccount}
                    >
                      Đăng xuất
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
