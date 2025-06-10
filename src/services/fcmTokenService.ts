
// fcmTokenService.ts
import { getToken } from 'firebase/messaging';
import { messaging } from './firebase';

export const getFcmToken = async (): Promise<string | null> => {
  try {
    const token = await getToken(messaging, {
      vapidKey: 'YOUR_PUBLIC_VAPID_KEY', // From Firebase Console > Cloud Messaging
    });

    if (token) {
      console.log('FCM Token:', token);
      return token;
    } else {
      console.warn('No registration token available.');
      return null;
    }
  } catch (err) {
    console.error('Error fetching FCM token:', err);
    return null;
  }
};
