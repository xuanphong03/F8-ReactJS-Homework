import Button from '~/components/Button';

function Footer() {
  return (
    <footer className="mt-10 pt-20">
      <div className="container mx-auto">
        <div className="mt-16 flex flex-col items-center gap-4 border-t border-solid border-gray-300 py-6 md:items-start lg:flex-row lg:items-center lg:justify-between">
          <p className="text-gray-700">
            © 2024 Made with <a href="#">Material Tailwind</a> by Creative Tim.
          </p>
          <ul className="flex flex-wrap items-center gap-8 text-sm text-gray-600">
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#about">About Us</a>
            </li>
            <li>
              <a href="#blog">Blog</a>
            </li>
            <li>
              <a href="#service">Service</a>
            </li>
            <li>
              <Button content="Subscribe" isSolid />
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
