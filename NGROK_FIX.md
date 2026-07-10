# Ngrok Tunnel Fix

The ngrok tunnel URL in `vite.config.js` has expired.

## Steps to fix:
1. Restart your backend with ngrok in Camber notebook
2. Copy the new public URL from `print(public_url)`
3. Update `NGROK_TARGET` in `Crumble_VisionAI/frontend/vite.config.js` line 7
4. Restart Vite dev server

```bash
cd Crumble_VisionAI/frontend
npm run dev