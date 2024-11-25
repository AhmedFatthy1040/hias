import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../Components/Input';
import Button from '../Components/Button';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Implement login logic
        navigate('/annotate');
    };

    return (
        <div className="min-h-screen pt-16 pb-12">
            <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mt-16 p-8 bg-[#0F172A] rounded-2xl border border-[#1E293B]">
                    <h2 className="text-3xl font-bold text-center mb-8">Welcome back</h2>

                    <form onSubmit={handleSubmit} className="space-y-6">
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

                        <div className="flex items-center justify-between">
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 rounded border-gray-300 text-[#E052A0] focus:ring-[#E052A0]"
                                    checked={formData.rememberMe}
                                    onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })}
                                />
                                <span className="ml-2 text-sm text-gray-300">Remember me</span>
                            </label>

                            <Link to="/forgot-password" className="text-sm text-[#E052A0] hover:text-[#4F46E5]">
                                Forgot password?
                            </Link>
                        </div>

                        <Button type="submit" fullWidth>
                            Sign in
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
                            Don't have an account?{' '}
                            <Link to="/signup" className="text-[#E052A0] hover:text-[#4F46E5]">
                                Sign up
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;