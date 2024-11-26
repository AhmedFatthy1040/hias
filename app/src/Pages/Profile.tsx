import React from 'react';
import Button from '../Components/Button';

const Profile = () => {
    return (
        <div className="min-h-screen pt-24 pb-12">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-[#0F172A] rounded-2xl border border-[#1E293B] overflow-hidden">
                    <div className="p-8">
                        <div className="flex items-center space-x-4">
                            <div className="h-20 w-20 rounded-full bg-gradient-to-r from-[#E052A0] to-[#4F46E5] p-1">
                                <div className="h-full w-full rounded-full bg-[#0F172A] flex items-center justify-center">
                                    <span className="text-2xl font-bold">JD</span>
                                </div>
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold">John Doe</h2>
                                <p className="text-gray-400">john.doe@example.com</p>
                            </div>
                        </div>

                        <div className="mt-8 space-y-6">
                            <div>
                                <h3 className="text-lg font-semibold mb-2">Account Settings</h3>
                                <div className="space-y-4">
                                    <Button variant="secondary" fullWidth>
                                        Edit Profile
                                    </Button>
                                    <Button variant="secondary" fullWidth>
                                        Change Password
                                    </Button>
                                    <Button variant="secondary" fullWidth>
                                        Notification Settings
                                    </Button>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold mb-2">Projects</h3>
                                <div className="space-y-4">
                                    <div className="p-4 bg-[#1E293B] rounded-lg">
                                        <p className="font-medium">No projects yet</p>
                                        <p className="text-sm text-gray-400">Start annotating images to create your first project</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;