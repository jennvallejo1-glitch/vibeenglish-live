@echo off
title VibeEnglish - Plataforma de Ingles
echo ======================================================
echo   Iniciando VibeEnglish...
echo ======================================================
start "" "http://localhost:3000"
where node >nul 2>nul
if %errorlevel% equ 0 (
  node server.js
) else (
  start "" "index.html"
)
pause
