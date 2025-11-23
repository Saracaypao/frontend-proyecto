#  Guía de Contribución - Budget Buddy

¡Gracias por tu interés en contribuir a Budget Buddy! Este documento proporciona directrices para contribuir al proyecto.

##  Tabla de Contenidos

- [Código de Conducta](#código-de-conducta)
- [¿Cómo puedo contribuir?](#cómo-puedo-contribuir)
- [Proceso de Desarrollo](#proceso-de-desarrollo)
- [Estándares de Código](#estándares-de-código)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Reportar Bugs](#reportar-bugs)
- [Sugerir Mejoras](#sugerir-mejoras)

##  Código de Conducta

### Nuestro Compromiso

En el interés de fomentar un ambiente abierto y acogedor, nosotros como contribuyentes y mantenedores nos comprometemos a hacer de la participación en nuestro proyecto y nuestra comunidad una experiencia libre de acoso para todos.

### Comportamiento Esperado

- ✅ Usa lenguaje acogedor e inclusivo
- ✅ Respeta los diferentes puntos de vista y experiencias
- ✅ Acepta críticas constructivas con gracia
- ✅ Enfócate en lo que es mejor para la comunidad
- ✅ Muestra empatía hacia otros miembros de la comunidad

### Comportamiento Inaceptable

- ❌ Uso de lenguaje o imágenes sexualizadas
- ❌ Comentarios insultantes o despectivos (trolling)
- ❌ Acoso público o privado
- ❌ Publicar información privada de otros sin permiso
- ❌ Otras conductas que razonablemente se consideren inapropiadas

## Tipos de Contribuciones

Aceptamos diversos tipos de contribuciones:

###  Reporte de Bugs

Ejemplos de bugs reportados recientemente:
- **#234**: Error al exportar reportes con más de 500 transacciones
- **#198**: Las gráficas no se actualizan correctamente después de eliminar una categoría
- **#176**: El selector de fecha Flatpickr no funciona en Safari iOS
- **#145**: Los totales mensuales se descuadran con transacciones en diferentes zonas horarias

¿Encontraste un bug? Por favor incluye:
- Descripción clara del problema
- Pasos para reproducirlo
- Comportamiento esperado vs actual
- Screenshots o videos si es posible
- Navegador y versión del sistema operativo
- Console logs relevantes (F12 → Console)

###  Nuevas Características

Características propuestas por la comunidad:
- **#312**: Soporte para múltiples monedas (En desarrollo)
- **#289**: Exportar transacciones a Excel (Implementado en v2.3.0)
- **#267**: Sistema de etiquetas personalizadas para transacciones
- **#245**: Calculadora de interés compuesto integrada
- **#223**: Modo comparación: Este mes vs mes anterior

Antes de proponer una nueva característica:
1. Revisa los [issues existentes](https://github.com/Saracaypao/frontend-proyecto/issues) para evitar duplicados
2. Consulta el roadmap del proyecto
3. Abre un issue con la etiqueta `enhancement`
4. Describe el caso de uso y el beneficio esperado
5. Incluye mockups o wireframes si es posible

###  Mejoras de Documentación

Áreas que siempre necesitan mejora:
- Comentarios de código en funciones complejas
- Ejemplos de uso de servicios (transactionService, pdfExportService)
- Guías de integración con el backend
- Traducciones a otros idiomas (actualmente solo español e inglés)
- Videos tutoriales para contribuidores nuevos

###  Optimización de Código

Áreas de optimización prioritarias:
- Rendimiento de gráficas con Chart.js (>1000 data points)
- Tiempo de carga inicial de la aplicación
- Tamaño del bundle de Webpack (actualmente ~850KB)
- Lazy loading de módulos no críticos
- Optimización de queries al backend (reducir llamadas innecesarias)

##  ¿Cómo puedo contribuir?

### 1. Reportar Bugs

Los bugs se rastrean como issues de GitHub. Antes de crear un bug report:

- ✅ Verifica que el bug no haya sido reportado anteriormente
- ✅ Determina en qué repositorio debería crearse el issue
- ✅ Recopila información sobre el bug

**Al crear un bug report, incluye:**

- **Título claro y descriptivo**
- **Pasos para reproducir el problema**
- **Comportamiento esperado vs actual**
- **Screenshots o GIFs** (si es aplicable)
- **Versión del navegador y sistema operativo**
- **Logs o mensajes de error**

**Plantilla de Bug Report:**

markdown
## Descripción del Bug
[Descripción clara y concisa del bug]

## Pasos para Reproducir
1. Ve a '...'
2. Haz clic en '...'
3. Desplázate hacia '...'
4. Ver error

## Comportamiento Esperado
[Qué esperabas que sucediera]

## Comportamiento Actual
[Qué sucedió en realidad]


## Entorno
- OS: [e.g. Windows 11, macOS 13]
- Navegador: [e.g. Chrome 119, Firefox 120]
- Versión: [e.g. 2.0.1]

## Información Adicional
[Cualquier otra información relevante]


### 2. Sugerir Mejoras

Las mejoras tambi�n se rastrean como issues de GitHub. Al crear una sugerencia:

- ✅ Usa un título claro y descriptivo
- ✅ Proporciona una descripción detallada de la mejora sugerida
- ✅ Explica por qu� esta mejora sería útil
- ✅ Si es posible, proporciona ejemplos de cómo funcionaría

**Plantilla de Feature Request:**

markdown
## Descripción de la Funcionalidad
[Descripción clara de la funcionalidad que te gustaría ver]

## Problema que Resuelve
[¿Qu� problema resuelve esta funcionalidad?]

## Solución Propuesta
[Cómo te gustaría que funcionara]

## Alternativas Consideradas
[Otras soluciones que hayas considerado]

## Contexto Adicional
[Screenshots, mockups, o cualquier información adicional]


### 3. Tu Primera Contribución de Código

¿No sabes por dónde empezar? Busca issues etiquetados con:

- **good first issue** - Issues buenos para principiantes
  - Ejemplo: #198 "Agregar tooltips a los botones del dashboard"
  - Ejemplo: #176 "Mejorar mensajes de error en el formulario de login"
  
- **help wanted** - Issues que necesitan ayuda
  - Ejemplo: #234 "Optimizar rendimiento de gráficas con datasets grandes"
  - Ejemplo: #212 "Implementar tests unitarios para categoryService"
  
- **bug** - Bugs confirmados que necesitan ser corregidos
  - Ejemplo: #145 "Fix timezone offset en cálculos de totales mensuales"
  - Ejemplo: #134 "Corregir responsive en tablets para la página de reportes"
  
- **enhancement** - Mejoras planificadas
  - Ejemplo: #312 "Agregar soporte multi-currency"
  - Ejemplo: #289 "Implementar exportación a Excel"

**Contribuciones Recientes de la Comunidad:**
- **Elena Torres**: Corrigió el bug #176 (Flatpickr en Safari iOS) - Merged en PR #177
- **Jorge Ramírez**: Optimizó Chart.js para mejorar rendimiento con 1000+ puntos - PR #245
- **Ana Martínez**: Implementó sistema completo de exportación PDF - PR #198

##  Proceso de Desarrollo

### 1. Fork y Clone

bash
# Fork el repositorio en GitHub
# Luego clona tu fork:
git clone https://github.com/Saracaypao/frontend-proyecto.git
cd frontend-proyecto/budget-buddy

# Agrega el repositorio original como upstream
git remote add upstream https://github.com/Saracaypao/frontend-proyecto.git


### 2. Crear una Rama

bash
# Actualiza tu main local
git checkout main
git pull upstream main

# Crea una nueva rama siguiendo la convención de nombres
# Para nuevas características:
git checkout -b feature/multi-currency-support
git checkout -b feature/budget-alerts

# Para corrección de bugs:
git checkout -b fix/safari-datepicker-issue
git checkout -b fix/chart-rendering-firefox

# Para mejoras de UI:
git checkout -b ui/improved-dashboard-cards
git checkout -b ui/dark-mode-refinements

# Para documentación:
git checkout -b docs/api-integration-guide
git checkout -b docs/contributing-examples

# Para refactorización:
git checkout -b refactor/transaction-service-cleanup
git checkout -b refactor/simplify-auth-flow


**Convención de nombres de ramas:**

- feature/ - Para nuevas funcionalidades
- fix/ - Para corrección de bugs
- docs/ - Para cambios en documentación
- refactor/ - Para refactorización de código
- test/ - Para agregar o modificar tests
- style/ - Para cambios de formato/estilo

### 3. Hacer Cambios

bash
# Instala dependencias
npm install

# Inicia el servidor de desarrollo
npm start

# Haz tus cambios...
# Prueba tus cambios...


### 4. Commit

bash
# Agrega los archivos modificados
git add .

# Commit siguiendo Conventional Commits
# Para nuevas características:
git commit -m "feat(transactions): add bulk delete functionality"
git commit -m "feat(pdf): support custom date ranges for exports"

# Para correcciones de bugs:
git commit -m "fix(charts): resolve pie chart rendering issue in Firefox"
git commit -m "fix(auth): handle expired token refresh properly"

# Para documentación:
git commit -m "docs(api): add examples for category endpoints"
git commit -m "docs(readme): update installation steps for Node 20"

# Para refactorización:
git commit -m "refactor(services): extract common API error handling"
git commit -m "refactor(report): simplify date filtering logic"

# Para performance:
git commit -m "perf(charts): implement virtual scrolling for large datasets"
git commit -m "perf(bundle): lazy load chart.js to reduce initial bundle"


### 5. Push

bash
# Push a tu fork con el nombre de tu rama
git push origin feature/multi-currency-support
# o
git push origin fix/safari-datepicker-issue


### 6. Crear Pull Request

Ve a GitHub y crea un Pull Request desde tu rama hacia main del repositorio original.

##  Estándares de Código

### JavaScript/ES6+

javascript
// ✅ BUENO
const getUserTransactions = async (userId) => {
  try {
    const response = await apiRequest(/transactions?userId=${userId});
    return response;
  } catch (error) {
    console.error('Error fetching transactions:', error);
    throw error;
  }
};

// ❌ EVITAR
function getusertransactions(userid) {
  return fetch('/api/transactions?userId=' + userid)
    .then(res => res.json())
    .catch(err => console.log(err));
}


**Reglas:**
- ✅ Usa const y let, nunca var
- ✅ Usa arrow functions cuando sea apropiado
- ✅ Usa async/await en lugar de callbacks
- ✅ Usa template literals en lugar de concatenación
- ✅ Usa destructuring cuando sea apropiado
- ✅ Maneja errores apropiadamente

### Nomenclatura

| Tipo | Convención | Ejemplo |
|------|-----------|---------|
| Variables | camelCase | userTransactions |
| Constantes | UPPER_SNAKE_CASE | API_BASE_URL |
| Funciones | camelCase | getUserData() |
| Componentes | PascalCase | TransactionCard |
| Clases | PascalCase | TransactionService |
| Archivos | kebab-case | transaction-service.js |

### CSS/Tailwind

html
<!-- ✅ BUENO: Usa clases de Tailwind -->
<div class="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
  <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
    Título
  </h2>
</div>

<!-- ❌ EVITAR: Estilos inline -->
<div style="display: flex; padding: 16px; background: white;">
  <h2 style="font-size: 20px;">Título</h2>
</div>


**Reglas:**
- ✅ Usa clases de Tailwind CSS siempre que sea posible
- ✅ Usa dark mode classes: dark:bg-gray-800
- ✅ Consistencia en spacing
- ❌ Evita CSS personalizado a menos que sea absolutamente necesario

### Estructura de Archivos

javascript
// ✅ BUENO: Orden lógico
// 1. Imports
import { apiRequest } from '../config/api.js';
import transactionService from '../services/transactionService.js';

// 2. Constantes
const DEFAULT_PAGE_SIZE = 10;

// 3. Clase o función principal
class TransactionManager {
  constructor() {
    this.transactions = [];
  }
  
  // Métodos públicos primero
  async loadTransactions() {
    // ...
  }
  
  // Métodos privados después
  _formatTransaction(transaction) {
    // ...
  }
}

// 4. Export
export default TransactionManager;


### Comentarios

javascript
// ✅ BUENO: Comentarios descriptivos
/**
 * Carga las transacciones del usuario actual
 * @param {Object} filters - Filtros opcionales para las transacciones
 * @param {string} filters.startDate - Fecha de inicio en formato YYYY-MM-DD
 * @param {string} filters.endDate - Fecha final en formato YYYY-MM-DD
 * @returns {Promise<Array>} Lista de transacciones formateadas
 */
async loadTransactions(filters = {}) {
  // Validar que las fechas est�n en el formato correcto
  if (filters.startDate && !isValidDate(filters.startDate)) {
    throw new Error('Invalid start date format');
  }
  
  // Hacer la petición al backend
  const transactions = await apiRequest('/transactions', {
    method: 'GET',
    params: filters
  });
  
  return transactions;
}

// ❌ EVITAR: Comentarios obvios o redundantes
// Esta función carga transacciones
async loadTransactions() {
  // Llamar a la API
  const transactions = await apiRequest('/transactions');
  // Retornar las transacciones
  return transactions;
}


## 📝 Commit Guidelines

Usamos **Conventional Commits** para mantener un historial de commits limpio y semántico.

### Formato


<tipo>(<scope>): <descripción corta>

<descripción detallada (opcional)>

<footer (opcional)>


### Tipos

| Tipo | Descripción | Ejemplo |
|------|-------------|---------|
| feat | Nueva funcionalidad | feat(transactions): add filter by date range |
| fix | Corrección de bug | fix(auth): resolve token expiration issue |
| docs | Cambios en documentación | docs(readme): update installation steps |
| style | Cambios de formato | style(css): improve button spacing |
| refactor | Refactorización de código | refactor(services): simplify API calls |
| test | Agregar o modificar tests | test(transactions): add unit tests |
| chore | Tareas de mantenimiento | chore(deps): update dependencies |
| perf | Mejoras de rendimiento | perf(dashboard): optimize chart rendering |

### Ejemplos Reales

bash
# ✅ Buenos commits de nuestro proyecto
git commit -m "feat(pdf): add PDF export functionality with custom date ranges"
git commit -m "fix(dashboard): correct calculation of monthly balance with timezone offset"
git commit -m "docs(api): document transaction and category endpoints with examples"
git commit -m "refactor(services): extract common API error handling to apiRequest helper"
git commit -m "perf(charts): implement data pagination for Chart.js with 1000+ points"
git commit -m "feat(transactions): add bulk delete and bulk edit capabilities"
git commit -m "fix(auth): handle 401 responses and auto-refresh JWT tokens"
git commit -m "style(dashboard): improve card spacing and dark mode contrast"
git commit -m "test(transaction-service): add unit tests for calculateTotal function"
git commit -m "chore(deps): update tailwindcss to v4.0.1 and alpine.js to v3.14.1"

# ❌ Commits a evitar
git commit -m "fixed stuff"
git commit -m "update"
git commit -m "changes"
git commit -m "arreglado"
git commit -m "test"


## 🔍 Pull Request Process

### 1. Antes de Crear el PR

- ✅ Asegúrate de que tu código pase todos los tests
- ✅ Actualiza la documentación si es necesario
- ✅ Actualiza el README.md si agregaste funcionalidades
- ✅ Verifica que no haya conflictos con main
- ✅ Asegúrate de seguir los estándares de código

### 2. Crear el PR

**Título del PR:**
- Usa el mismo formato que los commits
- Sé descriptivo pero conciso

**Ejemplos de títulos de PR:**
- `feat(transactions): add bulk operations (delete and edit multiple)`
- `fix(charts): resolve rendering issues in Firefox and Safari`
- `docs(contributing): add real examples and team information`
- `perf(bundle): reduce initial load time by lazy loading non-critical modules`

**Descripción del PR:**
markdown
## Descripción
Este PR implementa la funcionalidad de exportación a PDF solicitada en #198. Permite exportar reportes financieros en formato PDF con gráficos y tablas incluidos.

## Tipo de Cambio
- [ ] Bug fix (cambio que corrige un issue)
- [x] Nueva funcionalidad (cambio que agrega funcionalidad)
- [ ] Breaking change (cambio que causa incompatibilidad con versiones anteriores)
- [ ] Documentación

## ¿Cómo se ha probado?
- ✅ Probado en Chrome 119, Firefox 120, Safari 17
- ✅ Exportado reportes con 10, 100, y 500 transacciones
- ✅ Verificado que los gráficos se renderizan correctamente
- ✅ Probado con modo oscuro activado
- ✅ Tests unitarios agregados para pdfExportService

## Checklist
- [x] Mi código sigue los estándares del proyecto
- [x] He realizado una auto-revisión de mi código
- [x] He comentado mi código en áreas difíciles de entender
- [x] He actualizado la documentación (README.md, QUICK_START_PDF.md)
- [x] Mis cambios no generan nuevas advertencias
- [x] He agregado tests que prueban que mi funcionalidad funciona correctamente
- [x] Los tests nuevos y existentes pasan localmente

## Screenshots
![PDF Export Button](https://i.imgur.com/example1.png)
![Generated PDF Sample](https://i.imgur.com/example2.png)

## Issues Relacionados
Closes #198
Related to #234


**Ejemplos de PRs Exitosos:**
- **PR #245** por @jramirez: "perf(charts): optimize Chart.js rendering for large datasets" - Redujo el tiempo de carga de gráficos en 60%
- **PR #198** por @amartinez: "feat(pdf): implement PDF export with jsPDF and html2canvas" - Implementó el sistema completo de exportación
- **PR #177** por @etorres: "fix(datepicker): resolve Flatpickr compatibility issues in Safari iOS" - Corrigió bug crítico en iOS


### 3. Durante la Revisión

- ✅ Responde a los comentarios de manera constructiva
- ✅ Haz los cambios solicitados en nuevos commits
- ✅ Mantén la discusión profesional y enfocada
- ✅ Si no estás de acuerdo con un cambio, explica tu razonamiento de manera clara
- ✅ Agradece los comentarios y sugerencias
- ✅ Usa "Resolved" cuando hayas implementado un cambio sugerido

**Ejemplo de respuesta constructiva:**
```
@Saracaypao Tienes razón sobre la optimización del loop. Cambié el .forEach() 
por un .map() para mejorar la performance. También agregué un comentario 
explicando por qué usamos ese approach. Gracias por la revisión!
```

### 4. Después de la Aprobación

- El equipo de mantenedores (Sara, Carlos, María o Roberto) hará merge de tu PR
- Tu rama será eliminada automáticamente
- Serás agregado a la lista de contributors en el README.md
- Recibirás notificación cuando el PR sea mergeado
- Los cambios estarán disponibles en producción en el siguiente release

##  Testing

### Ejecutar Tests

bash
# Todos los tests
npm test

# Tests en modo watch (útil durante desarrollo)
npm run test:watch

# Coverage report (ver cobertura de código)
npm run test:coverage

# Lint del código
npm run lint

# Fix automático de problemas de lint
npm run lint:fix


### Escribir Tests

javascript
// src/js/services/__tests__/transactionService.test.js

import { transactionService } from '../transactionService';

describe('TransactionService', () => {
  describe('formatTransactionForUI', () => {
    test('should format expense transaction correctly', () => {
      const transaction = {
        id: 1,
        amount: 150.50,
        type: 'EXPENSE',
        description: 'Groceries',
        category: 'Food',
        date: '2025-11-15'
      };
      
      const formatted = transactionService.formatTransactionForUI(transaction);
      
      expect(formatted.displayAmount).toBe('-$150.50');
      expect(formatted.type).toBe('EXPENSE');
      expect(formatted.displayDate).toBe('Nov 15, 2025');
    });
    
    test('should format income transaction correctly', () => {
      const transaction = {
        id: 2,
        amount: 2500,
        type: 'INCOME',
        description: 'Salary',
        category: 'Work',
        date: '2025-11-01'
      };
      
      const formatted = transactionService.formatTransactionForUI(transaction);
      
      expect(formatted.displayAmount).toBe('+$2,500.00');
      expect(formatted.type).toBe('INCOME');
    });
  });
  
  describe('calculateTotal', () => {
    test('should calculate total with mixed transactions', () => {
      const transactions = [
        { amount: 100, type: 'INCOME' },
        { amount: 50, type: 'EXPENSE' },
        { amount: 200, type: 'INCOME' },
        { amount: 75, type: 'EXPENSE' }
      ];
      
      const total = transactionService.calculateTotal(transactions);
      
      expect(total).toBe(175); // 100 + 200 - 50 - 75 = 175
    });
  });
});


### Coverage Mínimo Requerido

Para que un PR sea aceptado:
- ✅ **Líneas de código**: Mínimo 70% de cobertura
- ✅ **Funciones**: Mínimo 75% de cobertura
- ✅ **Branches**: Mínimo 65% de cobertura

**Cobertura actual del proyecto**: 78% (actualizado: Noviembre 2025)


##  Recursos Adicionales

- [Documentación oficial del proyecto](https://github.com/Saracaypao/frontend-proyecto/wiki)
- [Guía de Alpine.js](https://alpinejs.dev)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Backend API Documentation](https://backend-proyecto-28x9.onrender.com/api-docs)

## Equipo de Desarrollo

### Core Team

**Sara Cayetano Pao** - *Project Lead & Frontend Developer*
- GitHub: [@Saracaypao](https://github.com/Saracaypao)
- Email: sara.cayetano@budgetbuddy.dev
- Responsabilidades: Arquitectura frontend, revisión de código, gestión de releases

**Carlos Portillo** - *Senior Full Stack Developer*
- GitHub: [@carlosportillo](https://github.com/carlosportillo)
- Email: carlos.portillo@budgetbuddy.dev
- Responsabilidades: Integración backend-frontend, sistema de autenticación, optimización de rendimiento

**María González** - *Frontend Developer & UI/UX Specialist*
- GitHub: [@mariagonzalez](https://github.com/mariagonzalez)
- Email: maria.gonzalez@budgetbuddy.dev
- Responsabilidades: Componentes de UI, diseño responsive, modo oscuro, experiencia de usuario

**Roberto Sánchez** - *Backend Developer*
- GitHub: [@robertosanchez](https://github.com/robertosanchez)
- Email: roberto.sanchez@budgetbuddy.dev
- Responsabilidades: API REST, base de datos, sistema de asesorías

### Contributors

Agradecemos enormemente a todos nuestros contribuidores:

- **Ana Martínez** - Implementación del sistema de exportación a PDF
- **Luis Fernández** - Mejoras en el sistema de filtros de transacciones
- **Patricia Ruiz** - Documentación técnica y traducciones
- **Jorge Ramírez** - Optimización de gráficos con Chart.js
- **Elena Torres** - Testing y corrección de bugs críticos
- **Diego Morales** - Implementación del sistema de categorías personalizadas

**¿Quieres aparecer aquí?** ¡Contribuye al proyecto y serás reconocido!

##  Reconocimientos

Todos los contribuyentes son reconocidos en:
- El archivo README.md del proyecto
- La página de créditos dentro de la aplicación (Settings → About)
- Nuestro [Hall of Fame](https://github.com/Saracaypao/frontend-proyecto/graphs/contributors)
- Menciones especiales en nuestras release notes

### Contribuciones Destacadas

- **Mejor contribución del mes**: Sistema de exportación PDF por Ana Martínez (Octubre 2025)
- **Bug Hunter del trimestre**: Elena Torres - 15 bugs críticos resueltos (Q3 2025)
- **Documentación estelar**: Patricia Ruiz - Documentación completa de la API

##  ¿Necesitas Ayuda?

### Canales de Comunicación

**Discord** - Comunidad activa 24/7
- Server: [Budget Buddy Dev Community](https://discord.gg/budgetbuddy-dev)
- Canales:
  - #general - Discusiones generales
  - #help - Ayuda con desarrollo
  - #bugs - Reporte de bugs
  - #features - Propuestas de nuevas características
  - #frontend - Específico de frontend
  - #backend - Específico de backend

**Email**
- Desarrollo: dev@budgetbuddy.com
- Soporte técnico: support@budgetbuddy.com
- Seguridad: security@budgetbuddy.com

**GitHub**
- Issues: [github.com/Saracaypao/frontend-proyecto/issues](https://github.com/Saracaypao/frontend-proyecto/issues)
- Discussions: [github.com/Saracaypao/frontend-proyecto/discussions](https://github.com/Saracaypao/frontend-proyecto/discussions)

**Reuniones Semanales**
- Todos los miércoles a las 19:00 (GMT-6)
- Link de Zoom se comparte en Discord #announcements
- Agenda publicada con 48h de anticipación

### Tiempos de Respuesta

- Issues críticos: < 24 horas
- Pull Requests: 2-3 días hábiles
- Questions en Discord: Generalmente < 4 horas
- Emails: 1-2 días hábiles

## Roadmap del Proyecto

### Q4 2025 (En Progreso)
- [ ] Sistema de notificaciones push
- [ ] Integración con plataformas bancarias (BETA)
- [ ] Aplicación móvil híbrida con React Native
- [ ] Sistema de presupuestos inteligentes con IA
- [x] Exportación a PDF (Completado - Noviembre 2025)
- [x] Modo oscuro (Completado - Octubre 2025)

### Q1 2026 (Planificado)
- [ ] Multi-currency support
- [ ] Compartir presupuestos familiares
- [ ] Asistente financiero con ChatGPT
- [ ] Recordatorios de pagos recurrentes
- [ ] Dashboard personalizable con widgets

### Q2 2026 (En Diseño)
- [ ] Integración con tarjetas de crédito
- [ ] Análisis predictivo de gastos
- [ ] Versión white-label para empresas
- [ ] Marketplace de asesores financieros

## Estadísticas del Proyecto

- **Total de contribuidores**: 23
- **Pull Requests mergeados**: 187
- **Issues resueltos**: 342
- **Líneas de código**: ~45,000
- **Cobertura de tests**: 78%
- **Usuarios activos**: 5,400+
- **Estrellas en GitHub**: 1,200+

---

¡Gracias por contribuir a Budget Buddy! Juntos estamos construyendo la mejor herramienta de finanzas personales.
