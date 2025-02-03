export const NavItem = ({ value, handlerFilterCategory, active }) => {
  console.log(active);

  var className = "capitalize cursor-pointer hover:text-[#6bc16b]";
  if (active === value) className += " text-[#6bc16b]";

  return (
    <li className={className} onClick={() => handlerFilterCategory(value)}>
      {value}
    </li>
  );
};

const ProjectsNavbar = (props) => {
  return (
    <div className="flex px-3 py-2 space-x-3 overflow-x-auto list-none">
      <NavItem value="all" {...props} />
      <NavItem value="react" {...props} />
      <NavItem value="nextjs" {...props} />
      <NavItem value="php" {...props} />
      <NavItem value="mern" {...props} />
    </div>
  );
};

export default ProjectsNavbar;
