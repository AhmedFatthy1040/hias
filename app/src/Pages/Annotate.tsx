import React, { useState, useRef } from 'react';
import Button from '../Components/Button';
import { Upload, Loader } from 'lucide-react';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const Annotate = () => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [uploadedImage, setUploadedImage] = useState<string | null>(null);
    const [annotations, setAnnotations] = useState<Array<{ x: number; y: number; width: number; height: number; label: string }>>([]);
    const [isUploading, setIsUploading] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);
    const selectedFileRef = useRef<File | null>(null);

    const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            selectedFileRef.current = file;
            const reader = new FileReader();
            reader.onload = (e) => {
                setSelectedImage(e.target?.result as string);
                setUploadedImage(null);
                setAnnotations([]);
                setError(null);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleUpload = async () => {
        if (!selectedImage || !selectedFileRef.current) return;

        setIsUploading(true);
        setError(null);

        try {
            const formData = new FormData();
            formData.append('image', selectedFileRef.current);

            const token = localStorage.getItem('token'); // Get the auth token if you have authentication
            
            const response = await fetch(`${API_URL}/images/upload`, {
                method: 'POST',
                headers: {
                    ...(token ? { Authorization: `Bearer ${token}` } : {}),
                },
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Upload failed');
            }

            const data = await response.json();
            setUploadedImage(selectedImage);
            setSelectedImage(null);
            selectedFileRef.current = null;
        } catch (error) {
            console.error('Upload failed:', error);
            setError(error instanceof Error ? error.message : 'Upload failed');
        } finally {
            setIsUploading(false);
        }
    };

    const handleDetection = async () => {
        if (!uploadedImage) return;

        setIsProcessing(true);
        try {
            // TODO: Implement actual object detection
            await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate processing
            // Sample annotations
            setAnnotations([
                { x: 100, y: 100, width: 200, height: 150, label: 'Object 1' },
                { x: 400, y: 300, width: 150, height: 100, label: 'Object 2' },
            ]);
        } catch (error) {
            console.error('Detection failed:', error);
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="min-h-screen pt-24 pb-12">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-[#0F172A] rounded-2xl border border-[#1E293B] overflow-hidden">
                    <div className="p-8">
                        <div className="flex items-center justify-between mb-8">
                            <h1 className="text-3xl font-bold">Image Annotation</h1>
                            <div className="flex space-x-4">
                                <Button
                                    onClick={() => fileInputRef.current?.click()}
                                    variant="secondary"
                                    disabled={isUploading || isProcessing}
                                >
                                    Select Image
                                </Button>
                                {selectedImage && (
                                    <Button
                                        onClick={handleUpload}
                                        disabled={isUploading}
                                    >
                                        {isUploading ? (
                                            <span className="flex items-center">
                                                <Loader className="animate-spin mr-2 h-4 w-4" />
                                                Uploading...
                                            </span>
                                        ) : (
                                            <span className="flex items-center">
                                                <Upload className="mr-2 h-4 w-4" />
                                                Upload Image
                                            </span>
                                        )}
                                    </Button>
                                )}
                                {uploadedImage && (
                                    <Button
                                        onClick={handleDetection}
                                        disabled={isProcessing}
                                    >
                                        {isProcessing ? (
                                            <span className="flex items-center">
                                                <Loader className="animate-spin mr-2 h-4 w-4" />
                                                Processing...
                                            </span>
                                        ) : (
                                            'Run Detection'
                                        )}
                                    </Button>
                                )}
                            </div>
                        </div>

                        <input
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            accept="image/*"
                            onChange={handleImageSelect}
                        />

                        <div className="grid gap-8">
                            {selectedImage && (
                                <div className="space-y-2">
                                    <h2 className="text-lg font-semibold">Preview</h2>
                                    <div className="aspect-video rounded-lg border-2 border-dashed border-[#1E293B] overflow-hidden bg-[#1E293B]/50">
                                        <img
                                            src={selectedImage}
                                            alt="Preview"
                                            className="w-full h-full object-contain"
                                        />
                                    </div>
                                </div>
                            )}

                            {uploadedImage && (
                                <div className="space-y-2">
                                    <h2 className="text-lg font-semibold">Uploaded Image</h2>
                                    <div className="relative aspect-video rounded-lg border-2 border-[#1E293B] overflow-hidden bg-[#1E293B]/50">
                                        <img
                                            ref={imageRef}
                                            src={uploadedImage}
                                            alt="Uploaded"
                                            className="w-full h-full object-contain"
                                        />
                                        {annotations.map((annotation, index) => (
                                            <div
                                                key={index}
                                                className="absolute border-2 border-[#E052A0] bg-[#E052A0]/20"
                                                style={{
                                                    left: `${annotation.x}px`,
                                                    top: `${annotation.y}px`,
                                                    width: `${annotation.width}px`,
                                                    height: `${annotation.height}px`,
                                                }}
                                            >
                                                <span className="absolute -top-6 left-0 bg-[#E052A0] px-2 py-1 text-xs rounded">
                                                    {annotation.label}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {!selectedImage && !uploadedImage && (
                                <div className="aspect-video rounded-lg border-2 border-dashed border-[#1E293B] overflow-hidden">
                                    <div className="h-full flex flex-col items-center justify-center">
                                        <Upload className="h-12 w-12 text-gray-400 mb-4" />
                                        <p className="text-gray-400">
                                            Select an image to begin annotation
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Annotate;