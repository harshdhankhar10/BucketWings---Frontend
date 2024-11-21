import React, { useState, useEffect } from "react";
import { app } from "../../../../Firebase/Firebase";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { 
  AlertCircle, 
  FileText, 
  ClipboardList, 
  XCircle, 
  ArrowUpCircle, 
  ArrowDownCircle 
} from "lucide-react";




const ReportedIssues = () => {
  const db = getFirestore(app);
  const [issues, setIssues] = useState([]);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sortConfig, setSortConfig] = useState({ 
    key: 'created_at', 
    direction: 'desc' 
  });

  useEffect(() => {
    const getIssues = async () => {
      setLoading(true);
      try {
        const issuesCol = collection(db, "Reported_Issues");
        const issuesSnapshot = await getDocs(issuesCol);
        const issuesList = issuesSnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id
        }));
        setIssues(issuesList);
      } catch (error) {
        console.error("Error fetching issues:", error);
      } finally {
        setLoading(false);
      }
    };
    getIssues();
  }, []);

  const sortedIssues = [...issues].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'desc' ? 'asc' : 'desc'
    }));
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'High': return 'text-red-600 bg-red-50';
      case 'Medium': return 'text-yellow-600 bg-yellow-50';
      case 'Low': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const formatDate = (date) => {
    const d = new Date(date);
    return d.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 p-4 sm:p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 flex items-center">
          <ClipboardList className="text-white w-10 h-10 mr-4" />
          <div>
            <h2 className="text-3xl font-bold text-white">Reported Issues</h2>
            <p className="text-white text-opacity-80 mt-1">
              Below are the issues reported by users
            </p>
          </div>
        </div>

        {loading && (
          <div className="flex justify-center items-center py-16">
            <AlertCircle className="animate-pulse text-blue-500 w-12 h-12 mr-4" />
            <span className="text-xl text-gray-600">Loading issues...</span>
          </div>
        )}

        {!loading && issues.length > 0 && (
          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-100 text-gray-600">
                    <th 
                      onClick={() => handleSort('created_at')} 
                      className="p-3 text-left cursor-pointer hover:bg-gray-200 flex items-center"
                    >
                      Date 
                      {sortConfig.key === 'created_at' && (
                        sortConfig.direction === 'asc' 
                          ? <ArrowUpCircle className="ml-2 w-4 h-4" /> 
                          : <ArrowDownCircle className="ml-2 w-4 h-4" />
                      )}
                    </th>
                    <th className="p-3 text-left">Issue</th>
                    <th className="p-3 text-left">Reported By</th>
                    <th 
                      onClick={() => handleSort('priority')} 
                      className="p-3 text-left cursor-pointer hover:bg-gray-200 flex items-center"
                    >
                      Priority
                      {sortConfig.key === 'priority' && (
                        sortConfig.direction === 'asc' 
                          ? <ArrowUpCircle className="ml-2 w-4 h-4" /> 
                          : <ArrowDownCircle className="ml-2 w-4 h-4" />
                      )}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sortedIssues.map((issue, index) => (
                    <tr 
                      key={issue.id} 
                      onClick={() => setSelectedIssue(issue)}
                      className="hover:bg-blue-50 cursor-pointer border-b"
                    >
                      <td className="p-3">{formatDate(issue.created_at)}</td>
                      <td className="p-3 font-medium">{issue.title}</td>
                      <td className="p-3">{issue.username}</td>
                      <td className="p-3">
                        <span className={`px-2 py-1 rounded-full text-xs ${getPriorityColor(issue.priority)}`}>
                          {issue.priority}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {!loading && issues.length === 0 && (
          <div className="text-center py-16">
            <FileText className="mx-auto w-16 h-16 text-gray-400 mb-4" />
            <p className="text-xl text-gray-500">No reported issues found</p>
          </div>
        )}
      </div>

      {/* Issue Details Modal */}
      {selectedIssue && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl relative">
            <button 
              onClick={() => setSelectedIssue(null)} 
              className="absolute top-4 right-4 text-gray-500 hover:text-red-600"
            >
              <XCircle className="w-8 h-8" />
            </button>
            
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">{selectedIssue.title}</h2>
              <div className="text-sm text-gray-500 mb-4">
                Reported by {selectedIssue.username} on {formatDate(selectedIssue.created_at)}
              </div>
              
              <p className="text-gray-700 mb-4">{selectedIssue.description}</p>
              
              {selectedIssue.attachment && (
                <a 
                  href={selectedIssue.attachment} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-blue-600 hover:underline mb-4"
                >
                  <FileText className="mr-2 w-5 h-5" />
                  View Attachment
                </a>
              )}
              
              <div className="mt-4">
                <span className="font-semibold">Priority: </span>
                <span className={`px-2 py-1 rounded-full text-xs ${getPriorityColor(selectedIssue.priority)}`}>
                  {selectedIssue.priority}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportedIssues;