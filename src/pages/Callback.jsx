import { useHandleSignInCallback } from '@logto/react';

const Callback = () => {
  const { isLoading } = useHandleSignInCallback(() => {
    // Redirect to the home page after the user signs in
    window.location.href = "/";
  });

  // When it's working in progress
  if (isLoading) {
    return <div>Redirecting...</div>;
  }

  return null;
};

export default Callback;