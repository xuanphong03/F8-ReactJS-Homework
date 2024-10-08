import { FaArrowRight, FaRankingStar } from 'react-icons/fa6';

function MyResume() {
  return (
    <section
      id="my-resume"
      className="grid w-full grid-cols-1 items-center gap-16 lg:grid-cols-2"
    >
      <div className="col-span-1">
        <h2 className="text-4xl font-semibold leading-relaxed">My Resume</h2>
        <p className="mb-4 mt-3 leading-relaxed text-secondaryColor lg:max-w-[75%]">
          Highly skilled and creative Web Developer with 5+ years of experience
          in crafting visually stunning and functionally robust websites and web
          applications.
        </p>
        <button className="flex items-center gap-2 rounded-md px-6 py-3 text-xs font-semibold uppercase hover:bg-slate-200">
          View more <FaArrowRight />
        </button>
      </div>
      <div className="col-span-1 grid gap-y-6 pr-0 lg:ml-auto lg:pr-12 xl:pr-32">
        <ul className="flex flex-col gap-5">
          <li className="flex items-start gap-4">
            <div className="flex size-12 items-center justify-center rounded-xl bg-primaryColor text-xl text-white shadow-lg">
              <FaRankingStar />
            </div>
            <h4 className="text-secondaryColor">
              Bachelor of Science in Computer Science
            </h4>
          </li>
          <li className="flex items-start gap-4">
            <div className="flex size-12 items-center justify-center rounded-xl bg-primaryColor text-xl text-white shadow-lg">
              <FaRankingStar />
            </div>
            <h4 className="text-secondaryColor">Certified Web Developer</h4>
          </li>
          <li className="flex items-start gap-4">
            <div className="flex size-12 items-center justify-center rounded-xl bg-primaryColor text-xl text-white shadow-lg">
              <FaRankingStar />
            </div>
            <h4 className="text-secondaryColor">
              Frontend Framework Proficiency Certification
            </h4>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default MyResume;
