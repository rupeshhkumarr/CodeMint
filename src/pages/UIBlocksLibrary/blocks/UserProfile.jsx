// src/pages/UIBlocksLibrary/blocks/UserProfile.jsx
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

const UserProfile = ({ refreshCount = 0 }) => {
  const [user, setUser] = useState({});
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    
    const roles = [
      "Senior Designer",
      "Product Manager",
      "Full Stack Developer",
      "UX Researcher",
      "Frontend Engineer",
    ];
    const skillsPool = [
      "UI/UX Design",
      "Figma",
      "Prototyping",
      "User Research",
      "Design Systems",
      "React",
      "TypeScript",
      "Node.js",
      "Python",
      "AWS",
      "GraphQL",
      "Tailwind CSS",
    ];

    const randomRole = roles[Math.floor(Math.random() * roles.length)];

    // Generate random skills (3-6 skills)
    const randomSkills = [];
    const numSkills = Math.floor(Math.random() * 4) + 3;
    const availableSkills = [...skillsPool];

    for (let i = 0; i < numSkills; i++) {
      const randomIndex = Math.floor(Math.random() * availableSkills.length);
      randomSkills.push(availableSkills.splice(randomIndex, 1)[0]);
    }

    const randomStats = [
      { label: "Projects", value: Math.floor(Math.random() * 50) + 10 },
      { label: "Following", value: Math.floor(Math.random() * 200) + 100 },
      { label: "Followers", value: Math.floor(Math.random() * 2000) + 500 },
    ];

    setUser({
      name: "Roshan Suthar",
      role: randomRole,
      avatar: "https://avatars.githubusercontent.com/u/117620582?v=4",
      stats: randomStats,
      skills: randomSkills,
      joinDate: `Joined ${Math.floor(Math.random() * 12) + 1} months ago`,
      availability:
        Math.random() > 0.5 ? "Available for work" : "Open to opportunities",
    });

    setIsFollowing(Math.random() > 0.5);
  }, [refreshCount]);

  const handleFollow = () => {
    const newFollowState = !isFollowing;
    setIsFollowing(newFollowState);

    if (newFollowState) {
      const messages = [
        `You're now following ${user.name}!`,
        `Great! You'll see ${user.name}'s updates in your feed.`,
        `Following ${user.name}. Check out their latest work!`,
      ];
      toast(messages[Math.floor(Math.random() * messages.length)]);
    } else {
      toast(`You've unfollowed ${user.name}.`);
    }
  };

  const handleMessage = () => {
    const responses = [
      "Message sent! They typically reply within a few hours.",
      "Your message is on its way!",
      "Message delivered. Good luck with your conversation!",
      "Message sent. They're usually pretty responsive!",
    ];
    toast(responses[Math.floor(Math.random() * responses.length)]);
  };

  const handleMore = () => {
    const options = [
      `View ${user.name}'s portfolio`,
      `See mutual connections`,
      `Check similar profiles`,
      `View collaboration history`,
    ];
    const randomOption = options[Math.floor(Math.random() * options.length)];
    toast(`Opening: ${randomOption}`);
  };

  if (!user.name) return <div>Loading...</div>;

  return (
    <div className="max-w-sm mx-auto bg-white dark:bg-slate-800 rounded-2xl shadow-lg overflow-hidden border border-gray-200 dark:border-slate-700">
      {/* Cover Image */}
      <div className="h-20 bg-gradient-to-r from-purple-500 to-pink-500 relative">
        <div className="absolute -bottom-8 left-6">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-16 h-16 rounded-2xl border-4 border-white dark:border-slate-800 shadow-lg"
          />
        </div>
      </div>

      {/* Profile Content */}
      <div className="pt-10 px-6 pb-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              {user.name}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              {user.role}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
              {user.joinDate}
            </p>
          </div>
          <button
            onClick={handleFollow}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 transform hover:scale-105 ${
              isFollowing
                ? "bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-600"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            {isFollowing ? "Following" : "Follow"}
          </button>
        </div>

        {/* Availability Badge */}
        <div className="mb-4">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
            {user.availability}
          </span>
        </div>

        {/* Stats */}
        <div className="flex justify-around py-4 border-y border-gray-200 dark:border-slate-700 mb-4">
          {user.stats.map((stat, index) => (
            <div key={index} className="text-center">
              <p className="text-lg font-bold text-gray-900 dark:text-white">
                {stat.value}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Skills */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
            Skills & Expertise
          </h3>
          <div className="flex flex-wrap gap-2">
            {user.skills.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 text-sm rounded-full border border-gray-200 dark:border-slate-600 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors duration-200"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <button
            onClick={handleMessage}
            className="flex-1 bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 text-gray-700 dark:text-gray-300 py-2.5 rounded-lg font-medium transition-colors duration-200 transform hover:scale-105 flex items-center justify-center"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            Message
          </button>
          <button
            onClick={handleMore}
            className="flex-1 bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 text-gray-700 dark:text-gray-300 py-2.5 rounded-lg font-medium transition-colors duration-200 transform hover:scale-105 flex items-center justify-center"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
              />
            </svg>
            More
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
