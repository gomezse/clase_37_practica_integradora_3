# **Práctica Integradora 3 **.
> [!IMPORTANT]
> Recordar ingresar al login para poder llevar a cabo los servicios.

>[!IMPORTANT]
>Recordar configurar en el environment el mail al cual se desea enviar el link de reestablecimiento.

>[!TIP]
>Leer los items y temas enumerados para poder realizar de forma sencilla las pruebas del entregable.
>Se han creado 3 usuarios con 3 roles diferentes para poder realizar las prubeas.

# Ejecutar para iniciar la aplicacion: nodemon src/app.js -m=production 

## Usuarios brindados para explorar:
* Usuario 1 --> email: a@a.com ,password:123 ,role:admin

* Usuario 2 --> email: b@b.com, password:123, role:premium

* Usuario 3 --> email: c@c.com, password:123, role:user

## Archivos Involucrados en el entregable:

- En el archivo products.router.js se dio permiso al rol "PREMIUM" para que también pueda realizar la carga de productos.
"router.post("/",authMiddleware("ADMIN,PREMIUM"),productController.addProduct)"

* Se creó el archivo resetToken con el fin de controlar la expiracion del mismo a la hora de enviar el email.
* Se agregó en user.model.js el campo resetToken
* Se agregó el link para reestablecer contraseña en el handlebars "profile.handlebars"

## VERIFICAICON DE ROLES PARA REALIZAR METODOS -> authMiddleware("ADMIN,PREMIUM")
 Los permisos para opciones se encuentran en la carpeta de middlewares.

## Reestablecer contraseña por mail:
* En el archivo .env.production, modificar el valor de la variable de entorno donde se va a enviar el mail de reestablecimiento ( en estos casos no se trabaja con los mails que se hace el login, ya que se pueden crear usuarios ficticios con mails que no existan con el fin de agilizar las pruebas, por eso se define en este archivo).

* Loguearse con un user: (ejemplo: mail:c@c.com ,password:12345) en el endpoint: http://localhost:8084/login 

* Ingresar al perfil en http://localhost:8084/profile y presionar en "Reestablecer contraseña". ( se enviará el correo al email puesto en el primer paso)

* Ingresar al link del mail, que llevara a la pantalla para restaurar.

* Repetir el mail con el que  se hizo el login ("c@c.com" en este caso). Y modificar la clave.
+   Casos posibles:
  + Token expirado: devuelve a la pantalla del perfil para volver a tener la posibilidad de "Reestablecer contraseña" (Para controlar la expiración se controla la fecha actual con la fecha que se generó el token, la cual esta definida en el modelo para que sea una hora posterior a la que se crea el token).
  + Contraseña actual = que contraseña anterior , arroja error.
  + Constaseña actual != contraseña anterior, ok.

* Presionar en reestablecer.Una vez reestablecido. Probar nuevamente ingresar al endpoint del login e intentar acceder con la contraseña antigua (deberia no poderse). Luego verificar la contraseña modificada y debería poder loguearse con éxito.

## Cambio de Rol.
* Se definio el endpoint http://localhost:8084/api/users/premium/:uid con el fin de cambiar de roles entre PREMIUM y USER.
* En caso de ser PREMIUM, lo modificará a USER. Y en caso de ser USER, lo modificará a PREMIUM.
* En caso de no encontrar el user o ser de rol Admin, devolverá un error.



## Tratamiento de productos.

* ALTA
* Solo los usuarios ADMIN y PREMIUM pueden agregar productos.En product.controller.js en caso de ser user PREMIUM se setea el como valor el email.Caso contrario, su valor será "admin". (owner:user.role=='PREMIUM'?user.email:'admin')
* Se creó el endpoint http://localhost:8084/add-product para llenar el formulario de un producto y probar su carga.

* Con el endpoint http://localhost:8084/products?page=2&limit=3&sort=1 (puede cambiarse los parametros de paginas y limit), se puede ver el listado de productos y su ID, para posteriormente eliminarlo / modificarlo. 

* Solo los usuarios ADMIN y PREMIUM pueden eliminar o modificar productos.

* BAJA
* Que un producto te pertenezca = campo owner del producto = a mail del usuario de rol PREMIUM que hace la solucitud.
* El usuario PREMIUM solo podrá borrar productos que le pertenecen.
* El usuario ADMIN puede eliminar cualquier producto.

* MODIFICACIÓN. (revisar)
* Se creó el endpoint para acceder a la modificacion de un producto: http://localhost:8084/product/65b6ed089c0590128ed1c913

