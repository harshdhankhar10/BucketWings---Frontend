import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { set } from 'date-fns';

const CreateNote = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const [loading, setLoading] = useState(false);

  const addTag = () => {
    if (tagInput && !tags.includes(tagInput)) {
      setTags([...tags, tagInput]);
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    setLoading(true);
   try {
    const response = await axios.post(`${import.meta.env.VITE_REACT_APP_API}/api/v1/notes/create`,{
      title,
      content,
      tags
    })
    if(response.data.success){
      setLoading(false);
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: response.data.message,
      });
      setTitle('');
      setContent('');
      setTags([]);
      setTagInput('');
    }
    
   } catch (error) {
    console.log(error)
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: "Something went wrong!",
    });
   }
  };

  return (
    <div className=" min-h-screen py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold text-purple-700 mb-6">Create New Note</h1>
        <form onSubmit={handleSubmit}>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Title</label>
            <input
              type="text"
              value={title}
              required
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter note title"
            />
          </div>


          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Content</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              className="w-full h-32 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
              placeholder="Enter note content"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Tags<span className="text-sm text-gray-500">(Optional)</span></label>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Add a tag"
              />
              <button
                type="button"
                onClick={addTag}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                Add Tag
              </button>
            </div>
            {/* Tags Display */}
            <div className="flex flex-wrap mt-3 space-x-2">
              {tags.map((tag, index) => (
                <div
                  key={index}
                  className="flex items-center bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-semibold"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="ml-2 text-purple-500 hover:text-purple-700"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="w-full py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              {loading ? 'Creating...' : 'Create Note'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateNote;
