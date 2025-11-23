# Budget Buddy - Personal Finance Manager

## Descripción del Proyecto

**Budget Buddy** es una aplicación web moderna y completa para la gestión de finanzas personales que permite a los usuarios tomar control total de su dinero. La aplicación está diseñada tanto para personas que buscan llevar un registro detallado de sus gastos e ingresos, como para asesores financieros profesionales que necesitan ayudar a sus clientes.

### ¿Para quién es esta aplicación?

- **Usuarios individuales**: Personas que desean controlar sus finanzas personales, establecer presupuestos y visualizar sus patrones de gasto.
- **Asesores financieros**: Profesionales que ofrecen consultoría financiera y necesitan acceder a las transacciones públicas de sus clientes.
- **Familias**: Grupos que quieren gestionar sus finanzas compartidas de manera colaborativa.

###  ¿Qué problema resuelve?

Budget Buddy aborda varios desafíos comunes en la gestión financiera personal:

1. **Falta de visibilidad financiera**: Muchas personas no saben exactamente cuánto gastan o en qué categorías.
2. **Dificultad para generar reportes**: Crear resúmenes financieros manualmente consume tiempo y es propenso a errores.
3. **Necesidad de asesoría profesional**: Los usuarios pueden solicitar ayuda de asesores financieros certificados directamente en la plataforma.
4. **Exportación de datos**: Capacidad de generar reportes en PDF de alta calidad para compartir o archivar.
5. **Análisis de tendencias**: Visualizaciones gráficas que permiten identificar patrones de gasto e ingreso.

## Características Principales

###  Gestión de Transacciones
- ✅ Crear, editar y eliminar transacciones (ingresos y gastos)
- ✅ Categorización personalizada
- ✅ Filtros avanzados por fecha, categoría, tipo y monto
- ✅ Transacciones públicas/privadas
- ✅ Búsqueda y ordenamiento

###  Reportes y Análisis
- ✅ Dashboard con métricas en tiempo real
- ✅ Reportes por período (general, año, mes, rango personalizado)
- ✅ Exportación a PDF con diseño profesional
- ✅ Exportación a Excel/CSV
- ✅ Visualizaciones con Chart.js (gráficos de línea, dona, barras)

###  Sistema de Asesoría Financiera
- ✅ Solicitudes de asesoría
- ✅ Asignación automática de asesores
- ✅ Estados de seguimiento (pendiente, aceptada, en progreso, completada)
- ✅ Comentarios en transacciones
- ✅ Panel dedicado para asesores

### Experiencia de Usuario
- ✅ Interfaz moderna con Tailwind CSS 4.0
- ✅ Modo oscuro/claro con persistencia
- ✅ Diseño responsive (móvil, tablet, desktop)
- ✅ Animaciones suaves con Alpine.js
- ✅ Notificaciones toast
- ✅ Indicadores de carga

###  Seguridad
- ✅ Autenticación con JWT tokens
- ✅ Protección de rutas
- ✅ Roles de usuario (USER, ADVISOR)
- ✅ Validación de sesión automática
- ✅ Expiración de tokens

##  Tecnologías Utilizadas

### Frontend
| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| **HTML5** | - | Estructura |
| **Tailwind CSS** | 4.0.0 | Estilos y diseño |
| **Alpine.js** | 3.14.1 | Reactividad y estado |
| **Webpack** | 5.99.9 | Bundling y build |
| **Chart.js** | 4.4.6 | Gráficos y visualizaciones |
| **jsPDF** | 3.0.3 | Generación de PDFs |
| **html2canvas** | 1.4.1 | Captura de elementos HTML |
| **Flatpickr** | 4.6.13 | Date picker |
| **ExcelJS** | 4.3.0 | Exportación Excel |

### Backend (API)
- **Base URL**: https://backend-proyecto-28x9.onrender.com
- **Autenticación**: JWT (JSON Web Tokens)
- **Protocolo**: REST API

### Build & Dev Tools
- **Babel**: Transpilación ES6+
- **PostCSS**: Procesamiento CSS
- **ESLint**: Linting de código
- **Prettier**: Formateo de código
- **Webpack Dev Server**: Servidor de desarrollo con HMR

##  Requisitos Previos

Antes de instalar Budget Buddy, asegúrate de tener instalado:

### Software Requerido

| Software | Versión Mínima | Versión Recomendada | Link de Descarga |
|----------|----------------|---------------------|------------------|
| **Node.js** | 16.0.0 | 18.x o superior | [nodejs.org](https://nodejs.org/) |
| **npm** | 7.0.0 | 9.x o superior | Incluido con Node.js |
| **Git** | 2.x | Última | [git-scm.com](https://git-scm.com/) |

### Verificar Instalaciones

bash
# Verificar Node.js
node --version
# Debe mostrar: v16.0.0 o superior

# Verificar npm
npm --version
# Debe mostrar: 7.0.0 o superior

# Verificar Git
git --version
# Debe mostrar: git version 2.x.x


### Navegadores Compatibles

-  Chrome/Edge 90+
-  Firefox 88+
-  Safari 14+
-  Internet Explorer: No soportado

##  Instalación Paso a Paso

### 1. Clonar el Repositorio

bash
# Usando HTTPS
git clone https://github.com/tu-usuario/budget-buddy.git

# O usando SSH
git clone git@github.com:tu-usuario/budget-buddy.git

# Navegar al directorio del proyecto
cd budget-buddy


### 2. Instalar Dependencias

bash
# Instalar todas las dependencias del proyecto
npm install

# O usando npm ci para instalación limpia (recomendado para CI/CD)
npm ci


**Nota**: La instalación puede tomar 2-5 minutos dependiendo de tu conexión a internet.

### 3. Configurar Variables de Entorno

bash
# Crear archivo de variables de entorno
cp .env.example .env

# Editar el archivo .env con tus configuraciones
# (Ver sección de Variables de Entorno más abajo)


### 4. Verificar Instalación

bash
# Verificar que todas las dependencias se instalaron correctamente
npm list --depth=0


## Ejecución

### Modo Desarrollo (Recomendado para desarrollo)

bash
# Iniciar servidor de desarrollo con Hot Module Replacement
npm start

# El servidor se iniciará en: http://localhost:3001
# La aplicación se abrirá automáticamente en tu navegador


**Características del modo desarrollo:**
- ✅ Hot Module Replacement (HMR) - Los cambios se reflejan automáticamente
- ✅ Source maps para debugging
- ✅ Proxy configurado para API backend
- ✅ Servidor de desarrollo rápido

### Build para Producción

bash
# Generar build optimizado
npm run build

# Los archivos generados estarán en la carpeta: ./build/


**El build de producción incluye:**
- ✅ Minificación de JavaScript y CSS
- ✅ Optimización de imágenes
- ✅ Tree shaking (eliminación de código no usado)
- ✅ Bundle splitting
- ✅ Assets con hash para cache busting

### Servir Build de Producción Localmente

bash
# Instalar servidor HTTP simple (si no lo tienes)
npm install -g http-server

# Servir la carpeta build
cd build
http-server -p 8080

# Abrir en navegador: http://localhost:8080


### Scripts Disponibles

bash
# Iniciar servidor de desarrollo
npm start

# Crear build de producción
npm run build

# Formatear código con Prettier
npm run sort

# Linting con ESLint (si está configurado)
npm run lint


## Variables de Entorno

Budget Buddy utiliza variables de entorno para configuraciones sensibles y específicas del entorno. A continuación se describe cada variable:

### Archivo .env.example

env
# ============================================
# BUDGET BUDDY - CONFIGURACIÓN DE ENTORNO
# ============================================

# ===== API BACKEND =====
# URL base del servidor backend
# Desarrollo local: http://localhost:8080
# Producción: https://backend-proyecto-28x9.onrender.com
VITE_API_BASE_URL=https://backend-proyecto-28x9.onrender.com

# ===== PUERTO DEL SERVIDOR DE DESARROLLO =====
# Puerto en el que se ejecutará el servidor de desarrollo
# Por defecto: 3001
PORT=3001

# ===== CONFIGURACIÓN DE WEBPACK DEV SERVER =====
# Habilitar Hot Module Replacement
HMR=true

# Habilitar source maps en desarrollo (recomendado)
GENERATE_SOURCEMAP=true

# ===== PROXY API =====
# El proxy redirige las peticiones al backend automáticamente
# No necesita configuración adicional si usas npm start

# ===== MODO DE APLICACIÓN =====
# development | production
NODE_ENV=development

# ===== JWT CONFIGURACIÓN =====
# Nota: Los tokens JWT se manejan en el backend
# El frontend solo almacena el token recibido
# Tiempo de expiración del token (manejado por backend): 24h

# ===== OPCIONES DE BUILD =====
# Nivel de compresión para assets
# none | gzip | brotli
COMPRESSION=gzip

# ===== ANALYTICS (Opcional) =====
# Google Analytics ID (si aplica)
# VITE_GA_TRACKING_ID=UA-XXXXXXXXX-X

# ===== SENTRY (Opcional) =====
# Para monitoreo de errores en producción
# VITE_SENTRY_DSN=https://xxxxx@sentry.io/xxxxx

# ===== FEATURE FLAGS (Opcional) =====
# Habilitar/deshabilitar características
VITE_ENABLE_PDF_EXPORT=true
VITE_ENABLE_EXCEL_EXPORT=true
VITE_ENABLE_ADVICE_SYSTEM=true
VITE_ENABLE_DARK_MODE=true

# ===== URLs EXTERNAS =====
# URLs para documentación o ayuda
VITE_SUPPORT_EMAIL=support@budgetbuddy.com
VITE_DOCUMENTATION_URL=https://docs.budgetbuddy.com


### Configuración por Entorno

#### Desarrollo Local

env
VITE_API_BASE_URL=http://localhost:8080
PORT=3001
NODE_ENV=development
GENERATE_SOURCEMAP=true


#### Producción

env
VITE_API_BASE_URL=https://backend-proyecto-28x9.onrender.com
NODE_ENV=production
GENERATE_SOURCEMAP=false
COMPRESSION=gzip

##  Autenticación y Roles

### Flujo de Autenticación

1. **Registro**: El usuario crea una cuenta en /signup
2. **Login**: El usuario inicia sesión en /signin
3. **Token JWT**: El backend genera un token que se almacena en localStorage
4. **Protección**: El auth-guard.js valida el token en cada navegación
5. **Expiración**: Los tokens expiran después de 24 horas

### Roles de Usuario

####  USER (Usuario Regular)
- ✅ Crear y gestionar sus propias transacciones
- ✅ Ver reportes personales
- ✅ Solicitar asesoría financiera
- ✅ Exportar reportes a PDF/Excel
- ❌ No puede ver transacciones de otros usuarios (a menos que sean públicas)

####  ADVISOR (Asesor Financiero)
- ✅ Todo lo que puede hacer un USER
- ✅ Ver transacciones públicas de clientes
- ✅ Aceptar solicitudes de asesoría
- ✅ Proporcionar comentarios y consejos
- ✅ Panel dedicado con sus asignaciones

### Páginas Públicas vs Protegidas

**Públicas** (sin autenticación):
- /landing.html - Página de inicio
- /signin.html - Inicio de sesión
- /signup.html - Registro

**Protegidas** (requieren autenticación):
- /index.html - Dashboard
- /transactions.html - Transacciones
- /report.html - Reportes
- /profile.html - Perfil
- /settings.html - Configuración
- /financialAdv.html - Panel de asesoría

## 📡 API Backend

### Información de la API

- **Base URL**: https://backend-proyecto-28x9.onrender.com
- **Protocolo**: REST
- **Autenticación**: Bearer Token (JWT)
- **Formato**: JSON

### Endpoints Principales

#### Autenticación

POST   /auth/login           # Iniciar sesión
POST   /users/register       # Registrar nuevo usuario
POST   /auth/logout          # Cerrar sesión


#### Usuarios

GET    /users/profile        # Obtener perfil del usuario
PUT    /users/update         # Actualizar perfil
PUT    /users/change-password # Cambiar contraseña


#### Transacciones

GET    /transactions         # Listar todas las transacciones
POST   /transactions         # Crear nueva transacción
GET    /transactions/:id     # Obtener transacción por ID
PUT    /transactions/:id     # Actualizar transacción
DELETE /transactions/:id     # Eliminar transacción
GET    /transactions/filter  # Filtrar transacciones
GET    /transactions/latest  # Últimas transacciones
GET    /transactions/summary/current-month  # Resumen del mes actual
GET    /transactions/summary/last-6-months  # Resumen de últimos 6 meses


#### Categorías

GET    /categories           # Listar categorías
POST   /categories           # Crear categoría
PUT    /categories/:id       # Actualizar categoría
DELETE /categories/:id       # Eliminar categoría


#### Reportes

GET    /report               # Reporte general
GET    /report/:year         # Reporte por año
GET    /report/:year/:month  # Reporte por mes
GET    /report/range?startDate=X&endDate=Y  # Reporte por rango


#### Asesorías

POST   /advice-requests      # Crear solicitud de asesoría
GET    /advice-requests/pending  # Solicitudes pendientes
GET    /advice-requests/my-requests  # Mis solicitudes
GET    /advice-requests/my-assignments  # Mis asignaciones (ADVISOR)
POST   /advice-requests/:id/accept  # Aceptar solicitud
POST   /advice-requests/:id/advice  # Proporcionar consejo


### Formato de Request

javascript
// Ejemplo de petición autenticada
fetch('https://backend-proyecto-28x9.onrender.com/transactions', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': Bearer ${localStorage.getItem('jwtToken')}
  },
  body: JSON.stringify({
    description: 'Compra de supermercado',
    categoryId: 1,
    date: '2025-11-23',
    amount: 150.50,
    type: 'EXPENSE',
    isPublic: false
  })
});


##  Funcionalidades Destacadas

### 1. Exportación a PDF

Budget Buddy incluye un sistema avanzado de exportación a PDF que genera reportes profesionales con:

- ✅ Diseño de alta calidad (resolución 2x)
- ✅ Header personalizado con logo y metadata
- ✅ Nombres de archivo descriptivos automáticos
- ✅ Soporte multi-página
- ✅ Gráficos y visualizaciones incluidas
- ✅ Indicador de carga durante generación

**Uso**:
javascript
// Desde la página de reportes
await pdfExportService.exportReportToPDF('report-content-area', reportData);


**Documentación completa**: Ver EXPORT_PDF_FEATURE.md

### 2. Dashboard Interactivo

El dashboard proporciona una vista general de las finanzas del mes actual:

-  Total de ingresos
-  Total de gastos
-  Balance (positivo/negativo)
-  Promedio diario de gastos
-  Promedio semanal de gastos
-  Últimas 5 transacciones
-  Gráficos de tendencias

### 3. Sistema de Filtros Avanzados

Las transacciones pueden filtrarse por:

-  Rango de fechas (inicio - fin)
-  Rango de montos (mínimo - máximo)
-  Categorías múltiples
-  Tipo (ingreso/gasto)
-  Descripción (búsqueda de texto)

### 4. Modo Oscuro

-  Alternancia entre tema claro y oscuro
-  Preferencia guardada en localStorage
-  Todos los componentes adaptados
-  Sin parpadeo al cargar

##  Deployment (Despliegue)

### Despliegue en Vercel (Recomendado)

1. **Instalar Vercel CLI** (opcional):
bash
npm install -g vercel


2. **Desplegar**:
bash
# Primera vez
vercel

# Despliegues posteriores
vercel --prod


3. **Configurar Variables de Entorno en Vercel**:
   - Ve a tu proyecto en vercel.com
   - Settings → Environment Variables
   - Agrega las variables del archivo .env

### Despliegue Manual

1. **Generar Build**:
bash
npm run build


2. **Subir carpeta build/** a tu servidor web o servicio de hosting.

### Configuración de Vercel

El archivo vercel.json ya está configurado con:
- Rewrites para SPA routing
- Proxy hacia el backend
- Redirecciones para rutas específicas

## 🐛 Solución de Problemas

### Problema: El servidor no inicia

**Solución**:
bash
# Limpiar node_modules y reinstalar
rm -rf node_modules package-lock.json
npm install

# Verificar puerto disponible
# Si el puerto 3001 está ocupado, cambiar en webpack.config.js


### Problema: Error de CORS al hacer peticiones

**Solución**:
- Verificar que el backend está corriendo
- Verificar la configuración de proxy en webpack.config.js
- Asegurarse de que la URL del backend sea correcta

### Problema: Los estilos no se aplican

**Solución**:
bash
# Limpiar cache de Webpack
rm -rf build/
npm run build

# Verificar que Tailwind CSS está configurado correctamente


### Problema: Token JWT expirado

**Solución**:
- El sistema detecta automáticamente tokens expirados
- Serás redirigido a /signin.html
- Simplemente vuelve a iniciar sesión

### Problema: Las imágenes no cargan

**Solución**:
- Verificar que las rutas sean absolutas: /src/images/...
- Verificar que publicPath: '/' está en webpack.config.js

##  Contribución

### Cómo Contribuir

1. **Fork** el repositorio
2. **Crea** una rama para tu feature: git checkout -b feature/nueva-funcionalidad
3. **Commit** tus cambios: git commit -m 'Add: nueva funcionalidad'
4. **Push** a la rama: git push origin feature/nueva-funcionalidad
5. **Abre** un Pull Request

### Convenciones de Código

- **JavaScript**: ES6+ con módulos
- **Estilos**: Tailwind CSS (utility-first)
- **Nomenclatura**: camelCase para variables, PascalCase para componentes
- **Commits**: Formato: Tipo: descripción (Add, Fix, Update, Remove)

### Code Style

javascript
// ✅ Bueno
const getUserTransactions = async (userId) => {
  try {
    const response = await apiRequest(/transactions?userId=${userId});
    return response;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

// ❌ Evitar
function getusertransactions(userid) {
  return fetch('/api/transactions?userId=' + userid)
    .then(res => res.json());
}


##  Changelog

### [2.0.1] - 2025-11-23

#### Añadido
-  Sistema completo de exportación a PDF con alta calidad
-  Documentación técnica completa (README.md)
-  Archivo .env.example con todas las variables
-  Mejoras en el sistema de autenticación
-  Indicadores de carga mejorados

#### Corregido
- 🐛 Correcciones en el sistema de filtros
- 🐛 Mejoras en la validación de formularios

### [2.0.0] - 2025-11-01

#### Añadido
-  Sistema de asesoría financiera
-  Roles de usuario (USER, ADVISOR)
-  Dashboard con métricas en tiempo real
-  Modo oscuro completo

## Licencia

Este proyecto está bajo la licencia ISC. Ver el archivo LICENSE para más detalles.


## Soporte

¿Necesitas ayuda? Contáctanos:

- **Email**: support@budgetbuddy.com
- **Issues**: [GitHub Issues](https://github.com/tu-usuario/budget-buddy/issues)
- **Documentación**: [docs.budgetbuddy.com](https://docs.budgetbuddy.com)
- **Discord**: [Únete a nuestra comunidad](https://discord.gg/budgetbuddy)

## Agradecimientos

- [TailAdmin](https://tailadmin.com) - Template base
- [Tailwind CSS](https://tailwindcss.com) - Framework CSS
- [Alpine.js](https://alpinejs.dev) - Framework JavaScript
- [Chart.js](https://www.chartjs.org) - Librería de gráficos
- [jsPDF](https://github.com/parallax/jsPDF) - Generación de PDFs

---

<div align="center">
  <p>Hecho con ❤ por el equipo de Budget Buddy</p>
  <p> 2025 Budget Buddy. Todos los derechos reservados.</p>
</div>


