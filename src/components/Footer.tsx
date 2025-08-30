import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import googleBadge from "../assets/images/google-play-badge.png";
import appleBadge from "../assets/images/apple-store-badge.png";

const Footer = () => {
  const dashbordPath = location.pathname.startsWith("/user/dashboard");
  const hideHeader = dashbordPath ? "hidden" : "bg-[#1a1a1a] text-white pt-10 pb-6 px-4 md:px-12";
  return (
    <footer className={`${hideHeader}`}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-[#dd63ff] mb-4">Delivista</h2>
          <p className="text-sm text-gray-400 leading-relaxed">
            Delivering your cravings with speed and taste. Discover top restaurants near you.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
          <ul className="text-sm space-y-2 text-gray-400">
            <li><a href="/restaurants" className="hover:text-white">Restaurants</a></li>
            <li><a href="/about" className="hover:text-white">About Us</a></li>
            <li><a href="/contact" className="hover:text-white">Contact</a></li>
            <li><a href="/privacy" className="hover:text-white">Privacy Policy</a></li>
          </ul>
        </div>

        {/* App Download */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Get Our App</h3>
          <p className="text-sm text-gray-400 mb-1 lg:mb-3">Download Delivista from:</p>
          <div className="flex sm:items-center lg:gap-4">
            <img
              src={googleBadge}
              alt="Google Play"
              className="w-30 sm:w-36 md:w-40 lg:w-44 xl:w-48"
            />
            <img
              src={appleBadge}
              alt="App Store"
              className="w-30 sm:w-36 md:w-40 lg:w-44 xl:w-48"
            />
          </div>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="font-semibold text-lg mb-1 lg:mb-4">Follow Us</h3>
          <div className="flex space-x-4 text-gray-400 text-xl">
            <a href="#" aria-label="Facebook" rel="noopener noreferrer" className="hover:text-white">
              <Facebook size={20} />
            </a>
            <a href="#" aria-label="Instagram" rel="noopener noreferrer" className="hover:text-white">
              <Instagram size={20} />
            </a>
            <a href="#" aria-label="Twitter" rel="noopener noreferrer" className="hover:text-white">
              <Twitter size={20} />
            </a>
            <a href="#" aria-label="LinkedIn" rel="noopener noreferrer" className="hover:text-white">
              <Linkedin size={20} />
            </a>
          </div>
        </div>
      </div>

      <hr className="my-8 border-gray-700" />

      <div className="text-center text-sm text-gray-500">
        © {new Date().getFullYear()} <span className="text-white font-semibold">Delivista</span>. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
