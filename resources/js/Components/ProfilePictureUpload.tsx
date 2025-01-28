import { router } from '@inertiajs/react';
import { ChangeEvent, useState } from 'react';

export default function ProfilePictureUpload({ currentPicture }: { currentPicture?: string }) {
    const [processing, setProcessing] = useState(false);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setProcessing(true);
            
            const formData = new FormData();
            formData.append('profile_picture', file);
            
            router.post('/update-profile-picture', formData, {
                forceFormData: true,
                preserveScroll: true,
                onSuccess: () => {
                    // Force a full page refresh to ensure we get fresh data
                    window.location.reload();
                },
                onError: () => {
                    setProcessing(false);
                },
                onFinish: () => {
                    setProcessing(false);
                }
            });
        }
    };

    return (
        <div className="relative group">
            <div className="relative h-32 w-32 rounded-full overflow-hidden border-4 border-pink-200 group-hover:border-pink-400 transition-colors">
                {currentPicture ? (
                    <img
                        src={currentPicture}
                        alt="Profile"
                        className="h-full w-full object-cover"
                    />
                ) : (
                    <div className="h-full w-full bg-gray-200 flex items-center justify-center">
                        <svg
                            className="h-12 w-12 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            />
                        </svg>
                    </div>
                )}
                
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <label
                        htmlFor="profile-picture"
                        className="cursor-pointer text-white text-sm font-medium"
                    >
                        {processing ? 'Uploading...' : 'Change Photo'}
                    </label>
                </div>
            </div>
            <input
                type="file"
                id="profile-picture"
                className="hidden"
                onChange={handleFileChange}
                accept="image/*"
                disabled={processing}
            />
        </div>
    );
}
