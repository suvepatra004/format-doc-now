import { useEffect } from 'react';

interface AnalyticsConfig {
  googleAnalyticsId?: string;
  googleTagManagerId?: string;
  facebookPixelId?: string;
}

interface AnalyticsEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
}

// Default analytics configuration
const defaultConfig: AnalyticsConfig = {
  // Add your analytics IDs here when ready
  // googleAnalyticsId: 'GA_MEASUREMENT_ID',
  // googleTagManagerId: 'GTM-XXXXXXX',
  // facebookPixelId: 'FACEBOOK_PIXEL_ID',
};

// Google Analytics helper functions
export const initializeGoogleAnalytics = (measurementId: string) => {
  if (typeof window !== 'undefined') {
    // Load Google Analytics script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.appendChild(script);

    // Initialize gtag
    window.gtag = window.gtag || function(...args: any[]) {
      (window.gtag as any).q = (window.gtag as any).q || [];
      (window.gtag as any).q.push(args);
    };
    window.gtag('js', new Date());
    window.gtag('config', measurementId, {
      page_title: document.title,
      page_location: window.location.href,
    });
  }
};

export const trackEvent = (event: AnalyticsEvent) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', event.action, {
      event_category: event.category,
      event_label: event.label,
      value: event.value,
    });
  }
};

export const trackPageView = (path: string, title?: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', defaultConfig.googleAnalyticsId, {
      page_path: path,
      page_title: title || document.title,
    });
  }
};

// Google Tag Manager helper functions
export const initializeGoogleTagManager = (gtmId: string) => {
  if (typeof window !== 'undefined') {
    // Load GTM script
    const script = document.createElement('script');
    script.innerHTML = `
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','${gtmId}');
    `;
    document.head.appendChild(script);

    // Add noscript fallback
    const noscript = document.createElement('noscript');
    noscript.innerHTML = `<iframe src="https://www.googletagmanager.com/ns.html?id=${gtmId}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`;
    document.body.appendChild(noscript);
  }
};

// Facebook Pixel helper functions
export const initializeFacebookPixel = (pixelId: string) => {
  if (typeof window !== 'undefined') {
    // Load Facebook Pixel script
    const script = document.createElement('script');
    script.innerHTML = `
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '${pixelId}');
      fbq('track', 'PageView');
    `;
    document.head.appendChild(script);

    // Add noscript fallback
    const noscript = document.createElement('noscript');
    noscript.innerHTML = `<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1" />`;
    document.body.appendChild(noscript);
  }
};

// Custom hook for analytics
export const useAnalytics = (config: AnalyticsConfig = {}) => {
  const finalConfig = { ...defaultConfig, ...config };

  useEffect(() => {
    // Initialize analytics services
    if (finalConfig.googleAnalyticsId) {
      initializeGoogleAnalytics(finalConfig.googleAnalyticsId);
    }
    
    if (finalConfig.googleTagManagerId) {
      initializeGoogleTagManager(finalConfig.googleTagManagerId);
    }
    
    if (finalConfig.facebookPixelId) {
      initializeFacebookPixel(finalConfig.facebookPixelId);
    }
  }, [finalConfig]);

  return {
    trackEvent,
    trackPageView,
    config: finalConfig,
  };
};

// Extend Window interface for TypeScript
declare global {
  interface Window {
    gtag: ((...args: any[]) => void) & { q?: any[] };
    dataLayer: any[];
    fbq: (...args: any[]) => void;
  }
}

export default useAnalytics;