# Flores amarillas para Hellen 🌼

Una carta interactiva para el 21 de septiembre: Hellen toca un sobre, se abre la carta y florece un ramo de girasoles amarillos con una dedicatoria.

Sitio estático en HTML, CSS y JavaScript. No necesita instalación, compilación, claves ni servidor de aplicación. Incluye diseño adaptable a celulares, controles por teclado y respeto por la preferencia de reducir movimiento.

## Personalizar

Edita **`dedicatoria.js`** para cambiar el nombre, los párrafos, el cierre y la firma. La firma inicial es «La persona que siempre piensa en ti»; puedes sustituirla por tu nombre. Mantén las comillas y comas del archivo.

## Ver en tu computadora

Abre `index.html` en el navegador. También puedes ejecutar desde esta carpeta:

```sh
python -m http.server 8000
```

Después visita `http://localhost:8000`. Las flores se dibujan localmente con SVG; las tipografías se cargan desde Google Fonts, con fuentes alternativas si no hay conexión.

## Publicar en GitHub Pages

1. Sube esta carpeta a tu repositorio de GitHub, incluyendo `.github/workflows/pages.yml`.
2. En el repositorio, abre **Settings → Pages**.
3. En **Build and deployment → Source**, selecciona **GitHub Actions**.
4. Sube un cambio a `main` o `master`, o entra a **Actions → Publicar sorpresa en GitHub Pages → Run workflow** y ejecuta el flujo sobre tu rama principal.
5. Cuando termine, encontrarás el enlace en **Settings → Pages**. Normalmente será `https://TU-USUARIO.github.io/FloresAmarillas/`.

Comparte ese enlace con Hellen. La sorpresa se puede abrir cualquier día: no tiene bloqueo por fecha. Cada visita comienza con el sobre cerrado.

El flujo publica únicamente los archivos de la página. No incluye este README. Los textos publicados serán visibles para cualquier persona que tenga acceso al sitio.

## Archivos

```text
FloresAmarillas/
├── index.html                  # Sobre, ramo y carta
├── styles.css                  # Diseño y animaciones
├── script.js                   # Flores SVG e interacción
├── dedicatoria.js               # Textos personalizables
├── assets/
│   └── favicon.svg
├── .github/workflows/pages.yml # Publicación automática
├── .nojekyll
└── README.md
```
