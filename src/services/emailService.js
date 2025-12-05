/**
 * Email Service using EmailJS
 * Handles automated email sending for diagnostic test signups
 * Emails sent from: cadenatnomi@gmail.com
 */

import emailjs from '@emailjs/browser';

// EmailJS Configuration
// TODO: Replace these with your actual EmailJS credentials from emailjs.com
const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID'; // Get from emailjs.com after connecting cadenatnomi@gmail.com
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID'; // Get from emailjs.com after creating template
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY'; // Get from emailjs.com account settings

/**
 * Sends a welcome email to users who sign up for the diagnostic test
 * @param {Object} formData - User form data (firstName, email, phone, isInUS)
 * @returns {Promise} - EmailJS send promise
 */
export const sendDiagnosticWelcomeEmail = async (formData) => {
  // Email template parameters
  const templateParams = {
    to_email: formData.email,
    to_name: formData.firstName,
    from_name: 'Caden Chiang',
    from_title: 'Student Success Manager - Nomi Academy',
    company_name: 'Nomi Academy',
    diagnostic_link: `${window.location.origin}/diagnostic`,
    training_link: `${window.location.origin}/app/home`,
    user_phone: formData.phone,
    user_location: formData.isInUS === 'yes' ? 'United States' : 'International',
  };

  try {
    console.log('Sending welcome email to:', formData.email);

    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams,
      EMAILJS_PUBLIC_KEY
    );

    console.log('Email sent successfully:', response);
    return response;
  } catch (error) {
    console.error('Failed to send email:', error);
    throw error;
  }
};

/**
 * Email Template for EmailJS
 * Copy this template to your EmailJS dashboard
 *
 * Subject: Your ACT Diagnostic Test + A Special Bonus for You!
 *
 * Body:
 *
 * Hey {{to_name}},
 *
 * Thanks for requesting your Free Diagnostic Test! You can grab it right here: {{diagnostic_link}}
 *
 * Now, here's the exciting part: You're also qualified for a FREE 35+ ACT Training!
 *
 * This is an exclusive opportunity to get personalized strategies and tips to boost your ACT score.
 *
 * 👉 Click here to claim your FREE 35+ TRAINING now: {{training_link}}
 *
 * Secure your free training today before it's gone!
 *
 * But don't wait—this special offer is only available for a limited time, and spots are filling up fast.
 *
 * Best wishes,
 * {{from_name}}
 * {{from_title}}
 *
 * ---
 *
 * If you no longer wish to receive these emails you may unsubscribe.
 */
