# Aventuras Interactivas JI9

Aventuras Interactivas JI9 es una aplicación web desarrollada como parte del TFG del ciclo de Desarrollo de Aplicaciones Web.  
El proyecto permite a los usuarios jugar aventuras conversacionales interactivas, tomar decisiones, avanzar por escenas y compartir sus resultados.

Incluye:

- Frontend en React  
- Backend en Spring Boot  
- Base de datos MySQL  
- Sistema de autenticación con JWT  
- Panel de administración completo (CRUD de aventuras, escenas, opciones y usuarios)

---

## Tecnologías utilizadas

### Frontend
- React 18  
- React Router  
- Axios  
- Bootstrap 5  
- Context API (AuthContext)  
- Vite como bundler  

### Backend
- Spring Boot 3  
- Spring Security + JWT  
- Spring Data JPA  
- MySQL  
- Swagger (documentación de API)

### Infraestructura
- Render (backend)  
- Aiven (MySQL en la nube)  
- Netlify / Vercel (frontend)

---

## Estructura del proyecto (Frontend)

```
PROYECTO-DESARROLLO-DE-APLICACIONES-WEB/
│
├── src/
│   ├── api/
│   │   └── axiosConfig.js
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Footer.jsx
│   │   │   ├── Header.jsx
│   │   └── ProtectedRoute.jsx
│   │
│   ├── context/
│   │   └── AuthContext.jsx
│   │
│   ├── hooks/
│   │   └── useAuth.js
│   │
│   ├── pages/
│   │   ├── admin/
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── AdventureForm.jsx
│   │   │   ├── AdventureList.jsx
│   │   │   ├── SceneForm.jsx
│   │   │   ├── SceneList.jsx
│   │   │   ├── OptionForm.jsx
│   │   │   ├── OptionList.jsx
│   │   │   ├── UserForm.jsx
│   │   │   └── UserList.jsx
│   │   │
│   │   ├── AdventuresListPage.jsx
│   │   ├── AdventureStartPage.jsx
│   │   ├── HomePage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── ProfilePage.jsx
│   │   ├── RegisterPage.jsx
│   │   └── ScenePage.jsx
│   │
│   ├── router/
│   │   └── AppRouter.jsx
│   │
│   ├── services/
│   │   ├── adventureService.js
│   │   ├── apiClient.js
│   │   ├── authService.js
│   │   ├── OptionService.js
│   │   └── progressService.js
│   │
│   ├── styles/
│   │   ├── adminPages.css
│   │   ├── components.css
│   │   ├── layout.css
│   │   └── theme.css
│   │
│   ├── utils/
│   │   └── logoutAndRedirect.js
│   │
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   ├── index.jsx
│   └── main.jsx
│
├── .gitignore
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
└── vite.config.js
```


---

## Instalación y ejecución en local

### 1. Clonar el repositorio

```
git clone https://github.com/JesMM9/Proyecto-Desarrollo-de-aplicaciones-web.git
cd Proyecto-Desarrollo-de-aplicaciones-web
```

### 2. Instalar dependencias

```
npm install
```

La aplicación estará disponible en:

(Me falta desplegarla)

---

## Autenticación

El sistema utiliza JWT:

- Login → recibe token  
- El token se guarda en localStorage  
- Axios lo envía automáticamente  
- Rutas protegidas mediante AuthContext  
- Rutas admin protegidas por rol ADMIN  

---

## Funcionalidades principales

### Usuarios
- Login  
- Roles: USER / ADMIN  
- Panel admin para editar rol y contraseña  

### Aventuras
- CRUD completo  
- Imagen de portada  
- Descripción  
- Fecha de creación  

### Escenas
- Texto descriptivo  
- Imagen
- Finales (B, M)
- Asociación a una aventura  

### Opciones
- Texto de la opción  
- Texto de muerte opcional  
- Escena origen  
- Escena destino  
- Correcta / incorrecta  

### Juego
- Avance por escenas  
- Decisiones del jugador  
- Finales de victoria o derrota  

---

## Validaciones en formularios

Todos los formularios incluyen validaciones:

- Longitud mínima  
- Campos obligatorios  
- Validación de URL  
- Contraseñas seguras  
- Selects obligatorios  
- Mensajes de error visibles  

---

## Despliegue

### Backend
- Render
- MySQL en Aiven

### Frontend (React)
- Vercel

---

## Autor

Jesús Morilla Martínez
Desarrollador de Aplicaciones Web  
Brenes (Sevilla), Andalucía
