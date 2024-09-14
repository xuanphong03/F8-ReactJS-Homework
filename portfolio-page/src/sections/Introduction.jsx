/* eslint-disable react/no-unescaped-entities */
import IntroductionImage from '~/assets/images/main.svg';
import Button from '~/components/Button';

function Introduction() {
  return (
    <section className="py-8">
      <div className="mx-0 flex flex-col gap-10 sm:mx-4 md:mx-0 lg:flex-row-reverse lg:items-center xl:mx-10 2xl:mx-20 2xl:min-h-[60vh]">
        <img
          className="h-[576px] w-full rounded-xl object-cover lg:w-1/2 lg:max-w-[50%] lg:basis-1/2"
          alt="introduction image"
          src={IntroductionImage}
        />
        <div className="lg:w-1/2 lg:max-w-[50%] lg:basis-1/2">
          <h1 className="mb-4 text-3xl font-bold lg:text-5xl lg:leading-tight">
            Welcome to my Web <br></br> Development Portofolio!
          </h1>
          <p className="mb-4 text-xl leading-relaxed tracking-wide text-secondaryColor md:pr-16">
            I'm Lily Smith, a passionate web developer based in USA. Here,
            you'll get a glimpse of my journey in the world of web development,
            where creativity meets functionality.
          </p>
          <form className="">
            <div>
              <label htmlFor="email" className="mb-2 block text-sm">
                Your email
              </label>
              <div className="flex flex-col gap-4 md:flex-row">
                <div className="relative md:w-3/5">
                  <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder=""
                    className="customized h-11 w-full rounded-md border-2 border-solid border-gray-300 p-3 outline-none"
                  />
                  <label
                    htmlFor="email"
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-500"
                  >
                    Enter your email
                  </label>
                </div>
                <Button content="Require offer" isSolid />
              </div>
            </div>
          </form>
          <p className="mt-2 text-sm leading-tight text-[#9e9e9e]">
            Read my{' '}
            <a href="#" className="underline">
              Terms and Conditions
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}

export default Introduction;
