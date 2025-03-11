import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import HeroAnimation from "@/components/hero-animation";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Spline from "@splinetool/react-spline";
import img1 from "../assets/home/img1.jpg";

export default function HomePage() {
  const featuredRefs = useRef([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Animate the hero section
    gsap.fromTo(
      ".hero-content",
      { opacity: 0, y: 100 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    );

    // Animate each featured product section
    featuredRefs.current.forEach((ref, index) => {
      if (!ref) return;

      gsap.fromTo(
        ref,
        {
          opacity: 0,
          x: index % 2 === 0 ? -100 : 100,
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ref,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });
  }, []);

  const featuredProducts = [
    {
      id: 1,
      name: "Razer BlackShark V2 Pro",
      description:
        "Wireless esports headset with THX Spatial Audio, TriForce Titanium 50mm Drivers, and HyperClear Supercardioid Mic for competitive gaming.",
      sceneUrl: "https://prod.spline.design/sgQLSlV0PknXJ8ic/scene.splinecode",
      category: "Audio",
    },
    {
      id: 2,
      name: "Razer Blade 15",
      description:
        "The world's smallest 15-inch gaming laptop. Featuring the latest 12th Gen Intel® Core™ processor and NVIDIA® GeForce RTX™ graphics for the ultimate gaming experience.",
      sceneUrl: "https://prod.spline.design/EAX2xONSJXH7v2Mn/scene.splinecode",
      category: "Laptops",
    },

    {
      id: 3,
      name: "Razer Huntsman V2",
      description:
        "Gaming keyboard with Razer™ Optical Switches, Doubleshot PBT keycaps, and Hybrid On-board Memory and Cloud Storage for the ultimate competitive advantage.",
      sceneUrl: "https://prod.spline.design/gm5JaLc5dzh1Kh04/scene.splinecode",
      category: "Keyboards",
    },
    {
      id: 4,
      name: "Razer Viper Ultimate",
      description:
        "Wireless gaming mouse with Focus+ 20K DPI Optical Sensor, 74g lightweight design, and Razer™ HyperSpeed Wireless technology for competitive gaming.",
      sceneUrl: "https://prod.spline.design/od0NrETN7OYrWSlC/scene.splinecode",
      category: "Mice",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <main>
        {/* Hero Section with Animation */}
        <section className="relative h-screen overflow-hidden">
          <HeroAnimation />
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className="hero-content text-center max-w-4xl px-4">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-green-600">
                FOR GAMERS. BY GAMERS.
              </h1>
              <p className="text-lg md:text-xl mb-8 text-gray-300">
                Experience the ultimate gaming gear with cutting-edge technology
                and precision engineering.
              </p>
              <Link to="/products">
                <Button className="bg-green-600 hover:bg-green-700 text-white px-8 py-6 rounded-md text-lg cursor-pointer">
                  Shop Now <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Featured Products Section */}
        <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 relative">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-green-600">
              FEATURED PRODUCTS
            </span>
            <div className="absolute w-24 h-1 bg-green-500 bottom-0 left-1/2 transform -translate-x-1/2 mt-2"></div>
          </h2>

          <div className="space-y-32">
            {featuredProducts.map((product, index) => (
              <div
                key={product.id}
                ref={(el) => (featuredRefs.current[index] = el)}
                className={`grid grid-cols-1 ${
                  index % 2 === 0
                    ? "md:grid-cols-[1fr_1.2fr]"
                    : "md:grid-cols-[1.2fr_1fr] md:flex-row-reverse"
                } gap-8 md:gap-16 items-center h-96`}
              >
                <div
                  className={`${index % 2 === 0 ? "md:order-1" : "md:order-2"}`}
                >
                  <div className="relative overflow-hidden rounded-lg group h-80">
                    {/* Directly using the Spline component with increased height */}
                    <Spline
                      scene={product.sceneUrl}
                      className="w-full h-[700px] transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                      <div className="p-6 pointer-events-auto">
                        <Link to="/products">
                          <Button className="bg-green-600 hover:bg-green-700 text-white">
                            View Details
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className={`${
                    index % 2 === 0 ? "md:order-2" : "md:order-1"
                  } space-y-4`}
                >
                  <div className="text-sm font-medium text-green-500">
                    {product.category}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold">
                    {product.name}
                  </h3>
                  <p className="text-gray-400">{product.description}</p>
                  <Link to="/products">
                    <Button
                      variant="outline"
                      className="border-green-500 text-green-500 hover:bg-green-500/10"
                    >
                      Explore {product.category}{" "}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-green-900/20 to-black/40 z-0"></div>
          <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              JOIN THE CULT OF RAZER
            </h2>
            <p className="text-lg md:text-xl mb-8 text-gray-300 max-w-3xl mx-auto">
              Get exclusive access to deals, early product announcements, and
              Razer ID rewards.
            </p>
            <Link to="/products">
              <Button className="bg-green-600 hover:bg-green-700 text-white px-8 py-6 rounded-md text-lg cursor-pointer">
                Browse All Products
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
