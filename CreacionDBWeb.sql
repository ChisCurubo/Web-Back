create database BuenaVista;
use BuenaVista;


create table BuenaVista_Roles(
idRol INT NOT NULL AUTO_INCREMENT COMMENT 'Identificador Unico del Rol',
nombreRol VARCHAR(20) NOT NULL COMMENT 'Nombre del tipo de rol',
descripcion VARCHAR(255) NULL DEFAULT NULL COMMENT 'Descripción del tipo de rol\nExplica las funcionalidades y privilegios del rol',
estadoRol BOOLEAN NOT NULL DEFAULT TRUE COMMENT  'Define el estado del rol\n0: Inactivo\n1:Activo',
PRIMARY KEY (idRol)
);

create table BuenaVista_Permisos(
idPermiso INT NOT NULL AUTO_INCREMENT COMMENT 'Identificador Unico del permiso',
nombrePermiso VARCHAR(100) NOT NULL COMMENT 'Nombre completo del permiso',
tipo VARCHAR(10) NULL DEFAULT NULL COMMENT 'Tipo de modulo\\nAcorde a los tipos de usuario',
estadoPermiso BOOLEAN NOT NULL DEFAULT TRUE COMMENT  'Define el estado del modulo\\n0: Inactivo\\n1: Activo',
PRIMARY KEY (idPermiso));

create table BuenaVista_Roles_Permisos(
idRoles_Permisos INT NOT NULL AUTO_INCREMENT COMMENT 'Identificador Unico de la tabla relacional del modulo y el rol',
idPermisos INT NOT NULL COMMENT 'Identificador Unico del modulo',
idRol INT NOT NULL COMMENT 'Identificador Unico del rol',
PRIMARY KEY (idRoles_Permisos),
CONSTRAINT PK_idRoles_Permisos  
FOREIGN KEY (idPermisos)
REFERENCES BuenaVista.BuenaVista_Permisos (idPermiso),
CONSTRAINT FK_IdPermisos
FOREIGN KEY (idRol)
REFERENCES BuenaVista.BuenaVista_Roles (idRol));

CREATE TABLE BuenaVista_TipoProducto (
    idTipoProducto INT PRIMARY KEY AUTO_INCREMENT,
    nombreTipoProducto VARCHAR(255) NOT NULL
);

CREATE TABLE BuenaVista_Categoria (
    idCategoria INT PRIMARY KEY AUTO_INCREMENT,
    nombreCategoria VARCHAR(255) NOT NULL,
    tipo INT,
    FOREIGN KEY (tipo) REFERENCES BuenaVista_TipoProducto(idTipoProducto)
);

CREATE TABLE BuenaVista_Descuentos (
    idDescuento INT NOT NULL AUTO_INCREMENT PRIMARY KEY COMMENT 'Identificador único del descuento',
    nombreDescuento VARCHAR(255) NOT NULL COMMENT 'Nombre del descuento',
    tipoDescuento ENUM('porcentaje', 'valor_fijo') NOT NULL COMMENT 'Tipo de descuento: porcentaje o valor fijo',
    valorDescuento DECIMAL(10,2) NOT NULL COMMENT 'Porcentaje o monto fijo del descuento',
    condicionDescuento TEXT NOT NULL COMMENT 'Condición para aplicar el descuento',
    estadoDescuento BOOLEAN NOT NULL DEFAULT TRUE COMMENT 'Estado del descuento: 1 Activo, 0 Inactivo'
);


create table BuenaVista_Productos (
    idProducto INT NOT NULL AUTO_INCREMENT PRIMARY KEY COMMENT 'Identificador único del producto',
    nombreProducto VARCHAR(255) NOT NULL COMMENT 'Nombre del producto',
    descripcionProducto TEXT COMMENT 'Descripción del producto',
    tallaProducto VARCHAR(50) COMMENT 'Talla del producto',
    precioProducto DECIMAL(10,2) NOT NULL COMMENT 'Precio del producto',
    estadoProducto BOOLEAN NOT NULL DEFAULT TRUE COMMENT  'Estado del producto: 1 Activo, 0 Inactivo',
    imgProducto TEXT COMMENT 'URL de la imagen del producto',
    stockProducto INT NOT NULL COMMENT 'Cantidad disponible en stock',
    marcaProducto VARCHAR(255) COMMENT 'Marca del producto',
    categoria_id INT COMMENT 'Referencia a la categoría',
    descuento_id INT COMMENT 'Referencia al descuento',
    FOREIGN KEY (categoria_id) REFERENCES BuenaVista_Categoria(idCategoria) ON DELETE SET NULL,
    FOREIGN KEY (descuento_id) REFERENCES BuenaVista_Descuentos(idDescuento) ON DELETE SET NULL
);

create table BuenaVista_Usuarios (
    ci varchar(10)NOT NULL PRIMARY KEY COMMENT 'Identificador único del usuario',
    nombreUsuario VARCHAR(255) NOT NULL COMMENT 'Nombre del usuario',
    apellidoUsuario VARCHAR(255) NOT NULL COMMENT 'Apellido del usuario',
    correoUsuario VARCHAR(255) UNIQUE NOT NULL COMMENT 'Correo electrónico del usuario',
    contrasenaUsuario varchar(255) NOT NULL COMMENT 'Contraseña del usuario',
    estadoUsuario BOOLEAN NOT NULL DEFAULT TRUE COMMENT  'Estado del usuario: 1 Activo, 0 Inactivo',
    rol_id INT COMMENT 'Referencia al rol del usuario',
    FOREIGN KEY (rol_id) REFERENCES BuenaVista_Roles(idRol) ON DELETE SET NULL
);

create table BuenaVista_Carrito (
    idCarrito INT NOT NULL AUTO_INCREMENT PRIMARY KEY COMMENT 'Identificador único del carrito',
    estadoCarrito BOOLEAN NOT NULL DEFAULT TRUE COMMENT 'Estado del carrito: 1 Activo, 0 Inactivo',
    usuario_id varchar(10) not null COMMENT 'Referencia al usuario propietario del carrito',
    FOREIGN KEY (usuario_id) REFERENCES BuenaVista_Usuarios(ci) ON DELETE CASCADE
);


CREATE TABLE itemCarrito (
    idItem INT PRIMARY KEY AUTO_INCREMENT,
    idProducto INT COMMENT 'Referencia al producto',
    cantidad INT COMMENT 'Cantidad del producto en el carrito',
    subTotal DECIMAL(10,2) NOT NULL,
    idCarrito INT  COMMENT 'Referencia al carrito',
    FOREIGN KEY (idProducto) REFERENCES BuenaVista_Productos(idProducto) ON DELETE CASCADE,
    FOREIGN KEY (idCarrito) REFERENCES BuenaVista_Carrito(idCarrito) ON DELETE CASCADE
);

create table BuenaVista_Favoritos (
    idFavoritos INT NOT NULL AUTO_INCREMENT PRIMARY KEY COMMENT 'Identificador único de favoritos',
    usuario_id varchar(10) not null COMMENT 'Referencia al usuario',
    producto_id INT COMMENT 'Referencia al producto',
    FOREIGN KEY (usuario_id) REFERENCES BuenaVista_Usuarios(ci) ON DELETE CASCADE,
    FOREIGN KEY (producto_id) REFERENCES BuenaVista_Productos(idProducto) ON DELETE CASCADE
);

create table BuenaVista_Pago (
    idPago INT NOT NULL AUTO_INCREMENT PRIMARY KEY COMMENT 'Identificador único del pago',
    totalPago DECIMAL(10,2) NOT NULL COMMENT 'Total pagado',
    carrito_id INT COMMENT 'Referencia al carrito asociado al pago',
    estadoPago BOOLEAN NOT NULL DEFAULT TRUE COMMENT 'Estado del pago: 1 Realizado, 0 No realizado',
    fechaPago TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (carrito_id) REFERENCES BuenaVista_Carrito(idCarrito) ON DELETE CASCADE
);
ALTER TABLE BuenaVista_Pago ADD COLUMN metodoPago VARCHAR(50) NOT NULL;


