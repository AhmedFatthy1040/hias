import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Brain, LogOut } from 'lucide-react';

const Navbar = () => {
    const navigate = useNavigate();
    const [isLoggedIn] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [showProfileMenu, setShowProfileMenu] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            setIsVisible(currentScrollY < lastScrollY || currentScrollY < 50);
            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    const handleLogout = () => {
        // TODO: Implement logout logic
        navigate('/');
    };

    return (
        <nav className={`bg-[#0A1119]/95 backdrop-blur-sm fixed w-full z-50 border-b border-[#1E293B] transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'
            }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center space-x-2">
                            <Brain className="h-8 w-8 text-[#E052A0]" />
                            <span className="text-xl font-bold bg-gradient-to-r from-[#E052A0] to-[#4F46E5] bg-clip-text text-transparent">
                                HIAS
                            </span>
                        </Link>
                    </div>

                    <div className="hidden md:block">
                        <div className="flex items-center space-x-8">
                            <Link to="/" className="text-gray-300 hover:text-white">
                                Dashboard
                            </Link>

                            <div className="relative group">
                                <button className="flex items-center space-x-1 text-gray-300 hover:text-white">
                                    <span>Products</span>
                                </button>
                                <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-[#1E293B] ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                                    <Link to="/annotate" className="block px-4 py-2 text-sm text-gray-300 hover:bg-[#2D3B4E] hover:text-white">
                                        Annotate
                                    </Link>
                                </div>
                            </div>

                            <div className="relative group">
                                <button className="flex items-center space-x-1 text-gray-300 hover:text-white">
                                    <span>Resources</span>
                                </button>
                                <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-[#1E293B] ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                                    <Link to="/about" className="block px-4 py-2 text-sm text-gray-300 hover:bg-[#2D3B4E] hover:text-white">
                                        About
                                    </Link>
                                    <Link to="/contact" className="block px-4 py-2 text-sm text-gray-300 hover:bg-[#2D3B4E] hover:text-white">
                                        Contact Us
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        {isLoggedIn ? (
                            <div className="relative">
                                <button
                                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                                    className="p-1 rounded-full bg-gradient-to-r from-[#E052A0] to-[#4F46E5]"
                                >
                                    <div className="p-1 rounded-full bg-[#0A1119]">
                                        <img
                                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                            alt="Profile"
                                            className="h-8 w-8 rounded-full"
                                        />
                                    </div>
                                </button>
                                {showProfileMenu && (
                                    <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-[#1E293B] ring-1 ring-black ring-opacity-5">
                                        <Link to="/profile" className="block px-4 py-2 text-sm text-gray-300 hover:bg-[#2D3B4E] hover:text-white">
                                            Profile
                                        </Link>
                                        <button
                                            onClick={handleLogout}
                                            className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-[#2D3B4E] hover:text-white flex items-center"
                                        >
                                            <LogOut className="h-4 w-4 mr-2" />
                                            Log out
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <>
                                <Link to="/login" className="text-gray-300 hover:text-white">
                                    Login
                                </Link>
                                <Link
                                    to="/signup"
                                    className="bg-gradient-to-r from-[#E052A0] to-[#4F46E5] text-white px-4 py-2 rounded-md hover:opacity-90 transition-opacity"
                                >
                                    Get Started
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;