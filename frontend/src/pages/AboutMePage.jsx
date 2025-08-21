import { useState } from 'react';
import { FileText } from '../components/icons';

function AboutMePage() {
  // State untuk menampilkan pesan saat tombol resume diklik
  const [showMessage, setShowMessage] = useState(false);

  // Fungsi untuk menangani klik tombol resume
  const handleResumeClick = () => {
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 3000); // Hilangkan pesan setelah 3 detik
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <div className="flex flex-col lg:flex-row gap-12 items-center">
        {/* Bagian Foto Profil */}
        <div className="w-full lg:w-1/3 flex justify-center">
          <div className="relative">
            <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-primary-400 dark:border-primary-600 shadow-xl">
              <img
                src="https://i.namu.wiki/i/yIgCkd37KFcRm0YFigjf10sciniP4xzl2kdhWWdZxKWyPIzLtq17l3ZN6xH2QVdEhSgzfw0tmX2N1Ffuoh80_g.webp"
                alt="Profile Photo"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-br from-primary-400 to-primary-600 dark:from-primary-500 dark:to-primary-700 rounded-full"></div>
            <div className="absolute -top-4 -left-4 w-16 h-16 bg-gradient-to-br from-primary-300 to-primary-500 dark:from-primary-400 dark:to-primary-600 rounded-full"></div>
          </div>
        </div>

        {/* Bagian Informasi */}
        <div className="w-full lg:w-2/3">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary-700 dark:text-primary-300">
            About Me
          </h1>

          <div className="bg-white dark:bg-dark-card rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800 dark:text-gray-100">
              Hello, Kevin Here
            </h2>

            <h2 className="text-xl md:text-lg font-bold mb-4 text-gray-800 dark:text-gray-100">
              - Crafting the web, one JavaScript line at a time
            </h2>

            <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
              My journey started with the basics of JavaScript, and over the years, I’ve honed my skills using powerful tools like React and Next.js.
            </p>

            <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
              Working with React has been a transformative experience—its component-based architecture allows me to build reusable and efficient UI components that make applications not just functional but also delightful to use. With Next.js, I’ve embraced the power of server-side rendering (SSR) and static site generation (SSG) to deliver lightning-fast, SEO-friendly websites that stand out.
            </p>

            <p className="text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
              From building interactive dashboards to designing seamless user experiences, I’ve tackled projects of varying complexities. I thrive on solving challenging problems, optimizing performance, and writing clean, maintainable code that scales as applications grow. JavaScript isn't just my profession—it's my craft and my passion."
            </p>

            <div className="flex justify-center">
              <button
                onClick={handleResumeClick}
                className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-8 rounded-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg inline-flex items-center justify-center"
              >
                <FileText size={18} className="mr-2" />
                My Resume
              </button>
            </div>

            {showMessage && (
              <div className="mt-4 p-3 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-lg text-center animate-fade-in">
                Resume akan segera tersedia untuk diunduh!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutMePage;