import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import ProductCard from "../../components/product-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { Card, CardContent } from "@/components/ui/card";
import Autoplay from "embla-carousel-autoplay";

import { getProducts } from "../../lib/product";

import img3 from "../../assets/carousel3.png";
import img4 from "../../assets/carousel4.png";
import img5 from "../../assets/carousel6.png";
import img7 from "../../assets/carousel7.png";

export default function ProductsPage() {
  const [products, setProducts] = useState(getProducts());
  const [category, setCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Animate the page title
    gsap.fromTo(
      ".page-title",
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    );

    // Animate the product cards
    gsap.fromTo(
      ".product-card",
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out",
      }
    );

    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Filter products based on category and search query
  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      category === "all" ||
      product.category.toLowerCase() === category.toLowerCase();
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <main className="pt-24 pb-20">
        {/* Hero Banner */}
        <div className="relative h-[300px] md:h-[400px] overflow-hidden mb-12">
          <div className="absolute inset-0">
            <Carousel
              plugins={[
                Autoplay({
                  delay: 2000,
                }),
              ]}
            >
              <CarouselContent>
                <CarouselItem>
                  <img
                    src={img4}
                    alt="Gaming Mouse"
                    className="h-[300px] md:h-[400px] w-full object-cover"
                  />
                </CarouselItem>
                <CarouselItem>
                  <img
                    src={img5}
                    alt="Mechanical Keyboard"
                    className="h-[300px] md:h-[400px] w-full object-cover"
                  />
                </CarouselItem>
                <CarouselItem>
                  <img
                    src={img3}
                    alt="Gaming Headset"
                    className="h-[300px] md:h-[400px] w-full object-cover"
                  />
                </CarouselItem>
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>

          {/* Gradient Overlay & Text Content */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40 flex items-end py-5">
            <div className="container mx-auto px-4">
              <h1 className="page-title text-4xl md:text-6xl font-bold mb-4 max-w-2xl">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-green-600">
                  GAMING GEAR
                </span>
              </h1>
              <p className="text-lg md:text-xl text-gray-300 max-w-2xl">
                Engineered for the pursuit of victory. Designed for competitive
                advantage.
              </p>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="container mx-auto px-4 mb-12">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
            <Tabs
              defaultValue="all"
              className="w-full md:w-auto"
              onValueChange={setCategory}
            >
              <TabsList className="bg-black-900 p-1 ">
                <TabsTrigger
                  value="all"
                  className="data-[state=active]:bg-green-600 cursor-pointer"
                >
                  All
                </TabsTrigger>
                <TabsTrigger
                  value="laptops"
                  className="data-[state=active]:bg-green-600 cursor-pointer"
                >
                  Laptops
                </TabsTrigger>
                <TabsTrigger
                  value="keyboards"
                  className="data-[state=active]:bg-green-600 cursor-pointer"
                >
                  Keyboards
                </TabsTrigger>
                <TabsTrigger
                  value="mice"
                  className="data-[state=active]:bg-green-600 cursor-pointer"
                >
                  Mice
                </TabsTrigger>
                <TabsTrigger
                  value="audio"
                  className="data-[state=active]:bg-green-600 "
                >
                  Audio
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="flex gap-4 w-full md:w-auto">
              <Input
                placeholder="Search products..."
                className="bg-black-900 border-gray-700 focus-visible:ring-green-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Select defaultValue="featured">
                <SelectTrigger className="w-[180px] bg-black-900 border-gray-700 cursor-pointer">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-gray-700">
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="container mx-auto px-4">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <h3 className="text-2xl font-bold mb-4">No products found</h3>
              <p className="text-gray-400 mb-8">
                Try adjusting your search or filter to find what you're looking
                for.
              </p>
              <Button
                variant="outline"
                className="border-green-500 text-green-500 hover:bg-green-500/10"
                onClick={() => {
                  setCategory("all");
                  setSearchQuery("");
                }}
              >
                Reset Filters
              </Button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
