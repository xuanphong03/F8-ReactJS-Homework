import { MdOutlineShoppingBag } from "react-icons/md";
import Logo from "../../assets/icons/logo.ico";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Header() {
  const cart = useSelector((state) => state.cart);
  const amount = cart.reduce((amount, product) => {
    return amount + product.quantity;
  }, 0);

  return (
    <header className="sticky top-0 left-0 right-0 bg-slate-700 z-50">
      <div className="flex items-center justify-between container mx-auto py-4">
        <Link to="/">
          <img alt="logo" src={Logo} className="size-10" />
        </Link>
        <div className="relative text-white">
          <Link to="/cart" className="hover:text-red-500">
            <MdOutlineShoppingBag className="text-4xl" />
          </Link>
          <span className="absolute -top-2 -right-2">{amount}</span>
        </div>
      </div>
    </header>
  );
}

export default Header;
