import React, { useState } from 'react';
import AuthForm from './AuthForm';

const Auth = ({ 
  context = 'page', // 'page' or 'modal'
  onLogin, 
  onSignup,
  onSwitchToForgotPassword,
  onBackToLanding 
}) => {
  const [mode, setMode] = useState('login'); // 'login' or 'signup'

  const handleSwitchMode = () => {
    setMode(mode === 'login' ? 'signup' : 'login');
  };

  // For full page context, wrap with layout
  if (context === 'page') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 to-orange-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md relative">
          <AuthForm 
            mode={mode}
            context={context}
            onLogin={onLogin}
            onSignup={onSignup}
            onSwitchMode={handleSwitchMode}
            onSwitchToForgotPassword={onSwitchToForgotPassword}
            onBackToLanding={onBackToLanding}
          />
        </div>
      </div>
    );
  }

  // For modal context, return form directly
  return (
    <AuthForm 
      mode={mode}
      context={context}
      onLogin={onLogin}
      onSignup={onSignup}
      onSwitchMode={handleSwitchMode}
      onSwitchToForgotPassword={onSwitchToForgotPassword}
      onBackToLanding={onBackToLanding}
    />
  );
};

export default Auth;
