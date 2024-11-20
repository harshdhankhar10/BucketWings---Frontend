import React, { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { storage } from "../../../../Firebase/Firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { ImAttachment } from "react-icons/im";
import { useAuth } from "../../../../context/AuthContext";

const CreateSupportTicket = () => {
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState(null);
  const [auth] = useAuth();
  const user = auth.user;
  const [formData, setFormData] = useState({
    subject: "",
    message: "",
    priority: "Medium",
    attachment: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.subject) newErrors.subject = "Subject is required.";
    if (!formData.message) newErrors.message = "Message is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const uploadFile = async () => {
    if (!file) return null; // Optional attachment handling
    setUploading(true);

    const storageRef = ref(storage, `support_tickets/${Date.now()}_${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        null,
        (error) => {
          console.error("Upload failed:", error);
          Swal.fire({
            icon: "error",
            title: "File Upload Failed",
            text: "An error occurred during file upload.",
          });
          setUploading(false);
          reject(error);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          setUploading(false);
          resolve(downloadURL);
        }
      );
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const fileUrl = file ? await uploadFile() : null;

      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_API}/api/v1/support-tickets/create`,
        { ...formData, attachment: fileUrl || "" }
      );

      if (response.data.success) {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Your support ticket has been created successfully.",
        });

        setFormData({
          subject: "",
          message: "",
          priority: "Medium",
          attachment: "",
        });
        setFile(null);
        setErrors({});
        await axios.post(`${import.meta.env.VITE_REACT_APP_API}/api/v1/mail/newUserSupportTicket`, {
          email: user.email,
          username: user.username,
          subject: formData.subject,
          message: formData.message,
          priority: formData.priority,
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "An error occurred!",
        text: error.response?.data?.message || "Something went wrong.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 p-6">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
          <h2 className="text-2xl font-bold">Create Support Ticket</h2>
          <p className="mt-1 text-sm text-white text-opacity-90">
            Need help? Fill out the form below, and we’ll get back to you.
          </p>
        </div>

        <form className="p-6 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">Subject</label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className={`w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.subject ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-blue-400"
              }`}
              placeholder="Enter the subject"
            />
            {errors.subject && <p className="text-sm text-red-500 mt-1">{errors.subject}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              className={`w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.message ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-blue-400"
              }`}
              rows="4"
              placeholder="Describe your issue in detail"
            />
            {errors.message && <p className="text-sm text-red-500 mt-1">{errors.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Priority</label>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Attachment (Optional)</label>
            <div className="flex items-center space-x-4">
              <label className="cursor-pointer flex items-center gap-2 text-blue-500 hover:underline">
                <ImAttachment size={20} />
                <span>{file ? file.name : "Attach a file"}</span>
                <input
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
              {uploading && <p className="text-sm text-gray-500">Uploading...</p>}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg shadow-lg hover:opacity-90 transition"
            disabled={loading || uploading}
          >
            {loading ? "Submitting..." : "Submit Ticket"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateSupportTicket;
