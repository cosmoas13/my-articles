import { useState, useEffect } from 'react';
import MDEditor from '@uiw/react-md-editor';
import { useCallback } from 'react';

/**
 * Komponen editor Markdown menggunakan @uiw/react-md-editor
 * 
 * @param {Object} props - Props komponen
 * @param {string} props.value - Nilai Markdown saat ini
 * @param {Function} props.onChange - Fungsi yang dipanggil saat nilai berubah
 * @param {boolean} props.disabled - Status disabled editor
 * @param {number} props.height - Tinggi editor dalam piksel
 * @param {string} props.mode - Mode tampilan editor: 'edit', 'preview', atau 'edit-preview'
 * @param {boolean} props.hideToolbar - Sembunyikan toolbar editor
 */
const MarkdownEditor = ({
  value,
  onChange,
  disabled = false,
  height = 400,
  mode = 'edit-preview',
  hideToolbar = false
}) => {
  const [markdown, setMarkdown] = useState(value || '');
  // Menyimpan preferensi tampilan panduan di localStorage
  const [showGuide, setShowGuide] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('markdown-guide-visible');
      return saved !== null ? JSON.parse(saved) : true;
    }
    return true;
  });

  // State untuk tema gelap
  const [darkMode, setDarkMode] = useState(false);

  // Deteksi tema gelap
  const checkDarkMode = useCallback(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('dark') ||
        window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  }, []);

  // Memperbarui tema saat komponen dimuat dan saat ada perubahan tema
  useEffect(() => {
    setDarkMode(checkDarkMode());

    // Mendeteksi perubahan tema dari preferensi sistem
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => setDarkMode(checkDarkMode());

    mediaQuery.addEventListener('change', handleChange);

    // Mendeteksi perubahan tema dari class HTML
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          setDarkMode(checkDarkMode());
        }
      });
    });

    observer.observe(document.documentElement, { attributes: true });

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
      observer.disconnect();
    };
  }, [checkDarkMode]);

  // Memperbarui nilai lokal saat prop value berubah
  useEffect(() => {
    setMarkdown(value || '');
  }, [value]);

  // Handler untuk perubahan nilai
  const handleChange = (newValue) => {
    setMarkdown(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <div className="markdown-editor-wrapper" data-color-mode={darkMode ? 'dark' : 'light'}>
      <MDEditor
        value={markdown}
        onChange={handleChange}
        preview={mode}
        height={height}
        visibleDragbar={true}
        textareaProps={{
          placeholder: "Tulis konten artikel dalam format Markdown di sini...",
          disabled: disabled
        }}
        className="w-full rounded-md overflow-hidden"
        hideToolbar={hideToolbar}
        previewOptions={{
          rehypePlugins: [],
          remarkPlugins: [],
          components: {
            // Kustomisasi komponen jika diperlukan
          },
        }}
      />
      <div className="flex justify-between items-center text-xs text-gray-500 mt-2 mb-1">
        <button
          type="button"
          onClick={() => {
            const newValue = !showGuide;
            setShowGuide(newValue);
            if (typeof window !== 'undefined') {
              localStorage.setItem('markdown-guide-visible', JSON.stringify(newValue));
            }
          }}
          className="text-blue-500 hover:underline flex items-center"
        >
          {showGuide ? 'Sembunyikan panduan' : 'Tampilkan panduan'}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-3 w-3 ml-1 transition-transform ${showGuide ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        <a href="https://www.markdownguide.org/cheat-sheet/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Panduan lengkap</a>
      </div>

      {showGuide && (
        <div className="text-xs text-gray-500 p-2 bg-gray-50 dark:bg-gray-800 rounded-md mb-2">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            <div># Judul = <strong>Heading 1</strong></div>
            <div>## Judul = <strong>Heading 2</strong></div>
            <div>**teks** = <strong>tebal</strong></div>
            <div>*teks* = <em>miring</em></div>
            <div>[link](url) = <a href="#" className="text-blue-500">link</a></div>
            <div>![alt](url) = gambar</div>
            <div>- item = daftar</div>
            <div>1. item = daftar bernomor</div>
            <div>```kode``` = blok kode</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MarkdownEditor;