-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: buenavista
-- ------------------------------------------------------
-- Server version	8.0.33

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `buenavista_carrito`
--

DROP TABLE IF EXISTS `buenavista_carrito`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `buenavista_carrito` (
  `idCarrito` int NOT NULL AUTO_INCREMENT COMMENT 'Identificador único del carrito',
  `estadoCarrito` tinyint(1) NOT NULL DEFAULT '1' COMMENT 'Estado del carrito: 1 Activo, 0 Inactivo',
  `usuario_id` varchar(10) NOT NULL COMMENT 'Referencia al usuario propietario del carrito',
  PRIMARY KEY (`idCarrito`),
  KEY `usuario_id` (`usuario_id`),
  CONSTRAINT `buenavista_carrito_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `buenavista_usuarios` (`ci`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `buenavista_carrito`
--

LOCK TABLES `buenavista_carrito` WRITE;
/*!40000 ALTER TABLE `buenavista_carrito` DISABLE KEYS */;
INSERT INTO `buenavista_carrito` VALUES (1,1,'1001'),(2,1,'2002'),(3,1,'1001'),(4,1,'2002');
/*!40000 ALTER TABLE `buenavista_carrito` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `buenavista_categoria`
--

DROP TABLE IF EXISTS `buenavista_categoria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `buenavista_categoria` (
  `idCategoria` int NOT NULL AUTO_INCREMENT,
  `nombreCategoria` varchar(255) NOT NULL,
  `tipo` int DEFAULT NULL,
  PRIMARY KEY (`idCategoria`),
  KEY `tipo` (`tipo`),
  CONSTRAINT `buenavista_categoria_ibfk_1` FOREIGN KEY (`tipo`) REFERENCES `buenavista_tipoproducto` (`idTipoProducto`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `buenavista_categoria`
--

LOCK TABLES `buenavista_categoria` WRITE;
/*!40000 ALTER TABLE `buenavista_categoria` DISABLE KEYS */;
INSERT INTO `buenavista_categoria` VALUES (1,'Alimentos Orgánicos',1),(2,'Alimentos Orgánicos',2),(3,'Alimentos Orgánicos',3),(4,'Alimentos Orgánicos',4),(5,'Alimentos Orgánicos',5),(6,'Alimentos Orgánicos',6),(7,'Suplementos Naturales',7),(8,'Suplementos Naturales',8),(9,'Suplementos Naturales',9),(10,'Suplementos Naturales',10),(11,'Suplementos Naturales',11),(12,'Cosmética Natural',12),(13,'Cosmética Natural',13),(14,'Cosmética Natural',14),(15,'Cosmética Natural',15),(16,'Cosmética Natural',16),(17,'Productos para el Hogar',17),(18,'Productos para el Hogar',18),(19,'Productos para el Hogar',19),(20,'Libros y Recursos',20),(21,'Libros y Recursos',21),(22,'Libros y Recursos',22);
/*!40000 ALTER TABLE `buenavista_categoria` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `buenavista_descuentos`
--

DROP TABLE IF EXISTS `buenavista_descuentos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `buenavista_descuentos` (
  `idDescuento` int NOT NULL AUTO_INCREMENT COMMENT 'Identificador único del descuento',
  `nombreDescuento` varchar(255) NOT NULL COMMENT 'Nombre del descuento',
  `tipoDescuento` enum('porcentaje','valor_fijo') NOT NULL COMMENT 'Tipo de descuento: porcentaje o valor fijo',
  `valorDescuento` decimal(10,2) NOT NULL COMMENT 'Porcentaje o monto fijo del descuento',
  `condicionDescuento` text NOT NULL COMMENT 'Condición para aplicar el descuento',
  `estadoDescuento` tinyint(1) NOT NULL DEFAULT '1' COMMENT 'Estado del descuento: 1 Activo, 0 Inactivo',
  PRIMARY KEY (`idDescuento`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `buenavista_descuentos`
--

LOCK TABLES `buenavista_descuentos` WRITE;
/*!40000 ALTER TABLE `buenavista_descuentos` DISABLE KEYS */;
INSERT INTO `buenavista_descuentos` VALUES (1,'Descuento de Bienvenida','porcentaje',10.00,'Aplica solo en la primera compra del usuario',1),(2,'Promoción de Temporada','porcentaje',15.00,'Disponible en eventos especiales o cambios de estación',1),(3,'Descuento por Compras Mayores a $100','porcentaje',10.00,'Se aplica si el total de la compra supera los $100',1),(4,'Oferta Especial de Fin de Semana','porcentaje',5.00,'Válido solo los sábados y domingos',1),(5,'Descuento por Cliente Frecuente','porcentaje',8.00,'Disponible para clientes con más de 5 compras',1),(6,'Liquidación de Stock','porcentaje',20.00,'Se aplica a productos en liquidación',1),(7,'Descuento por Pago en Efectivo','valor_fijo',5.00,'Solo para pagos en efectivo',1),(8,'Cupón de Descuento 10%','porcentaje',10.00,'Debe ingresar un cupón válido',1),(9,'Black Friday','porcentaje',30.00,'Válido solo en la fecha de Black Friday',1),(10,'Cyber Monday','porcentaje',25.00,'Válido solo en la fecha de Cyber Monday',1);
/*!40000 ALTER TABLE `buenavista_descuentos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `buenavista_favoritos`
--

DROP TABLE IF EXISTS `buenavista_favoritos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `buenavista_favoritos` (
  `idFavoritos` int NOT NULL AUTO_INCREMENT COMMENT 'Identificador único de favoritos',
  `usuario_id` varchar(10) NOT NULL COMMENT 'Referencia al usuario',
  `producto_id` int DEFAULT NULL COMMENT 'Referencia al producto',
  PRIMARY KEY (`idFavoritos`),
  KEY `usuario_id` (`usuario_id`),
  KEY `producto_id` (`producto_id`),
  CONSTRAINT `buenavista_favoritos_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `buenavista_usuarios` (`ci`) ON DELETE CASCADE,
  CONSTRAINT `buenavista_favoritos_ibfk_2` FOREIGN KEY (`producto_id`) REFERENCES `buenavista_productos` (`idProducto`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `buenavista_favoritos`
--

LOCK TABLES `buenavista_favoritos` WRITE;
/*!40000 ALTER TABLE `buenavista_favoritos` DISABLE KEYS */;
INSERT INTO `buenavista_favoritos` VALUES (1,'1001',28),(2,'1001',32),(3,'2002',30),(4,'2002',34),(5,'3003',35),(6,'2002',28);
/*!40000 ALTER TABLE `buenavista_favoritos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `buenavista_pago`
--

DROP TABLE IF EXISTS `buenavista_pago`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `buenavista_pago` (
  `idPago` int NOT NULL AUTO_INCREMENT COMMENT 'Identificador único del pago',
  `totalPago` decimal(10,2) NOT NULL COMMENT 'Total pagado',
  `carrito_id` int DEFAULT NULL COMMENT 'Referencia al carrito asociado al pago',
  `estadoPago` tinyint(1) NOT NULL DEFAULT '1' COMMENT 'Estado del pago: 1 Realizado, 0 No realizado',
  `fechaPago` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `metodoPago` varchar(50) NOT NULL,
  PRIMARY KEY (`idPago`),
  KEY `carrito_id` (`carrito_id`),
  CONSTRAINT `buenavista_pago_ibfk_1` FOREIGN KEY (`carrito_id`) REFERENCES `buenavista_carrito` (`idCarrito`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `buenavista_pago`
--

LOCK TABLES `buenavista_pago` WRITE;
/*!40000 ALTER TABLE `buenavista_pago` DISABLE KEYS */;
INSERT INTO `buenavista_pago` VALUES (7,50.00,1,1,'2025-03-07 19:52:58','Tarjeta de Crédito'),(8,120.50,2,1,'2025-03-07 19:52:58','PayPal'),(9,30.75,3,0,'2025-03-07 19:52:58','Transferencia Bancaria');
/*!40000 ALTER TABLE `buenavista_pago` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `buenavista_permisos`
--

DROP TABLE IF EXISTS `buenavista_permisos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `buenavista_permisos` (
  `idPermiso` int NOT NULL AUTO_INCREMENT COMMENT 'Identificador Unico del permiso',
  `nombrePermiso` varchar(100) NOT NULL COMMENT 'Nombre completo del permiso',
  `tipo` varchar(10) DEFAULT NULL COMMENT 'Tipo de modulo\\nAcorde a los tipos de usuario',
  `estadoPermiso` tinyint(1) NOT NULL DEFAULT '1' COMMENT 'Define el estado del modulo\\n0: Inactivo\\n1: Activo',
  PRIMARY KEY (`idPermiso`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `buenavista_permisos`
--

LOCK TABLES `buenavista_permisos` WRITE;
/*!40000 ALTER TABLE `buenavista_permisos` DISABLE KEYS */;
INSERT INTO `buenavista_permisos` VALUES (1,'Gestionar Usuarios',NULL,1),(2,'Gestionar Productos',NULL,1),(3,'Gestionar Pedidos',NULL,1),(4,'Ver Productos',NULL,1),(5,'Ver Productos',NULL,1),(6,'Ver Productos',NULL,1),(7,'Agregar al Carrito',NULL,1),(8,'Realizar Compras',NULL,1);
/*!40000 ALTER TABLE `buenavista_permisos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `buenavista_productos`
--

DROP TABLE IF EXISTS `buenavista_productos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `buenavista_productos` (
  `idProducto` int NOT NULL AUTO_INCREMENT COMMENT 'Identificador único del producto',
  `nombreProducto` varchar(255) NOT NULL COMMENT 'Nombre del producto',
  `descripcionProducto` text COMMENT 'Descripción del producto',
  `tallaProducto` varchar(50) DEFAULT NULL COMMENT 'Talla del producto',
  `precioProducto` decimal(10,2) NOT NULL COMMENT 'Precio del producto',
  `estadoProducto` tinyint(1) NOT NULL DEFAULT '1' COMMENT 'Estado del producto: 1 Activo, 0 Inactivo',
  `imgProducto` text COMMENT 'URL de la imagen del producto',
  `stockProducto` int NOT NULL COMMENT 'Cantidad disponible en stock',
  `marcaProducto` varchar(255) DEFAULT NULL COMMENT 'Marca del producto',
  `categoria_id` int DEFAULT NULL COMMENT 'Referencia a la categoría',
  `descuento_id` int DEFAULT NULL COMMENT 'Referencia al descuento',
  `precioPorUnidad` decimal(10,2) NOT NULL DEFAULT '0.00',
  PRIMARY KEY (`idProducto`),
  KEY `categoria_id` (`categoria_id`),
  KEY `descuento_id` (`descuento_id`),
  CONSTRAINT `buenavista_productos_ibfk_1` FOREIGN KEY (`categoria_id`) REFERENCES `buenavista_categoria` (`idCategoria`) ON DELETE SET NULL,
  CONSTRAINT `buenavista_productos_ibfk_2` FOREIGN KEY (`descuento_id`) REFERENCES `buenavista_descuentos` (`idDescuento`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `buenavista_productos`
--

LOCK TABLES `buenavista_productos` WRITE;
/*!40000 ALTER TABLE `buenavista_productos` DISABLE KEYS */;
INSERT INTO `buenavista_productos` VALUES (28,'Aceite esencial de Clavo','Aceite con propiedades antimicrobianas, antifúngicas y estimulantes.','12ML',7.99,1,'https://drive.google.com/file/d/1yvBN2jcQF9ysudd6cWSG6WSvwFiO64u0/view?usp=sharing',100,'Natura',1,NULL,0.00),(29,'Parches de Oro de 24 kt Rejuvenecedores para Contorno de Ojos','Parches para ojos con efecto rejuvenecedor con oro de 24kt.','60UDS.',15.50,1,NULL,50,'Natura Siberica',2,1,0.00),(30,'Parches Iluminadores para el Contorno de Ojos','Parches iluminadores que hidratan y protegen la piel.','60UDS.',15.50,1,NULL,50,'Natura Siberica',2,NULL,0.00),(31,'Parches Supertonificantes para Contorno de Ojos','Parches tonificantes para reducir fatiga e iluminar la piel.','60UDS.',15.50,1,NULL,50,'Natura Siberica',2,NULL,0.00),(32,'6 Discos Desmaquillantes de Fibra Natural','Discos reutilizables de algodón y carbón de bambú.','6UDS.',10.50,1,NULL,70,'Eco Beauty',2,2,0.00),(33,'Aceite anticelulítico de abedul','Aceite que mejora la circulación y previene la celulitis.','100ML',22.90,1,NULL,40,'Weleda',4,3,0.00),(34,'Aceite antiinflamatorio S.O.S Rescate','Aceite multiuso para quemaduras, golpes y cicatrices.','30ML',12.45,1,NULL,60,'Eco Rescue',1,NULL,0.00),(35,'Aceite Bucal de Coco Orgánico Premium','Aceite bucal con menta y eucalipto para higiene oral.','180ML',9.60,1,NULL,80,'Dr. Goerg',3,4,0.00),(36,'Aceite corporal blanco siberiano anticelulítico','Aceite con extractos naturales para mejorar la piel.','200ML',6.95,1,NULL,50,'Natura Siberica',4,NULL,0.00),(37,'Aceite corporal Body Sculptor','Aceite corporal que moldea el cuerpo y esculpe la silueta de forma natural y eficaz...','ML',73.70,1,NULL,0,'Alqvimia',4,NULL,491.33),(38,'Aceite corporal de almendras dulces','El Aceite de Almendras dulces es básico para una hidratación y nutrición de la piel...','ML',10.45,1,NULL,500,'Weleda',4,NULL,20.90),(39,'Aceite corporal de almendras dulces con dosificador','El Aceite de Almendras dulces es básico para una hidratación y nutrición de la piel...','ML',14.99,1,NULL,1000,'Weleda',4,NULL,14.99),(40,'Aceite corporal de almendras dulces con dosificador','El Aceite de Almendras dulces es básico para una hidratación y nutrición de la piel...','ML',11.55,1,NULL,500,'Weleda',4,NULL,23.10),(41,'Aceite Corporal de Granada','El aceite corporal de granada es de acción antioxidante intensiva que sirve para la regeneración celular...','ML',22.90,1,NULL,100,'Weleda',4,3,229.00),(42,'Aceite Corporal de Rosa Mosqueta','La principal acción de la Rosa Mosqueta es la regeneración de la piel y elasticidad...','ML',22.90,1,NULL,100,'Weleda',4,3,229.00),(43,'Aceite corporal Embellecedor del Busto','Aceite corporal empleado para moldear y realzar el busto dándole una apariencia de mayor volumen...','ML',81.70,1,NULL,0,'Alqvimia',4,NULL,817.00),(44,'Aceite corporal Reafirmante de Tejidos','Aceite corporal indispensable para prevenir la pérdida de firmeza de los tejidos...','ML',60.00,1,NULL,0,'Alqvimia',4,NULL,400.00),(45,'Aceite corporal Reafirmante del Busto','Aceite corporal específico de tratamiento que reafirma eficazmente el seno caído...','ML',81.70,1,NULL,0,'Alqvimia',4,NULL,817.00),(46,'Aceite corporal Reina de Egipto','Aceite corporal de exótica fragancia que nutre en profundidad, combate el envejecimiento cutáneo...','ML',57.30,1,NULL,0,'Alqvimia',4,NULL,382.00),(47,'Aceite daúrico corporal','Relaja tu cuerpo con este fantástico producto con el que podrás disfrutar de momentos únicos...','ML',18.95,1,NULL,0,'Natura Siberica',4,NULL,51.22),(48,'Aceite de Aguacate corporal','El aceite de aguacate actúa un bálsamo perfecto para la piel. Destaca por su efecto nutritivo...','ML',15.00,1,NULL,125,'Natura Siberica',4,NULL,120.00),(49,'Aceite de almendras corporal Bio','Hidrata y nutre tu piel con este aceite de almendras ecológico de primera prensada en frío...','ML',14.95,1,NULL,125,'Natura Siberica',4,NULL,119.60),(50,'Aceite de Argán Bio','Este aceite vegetal rico en vitaminas y antioxidantes te hará lucir una piel radiante...','ML',12.99,1,NULL,30,'Natura Siberica',4,NULL,433.00),(51,'Aceite de Argán Bio','Este aceite vegetal rico en vitaminas y antioxidantes te hará lucir una piel radiante...','ML',25.95,1,NULL,100,'Natura Siberica',4,NULL,259.50),(52,'Aceite de CBD 5%','Aceite de semillas de cáñamo con CBD al 5%. Adecuado para el uso diario en personas con dolor crónico...','ML',20.95,1,NULL,15,'CBD Vital',4,NULL,20.95);
/*!40000 ALTER TABLE `buenavista_productos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `buenavista_roles`
--

DROP TABLE IF EXISTS `buenavista_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `buenavista_roles` (
  `idRol` int NOT NULL AUTO_INCREMENT COMMENT 'Identificador Unico del Rol',
  `nombreRol` varchar(20) NOT NULL COMMENT 'Nombre del tipo de rol',
  `descripcion` varchar(255) DEFAULT NULL COMMENT 'Descripción del tipo de rol\nExplica las funcionalidades y privilegios del rol',
  `estadoRol` tinyint(1) NOT NULL DEFAULT '1' COMMENT 'Define el estado del rol\n0: Inactivo\n1:Activo',
  PRIMARY KEY (`idRol`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `buenavista_roles`
--

LOCK TABLES `buenavista_roles` WRITE;
/*!40000 ALTER TABLE `buenavista_roles` DISABLE KEYS */;
INSERT INTO `buenavista_roles` VALUES (1,'Administrador','Acceso total al sistema, gestión de usuarios, productos y pedidos.',1),(2,'Comprador','Puede navegar, agregar productos al carrito y realizar compras.',1),(3,'Invitado','Acceso limitado, solo puede ver productos sin realizar compras.',1);
/*!40000 ALTER TABLE `buenavista_roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `buenavista_roles_permisos`
--

DROP TABLE IF EXISTS `buenavista_roles_permisos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `buenavista_roles_permisos` (
  `idRoles_Permisos` int NOT NULL AUTO_INCREMENT COMMENT 'Identificador Unico de la tabla relacional del modulo y el rol',
  `idPermisos` int NOT NULL COMMENT 'Identificador Unico del modulo',
  `idRol` int NOT NULL COMMENT 'Identificador Unico del rol',
  PRIMARY KEY (`idRoles_Permisos`),
  KEY `PK_idRoles_Permisos` (`idPermisos`),
  KEY `FK_IdPermisos` (`idRol`),
  CONSTRAINT `FK_IdPermisos` FOREIGN KEY (`idRol`) REFERENCES `buenavista_roles` (`idRol`),
  CONSTRAINT `PK_idRoles_Permisos` FOREIGN KEY (`idPermisos`) REFERENCES `buenavista_permisos` (`idPermiso`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `buenavista_roles_permisos`
--

LOCK TABLES `buenavista_roles_permisos` WRITE;
/*!40000 ALTER TABLE `buenavista_roles_permisos` DISABLE KEYS */;
INSERT INTO `buenavista_roles_permisos` VALUES (1,1,1),(2,2,1),(3,3,1),(4,4,1),(5,5,1),(6,6,1),(8,4,2),(9,5,2),(10,6,2),(11,7,2),(12,8,2),(15,4,3),(16,5,3),(17,6,3);
/*!40000 ALTER TABLE `buenavista_roles_permisos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `buenavista_tipoproducto`
--

DROP TABLE IF EXISTS `buenavista_tipoproducto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `buenavista_tipoproducto` (
  `idTipoProducto` int NOT NULL AUTO_INCREMENT,
  `nombreTipoProducto` varchar(255) NOT NULL,
  PRIMARY KEY (`idTipoProducto`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `buenavista_tipoproducto`
--

LOCK TABLES `buenavista_tipoproducto` WRITE;
/*!40000 ALTER TABLE `buenavista_tipoproducto` DISABLE KEYS */;
INSERT INTO `buenavista_tipoproducto` VALUES (1,'Frutas y Verduras Frescas'),(2,'Cereales Integrales'),(3,'Semillas'),(4,'Frutos Secos'),(5,'Leches Vegetales'),(6,'Productos sin Gluten'),(7,'Vitaminas'),(8,'Minerales'),(9,'Extractos Herbales'),(10,'Probióticos'),(11,'Superalimentos'),(12,'Jabones Artesanales'),(13,'Cremas Hidratantes'),(14,'Aceites Esenciales'),(15,'Champús'),(16,'Acondicionadores'),(17,'Detergentes Ecológicos'),(18,'Ambientadores Naturales'),(19,'Productos de Limpieza Biodegradables'),(20,'Guías de Alimentación Saludable'),(21,'Libros de Recetas Vegetarianas y Veganas'),(22,'Publicaciones sobre Bienestar Natural');
/*!40000 ALTER TABLE `buenavista_tipoproducto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `buenavista_usuarios`
--

DROP TABLE IF EXISTS `buenavista_usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `buenavista_usuarios` (
  `ci` varchar(10) NOT NULL COMMENT 'Identificador único del usuario',
  `nombreUsuario` varchar(255) NOT NULL COMMENT 'Nombre del usuario',
  `apellidoUsuario` varchar(255) NOT NULL COMMENT 'Apellido del usuario',
  `correoUsuario` varchar(255) NOT NULL COMMENT 'Correo electrónico del usuario',
  `contrasenaUsuario` varchar(255) NOT NULL COMMENT 'Contraseña del usuario',
  `estadoUsuario` tinyint(1) NOT NULL DEFAULT '1' COMMENT 'Estado del usuario: 1 Activo, 0 Inactivo',
  `rol_id` int DEFAULT NULL COMMENT 'Referencia al rol del usuario',
  PRIMARY KEY (`ci`),
  UNIQUE KEY `correoUsuario` (`correoUsuario`),
  KEY `rol_id` (`rol_id`),
  CONSTRAINT `buenavista_usuarios_ibfk_1` FOREIGN KEY (`rol_id`) REFERENCES `buenavista_roles` (`idRol`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `buenavista_usuarios`
--

LOCK TABLES `buenavista_usuarios` WRITE;
/*!40000 ALTER TABLE `buenavista_usuarios` DISABLE KEYS */;
INSERT INTO `buenavista_usuarios` VALUES ('1001','Admin','Principal','admin@buenavista.com','$2b$10$K4LsuZppJzXqTHJiAzcsdOQyyYPb.1kYlv1ursFh2moTqxhejWkje',1,1),('1002','Admin','Principal','admin@buenavista1.com','1122',1,2),('2002','Carlos','Comprador','comprador@buenavista.com','comprador123',1,2),('3003','Iván','Invitado','invitado@buenavista.com','invitado123',1,3);
/*!40000 ALTER TABLE `buenavista_usuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `itemcarrito`
--

DROP TABLE IF EXISTS `itemcarrito`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `itemcarrito` (
  `idItem` int NOT NULL AUTO_INCREMENT,
  `idProducto` int DEFAULT NULL COMMENT 'Referencia al producto',
  `cantidad` int DEFAULT NULL COMMENT 'Cantidad del producto en el carrito',
  `subTotal` decimal(10,2) NOT NULL,
  `idCarrito` int DEFAULT NULL COMMENT 'Referencia al carrito',
  PRIMARY KEY (`idItem`),
  KEY `idProducto` (`idProducto`),
  KEY `idCarrito` (`idCarrito`),
  CONSTRAINT `itemcarrito_ibfk_1` FOREIGN KEY (`idProducto`) REFERENCES `buenavista_productos` (`idProducto`) ON DELETE CASCADE,
  CONSTRAINT `itemcarrito_ibfk_2` FOREIGN KEY (`idCarrito`) REFERENCES `buenavista_carrito` (`idCarrito`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `itemcarrito`
--

LOCK TABLES `itemcarrito` WRITE;
/*!40000 ALTER TABLE `itemcarrito` DISABLE KEYS */;
INSERT INTO `itemcarrito` VALUES (5,28,2,0.00,1),(6,32,1,0.00,1),(7,30,3,0.00,2),(8,35,2,0.00,2),(9,28,2,0.00,1),(10,32,1,0.00,1),(11,30,3,0.00,2),(12,35,2,0.00,2);
/*!40000 ALTER TABLE `itemcarrito` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'buenavista'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-03-13 16:07:03
