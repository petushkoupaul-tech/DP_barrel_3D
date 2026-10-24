@echo off
setlocal
set "PROJECT_DIR=%~dp0"

powershell.exe -NoProfile -WindowStyle Hidden -Command "$running = Get-NetTCPConnection -LocalPort 3000 -State Listen -ErrorAction SilentlyContinue; if (-not $running) { Start-Process -FilePath (Join-Path $env:ProgramFiles 'nodejs\npm.cmd') -ArgumentList 'run','dev' -WorkingDirectory '%PROJECT_DIR%' -WindowStyle Hidden }; for ($attempt = 0; $attempt -lt 20; $attempt++) { if (Test-NetConnection -ComputerName localhost -Port 3000 -InformationLevel Quiet -WarningAction SilentlyContinue) { Start-Process 'http://localhost:3000'; exit }; Start-Sleep -Seconds 1 }; Start-Process 'http://localhost:3000'"
