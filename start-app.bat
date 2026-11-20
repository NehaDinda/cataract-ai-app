@echo off
title Cataract AI Detection System
echo Starting Cataract AI Detection System on http://localhost:3000 ...
cd /d "%~dp0"
start http://localhost:3000
npm run dev
pause
