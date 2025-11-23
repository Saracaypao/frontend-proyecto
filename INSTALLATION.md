# Guía de Instalación Detallada - Budget Buddy

Esta guía proporciona instrucciones paso a paso para instalar y configurar Budget Buddy en diferentes entornos y sistemas operativos.

##  Tabla de Contenidos

- [Requisitos del Sistema](#requisitos-del-sistema)
- [Instalación en Windows](#instalación-en-windows)
- [Instalación en macOS](#instalación-en-macos)
- [Instalación en Linux](#instalación-en-linux)
- [Configuración del Entorno](#configuración-del-entorno)
- [Solución de Problemas Comunes](#solución-de-problemas-comunes)
- [Instalación con Docker](#instalación-con-docker-opcional)

---

##  Requisitos del Sistema

### Hardware Mínimo
- **CPU**: Procesador de 2 núcleos o superior
- **RAM**: 4 GB mínimo (8 GB recomendado)
- **Almacenamiento**: 500 MB de espacio libre
- **Internet**: Conexión estable para descargar dependencias

### Software Requerido

| Software | Versión Mínima | Versión Recomendada |
|----------|----------------|---------------------|
| Node.js | 16.0.0 | 18.x o superior |
| npm | 7.0.0 | 9.x o superior |
| Git | 2.x | Última versión |

---

##  Instalación en Windows

### Paso 1: Instalar Node.js y npm

#### Opción A: Instalador Oficial (Recomendado)

1. **Descargar Node.js**
   
   Visita: https://nodejs.org/
   Descarga: "LTS" (versión de soporte a largo plazo)
   

2. **Ejecutar el Instalador**
   - Haz doble clic en el archivo descargado (.msi)
   - Sigue el asistente de instalación
   - Marca la opción "Automatically install necessary tools"
   - Completa la instalación

3. **Verificar Instalación**
   powershell
   # Abrir PowerShell o CMD
   node --version
   # Debe mostrar: v18.x.x o superior
   
   npm --version
   # Debe mostrar: 9.x.x o superior
   

#### Opción B: Usando Chocolatey

powershell
# Instalar Chocolatey si no lo tienes
# Ejecutar PowerShell como Administrador:
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))

# Instalar Node.js
choco install nodejs-lts -y

# Verificar
node --version
npm --version


### Paso 2: Instalar Git

#### Opción A: Instalador Oficial

1. **Descargar Git**
   
   Visita: https://git-scm.com/download/win
   Descarga el instalador de 64-bit
   

2. **Instalar Git**
   - Ejecutar el instalador
   - Configuraciones recomendadas:
     - Editor: Visual Studio Code (o tu preferido)
     - PATH environment: "Git from the command line and also from 3rd-party software"
     - HTTPS transport: "Use the OpenSSL library"
     - Line ending conversions: "Checkout Windows-style, commit Unix-style"

3. **Verificar Instalación**
   powershell
   git --version
   # Debe mostrar: git version 2.x.x
   

#### Opción B: Usando Chocolatey

powershell
choco install git -y
git --version


### Paso 3: Clonar e Instalar Budget Buddy

powershell
# Navegar a tu carpeta de proyectos
cd C:\Users\TuUsuario\Documents\Proyectos

# Clonar el repositorio
git clone https://github.com/tu-usuario/budget-buddy.git

# Entrar al directorio
cd budget-buddy

# Instalar dependencias
npm install

# Crear archivo de configuración
copy .env.example .env

# Editar .env con Notepad o tu editor preferido
notepad .env

# Iniciar el servidor de desarrollo
npm start


### Configuración de Variables de Entorno en Windows

powershell
# Opción 1: Editar con Notepad
notepad .env

# Opción 2: Editar con Visual Studio Code
code .env

# Configuración básica para desarrollo:
# VITE_API_BASE_URL=https://backend-proyecto-28x9.onrender.com
# PORT=3001
# NODE_ENV=development


---

## 🍎 Instalación en macOS

### Paso 1: Instalar Homebrew (Gestor de Paquetes)

bash
# Instalar Homebrew
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Agregar Homebrew al PATH (sigue las instrucciones post-instalación)
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile
eval "$(/opt/homebrew/bin/brew shellenv)"


### Paso 2: Instalar Node.js y npm

#### Opción A: Con Homebrew (Recomendado)

bash
# Instalar Node.js (incluye npm)
brew install node@18

# Vincular Node 18
brew link node@18

# Verificar instalación
node --version
npm --version


#### Opción B: Con nvm (Node Version Manager)

bash
# Instalar nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Cerrar y reabrir la terminal, luego:
nvm install 18
nvm use 18
nvm alias default 18

# Verificar
node --version
npm --version


### Paso 3: Instalar Git

bash
# Git generalmente viene preinstalado en macOS
# Si no lo tienes, instálalo con Homebrew:
brew install git

# Verificar
git --version


### Paso 4: Configurar Git

bash
# Configurar tu nombre
git config --global user.name "Tu Nombre"

# Configurar tu email
git config --global user.email "tu@email.com"

# Verificar configuración
git config --list


### Paso 5: Clonar e Instalar Budget Buddy

bash
# Navegar a tu carpeta de proyectos
cd ~/Documents/Proyectos

# Clonar el repositorio
git clone https://github.com/tu-usuario/budget-buddy.git

# Entrar al directorio
cd budget-buddy

# Instalar dependencias
npm install

# Crear archivo de configuración
cp .env.example .env

# Editar con tu editor preferido
nano .env
# o
code .env

# Iniciar el servidor
npm start


---

##  Instalación en Linux (Ubuntu/Debian)

### Paso 1: Actualizar el Sistema

bash
sudo apt update
sudo apt upgrade -y


### Paso 2: Instalar Node.js y npm

#### Opción A: Desde NodeSource (Recomendado)

bash
# Instalar curl si no lo tienes
sudo apt install curl -y

# Agregar repositorio de NodeSource para Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -

# Instalar Node.js y npm
sudo apt install nodejs -y

# Verificar instalación
node --version
npm --version


#### Opción B: Con nvm

bash
# Instalar dependencias
sudo apt install curl -y

# Instalar nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Recargar configuración
source ~/.bashrc

# Instalar Node.js 18
nvm install 18
nvm use 18
nvm alias default 18

# Verificar
node --version
npm --version


### Paso 3: Instalar Git

bash
# Instalar Git
sudo apt install git -y

# Verificar
git --version

# Configurar Git
git config --global user.name "Tu Nombre"
git config --global user.email "tu@email.com"


### Paso 4: Clonar e Instalar Budget Buddy

bash
# Navegar a tu carpeta de proyectos
cd ~/proyectos

# Si no existe, créala
mkdir -p ~/proyectos
cd ~/proyectos

# Clonar el repositorio
git clone https://github.com/tu-usuario/budget-buddy.git

# Entrar al directorio
cd budget-buddy

# Instalar dependencias
npm install

# Crear archivo de configuración
cp .env.example .env

# Editar con nano o vim
nano .env

# Iniciar el servidor
npm start


---

## Configuración del Entorno

### Archivo .env Básico para Desarrollo

env
# API Backend
VITE_API_BASE_URL=https://backend-proyecto-28x9.onrender.com

# Puerto del servidor
PORT=3001

# Modo de aplicación
NODE_ENV=development

# Hot Module Replacement
HMR=true

# Source maps
GENERATE_SOURCEMAP=true

# Feature flags
VITE_ENABLE_PDF_EXPORT=true
VITE_ENABLE_EXCEL_EXPORT=true
VITE_ENABLE_ADVICE_SYSTEM=true
VITE_ENABLE_DARK_MODE=true


### Configurar Backend Local (Opcional)

Si tienes el backend corriendo localmente:

env
# En lugar de la URL de producción, usa:
VITE_API_BASE_URL=http://localhost:8080

# Asegúrate de que el backend está corriendo en el puerto 8080


### Verificar Configuración

bash
# Verificar que todas las dependencias se instalaron
npm list --depth=0

# Verificar que no hay vulnerabilidades críticas
npm audit

# Si hay vulnerabilidades, intenta arreglarlas
npm audit fix


---

## Solución de Problemas Comunes

### Problema 1: Error "node: command not found"

**Síntomas**: Al ejecutar node --version muestra error.

**Soluciones**:

**Windows:**
powershell
# Verificar que Node está en PATH
$env:PATH -split ';' | Select-String "nodejs"

# Si no está, agregar manualmente o reinstalar Node.js


**macOS/Linux:**
bash
# Verificar PATH
echo $PATH | grep node

# Si usas nvm, activar Node:
nvm use 18

# Agregar al .bashrc o .zshrc:
export PATH="/usr/local/bin:$PATH"


### Problema 2: Error "EACCES" al instalar paquetes globales

**Síntomas**: Error de permisos al hacer npm install -g

**Solución (macOS/Linux)**:
bash
# Crear directorio para paquetes globales
mkdir ~/.npm-global

# Configurar npm para usar ese directorio
npm config set prefix '~/.npm-global'

# Agregar al PATH
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc
source ~/.bashrc


**Solución (Windows)**:
powershell
# Ejecutar PowerShell como Administrador
# Y volver a ejecutar el comando de instalación


### Problema 3: Puerto 3001 ya en uso

**Síntomas**: Error "EADDRINUSE" al iniciar el servidor.

**Solución**:

**Windows:**
powershell
# Ver qué proceso usa el puerto
netstat -ano | findstr :3001

# Matar el proceso (reemplaza PID con el número mostrado)
taskkill /PID <PID> /F

# O cambiar el puerto en .env
echo PORT=3002 >> .env


**macOS/Linux:**
bash
# Ver qué proceso usa el puerto
lsof -i :3001

# Matar el proceso
kill -9 <PID>

# O cambiar el puerto
echo "PORT=3002" >> .env


### Problema 4: Errores al instalar dependencias

**Síntomas**: Errores durante npm install

**Soluciones**:

bash
# Limpiar cache de npm
npm cache clean --force

# Eliminar node_modules y package-lock.json
rm -rf node_modules package-lock.json

# Reinstalar
npm install

# Si persiste, usar npm ci (instalación limpia)
npm ci


### Problema 5: La aplicación no carga en el navegador

**Síntomas**: Página en blanco o error de conexión

**Soluciones**:

1. **Verificar que el servidor está corriendo**
   bash
   # Debería ver: "Server running on http://localhost:3001"
   

2. **Verificar la URL**
   
   ✅ Correcto: http://localhost:3001
   ❌ Incorrecto: https://localhost:3001
   

3. **Limpiar cache del navegador**
   - Chrome: Ctrl+Shift+Delete
   - Firefox: Ctrl+Shift+Delete
   - Seleccionar "Cached images and files"

4. **Revisar consola del navegador**
   - F12 → Console
   - Buscar errores en rojo

### Problema 6: Errores de CORS

**Síntomas**: Error "Access-Control-Allow-Origin" en la consola

**Solución**:
javascript
// Verificar que webpack.config.js tenga configurado el proxy:
proxy: [{
  context: ['/auth', '/users', '/transactions', '/categories'],
  target: 'https://backend-proyecto-28x9.onrender.com',
  changeOrigin: true,
  secure: false
}]


---

## 🐳 Instalación con Docker (Opcional)

Si prefieres usar Docker para un entorno aislado:

### Requisitos
- Docker Desktop instalado ([docker.com](https://www.docker.com/))

### Crear Dockerfile

dockerfile
# Crear archivo llamado 'Dockerfile' en la raíz del proyecto
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

EXPOSE 3001

CMD ["npm", "start"]


### Crear docker-compose.yml

yaml
version: '3.8'

services:
  budget-buddy:
    build: .
    ports:
      - "3001:3001"
    volumes:
      - .:/app
      - /app/node_modules
    environment:
      - NODE_ENV=development
      - PORT=3001


### Ejecutar con Docker

bash
# Construir imagen
docker-compose build

# Iniciar contenedor
docker-compose up

# Acceder a: http://localhost:3001


---

## ✅ Verificación Final

Después de la instalación, verifica que todo funcione:

bash
# 1. Verificar versiones
node --version  # v18.x.x o superior
npm --version   # 9.x.x o superior
git --version   # 2.x.x

# 2. Verificar instalación de dependencias
npm list --depth=0

# 3. Iniciar el servidor
npm start

# 4. Abrir en navegador
# http://localhost:3001


### Checklist de Verificación

- [ ] Node.js y npm instalados correctamente
- [ ] Git instalado y configurado
- [ ] Repositorio clonado
- [ ] Dependencias instaladas sin errores
- [ ] Archivo .env creado y configurado
- [ ] Servidor inicia sin errores
- [ ] Aplicación carga en el navegador
- [ ] Puedes hacer login/registro

---

## 📞 Soporte Adicional

Si sigues teniendo problemas:

1. **Revisa la documentación**: [README.md](README.md)
2. **Busca en Issues**: [GitHub Issues](https://github.com/tu-usuario/budget-buddy/issues)
3. **Crea un nuevo Issue**: Incluye toda la información del error
4. **Únete a Discord**: [discord.gg/budgetbuddy](https://discord.gg/budgetbuddy)
5. **Email**: support@budgetbuddy.com

---

## 🎉 ¡Listo!

Si llegaste hasta aquí y todo funciona, ¡felicitaciones! 🎊

Ya puedes empezar a desarrollar con Budget Buddy.

**Próximos pasos**:
- Lee [CONTRIBUTING.md](CONTRIBUTING.md) si quieres contribuir
- Explora el código en src/
- Revisa la documentación de funcionalidades específicas

¡Happy coding! 🚀
