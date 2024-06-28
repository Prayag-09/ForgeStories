import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="bg-white min-h-screen flex flex-col justify-center items-center text-black">
      <h1 className="text-4xl font-bold mb-4 text-center">Welcome to ForgeStory</h1>
      <h3 className="text-xl mb-8 text-center">Blogging platform for techies</h3>
      <div className="flex flex-col lg:flex-row items-center justify-between w-full max-w-screen-md">
        <Link to="/signup" className="w-full lg:w-1/2 mb-4 lg:mb-0 px-4">
          <button 
            type="button" 
            className="w-full bg-black text-white text-lg p-4 rounded-lg shadow-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 transition-transform transform hover:scale-105">
            Sign Up
          </button>
        </Link>
        <Link to="/signin" className="w-full lg:w-1/2 mt-4 lg:mt-0 lg:ml-4 px-4">
          <button 
            type="button" 
            className="w-full bg-black text-white text-lg p-4 rounded-lg shadow-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 transition-transform transform hover:scale-105">
            Sign In
          </button>
        </Link>
      </div>
      <p className="mt-8 text-lg text-center">Please sign up to access our blogs.</p>
      <Link to="/blogs" className="mt-6">
        <button 
          type="button" 
          className="bg-black text-white text-lg px-6 py-3 rounded-lg shadow-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 transition-transform transform hover:scale-105">
          View Blogs
        </button>
      </Link>
    </div>
  );
};

export default Home;
