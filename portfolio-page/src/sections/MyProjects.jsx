/* eslint-disable react/no-unescaped-entities */

import ProjectItem from '~/components/ProjectItem';
import BlogImg01 from '~/assets/images/blog1.svg';
import BlogImg02 from '~/assets/images/blog2.svg';
import BlogImg03 from '~/assets/images/blog3.svg';
import BlogImg04 from '~/assets/images/blog4.svg';
function ProjectsList({ projects = [] }) {
  return (
    <div className="grid grid-cols-12 gap-y-20 md:gap-x-10">
      {projects.map(({ id, title, image, desc }) => (
        <ProjectItem key={id} title={title} image={image} desc={desc} />
      ))}
    </div>
  );
}

function MyProjects() {
  const MY_PROJECTS = [
    {
      id: 1,
      title: 'Mobile App Development',
      desc: 'Mobile app designed to help users discover and explore local restaurants and cuisines.',
      image: BlogImg01,
    },
    {
      id: 2,
      title: 'Mobile App Development',
      desc: 'Mobile app designed to help users discover and explore local restaurants and cuisines.',
      image: BlogImg02,
    },
    {
      id: 3,
      title: 'Mobile App Development',
      desc: 'Mobile app designed to help users discover and explore local restaurants and cuisines.',
      image: BlogImg03,
    },
    {
      id: 4,
      title: 'Mobile App Development',
      desc: 'Mobile app designed to help users discover and explore local restaurants and cuisines.',
      image: BlogImg04,
    },
    {
      id: 5,
      title: 'Mobile App Development',
      desc: 'Mobile app designed to help users discover and explore local restaurants and cuisines.',
      image: BlogImg01,
    },
    {
      id: 6,
      title: 'Mobile App Development',
      desc: 'Mobile app designed to help users discover and explore local restaurants and cuisines.',
      image: BlogImg02,
    },
    {
      id: 7,
      title: 'Mobile App Development',
      desc: 'Mobile app designed to help users discover and explore local restaurants and cuisines.',
      image: BlogImg03,
    },
    {
      id: 8,
      title: 'Mobile App Development',
      desc: 'Mobile app designed to help users discover and explore local restaurants and cuisines.',
      image: BlogImg04,
    },
  ];
  return (
    <section id="my-projects" className="py-28">
      <div className="mb-20">
        <h2 className="mb-4 text-center text-4xl font-semibold leading-relaxed">
          My Projects
        </h2>
        <p className="mx-auto w-full px-4 text-center text-xl leading-relaxed text-secondaryColor lg:w-6/12">
          Whether you have a mobile app idea that needs to come to life or a
          website that requires a facelift, I'm here to turn your digital dreams
          into reality.
        </p>
      </div>
      <div className="">
        <ProjectsList projects={MY_PROJECTS} />
      </div>
    </section>
  );
}

export default MyProjects;
