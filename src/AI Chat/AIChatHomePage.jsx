import React, {useState, useEffect} from 'react';
import { Helmet } from 'react-helmet';
import AIChatSidebar from './AIChatSidebar';
import Swal from 'sweetalert2';
import { ChatData } from '../context/AIChatContext';
import AIChatMessaging from './AiChatMessaging';

const AIChatHomePage = () => {
    const [auth, setAuth] = useState(JSON.parse(localStorage.getItem("auth")));
    const {chats} = ChatData();
    
    useEffect(() => {
    if (!auth) {
      Swal.fire({
        title: 'Access Denied',
        text: 'You need to login first',
        icon: 'warning',
        confirmButtonText: 'Login'
      }).then(() => {
        window.location.href = "/login";
        })}}
    , [auth])

  return (
    <>
      <Helmet>
        <title>BucketWings - AI Chat</title>
      </Helmet>
      {auth && (
        <div className="flex h-screen overflow-hidden ">
        {/* Sidebar Section  */}
        <aside className="w-full md:w-1/5 shadow-lg">
          <AIChatSidebar />
        </aside>

        {/* Messaging Section */}
        <main className="hidden md:flex flex-1 flex-col bg-gray-100">
           {chats.length > 0 ? (
            <AIChatMessaging />
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-500">No chats available</p>
            </div>
          )}
        </main>
      </div>
      )}
    </>
  );
};

export default AIChatHomePage;
