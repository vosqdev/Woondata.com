import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  // Load environment variables (including VITE_PUBLIC_SITE_MODE)
  const env = loadEnv(mode, process.cwd(), '');
  const siteMode = env.VITE_PUBLIC_SITE_MODE || process.env.VITE_PUBLIC_SITE_MODE || 'development';
  const isComingSoon = siteMode === 'coming_soon';

  return {
    plugins: [
      react(), 
      tailwindcss(),
      {
        name: 'site-mode-html-selector',
        enforce: 'pre',
        resolveId(id) {
          if (isComingSoon && (id.includes('main.tsx') || id === '/src/main.tsx' || id.endsWith('main.tsx'))) {
            return path.resolve(__dirname, 'src/main.coming-soon.tsx');
          }
          return null;
        },
        transformIndexHtml(html) {
          if (isComingSoon) {
            // When in 'coming_soon' mode: use the isolated entry point so NO internal
            // components, dashboards, mockData, or Firebase code are included in the bundle.
            let modified = html.replace('/src/main.tsx', '/src/main.coming-soon.tsx');
            modified = modified.replace(
              /<title>.*?<\/title>/i,
              '<title>Woondata | Binnenkort beschikbaar</title>'
            );
            modified = modified.replace(
              /<meta name="description" content=".*?"/i,
              '<meta name="description" content="Woondata ontwikkelt een innovatief dataplatform dat actuele woningmarktgegevens, woonwensen en gebiedsinzichten samenbrengt. Voor betere beslissingen over wonen, vastgoed en gebiedsontwikkeling."'
            );
            return modified;
          }
          return html;
        }
      }
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      chunkSizeWarningLimit: 800,
      rollupOptions: {
        output: isComingSoon
          ? {
              manualChunks: {
                'vendor-react': ['react', 'react-dom']
              }
            }
          : {
              manualChunks: {
                'vendor-react': ['react', 'react-dom'],
                'vendor-leaflet': ['leaflet', 'react-leaflet'],
                'vendor-charts': ['recharts'],
                'vendor-motion': ['motion'],
                'vendor-firebase': ['firebase/app', 'firebase/firestore', 'firebase/storage'],
                'vendor-icons': ['lucide-react']
              }
            }
      }
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
