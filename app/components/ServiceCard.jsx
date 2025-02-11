import { FunctionComponent } from "react";

const ServiceCard = ({ service: { Icon, title, about } }) => {
  //XSS attack :( on our portfolio btw, as an alternate use npm i dom purify
  function createMarkup() {
    return {
      __html: about,
    };
  }

  return (
    <div className="flex items-center p-2 space-x-4 ">
      <Icon className="w-12 h-12 text-[#a65fa8]" />
      <div className="">
        <h6 className="font-bold">{title}</h6>
        <p dangerouslySetInnerHTML={createMarkup()} />
      </div>
    </div>
  );
};

export default ServiceCard;
