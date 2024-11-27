"use client";

import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { uploadImage } from '@/lib/storage';
import { toast } from 'sonner';
import { Loader2, X, Upload, Check } from 'lucide-react';
import { Progress } from "@/components/ui/progress";

interface ImageUploadProps {
  images: string[];
  onChange: (images: string[]) => void;
}

interface UploadState {
  [key: string]: {
    progress: number;
    status: 'uploading' | 'success' | 'error';
  };
}

export default function ImageUpload({ images, onChange }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadState, setUploadState] = useState<UploadState>({});
  const [previewFiles, setPreviewFiles] = useState<File[]>([]);

  const updateUploadState = useCallback((fileName: string, update: Partial<UploadState[string]>) => {
    setUploadState(prev => ({
      ...prev,
      [fileName]: {
        ...prev[fileName],
        ...update
      }
    }));
  }, []);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    const fileArray = Array.from(files);
    setPreviewFiles(fileArray);

    // Initialize upload state
    const initialState: UploadState = {};
    fileArray.forEach(file => {
      initialState[file.name] = {
        progress: 0,
        status: 'uploading'
      };
    });
    setUploadState(initialState);

    const newImages = [...images];
    let successCount = 0;

    try {
      // Upload files in parallel
      await Promise.all(fileArray.map(async (file) => {
        try {
          // Check file size (20MB limit)
          if (file.size > 20 * 1024 * 1024) {
            updateUploadState(file.name, { 
              status: 'error',
              progress: 100 
            });
            toast.error(`${file.name} is too large. Maximum size is 20MB`);
            return;
          }

          // Start upload and update progress
          updateUploadState(file.name, { 
            progress: 50,
            status: 'uploading'
          });

          const downloadURL = await uploadImage(file);
          
          updateUploadState(file.name, {
            progress: 100,
            status: 'success'
          });
          
          newImages.push(downloadURL);
          successCount++;
        } catch (error) {
          console.error(`Error uploading ${file.name}:`, error);
          updateUploadState(file.name, { 
            status: 'error',
            progress: 100 
          });
          toast.error(`Failed to upload ${file.name}`);
        }
      }));

      // Update parent component with new images
      onChange(newImages);
      
      if (successCount > 0) {
        toast.success(`Successfully uploaded ${successCount} of ${fileArray.length} images`);
      }
    } catch (error) {
      console.error('Error uploading images:', error);
      toast.error('Failed to upload images');
    } finally {
      setIsUploading(false);
      // Clear input value to allow uploading the same file again
      e.target.value = '';
      
      // Clear completed uploads after a short delay
      setTimeout(() => {
        setPreviewFiles(prev => prev.filter(file => 
          uploadState[file.name]?.status === 'uploading'
        ));
        setUploadState(prev => {
          const newState = { ...prev };
          Object.keys(newState).forEach(key => {
            if (newState[key].status !== 'uploading') {
              delete newState[key];
            }
          });
          return newState;
        });
      }, 1500);
    }
  };

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    onChange(newImages);
  };

  const cancelUpload = () => {
    setPreviewFiles([]);
    setUploadState({});
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-4">
        {/* Existing uploaded images */}
        {images.filter(img => img !== '').map((url, index) => (
          <div key={`uploaded-${index}`} className="relative group aspect-square">
            <img
              src={url}
              alt={`Product image ${index + 1}`}
              className="w-full h-full object-cover rounded-md"
            />
            <Button
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => removeImage(index)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}

        {/* Preview files being uploaded */}
        {previewFiles.map((file, index) => (
          <div key={`preview-${index}`} className="relative group aspect-square">
            <img
              src={URL.createObjectURL(file)}
              alt={`Preview ${index + 1}`}
              className="w-full h-full object-cover rounded-md"
            />
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <div className="w-4/5 space-y-2 text-white text-center">
                <div className="text-xs truncate">{file.name}</div>
                <Progress 
                  value={uploadState[file.name]?.progress || 0} 
                  className="h-1"
                />
                {uploadState[file.name]?.status === 'success' ? (
                  <Check className="h-4 w-4 mx-auto text-green-400" />
                ) : uploadState[file.name]?.status === 'error' ? (
                  <X className="h-4 w-4 mx-auto text-red-400" />
                ) : (
                  <div className="text-xs">{uploadState[file.name]?.progress || 0}%</div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Input
            type="file"
            accept="image/*,.webp,.avif"
            multiple
            onChange={handleFileChange}
            disabled={isUploading}
            className="cursor-pointer"
          />
          {isUploading && (
            <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center">
              <div className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span className="text-sm">Uploading...</span>
              </div>
            </div>
          )}
        </div>
        {previewFiles.length > 0 && !isUploading && (
          <Button
            variant="outline"
            onClick={cancelUpload}
          >
            Cancel
          </Button>
        )}
      </div>

      <div className="text-sm text-muted-foreground">
        Supported formats: JPG, PNG, GIF, WebP, AVIF, SVG
        <br />
        Maximum file size: 20MB
      </div>
    </div>
  );
}
