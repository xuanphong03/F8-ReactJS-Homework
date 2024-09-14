import PropTypes from 'prop-types';

SkillItem.propTypes = {
  title: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  icon: PropTypes.object.isRequired,
};

function SkillItem({ title, desc, icon }) {
  return (
    <article className="col-span-12 p-6 md:col-span-6 lg:col-span-4">
      <div className="mx-auto mb-6 flex size-12 items-center justify-center rounded-full bg-black text-xl text-white">
        {icon}
      </div>
      <h4 className="mb-2 text-center text-xl font-semibold">{title}</h4>
      <p className="text-secondaryColor px-8 text-center leading-relaxed">
        {desc}
      </p>
    </article>
  );
}

export default SkillItem;
