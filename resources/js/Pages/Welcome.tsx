import { PageProps } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Heart, Users, MessageCircle, ArrowRight } from 'lucide-react';

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white">
            {/* Navigation */}
            <nav className="flex justify-between items-center p-6">
                <div className="flex items-center space-x-2">
                    <Heart className="text-pink-500" size={24} />
                    <span className="text-2xl font-bold text-gray-800">LoveFinder</span>
                </div>
                <div className="space-x-6">
                    <button className="text-gray-600 hover:text-gray-800">Sign In</button>
                    <Link href='/sign-up'>
                        <button className="bg-pink-500 text-white px-4 py-2 rounded-full hover:bg-pink-600">
                            Get Started
                        </button>
                    </Link>
                </div>
            </nav>

            {/* Hero Section */}
            <div className="max-w-6xl mx-auto px-4 py-16 text-center">
                <h1 className="text-5xl font-bold text-gray-900 mb-6">
                    Find Your Perfect Match Today
                </h1>
                <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                    Join thousands of singles who have found meaningful connections through our intelligent matchmaking system.
                </p>
                <Link href='/sign-up'>
                    <button className="bg-pink-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-pink-600 flex items-center mx-auto">
                        Start Your Journey
                        <ArrowRight className="ml-2" size={20} />
                    </button>
                </Link>

            </div>

            {/* Stats */}
            <div className="bg-white py-12">
                <div className="max-w-6xl mx-auto px-4 grid grid-cols-3 gap-8 text-center">
                    <div>
                        <div className="text-4xl font-bold text-pink-500 mb-2">1M+</div>
                        <div className="text-gray-600">Active Users</div>
                    </div>
                    <div>
                        <div className="text-4xl font-bold text-pink-500 mb-2">500K</div>
                        <div className="text-gray-600">Successful Matches</div>
                    </div>
                    <div>
                        <div className="text-4xl font-bold text-pink-500 mb-2">4.8★</div>
                        <div className="text-gray-600">User Rating</div>
                    </div>
                </div>
            </div>

            {/* Features */}
            <div className="max-w-6xl mx-auto px-4 py-16">
                <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                    Why Choose Us
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="text-center p-6">
                        <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Users className="text-pink-500" size={32} />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Smart Matching</h3>
                        <p className="text-gray-600">
                            Our AI-powered algorithm finds compatible matches based on your preferences and personality.
                        </p>
                    </div>
                    <div className="text-center p-6">
                        <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <MessageCircle className="text-pink-500" size={32} />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Safe Communication</h3>
                        <p className="text-gray-600">
                            Connect securely with potential matches through our encrypted messaging system.
                        </p>
                    </div>
                    <div className="text-center p-6">
                        <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Heart className="text-pink-500" size={32} />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Verified Profiles</h3>
                        <p className="text-gray-600">
                            All profiles are thoroughly verified to ensure a safe and authentic dating experience.
                        </p>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-pink-50 py-16">
                <div className="max-w-4xl mx-auto text-center px-4">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">
                        Ready to Meet Someone Special?
                    </h2>
                    <p className="text-xl text-gray-600 mb-8">
                        Join our community today and take the first step towards finding your perfect match.
                    </p>
                    <button className="bg-pink-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-pink-600">
                        Create Free Account
                    </button>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-white py-8">
                <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
                    <div className="text-gray-600">© 2025 LoveFinder. All rights reserved.</div>
                    <div className="space-x-6">
                        <a href="#" className="text-gray-600 hover:text-gray-800">Privacy</a>
                        <a href="#" className="text-gray-600 hover:text-gray-800">Terms</a>
                        <a href="#" className="text-gray-600 hover:text-gray-800">Contact</a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default function Welcome({
}: PageProps<{}>) {
    return (
        <>
            <Head title="Welcome" />
            <main>
                <LandingPage />
            </main>
        </>
    );
}
