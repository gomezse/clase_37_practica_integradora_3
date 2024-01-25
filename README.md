# **Práctica Integradora 3 **.
> [!IMPORTANT]
> Sigue en proceso de desarrollo, tarea aun no finalizada.

>[!TIP]
>En el Readme se encuentran los endpoint a ejecutar dependendiendo el modo de environment elegido.

# nodemon src/app.js -m=production 
# nodemon src/app.js -m=development 



## Archivos Involucrados en el entregable:

- En el archivo products.router.js se dio permiso al rol "PREMIUM" para que también pueda realizar la carga de productos.
"router.post("/",authMiddleware("ADMIN,PREMIUM"),productController.addProduct)"

* Se creó el archivo resetToken con el fin de controlar la expiracion del mismo a la hora de enviar el email.
* Se agregó en user.model.js el campo resetToken
* Se agregó el boton para reestablecer contraseña en el handlebars "profile.handlebars"
