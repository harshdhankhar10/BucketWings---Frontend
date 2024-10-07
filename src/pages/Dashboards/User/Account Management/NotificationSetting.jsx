import React, { useState } from 'react';
import { Bell, Mail, MessageSquare, AlertTriangle, Radio, Smartphone, Laptop } from 'lucide-react';

const NotificationSettings = () => {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);

  const notificationTypes = [
    { id: 'messages', name: 'Messages', icon: MessageSquare, description: 'Get notified when you receive a new message' },
    { id: 'mentions', name: 'Mentions', icon: Bell, description: 'Receive alerts when someone mentions you' },
    { id: 'updates', name: 'App Updates', icon: Smartphone, description: 'Be informed about new features and updates' },
    { id: 'news', name: 'News & Announcements', icon: Radio, description: 'Stay updated with the latest news and announcements' },
    { id: 'security', name: 'Security Alerts', icon: AlertTriangle, description: 'Get important security notifications' },
  ];

  const [notificationPreferences, setNotificationPreferences] = useState(
    notificationTypes.reduce((acc, type) => ({ ...acc, [type.id]: { email: true, push: true, sms: false } }), {})
  );

  const handleNotificationChange = (typeId, channel) => {
    setNotificationPreferences(prev => ({
      ...prev,
      [typeId]: { ...prev[typeId], [channel]: !prev[typeId][channel] }
    }));
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">Notification Settings</h1>
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="p-6 sm:p-8">
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Notification Channels</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <Mail className="w-6 h-6 text-gray-500 mr-3" />
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">Email Notifications</h3>
                      <p className="text-sm text-gray-500">Receive notifications via email</p>
                    </div>
                  </div>
                  <label className="flex items-center cursor-pointer">
                    <div className="relative">
                      <input type="checkbox" className="sr-only" checked={emailNotifications} onChange={() => setEmailNotifications(!emailNotifications)} />
                      <div className={`block w-14 h-8 rounded-full ${emailNotifications ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
                      <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition ${emailNotifications ? 'transform translate-x-6' : ''}`}></div>
                    </div>
                  </label>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <Smartphone className="w-6 h-6 text-gray-500 mr-3" />
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">Push Notifications</h3>
                      <p className="text-sm text-gray-500">Get push notifications on your devices</p>
                    </div>
                  </div>
                  <label className="flex items-center cursor-pointer">
                    <div className="relative">
                      <input type="checkbox" className="sr-only" checked={pushNotifications} onChange={() => setPushNotifications(!pushNotifications)} />
                      <div className={`block w-14 h-8 rounded-full ${pushNotifications ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
                      <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition ${pushNotifications ? 'transform translate-x-6' : ''}`}></div>
                    </div>
                  </label>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <Laptop className="w-6 h-6 text-gray-500 mr-3" />
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">SMS Notifications</h3>
                      <p className="text-sm text-gray-500">Receive notifications via SMS</p>
                    </div>
                  </div>
                  <label className="flex items-center cursor-pointer">
                    <div className="relative">
                      <input type="checkbox" className="sr-only" checked={smsNotifications} onChange={() => setSmsNotifications(!smsNotifications)} />
                      <div className={`block w-14 h-8 rounded-full ${smsNotifications ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
                      <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition ${smsNotifications ? 'transform translate-x-6' : ''}`}></div>
                    </div>
                  </label>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Notification Types</h2>
              <div className="space-y-6">
                {notificationTypes.map((type) => (
                  <div key={type.id} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center mb-3">
                      <type.icon className="w-6 h-6 text-gray-500 mr-3" />
                      <h3 className="text-lg font-medium text-gray-900">{type.name}</h3>
                    </div>
                    <p className="text-sm text-gray-500 mb-4">{type.description}</p>
                    <div className="flex space-x-4">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          className="form-checkbox h-5 w-5 text-blue-600"
                          checked={notificationPreferences[type.id].email}
                          onChange={() => handleNotificationChange(type.id, 'email')}
                          disabled={!emailNotifications}
                        />
                        <span className="ml-2 text-sm text-gray-700">Email</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          className="form-checkbox h-5 w-5 text-blue-600"
                          checked={notificationPreferences[type.id].push}
                          onChange={() => handleNotificationChange(type.id, 'push')}
                          disabled={!pushNotifications}
                        />
                        <span className="ml-2 text-sm text-gray-700">Push</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          className="form-checkbox h-5 w-5 text-blue-600"
                          checked={notificationPreferences[type.id].sms}
                          onChange={() => handleNotificationChange(type.id, 'sms')}
                          disabled={!smsNotifications}
                        />
                        <span className="ml-2 text-sm text-gray-700">SMS</span>
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <div className="mt-8">
              <button
                type="button"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Save Notification Settings
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationSettings;