# Plan Técnico - Proyecto "NewTok"

Traduce la spec (`spec.md`) al "cómo": estructura de carpetas, modelos de datos y navegación. No incluye código, solo el diseño técnico que las tareas de `tasks.md` van a implementar.

## 1. Arquitectura de Carpetas
```
/app                        # expo-router, ruteo por archivos
  _layout.tsx                # Tabs raíz: Inicio, Bandeja, Perfil
  index.tsx                  # Feed (Inicio)
  video/[id].tsx              # Detalle de video
  inbox.tsx                   # Bandeja de entrada
  chat/[id].tsx               # Chat 1 a 1
  profile.tsx                 # Perfil / configuración
  publish.tsx                  # Modal: formulario de publicar video
  auth.tsx                     # Modal: Registro/Login
/components
  VideoCard.tsx               # Item del feed con botones flotantes
  CommentSheet.tsx            # Bottom sheet de comentarios
  EmptyState.tsx              # Estado vacío reutilizable
  LoadingState.tsx            # Spinner/skeleton reutilizable
  FormField.tsx                # Input con validación y mensaje de error
/hooks
  useAuth.ts                  # Consume AuthContext
  useVideos.ts                 # Fetch mock de videos + estado loading/empty
  useComments.ts               # Fetch/alta de comentarios de un video
  useMessages.ts                # Fetch/alta de mensajes de un chat
/context
  AuthContext.tsx              # Estado global de sesión (login/logout, AsyncStorage)
/mocks
  data/videos.json
  data/notifications.json
  data/messages.json
  services/videoService.ts     # getVideos(), addVideo() -> Promise + setTimeout 500-1000ms
  services/commentService.ts   # getComments(videoId), addComment()
  services/authService.ts      # login(), logout(), getSession() -> AsyncStorage
  services/messageService.ts   # getMessages(chatId), sendMessage()
```

**Regla:** todo mock vive bajo `/mocks`, expone funciones `async` que devuelven una `Promise` resuelta tras 500–1000 ms. El día que exista backend real, solo se reemplaza esa capa.

## 2. Modelos de Datos (mocks)
```ts
Video {
  id: string
  url: string            // imagen/placeholder simulando el video
  autor: string
  likes: number
  descripcion: string
  comentarios: Comment[]
  fecha: string
}

Comment {
  id: string
  videoId: string
  usuario: string
  texto: string
  fecha: string
}

User {
  usuario: string
  password: string       // solo local, sin hashing (prototipo)
  videosPublicados: string[]  // ids de Video
}

Notification {
  id: string
  tipo: 'like' | 'comentario' | 'seguidor'
  texto: string
  fecha: string
}

Message {
  id: string
  chatId: string
  emisor: 'yo' | 'otro'
  texto: string
  fecha: string
}
```

## 3. Flujo de Navegación
- **Tabs (raíz):** Inicio · Bandeja · Perfil.
- **Inicio → Detalle de Video:** stack push al tocar una miniatura del perfil (no desde el feed directamente, el feed ya es pantalla completa).
- **Inicio → Comentarios:** modal/bottom sheet sobre el feed.
- **Cualquier acción social sin sesión → Auth modal:** login/registro, vuelve a la pantalla de origen al loguearse.
- **Bandeja → Chat:** stack push al tocar una notificación de tipo mensaje o un chat existente.
- **Perfil → Publicar:** modal con el formulario de alta de video; al confirmar, vuelve a Perfil con el nuevo item en la grilla.

## 4. Componentes Reutilizables
- `EmptyState` y `LoadingState` se usan en Feed, Bandeja y Chat (mismo patrón de carga/vacío en los tres).
- `FormField` centraliza validación + mensaje de error, se usa en Auth y en Publicar.

## 5. Validación Humana
Este plan requiere aprobación antes de generar/ejecutar `tasks.md` en detalle (regla del flujo SDD en `AGENTS.md`).
