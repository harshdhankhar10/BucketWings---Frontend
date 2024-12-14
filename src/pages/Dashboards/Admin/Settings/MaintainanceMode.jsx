import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { motion } from "framer-motion";
import axios from "axios";
import Swal from "sweetalert2";

Modal.setAppElement("#root");

const MaintenanceMode = () => {
  const [isMaintenanceMode, setIsMaintenanceMode] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMaintenanceMode = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_REACT_APP_API}/api/v1/maintenance/check`
        );
        if (response.data.success) {
          setIsMaintenanceMode(response.data.maintenanceMode.isMaintenanceMode);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching maintenance status:", error);
        setLoading(false);
      }
    };

    fetchMaintenanceMode();
  }, []);

  const toggleMaintenanceMode = async () => {
    try {
      setLoading(true);
      const response = await axios.put(
        `${import.meta.env.VITE_REACT_APP_API}/api/v1/maintenance/update`,
        {
          isMaintenanceMode: !isMaintenanceMode,
          message,
        }
      );

      if (response.data.success) {
        setIsMaintenanceMode(!isMaintenanceMode);
        setShowPopup(false);
        Swal.fire({
          icon: "success",
          title: "Success",
          text: `Maintenance Mode ${!isMaintenanceMode ? "Enabled" : "Disabled"} Successfully`,
          customClass: {
            popup: "rounded-xl",
            confirmButton: "bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg"
          }
        });
        setLoading(false);
      }
    } catch (error) {
      console.error("Error updating maintenance status:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || "Something went wrong",
        customClass: {
          popup: "rounded-xl",
          confirmButton: "bg-red-600 hover:bg-red-700 px-6 py-2 rounded-lg"
        }
      });
      setLoading(false);
    }
  };

  const Loader = () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-t-4 border-blue-500 rounded-full animate-spin"></div>
    </div>
  );

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6">
          <h1 className="text-3xl font-bold text-white text-center">
            Maintenance Control
          </h1>
        </div>
        
        <div className="p-8 space-y-6">
          <div className="flex justify-between items-center">
            <span className="text-lg font-medium text-gray-700">
              Current Status
            </span>
            <div 
              className={`px-4 py-2 rounded-full text-sm font-semibold shadow-md transition-all duration-300 ${
                isMaintenanceMode 
                  ? "bg-red-500 text-white" 
                  : "bg-green-500 text-white"
              }`}
            >
              {isMaintenanceMode ? "Maintenance ON" : "Maintenance OFF"}
            </div>
          </div>

          <button 
            onClick={() => setShowPopup(true)}
            className={`w-full py-3 rounded-lg text-white font-semibold text-lg shadow-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 ${
              isMaintenanceMode 
                ? "bg-red-600 hover:bg-red-700 focus:ring-red-300" 
                : "bg-blue-600 hover:bg-blue-700 focus:ring-blue-300"
            }`}
          >
            {isMaintenanceMode ? "Disable Maintenance" : "Enable Maintenance"}
          </button>
        </div>
      </div>

      <Modal
        isOpen={showPopup}
        onRequestClose={() => setShowPopup(false)}
        className="fixed inset-0 flex items-center justify-center p-4"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 relative"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Configure Maintenance Mode
          </h2>

          <div className="space-y-4">

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Custom Message
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows="3"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter maintenance message..."
              ></textarea>
            </div>
          </div>

          <div className="mt-6 flex justify-between items-center">
            <button
              onClick={() => setShowPopup(false)}
              className="px-5 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={toggleMaintenanceMode}
              disabled={loading}
              className={`px-6 py-2 rounded-lg text-white font-semibold transition-all duration-300 ${
                isMaintenanceMode 
                  ? "bg-red-600 hover:bg-red-700" 
                  : "bg-blue-600 hover:bg-blue-700"
              } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {loading 
                ? (isMaintenanceMode ? "Disabling..." : "Enabling...") 
                : (isMaintenanceMode ? "Disable" : "Enable")}
            </button>
          </div>
        </motion.div>
      </Modal>
    </div>
  );
};

export default MaintenanceMode;