@echo off
cd /d "%~dp0"
title VibeEnglish - Plataforma de Ingles
echo ======================================================
echo   Iniciando VibeEnglish en tu entorno local...
echo ======================================================
where node >nul 2>nul
if %errorlevel% equ 0 (
  node server.js --open
) else (
  echo Abriendo index.html directamente en el navegador...
  start "" "%~dp0index.html"
)
pause
