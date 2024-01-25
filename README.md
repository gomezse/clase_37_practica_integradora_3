# **Implementación de Logger**.
> [!IMPORTANT]
> Utilizar los comandos de nodemon brindados para ejecutar la aplicacion en modo produccion o desarrollo, con el fin de agilizar configuraciones.

>[!TIP]
>En el Readme se encuentran los endpoint a ejecutar dependendiendo el modo de environment elegido.
>En el Readme también se encuentran los archivos involucrados en este entregable para ser consultados en caso de ser necesario.

Al iniciar la aplicacion, para probar los logger respecto a "production" o "development" , valerse de las siguientes sentencias para utilizar Commander y 
setear los valores en el proceso de inicio de la app.(definido en utils/process.js)

# nodemon src/app.js -m=production 
# nodemon src/app.js -m=development 


## Endpoints de prueba de logger:

- Produccion -> http://localhost:8080/loggerTest
(recordar que produccion ademas de loggear por consola también loggea en el archivo errors.log)

- Desarrollo -> http://localhost:8084/loggerTest

## Archivos Involucrados:

- Configuracion de logger : utils/logger.js
* Variable de entorno environment: .env.development y .env.production (dependendiendo el modo en que se inicie la app, será su valor)
+ Ruta de endpoint para probar el logger: routing/views.router.js  -> loggerTest
- Controller involucrado en el logger: controllers/view.controller.js -> loggerTest
- **Controller en el que se implementó logger : controllers/cart.controller.js¨** (se implementaron logs de info,error y fatal en los endpoints)

