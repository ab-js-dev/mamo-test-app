import { useEffect } from 'react';

type ErrorNotificationProps = {
  message: string;
  isVisible: boolean;
  duration?: number;
  onClose: () => void;
};

const ErrorNotification = ({ message, isVisible, duration = 5000, onClose }: ErrorNotificationProps) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white p-4 rounded-lg shadow-lg z-50">
      <div className="flex items-center">
        <div className="flex-1">
          <p>{message}</p>
        </div>
        <button onClick={onClose} className="ml-4 text-xl">&times;</button>
      </div>
    </div>
  );
};

export default ErrorNotification;
