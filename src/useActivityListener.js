import { useEffect } from 'react';

const useActivityListener = (events, onActivity, dependencies = []) => {
  useEffect(() => {
    const handleActivity = () => {
      onActivity();
    };

    events.forEach((event) => {
      window.addEventListener(event, handleActivity);
    });

    return () => {
      events.forEach((event) => {
        window.removeEventListener(event, handleActivity);
      });
    };
  }, [onActivity, ...dependencies]);
};

export default useActivityListener;
