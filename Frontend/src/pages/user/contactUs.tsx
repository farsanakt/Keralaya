import React, { useState } from 'react';
import UserHeader from '@/components/user/UserHeader';
import UserFooter from '@/components/user/UserFooter';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const ContactUs: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [submitStatus, setSubmitStatus] = useState<{
    submitted: boolean;
    success: boolean;
    message: string;
  }>({
    submitted: false,
    success: false,
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real application, you would send this data to your backend
    // This is a placeholder for demonstration purposes
    try {
      // Simulating API call
      setTimeout(() => {
        setSubmitStatus({
          submitted: true,
          success: true,
          message: 'Thank you for reaching out! We will get back to you shortly.'
        });
      }, 1000);
      
    } catch (error) {
      setSubmitStatus({
        submitted: true,
        success: false,
        message: 'Something went wrong. Please try again later.'
      });
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <UserHeader />
      
      <main className="flex-grow py-12 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="relative mb-16 overflow-hidden rounded-xl bg-black text-white h-64 flex items-center">
            <div className="absolute inset-0 opacity-70">
              {/* Placeholder for background image */}
            </div>
            <div className="relative z-10 px-8 md:px-16">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
              <p className="text-xl font-light max-w-2xl">
                We're here to help make your journey extraordinary
              </p>
            </div>
          </div>
          
          {/* Contact Content */}
          <div className="grid md:grid-cols-5 gap-12 mb-16">
            {/* Contact Information - 2 columns */}
            <div className="md:col-span-2 bg-gray-50 p-8 rounded-lg border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 inline-block border-b-2 border-black pb-1">
                Get in Touch
              </h2>
              
              <div className="space-y-8">
                <div>
                  <h3 className="font-semibold text-lg mb-2">Our Office</h3>
                  <p className="text-gray-700">123 Travel Avenue</p>
                  <p className="text-gray-700">Suite 456</p>
                  <p className="text-gray-700">Adventure City, AC 98765</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-lg mb-2">Contact Information</h3>
                  <p className="text-gray-700">
                    <span className="font-medium">Email:</span> hello@travelbuddy.com
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">Phone:</span> +1 (555) 123-4567
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">Support Hours:</span> 24/7
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-lg mb-2">Follow Us</h3>
                  <div className="flex space-x-4">
                    <a href="#" className="bg-black text-white p-2 rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-800">
                      <span className="sr-only">Facebook</span>
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                      </svg>
                    </a>
                    <a href="#" className="bg-black text-white p-2 rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-800">
                      <span className="sr-only">Instagram</span>
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                      </svg>
                    </a>
                    <a href="#" className="bg-black text-white p-2 rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-800">
                      <span className="sr-only">Twitter</span>
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="mt-10 pt-8 border-t border-gray-200">
                <h3 className="font-semibold text-lg mb-4">Urgent Assistance?</h3>
                <div className="bg-black text-white p-4 rounded-lg">
                  <p className="font-medium">24/7 Travel Support Hotline</p>
                  <p className="text-xl font-bold">+1 (555) 987-6543</p>
                </div>
              </div>
            </div>
            
            {/* Contact Form - 3 columns */}
            <div className="md:col-span-3">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 inline-block border-b-2 border-black pb-1">
                Send Us a Message
              </h2>
              
              {submitStatus.submitted && submitStatus.success ? (
                <div className="bg-gray-50 p-8 rounded-lg border border-gray-200 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-black text-white rounded-full mb-4">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Message Sent Successfully!</h3>
                  <p className="text-gray-600 mb-6">{submitStatus.message}</p>
                  <button 
                    onClick={() => setSubmitStatus({ submitted: false, success: false, message: '' })}
                    className="bg-black text-white py-2 px-6 rounded hover:bg-gray-800 transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                      Subject *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                    >
                      <option value="">Select a subject</option>
                      <option value="booking">Booking Inquiry</option>
                      <option value="guide">Guide Information</option>
                      <option value="payment">Payment Issue</option>
                      <option value="feedback">Feedback</option>
                      <option value="partnership">Partnership Opportunity</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                      placeholder="How can we help you?"
                    ></textarea>
                  </div>
                  
                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      id="privacy"
                      required
                      className="mt-1"
                    />
                    <label htmlFor="privacy" className="ml-2 block text-sm text-gray-600">
                      I agree to the <a href="#" className="text-black underline">Privacy Policy</a> and consent to being contacted about my inquiry.
                    </label>
                  </div>
                  
                  <div className="mt-8">
                    <button
                      type="submit"
                      className="w-full bg-black text-white py-3 px-6 rounded-md hover:bg-gray-800 transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                    >
                      Send Message
                    </button>
                  </div>
                </form>
              )}
              
              {/* FAQ Section */}
              <div className="mt-16">
                <h3 className="text-xl font-bold mb-6">Frequently Asked Questions</h3>
                <div className="space-y-4">
                  <div className="border-b border-gray-200 pb-4">
                    <h4 className="font-medium mb-2">How quickly will I receive a response?</h4>
                    <p className="text-gray-600 text-sm">We aim to respond to all inquiries within 24 hours, and usually much faster during business hours.</p>
                  </div>
                  <div className="border-b border-gray-200 pb-4">
                    <h4 className="font-medium mb-2">Can I speak with a guide before booking?</h4>
                    <p className="text-gray-600 text-sm">Yes, our platform allows you to message guides directly once you've created an account.</p>
                  </div>
                  <div className="border-b border-gray-200 pb-4">
                    <h4 className="font-medium mb-2">How do refunds work?</h4>
                    <p className="text-gray-600 text-sm">Our refund policy varies depending on the guide and experience. Details are provided on each listing.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Map Section Placeholder */}
          {/* <div className="bg-gray-100 h-80 rounded-lg flex items-center justify-center mb-16">
            <div className="text-center">
              <h3 className="text-xl font-bold mb-2">Visit Our Office</h3>
              <p className="text-gray-600">Map integration would appear here</p>
            </div>
          </div> */}
        </div>
      </main>
      
      <UserFooter />
    </div>
  );
};

export default ContactUs;