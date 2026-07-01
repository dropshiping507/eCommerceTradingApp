import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Slider1 from "../../assets/slider-1.jpeg";
import Slider2 from "../../assets/slider-2.jpeg";
import Slider3 from "../../assets/slider-3.jpeg";
import Slider4 from "../../assets/slider-4.jpeg";
import Slider5 from "../../assets/slider-5.jpeg";
function ImageSlider() {
  const images = [Slider1, Slider2, Slider3, Slider4, Slider5];

  const [current, setCurrent] = useState(0);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  // Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full max-w-4xl mx-auto overflow-hidden shadow-lg">
      {/* Image */}
      <img
        src={images[current]}
        alt="slider"
        className="w-full h-[250px] md:h-[400px] object-cover transition-all duration-700"
      />

      {/* Left Button */}
      <button
        onClick={prevSlide}
        className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 p-2 rounded-full"
      >
        <ChevronLeft className="text-white" />
      </button>

      {/* Right Button */}
      <button
        onClick={nextSlide}
        className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 p-2 rounded-full"
      >
        <ChevronRight className="text-white" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-3 w-full flex justify-center gap-2">
        {images.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-2.5 h-2.5 rounded-full cursor-pointer transition-all
              ${current === index ? "bg-purple-500" : "bg-white/40"}`}
          />
        ))}
      </div>
    </div>
  );
}
export default ImageSlider;
