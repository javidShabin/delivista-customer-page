
import mintLeaf from "../assets/images/mint.png";
import mintLeaf1 from "../assets/images/mint1.png";
import tomato from "../assets/images/tomato.png";
import tomato1 from "../assets/images/tomato1.png";
import chilly from "../assets/images/chilly.png";
import chilly1 from "../assets/images/chilly1.png";
import banner from "../assets/images/banner.png";
import heroBg from "../assets/images/hero.png";
import AboutPage from "./About";
import JoinUs from "../components/JoinUs";
import RestaurantsPage from "./Restaurants";
import { ArrowDown, Star, Clock, Truck, Utensils } from "lucide-react";

const Home: React.FC = () => {
  return (
    <>
      <section
        className="w-full min-h-screen flex flex-col justify-center items-center relative bg-cover bg-center overflow-hidden"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        {/* Enhanced Background Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/20 to-transparent"></div>
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-40 h-40 bg-yellow-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        {/* Floating Decorations */}
        {/* Enhanced Background Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/20 to-transparent"></div>
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-40 h-40 bg-yellow-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        {/* Enhanced Floating Decorations with Better Animations */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Mint Leaf - Enhanced Animation */}
          <img
            src={mintLeaf}
            alt="Mint Leaf"
            className="w-[50px] sm:w-[70px] absolute top-28 sm:top-20 right-16 sm:right-56 animate-float-slow opacity-80 hover:opacity-100 transition-opacity duration-300"
          />
          
          {/* Tomato - Bounce Animation */}
          <img
            src={tomato}
            alt="Tomato"
            className="w-[50px] sm:w-[70px] absolute bottom-44 right-28 sm:bottom-10 sm:right-80 animate-bounce-slow opacity-80 hover:opacity-100 transition-opacity duration-300"
          />
          
          {/* Mint Leaf 1 - Rotate Animation */}
          <img
            src={mintLeaf1}
            alt="Mint Leaf 2"
            className="w-[70px] sm:w-[100px] absolute bottom-32 left-20 sm:left-80 animate-rotate-slow opacity-80 hover:opacity-100 transition-opacity duration-300"
          />
          
          {/* Tomato 1 - Slide Animation */}
          <img
            src={tomato1}
            alt="Tomato Slice"
            className="w-[90px] sm:w-[120px] absolute top-5 sm:top-10 left-14 sm:left-56 animate-slide-up-down opacity-80 hover:opacity-100 transition-opacity duration-300"
          />
          
          {/* Chilly - Pulse Animation */}
          <img
            src={chilly}
            alt="Chilly"
            className="w-[70px] sm:w-[90px] absolute bottom-20 sm:bottom-60 right-10 animate-pulse-slow opacity-80 hover:opacity-100 transition-opacity duration-300"
          />
          
          {/* Chilly 1 - Float Animation */}
          <img
            src={chilly1}
            alt="Chilly Decoration"
            className="w-[90px] sm:w-[100px] absolute bottom-[400px] sm:bottom-60 left-0 animate-float-delayed opacity-80 hover:opacity-100 transition-opacity duration-300"
          />
        </div>

        {/* Main Content */}
        {/* Main Content with Enhanced Animations */}
        <div className="container flex flex-col md:flex-row justify-between items-center px-4 sm:px-8 lg:px-12 w-11/12 h-auto sm:h-[80vh] relative z-10">
          {/* Enhanced Text Section */}
          <div className="text-center md:text-left px-4 py-4 sm:py-6 animate-fade-in-up">
            {/* Decorative Elements */}
            <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} size={16} className="text-yellow-400 animate-pulse" style={{ animationDelay: `${star * 200}ms` }} />
                ))}
              </div>
              <span className="text-white/80 text-sm font-medium">Premium Quality</span>
            </div>

            {/* Main Headlines with Enhanced Typography */}
            <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-[75px] font-black leading-tight animate-slide-in-left">
              <span className="bg-gradient-to-r from-white via-orange-100 to-white bg-clip-text text-transparent">
                Delight in Every
              </span>
              <br />
              <span className="text-white">Bite,</span>
            </h1>
            <h2 className="text-[#ffa100] text-2xl sm:text-3xl md:text-5xl lg:text-[70px] font-black mt-4 leading-tight animate-slide-in-left delay-300">
              Delivered Right
            </h2>
            {/* Enhanced Subtitle */}
            <p className="text-[#e0e0e0] mt-3 text-sm sm:text-base lg:text-lg tracking-wide animate-fade-in delay-500">
              Experience the finest culinary delights delivered to your doorstep
            </p>
            
            {/* Website URL with Enhanced Styling */}
            <p className="text-[#ffa100] mt-2 text-sm sm:text-base font-semibold animate-fade-in delay-700">
              www.zippyzag.com
            </p>
             {/* Enhanced CTA Button */}
             <button className="group py-3 sm:py-4 px-8 bg-gradient-to-r from-[#ffa100] to-orange-500 text-white font-bold rounded-full shadow-2xl hover:shadow-orange-500/50 transition-all duration-300 mt-6 text-sm sm:text-base transform hover:scale-105 hover:-translate-y-1 animate-fade-in delay-1000">
              <span className="flex items-center gap-2">
                Explore Menu
                <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform duration-300" />
              </span>
            </button>

            {/* Feature Highlights */}
            <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-6 animate-fade-in delay-1200">
              <div className="flex items-center gap-2 text-white/80 text-sm">
                <Clock size={16} className="text-[#ffa100]" />
                <span>Fast Delivery</span>
              </div>
              <div className="flex items-center gap-2 text-white/80 text-sm">
                <Utensils size={16} className="text-[#ffa100]" />
                <span>Fresh Food</span>
              </div>
              <div className="flex items-center gap-2 text-white/80 text-sm">
                <Truck size={16} className="text-[#ffa100]" />
                <span>Free Delivery</span>
              </div>
            </div>
          </div>

          {/* Banner Image */}
          <div className="mt-6 md:mt-0 flex justify-center animate-fade-in-right delay-500">
            <div className="relative group">
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-yellow-500/20 rounded-full blur-3xl group-hover:blur-2xl transition-all duration-500 animate-pulse"></div>
              
              {/* Main Image */}
              <img
                src={banner}
                alt="Delicious Food Banner"
                className="relative z-10 opacity-90 w-full max-w-[300px] sm:max-w-[400px] md:max-w-[550px] lg:max-w-[600px] transform group-hover:scale-105 transition-transform duration-500 drop-shadow-2xl"
              />
              
              {/* Floating Elements Around Banner */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-orange-500 rounded-full animate-bounce opacity-80"></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-yellow-500 rounded-full animate-bounce delay-300 opacity-80"></div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="flex flex-col items-center text-white/60">
            <span className="text-xs mb-2">Scroll Down</span>
            <ArrowDown size={20} className="animate-pulse" />
          </div>
        </div>
      </section>

      <AboutPage />
      <JoinUs />
      <RestaurantsPage />

      {/* Enhanced CSS Animations */}
      <style>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        
        @keyframes rotate-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes slide-up-down {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-25px); }
        }
        
        @keyframes pulse-slow {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.1); opacity: 1; }
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(-5deg); }
        }
        
        @keyframes slide-in-left {
          0% { opacity: 0; transform: translateX(-50px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes fade-in-right {
          0% { opacity: 0; transform: translateX(50px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fade-in {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        
        .animate-float-slow {
          animation: float-slow 6s ease-in-out infinite;
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 4s ease-in-out infinite;
        }
        
        .animate-rotate-slow {
          animation: rotate-slow 20s linear infinite;
        }
        
        .animate-slide-up-down {
          animation: slide-up-down 5s ease-in-out infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 7s ease-in-out infinite;
        }
        
        .animate-slide-in-left {
          animation: slide-in-left 1s ease-out forwards;
        }
        
        .animate-fade-in-right {
          animation: fade-in-right 1s ease-out 0.5s forwards;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out forwards;
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out forwards;
        }
        
        .delay-300 {
          animation-delay: 0.3s;
        }
        
        .delay-500 {
          animation-delay: 0.5s;
        }
        
        .delay-700 {
          animation-delay: 0.7s;
        }
        
        .delay-1000 {
          animation-delay: 1s;
        }
        
        .delay-1200 {
          animation-delay: 1.2s;
        }
      `}</style>
    </>
  );
};

export default Home;
