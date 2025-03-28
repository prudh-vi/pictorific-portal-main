
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles, Send, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface PromptInputProps {
  onGenerate: (prompt: string) => void;
  isGenerating: boolean;
  className?: string;
}

const PromptInput: React.FC<PromptInputProps> = ({
  onGenerate,
  isGenerating,
  className,
}) => {
  const [prompt, setPrompt] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) {
      toast.error("Please enter a prompt");
      return;
    }
    onGenerate(prompt.trim());
  };

  const examplePrompts = [
    "A young girl discovering a magical forest spirit",
    "A flying castle in the clouds at sunset",
    "A cat bus traveling through a rainy night",
    "A witch delivering packages on her broom",
  ];

  const handleExampleClick = (example: string) => {
    setPrompt(example);
  };

  return (
    <div className={cn("w-full", className)}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div
          className={cn(
            "relative rounded-xl transition-all duration-300 glow-border",
            isFocused
              ? "shadow-[0_0_20px_rgba(139,92,246,0.3)]"
              : "shadow-none"
          )}
        >
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Describe a Studio Ghibli style image you want to generate..."
            className="w-full h-24 px-4 py-3 bg-black/40 rounded-xl text-white resize-none focus:outline-none focus:ring-0 placeholder:text-gray-400"
          />

          <div className="absolute bottom-3 right-3 flex space-x-2">
            {isGenerating ? (
              <Button
                type="button"
                disabled
                variant="ghost"
                size="icon"
                className="bg-app-gray-dark text-muted-foreground"
              >
                <RefreshCw className="h-5 w-5 animate-spin" />
              </Button>
            ) : (
              <Button
                type="submit"
                variant="default"
                size="icon"
                className="bg-app-purple hover:bg-app-purple/80 text-white"
              >
                <Send className="h-5 w-5" />
              </Button>
            )}
          </div>
        </div>
      </form>

      <div className="mt-4">
        <div className="flex items-center gap-2 mb-2 text-sm text-gray-400">
          <Sparkles className="h-4 w-4 text-app-purple" />
          <span>Try these Ghibli-inspired examples:</span>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {examplePrompts.map((example, i) => (
            <button
              key={i}
              onClick={() => handleExampleClick(example)}
              className="px-3 py-1.5 text-sm text-gray-300 bg-app-gray-dark rounded-full hover:bg-app-gray-light transition-colors"
            >
              {example.length > 25 ? `${example.substring(0, 25)}...` : example}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PromptInput;
