@echo off
title Live Dev Server Portofolio - SMK Telkom Malang
color 0A
cls
echo ======================================================================
echo    LIVE DEVELOPMENT SERVER - PORTOFOLIO PANTAI
echo    Maulana Ichsan ^| Kelas X TKJ 1 ^| SMK Telkom Malang
echo ======================================================================
echo.
echo Sedang menjalankan Vite Dev Server...
echo Halaman akan otomatis terbuka di browser Anda (http://localhost:5173).
echo Tekan CTRL + C di jendela ini jika ingin menghentikan server.
echo.

cd /d "%~dp0"
start "" http://localhost:5173
npm.cmd run dev
pause
