import { IoIosMenu } from 'react-icons/io';
import { IoMdClose } from 'react-icons/io';
import { FaPager } from 'react-icons/fa6';
import { MdAccountCircle } from 'react-icons/md';
import { IoTerminal } from 'react-icons/io5';
import { useEffect, useRef, useState } from 'react';
import Button from '~/components/Button';

function Header({ onHeaderHeightChange }) {
  const [isVisibleMenuMobile, setIsVisibleMenuMobile] = useState(false);
  const [menuHeight, setMenuHeight] = useState(0);
  const headerRef = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => {
    if (isVisibleMenuMobile) {
      const height = menuRef.current.scrollHeight;
      setMenuHeight(height);
    } else {
      setMenuHeight(0);
    }
  }, [isVisibleMenuMobile]);

  useEffect(() => {
    // Cập nhật chiều cao Header tới Main
    if (headerRef.current) {
      const headerHeight = headerRef.current.offsetHeight;
      onHeaderHeightChange(headerHeight);
    }
  }, [menuHeight, onHeaderHeightChange]);
  return (
    <header
      id="header"
      className="sticky left-0 right-0 top-0 z-50 bg-white bg-opacity-80 p-4 backdrop-blur-2xl"
    >
      <div className="lg:mx-4 lg:flex lg:items-center lg:justify-between xl:mx-14 2xl:mx-24">
        <div className="mx-0 flex h-10 items-center justify-between sm:mx-8 md:mx-2">
          <a href="#" className="text-blue-gray-900 text-lg font-bold">
            Material Tailwind
          </a>
          <button
            onClick={() => setIsVisibleMenuMobile((prevStatus) => !prevStatus)}
            className="flex size-10 items-center justify-center text-2xl lg:hidden"
          >
            {isVisibleMenuMobile ? <IoMdClose /> : <IoIosMenu />}
          </button>
        </div>

        <nav className="hidden lg:block">
          <ul className="flex items-center gap-5">
            <li>
              <a className="flex items-center gap-3" href="#page">
                <FaPager className="text-xl" /> Page
              </a>
            </li>
            <li>
              <a className="flex items-center gap-3" href="#account">
                <MdAccountCircle className="text-xl" />
                Account
              </a>
            </li>
            <li>
              <a className="flex items-center gap-3" href="#docs">
                <IoTerminal className="text-xl" />
                Docs
              </a>
            </li>
          </ul>
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Button content="Sign in" />
          <Button content="Blocks" isSolid />
        </div>

        <div
          ref={menuRef}
          style={{ height: `${menuHeight}px` }}
          className={`transition-height mx-[2px] mt-3 overflow-hidden border-t px-2 duration-500 sm:mx-8 md:mx-2 lg:hidden lg:border-0 ${isVisibleMenuMobile ? 'border-0' : ''}`}
        >
          <nav className="pt-4">
            <ul className="flex flex-col gap-5">
              <li>
                <a className="flex items-center gap-3" href="#page">
                  <FaPager className="text-xl" /> Page
                </a>
              </li>
              <li>
                <a className="flex items-center gap-3" href="#account">
                  <MdAccountCircle className="text-xl" />
                  Account
                </a>
              </li>
              <li>
                <a className="flex items-center gap-3" href="#docs">
                  <IoTerminal className="text-xl" />
                  Docs
                </a>
              </li>
            </ul>
          </nav>
          <div className="my-4 mt-6 flex items-center gap-2">
            <Button content="Sign in" />
            <Button content="Blocks" isSolid />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
