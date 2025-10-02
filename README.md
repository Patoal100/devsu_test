# devsu_test
desarrollado como parte de una evaluación técnica. Incluye pruebas E2E con Cypress para el flujo de compra en SauceDemo y pruebas de APIs usando la API pública de PetStore.

# Test – Automatización E2E y API con Cypress (SauceDemo, Petstore)

## Objetivo de la prueba E2E

Validar que un usuario pueda:

1. Iniciar sesión correctamente con credenciales válidas.  
2. Agregar productos al carrito.  
3. Visualizar el carrito con los productos seleccionados.  
4. Completar el formulario de checkout.  
5. Finalizar la compra verificando el mensaje **“Thank you for your order”**.

## Objetivo de la prueba API

Validar que las rutas puedan:

1. Añadir una mascota a la tienda  
2. Consultar la mascota ingresada previamente (Busqueda por ID)  
3. Actualizar el nombre de la mascota y el status de la mascota a "sold"  
4. Consultar la mascota modificada por estatus (Busqueda por estatus)  
---

## Requisitos

- **Node.js 20+**
- **npm**
- **Google Chrome** (última versión)
- **Cypress 15+**

> **Nota:** El archivo de configuración usa CommonJS (`cypress.config.cjs`) para asegurar compatibilidad con Node 20.

---

## Estructura del proyecto

```
devsu_test/
├── cypress/
│   └── e2e/
│       └── saucedemo.cy.js 
│       └── petstore.cy.js 
├── cypress.config.cjs
├── package.json
├── README.md
└── conclusiones.txt
```

---

## Instalación

1. Clona o descarga el proyecto:
   ```bash
   git clone git@github.com:Patoal100/devsu_test.git
   cd devsu_test
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

---

## Ejecución de pruebas

### Modo gráfico (GUI)
Abre el **Cypress Test Runner** para ejecutar los tests paso a paso:

```bash
npm run cy:open
```

Selecciona el archivo `saucedemo.cy.js` y observa la ejecución visual dentro del navegador.

---

### Modo consola (Headless)
Ejecuta el test sin abrir interfaz, ideal para pipelines o entregas automáticas:

```bash
npm run cy:headless
```

---

### Modo consola con Chrome visible
```bash
npm run cy:run
```

### Correr individualmente las pruebas
```bash
npm run cy:ui
npm run cy:api
```

---

## Qué valida este test

- Login con `standard_user / secret_sauce`
- Agregar dos productos al carrito
- Verificar productos en el carrito
- Completar checkout con datos de prueba
- Confirmar mensaje **“Thank you for your order”**
- Silenciar peticiones externas (Backtrace 401)

---

## Solución de problemas

| Problema | Causa | Solución |
|-----------|--------|-----------|
| Cypress no abre | Falta instalación | Ejecuta `npm install` |
| “element not found” | Carga lenta del DOM | Usa `cy.get(selector, { timeout: 10000 })` |
| Errores 401 (Backtrace) | Telemetría externa de SauceDemo | Ya se interceptan y silencian |
| No aparece mensaje final | Espera insuficiente | Agrega `cy.contains('THANK YOU FOR YOUR ORDER', { timeout: 10000 })` |

---

