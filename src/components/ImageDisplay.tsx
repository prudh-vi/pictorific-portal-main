
import React from 'react';
import { Button } from "@/components/ui/button";
import { Download, Copy, Trash2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { GeneratedImage } from "@/hooks/useImageGeneration";
import { toast } from "sonner";

interface ImageDisplayProps {
  image: GeneratedImage;
  onRemove: (id: string) => void;
}

const ImageDisplay: React.FC<ImageDisplayProps> = ({ image, onRemove }) => {
  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(image.prompt);
    toast.success("Prompt copied to clipboard");
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = image.url;
    link.download = `image-${image.id}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Image download started");
  };

  return (
    <Card className="bg-app-gray-dark border-app-gray-light overflow-hidden group">
      <div className="aspect-square w-full relative overflow-hidden">
        <img
          src={image.url}
          alt={image.prompt}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center p-4 gap-2">
          <Button
            variant="outline"
            size="icon"
            className="bg-black/30 border-white/20 hover:bg-black/50"
            onClick={handleDownload}
          >
            <Download className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="bg-black/30 border-white/20 hover:bg-black/50"
            onClick={handleCopyPrompt}
          >
            <Copy className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="bg-black/30 border-white/20 hover:bg-black/50 hover:border-red-500 hover:text-red-500"
            onClick={() => onRemove(image.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="p-3">
        <p className="text-sm line-clamp-2 text-gray-200">{image.prompt}</p>
        <p className="text-xs text-gray-400 mt-1">Seed: {image.seed}</p>
      </div>
    </Card>
  );
};

export default ImageDisplay;
