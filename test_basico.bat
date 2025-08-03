@echo off
echo Ejecutando pruebas basicas del sistema Ferremas...
echo.

echo [0/2] Instalando dependencias necesarias...
cd backend\ev2
echo Instalando pymysql...
pip install pymysql
if %errorlevel% neq 0 (
    echo ERROR: No se pudo instalar pymysql
    pause
    exit /b 1
)
echo Dependencias instaladas: OK
echo.

echo [1/2] Probando Backend (Django)...
python manage.py test ferremas.tests.BasicModelTest
if %errorlevel% neq 0 (
    echo ERROR: Pruebas del backend fallaron
    pause
    exit /b 1
)
echo Backend: OK
echo.

echo [2/2] Probando Frontend (Angular)...
cd ..\..\frontend
npm run build
if %errorlevel% neq 0 (
    echo ERROR: Compilacion del frontend fallo
    pause
    exit /b 1
)
echo Frontend: OK
echo.

echo ✅ Todas las pruebas basicas pasaron!
pause
