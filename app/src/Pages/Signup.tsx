import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../Components/Input';
import Button from '../Components/Button';

const Signup = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        rememberMe: false
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Implement signup logic
        navigate('/annotate');
    };

    return (
        <div className="min-h-screen pt-16 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mt-16 grid md:grid-cols-2 gap-12">
                    <div className="hidden md:block space-y-8">
                        <h2 className="text-4xl font-bold">
                            Ready to get started?
                            <br />
                            <span className="bg-gradient-to-r from-[#E052A0] to-[#4F46E5] bg-clip-text text-transparent">
                                Get your data labeled
                            </span>
                        </h2>
                        <p className="text-xl text-gray-400 leading-relaxed">
                            Get accurate training data on HIAS with ML-assisted tools. We help the most complex
                            organizations to build, deploy and operate AI vision. Accelerate the entire lifecycle
                            of AI vision.
                        </p>
                    </div>

                    <div className="p-8 bg-[#0F172A] rounded-2xl border border-[#1E293B]">
                        <h2 className="text-3xl font-bold mb-8">Create your account</h2>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <Input
                                    label="First name"
                                    required
                                    value={formData.firstName}
                                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                />
                                <Input
                                    label="Last name"
                                    required
                                    value={formData.lastName}
                                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                />
                            </div>

                            <Input
                                label="Email"
                                type="email"
                                required
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />

                            <Input
                                label="Password"
                                type="password"
                                required
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            />

                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 rounded border-gray-300 text-[#E052A0] focus:ring-[#E052A0]"
                                    checked={formData.rememberMe}
                                    onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })}
                                />
                                <span className="ml-2 text-sm text-gray-300">Remember me</span>
                            </label>

                            <Button type="submit" fullWidth>
                                Sign up
                            </Button>

                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-[#1E293B]"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-[#0F172A] text-gray-400">Or continue with</span>
                                </div>
                            </div>

                            <Button type="button" variant="secondary" fullWidth>
                                Continue with Google
                            </Button>

                            <p className="text-center text-sm text-gray-400">
                                Already have an account?{' '}
                                <Link to="/login" className="text-[#E052A0] hover:text-[#4F46E5]">
                                    Sign in
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;