import { useState } from "react";
import { Image } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

// Sample image data - you can replace with your own API call or data
const galleryImages = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1000&auto=format&fit=crop",
    alt: "Landscape mountain with lake",
    title: "Mountain Serenity"
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1511884642898-4c92249e20b6?q=80&w=1000&auto=format&fit=crop",
    alt: "Sunset over ocean",
    title: "Ocean Sunset"
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1511300636408-a63a89df3482?q=80&w=1000&auto=format&fit=crop",
    alt: "City skyline at night",
    title: "Night City"
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?q=80&w=1000&auto=format&fit=crop",
    alt: "Forest pathway",
    title: "Forest Path"
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=1000&auto=format&fit=crop",
    alt: "Green hills",
    title: "Rolling Hills"
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1552083375-1447ce886485?q=80&w=1000&auto=format&fit=crop",
    alt: "Desert landscape",
    title: "Desert Dunes"
  }
];

export function ImageGallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const { toast } = useToast();

  const handleImageClick = (id: number) => {
    setSelectedImage(id);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  const downloadImage = (src: string, title: string) => {
    // In a real app, you'd implement proper download functionality
    toast({
      title: "Download started",
      description: `Downloading ${title}...`,
      duration: 3000,
    });
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col items-center mb-8">
        <div className="flex items-center gap-2 mb-2">
          <Image className="h-6 w-6" />
          <h1 className="text-3xl font-bold text-center">Image Gallery</h1>
        </div>
        <p className="text-muted-foreground text-center max-w-2xl">
          Browse through our collection of beautiful high-resolution images. Click on any image to view it in full size.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {galleryImages.map((image) => (
          <Card 
            key={image.id} 
            className="overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg"
            onClick={() => handleImageClick(image.id)}
          >
            <CardContent className="p-0">
              <div className="relative aspect-[4/3] overflow-hidden group">
                <img 
                  src={image.src} 
                  alt={image.alt} 
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-4 w-full text-white">
                    <h3 className="font-medium text-lg">{image.title}</h3>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Image Modal */}
      {selectedImage !== null && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={handleCloseModal}>
          <div className="relative max-w-5xl max-h-[90vh] w-full" onClick={(e) => e.stopPropagation()}>
            {galleryImages.find(img => img.id === selectedImage) && (
              <>
                <img 
                  src={galleryImages.find(img => img.id === selectedImage)?.src} 
                  alt={galleryImages.find(img => img.id === selectedImage)?.alt}
                  className="w-full h-full object-contain rounded-lg"
                />
                <div className="absolute top-4 right-4 flex gap-2">
                  <Button 
                    variant="secondary" 
                    size="icon" 
                    onClick={() => downloadImage(
                      galleryImages.find(img => img.id === selectedImage)?.src || '',
                      galleryImages.find(img => img.id === selectedImage)?.title || ''
                    )}
                    className="rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-download">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                      <polyline points="7 10 12 15 17 10"/>
                      <line x1="12" x2="12" y1="15" y2="3"/>
                    </svg>
                  </Button>
                  <Button 
                    variant="secondary" 
                    size="icon"
                    onClick={handleCloseModal}
                    className="rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x">
                      <path d="M18 6 6 18"/>
                      <path d="m6 6 12 12"/>
                    </svg>
                  </Button>
                </div>
                <div className="absolute bottom-4 left-4 right-4 text-white bg-black/50 backdrop-blur-sm p-3 rounded-lg">
                  <h2 className="text-xl font-bold">{galleryImages.find(img => img.id === selectedImage)?.title}</h2>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}