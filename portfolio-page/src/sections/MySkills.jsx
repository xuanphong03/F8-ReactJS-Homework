/* eslint-disable react/no-unescaped-entities */
import SkillItem from '~/components/SkillItem';
import { IoMdFingerPrint } from 'react-icons/io';
import { MdOutlineWeb } from 'react-icons/md';
MySkills.propTypes = {};

function SkillsList({ skills = [] }) {
  return (
    <div className="grid grid-cols-12 gap-y-10">
      {skills.map(({ id, title, desc, icon }) => (
        <SkillItem key={id} title={title} desc={desc} icon={icon} />
      ))}
    </div>
  );
}

function MySkills() {
  const MY_SKILLS = [
    {
      id: 1,
      icon: <MdOutlineWeb />,
      title: 'Frontend Web Development',
      desc: `Creating beautiful and functional web experiences is my forte. Using the latest technologies and best practices, I design and build websites that captivate and engage users.`,
    },
    {
      id: 2,
      icon: <IoMdFingerPrint />,
      title: 'Frontend Web Development',
      desc: `I specialize in creating responsive and intuitive mobile apps that work seamlessly across iOS & Android devices. From concept to deployment, I handle every stage of the development process.`,
    },
    {
      id: 3,
      icon: <MdOutlineWeb />,
      title: 'Frontend Web Development',
      desc: `I'm well-versed in the industry's most popular frontend technologies, including HTML5, CSS3, JavaScript, and frameworks like React and React Native.`,
    },
    {
      id: 4,
      icon: <MdOutlineWeb />,
      title: 'Frontend Web Development',
      desc: `Performance matters. I optimize websites and apps for speed, ensuring your users enjoy a fast and responsive experience, which in turn boosts user satisfaction and SEO rankings.`,
    },
    {
      id: 5,
      icon: <MdOutlineWeb />,
      title: 'Frontend Web Development',
      desc: `My development goes hand-in-hand with an eye for design. I create user interfaces that are not only functional but also aesthetically pleasing, providing a seamless and enjoyable user journey.`,
    },
    {
      id: 6,
      icon: <MdOutlineWeb />,
      title: 'Frontend Web Development',
      desc: `I rigorously test and debug applications to guarantee a bug-free and secure environment for users. Your peace of mind is as important to me as the functionality of your project.`,
    },
  ];
  return (
    <section>
      <div className="mx-5 mb-20">
        <h2 className="mb-2 text-center font-bold">My skills</h2>
        <h3 className="mb-4 text-center text-5xl font-semibold">What I do</h3>
        <p className="text-secondaryColor text-center text-xl leading-relaxed lg:mx-20 xl:mx-24 2xl:mx-28">
          I'm not just a developer; I'm a digital dreamweaver. Crafting
          immersive online experiences is not just a job but my calling.
          Discover below how I can help you.
        </p>
      </div>
      <div>
        <SkillsList skills={MY_SKILLS} />
      </div>
    </section>
  );
}

export default MySkills;
