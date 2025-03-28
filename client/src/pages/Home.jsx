import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "https://anonymous-chat-22p7.onrender.com"; // Flask Backend URL

const App = () => {
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  // Fetch posts from Flask API
  const fetchPosts = async () => {
    try {
      const res = await axios.get(`${API_URL}/posts`);
      setPosts(res.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  // Submit Post
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !message) return;

    try {
      await axios.post(`${API_URL}/post`, { username, message });
      setUsername("");
      setMessage("");
      fetchPosts();
    } catch (error) {
      console.error("Error posting message:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-4">
      <div className="w-[100%] max-w-md fixed bg-gray-900 px-6">
        <h1 className="text-3xl font-bold mb-4 text-center">Anonymous Chat</h1>
        <form onSubmit={handleSubmit} className="mb-6 w-full max-w-md">
          <input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 mb-2 bg-gray-800 border border-gray-600 rounded"
          />
          <textarea
            placeholder="Write your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full p-2 mb-2 bg-gray-800 border border-gray-600 rounded"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 py-2 rounded"
          >
            Post
          </button>
        </form>
      </div>

      <div className="w-full max-w-md mt-[250px]">
        {posts.length === 0 ? (
          <p className="text-gray-400">No posts yet.</p>
        ) : (
          posts.map((post) => (
            <div
              key={post.id}
              className="bg-gray-800 p-4 rounded mb-3 min-h-[60px] break-words"
            >
              <h3 className="font-bold text-blue-400">{post.username}</h3>
              <p className="text-gray-300 whitespace-pre-wrap">
                {post.message}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default App;
