"use client";

export function getProducts() {
  return [
    {
      id: 1,
      name: "Razer Blade 15",
      description:
        "The world's smallest 15-inch gaming laptop. Featuring the latest 12th Gen Intel® Core™ processor and NVIDIA® GeForce RTX™ graphics.",
      price: 1999.99,
      originalPrice: 2199.99,
      image: "/placeholder.svg?height=400&width=600",
      category: "Laptops",
      rating: 4.8,
      isNew: true,
    },
    {
      id: 2,
      name: "Razer Blade 17",
      description:
        "Desktop-class performance in a laptop. Featuring the latest 12th Gen Intel® Core™ processor and NVIDIA® GeForce RTX™ graphics.",
      price: 2499.99,
      originalPrice: 2699.99,
      image: "/placeholder.svg?height=400&width=600",
      category: "Laptops",
      rating: 4.7,
    },
    {
      id: 3,
      name: "Razer Book 13",
      description:
        "Designed for work, perfect for play. Ultra-compact and portable with all-day battery life.",
      price: 1299.99,
      originalPrice: 1499.99,
      image: "/placeholder.svg?height=400&width=600",
      category: "Laptops",
      rating: 4.5,
    },
    {
      id: 4,
      name: "Razer BlackShark V2 Pro",
      description:
        "Wireless esports headset with THX Spatial Audio, TriForce Titanium 50mm Drivers, and HyperClear Supercardioid Mic.",
      price: 179.99,
      originalPrice: 199.99,
      image: "/placeholder.svg?height=400&width=600",
      category: "Audio",
      rating: 4.9,
      isBestSeller: true,
    },
    {
      id: 5,
      name: "Razer Kraken V3 Pro",
      description:
        "Wireless gaming headset with haptic technology, THX Spatial Audio, and Razer TriForce Titanium 50mm Drivers.",
      price: 199.99,
      image: "/placeholder.svg?height=400&width=600",
      category: "Audio",
      rating: 4.6,
      isNew: true,
    },
    {
      id: 6,
      name: "Razer Barracuda X",
      description:
        "Wireless multi-platform gaming and mobile headset with USB-C and detachable mic.",
      price: 99.99,
      originalPrice: 129.99,
      image: "/placeholder.svg?height=400&width=600",
      category: "Audio",
      rating: 4.4,
    },
    {
      id: 7,
      name: "Razer Huntsman V2",
      description:
        "Gaming keyboard with Razer™ Optical Switches, Doubleshot PBT keycaps, and Hybrid On-board Memory and Cloud Storage.",
      price: 189.99,
      originalPrice: 199.99,
      image: "/placeholder.svg?height=400&width=600",
      category: "Keyboards",
      rating: 4.8,
      isBestSeller: true,
    },
    {
      id: 8,
      name: "Razer BlackWidow V3",
      description:
        "Mechanical gaming keyboard with Razer™ Mechanical Switches, Doubleshot ABS keycaps, and Hybrid On-board Memory.",
      price: 139.99,
      image: "/placeholder.svg?height=400&width=600",
      category: "Keyboards",
      rating: 4.7,
    },
    {
      id: 9,
      name: "Razer Ornata V2",
      description:
        "Gaming keyboard with Razer™ Hybrid Mecha-Membrane Switches, Doubleshot ABS keycaps, and Multi-function Digital Dial.",
      price: 99.99,
      originalPrice: 119.99,
      image: "/placeholder.svg?height=400&width=600",
      category: "Keyboards",
      rating: 4.5,
    },
    {
      id: 10,
      name: "Razer Viper Ultimate",
      description:
        "Wireless gaming mouse with Focus+ 20K DPI Optical Sensor, 74g lightweight design, and Razer™ HyperSpeed Wireless technology.",
      price: 129.99,
      originalPrice: 149.99,
      image: "/placeholder.svg?height=400&width=600",
      category: "Mice",
      rating: 4.9,
      isBestSeller: true,
    },
    {
      id: 11,
      name: "Razer DeathAdder V2",
      description:
        "Gaming mouse with Focus+ 20K DPI Optical Sensor, 82g lightweight design, and Razer™ Optical Mouse Switches.",
      price: 69.99,
      image: "/placeholder.svg?height=400&width=600",
      category: "Mice",
      rating: 4.8,
    },
    {
      id: 12,
      name: "Razer Basilisk V3",
      description:
        "Gaming mouse with Focus+ 26K DPI Optical Sensor, 11 Programmable Buttons, and customizable scroll wheel resistance.",
      price: 69.99,
      originalPrice: 79.99,
      image: "/placeholder.svg?height=400&width=600",
      category: "Mice",
      rating: 4.7,
      isNew: true,
    },
  ];
}