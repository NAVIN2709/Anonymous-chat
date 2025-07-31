import React, { useState, useEffect } from "react";
import {
  getDocs,
  collection,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
} from "firebase/firestore";
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
      const postsQuery = query(postsCollection, orderBy("created_at", "desc"));
      const postsSnapshot = await getDocs(postsQuery);

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
    if (!username.trim() || !message.trim()) return;

    setLoading(true);
    try {
      await addDoc(collection(db, "posts"), {
        username: username.trim(),
        message: message.trim(),
        created_at: serverTimestamp(),
      });
      setMessage("");
      fetchPosts();
    } catch (error) {
      console.error("Error posting message:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white flex flex-col items-center">
      {/* Header */}
      <header className="w-full bg-[#1e293b] py-4 shadow-lg sticky top-0">
        <h1 className="text-3xl font-bold text-center text-white">AnonmyChat</h1>
        <p className="text-center text-gray-400 text-sm">
          Share thoughts, stay anonymous.
        </p>
      </header>

      {/* Post Box */}
      <div className="w-full max-w-2xl bg-[#1e293b] p-4 mt-6 rounded-lg shadow-lg sticky top-20">
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            placeholder="Enter a username..."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 rounded-md bg-[#0f172a] border border-gray-600 text-white focus:outline-none focus:border-blue-500"
          />
          <textarea
            placeholder="What's on your mind?"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full p-3 rounded-md bg-[#0f172a] border border-gray-600 text-white focus:outline-none focus:border-blue-500 resize-none"
            rows={4}
          />
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-md flex items-center justify-center font-medium transition ${
              loading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
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

      {/* Posts Feed */}
      <div className="w-full max-w-2xl mt-6 space-y-4">
        {posts.length === 0 ? (
          <p className="text-center text-gray-400">No posts yet.</p>
        ) : (
          posts.map((post) => (
            <div
              key={post.id}
              className="bg-[#1e293b] p-4 rounded-lg shadow-md hover:shadow-xl transition"
            >
              {/* Post Header */}
              <div className="flex items-center justify-between text-sm text-gray-400 mb-2">
                <span className="font-semibold text-blue-400">
                  {post.username}
                </span>
                <span>
                  {post.created_at?.toDate().toLocaleString()}
                </span>
              </div>

              {/* Post Content */}
              <p className="text-gray-200 whitespace-pre-wrap">
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
