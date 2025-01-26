import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import ProfilePictureUpload from '@/Components/ProfilePictureUpload';
import { Heart, MapPin, Calendar, Users } from 'lucide-react';

interface User {
    name: string;
    email: string;
    profile_picture?: string;
    country?: string;
    city?: string;
    gender?: string;
    interested_in?: string[];
    date_of_birth?: string;
}

export default function Dashboard({ auth }: PageProps<{ auth: { user: User } }>) {
    const user = auth.user;
    const age = user.date_of_birth
        ? Math.floor((new Date().getTime() - new Date(user.date_of_birth).getTime()) / 3.15576e+10)
        : null;

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    My Profile
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Profile Card */}
                        <div className="md:col-span-1">
                            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                                <div className="flex flex-col items-center">
                                    <ProfilePictureUpload currentPicture={user.profile_picture} />
                                    
                                    <h2 className="mt-4 text-2xl font-semibold text-gray-900">
                                        {user.name}
                                    </h2>
                                    
                                    <div className="mt-2 flex items-center text-gray-600">
                                        <MapPin className="w-4 h-4 mr-1" />
                                        {user.city && user.country ? (
                                            <span>{user.city}, {user.country}</span>
                                        ) : (
                                            <span className="text-gray-400">Add location</span>
                                        )}
                                    </div>

                                    <div className="mt-2 flex items-center text-gray-600">
                                        <Calendar className="w-4 h-4 mr-1" />
                                        {age ? (
                                            <span>{age} years old</span>
                                        ) : (
                                            <span className="text-gray-400">Add birthday</span>
                                        )}
                                    </div>

                                    <div className="mt-2 flex items-center text-gray-600">
                                        <Users className="w-4 h-4 mr-1" />
                                        <span>Interested in: </span>
                                        <span className="ml-1">
                                            {user.interested_in?.join(', ') || 'Not specified'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Potential Matches */}
                        <div className="md:col-span-2">
                            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-xl font-semibold text-gray-900">
                                        Potential Matches
                                    </h3>
                                    <button className="inline-flex items-center px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-lg transition">
                                        <Heart className="w-4 h-4 mr-2" />
                                        Find Matches
                                    </button>
                                </div>

                                {/* Placeholder for matches */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {[1, 2, 3, 4].map((i) => (
                                        <div key={i} className="border rounded-lg p-4 flex items-center space-x-4">
                                            <div className="w-16 h-16 bg-gray-200 rounded-full flex-shrink-0" />
                                            <div className="flex-1 min-w-0">
                                                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                                                <div className="h-3 bg-gray-200 rounded w-1/2" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
