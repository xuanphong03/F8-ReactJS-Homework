import { FaFacebook } from 'react-icons/fa6';

QuickLink.propTypes = {};

function QuickLink() {
  return (
    <a
      href="https://www.material-tailwind.com/"
      target="_blank"
      rel="noreferrer"
    >
      <button className="shadow-3xl flex items-center gap-3 rounded-md bg-white p-2 text-xs font-bold uppercase">
        <FaFacebook className="text-xl" /> Made with material tailwind
      </button>
    </a>
  );
}

export default QuickLink;
