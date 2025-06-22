"use client";
import Image from "next/image";
import AboutPage from "./about-page/page";
import JoinUs from "@/components/JoinUs";
import RestaurantsPage from "./restaurant-page/page";

export default function Home() {
  return (
    <>
      <section
        className="w-full min-h-screen flex flex-col justify-center items-center relative bg-cover bg-center"
        style={{ backgroundImage: `url("/assets/images/hero.png")` }}
      >
        {/* Floating decorations */}
        <Image
          src="/assets/images/mint.png"
          alt="Mint Leaf"
          width={50}
          height={50}
          className="w-[50px] sm:w-[70px] absolute top-28 sm:top-20 right-16 sm:right-56 animate-slideRight"
        />
        <Image
          src="/assets/images/tomato.png"
          alt="Tomato"
          width={50}
          height={50}
          className="w-[50px] sm:w-[70px] absolute bottom-44 right-28 sm:bottom-10 sm:right-80 animate-slideRight"
        />
        <Image
          src="/assets/images/mint1.png"
          alt="Mint Leaf"
          width={70}
          height={70}
          className="w-[70px] sm:w-[100px] absolute bottom-32 left-20 sm:left-80 animate-slideRight"
        />
        <Image
          src="/assets/images/tomato1.png"
          alt="Tomato Slice"
          width={90}
          height={90}
          className="w-[90px] sm:w-[120px] absolute top-5 sm:top-10 left-14 sm:left-56 animate-slideRight"
        />
        <Image
          src="/assets/images/chilly.png"
          alt="Chilly"
          width={70}
          height={70}
          className="w-[70px] sm:w-[90px] absolute bottom-20 sm:bottom-60 right-10 animate-slideRight"
        />
        <Image
          src="/assets/images/chilly1.png"
          alt="Chilly Decoration"
          width={90}
          height={90}
          className="w-[90px] sm:w-[100px] absolute bottom-[400px] sm:bottom-60 left-0 animate-slideRight"
        />

        {/* Main Content */}
        <div className="container flex flex-col md:flex-row justify-between items-center px-4 sm:px-8 lg:px-12 w-11/12 h-auto sm:h-[80vh]">
          {/* Text Section */}
          <div className="text-center md:text-left px-4 py-4 sm:py-6">
            <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-[75px] font-black leading-tight">
              Delight in Every Bite,
            </h1>
            <h2 className="text-[#ffa100] text-2xl sm:text-3xl md:text-5xl lg:text-[70px] font-black mt-4 leading-tight">
              Delivered Right
            </h2>
            <p className="text-[#e0e0e0] mt-3 text-sm sm:text-base lg:text-lg tracking-wide">
              www.zippyzag.com
            </p>
            <button className="py-2 sm:py-3 px-6 bg-[#ffa100] text-white font-semibold rounded-full shadow-md hover:shadow-xl transition mt-4 text-sm sm:text-base">
              Scroll Down
            </button>
          </div>

          {/* Image Section */}
          <div className="mt-6 md:mt-0 flex justify-center">
            <Image
              src="/assets/images/banner.png"
              alt="Delicious Food Banner"
              width={600}
              height={600}
              className="opacity-90 w-full max-w-[300px] sm:max-w-[400px] md:max-w-[550px] lg:max-w-[600px]"
              priority
            />
          </div>
        </div>
      </section>

      {/* About Section */}
      <AboutPage />
      {/* Join Us Section */}
      <JoinUs />
      {/* Restaurant section */}
      <RestaurantsPage />
    </>
  );
}
