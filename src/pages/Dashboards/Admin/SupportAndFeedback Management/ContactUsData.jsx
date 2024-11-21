import React, { useState, useEffect } from "react";
import { app } from "../../../../Firebase/Firebase";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import {
  AlertCircle,
  FileText,
  ClipboardList,
  XCircle,
} from "lucide-react";

const ContactUsData = () => {
  const db = getFirestore(app);
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sortConfig, setSortConfig] = useState({
    key: "created_at",
    direction: "desc",
  });

  useEffect(() => {
    const getContacts = async () => {
      setLoading(true);
      try {
        const contactCol = collection(db, "contacts");
        const contactSnapshot = await getDocs(contactCol);
        const contactList = contactSnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setContacts(contactList);
      } catch (error) {
        console.error("Error fetching contacts:", error);
      } finally {
        setLoading(false);
      }
    };
    getContacts();
  }, []);

  const sortedContacts = [...contacts].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? 1 : -1;
    }
    return 0;
  });

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "desc" ? "asc" : "desc",
    }));
  };

  const formatDate = (date) => {
    const d = new Date(date);
    return d.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 p-4 sm:p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 flex items-center">
          <ClipboardList className="text-white w-10 h-10 mr-4" />
          <div>
            <h2 className="text-3xl font-bold text-white">Contact Submissions</h2>
            <p className="text-white text-opacity-80 mt-1">
              Below are the contact submissions from users
            </p>
          </div>
        </div>

        {loading && (
          <div className="flex justify-center items-center py-16">
            <AlertCircle className="animate-pulse text-blue-500 w-12 h-12 mr-4" />
            <span className="text-xl text-gray-600">Loading contacts...</span>
          </div>
        )}

        {!loading && contacts.length > 0 && (
          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-100 text-gray-600">
                  
                    <th className="p-3 text-left">Name</th>
                    <th className="p-3 text-left">Email</th>
                    <th className="p-3 text-left">Message</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedContacts.map((contact) => (
                    <tr
                      key={contact.id}
                      onClick={() => setSelectedContact(contact)}
                      className="hover:bg-blue-50 cursor-pointer border-b"
                    >
                      <td className="p-3 font-medium">{contact.name}</td>
                      <td className="p-3">{contact.email}</td>
                      <td className="p-3">{contact.message.substring(0, 50)}{contact.message.length > 50 && '...'}</td>                     </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {!loading && contacts.length === 0 && (
          <div className="text-center py-16">
            <FileText className="mx-auto w-16 h-16 text-gray-400 mb-4" />
            <p className="text-xl text-gray-500">No contacts found</p>
          </div>
        )}
      </div>

      {selectedContact && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl relative">
            <button
              onClick={() => setSelectedContact(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-red-600"
            >
              <XCircle className="w-8 h-8" />
            </button>
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {selectedContact.name}
              </h2>
              <p className="text-sm text-gray-500 mb-4">
                Email: {selectedContact.email}
              </p>
              <p className="text-gray-700 mb-4">{selectedContact.message}</p>
             
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactUsData;
