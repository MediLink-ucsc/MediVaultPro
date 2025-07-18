import React, { useState } from 'react';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';
import MediLinkLogo from '../resources/MediLinkLogo.jpeg';

const ForgotPassword = ({ onBackToLogin, onResetPassword, context = 'page' }) => {
  const isModal = context === 'modal';
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Simulate API call for password reset
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real application, you would make an API call here
      console.log('Password reset email sent to:', email);
      
      setIsSubmitted(true);
    } catch (err) {
      setError('Failed to send reset email. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToLogin = () => {
    setIsSubmitted(false);
    setEmail('');
    setError('');
    onBackToLogin();
  };

  return (
    <div className={`${isModal ? 'w-full' : 'min-h-screen bg-gradient-to-br from-teal-50 to-orange-50 flex items-center justify-center p-4'}`}>
      <div className={`${isModal ? 'w-full' : 'bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md'}`}>
        <div className="text-center mb-8">
          <div className={`mx-auto w-16 h-16 ${isModal 
            ? 'bg-gradient-to-br from-teal-500 to-orange-500' 
            : 'bg-white'
          } rounded-full flex items-center justify-center mb-4 shadow-lg`}>
            <img 
              src={MediLinkLogo} 
              alt="MediLink Logo" 
              className={`w-12 h-12 object-contain ${isModal ? 'rounded-full' : ''}`}
            />
          </div>
          <h1 className={`text-2xl font-bold ${isModal 
            ? 'bg-gradient-to-r from-teal-600 to-orange-600 bg-clip-text text-transparent' 
            : 'text-gray-800'
          }`}>
            {isModal ? 'MediVaultPro' : 'MedivaultPro'}
          </h1>
          <p className="text-gray-600 mt-2">
            {isSubmitted ? 'Check your email' : 'Reset your password'}
          </p>
        </div>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                />
              </div>
              <p className="text-sm text-gray-500 mt-2">
                We'll send you a link to reset your password
              </p>
            </div>

            {error && (
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                <p className="text-orange-600 text-sm">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-gradient-to-r from-teal-600 to-teal-700 text-white py-3 px-4 rounded-lg font-semibold shadow-lg ${
                isLoading 
                  ? 'opacity-50 cursor-not-allowed' 
                  : isModal 
                    ? 'hover:shadow-xl transform transition-all duration-200 hover:scale-[1.02]' 
                    : 'hover:from-teal-700 hover:to-teal-800 transition-colors'
              }`}
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Sending...
                </>
              ) : (
                'Send Reset Link'
              )}
            </button>
          </form>
        ) : (
          <div className="text-center space-y-6">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            
            <div className="space-y-2">
              <h3 className="text-lg font-medium text-gray-800">Email sent!</h3>
              <p className="text-gray-600 text-sm">
                We've sent a password reset link to:
              </p>
              <p className="font-medium text-gray-800">{email}</p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-blue-800 text-sm">
                <strong>Didn't receive the email?</strong><br />
                Check your spam folder or try again in a few minutes.
              </p>
            </div>

            {/* Demo button to simulate clicking reset link */}
            <button
              onClick={() => {
                // Simulate clicking the reset link from email
                const mockToken = 'demo-reset-token-' + Date.now();
                onResetPassword && onResetPassword(mockToken);
              }}
              className={`w-full bg-gradient-to-r from-teal-600 to-teal-700 text-white py-3 px-4 rounded-lg font-semibold shadow-lg ${
                isModal 
                  ? 'hover:shadow-xl transform transition-all duration-200 hover:scale-[1.02]' 
                  : 'hover:from-teal-700 hover:to-teal-800 transition-colors'
              }`}
            >
              🔗 Click Reset Link (Demo)
            </button>

            <button
              onClick={() => {
                setIsSubmitted(false);
                setEmail('');
              }}
              className={`w-full py-3 px-4 rounded-lg font-medium ${
                isModal 
                  ? 'bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 transition duration-200'
              }`}
            >
              Try Different Email
            </button>
          </div>
        )}

        <div className="mt-6 text-center">
          <button 
            onClick={handleBackToLogin}
            className={`text-teal-600 hover:text-teal-700 text-sm font-medium flex items-center justify-center mx-auto ${
              isModal ? 'hover:underline transition-colors' : ''
            }`}
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Sign In
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
