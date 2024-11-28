import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../Components/Input';
import Button from '../Components/Button';
import { authService } from '../services/authService';

const Signup = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords don't match");
            return;
        }

        if (formData.password.length < 6) {
            setError("Password must be at least 6 characters long");
            return;
        }

        setIsLoading(true);

        try {
            await authService.signup({
                username: formData.username,
                email: formData.email,
                password: formData.password,
            });
            navigate('/annotate');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Signup failed');
        } finally {
            setIsLoading(false);
        }
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

                        {error && (
                            <div className="mb-4 p-4 text-sm text-red-500 bg-red-100 rounded-lg">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <Input
                                label="Username"
                                required
                                value={formData.username}
                                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                            />

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

                            <Input
                                label="Confirm Password"
                                type="password"
                                required
                                value={formData.confirmPassword}
                                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                            />

                            <Button
                                type="submit"
                                className="w-full"
                                disabled={isLoading}
                            >
                                {isLoading ? 'Creating account...' : 'Create account'}
                            </Button>

                            <p className="text-sm text-center text-gray-400">
                                Already have an account?{' '}
                                <Link to="/login" className="text-[#E052A0] hover:text-[#E052A0]/80">
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