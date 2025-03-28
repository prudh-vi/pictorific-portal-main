
import { useState } from "react";
import { toast } from "sonner";

export interface ImageSettings {
  width: number;
  height: number;
  numberOfImages: number;
  seed?: number;
  style?: string;
  guidanceScale?: number;
  steps?: number;
}

export interface GeneratedImage {
  id: string;
  url: string;
  prompt: string;
  seed: number;
  timestamp: number;
}

const DEFAULT_SETTINGS: ImageSettings = {
  width: 512,
  height: 512,
  numberOfImages: 1,
  guidanceScale: 7.5,
  steps: 30,
};

// Backend URL - update this to your actual backend URL when deployed
const BACKEND_URL = "http://localhost:3000";

export function useImageGeneration() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [images, setImages] = useState<GeneratedImage[]>([]);
  const [settings, setSettings] = useState<ImageSettings>(DEFAULT_SETTINGS);

  const generateImages = async (prompt: string, customSettings?: Partial<ImageSettings>) => {
    if (!prompt.trim()) {
      toast.error("Please enter a prompt");
      return;
    }
    
    try {
      setIsGenerating(true);
      
      // Apply custom settings if provided
      const mergedSettings = { ...settings, ...customSettings };
      
      // Make API request to the backend
      const response = await fetch(`${BACKEND_URL}/upload`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          text: prompt,
          // Pass any additional settings that your backend might use
          width: mergedSettings.width,
          height: mergedSettings.height,
          numberOfImages: mergedSettings.numberOfImages,
          seed: mergedSettings.seed,
          style: mergedSettings.style
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.details || 'Failed to generate image');
      }

      const data = await response.json();
      
      // Create images from response
      const newImages: GeneratedImage[] = Array.from({ length: 1 }).map((_, i) => {
        const seed = customSettings?.seed || Math.floor(Math.random() * 1000000);
        return {
          id: `img-${Date.now()}-${i}`,
          url: data.imageUrl,
          prompt,
          seed,
          timestamp: Date.now(),
        };
      });
      
      setImages((prev) => [...newImages, ...prev]);
      toast.success(`Generated ${mergedSettings.numberOfImages} image${mergedSettings.numberOfImages > 1 ? 's' : ''}`);
    } catch (error) {
      console.error("Error generating images:", error);
      toast.error(error.message || "Failed to generate images. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const updateSettings = (newSettings: Partial<ImageSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  const resetSettings = () => {
    setSettings(DEFAULT_SETTINGS);
  };

  const removeImage = (id: string) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
  };

  return {
    isGenerating,
    images,
    settings,
    generateImages,
    updateSettings,
    resetSettings,
    removeImage,
  };
}
