/**
 * Utilitas untuk memproses Markdown menggunakan marked
 */

// Konfigurasi marked
const configureMarked = () => {
  if (window.marked) {
    // Konfigurasi opsi marked
    window.marked.setOptions({
      breaks: true, // Mengaktifkan line breaks
      gfm: true, // GitHub Flavored Markdown
      headerIds: true, // Menambahkan ID ke header
      mangle: false, // Tidak mengubah header ID
      sanitize: false, // Tidak melakukan sanitasi HTML (gunakan DOMPurify jika perlu)
      smartLists: true, // Menggunakan list yang lebih cerdas
      smartypants: true, // Menggunakan tanda baca yang lebih cerdas
      xhtml: false // Tidak menggunakan XHTML
    });
  }
};

// Fungsi untuk merender Markdown ke HTML
const renderMarkdown = (markdown) => {
  if (!window.marked || !markdown) {
    return '';
  }
  
  return window.marked.parse(markdown);
};

// Inisialisasi konfigurasi marked
const initializeMarked = () => {
  // Pastikan marked sudah dimuat
  if (typeof window !== 'undefined' && window.marked) {
    configureMarked();
  } else {
    console.warn('Marked library not found. Make sure it is loaded before using markdown utilities.');
  }
};

// Ekspor fungsi-fungsi utilitas
export { initializeMarked, renderMarkdown };