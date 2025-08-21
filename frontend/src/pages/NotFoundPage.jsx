import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <h1 className="text-6xl font-bold text-primary-600 mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-6">Halaman Tidak Ditemukan</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md">
        Maaf, halaman yang Anda cari tidak dapat ditemukan atau telah dipindahkan.
      </p>
      <Link 
        to="/" 
        className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
      >
        Kembali ke Beranda
      </Link>
    </div>
  );
}

export default NotFoundPage;