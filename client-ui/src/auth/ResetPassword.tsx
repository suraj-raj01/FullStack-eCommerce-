import { cn } from "../lib/utils"
import { Button } from "../components/ui/button"
import { Card, CardContent } from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { useEffect, useState } from "react"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"
import BASE_URL from "@/Config"
import { toast } from "sonner"

export function ResetPassword() {

    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [confirmPasswordError, setConfirmPasswordError] = useState('')
    const [email, setEmail] = useState('')

    const navigate = useNavigate();

    useEffect(() => {
        const user = localStorage.getItem('user');
        console.log(user)
        if (user) {
            // setEmail(token);
        }
    }, [])

    // Password validation
    const validatePassword = (password: string): string => {
        if (password.length < 8) {
            return 'Password must be at least 8 characters long';
        }
        if (!/(?=.*[a-z])/.test(password)) {
            return 'Password must contain at least one lowercase letter';
        }
        if (!/(?=.*[A-Z])/.test(password)) {
            return 'Password must contain at least one uppercase letter';
        }
        if (!/(?=.*\d)/.test(password)) {
            return 'Password must contain at least one number';
        }
        if (!/(?=.*[@$!%*?&])/.test(password)) {
            return 'Password must contain at least one special character (@$!%*?&)';
        }
        return '';
    };

    // Handle password change
    const handlePasswordChange = (value: string) => {
        setPassword(value);
        const error = validatePassword(value);
        setPasswordError(error);

        // Also validate confirm password if it has a value
        if (confirmPassword && value !== confirmPassword) {
            setConfirmPasswordError('Passwords do not match');
        } else if (confirmPassword && value === confirmPassword) {
            setConfirmPasswordError('');
        }
        setError('');
    };

    // Handle confirm password change
    const handleConfirmPasswordChange = (value: string) => {
        setConfirmPassword(value);
        if (value !== password) {
            setConfirmPasswordError('Passwords do not match');
        } else {
            setConfirmPasswordError('');
        }
        setError('');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        // Validation
        if (!password || !confirmPassword) {
            setError('Please fill in all fields');
            return;
        }

        const passwordValidationError = validatePassword(password);
        if (passwordValidationError) {
            setPasswordError(passwordValidationError);
            return;
        }

        if (password !== confirmPassword) {
            setConfirmPasswordError('Passwords do not match');
            return;
        }

        setLoading(true);

        const payload = {
            email: email,
            newPassword: password,
            confirmPassword: confirmPassword
        };

        try {
            const response = await axios.post(`${BASE_URL}/api/admin/users/update-password`, payload, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            toast.success(response.data.message || "Password updated successfully!")
            setPassword('');
            setConfirmPassword('');
            navigate("/auth/login");

        } catch (err: any) {
            console.error('Reset password error:', err);

            let errorMessage = 'Something went wrong. Please try again.';

            if (err.code === 'ECONNABORTED') {
                errorMessage = 'Request timeout. Please try again.';
            } else if (err.response) {
                const status = err.response.status;
                const data = err.response.data;

                switch (status) {
                    case 400:
                        errorMessage = data?.message || 'Invalid request. Please check your input.';
                        break;
                    case 401:
                        errorMessage = 'Authentication failed. Please try again.';
                        break;
                    case 404:
                        errorMessage = 'User not found.';
                        break;
                    case 429:
                        errorMessage = 'Too many requests. Please try again later.';
                        break;
                    case 500:
                        errorMessage = 'Server error. Please try again later.';
                        break;
                    default:
                        errorMessage = data?.message || `Error ${status}: Please try again.`;
                }
            } else if (err.request) {
                errorMessage = 'Network error. Please check your connection.';
            }
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="flex items-center justify-center mt-6 w-full px-4">
            <Card className="overflow-hidden w-full max-w-lg lg:max-w-4xl mt-4 h-auto">
                <CardContent className="grid grid-cols-1 md:grid-cols-2 p-0">

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="p-4 sm:p-6 md:p-8">
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col items-center text-center">
                                <h1 className="text-xl sm:text-2xl font-bold">Reset Password</h1>
                                <p className="text-sm sm:text-base text-muted-foreground">
                                    Enter your new password below
                                </p>
                            </div>

                            <div className="grid gap-3">
                                <Label htmlFor="email">New Password</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="Enter your new email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}

                                    disabled={loading}
                                    autoComplete="new-password"
                                />
                            </div>

                            {/* New Password */}
                            <div className="grid gap-3">
                                <Label htmlFor="password">New Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="Enter your new password"
                                    required
                                    value={password}
                                    onChange={(e) => handlePasswordChange(e.target.value)}
                                    className={cn(
                                        "text-sm sm:text-base",
                                        passwordError && "border-red-500 focus:border-red-500"
                                    )}
                                    disabled={loading}
                                    autoComplete="new-password"
                                />
                                {passwordError && (
                                    <p className="text-xs sm:text-sm text-red-600 flex items-center gap-1" role="alert">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        {passwordError}
                                    </p>
                                )}
                            </div>

                            {/* Confirm Password */}
                            <div className="grid gap-3">
                                <Label htmlFor="confirm-password">Confirm New Password</Label>
                                <Input
                                    id="confirm-password"
                                    type="password"
                                    placeholder="Confirm your new password"
                                    required
                                    value={confirmPassword}
                                    onChange={(e) => handleConfirmPasswordChange(e.target.value)}
                                    className={cn(
                                        "text-sm sm:text-base",
                                        confirmPasswordError && "border-red-500 focus:border-red-500"
                                    )}
                                    disabled={loading}
                                    autoComplete="new-password"
                                />
                                {confirmPasswordError && (
                                    <p className="text-xs sm:text-sm text-red-600 flex items-center gap-1" role="alert">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        {confirmPasswordError}
                                    </p>
                                )}
                            </div>

                            {/* Password Requirements */}
                            <div className="text-xs text-muted-foreground bg-muted p-3 rounded-md">
                                <p className="font-medium mb-2">Password must contain:</p>
                                <ul className="space-y-1">
                                    <li className={cn(
                                        "flex items-center gap-2",
                                        password.length >= 8 ? "text-green-600" : "text-gray-500"
                                    )}>
                                        <span className="w-1 h-1 bg-current rounded-full"></span>
                                        At least 8 characters
                                    </li>
                                    <li className={cn(
                                        "flex items-center gap-2",
                                        /(?=.*[a-z])/.test(password) ? "text-green-600" : "text-gray-500"
                                    )}>
                                        <span className="w-1 h-1 bg-current rounded-full"></span>
                                        One lowercase letter
                                    </li>
                                    <li className={cn(
                                        "flex items-center gap-2",
                                        /(?=.*[A-Z])/.test(password) ? "text-green-600" : "text-gray-500"
                                    )}>
                                        <span className="w-1 h-1 bg-current rounded-full"></span>
                                        One uppercase letter
                                    </li>
                                    <li className={cn(
                                        "flex items-center gap-2",
                                        /(?=.*\d)/.test(password) ? "text-green-600" : "text-gray-500"
                                    )}>
                                        <span className="w-1 h-1 bg-current rounded-full"></span>
                                        One number
                                    </li>
                                    <li className={cn(
                                        "flex items-center gap-2",
                                        /(?=.*[@$!%*?&])/.test(password) ? "text-green-600" : "text-gray-500"
                                    )}>
                                        <span className="w-1 h-1 bg-current rounded-full"></span>
                                        One special character (@$!%*?&)
                                    </li>
                                </ul>
                            </div>

                            {/* General Error */}
                            {error && (
                                <div className="p-2 sm:p-3 text-xs sm:text-sm text-red-600 bg-red-50 border border-red-200 rounded-md" role="alert">
                                    {error}
                                </div>
                            )}

                            <Button
                                type="submit"
                                className="w-full text-sm sm:text-base"
                                disabled={
                                    loading ||
                                    !password ||
                                    !confirmPassword ||
                                    !!passwordError ||
                                    !!confirmPasswordError
                                }
                            >
                                {loading ? (
                                    <div className="flex items-center gap-2">
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        Updating Password...
                                    </div>
                                ) : (
                                    'Update Password'
                                )}
                            </Button>

                            {/* Links */}
                            <div className="text-center text-xs sm:text-sm space-y-2">
                                <div>
                                    Remember your password?{' '}
                                    <Link to="/auth/login" className="underline underline-offset-4 hover:text-primary transition-colors">
                                        Back to Login
                                    </Link>
                                </div>
                                <div>
                                    Don&apos;t have an account?{' '}
                                    <Link to="/auth/signup" className="underline underline-offset-4 hover:text-primary transition-colors">
                                        Sign up
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </form>

                    {/* Image */}
                    <div className="bg-transparent relative flex items-center justify-center">
                        <img
                            src="/auth.png"
                            alt="Password Reset"
                            className="h-40 sm:h-60 md:h-full w-full object-contain md:object-cover p-4"
                            onError={(e) => {
                                console.warn('Image failed to load:', e)
                            }}
                        />
                    </div>
                </CardContent>
            </Card>
        </section>
    )
}