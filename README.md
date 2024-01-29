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

## VERIFICAICON DE ROLES PARA REALIZAR METODOS -> authMiddleware("ADMIN,PREMIUM")
 Los permisos para opciones se encuentran en la carpeta de middlewares.


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

* MODIFICACIÓN.
* Se creó el endpoint para acceder a la modificacion de un producto: http://localhost:8084/product/65b6ed089c0590128ed1c913

