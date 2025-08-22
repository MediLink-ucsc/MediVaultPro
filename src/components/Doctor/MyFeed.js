import React, { useState } from 'react';
import { Plus, Heart, MessageCircle, ChevronDown, ChevronUp } from 'lucide-react';
import Modal from '../Common/Modal';
import Button from '../Common/Button';

const DoctorNewsFeed = () => {
  const [activeModal, setActiveModal] = useState(false);
  const [expandedPost, setExpandedPost] = useState(null);
  const [posts, setPosts] = useState([
    {
      id: 1,
      doctorName: 'Dr. Sarah Fernando',
      hospital: 'Colombo General Hospital',
      description: 'Discussing new advancements in cardiology treatment this week.',
      photo: 'https://investin.org/cdn/shop/articles/jafar-ahmed-E285pJbC4uE-unsplash.jpg?v=1634293259',
      likes: 32,
      comments: [
        { id: 1, name: 'Dr. Amal Silva', text: 'Great insights, Sarah!' },
        { id: 2, name: 'Dr. Nadeesha Perera', text: 'Looking forward to more updates.' }
      ]
    },
    {
      id: 2,
      doctorName: 'Dr. Nimal Perera',
      hospital: 'Kandy Teaching Hospital',
      description: 'Successful knee replacement surgery using minimally invasive methods.',
      photo: 'https://images.unsplash.com/photo-1580281657423-1f8d8e53d6e8?crop=entropy&cs=tinysrgb&fit=max&h=400&w=800',
      likes: 45,
      comments: [
        { id: 1, name: 'Dr. Priyantha Jayasuriya', text: 'Amazing work, Nimal!' },
        { id: 2, name: 'Dr. Chamari Fernando', text: 'Congratulations to the team!' }
      ]
    },
    {
      id: 3,
      doctorName: 'Dr. Anoja Wijesinghe',
      hospital: 'National Hospital Colombo',
      description: 'Sharing insights on modern pediatric care techniques.',
      photo: 'https://images.unsplash.com/photo-1580281657515-6f3c5f0f8e3e?crop=entropy&cs=tinysrgb&fit=max&h=400&w=800',
      likes: 28,
      comments: [
        { id: 1, name: 'Dr. Samanthi Perera', text: 'Very useful, thanks!' }
      ]
    }
  ]);

  const [newPost, setNewPost] = useState({
    doctorName: '',
    hospital: '',
    description: '',
    photo: ''
  });

  // Handle file upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewPost({ ...newPost, photo: URL.createObjectURL(file) });
    }
  };

  const handleAddPost = (e) => {
    e.preventDefault();
    const postToAdd = {
      ...newPost,
      id: posts.length + 1,
      likes: 0,
      comments: []
    };
    setPosts([postToAdd, ...posts]);
    setNewPost({ doctorName: '', hospital: '', description: '', photo: '' });
    setActiveModal(false);
  };

  const toggleComments = (id) => {
    setExpandedPost(expandedPost === id ? null : id);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Doctor's News Feed</h2>

      {/* Posts */}
      <div className="space-y-6">
        {posts.map((post) => (
          <div key={post.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold text-gray-800">{post.doctorName}</div>
                <div className="text-sm text-gray-500">{post.hospital}</div>
              </div>
            </div>

            <p className="mt-4 text-gray-700">{post.description}</p>

            {post.photo && (
              <img 
                src={post.photo} 
                alt="Post" 
                className="w-full max-h-80 object-cover rounded-lg mt-4"
              />
            )}

            <div className="flex items-center justify-between mt-4 text-gray-600 text-sm">
              <div className="flex items-center space-x-4">
                <span className="flex items-center space-x-1">
                  <Heart className="w-4 h-4 text-red-500" />
                  <span>{post.likes}</span>
                </span>
                <span
                  className="flex items-center space-x-1 cursor-pointer hover:text-teal-700"
                  onClick={() => toggleComments(post.id)}
                >
                  <MessageCircle className="w-4 h-4 text-teal-600" />
                  <span>{post.comments.length}</span>
                  {expandedPost === post.id ? (
                    <ChevronUp className="w-4 h-4 ml-1" />
                  ) : (
                    <ChevronDown className="w-4 h-4 ml-1" />
                  )}
                </span>
              </div>
            </div>

            {/* Comments Section */}
            {expandedPost === post.id && (
              <div className="mt-4 border-t border-gray-200 pt-4 space-y-3">
                {post.comments.map((comment) => (
                  <div
                    key={comment.id}
                    className="flex items-start space-x-3 bg-gray-50 p-3 rounded-lg"
                  >
                    <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center font-bold text-teal-600">
                      {comment.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-medium text-gray-700">{comment.name}</div>
                      <div className="text-gray-600 text-sm">{comment.text}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Floating Add Button */}
      <button
        onClick={() => setActiveModal(true)}
        className="fixed bottom-6 right-6 bg-teal-600 text-white p-4 rounded-full shadow-lg hover:bg-teal-700 focus:outline-none"
      >
        <Plus className="w-6 h-6" />
      </button>

      {/* Modal to Add Post */}
      <Modal
        isOpen={activeModal}
        onClose={() => setActiveModal(false)}
        title="Add New Post"
      >
        <form onSubmit={handleAddPost} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1">Doctor Name</label>
            <input
              type="text"
              value={newPost.doctorName}
              onChange={(e) => setNewPost({ ...newPost, doctorName: e.target.value })}
              className="w-full border border-gray-300 rounded-lg p-2"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Hospital</label>
            <input
              type="text"
              value={newPost.hospital}
              onChange={(e) => setNewPost({ ...newPost, hospital: e.target.value })}
              className="w-full border border-gray-300 rounded-lg p-2"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Description</label>
            <textarea
              value={newPost.description}
              onChange={(e) => setNewPost({ ...newPost, description: e.target.value })}
              className="w-full border border-gray-300 rounded-lg p-2"
              rows="3"
              required
            ></textarea>
          </div>

          {/* Styled File Upload */}
          <div>
            <label className="block text-gray-700 mb-1">Upload Photo</label>
            <input
              type="file"
              accept="image/*"
              id="file-upload"
              onChange={handleFileChange}
              className="hidden"
            />
            <label
              htmlFor="file-upload"
              className="inline-flex items-center px-4 py-2 bg-teal-600 text-white rounded-lg shadow cursor-pointer hover:bg-teal-700"
            >
              Choose File
            </label>
            {newPost.photo && (
              <img
                src={newPost.photo}
                alt="Preview"
                className="mt-2 w-full max-h-60 object-cover rounded-lg"
              />
            )}
          </div>

          <Button type="submit" variant="primary" fullWidth>
            Post
          </Button>
        </form>
      </Modal>
    </div>
  );
};

export default DoctorNewsFeed;


