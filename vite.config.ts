import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import {defineConfig, Plugin} from 'vite';

function menuPdfPlugin(): Plugin {
  return {
    name: 'menu-pdf-handler',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const rawUrl = req.url || '';
        const url = new URL(rawUrl, 'http://localhost');

        if (url.pathname === '/api/upload-menu-pdf' && req.method === 'POST') {
          const filename = url.searchParams.get('filename') || 'menu.pdf';
          const safeName = path.basename(filename);
          const targetDir = path.resolve(process.cwd(), 'public', 'assets', 'menus');
          if (!fs.existsSync(targetDir)) {
            fs.mkdirSync(targetDir, { recursive: true });
          }
          const targetPath = path.join(targetDir, safeName);
          const chunks: Buffer[] = [];
          req.on('data', (chunk: Buffer) => chunks.push(chunk));
          req.on('end', () => {
            const buf = Buffer.concat(chunks);
            fs.writeFileSync(targetPath, buf);
            const distDir = path.resolve(process.cwd(), 'dist', 'assets', 'menus');
            if (fs.existsSync(distDir)) {
              fs.writeFileSync(path.join(distDir, safeName), buf);
            }
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: true, filename: safeName, size: buf.length }));
          });
          return;
        }

        if (url.pathname.startsWith('/assets/menus/')) {
          const requestedFile = decodeURIComponent(url.pathname.replace('/assets/menus/', ''));
          const menusDir = path.resolve(process.cwd(), 'public', 'assets', 'menus');
          if (fs.existsSync(menusDir)) {
            const existingFiles = fs.readdirSync(menusDir);
            let match = existingFiles.find(f => f.toLowerCase() === requestedFile.toLowerCase());
            
            if (!match) {
              const clean = (s: string) => s.toLowerCase().replace(/\.pdf$/i, '').replace(/[^a-z0-9]/g, '');
              const targetNorm = clean(requestedFile);
              match = existingFiles.find(f => {
                const fNorm = clean(f);
                return fNorm === targetNorm || fNorm.includes(targetNorm) || targetNorm.includes(fNorm);
              });
            }

            if (match) {
              const fullPath = path.join(menusDir, match);
              if (fs.existsSync(fullPath)) {
                const stat = fs.statSync(fullPath);
                res.writeHead(200, {
                  'Content-Type': 'application/pdf',
                  'Content-Length': stat.size,
                  'Content-Disposition': `attachment; filename="${match}"`,
                  'X-Content-Type-Options': 'nosniff',
                  'Access-Control-Allow-Origin': '*',
                  'Cache-Control': 'public, max-age=600',
                });
                if (req.method === 'HEAD') {
                  return res.end();
                }
                const stream = fs.createReadStream(fullPath);
                stream.pipe(res);
                return;
              }
            }
          }
        }

        next();
      });
    }
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), menuPdfPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
