import { FaArrowRight, FaRankingStar } from 'react-icons/fa6';

function MyResume() {
  return (
    <section className="mx-5 flex flex-col gap-16 py-24 lg:mx-0 lg:flex-row xl:mx-10 2xl:mx-20">
      <div className="lg:max-w-[50%] lg:basis-1/2">
        <h2 className="text-4xl font-semibold leading-relaxed">My Resume</h2>
        <p className="text-secondaryColor mb-4 mt-3 leading-relaxed lg:max-w-[75%]">
          Highly skilled and creative Web Developer with 5+ years of experience
          in crafting visually stunning and functionally robust websites and web
          applications.
        </p>
        <button className="flex items-center gap-2 rounded-md px-6 py-3 text-xs font-semibold uppercase hover:bg-slate-200">
          View more <FaArrowRight />
        </button>
      </div>
      <div className="lg:max-w-[50%] lg:basis-1/2">
        <ul className="flex flex-col gap-5">
          <li className="flex items-start gap-4">
            <div className="bg-primaryColor flex size-12 items-center justify-center rounded-xl text-xl text-white shadow-lg">
              <FaRankingStar />
            </div>
            <h4 className="text-secondaryColor">
              Bachelor of Science in Computer Science
            </h4>
          </li>
          <li className="flex items-start gap-4">
            <div className="bg-primaryColor flex size-12 items-center justify-center rounded-xl text-xl text-white shadow-lg">
              <FaRankingStar />
            </div>
            <h4 className="text-secondaryColor">Certified Web Developer</h4>
          </li>
          <li className="flex items-start gap-4">
            <div className="bg-primaryColor flex size-12 items-center justify-center rounded-xl text-xl text-white shadow-lg">
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
