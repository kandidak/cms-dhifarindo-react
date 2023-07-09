import { useEffect, useState } from 'react';
// import { CircleLoader } from 'react-spinners';

const LoadingOverlay = () => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const startLoading = () => setIsLoading(true);
    const stopLoading = () => setIsLoading(false);

    // Add event listeners to start and stop loading
    document.addEventListener('startLoading', startLoading);
    document.addEventListener('stopLoading', stopLoading);

    return () => {
      // Clean up event listeners
      document.removeEventListener('startLoading', startLoading);
      document.removeEventListener('stopLoading', stopLoading);
    };
  }, []);

  if (!isLoading) {
    return null; // Render nothing if not loading
  }

  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16 mb-4"></div>
    </div>
  );
};

export default LoadingOverlay;
