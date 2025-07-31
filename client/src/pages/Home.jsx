import React, { useState, useEffect } from "react";
import { getDocs, collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase/config";

const Home = () => {
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false); // Spinner state

  useEffect(() => {
    fetchPosts();
  }, []);

  // Fetch posts from Firestore
  const fetchPosts = async () => {
    try {
      const postsCollection = collection(db, "posts");
      const postsSnapshot = await getDocs(postsCollection);
      const posts = postsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(posts);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  // Submit Post
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !message) return;

    setLoading(true); // Start spinner
    try {
      await addDoc(collection(db, "posts"), {
        username: username,
        message: message,
      });
      setMessage(""); // Clear input
      fetchPosts(); // Refresh posts
    } catch (error) {
      console.error("Error posting message:", error);
    } finally {
      setLoading(false); // Stop spinner
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="w-[100%] max-w-md bg-gray-900 px-6 h-[max-content] sticky top-0">
        <h1 className="text-3xl font-bold mb-4 text-center text-white">
          Anonymous Chat
        </h1>
        <form onSubmit={handleSubmit} className="mb-6 w-full max-w-md">
          <input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 mb-2 bg-gray-800 border border-gray-600 rounded text-white"
          />
          <textarea
            placeholder="Write your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full p-2 mb-2 bg-gray-800 border border-gray-600 rounded text-white"
          />
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded flex items-center justify-center ${
              loading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              "Post"
            )}
          </button>
        </form>
      </div>
      <div className="w-full bg-[#000080] p-2">
        {posts.length === 0 ? (
          <p className="text-gray-400">No posts yet.</p>
        ) : (
          posts.map((post) => (
            <div
              key={post.id}
              className="bg-gray-800 p-4 rounded mb-3 min-h-[60px] break-words"
            >
              <h3 className="font-bold text-blue-400">{post.username}</h3>
              <p className="text-gray-300 whitespace-pre-wrap mt-2">
                {post.message}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
