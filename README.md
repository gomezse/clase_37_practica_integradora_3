# **Práctica Integradora 3**
> [!IMPORTANT]
> Recordar ingresar al login para poder llevar a cabo los servicios.

>[!IMPORTANT]
>Usuario Gabi Rossi, email: gabi_20_14@hotmail.com   password:123

>[!TIP]
>Usuario de prueba1: a@a.com password:123
>Usuario de prueba2: b@b.com password:123
>Usuario de prueba3: c@c.com password:123
>Usuario de prueba3: gabi_20_14@hotmail.com password:123
# Ejecutar para iniciar la aplicacion: npm start

## Usuarios brindados para explorar:
* Usuario 1 --> email: a@a.com ,password:123 ,role:admin

* Usuario 2 --> email: b@b.com, password:123, role:premium

* Usuario 3 --> email: c@c.com, password:123, role:user



## Reestablecer contraseña
Ahi lo reestructure gabi: En el readme te agrego nueva info para que te sea facil o mas entendible probarlo. Pero en resumen, ahora tenes 3 formas de reestablecer la contraseña :



# *A) Sin Envio de Email y Sin Login*

* 1) Ingresar a "http://localhost:8080/reestablecer-sin-envio-mail"

* 2) Ingresar un email valido de algún usuario que se encuentre en la base de datos

* 3)Si el mail ingresado es válido (existe para un usuario en la bd) se redirecciona directamente al restaurar.

* 4) Reestablecer la contraseña.

# *A)Con envio de mail*

*Con Login*
 
- 1) Loguearse "http://localhost:8080/login"

- 2) Ir al perfil "http://localhost:8080/profile"

- 3) Presionar en el enlace  de reestablecer contraseña que aparece como link en el perfil.

- 4) Ir al mail del usuario logueado. Entrar al link que propone el mail

- 5) Reestablecer la contraseña.


*Sin Login*

- 1) Ingresar a "http://localhost:8080/reestablecer-con-envio-mail"

- 2) Ingresar un email valido de algún usuario que se encuentre en la base de datos

- 3) Presionar en el enlace de reestablecer contraseña que aparece como link en el perfil.

- 4) Ir al mail del usuario logueado. Entrar al link que propone el mail

- 5) Reestablecer la contraseña.


## Archivos Involucrados en el entregable:

- En el archivo products.router.js se dio permiso al rol "PREMIUM" para que también pueda realizar la carga de productos.
"router.post("/",authMiddleware("ADMIN,PREMIUM"),productController.addProduct)"

* Se creó el archivo resetToken con el fin de controlar la expiracion del mismo a la hora de enviar el email.
* Se agregó en user.model.js el campo resetToken
* Se agregó el link para reestablecer contraseña en el handlebars "profile.handlebars"

## VERIFICAICON DE ROLES PARA REALIZAR METODOS -> authMiddleware("ADMIN,PREMIUM")
 Los permisos para opciones se encuentran en la carpeta de middlewares.


## Cambio de Rol.
* Se definio el endpoint http://localhost:8080/api/users/premium/:uid con el fin de cambiar de roles entre PREMIUM y USER.
* En caso de ser PREMIUM, lo modificará a USER. Y en caso de ser USER, lo modificará a PREMIUM.
* En caso de no encontrar el user o ser de rol Admin, devolverá un error.



## Tratamiento de productos.

* ALTA
* Solo los usuarios ADMIN y PREMIUM pueden agregar productos.En product.controller.js en caso de ser user PREMIUM se setea el como valor el email.Caso contrario, su valor será "admin". (owner:user.role=='PREMIUM'?user.email:'admin')
* Se creó el endpoint http://localhost:8080/add-product para llenar el formulario de un producto y probar su carga.

* Con el endpoint http://localhost:8080/products?page=2&limit=3&sort=1 (puede cambiarse los parametros de paginas y limit), se puede ver el listado de productos y su ID, para posteriormente eliminarlo / modificarlo. 

* Solo los usuarios ADMIN y PREMIUM pueden eliminar o modificar productos.

* BAJA
* Que un producto te pertenezca = campo owner del producto = a mail del usuario de rol PREMIUM que hace la solucitud.
* El usuario PREMIUM solo podrá borrar productos que le pertenecen.
* El usuario ADMIN puede eliminar cualquier producto.

* MODIFICACIÓN. (revisar)
* Se creó el endpoint para acceder a la modificacion de un producto: http://localhost:8080/product/65b6ed089c0590128ed1c913

