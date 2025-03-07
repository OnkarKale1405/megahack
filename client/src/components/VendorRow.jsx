import { motion } from "framer-motion";

const FarmerCard = ({ name, market, location }) => (
  <div className="bg-[#FDF6E3] shadow-lg rounded-lg w-[250px] text-center p-6 border border-green-300">
    <div className="rounded-full overflow-hidden w-24 h-24 mx-auto mb-4">
      <img src="https://via.placeholder.com/150" alt={name} className="w-full h-full object-cover" />
    </div>
    <h2 className="text-lg font-semibold text-gray-800">{name}</h2>
    <p className="text-gray-600">({market}, {location})</p>
    <button className="bg-green-600 text-white px-4 py-2 rounded-md mt-4 hover:bg-green-700">
      View My Story
    </button>
  </div>
);

const VendorRow = ({ farmers }) => {
  const animation = {
    animate: {
      x: farmers.length > 4 ? ["0%", "-100%"] : "0%",
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 20,
          ease: "linear",
        },
      },
    },
  };

  return (
    <div className="overflow-hidden w-full bg-white py-10">
      <motion.div className="flex gap-6" {...animation}>
        {farmers.concat(farmers).map((farmer, index) => (
          <FarmerCard key={index} {...farmer} />
        ))}
      </motion.div>
    </div>
  );
};

export default VendorRow;
