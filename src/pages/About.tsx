
import mintLeaf from "../assets/images/mint.png";
import mintLeaf1 from "../assets/images/mint1.png";
import restaurant from "../assets/images/restaurant.png";
import menu from "../assets/images/menu.png";
import order from "../assets/images/order.png";
import delivery from "../assets/images/delivery.png";

const AboutPage = () => {
  const steps = [
    {
      src: restaurant,
      title: "Select Restaurant",
    },
    {
      src: menu,
      title: "Select Menu",
    },
    {
      src: order,
      title: "Place Order",
    },
    {
      src: delivery,
      title: "Wait for Delivery",
    },
  ];

  return (
    <section className="bg-white py-16 min-h-[95vh] relative overflow-hidden">
      {/* Decorative Images */}
      <img
        src={mintLeaf}
        alt="Mint"
        width={50}
        height={50}
        className="absolute top-10 right-10 animate-slideRight delay-0"
      />
      <img
        src={mintLeaf1}
        alt="Mint Leaf"
        width={50}
        height={50}
        className="absolute bottom-10 left-10 animate-slideRight delay-1"
      />
      <img
        src={mintLeaf1}
        alt="Mint Decoration"
        width={60}
        height={60}
        className="absolute top-[120px] left-[40px] animate-slideRight delay-3"
      />
      <img
        src={mintLeaf1}
        alt="Mint Decoration"
        width={60}
        height={60}
        className="absolute bottom-[120px] right-[40px] animate-slideRight delay-4"
      />

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-6 z-10 relative">
        {/* Header Section */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4">
            About <span className="text-orange-500">Us</span>
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We're committed to delivering your favorite meals from top
            restaurants. Explore menus, track orders, and enjoy fast delivery —
            all at your fingertips.
          </p>
        </div>

        {/* Grid + Info Section */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
          {/* Feature Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-xl">
            {steps.map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center p-6 h-48 rounded-2xl bg-white border border-gray-200 shadow-md hover:shadow-xl transition-all duration-300 group hover:bg-amber-50"
              >
                <div className="bg-orange-100 rounded-full p-4 group-hover:scale-110 transition-transform duration-300">
                  <img
                    src={item.src}
                    alt={item.title}
                    width={48}
                    height={48}
                    className="w-12 h-12 object-contain"
                  />
                </div>
                <p className="mt-4 text-base font-semibold text-gray-800 group-hover:text-amber-600">
                  {item.title}
                </p>
              </div>
            ))}
          </div>

          {/* Why Choose Us */}
          <div className="max-w-md text-center lg:text-left">
            <h2 className="text-2xl font-bold mb-4">
              Why choose <span className="text-orange-500">Us</span>
            </h2>
            <p className="text-gray-600">
              We're more than just a delivery service. We connect people with
              their favorite meals, ensure timely service, and partner with the
              best restaurants to bring you quality food — every time.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPage;
