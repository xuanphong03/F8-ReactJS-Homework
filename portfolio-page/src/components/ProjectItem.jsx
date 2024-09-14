import PropTypes from 'prop-types';
import Button from './Button';

ProjectItem.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
};

function ProjectItem({ title, image, desc }) {
  return (
    <article className="col-span-12 md:col-span-6 xl:col-span-3">
      <div className="mb-4 overflow-hidden rounded-xl shadow-xl">
        <img alt={title} src={image} className="h-48 w-full object-cover" />
      </div>
      <div className="p-0">
        <h4 className="mb-2 text-xl font-semibold leading-relaxed">{title}</h4>
        <p className="mb-6 text-base leading-relaxed text-secondaryColor">
          {desc}
        </p>
        <Button content="See Details" isSolid />
      </div>
    </article>
  );
}

export default ProjectItem;
