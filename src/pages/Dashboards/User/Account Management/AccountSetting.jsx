import React, { useState } from 'react';
import { Lock, Shield, Mail, Link, Globe, UserMinus, Eye } from 'lucide-react';

const AccountSettings = () => {
  const [activeTab, setActiveTab] = useState('password');

  const tabs = [
    { id: 'password', name: 'Password', icon: Lock },
    { id: '2fa', name: '2FA', icon: Shield },
    { id: 'email', name: 'Email', icon: Mail },
    { id: 'connected', name: 'Connected', icon: Link },
    { id: 'language', name: 'Language', icon: Globe },
    { id: 'deactivation', name: 'Deactivation', icon: UserMinus },
    { id: 'privacy', name: 'Privacy', icon: Eye },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'password':
        return <PasswordManagement />;
      case '2fa':
        return <TwoFactorAuth />;
      case 'email':
        return <EmailPreferences />;
      case 'connected':
        return <ConnectedAccounts />;
      case 'language':
        return <LanguageAndRegion />;
      case 'deactivation':
        return <AccountDeactivation />;
      case 'privacy':
        return <PrivacySettings />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">Account Settings</h1>
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <nav className="md:w-64 bg-gray-50 p-6">
              <ul className="space-y-2">
                {tabs.map((tab) => (
                  <li key={tab.id}>
                    <button
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center w-full px-4 py-2 text-left rounded-lg transition-colors duration-150 ease-in-out ${
                        activeTab === tab.id
                          ? 'bg-blue-500 text-white'
                          : 'text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      <tab.icon className="w-5 h-5 mr-3" />
                      {tab.name}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="flex-1 p-6 md:p-8">{renderContent()}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const PasswordManagement = () => (
  <div>
    <h2 className="text-2xl font-bold text-gray-900 mb-6">Password Management</h2>
    <form className="space-y-6">
      <div>
        <label htmlFor="current-password" className="block text-sm font-medium text-gray-700">Current Password</label>
        <input type="password" id="current-password" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
      </div>
      <div>
        <label htmlFor="new-password" className="block text-sm font-medium text-gray-700">New Password</label>
        <input type="password" id="new-password" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
      </div>
      <div>
        <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">Confirm New Password</label>
        <input type="password" id="confirm-password" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
      </div>
      <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
        Update Password
      </button>
    </form>
  </div>
);

const TwoFactorAuth = () => (
  <div>
    <h2 className="text-2xl font-bold text-gray-900 mb-6">Two-Factor Authentication</h2>
    <p className="text-gray-600 mb-6">Enhance your account security by enabling two-factor authentication.</p>
    <div className="bg-gray-50 p-4 rounded-lg mb-6">
      <p className="text-sm text-gray-600">Status: <span className="font-semibold text-red-500">Not Enabled</span></p>
    </div>
    <button className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
      Enable 2FA
    </button>
  </div>
);

const EmailPreferences = () => (
  <div>
    <h2 className="text-2xl font-bold text-gray-900 mb-6">Email Preferences</h2>
    <form className="space-y-4">
      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
        <div>
          <h3 className="text-lg font-medium text-gray-900">Promotional emails</h3>
          <p className="text-sm text-gray-500">Receive emails about new features and special offers</p>
        </div>
        <div className="flex items-center">
          <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600" />
        </div>
      </div>
      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
        <div>
          <h3 className="text-lg font-medium text-gray-900">Activity alerts</h3>
          <p className="text-sm text-gray-500">Get notified about important account activities</p>
        </div>
        <div className="flex items-center">
          <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600" />
        </div>
      </div>
      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
        <div>
          <h3 className="text-lg font-medium text-gray-900">Newsletter</h3>
          <p className="text-sm text-gray-500">Stay updated with our monthly newsletter</p>
        </div>
        <div className="flex items-center">
          <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600" />
        </div>
      </div>
      <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
        Save Preferences
      </button>
    </form>
  </div>
);

const ConnectedAccounts = () => (
  <div>
    <h2 className="text-2xl font-bold text-gray-900 mb-6">Connected Accounts</h2>
    <div className="space-y-4">
      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center">
          <img src="/google-icon.svg" alt="Google" className="w-8 h-8 mr-3" />
          <span className="text-lg font-medium text-gray-900">Google</span>
        </div>
        <button className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          Connect
        </button>
      </div>
      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center">
          <img src="/facebook-icon.svg" alt="Facebook" className="w-8 h-8 mr-3" />
          <span className="text-lg font-medium text-gray-900">Facebook</span>
        </div>
        <button className="px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
          Disconnect
        </button>
      </div>
      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center">
          <img src="/twitter-icon.svg" alt="Twitter" className="w-8 h-8 mr-3" />
          <span className="text-lg font-medium text-gray-900">Twitter</span>
        </div>
        <button className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          Connect
        </button>
      </div>
    </div>
  </div>
);

const LanguageAndRegion = () => (
  <div>
    <h2 className="text-2xl font-bold text-gray-900 mb-6">Language and Region</h2>
    <form className="space-y-6">
      <div>
        <label htmlFor="language" className="block text-sm font-medium text-gray-700">Preferred Language</label>
        <select id="language" className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
          <option>English</option>
          <option>Spanish</option>
          <option>French</option>
          <option>German</option>
        </select>
      </div>
      <div>
        <label htmlFor="timezone" className="block text-sm font-medium text-gray-700">Time Zone</label>
        <select id="timezone" className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
          <option>UTC-5 Eastern Time (US & Canada)</option>
          <option>UTC+0 London</option>
          <option>UTC+1 Central European Time</option>
          <option>UTC+8 Beijing, Perth, Singapore</option>
        </select>
      </div>
      <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
        Save Settings
      </button>
    </form>
  </div>
);

const AccountDeactivation = () => (
  <div>
    <h2 className="text-2xl font-bold text-gray-900 mb-6">Account Deactivation</h2>
    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
      <div className="flex">
        <div className="flex-shrink-0">
          <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="ml-3">
          <p className="text-sm text-yellow-700">
            Please be aware that account deactivation is irreversible. All your data will be permanently deleted.
          </p>
        </div>
      </div>
    </div>
    <div className="space-y-4">
      <button className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500">
        Temporarily Deactivate Account
      </button>
      <button className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
        Permanently Delete Account
      </button>
    </div>
  </div>
);

const PrivacySettings = () => (
  <div>
    <h2 className="text-2xl font-bold text-gray-900 mb-6">Privacy Settings</h2>
    <form className="space-y-4">
      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
        <div>
          <h3 className="text-lg font-medium text-gray-900">Profile Visibility</h3>
          <p className="text-sm text-gray-500">Make your profile visible to everyone</p>
        </div>
        <div className="flex items-center">
          <input type="checkbox " className="form-checkbox h-5 w-5 text-blue-600" />
        </div>
        </div>
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <h3 className="text-lg font-medium text-gray-900">Show Email</h3>
            <p className="text-sm text-gray-500">Display your email address on your profile</p>
          </div>
          <div className="flex items-center">
            <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600" />
          </div>    
        </div>
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <h3 className="text-lg font-medium text-gray-900">Show Phone Number</h3>
            <p className="text-sm text-gray-500">Display your phone number on your profile</p>
          </div>
          <div className="flex items-center">
            <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600" />
          </div>
        </div>
        <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          Save Settings
        </button>
        </form>
        </div>
        );

        export default AccountSettings;