"use client"

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Camera, X, ChevronLeft, ChevronRight } from "lucide-react";

// Placeholder gallery images (in production, these would come from storage)
const galleryImages = [
  {
    id: 1,
    url: "/assets/images/events/gallery/1.jpg",
    caption: "",
    month: "December 2025",
  },
  {
    id: 2,
    url: "/assets/images/events/gallery/3.jpg",
    caption: "",
    month: "December 2025",
  },
  {
    id: 3,
    url: "/assets/images/events/gallery/2.jpg",
    caption: "",
    month: "December 2025",
  },
  {
    id: 4,
    url: "/assets/images/events/gallery/4.jpg",
    caption: "",
    month: "December 2025",
  },
  {
    id: 5,
    url: "/assets/images/events/gallery/5.jpg",
    caption: "",
    month: "December 2025",
  },
  {
    id: 6,
    url: "/assets/images/events/gallery/6.jpg",
    caption: "Workshop Session - October 2023",
    month: "December 2025",
  },
];

const GallerySection = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [filter, setFilter] = useState<string>("all");

  // @ts-ignore
    const months = ["all", ...new Set(galleryImages.map((img) => img.month))];

  const filteredImages =
    filter === "all"
      ? galleryImages
      : galleryImages.filter((img) => img.month === filter);

  const openLightbox = (id: number) => setSelectedImage(id);
  const closeLightbox = () => setSelectedImage(null);

  const navigateImage = (direction: "prev" | "next") => {
    if (selectedImage === null) return;
    const currentIndex = filteredImages.findIndex((img) => img.id === selectedImage);
    let newIndex;
    if (direction === "prev") {
      newIndex = currentIndex > 0 ? currentIndex - 1 : filteredImages.length - 1;
    } else {
      newIndex = currentIndex < filteredImages.length - 1 ? currentIndex + 1 : 0;
    }
    setSelectedImage(filteredImages[newIndex].id);
  };

  return (
    <section id="gallery" className="py-20 md:py-32 bg-background">
      <div className=" mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <span className="inline-block bg-primary/20 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Camera className="w-4 h-4 inline mr-2" />
            Photo Gallery
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Memories & <span className="text-primary">Highlights</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Relive the fun moments from our past Journey to Laugh events
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {months.map((month) => (
            <Button
              key={month}
              variant={filter === month ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(month)}
              className="capitalize"
            >
              {month === "all" ? "All Events" : month}
            </Button>
          ))}
        </div>

        {/* Gallery Grid */}
        <motion.div
          layout
          className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6"
        >
          <AnimatePresence>
            {filteredImages.map((image, index) => (
              <motion.div
                key={image.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="relative group cursor-pointer overflow-hidden rounded-2xl aspect-[4/3]"
                onClick={() => openLightbox(image.id)}
              >
                <img
                  src={image.url}
                  alt={image.caption}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="text-white font-medium text-sm md:text-base">
                      {image.caption}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Lightbox */}
        <AnimatePresence>
          {selectedImage !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
              onClick={closeLightbox}
            >
              <button
                className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                onClick={closeLightbox}
              >
                <X className="w-6 h-6 text-white" />
              </button>

              <button
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  navigateImage("prev");
                }}
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>

              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  navigateImage("next");
                }}
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>

              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                className="max-w-4xl max-h-[80vh]"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={filteredImages.find((img) => img.id === selectedImage)?.url}
                  alt={filteredImages.find((img) => img.id === selectedImage)?.caption}
                  className="max-w-full max-h-[70vh] object-contain rounded-lg"
                />
                <p className="text-white text-center mt-4 text-lg">
                  {filteredImages.find((img) => img.id === selectedImage)?.caption}
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default GallerySection;
