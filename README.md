  // Casos de error a probar

  1. Errores de Autenticación y Autorización
Dado que métodos como PUT y DELETE suelen requerir tokens de seguridad, debes validar qué sucede cuando estos faltan o son incorrectos

Sin Token (401 Unauthorized): Envía la petición sin el header de autorización o sin la cookie necesaria

Token Inválido o Expirado: Envía un token mal formado o uno que ya haya caducado para asegurar que el sistema rechace el acceso

Permisos Insuficientes (403 Forbidden): Intenta realizar una acción (como borrar un recurso) con un token que pertenezca a un usuario sin permisos de administrador
  
  2. Validación de Datos en el Cuerpo (Payload)
El objetivo es confirmar que la API maneja correctamente los datos mal formados

Campos Obligatorios Ausentes: Envía un JSON al que le falte una propiedad requerida (por ejemplo, el apellido en una reserva) y valida que devuelva un error (usualmente 400 Bad Request)

Tipos de Datos Incorrectos: Envía un número en un campo que espera texto, o un booleano donde se espera un objeto, para verificar la robustez de la validación de esquemas

Cuerpo Vacío: Envía una petición POST o PUT con un cuerpo de datos vacío y verifica la respuesta del servidor

3. Casos de Simulación (Mocking)
Puedes usar las capacidades de Playwright para modificar o simular (mock) respuestas de red sin tocar el servidor real
.
Simular Errores de Servidor (500 Internal Server Error): Puedes interceptar una llamada y forzar una respuesta 500 para probar cómo reacciona tu suite de pruebas o la interfaz ante un fallo crítico del sistema
.
Tiempos de Espera (Timeouts): Simular una respuesta muy lenta para verificar si tu automatización maneja correctamente los tiempos de espera configurados
  
  // Errores por MOCK 

  Para simular errores mediante mocks en Playwright, se utiliza principalmente el método route.fulfill(), el cual permite interceptar peticiones de red y devolver respuestas personalizadas sin que estas lleguen al servidor real, PERO ESTE METODO SOLO APLICA CUANDO UTILIZO PAGE.ROUTE AHI SE INTERCEPTA LA PETICION

  1. Simulación de Error Interno del Servidor (Error 500)
Este es el caso más directo donde interceptas una ruta específica y devuelves un código de estado de fallo crítico.

  2. Simulación de Error de Validación (Error 400)
Útil para probar cómo reacciona la interfaz cuando el usuario envía datos que el "servidor" (mockeado) considera inválido

 3. Simulación mediante archivos HAR (Modificación manual)
Playwright permite grabar tráfico real en un archivo HAR y luego modificarlo para forzar errores en ejecuciones posteriores


  
// Notas importantes 

    A diferencia de los métodos POST o PUT, 
  donde envías la información dentro de un "body" o cuerpo de mensaje, 
  en el método DELETE la identificación del recurso se hace generalmente 
  a través del endpoint o URL POR ESO EL /1, indicando que queremos eliminar la 
  reserva con ID 1.

    