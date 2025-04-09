import { Link } from "react-router-dom";

const CollectionLink = ({ children, bg, to }) => {
  return (
    <Link
      to={to}
      className="relative flex justify-center rounded-lg cursor-pointer max-w-3xl mx-auto"
    >
      <img src={bg} height={200} className="sm:rounded-lg" />
      <div className="absolute rounded-lg w-full h-full transition opacity-50 hover:opacity-70 bg-black"></div>
      <div className="absolute top-1/2 transform -translate-y-1/2 text-white font-peckham text-4xl">
        {children}
      </div>
    </Link>
  );
};

export default CollectionLink;
