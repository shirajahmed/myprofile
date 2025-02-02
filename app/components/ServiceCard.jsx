const ServiceCard = ({ services }) => {
  if (!services) return null; // Prevents rendering if services is undefined

  const { Icon, title, about } = services;

  return (
    <div className="flex items-center p-2 space-x-4">
      {Icon && <Icon className="w-12 h-12 text-green-500" />}
      <div>
        <h6 className="font-bold">{title}</h6>
        <p className="text-gray-600">{about}</p>
      </div>
    </div>
  );
};
