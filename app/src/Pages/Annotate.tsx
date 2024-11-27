import React, { useState, useRef } from 'react';
import Button from '../Components/Button';
import { Upload, Loader } from 'lucide-react';

const Annotate = () => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [uploadedImage, setUploadedImage] = useState<string | null>(null);
    const [annotations, setAnnotations] = useState<Array<{ x: number; y: number; width: number; height: number; label: string }>>([]);
    const [isUploading, setIsUploading] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);

    const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setSelectedImage(e.target?.result as string);
                setUploadedImage(null);
                setAnnotations([]);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleUpload = async () => {
        if (!selectedImage) return;
    
        setIsUploading(true);
        try {
            const formData = new FormData();
            const blob = await fetch(selectedImage).then((res) => res.blob());
            formData.append('image', blob);
    
            const response = await fetch('http://127.0.0.1:5001/predict', { // Update the URL to match your backend
                method: 'POST',
                body: formData,
            });
    
            if (!response.ok) {
                throw new Error(`Failed to upload. Status: ${response.status}`);
            }
    
            const uploadData = await response.json();
            console.log('Fetched image metadata:', uploadData);
            setUploadedImage(uploadData.image.url); // Save the uploaded image URL
            alert(uploadData.message); // Display success message
    
            // Fetch uploaded image metadata
            await fetchImageMetadata(); // Call the function to fetch metadata
        } catch (error) {
            console.error('Upload failed:', error);
            alert(`Error: ${error}`); // Display error message
        } finally {
            setIsUploading(false);
        }
    };

    const fetchImageMetadata = async () => {
        try {
            const response = await fetch('http://127.0.0.1:5001/api/images'); // Update the URL to match your backend
            if (!response.ok) {
                throw new Error(`Failed to fetch metadata. Status: ${response.status}`);
            }
            const metadata = await response.json();
            // Assuming metadata is an array of images
            console.log('Fetched image metadata:', metadata);
            // You can store this metadata in state to display it in your component
        } catch (error) {
            console.error('Failed to fetch metadata:', error);
            alert(`Error: ${error}`); // Display error message
        }
    };

    const handleDetection = async () => {
        if (!uploadedImage) return;
    
        setIsProcessing(true);
        try {
            const formData = new FormData();
            const imageBlob = await fetch(uploadedImage).then(res => res.blob()); // Fetch the image as a blob
            formData.append('image', imageBlob, 'image.jpg'); // Append the image blob to FormData
    
            const response = await fetch('http://127.0.0.1:5001/api/detect', {
                method: 'POST',
                body: formData, // Send the FormData containing the image
            });
    
            if (!response.ok) {
                throw new Error(`Detection failed. Status: ${response.status}`);
            }
    
            const detectionData = await response.json();
            console.log('Detection successful:', detectionData);
            
            // Assuming detectionData contains annotations
            setAnnotations(detectionData.predictions); // Set the annotations from the response
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