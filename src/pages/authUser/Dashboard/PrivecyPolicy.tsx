import { Shield, Lock, Eye, Database, Users, Globe, Phone, Mail, Calendar, FileText, CheckCircle, AlertTriangle } from 'lucide-react';

const PrivecyPolicy = () => {
  const policySections = [
    {
      id: 'information-collection',
      title: 'Information We Collect',
      icon: <Database className="w-6 h-6" />,
      content: [
        'Personal identification information (name, email address, phone number)',
        'Delivery address and location data',
        'Payment information and transaction history',
        'Device information and usage analytics',
        'Communication preferences and feedback'
      ]
    },
    {
      id: 'how-we-use',
      title: 'How We Use Your Information',
      icon: <Eye className="w-6 h-6" />,
      content: [
        'Process and fulfill your food delivery orders',
        'Provide customer support and respond to inquiries',
        'Send order updates and delivery notifications',
        'Improve our services and user experience',
        'Comply with legal obligations and regulations'
      ]
    },
    {
      id: 'information-sharing',
      title: 'Information Sharing',
      icon: <Users className="w-6 h-6" />,
      content: [
        'Restaurant partners for order fulfillment',
        'Delivery drivers for order delivery',
        'Payment processors for secure transactions',
        'Legal authorities when required by law',
        'Never sell personal data to third parties'
      ]
    },
    {
      id: 'data-security',
      title: 'Data Security',
      icon: <Lock className="w-6 h-6" />,
      content: [
        'Encryption of sensitive data in transit and at rest',
        'Regular security audits and vulnerability assessments',
        'Access controls and authentication measures',
        'Secure data centers with physical security',
        'Employee training on data protection practices'
      ]
    },
    {
      id: 'your-rights',
      title: 'Your Rights',
      icon: <CheckCircle className="w-6 h-6" />,
      content: [
        'Access and review your personal information',
        'Request correction of inaccurate data',
        'Delete your account and associated data',
        'Opt-out of marketing communications',
        'Data portability in machine-readable format'
      ]
    },
    {
      id: 'cookies-tracking',
      title: 'Cookies & Tracking',
      icon: <Globe className="w-6 h-6" />,
      content: [
        'Essential cookies for website functionality',
        'Analytics cookies to improve user experience',
        'Marketing cookies for personalized content',
        'Third-party cookies from trusted partners',
        'Cookie preferences management in settings'
      ]
    }
  ];

  const contactInfo = [
    { icon: <Mail className="w-5 h-5" />, label: 'Email', value: 'privacy@delivista.com' },
    { icon: <Phone className="w-5 h-5" />, label: 'Phone', value: '+1 (555) 123-4567' },
    { icon: <Calendar className="w-5 h-5" />, label: 'Last Updated', value: 'December 15, 2024' }
  ];

  return (
         <div className="min-h-screen bg-white">
       {/* Header Section */}
       <div className="relative overflow-hidden bg-white shadow-lg">
         <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-600 opacity-10"></div>
         <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
           <div className="text-center">
             <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full shadow-lg mb-6">
               <Shield className="w-10 h-10 text-white" />
             </div>
             <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
               Privacy Policy
             </h1>
             <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
               We are committed to protecting your privacy and ensuring the security of your personal information. 
               This policy explains how we collect, use, and safeguard your data.
             </p>
           </div>
         </div>
       </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Sidebar - Quick Navigation */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <FileText className="w-5 h-5 mr-2 text-orange-600" />
                  Quick Navigation
                </h3>
                <nav className="space-y-2">
                  {policySections.map((section) => (
                    <a
                      key={section.id}
                      href={`#${section.id}`}
                      className="block px-3 py-2 text-sm text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-all duration-200"
                    >
                      {section.title}
                    </a>
                  ))}
                </nav>
                
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h4 className="text-sm font-medium text-gray-900 mb-3">Contact Information</h4>
                  <div className="space-y-2">
                    {contactInfo.map((info, index) => (
                      <div key={index} className="flex items-center text-sm text-gray-600">
                        <span className="text-orange-600 mr-2">{info.icon}</span>
                        <span className="font-medium">{info.label}:</span>
                        <span className="ml-1">{info.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-8">
            {policySections.map((section) => (
              <div
                key={section.id}
                id={section.id}
                className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-start space-x-4 mb-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                    <div className="text-white">
                      {section.icon}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      {section.title}
                    </h2>
                    <div className="w-16 h-1 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full"></div>
                  </div>
                </div>
                
                <ul className="space-y-3">
                  {section.content.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                      <span className="text-gray-700 leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Additional Information Section */}
            <div className="bg-gradient-to-r from-orange-50 to-white rounded-2xl p-8 border border-orange-200">
              <div className="flex items-center space-x-3 mb-4">
                <AlertTriangle className="w-6 h-6 text-orange-600" />
                <h3 className="text-xl font-semibold text-gray-900">Important Notice</h3>
              </div>
              <p className="text-gray-700 leading-relaxed mb-4">
                This privacy policy may be updated periodically to reflect changes in our practices or applicable laws. 
                We will notify you of any material changes through our app or email communications.
              </p>
              <div className="bg-white rounded-xl p-4 border border-orange-200">
                <p className="text-sm text-gray-600">
                  <strong>Note:</strong> By using our services, you acknowledge that you have read and understood 
                  this privacy policy and agree to the collection, use, and disclosure of your information as described herein.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <div className="bg-gray-900 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <Shield className="w-8 h-8 text-orange-400 mr-3" />
            <span className="text-xl font-semibold">Delivista</span>
          </div>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Your privacy and trust are paramount to us. We are committed to maintaining the highest standards 
            of data protection and transparency in all our operations.
          </p>
          <div className="mt-6 text-sm text-gray-500">
            © 2024 Delivista. All rights reserved. | Privacy Policy | Terms of Service
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivecyPolicy;
