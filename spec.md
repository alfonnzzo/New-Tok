# Especificación de Producto (SPEC) - Proyecto "NewTok"

## 1. Descripción General
"NewTok" es una aplicación móvil diseñada como un clon funcional de las mecánicas principales de TikTok. El objetivo de este proyecto es replicar la experiencia de usuario (UX) y la interfaz de usuario (UI) de consumo de videos cortos, implementando un flujo mixto que permite el consumo pasivo sin registro y requiere autenticación para la interacción social.

**Restricción arquitectónica clave:** el proyecto opera de forma 100% "serverless" (sin backend real). Toda la persistencia de datos (cuentas de usuario, comentarios, nuevos videos) se simula utilizando `AsyncStorage` y archivos JSON estáticos servidos por funciones mock con latencia artificial (500–1000 ms).

## 2. Flujo Principal del Usuario (User Journey)
1. **Consumo pasivo (modo anónimo):** al abrir la app, el usuario aterriza en "Inicio" y puede scrollear infinitamente un feed de videos simulados (JSON).
2. **Muro de fricción:** si el usuario anónimo intenta una acción social (like, comentar, entrar a la bandeja, publicar), la app despliega el modal de Registro/Login.
3. **Autenticación simulada:** el usuario ingresa usuario y contraseña, validados en el formulario. Se guardan en `AsyncStorage`. Desde ese momento la app lo reconoce como "Usuario Logueado".
4. **Interacción total:** el usuario logueado comenta, revisa su bandeja, chatea y publica un video simulado.

## 3. Interfaces y Pantallas (UI/UX)
Al menos 7 interfaces, orquestadas con Tab Navigation + stack + modales (`expo-router`):

1. **Inicio (Feed):** pantalla completa con scroll vertical. Video, botones flotantes (Like, Comentar, Compartir, Perfil del creador) e info del autor.
2. **Detalle de Video** *(listado → detalle, requisito mínimo del prototipo)*: se accede tocando una miniatura en la grilla de "Mi Perfil". Muestra el video ampliado, descripción completa, contador de likes/comentarios y fecha simulada de publicación.
3. **Panel de Comentarios (Bottom Sheet/Modal):** se superpone al video actual. Lista de comentarios + input para agregar uno nuevo.
4. **Bandeja de Entrada (Inbox):** lista de notificaciones simuladas ("A Usuario123 le gustó tu video", "Nuevos seguidores").
5. **Mensajes Directos (Chat):** mensajería uno a uno. Historial con un usuario simulado, mensajes de texto persistidos localmente.
6. **Publicar Video:** formulario de alta de contenido (ver criterios de validación en 4.6). Simula cámara/galería y guarda un registro local visible en el perfil.
7. **Perfil / Configuración de Cuenta:** datos del usuario registrado, grilla de sus videos publicados, botón de cerrar sesión (borra `AsyncStorage`).

## 4. Historias de Usuario y Criterios de Aceptación

### 4.1 Consumo anónimo
**Como** usuario anónimo, **quiero** scrollear videos al abrir la app **para** entretenerme sin crear una cuenta.
- Dado que no hay sesión activa, al abrir la app se muestra el feed sin pedir login.
- Mientras el mock resuelve la primera carga, se muestra un estado de carga (spinner/skeleton).
- Si el mock devuelve una lista vacía, se muestra un estado vacío con mensaje ("No hay videos disponibles").

### 4.2 Muro de fricción
**Como** usuario anónimo, **quiero** que la app me pida registrarme si intento comentar o dar like **para** entender que necesito una cuenta para interactuar.
- Tocar Like, Comentar, Bandeja o Publicar sin sesión abre el modal de Registro/Login en vez de ejecutar la acción.
- Cerrar el modal sin loguearse deja al usuario en el mismo punto del feed, sin cambios de estado.

### 4.3 Registro/Login con validación
**Como** usuario, **quiero** registrarme guardando mis datos en el dispositivo **para** simular una cuenta real sin depender de internet.
- Campo usuario: obligatorio, mínimo 3 caracteres.
- Campo contraseña: obligatorio, mínimo 6 caracteres.
- Si algún campo no cumple, se muestra un error inline y el botón "Ingresar" no envía el formulario.
- Al validar OK, se guarda el usuario en `AsyncStorage` y la sesión persiste si se recarga la app.

### 4.4 Comentarios
**Como** usuario logueado, **quiero** escribir un comentario en un video y que se guarde localmente **para** verlo cada vez que abra ese video.
- El input de comentario no permite enviar texto vacío.
- Al enviar, el comentario aparece de inmediato en la lista (persistencia local, no hace falta recargar).

### 4.5 Bandeja e interacción social
**Como** usuario logueado, **quiero** acceder a mi bandeja de entrada y mensajes **para** simular la interacción con otras personas.
- La bandeja muestra notificaciones mock; si no hay ninguna, muestra estado vacío.
- El chat muestra historial mock y permite enviar mensajes que persisten localmente en la sesión.

### 4.6 Publicar video (formulario con validación)
**Como** usuario logueado, **quiero** completar un formulario para publicar un video simulado **para** verlo reflejado en mi perfil.
- Campo descripción: obligatorio, mínimo 5 caracteres, máximo 150.
- Selección de miniatura/imagen simulada: obligatoria (mock picker, no cámara real).
- El botón "Publicar" está deshabilitado hasta que el formulario sea válido.
- Al publicar, se simula una carga (spinner ~2s) y el nuevo video aparece en la grilla del perfil.

## 5. Fuera de Alcance
Explícitamente **no** forma parte de este prototipo:
- Backend real, API o base de datos remota.
- Autenticación real (OAuth, verificación de email, recuperación de contraseña).
- Subida real de archivos de video o acceso a cámara/galería del dispositivo.
- Reproducción de video real (se simula con imagen/placeholder si no hay archivo de video).
- Algoritmo de recomendación, seguidores reales o interacción entre usuarios distintos al usuario local.
- Notificaciones push reales.
- Edición de video o de comentarios/mensajes ya enviados.
- Múltiples cuentas simultáneas o cambio de cuenta.
- Compartir contenido a redes sociales externas.
