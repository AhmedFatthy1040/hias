import React from 'react';

const About = () => {
    return (
        <div className="min-h-screen pt-24 pb-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h1 className="text-5xl font-bold mb-8">About Us</h1>
                    <p className="text-2xl text-gray-400 leading-relaxed mb-12">
                        Our mission is to accelerate the development of AI applications
                    </p>
                </div>

                <div className="prose prose-invert max-w-none">
                    <p className="text-xl text-gray-300 leading-relaxed">
                        Better data leads to more performant models. Performant models lead to faster deployment.
                        We help deliver value from AI investments faster with better data by providing an end-to-end
                        solution to manage the entire ML lifecycle.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default About;