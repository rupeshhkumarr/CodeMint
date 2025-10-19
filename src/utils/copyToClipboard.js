// src/utils/copyToClipboard.js
import toast from 'react-hot-toast';

export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    
    // Show success toast
    toast.success('Copied to clipboard!', {
      duration: 2000,
      position: 'top-right',
      style: {
        background: '#10B981',
        color: 'white',
        fontSize: '14px',
        fontWeight: '500',
        borderRadius: '8px',
        padding: '12px 16px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      },
      iconTheme: {
        primary: 'white',
        secondary: '#10B981',
      },
    });

    return true;
  } catch (err) {
    console.error('Failed to copy: ', err);

    // Fallback for older browsers
    try {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      
      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);

      if (successful) {
        toast.success('Copied to clipboard!', {
          duration: 2000,
          position: 'top-right',
          style: {
            background: '#10B981',
            color: 'white',
            fontSize: '14px',
            fontWeight: '500',
            borderRadius: '8px',
            padding: '12px 16px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          },
          iconTheme: {
            primary: 'white',
            secondary: '#10B981',
          },
        });
        return true;
      } else {
        throw new Error('Fallback copy failed');
      }
    } catch (fallbackErr) {
      console.error('Fallback copy failed: ', fallbackErr);
      
      // Show error toast
      toast.error('Failed to copy to clipboard', {
        duration: 3000,
        position: 'top-right',
        style: {
          background: '#EF4444',
          color: 'white',
          fontSize: '14px',
          fontWeight: '500',
          borderRadius: '8px',
          padding: '12px 16px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        },
      });
      
      return false;
    }
  }
};