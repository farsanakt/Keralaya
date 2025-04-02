import UserFooter from '@/components/user/UserFooter';
import UserHeader from '@/components/user/UserHeader';
import React from 'react';
// import Image from 'next/image';

interface AboutUsProps {
  companyName?: string;
  foundedYear?: number;
  missionStatement?: string;
}

const AboutUs: React.FC<AboutUsProps> = ({
  companyName = 'KERALAYA',
  foundedYear = 2025,
  missionStatement = 'Connecting travelers with expert local guides for authentic experiences worldwide.'
}) => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <UserHeader />
      
      <main className="flex-grow py-12 px-4 md:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Hero Section */}
          <div className="relative mb-16 overflow-hidden rounded-xl bg-black text-white h-64 md:h-80 flex items-center">
            <div className="absolute inset-0 opacity-50">
              
            </div>
            <div className="relative z-10 px-8 md:px-16">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">About {companyName}</h1>
              <p className="text-xl md:text-2xl font-light max-w-2xl">
                We reimagine how travel connects people, cultures, and experiences.
              </p>
            </div>
          </div>
          
          {/* Our Story Section */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 inline-block border-b-2 border-black pb-1">Our Story</h2>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-gray-800 text-lg mb-4 leading-relaxed">
                  Born in {foundedYear} from a passion for authentic travel, {companyName} revolutionizes how explorers discover the world. We believe extraordinary journeys begin with extraordinary guides.
                </p>
                <p className="text-gray-800 text-lg mb-4 leading-relaxed">
                  Our platform bridges the gap between curious travelers and knowledgeable local experts who unveil hidden gems and cultural treasures that traditional tourism often misses.
                </p>
                <blockquote className="border-l-4 border-black pl-4 italic my-6">
                  <p className="text-xl">{missionStatement}</p>
                </blockquote>
              </div>
              <div className="bg-gray-100 p-8 rounded-lg border border-gray-200">
                <h3 className="text-xl font-bold mb-6 text-center">The {companyName} Experience</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <span className="text-black font-bold mr-3 text-xl">✓</span>
                    <div>
                      <span className="font-medium block">Real-time Weather Intelligence</span>
                      <span className="text-gray-600 text-sm">Plan with confidence using our precise destination forecasts</span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-black font-bold mr-3 text-xl">✓</span>
                    <div>
                      <span className="font-medium block">Secure Booking & Payments</span>
                      <span className="text-gray-600 text-sm">Industry-leading encryption and protection for peace of mind</span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-black font-bold mr-3 text-xl">✓</span>
                    <div>
                      <span className="font-medium block">Instant Guide Communication</span>
                      <span className="text-gray-600 text-sm">Direct messaging before, during and after your journey</span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-black font-bold mr-3 text-xl">✓</span>
                    <div>
                      <span className="font-medium block">Verified Review System</span>
                      <span className="text-gray-600 text-sm">Authentic feedback from fellow travelers ensures quality</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Our Values Section */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 inline-block border-b-2 border-black pb-1">Our Values</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-6 bg-black text-white rounded-lg hover:transform hover:scale-[1.02] transition-transform">
                <h4 className="font-bold text-xl mb-3">Authenticity</h4>
                <p className="text-gray-100">We celebrate genuine connections between travelers and guides who share deep knowledge and passion for their regions.</p>
              </div>
              <div className="p-6 bg-gray-100 text-black rounded-lg border border-gray-200 hover:transform hover:scale-[1.02] transition-transform">
                <h4 className="font-bold text-xl mb-3">Safety</h4>
                <p className="text-gray-800">Every guide is thoroughly vetted, every payment secured, and support is always available when you need it most.</p>
              </div>
              <div className="p-6 bg-black text-white rounded-lg hover:transform hover:scale-[1.02] transition-transform">
                <h4 className="font-bold text-xl mb-3">Community</h4>
                <p className="text-gray-100">We foster meaningful cultural exchange that benefits both travelers and local communities around the world.</p>
              </div>
            </div>
          </div>
          
          {/* Team Section Placeholder */}
          <div className="text-center py-8 px-6 bg-gray-50 rounded-lg mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Meet Our Team</h2>
            <p className="text-gray-600 mb-6">A diverse group of travel enthusiasts, technology experts, and customer experience specialists.</p>
            <button className="bg-black text-white py-2 px-6 rounded hover:bg-gray-800 transition-colors">
              Learn About Our Team
            </button>
          </div>
        </div>
      </main>
      
      <UserFooter />
    </div>
  );
};

export default AboutUs;