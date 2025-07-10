import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { ImageGallery } from "@/components/ImageGallery";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ImageGallery />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}