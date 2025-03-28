
import React, { useState } from "react";
import PromptInput from "@/components/PromptInput";
import GenerationSettings from "@/components/GenerationSettings";
import LoadingAnimation from "@/components/ui/LoadingAnimation";
import { useImageGeneration } from "@/hooks/useImageGeneration";
import { Sparkles } from "lucide-react";
import { toast } from "sonner";
import ImageDisplay from "@/components/ImageDisplay";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const Index = () => {
  const {
    isGenerating,
    images,
    settings,
    generateImages,
    updateSettings,
    resetSettings,
    removeImage,
  } = useImageGeneration();

  const [prompt, setPrompt] = useState("");

  const handleGenerate = (inputPrompt: string) => {
    setPrompt(inputPrompt);
    generateImages(inputPrompt);
  };

  return (
    <div className="min-h-screen bg-app-dark text-white flex flex-col">
      {/* Header */}
      <header className="border-b border-app-gray-light py-4 px-6">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-app-purple" />
            <h1 className="text-2xl font-bold glow-text">Ghibli Art Generator</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Input */}
          <div className="lg:col-span-1 space-y-6">
            <div className="glass-panel p-6">
              <h2 className="text-xl font-semibold mb-4">Create Ghibli-style Art</h2>
              <PromptInput
                onGenerate={handleGenerate}
                isGenerating={isGenerating}
              />

              <div className="mt-6">
                <GenerationSettings
                  settings={settings}
                  onUpdateSettings={updateSettings}
                  onResetSettings={resetSettings}
                />
              </div>

              <div className="mt-6 flex flex-col space-y-2">
                <p className="text-sm text-gray-400">
                  Generates Studio Ghibli-style images using AI.
                  Try detailed descriptions for better results!
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Results */}
          <div className="lg:col-span-2 space-y-6">
            <div className="glass-panel p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Generated Images</h2>
                {isGenerating && (
                  <div className="flex items-center gap-2">
                    <LoadingAnimation size="sm" color="purple" />
                    <span className="text-sm text-gray-400">Generating...</span>
                  </div>
                )}
              </div>

              {images.length === 0 && !isGenerating ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <Sparkles className="h-12 w-12 text-app-purple opacity-40 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No images yet</h3>
                  <p className="text-gray-400 max-w-md">
                    Enter a prompt and click generate to create your first Ghibli-style image.
                    Try describing a magical scene or fantastical character!
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {isGenerating && 
                    Array.from({ length: settings.numberOfImages }).map((_, i) => (
                      <Card key={`skeleton-${i}`} className="bg-app-gray-dark border-app-gray-light overflow-hidden">
                        <div className="aspect-square w-full">
                          <Skeleton className="w-full h-full bg-app-gray-light/30" />
                        </div>
                        <div className="p-3">
                          <Skeleton className="h-4 w-3/4 mb-2 bg-app-gray-light/30" />
                          <Skeleton className="h-3 w-1/2 bg-app-gray-light/30" />
                        </div>
                      </Card>
                    ))
                  }
                  
                  {images.map((image) => (
                    <ImageDisplay
                      key={image.id}
                      image={image}
                      onRemove={removeImage}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="border-t border-app-gray-light py-4 px-6 text-center text-gray-400 text-sm">
        <p>Ghibli Art Generator • Created with Lovable</p>
      </footer>
    </div>
  );
};

export default Index;
