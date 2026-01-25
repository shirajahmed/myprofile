export const NavItem = ({ value, handlerFilterCategory, active }) => {
  console.log(active);

  var className = "capitalize cursor-pointer hover:text-[#a65fa8]";
  if (active === value) className += " text-[#a65fa8]";

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
      <NavItem value="frontend" {...props} />
      <NavItem value="backend" {...props} />
      <NavItem value="extensions" {...props} />
      <NavItem value="others" {...props} />
    </div>
  );
};

export default ProjectsNavbar;
