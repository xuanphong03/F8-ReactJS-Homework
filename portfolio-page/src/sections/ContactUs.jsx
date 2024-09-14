import { FaPhone, FaTicket } from 'react-icons/fa6';
import { MdMail } from 'react-icons/md';
import InputField from '~/components/form-controls/InputField';
import RadioField from '~/components/form-controls/RadioField';
import TextAreaField from '~/components/form-controls/TextAreaField';
// import RadioField from '~/components/form-controls/RadioField';

/* eslint-disable react/no-unescaped-entities */
function ContactUs() {
  const InterestedServices = [
    { id: 1, name: 'design' },
    { id: 2, name: 'development' },
    { id: 3, name: 'support' },
    { id: 4, name: 'other' },
  ];
  return (
    <section className="py-16 sm:mx-5 lg:mx-0 xl:mx-10 2xl:mx-20">
      <div className="mb-20">
        <h2 className="mb-4 text-center text-5xl font-bold">Contact Us</h2>
        <p className="mx-auto text-center text-xl leading-relaxed text-secondaryColor lg:max-w-[45%] xl:max-w-[40%]">
          Ready to get started? Feel free to reach out through the contact form,
          and let's embark on a journey of innovation and success.
        </p>
      </div>
      <div className="flex flex-col gap-5 rounded-xl border border-solid border-gray-200 p-6 shadow-2xl lg:flex-row">
        <div className="rounded-md bg-primaryColor px-5 py-8 pb-28 text-white lg:max-w-[50%] lg:basis-1/2 lg:p-16 xl:max-w-[40%] xl:basis-2/5">
          <h3 className="mb-2 text-2xl font-semibold">Contact Information</h3>
          <p className="mb-8 text-secondaryColor">
            Fill up the form and our Team will get back to you within 24 hours.
          </p>
          <ul className="flex flex-col gap-4">
            <li className="flex items-center gap-4 font-semibold">
              <FaPhone className="text-2xl" /> +1(424) 535 3523
            </li>
            <li className="flex items-center gap-4 font-semibold">
              <MdMail className="text-2xl" /> hello@mail.com
            </li>
            <li className="flex items-center gap-4 font-semibold">
              <FaTicket className="text-2xl" /> Open Support Ticket
            </li>
          </ul>
        </div>
        <div className="flex flex-wrap gap-5 p-5 md:px-10 lg:max-w-[50%] lg:basis-1/2 xl:max-w-[60%] xl:basis-3/5">
          <div className="flex basis-full flex-wrap gap-5 lg:flex-nowrap">
            <div className="w-full lg:max-w-[50%] lg:basis-1/2">
              <InputField
                id="first-name"
                type="text"
                name="contact-first-name"
                label="First Name"
                placeholder="eg. Lucas"
              />
            </div>
            <div className="w-full lg:max-w-[50%] lg:basis-1/2">
              <InputField
                id="last-name"
                type="text"
                name="contact-last-name"
                label="Last Name"
                placeholder="eg. Jones"
              />
            </div>
          </div>
          <div className="w-full">
            <InputField
              id="email"
              type="email"
              name="contact-email"
              label="Email"
              placeholder="eg. lucas@gmail.com"
            />
          </div>
          <div className="w-full">
            <RadioField
              options={InterestedServices}
              label="What are you interested on?"
              id="interested-service"
              name="interested-services"
            />
          </div>
          <div className="w-full">
            <TextAreaField
              id="contact-message"
              name="contact-message"
              label="Your message"
            />
          </div>

          <div className="flex w-full md:justify-end">
            <button className="rounded-md bg-primaryColor px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white transition-all hover:shadow-xl md:w-fit">
              Send message
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactUs;
