// src/components/Footer.jsx
const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-lg">Made with ❤️ by the Community</p>
          </div>
          <div className="flex space-x-6">
            <a
              href="https://github.com/Roshansuthar1105/Frontend-Playground"
              className="hover:text-blue-400 transition-colors duration-200"
            >
              GitHub
            </a>
            <a
              href="https://twitter.com"
              className="hover:text-blue-400 transition-colors duration-200"
            >
              Twitter
            </a>
            <a
              href="https://discord.com"
              className="hover:text-blue-400 transition-colors duration-200"
            >
              Discord
            </a>
          </div>
        </div>
        <div className="mt-8 text-center text-gray-400">
          <p>
            Open source and contributor-friendly. Join us in building amazing
            frontend resources!
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
