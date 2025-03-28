
import React from "react";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Settings2, RefreshCw, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { ImageSettings } from "@/hooks/useImageGeneration";

interface GenerationSettingsProps {
  settings: ImageSettings;
  onUpdateSettings: (settings: Partial<ImageSettings>) => void;
  onResetSettings: () => void;
  className?: string;
}

const GenerationSettings: React.FC<GenerationSettingsProps> = ({
  settings,
  onUpdateSettings,
  onResetSettings,
  className,
}) => {
  const sizePresets = [
    { width: 512, height: 512, label: "Square (1:1)" },
    { width: 768, height: 512, label: "Landscape (3:2)" },
    { width: 512, height: 768, label: "Portrait (2:3)" },
    { width: 1024, height: 576, label: "Widescreen (16:9)" },
  ];

  return (
    <div className={cn("w-full", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button 
            variant="outline" 
            className="flex gap-2 bg-app-gray-dark border-app-gray-light hover:bg-app-gray-light"
          >
            <Settings2 className="h-4 w-4 text-app-purple" />
            <span>Advanced Settings</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-96 glass-panel border-app-gray-light">
          <div className="space-y-6 p-2">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-white">Generation Settings</h3>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={onResetSettings}
                className="text-app-purple hover:text-app-purple/80 hover:bg-app-gray-dark flex gap-1"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                <span className="text-xs">Reset</span>
              </Button>
            </div>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <Label htmlFor="size-preset" className="text-sm">Dimensions</Label>
                  <span className="text-xs text-muted-foreground">{settings.width}×{settings.height}</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {sizePresets.map((preset, i) => (
                    <Button
                      key={i}
                      type="button"
                      variant="outline"
                      size="sm"
                      className={cn(
                        "text-xs h-8 bg-app-gray-dark border-app-gray-light",
                        settings.width === preset.width && settings.height === preset.height
                          ? "border-app-purple bg-app-purple/10"
                          : "hover:bg-app-gray-light"
                      )}
                      onClick={() => onUpdateSettings({ width: preset.width, height: preset.height })}
                    >
                      {preset.label}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <Label className="text-sm flex items-center gap-1.5">
                    Guidance Scale
                    <span className="inline-flex">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button size="icon" variant="ghost" className="h-4 w-4 p-0 text-muted-foreground">
                            <Info className="h-3 w-3" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent side="top" className="w-64 text-xs">
                          How closely the image will follow your prompt. Higher values make images more faithful to your prompt.
                        </PopoverContent>
                      </Popover>
                    </span>
                  </Label>
                  <span className="text-xs text-muted-foreground">{settings.guidanceScale}</span>
                </div>
                <Slider
                  defaultValue={[settings.guidanceScale || 7.5]}
                  min={1}
                  max={20}
                  step={0.5}
                  onValueChange={(value) => onUpdateSettings({ guidanceScale: value[0] })}
                  className="py-2"
                />
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <Label className="text-sm flex items-center gap-1.5">
                    Steps
                    <span className="inline-flex">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button size="icon" variant="ghost" className="h-4 w-4 p-0 text-muted-foreground">
                            <Info className="h-3 w-3" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent side="top" className="w-64 text-xs">
                          Number of denoising steps. More steps generally lead to more detailed images but take longer to generate.
                        </PopoverContent>
                      </Popover>
                    </span>
                  </Label>
                  <span className="text-xs text-muted-foreground">{settings.steps}</span>
                </div>
                <Slider
                  defaultValue={[settings.steps || 30]}
                  min={10}
                  max={100}
                  step={5}
                  onValueChange={(value) => onUpdateSettings({ steps: value[0] })}
                  className="py-2"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="seed" className="text-sm">Seed (optional)</Label>
                  <Input
                    id="seed"
                    type="number"
                    placeholder="Random"
                    value={settings.seed || ""}
                    onChange={(e) => {
                      const value = e.target.value ? parseInt(e.target.value) : undefined;
                      onUpdateSettings({ seed: value });
                    }}
                    className="mt-1 h-8 bg-app-gray-dark border-app-gray-light"
                  />
                </div>
                <div>
                  <Label htmlFor="number-of-images" className="text-sm">Number of Images</Label>
                  <Input
                    id="number-of-images"
                    type="number"
                    min={1}
                    max={4}
                    value={settings.numberOfImages}
                    onChange={(e) => {
                      const value = parseInt(e.target.value);
                      if (value >= 1 && value <= 4) {
                        onUpdateSettings({ numberOfImages: value });
                      }
                    }}
                    className="mt-1 h-8 bg-app-gray-dark border-app-gray-light"
                  />
                </div>
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default GenerationSettings;
