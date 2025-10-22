// src/components/Footer.jsx
const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white py-12 mt-20 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <p className="text-xl font-semibold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Made with ❤️ by the Community
            </p>
          </div>
          <div className="flex space-x-8">
            <a
              href="https://github.com/Roshansuthar1105/Frontend-Playground"
              className="hover:text-purple-400 transition-all duration-200 hover:scale-110 flex items-center gap-2"
            >
              <span>GitHub</span>
            </a>
            <a
              href="https://twitter.com"
              className="hover:text-purple-400 transition-all duration-200 hover:scale-110 flex items-center gap-2"
            >
              <span>Twitter</span>
            </a>
            <a
              href="https://discord.com"
              className="hover:text-purple-400 transition-all duration-200 hover:scale-110 flex items-center gap-2"
            >
              <span>Discord</span>
            </a>
          </div>
        </div>
        <div className="mt-8 text-center text-gray-400">
          <p className="text-base">
            Open source and contributor-friendly. Join us in building amazing
            frontend resources!
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
