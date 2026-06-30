import Image1 from "../../../public/1.png";
import Image2 from "../../../public/2.png";
import Image3 from "../../../public/3.png";
import Image4 from "../../../public/4.png";
import Image5 from "../../../public/5.png";
import Image6 from "../../../public/6.png";
function Footer() {
  const partners = [Image1, Image2, Image3, Image4, Image5, Image6];

  return (
    <div className="mt-10 bg-white shadow-lg p-4">
      {/* Title Section */}
      <div className="flex items-center gap-2 mb-6">
        <div className="w-1 md:w-1.5 h-7 bg-blue-500 rounded-full"></div>
        <h2 className="text-lg font-semibold text-gray-700">Partners</h2>
      </div>

      {/* Partners list */}
      <div className="flex flex-wrap items-center justify-between gap-6">
        {partners.map((logo, i) => (
          <img
            key={i}
            src={logo}
            alt="partner"
            className="w-28 sm:w-32 object-contain hover:scale-110 transition duration-300 cursor-pointer"
          />
        ))}
      </div>
    </div>
  );
}

export default Footer;
