import React from 'react';
import { Link } from 'react-router-dom';
import localImage from '../assets/images/data-labeling.AI_.GettyImages-898172236-1.webp';


const Dashboard = () => {
    return (
        <div className="pt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="py-20 md:py-28 grid md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-8">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
                            <span className="bg-gradient-to-r from-[#E052A0] to-[#4F46E5] bg-clip-text text-transparent">
                                Unified Platform
                            </span>
                            <br />
                            for computer vision
                        </h1>
                        <p className="text-xl text-gray-400 leading-relaxed">
                            Streamline your research and development with our advanced image annotation platform, designed for efficiency and precision. From manual annotations to AI-assisted labeling, manage and categorize images seamlessly while leveraging state-of-the-art tools for bounding boxes and polygons. Ensure scalable, high-quality data preparation and boost your machine learning projects—all within a robust and user-friendly interface.
                        </p>
                        <div>
                            <Link
                                to="/signup"
                                className="inline-block bg-gradient-to-r from-[#E052A0] to-[#4F46E5] text-white px-8 py-4 rounded-lg text-lg font-semibold hover:opacity-90 transition-opacity"
                            >
                                Get Started Now
                            </Link>
                        </div>
                    </div>
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-[#E052A0]/20 to-[#4F46E5]/20 rounded-2xl blur-xl"></div>
                        <img
                            src={localImage}
                            alt="AI Visualization"
                            className="relative rounded-2xl shadow-2xl"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;