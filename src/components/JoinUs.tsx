
import { useNavigate } from "react-router-dom";
import joinBanner1 from "../assets/images/joinBanner1.png";
import joinBanner2 from "../assets/images/joinBanner2.png";

const JoinUs = () => {
  const navigate = useNavigate();

  const handlePartnerClick = () => {
    navigate('/restaurant-registration');
  };

  return (
    <section className="w-full flex justify-center bg-[#f8f9fb] items-center min-h-screen sm:min-h-[90vh] px-4">
      <div className="container w-full max-w-6xl">
        {/* Text Section */}
        <div>
          <h1 className="text-3xl font-bold mb-4 text-center">
            Join With <span className="text-orange-500">Us</span>
          </h1>
          <p className="text-center md:text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
            Join us and be part of an exciting journey toward innovation and
            growth. Whether you're a business looking to expand your reach or an
            individual seeking to explore new opportunities, we offer a platform
            designed to empower and inspire. Let's work together to create
            meaningful connections and achieve greater success.
          </p>
        </div>

        {/* Image Section */}
        <div className="mt-10 md:overflow-visible overflow-x-auto">
          <div className="flex md:justify-center gap-5 md:w-full w-max snap-x snap-mandatory">
            {/* First Banner */}
            <div
              className="relative min-w-[300px] sm:min-w-[350px] md:min-w-0 w-[80vw] max-w-[500px] h-64 sm:h-72 rounded-lg shadow-lg overflow-hidden bg-gray-200 transform transition-transform duration-300 hover:scale-105 snap-start"
              style={{
                backgroundImage: `url(${joinBanner1})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-[#00000085] bg-opacity-40 flex items-end text-left px-6 py-4">
                <div>
                  <p className="text-orange-500 text-lg font-medium">
                    Signup as a Rider
                  </p>
                  <h3 className="text-white text-2xl font-bold mt-2">
                    Ride With Us
                  </h3>
                  <button className="mt-4 px-6 py-2 bg-orange-500 text-white rounded-md shadow-md hover:bg-orange-600 hover:shadow-lg hover:shadow-orange-500/50 transition duration-300">
                    Get Started
                  </button>
                </div>
              </div>
            </div>

            {/* Second Banner */}
            <div
              className="relative min-w-[300px] sm:min-w-[350px] md:min-w-0 w-[80vw] max-w-[500px] h-64 sm:h-72 rounded-lg shadow-lg overflow-hidden bg-gray-200 transform transition-transform duration-300 hover:scale-105 snap-start"
              style={{
                backgroundImage: `url(${joinBanner2})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-[#00000085] bg-opacity-40 flex items-end text-left px-6 py-4">
                <div>
                  <p className="text-orange-500 text-lg font-medium">
                    Signup as a Business
                  </p>
                  <h3 className="text-white text-2xl font-bold mt-2">
                    Partner With Us
                  </h3>
                  <button 
                    onClick={handlePartnerClick}
                    className="mt-4 px-6 py-2 bg-orange-500 text-white rounded-md shadow-md hover:bg-orange-600 hover:shadow-lg hover:shadow-orange-500/50 transition duration-300"
                  >
                    Get Started
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JoinUs;
