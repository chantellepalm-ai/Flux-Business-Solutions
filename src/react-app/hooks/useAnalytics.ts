import { useEffect } from 'react';

// Google Analytics tracking functions
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

export const useAnalytics = () => {
  useEffect(() => {
    // Initialize dataLayer if it doesn't exist
    if (!window.dataLayer) {
      window.dataLayer = [];
    }

    // Initialize gtag if it doesn't exist
    if (!window.gtag) {
      window.gtag = function() {
        window.dataLayer!.push(arguments);
      };
    }
  }, []);

  const trackEvent = (eventName: string, parameters?: Record<string, any>) => {
    if (window.gtag) {
      window.gtag('event', eventName, parameters);
    }
  };

  const trackPageView = (pagePath: string, pageTitle?: string) => {
    if (window.gtag) {
      window.gtag('config', 'G-XXXXXXXXXX', {
        page_path: pagePath,
        page_title: pageTitle,
      });
    }
  };

  const trackConversion = (conversionType: 'newsletter_signup' | 'contact_form' | 'appointment_booking', value?: number) => {
    if (window.gtag) {
      window.gtag('event', 'conversion', {
        conversion_type: conversionType,
        value: value || 1,
        currency: 'USD'
      });
    }
  };

  const trackEngagement = (engagementType: 'scroll' | 'time_on_page' | 'click', details?: Record<string, any>) => {
    if (window.gtag) {
      window.gtag('event', 'engagement', {
        engagement_type: engagementType,
        ...details
      });
    }
  };

  return {
    trackEvent,
    trackPageView,
    trackConversion,
    trackEngagement
  };
};

// Utility function to track form submissions
export const trackFormSubmission = (formType: string, success: boolean) => {
  if (window.gtag) {
    window.gtag('event', 'form_submission', {
      form_type: formType,
      success: success,
      timestamp: new Date().toISOString()
    });
  }
};

// Utility function to track CTA clicks
export const trackCTAClick = (ctaLocation: string, ctaText: string, destination: string) => {
  if (window.gtag) {
    window.gtag('event', 'cta_click', {
      cta_location: ctaLocation,
      cta_text: ctaText,
      destination: destination
    });
  }
};
