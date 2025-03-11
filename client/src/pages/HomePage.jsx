import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
//import { SplitText } from "gsap/SplitText";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import HeroAnimation from "@/components/hero-animation";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown, Star, Trophy, Zap, Headphones, Monitor, Keyboard, Mouse, Gamepad } from "lucide-react";
import Spline from "@splinetool/react-spline";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import img1 from "../assets/home/img1.jpg";

// Custom cursor component
const CustomCursor = () => {
  const cursorRef = useRef(null);
  const [cursorVariant, setCursorVariant] = useState("default");

  useEffect(() => {
    if (!cursorRef.current) return;

    const moveCursor = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.top = `${e.clientY}px`;
        cursorRef.current.style.left = `${e.clientX}px`;
      }
    };

    window.addEventListener("mousemove", moveCursor);

    const handleMouseOver = () => setCursorVariant("hover");
    const handleMouseOut = () => setCursorVariant("default");

    document.querySelectorAll("a, button").forEach((el) => {
      el.addEventListener("mouseover", handleMouseOver);
      el.addEventListener("mouseout", handleMouseOut);
    });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.querySelectorAll("a, button").forEach((el) => {
        el.removeEventListener("mouseover", handleMouseOver);
        el.removeEventListener("mouseout", handleMouseOut);
      });
    };
  }, []);

  const variants = {
    default: {
      width: 12,
      height: 12,
      backgroundColor: "rgba(0, 255, 0, 0.5)",
      mixBlendMode: "difference",
    },
    hover: {
      width: 60,
      height: 60,
      backgroundColor: "rgba(0, 255, 0, 0.2)",
      mixBlendMode: "difference",
    },
  };

  return (
    <motion.div
      ref={cursorRef}
      className="fixed top-0 left-0 rounded-full pointer-events-none z-50 hidden md:block"
      variants={variants}
      animate={cursorVariant}
      transition={{ type: "spring", stiffness: 500, damping: 28 }}
    />
  );
};

// Particle background component
const ParticleBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles = [];

    const createParticles = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      particles = [];
      for (let i = 0; i < 50; i++) {
        const size = Math.random() * 2 + 0.5;
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size,
          speedX: Math.random() * 0.5 - 0.25,
          speedY: Math.random() * 0.5 - 0.25,
          color: `rgba(0, ${Math.floor(Math.random() * 155) + 100}, 0, ${Math.random() * 0.3 + 0.1})`,
        });
      }
    };

    const animateParticles = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((particle) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
      });
      requestAnimationFrame(animateParticles);
    };

    createParticles();
    animateParticles();

    window.addEventListener("resize", createParticles);
    return () => {
      window.removeEventListener("resize", createParticles);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 opacity-30" />;
};

// Category card component
const CategoryCard = ({ icon: Icon, name }) => {
  return (
    <motion.div
      className="flex flex-col items-center justify-center p-6 bg-black/40 backdrop-blur-sm border border-green-500/20 rounded-xl hover:border-green-500/50 transition-all duration-300 group"
      whileHover={{ y: -10, boxShadow: "0 10px 30px -10px rgba(0, 255, 0, 0.3)" }}
    >
      <div className="relative mb-4">
        <div className="absolute inset-0 bg-green-500/20 rounded-full blur-xl group-hover:bg-green-500/40 transition-all duration-300" />
        <div className="relative bg-black/80 p-4 rounded-full border border-green-500/30 group-hover:border-green-500/60 transition-all duration-300">
          <Icon className="h-8 w-8 text-green-500" />
        </div>
      </div>
      <h3 className="text-lg font-medium text-white group-hover:text-green-400 transition-colors duration-300">
        {name}
      </h3>
    </motion.div>
  );
};

// Review card component
const ReviewCard = ({ author, rating, comment }) => {
  return (
    <motion.div
      className="bg-black/40 backdrop-blur-sm p-6 rounded-xl border border-green-500/20"
      whileHover={{ y: -5, boxShadow: "0 10px 30px -10px rgba(0, 255, 0, 0.2)" }}
    >
      <div className="flex items-center mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={cn("h-4 w-4 mr-1", i < rating ? "text-green-500 fill-green-500" : "text-gray-600")}
          />
        ))}
      </div>
      <p className="text-gray-300 mb-4 italic">"{comment}"</p>
      <p className="text-green-500 font-medium">{author}</p>
    </motion.div>
  );
};

// News card component
const NewsCard = ({ title, date, image }) => {
  return (
    <motion.div className="group relative overflow-hidden rounded-xl" whileHover={{ y: -5 }}>
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent z-10" />
      <img
        src={image || "/placeholder.svg"}
        alt={title}
        className="w-full h-60 object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
        <p className="text-green-400 text-sm mb-2">{date}</p>
        <h3 className="text-white text-lg font-bold group-hover:text-green-400 transition-colors duration-300">
          {title}
        </h3>
      </div>
    </motion.div>
  );
};

export default function HomePage() {
  const featuredRefs = useRef([]);
  const heroTextRef = useRef(null);
  const heroSubtitleRef = useRef(null);
  const scrollIndicatorRef = useRef(null);
  const sectionRefs = useRef([]);
  const [activeProductIndex, setActiveProductIndex] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    // Hero animations
    const heroTimeline = gsap.timeline();
    // if (heroTextRef.current) {
    //   const splitText = new SplitText(heroTextRef.current, { type: "chars" });
    //   heroTimeline.from(splitText.chars, {
    //     opacity: 0,
    //     y: 100,
    //     rotationX: -90,
    //     stagger: 0.02,
    //     duration: 0.8,
    //     ease: "back.out(1.7)",
    //   });
    // }
    if (heroSubtitleRef.current) {
      heroTimeline.from(
        heroSubtitleRef.current,
        {
          opacity: 0,
          y: 20,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.4"
      );
    }

    // Scroll indicator animation
    if (scrollIndicatorRef.current) {
      gsap.to(scrollIndicatorRef.current, {
        y: 10,
        repeat: -1,
        yoyo: true,
        duration: 1,
        ease: "power1.inOut",
      });
    }

    // Featured products animations
    featuredRefs.current.forEach((ref, index) => {
      if (!ref) return;
      const direction = index % 2 === 0 ? -1 : 1;
      gsap.fromTo(
        ref,
        { opacity: 0, x: 100 * direction },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ref,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    // Section animations
    sectionRefs.current.forEach((section) => {
      if (!section) return;
      const headings = section.querySelectorAll("h2, h3");
      const content = section.querySelectorAll("p, .card, button");
      gsap.fromTo(
        headings,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 80%" },
        }
      );
      gsap.fromTo(
        content,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.05,
          ease: "power2.out",
          scrollTrigger: { trigger: section, start: "top 75%" },
        }
      );
    });

    // Product rotation interval
    const productInterval = setInterval(() => {
      setActiveProductIndex((prev) => (prev + 1) % featuredProducts.length);
    }, 8000);

    return () => {
      clearInterval(productInterval);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const featuredProducts = [
    {
      id: 1,
      name: "Razer BlackShark V2 Pro",
      description:
        "Wireless esports headset with THX Spatial Audio, TriForce Titanium 50mm Drivers, and HyperClear Supercardioid Mic for competitive gaming.",
      sceneUrl: "https://prod.spline.design/sgQLSlV0PknXJ8ic/scene.splinecode",
      category: "Audio",
      features: [
        "THX Spatial Audio",
        "TriForce Titanium 50mm Drivers",
        "HyperClear Supercardioid Mic",
        "Razer™ HyperSpeed Wireless",
        "Up to 24hr Battery Life",
      ],
    },
    {
      id: 2,
      name: "Razer Blade 15",
      description:
        "The world's smallest 15-inch gaming laptop. Featuring the latest 12th Gen Intel® Core™ processor and NVIDIA® GeForce RTX™ graphics for the ultimate gaming experience.",
      sceneUrl: "https://prod.spline.design/EAX2xONSJXH7v2Mn/scene.splinecode",
      category: "Laptops",
      features: [
        "12th Gen Intel® Core™ i9 Processor",
        "NVIDIA® GeForce RTX™ 4080 Graphics",
        '15.6" QHD 240Hz Display',
        "Per-Key RGB Keyboard",
        "CNC Aluminum Unibody",
      ],
    },
    {
      id: 3,
      name: "Razer Huntsman V2",
      description:
        "Gaming keyboard with Razer™ Optical Switches, Doubleshot PBT keycaps, and Hybrid On-board Memory and Cloud Storage for the ultimate competitive advantage.",
      sceneUrl: "https://prod.spline.design/gm5JaLc5dzh1Kh04/scene.splinecode",
      category: "Keyboards",
      features: [
        "Razer™ Optical Switches",
        "Doubleshot PBT Keycaps",
        "Multi-function Digital Dial",
        "Hybrid On-board Memory",
        "Sound Dampening Foam",
      ],
    },
    {
      id: 4,
      name: "Razer Viper Ultimate",
      description:
        "Wireless gaming mouse with Focus+ 20K DPI Optical Sensor, 74g lightweight design, and Razer™ HyperSpeed Wireless technology for competitive gaming.",
      sceneUrl: "https://prod.spline.design/od0NrETN7OYrWSlC/scene.splinecode",
      category: "Mice",
      features: [
        "Focus+ 20K DPI Optical Sensor",
        "74g Lightweight Design",
        "Razer™ HyperSpeed Wireless",
        "8 Programmable Buttons",
        "Up to 70hr Battery Life",
      ],
    },
  ];

  const reviews = [
    {
      author: "Alex M.",
      rating: 5,
      comment: "The BlackShark V2 Pro completely changed my gaming experience. The audio quality is unmatched!",
    },
    {
      author: "Sarah K.",
      rating: 5,
      comment: "Razer Blade 15 is the perfect balance of power and portability. Best laptop I've ever owned.",
    },
    {
      author: "Michael T.",
      rating: 4,
      comment: "The Huntsman V2 is incredibly responsive. The optical switches make a noticeable difference.",
    },
    {
      author: "Jessica L.",
      rating: 5,
      comment: "Viper Ultimate is so light and precise. Battery life is impressive too!",
    },
  ];

  const newsItems = [
    {
      title: "Razer Announces New Esports Tournament Series",
      date: "June 15, 2023",
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      title: "Next-Gen Razer Blade Laptops Revealed",
      date: "May 28, 2023",
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      title: "Razer Partners with Leading Game Developer",
      date: "April 10, 2023",
      image: "/placeholder.svg?height=400&width=600",
    },
  ];

  const scrollToSection = (id) => {
    gsap.to(window, {
      duration: 1,
      scrollTo: { y: `#${id}`, offsetY: 80 },
      ease: "power3.inOut",
    });
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <CustomCursor />
      <ParticleBackground />
      <Navbar />
      <main className="relative">
        {/* Hero Section with Enhanced Animation */}
        <section className="relative h-screen overflow-hidden">
          <HeroAnimation />
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className="hero-content text-center max-w-4xl px-4">
              <h1
                ref={heroTextRef}
                className="text-5xl md:text-7xl font-black mb-6 bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-green-300 to-green-500 leading-tight"
              >
                FOR GAMERS. BY GAMERS.
              </h1>
              <p ref={heroSubtitleRef} className="text-xl md:text-2xl mb-10 text-gray-300 max-w-3xl mx-auto">
                Experience the ultimate gaming gear with cutting-edge technology and precision engineering designed for
                the most immersive gameplay.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/products">
                  <Button className="bg-green-600 hover:bg-green-700 text-white px-8 py-7 rounded-md text-lg group relative overflow-hidden">
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-green-400 to-green-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></span>
                    <span className="relative flex items-center">
                      Shop Now{" "}
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </span>
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  className="border-green-500 text-green-500 hover:bg-green-500/10 px-8 py-7 rounded-md text-lg"
                  onClick={() => scrollToSection("featured")}
                >
                  Explore Products
                </Button>
              </div>
            </div>
          </div>
          {/* Scroll indicator */}
          <div
            ref={scrollIndicatorRef}
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center cursor-pointer z-10"
            onClick={() => scrollToSection("featured")}
          >
            <p className="text-green-400 text-sm mb-2">Scroll to explore</p>
            <ChevronDown className="h-6 w-6 text-green-400 animate-bounce" />
          </div>
        </section>

        {/* Categories Section */}
        <section ref={(el) => (sectionRefs.current[0] = el)} className="py-20 px-4 md:px-8 max-w-7xl mx-auto relative">
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute -top-40 -left-40 w-80 h-80 bg-green-500/10 rounded-full blur-[100px]"></div>
            <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-green-500/10 rounded-full blur-[80px]"></div>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-16 relative">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-green-600">
              GAMING CATEGORIES
            </span>
            <div className="h-1 w-20 bg-gradient-to-r from-green-400 to-green-600 mx-auto mt-4"></div>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
            <CategoryCard icon={Headphones} name="Audio" />
            <CategoryCard icon={Monitor} name="Laptops" />
            <CategoryCard icon={Keyboard} name="Keyboards" />
            <CategoryCard icon={Mouse} name="Mice" />
            <CategoryCard icon={Gamepad} name="Controllers" />
          </div>
        </section>

        {/* Featured Products Section with 3D Models */}
        <section id="featured" ref={(el) => (sectionRefs.current[1] = el)} className="py-20 px-4 md:px-8 max-w-7xl mx-auto relative">
          <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-500/10 rounded-full blur-[100px]"></div>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-16 relative">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-green-600">
              FEATURED PRODUCTS
            </span>
            <div className="h-1 w-20 bg-gradient-to-r from-green-400 to-green-600 mx-auto mt-4"></div>
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center min-h-[600px]">
            <div className="order-2 lg:order-1">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeProductIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-6"
                >
                  <div className="inline-block px-3 py-1 bg-green-500/20 rounded-full text-green-400 text-sm font-medium">
                    {featuredProducts[activeProductIndex].category}
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                    {featuredProducts[activeProductIndex].name}
                  </h3>
                  <p className="text-gray-400 text-lg">{featuredProducts[activeProductIndex].description}</p>
                  <div className="space-y-3 pt-2">
                    <h4 className="text-green-500 font-medium">Key Features:</h4>
                    <ul className="space-y-2">
                      {featuredProducts[activeProductIndex].features.map((feature, idx) => (
                        <motion.li
                          key={idx}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          className="flex items-center gap-2"
                        >
                          <div className="h-1.5 w-1.5 rounded-full bg-green-500"></div>
                          <span className="text-gray-300">{feature}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <Link to="/products">
                      <Button className="bg-green-600 hover:bg-green-700 text-white px-6 py-6 rounded-md text-base group relative overflow-hidden">
                        <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-green-400 to-green-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></span>
                        <span className="relative flex items-center">
                          Shop Now{" "}
                          <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                        </span>
                      </Button>
                    </Link>
                    <Button variant="outline" className="border-green-500 text-green-500 hover:bg-green-500/10 px-6 py-6 rounded-md text-base">
                      View Details
                    </Button>
                  </div>
                </motion.div>
              </AnimatePresence>
              <div className="flex justify-center mt-10 gap-2">
                {featuredProducts.map((_, idx) => (
                  <button
                    key={idx}
                    className={`h-2 rounded-full transition-all duration-300 ${idx === activeProductIndex ? "w-8 bg-green-500" : "w-2 bg-gray-600"}`}
                    onClick={() => setActiveProductIndex(idx)}
                  />
                ))}
              </div>
            </div>
            <div className="order-1 lg:order-2 h-[500px] relative">
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeProductIndex}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                  className="h-full w-full"
                >
                  <Spline scene={featuredProducts[activeProductIndex].sceneUrl} className="w-full h-full z-50" />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section ref={(el) => (sectionRefs.current[2] = el)} className="py-20 px-4 md:px-8 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-green-950/20 to-black"></div>
          <div className="max-w-7xl mx-auto relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-16 relative">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-green-600">
                WHY CHOOSE RAZER
              </span>
              <div className="h-1 w-20 bg-gradient-to-r from-green-400 to-green-600 mx-auto mt-4"></div>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                className="bg-black/40 backdrop-blur-sm p-8 rounded-xl border border-green-500/20 relative overflow-hidden group"
                whileHover={{ y: -10 }}
              >
                <div className="absolute -right-10 -top-10 w-40 h-40 bg-green-500/10 rounded-full blur-[50px] group-hover:bg-green-500/20 transition-all duration-500"></div>
                <div className="relative">
                  <div className="bg-green-500/20 p-4 rounded-xl inline-block mb-6">
                    <Trophy className="h-8 w-8 text-green-500" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">Award-Winning Design</h3>
                  <p className="text-gray-400">
                    Our products are designed to deliver not just performance, but also aesthetics that stand out in any
                    gaming setup.
                  </p>
                </div>
              </motion.div>
              <motion.div
                className="bg-black/40 backdrop-blur-sm p-8 rounded-xl border border-green-500/20 relative overflow-hidden group"
                whileHover={{ y: -10 }}
              >
                <div className="absolute -right-10 -top-10 w-40 h-40 bg-green-500/10 rounded-full blur-[50px] group-hover:bg-green-500/20 transition-all duration-500"></div>
                <div className="relative">
                  <div className="bg-green-500/20 p-4 rounded-xl inline-block mb-6">
                    <Zap className="h-8 w-8 text-green-500" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">Cutting-Edge Technology</h3>
                  <p className="text-gray-400">
                    We push the boundaries of what's possible, integrating the latest innovations to give you a
                    competitive edge.
                  </p>
                </div>
              </motion.div>
              <motion.div
                className="bg-black/40 backdrop-blur-sm p-8 rounded-xl border border-green-500/20 relative overflow-hidden group"
                whileHover={{ y: -10 }}
              >
                <div className="absolute -right-10 -top-10 w-40 h-40 bg-green-500/10 rounded-full blur-[50px] group-hover:bg-green-500/20 transition-all duration-500"></div>
                <div className="relative">
                  <div className="bg-green-500/20 p-4 rounded-xl inline-block mb-6">
                    <Star className="h-8 w-8 text-green-500" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">Built For Gamers</h3>
                  <p className="text-gray-400">
                    Every product is designed with input from professional gamers and the community to ensure it meets
                    real gaming needs.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Customer Reviews Section */}
        <section ref={(el) => (sectionRefs.current[3] = el)} className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-16 relative">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-green-600">
              WHAT GAMERS SAY
            </span>
            <div className="h-1 w-20 bg-gradient-to-r from-green-400 to-green-600 mx-auto mt-4"></div>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {reviews.map((review, index) => (
              <ReviewCard key={index} author={review.author} rating={review.rating} comment={review.comment} />
            ))}
          </div>
        </section>

        {/* Latest News Section */}
        <section ref={(el) => (sectionRefs.current[4] = el)} className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-16 relative">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-green-600">
              LATEST NEWS
            </span>
            <div className="h-1 w-20 bg-gradient-to-r from-green-400 to-green-600 mx-auto mt-4"></div>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {newsItems.map((item, index) => (
              <NewsCard key={index} title={item.title} date={item.date} image={item.image} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Button variant="outline" className="border-green-500 text-green-500 hover:bg-green-500/10 px-8 py-6 rounded-md text-lg">
              View All News
            </Button>
          </div>
        </section>

        {/* Enhanced CTA Section */}
        <section ref={(el) => (sectionRefs.current[5] = el)} className="py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-green-900/30 to-black/60 z-0"></div>
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-green-500/20 rounded-full blur-[100px] animate-pulse"></div>
            <div
              className="absolute bottom-0 right-1/4 w-80 h-80 bg-green-500/10 rounded-full blur-[120px] animate-pulse"
              style={{ animationDelay: "1s" }}
            ></div>
          </div>
          <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 text-center">
            <div className="max-w-3xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                  JOIN THE{" "}
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-green-600">
                    CULT OF RAZER
                  </span>
                </h2>
                <p className="text-xl md:text-2xl mb-10 text-gray-300">
                  Get exclusive access to deals, early product announcements, and Razer ID rewards.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link to="/products">
                    <Button className="bg-green-600 hover:bg-green-700 text-white px-8 py-7 rounded-md text-lg group relative overflow-hidden">
                      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-green-400 to-green-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></span>
                      <span className="relative flex items-center">
                        Browse All Products{" "}
                        <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                      </span>
                    </Button>
                  </Link>
                  <Button variant="outline" className="border-green-500 text-green-500 hover:bg-green-500/10 px-8 py-7 rounded-md text-lg">
                    Join Razer Insider
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
