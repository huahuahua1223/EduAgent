const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:items-center md:justify-between">
          <div className="text-center md:text-left">
            <p className="text-sm">
              &copy; {new Date().getFullYear()} EduAgent. 保留所有权利。
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <div className="flex justify-center md:justify-end space-x-6">
              <a
                href="#"
                className="text-gray-400 hover:text-white"
                aria-label="关于我们"
              >
                关于我们
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white"
                aria-label="联系我们"
              >
                联系我们
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white"
                aria-label="隐私政策"
              >
                隐私政策
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 