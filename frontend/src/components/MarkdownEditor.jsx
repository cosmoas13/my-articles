import { useState, useEffect, useCallback } from 'react';
import MDEditor from '@uiw/react-md-editor';

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
    <div className="markdown-editor-wrapper animate-fade-in" data-color-mode={darkMode ? 'dark' : 'light'}>
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
        commandsFilter={(cmd) => {
          // Menyesuaikan toolbar commands dengan menghapus beberapa yang tidak diperlukan
          const filteredCommands = ['title', 'bold', 'italic', 'quote', 'hr', 'ordered-list', 'unordered-list',
            'link', 'image', 'code', 'codeBlock', 'fullscreen'];
          return filteredCommands.includes(cmd.name) ? cmd : undefined;
        }}
        extraCommands={[
          {
            name: 'help',
            keyCommand: 'help',
            buttonProps: { 'aria-label': 'Bantuan Markdown' },
            icon: (
              <svg viewBox="0 0 16 16" width="12px" height="12px">
                <path fill="currentColor" d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm0 14c-3.3 0-6-2.7-6-6s2.7-6 6-6 6 2.7 6 6-2.7 6-6 6z" />
                <path fill="currentColor" d="M8 5c-.6 0-1 .4-1 1s.4 1 1 1 1-.4 1-1-.4-1-1-1zM8 9c-.6 0-1 .4-1 1v1c0 .6.4 1 1 1s1-.4 1-1v-1c0-.6-.4-1-1-1z" />
              </svg>
            ),
            execute: () => {
              window.open('https://www.markdownguide.org/cheat-sheet/', '_blank');
            },
          }
        ]}
      />
      <div className="flex justify-between items-center text-xs mt-3 mb-1">
        <button
          type="button"
          onClick={() => {
            const newValue = !showGuide;
            setShowGuide(newValue);
            if (typeof window !== 'undefined') {
              localStorage.setItem('markdown-guide-visible', JSON.stringify(newValue));
            }
          }}
          className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 flex items-center px-2 py-1 rounded-md bg-green-50 dark:bg-green-900/20 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-3 w-3 mr-1 transition-transform ${showGuide ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
          {showGuide ? 'Sembunyikan panduan' : 'Tampilkan panduan'}
        </button>
        <a
          href="https://www.markdownguide.org/cheat-sheet/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 px-2 py-1 rounded-md bg-green-50 dark:bg-green-900/20 transition-colors flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
          Panduan lengkap
        </a>
      </div>

      {showGuide && (
        <div className="text-xs p-3 bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-md mb-3 border-l-4 border-green-500 dark:border-green-600 shadow-sm animate-fade-in">
          <div className="font-medium text-green-800 dark:text-green-300 mb-2">Panduan Format Markdown</div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <div className="p-1.5 bg-white dark:bg-gray-800 rounded border border-green-200 dark:border-green-700 shadow-sm">
              <code className="text-gray-500 dark:text-gray-400"># Judul</code>
              <div className="mt-1 font-bold text-sm text-green-700 dark:text-green-400">Heading 1</div>
            </div>
            <div className="p-1.5 bg-white dark:bg-gray-800 rounded border border-green-200 dark:border-green-700 shadow-sm">
              <code className="text-gray-500 dark:text-gray-400">## Judul</code>
              <div className="mt-1 font-bold text-sm text-green-700 dark:text-green-400">Heading 2</div>
            </div>
            <div className="p-1.5 bg-white dark:bg-gray-800 rounded border border-green-200 dark:border-green-700 shadow-sm">
              <code className="text-gray-500 dark:text-gray-400">**teks**</code>
              <div className="mt-1 font-bold text-green-700 dark:text-green-400">Tebal</div>
            </div>
            <div className="p-1.5 bg-white dark:bg-gray-800 rounded border border-green-200 dark:border-green-700 shadow-sm">
              <code className="text-gray-500 dark:text-gray-400">*teks*</code>
              <div className="mt-1 italic text-green-700 dark:text-green-400">Miring</div>
            </div>
            <div className="p-1.5 bg-white dark:bg-gray-800 rounded border border-green-200 dark:border-green-700 shadow-sm">
              <code className="text-gray-500 dark:text-gray-400">[link](url)</code>
              <div className="mt-1"><a href="#" className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300">Link</a></div>
            </div>
            <div className="p-1.5 bg-white dark:bg-gray-800 rounded border border-green-200 dark:border-green-700 shadow-sm">
              <code className="text-gray-500 dark:text-gray-400">![alt](url)</code>
              <div className="mt-1 text-green-700 dark:text-green-400">Gambar</div>
            </div>
            <div className="p-1.5 bg-white dark:bg-gray-800 rounded border border-green-200 dark:border-green-700 shadow-sm">
              <code className="text-gray-500 dark:text-gray-400">- item</code>
              <div className="mt-1 text-green-700 dark:text-green-400">• Daftar</div>
            </div>
            <div className="p-1.5 bg-white dark:bg-gray-800 rounded border border-green-200 dark:border-green-700 shadow-sm">
              <code className="text-gray-500 dark:text-gray-400">1. item</code>
              <div className="mt-1 text-green-700 dark:text-green-400">1. Daftar bernomor</div>
            </div>
            <div className="p-1.5 bg-white dark:bg-gray-800 rounded border border-green-200 dark:border-green-700 shadow-sm">
              <code className="text-gray-500 dark:text-gray-400">```kode```</code>
              <div className="mt-1 font-mono text-xs text-green-700 dark:text-green-400">Blok kode</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MarkdownEditor;