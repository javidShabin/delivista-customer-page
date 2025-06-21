"use client";
import React from "react";

const AboutPage = () => {
  return (
    <section className="bg-white py-16 h-screen">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4">
            About <span className="text-orange-500">Us</span>
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque
            maxime illo esse perferendis magnam, nostrum, hic voluptate
            accusamus voluptatem soluta deserunt ea culpa quis.
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-10">
          {/* Custom grid design */}
          <div className="grid grid-cols-3 grid-rows-2 gap-8 w-full max-w-4xl">
            {/* Card 1 */}
            <div className="col-span-1 row-span-1rounded-xl shadow-lg h-44 flex items-start justify-start"></div>
            {/* Card 2 */}
            <div className="col-span-2 row-span-1 rounded-xl shadow-lg h-44 flex items-start justify-start"></div>
            {/* Card 3 */}
            <div className="col-span-2 row-span-1 rounded-xl shadow-lg h-44 flex items-start justify-start"></div>
            {/* Card 4 */}
            <div className="rounded-xl shadow-lg h-44 flex items-start justify-start"></div>
          </div>

          {/* Why choose us */}
          <div className="max-w-md">
            <h2 className="text-2xl font-bold mb-4">
              Why choose <span className="text-orange-500">Us</span>
            </h2>
            <p className="text-gray-600">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint
              laudantium nesciunt excepturi facere, modi earum, neque veritatis
              aliquid reiciendis placeat doloremque vero quibusdam adipisci?
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPage;
