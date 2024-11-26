import React from 'react';
import Input from '../Components/Input';
import Button from '../Components/Button';

const Contact = () => {
    return (
        <div className="min-h-screen pt-24 pb-12">
            <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
                    <p className="text-xl text-gray-400">
                        Have questions? We're here to help.
                    </p>
                </div>

                <form className="space-y-6 p-8 bg-[#0F172A] rounded-2xl border border-[#1E293B]">
                    <div className="grid grid-cols-2 gap-4">
                        <Input label="First name" required />
                        <Input label="Last name" required />
                    </div>
                    <Input label="Email" type="email" required />
                    <div className="space-y-1">
                        <label className="block text-sm font-medium text-gray-300">
                            Message
                        </label>
                        <textarea
                            rows={4}
                            className="w-full px-3 py-2 bg-[#1E293B] border border-[#2D3B4E] rounded-md text-white 
                placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E052A0] focus:border-transparent"
                            required
                        />
                    </div>
                    <Button type="submit" fullWidth>
                        Send message
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default Contact;