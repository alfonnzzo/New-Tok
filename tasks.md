# Lista de Tareas y Auditoría (TASKS) - Proyecto "NewTok"

## Auditoría del Plan de Trabajo

Antes de iniciar la codificación, auditamos esta lista respondiendo tres preguntas clave:

1. **¿Es atómica?** Sí. Cada tarea afecta una sola funcionalidad y un conjunto acotado de archivos.
2. **¿Está en el orden correcto?** Sí. Se construye de "afuera hacia adentro": primero navegación base, luego UI estática, después datos mock, y por último la interacción entre ambas (auth, validación, formularios).
3. **¿Cómo verifico que quedó terminada?** Cada tarea tiene un criterio de verificación que se prueba manualmente en Expo Go antes de avanzar a la siguiente.

---

## Tareas de Implementación (Checklist)

### Fase 1: Esqueleto y Navegación

- [X] **Tarea 1: Configurar Expo Router y Tabs base.**
  - Acción: instalar dependencias necesarias. Configurar `app/_layout.tsx` con `Tabs` (Inicio, Bandeja, Perfil).
  - Verificación: al escanear el QR en Expo Go, la app abre sin errores y muestra las tres pestañas vacías; navegar entre ellas cambia de pantalla.

### Fase 2: Consumo Pasivo (Modo Anónimo)

- [X] **Tarea 2: Crear mock de datos de videos.**
  - Acción: crear `/mocks/data/videos.json` (5 objetos: id, url, autor, likes, descripcion, comentarios, fecha) y `/mocks/services/videoService.ts` con `getVideos()` como `Promise` + `setTimeout` (500–1000 ms).
  - Verificación: el servicio importado en un componente de prueba resuelve el array tras el delay simulado.
- [ ] **Tarea 3: Implementar UI del Feed con estados de carga y vacío.**
  - Acción: crear `FeedScreen` (`app/index.tsx`) con `FlatList` (`pagingEnabled`) a pantalla completa. Mientras `getVideos()` no resuelve, mostrar `LoadingState`; si el array es vacío, mostrar `EmptyState`.
  - Verificación: en Expo Go se ve el spinner brevemente y luego el swipe vertical entre videos; forzando un mock vacío se ve el mensaje de estado vacío.
- [ ] **Tarea 4: Manejo de errores en la carga de datos.**
  - Acción: agregar a los servicios mock una forma de simular fallas (constante `SIMULAR_ERROR` que hace que la promesa se rechace). Crear `ErrorState` (mensaje + botón "Reintentar") y usarlo en el Feed: si `getVideos()` rechaza, mostrar el error en vez de la lista; "Reintentar" vuelve a llamar al servicio.
  - Verificación: activando `SIMULAR_ERROR` el feed muestra el mensaje de error con el botón; al desactivarlo y tocar "Reintentar", se ve el spinner y luego los videos.
- [ ] **Tarea 5: Botones flotantes del feed.**
  - Acción: agregar botones (Like, Comentar, Compartir, Perfil del creador) superpuestos con `position: 'absolute'`.
  - Verificación: los botones son visibles sobre el video y no rompen el layout en distintos tamaños de pantalla (aún no ejecutan acción).

### Fase 3: Autenticación Simulada (El Muro de Fricción)

- [ ] **Tarea 6: Contexto de Auth y AsyncStorage.**
  - Acción: crear `AuthContext` (Context API) con `login(usuario, password)` y `logout()`, persistiendo la sesión en `AsyncStorage`.
  - Verificación: al loguear con un usuario de prueba y recargar la app en Expo Go, la sesión sigue activa.
- [ ] **Tarea 7: Formulario de Registro/Login con validación.**
  - Acción: crear el modal `app/auth.tsx` con `FormField` para usuario (mín. 3 caracteres) y contraseña (mín. 6 caracteres). Botón "Ingresar" deshabilitado si hay errores.
  - Verificación: dejar un campo inválido muestra el error inline y no envía; completar ambos campos válidos cierra el modal y actualiza el estado global a "Logueado".
- [ ] **Tarea 8: Integrar fricción en los botones del feed.**
  - Acción: modificar los botones de la Tarea 5: sin sesión, "Me gusta"/"Comentar" abren el modal de Auth (Tarea 7) en vez de ejecutar la acción.
  - Verificación: (Anónimo) toca "Me gusta" → abre modal. (Logueado) toca "Me gusta" → el ícono cambia a rojo, sin abrir el modal.

### Fase 4: Interacción Social y Almacenamiento Local

- [ ] **Tarea 9: Panel de Comentarios.**
  - Acción: crear `CommentSheet` (bottom sheet/modal). Cargar comentarios mock vía `commentService.getComments()`. Permitir que el usuario logueado agregue un comentario (no vacío).
  - Verificación: tocar "Comentar" abre el panel; escribir y enviar agrega el comentario a la lista al instante; intentar enviar vacío no hace nada.
- [ ] **Tarea 10: Bandeja de Entrada (Inbox) con estados de carga, vacío y error.**
  - Acción: construir la lista de notificaciones mock en `app/inbox.tsx`, reutilizando `LoadingState`/`EmptyState`/`ErrorState` igual que el Feed.
  - Verificación: la pestaña Bandeja muestra las notificaciones simuladas; con el mock vacío muestra el estado vacío y con `SIMULAR_ERROR` activo muestra el error con "Reintentar".
- [ ] **Tarea 11: Chat 1 a 1.**
  - Acción: crear `app/chat/[id].tsx` con historial mock (`messageService.getMessages`) e input para enviar mensajes que persisten en la sesión.
  - Verificación: desde Bandeja se navega a un chat, se ve el historial simulado y se pueden enviar mensajes nuevos que quedan en la lista.

### Fase 5: Publicación, Detalle y Perfil

- [ ] **Tarea 12: Pantalla de Perfil.**
  - Acción: construir `app/profile.tsx` mostrando el usuario activo (`AsyncStorage`) y una grilla de sus videos publicados. Botón "Cerrar sesión".
  - Verificación: el perfil refleja el usuario logueado; "Cerrar sesión" borra `AsyncStorage` y vuelve al modo anónimo.
- [ ] **Tarea 13: Pantalla de Detalle de Video (listado → detalle).**
  - Acción: crear `app/video/[id].tsx`. Al tocar una miniatura en la grilla del perfil, navegar a esta pantalla con el video ampliado, descripción completa, contador de likes/comentarios y fecha.
  - Verificación: tocar un video del perfil abre el detalle con la info completa; volver atrás regresa a la grilla.
- [ ] **Tarea 14: Formulario de Publicar Video con validación.**
  - Acción: crear `app/publish.tsx` con `FormField` para descripción (obligatoria, 5–150 caracteres) y selección de miniatura simulada (obligatoria, mock picker). Botón "Publicar" deshabilitado hasta que el formulario sea válido; al confirmar, simular carga (~2s) y agregar el video al perfil.
  - Verificación: intentar publicar sin descripción o sin miniatura mantiene el botón deshabilitado; completando ambos campos, tocar "Publicar" muestra el spinner y el nuevo video aparece en la grilla del perfil.
