"use client";

import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingCart, Heart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export default function ProductCard({ product }) {
  const [isHovered, setIsHovered] = useState(false);

  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : 0;

  return (
    <motion.div
      className="product-card group bg-black-900 rounded-lg overflow-hidden border border-gray-800 hover:border-green-500/50 transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image */}
      <div className="relative aspect-[1] overflow-hidden cursor-pointer">
        <Link to="/myScene">
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            className={cn(
              "object-cover transition-transform duration-700",
              isHovered ? "scale-110" : "scale-100"
            )}
            style={{
              width: "100%",
              height: "100%",
              position: "absolute",
              top: 0,
              left: 0,
            }}
          />
        </Link>

        {/* Quick Actions */}
        <div
          className={cn(
            "absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 transform transition-transform duration-300",
            isHovered ? "translate-y-0" : "translate-y-full"
          )}
        >
          <div className="flex gap-2">
            <Button
              size="sm"
              className="flex-1 bg-green-600 hover:bg-green-700 cursor-pointer"
            >
              <ShoppingCart className="h-4 w-4 mr-2" /> Add to Cart
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="border-gray-600 hover:bg-gray-800"
            >
              <Heart className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <div className="text-xs text-gray-400 mb-1">{product.category}</div>
        <Link to="/products">
          <h3 className="font-bold text-lg mb-1 hover:text-green-500 transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center mb-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "h-4 w-4",
                  i < Math.floor(product.rating)
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-600"
                )}
              />
            ))}
            <span className="ml-1 text-xs text-gray-400">
              {product.rating.toFixed(1)}
            </span>
          </div>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2">
          <div className="font-bold text-lg">${product.price.toFixed(2)}</div>
          {product.originalPrice && (
            <div className="text-sm text-gray-400 line-through">
              ${product.originalPrice.toFixed(2)}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
