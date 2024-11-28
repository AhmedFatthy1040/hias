import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../Components/Input';
import Button from '../Components/Button';
import { authService } from '../services/authService';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false
    });
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        try {
            await authService.login({
                email: formData.email,
                password: formData.password,
            });
            navigate('/annotate');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Login failed');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen pt-16 pb-12">
            <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mt-16 p-8 bg-[#0F172A] rounded-2xl border border-[#1E293B]">
                    <h2 className="text-3xl font-bold text-center mb-8">Welcome back</h2>

                    {error && (
                        <div className="mb-4 p-4 text-sm text-red-500 bg-red-100 rounded-lg">
                            {error}
                        </div>
                    )}

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
                        </div>

                        <Button
                            type="submit"
                            className="w-full"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Signing in...' : 'Sign in'}
                        </Button>

                        <p className="text-sm text-center text-gray-400">
                            Don't have an account?{' '}
                            <Link to="/signup" className="text-[#E052A0] hover:text-[#E052A0]/80">
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