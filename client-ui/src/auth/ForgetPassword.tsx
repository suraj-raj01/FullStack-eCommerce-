import { cn } from "../lib/utils"
import { Button } from "../components/ui/button"
import { Card, CardContent } from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { useState } from "react"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"
import BASE_URL from "@/Config"
import { toast } from "sonner"

export function ForgetPassword({
}: React.ComponentProps<"div">) {

  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [isEmailVerified, setIsEmailVerified] = useState(false)
  const [verifyingEmail, setVerifyingEmail] = useState(false)

  const navigate = useNavigate();

  // Verify email exists in database
  const verifyEmailExists = async (email: string): Promise<void> => {
    if (!email) {
      setEmailError('Please enter a valid email address')
      setIsEmailVerified(false)
      return
    }

    setVerifyingEmail(true)
    setEmailError('')

    try {
      const response = await axios.post(`${BASE_URL}/api/admin/users/verify-email`, { email })

      if (response.status === 200 && response.data) {
        setIsEmailVerified(true)
        setEmailError('')
      } else {
        setEmailError('No account found with this email address')
        setIsEmailVerified(false)
      }
    } catch (err: any) {
      console.error('Email verification error:', err)

      // Handle specific error responses
      if (err.response?.status === 404) {
        setEmailError('No account found with this email address')
      } else if (err.response?.status >= 500) {
        setEmailError('Server error. Please try again later.')
      } else if (err.code === 'NETWORK_ERROR' || !err.response) {
        setEmailError('Network error. Please check your connection.')
      } else {
        setEmailError(err.response?.data?.message || 'Unable to verify email. Please try again.')
      }

      setIsEmailVerified(false)
    } finally {
      setVerifyingEmail(false)
    }
  }

  // Handle email blur event
  const handleEmailBlur = (): void => {
    const trimmedEmail = email.trim()
    if (trimmedEmail) {
      verifyEmailExists(trimmedEmail)
    }
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    setError('')

    // Validate email before submission
    if (!email.trim()) {
      setError('Please enter your email address')
      return
    }

    if (!isEmailVerified) {
      setError('Please enter a valid email address that exists in our system')
      return
    }

    setLoading(true)

    const payload = {
      email: email.trim()
    }

    try {
      const response = await axios.post(`${BASE_URL}/api/admin/users/forgot-password`, payload, {
        timeout: 10000, // 10 second timeout
        headers: {
          'Content-Type': 'application/json'
        }
      });
      toast.success(response.data.message || "Password Reset Email Sent!")
      // Reset form
      setEmail('')
      setIsEmailVerified(false)

      // Navigate to login after delay
      setTimeout(() => {
        navigate("/auth/login")
      }, 2000)

    } catch (err: any) {
      console.error('Password reset error:', err)

      let errorMessage = 'Something went wrong. Please try again.'

      if (err.code === 'ECONNABORTED') {
        errorMessage = 'Request timeout. Please try again.'
      } else if (err.response) {
        // Server responded with error
        const status = err.response.status
        const data = err.response.data

        switch (status) {
          case 400:
            errorMessage = data?.message || 'Invalid email address'
            break
          case 404:
            errorMessage = 'No account found with this email address'
            break
          case 429:
            errorMessage = 'Too many requests. Please try again later.'
            break
          case 500:
            errorMessage = 'Server error. Please try again later.'
            break
          default:
            errorMessage = data?.message || `Error ${status}: Please try again.`
        }
      } else if (err.request) {
        // Network error
        errorMessage = 'Network error. Please check your connection.'
      }
      setError(errorMessage)

    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="flex items-center justify-center mt-6 w-full px-4">
      <Card className="overflow-hidden w-full max-w-md lg:max-w-md mt-4 h-auto">
        <CardContent className="grid grid-cols-1 md:grid-cols-1 p-0">

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-4 sm:p-3 md:p-5">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-xl sm:text-2xl font-bold">Forgot Password</h1>
                <p className="text-sm sm:text-base text-muted-foreground">
                  Enter your email address and we&apos;ll send you a link to reset your password
                </p>
              </div>

              {/* Email input */}
              <div className="grid gap-3 mt-5">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value)
                      setEmailError('')
                      setIsEmailVerified(false)
                      setError('') // Clear general error too
                    }}
                    onBlur={handleEmailBlur}
                    className={cn(
                      "pr-10 text-sm sm:text-base",
                      emailError && "border-red-500 focus:border-red-500",
                      isEmailVerified && "border-green-500 focus:border-green-500"
                    )}
                    disabled={verifyingEmail || loading}
                    autoComplete="email"
                    aria-describedby={emailError ? "email-error" : isEmailVerified ? "email-success" : undefined}
                  />

                  {/* Status indicator */}
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    {verifyingEmail && (
                      <div
                        className="w-4 h-4 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"
                        aria-label="Verifying email"
                      />
                    )}
                    {!verifyingEmail && isEmailVerified && (
                      <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                    {!verifyingEmail && emailError && email && (
                      <div className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </div>
                    )}
                  </div>
                </div>

                {/* Validation messages */}
                {emailError && (
                  <p id="email-error" className="text-xs sm:text-sm text-red-600 flex items-center gap-1" role="alert">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {emailError}
                  </p>
                )}

                {isEmailVerified && (
                  <p id="email-success" className="text-xs sm:text-sm text-green-600 flex items-center gap-1" role="status">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Email verified successfully
                  </p>
                )}
              </div>

              {error && (
                <div className="p-2 sm:p-3 text-xs sm:text-sm text-red-600 bg-red-50 border border-red-200 rounded-md" role="alert">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                className="w-full text-sm sm:text-base"
                disabled={loading || !isEmailVerified || verifyingEmail || !email.trim()}
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" aria-hidden="true" />
                    Sending Reset Link...
                  </div>
                ) : (
                  'Send Password Reset Email'
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
        </CardContent>
      </Card>
    </section>
  )
}