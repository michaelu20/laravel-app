import { PageProps } from '@/types';
import { useState, ChangeEvent, FormEvent } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { Heart, AlertCircle } from 'lucide-react';

interface FormData {
    [key: string]: string | string[];  // Add index signature for Inertia compatibility
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    country: string;
    city: string;
    gender: string;
    interestedIn: string[];
    dateOfBirth: string;
}

interface FormErrors {
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    country?: string;
    city?: string;
    gender?: string;
    interestedIn?: string;
    dateOfBirth?: string;
}

const SignupPage = () => {
    const [formData, setFormData] = useState<FormData>({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        country: '',
        city: '',
        gender: '',
        interestedIn: [],
        dateOfBirth: '',
    });

    const [errors, setErrors] = useState<FormErrors>({});

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        if (errors[name as keyof FormErrors]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            interestedIn: checked
                ? [...prev.interestedIn, value]
                : prev.interestedIn.filter(item => item !== value)
        }));
    };

    const validateForm = (): FormErrors => {
        const newErrors: FormErrors = {};

        if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
        if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        if (!formData.password.trim()) newErrors.password = 'Password is required';
        if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
        if (!formData.country.trim()) newErrors.country = 'Country is required';
        if (!formData.city.trim()) newErrors.city = 'City is required';
        if (!formData.gender) newErrors.gender = 'Gender is required';
        if (formData.interestedIn.length === 0) newErrors.interestedIn = 'Please select at least one preference';
        if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';

        return newErrors;
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newErrors = validateForm();

        if (Object.keys(newErrors).length === 0) {
            router.post('/new-user', formData, {
                onError: (errors) => {
                    setErrors(errors as FormErrors);
                },
                onSuccess: () => {
                    // Redirect will be handled by the server response
                    console.log('Registration successful');
                },
            });
        } else {
            setErrors(newErrors);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white py-12 px-4">
            <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
                <div className="flex items-center justify-center mb-8">
                    <Heart className="text-pink-500 mr-2" size={32} />
                    <h1 className="text-3xl font-bold text-gray-900">Create Your Profile</h1>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                First Name
                            </label>
                            <input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-pink-500 focus:border-pink-500"
                                placeholder="Enter your first name"
                            />
                            {errors.firstName && (
                                <p className="text-red-500 text-sm mt-1 flex items-center">
                                    <AlertCircle size={16} className="mr-1" />
                                    {errors.firstName}
                                </p>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Last Name
                            </label>
                            <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-pink-500 focus:border-pink-500"
                                placeholder="Enter your last name"
                            />
                            {errors.lastName && (
                                <p className="text-red-500 text-sm mt-1 flex items-center">
                                    <AlertCircle size={16} className="mr-1" />
                                    {errors.lastName}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Email and Password */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-pink-500 focus:border-pink-500"
                                placeholder="Enter your email"
                            />
                            {errors.email && (
                                <p className="text-red-500 text-sm mt-1 flex items-center">
                                    <AlertCircle size={16} className="mr-1" />
                                    {errors.email}
                                </p>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-pink-500 focus:border-pink-500"
                                placeholder="Create a password"
                            />
                            {errors.password && (
                                <p className="text-red-500 text-sm mt-1 flex items-center">
                                    <AlertCircle size={16} className="mr-1" />
                                    {errors.password}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Location */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Country
                            </label>
                            <input
                                type="text"
                                name="country"
                                value={formData.country}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-pink-500 focus:border-pink-500"
                                placeholder="Enter your country"
                            />
                            {errors.country && (
                                <p className="text-red-500 text-sm mt-1 flex items-center">
                                    <AlertCircle size={16} className="mr-1" />
                                    {errors.country}
                                </p>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                City
                            </label>
                            <input
                                type="text"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-pink-500 focus:border-pink-500"
                                placeholder="Enter your city"
                            />
                            {errors.city && (
                                <p className="text-red-500 text-sm mt-1 flex items-center">
                                    <AlertCircle size={16} className="mr-1" />
                                    {errors.city}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Date of Birth */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Date of Birth
                        </label>
                        <input
                            type="date"
                            name="dateOfBirth"
                            value={formData.dateOfBirth}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-pink-500 focus:border-pink-500"
                        />
                        {errors.dateOfBirth && (
                            <p className="text-red-500 text-sm mt-1 flex items-center">
                                <AlertCircle size={16} className="mr-1" />
                                {errors.dateOfBirth}
                            </p>
                        )}
                    </div>

                    {/* Gender */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Gender
                        </label>
                        <div className="grid grid-cols-3 gap-4">
                            {['Male', 'Female', 'Non-binary'].map((option) => (
                                <div key={option} className="flex items-center">
                                    <input
                                        type="radio"
                                        name="gender"
                                        value={option}
                                        checked={formData.gender === option}
                                        onChange={handleChange}
                                        className="mr-2"
                                    />
                                    <label className="text-gray-700">{option}</label>
                                </div>
                            ))}
                        </div>
                        {errors.gender && (
                            <p className="text-red-500 text-sm mt-1 flex items-center">
                                <AlertCircle size={16} className="mr-1" />
                                {errors.gender}
                            </p>
                        )}
                    </div>

                    {/* Dating Preferences */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Interested In (Select all that apply)
                        </label>
                        <div className="grid grid-cols-3 gap-4">
                            {['Men', 'Women', 'Non-binary'].map((option) => (
                                <div key={option} className="flex items-center">
                                    <input
                                        type="checkbox"
                                        name="interestedIn"
                                        value={option}
                                        checked={formData.interestedIn.includes(option)}
                                        onChange={handleCheckboxChange}
                                        className="mr-2"
                                    />
                                    <label className="text-gray-700">{option}</label>
                                </div>
                            ))}
                        </div>
                        {errors.interestedIn && (
                            <p className="text-red-500 text-sm mt-1 flex items-center">
                                <AlertCircle size={16} className="mr-1" />
                                {errors.interestedIn}
                            </p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-pink-500 text-white py-3 rounded-lg hover:bg-pink-600 font-semibold"
                    >
                        Create Account
                    </button>
                </form>

                <p className="mt-6 text-center text-gray-600">
                    Already have an account?{' '}
                    <a href="#" className="text-pink-500 hover:text-pink-600">
                        Sign in
                    </a>
                </p>
            </div>
        </div>
    );
};

export default function SignUp({
}: PageProps<{}>) {
    return (
        <>
            <Head title="Welcome" />
            <main>
                <SignupPage />
            </main>
        </>
    );
}
