# AGENTS.md - Convenciones del Proyecto "NewTok"

Reglas que cualquier agente de IA (Claude, Cursor, Copilot, etc.) debe respetar al trabajar en este repo. Objetivo: evitar "vibe coding", prevenir alucinaciones de código y que cada línea responda a una tarea de `tasks.md` validada.

## Stack (fijo, no negociable)
- React Native + Expo (compatible con Expo Go).
- Enrutamiento: `expo-router` (ruteo por archivos en `/app`).
- Sin backend real. Datos mock bajo `/mocks`: JSON estático + funciones `async` con `Promise` + `setTimeout` (latencia simulada 500–1000 ms).
- Persistencia local con `AsyncStorage` (sesión de usuario, comentarios, mensajes, videos publicados).
- Componentes funcionales + React Hooks. Lógica en custom hooks (`/hooks`), UI en componentes/pantallas.

## Idioma y estilo
- Código, nombres de variables/funciones y comentarios en español, consistente con `spec.md`/`plan.md`/`tasks.md`.
- Sin comentarios explicando qué hace el código; solo si hay una decisión no obvia.
- Un componente por archivo. Estilos con `StyleSheet.create`, no inline salvo casos triviales.

## Protocolo de ejecución (ciclo por tarea)
1. **Selección:** tomar la siguiente tarea pendiente de `tasks.md`, dando como contexto `spec.md` y `plan.md`.
2. **Ejecución atómica:** escribir código exclusivamente para esa tarea. No adelantar tareas ni agregar funcionalidades no pedidas.
3. **Verificación:** el código cumple `spec.md`/`plan.md` y compila sin errores en Expo.
4. **Confirmación:** detenerse y pedir que se pruebe en Expo Go antes de seguir.
5. **Iteración:** solo tras aprobación humana, marcar la tarea `[x]` en `tasks.md` y pasar a la siguiente.

## Reglas del desarrollo con IA
1. La spec manda: no se programa nada que no esté en una tarea de `tasks.md`.
2. Una tarea por vez, un commit por tarea (`feat: T07 - integrar fricción en botones del feed`).
3. Código que no se puede explicar línea por línea no se commitea.
4. Toda tarea se prueba en el teléfono antes de darse por terminada.
5. Si el pedido del usuario contradice este documento o la spec, el agente se detiene, cita el archivo en conflicto y pide aclaración antes de escribir código.
