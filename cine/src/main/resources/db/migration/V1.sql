-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 25-04-2023 a las 19:33:31
-- Versión del servidor: 10.4.27-MariaDB
-- Versión de PHP: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `cinema`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `admin`
--

DROP TABLE IF EXISTS `admin`;
CREATE TABLE `admin` (
                         `Id_admin` int(11) NOT NULL PRIMARY KEY,
                         `Password` varchar(50) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
                         `Nombre` varchar(50) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
                         `Estado` int(11) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Volcado de datos para la tabla `admin`
--

INSERT INTO `admin` (`Id_admin`, `Password`, `Nombre`, `Estado`) VALUES
    (1, '0192023a7bbd73250516f069df18b500', 'admin', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `butacas`
--

DROP TABLE IF EXISTS `butacas`;
CREATE TABLE `butacas` (
                           `Id` int(11) NOT NULL,
                           `Id_butaca` varchar(50) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
                           `Id_sala`  int(11) NOT NULL,
                           `Fila` int(11) DEFAULT NULL,
                           `Columna` int(11) DEFAULT NULL,
                           `Estado` int(11) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;




-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `butacasreservas`
--

DROP TABLE IF EXISTS `butacasreservas`;
CREATE TABLE `butacasreservas` (
                                   `Id_butaca` int(11) NOT NULL,

                                   `Id_reserva` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Volcado de datos para la tabla `butacasreservas`
--


-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `funciones`
--

DROP TABLE IF EXISTS `funciones`;
CREATE TABLE `funciones` (
                             `Id_funcion` int(11) NOT NULL,
                             `Id_sala` int(11) NOT NULL,
                             `Id_pelicula` int(11) NOT NULL,
                             `Horario` time NOT NULL,
                             `Fecha` date NOT NULL,
                             `Precio` int(11) DEFAULT 7,
                             `Estado` int(11) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Volcado de datos para la tabla `funciones`
--


-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `peliculas`
--

DROP TABLE IF EXISTS `peliculas`;
CREATE TABLE `peliculas` (
                             `Id_pelicula` int(11) NOT NULL,
                             `Titulo` varchar(50) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
                             `Directores` varchar(500) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
                             `Actores` varchar(500) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
                             `Descripcion` varchar(1000) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
                             `Genero` varchar(50) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
                             `Imagen` varchar(500) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
                             `Video` varchar(500) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
                             `Estado` int(11) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Volcado de datos para la tabla `peliculas`
--

INSERT INTO `peliculas` (`Id_pelicula`, `Titulo`, `Directores`, `Actores`, `Descripcion`, `Genero`, `Imagen`, `Video`, `Estado`) VALUES
                                                                                                                                     (1, 'Asedio', 'Miguel Ángel Vivas', 'Natalia de Molina, Bella Agossou', '¿Qué es ser español? Dani lo tiene muy claro. En su caso es servir a su país como antidisturbios, honrar su bandera. Hacer cumplir la Ley. Siempre pensó que ser policía era una forma de proteger a la gente, de hacer justicia. Pero durante un desahucio en un barrio conflictivo de Madrid.', 'Thriller', 'https://www.ocinemagic.es/images/pelicules/5280.jpg', 'https://www.youtube.com/watch?v=FkcRmYXoKtM', 1),
                                                                                                                                     (2, 'Book Club', 'Bill Holderman', 'Diane Keaton, Mary Steenburgen, Jane Fonda, Candice Berger', 'En esta esperadísima secuela, el grupo de cuatro amigas viaja a Italia con su club de lectura para disfrutar del viaje de chicas que nunca tuvieron. Pero cuando las cosas no salen según lo planeado y algunos secretos salen a la luz, sus relajantes vacaciones se irán convirtiendo en una aventura única recorriendo todo el país.','Drama', 'https://www.ocinemagic.es/images/pelicules/5283.jpg', 'https://www.youtube.com/watch?v=KXoY88faTYk', 1),
                                                                                                                                     (3, 'Fatum', 'Juan Galiñanes', 'Luis Tosar, Álex García', 'Sergio (Luis Tosar) tiene graves problemas con el juego. Tras jurar a su esposa que no volvería a caer, recibe un soplo sobre un supuesto amaño de un partido de futbol e, incapaz de cumplir su promesa, regresa a la casa de apuestas con la intención de recuperar todo el dinero perdido.', 'Thriller', 'https://www.ocinemagic.es/images/pelicules/5141.jpg', 'https://www.youtube.com/watch?v=6TZeSpR9YlQ', 1),
                                                                                                                                     (4, 'Guardianes de la Galaxia Vol.3', 'James Gunn', 'Vin Diesel, Chris Pratt, Dave Bautista, Zoe Saldana', 'En Guardianes de la Galaxia Volumen 3 de Marvel Studios, nuestra querida banda de inadaptados se está acostumbrando a vivir en Knowhere, pero no pasa demasiado tiempo antes de que sus vidas se vean alteradas por los ecos del turbulento pasado de Rocket.', 'Superhéroes', 'https://www.ocinemagic.es/images/pelicules/5173.jpg', 'https://www.youtube.com/watch?v=9SfnkovRye8', 1),
                                                                                                                                     (5, 'Jeepers Creepers: El Renacer', 'Timo Vuorensola', 'Peter Brooke, Steve Jones, Sydney Craven, Imran Adams', 'Laine se ve obligada a acompañar a su novio Chase al Horror Hound, un festival que atrae a cientos de frikis, bichos raros y fanáticos del terror de todas partes. De camino hacia allí, Laine comienza a experimentar premoniciones inexplicables y visiones inquietantes asociadas con el pasado de la ciudad y en particular con la leyenda local de The Creeper.', 'Terror', 'https://www.ocinemagic.es/images/pelicules/5313.jpg', 'https://www.youtube.com/watch?v=OJcQM6vsf9w', 1),
                                                                                                                                     (6, 'Spider-Man: Sin Rumbo', 'Jon Watts', 'Tom Holland, Zendaya, Jacob Batalon', 'Peter Parker se encuentra en un aprieto cuando su identidad secreta es revelada y se ve envuelto en una batalla contra sus enemigos más peligrosos. Con la ayuda de sus amigos y aliados, Spider-Man deberá enfrentar desafíos que pondrán a prueba su valentía y determinación.', 'Acción', 'https://www.ocinemagic.es/images/pelicules/5319.jpg', 'https://www.youtube.com/watch?v=b_yMOiRgMmQ', 1),
                                                                                                                                     (7, 'John Wick 4', 'Scott Derrickson', 'Brie Larson, Lupita Nyongo, Chadwick Boseman', 'Un grupo de amigos se aventura en una antigua casa embrujada para desvelar los misterios que encierra. Pronto descubren que el lugar está habitado por espíritus malignos que harán todo lo posible para mantenerlos atrapados dentro.', 'Horror', 'https://www.ocinemagic.es/images/pelicules/5011.jpg', 'https://www.youtube.com/watch?v=MGqTgMkk9LA', 1),
                                                                                                                                     (8, 'Super Mario Bros. La Película', 'Ridley Scott', 'Matt Damon, Adam Driver, Jodie Comer', 'En la Francia medieval, dos caballeros se enfrentan en un duelo a muerte para resolver una disputa. La historia se basa en hechos reales y explora temas de honor, justicia y venganza en un mundo brutal y despiadado.', 'Drama', 'https://www.ocinemagic.es/images/pelicules/5082.jpg', 'https://www.youtube.com/watch?v=Wi8E94UR79Q', 1),
                                                                                                                                     (9, 'A Todo Gas 10: Renacimiento', 'Justin Lin', 'Vin Diesel, Michelle Rodriguez, Tyrese Gibson', 'La décima entrega de la exitosa franquicia de acción nos trae más velocidad, adrenalina y emociones al límite. Dom Toretto y su equipo se enfrentan a un nuevo desafío que pondrá a prueba su lealtad y los llevará a límites insospechados.', 'Acción', 'https://www.ocinemagic.es/images/pelicules/5225.jpg', 'https://www.youtube.com/watch?v=_1f2RLdxQfA', 1),
                                                                                                                                     (10, 'El Exorcista del Papa', 'Christopher Nolan', 'Leonardo DiCaprio, Tom Hardy, Marion Cotillard', 'En un mundo distópico donde la realidad se puede manipular a través de los sueños, un grupo de expertos en extracción de información se enfrenta a un desafío que pondrá en peligro su propia cordura. En una carrera contra el tiempo, deberán desentrañar los secretos de una mente en caos.', 'Ciencia Ficción', 'https://www.ocinemagic.es/images/pelicules/5067.jpg', 'https://www.youtube.com/watch?v=a-Cx7IE04sA', 1);


-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reservas`
--

DROP TABLE IF EXISTS `reservas`;
CREATE TABLE `reservas` (
                            `Id_reserva` int(11) NOT NULL,
                            `Id_funcion` int(11) NOT NULL,
                            `Id_usuario` int(11) NOT NULL,
                            `Fecha_reserva` timestamp NOT NULL DEFAULT current_timestamp(),
                            `Precio` int(11) DEFAULT NULL,
                            `Estado` int(11) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Volcado de datos para la tabla `reservas`
--


-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `salas`
--

DROP TABLE IF EXISTS `salas`;
CREATE TABLE `salas` (
                         `Id_sala` int(11) NOT NULL,
                         `Nombre` varchar(50) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
                         `Filas` int(11) DEFAULT NULL,
                         `Butacasporfila` int(11) DEFAULT NULL,
                         `Estado` int(11) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Volcado de datos para la tabla `salas`
--


-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
CREATE TABLE `usuarios` (
                            `Id_usuario` int(11) NOT NULL,
                            `Usuario` varchar(50) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
                            `Password` varchar(50) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
                            `Nombre` varchar(50) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
                            `Apellido` varchar(50) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
                            `DNI` int(11) DEFAULT NULL,
                            `Direccion` varchar(50) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
                            `Ciudad` varchar(50) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
                            `Codigo_postal` varchar(50) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
                            `Estado` int(11) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`Id_usuario`, `Usuario`, `Password`, `Nombre`, `Apellido`, `DNI`, `Direccion`, `Ciudad`, `Codigo_postal`, `Estado`) VALUES
                                                                                                                                                                           (1, 'usuario1', 'contraseña123', 'Juan', 'Pérez', 12345678, 'Calle Falsa 123', 'Buenos Aires', '1234', 1),
                                                                                                                                                                           (2, 'usuario2', 'contraseña456', 'María', 'González', 23456789, 'Calle Falsa 456', 'Córdoba', '5678', 1),
                                                                                                                                                                           (3, 'usuario3', 'contraseña789', 'Pedro', 'Rodríguez', 34567890, 'Calle Falsa 789', 'Rosario', '9012', 1),
                                                                                                                                                                           (4, 'usuario4', 'contraseñaabc', 'Laura', 'Gómez', 45678901, 'Calle Falsa 1011', 'Mendoza', '3456', 1),
                                                                                                                                                                           (5, 'usuario5', 'contraseñadef', 'Jorge', 'Fernández', 56789012, 'Calle Falsa 1213', 'San Juan', '7890', 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `butacas`
--
ALTER TABLE `butacas`
    ADD PRIMARY KEY (`Id`),
    ADD UNIQUE KEY (`Id_butaca`,`Id_sala`),
  ADD KEY `IdSala` (`Id_sala`);

--
-- Indices de la tabla `butacasreservas`
--
ALTER TABLE `butacasreservas`
    ADD PRIMARY KEY (`Id_butaca`,`Id_reserva`),
  ADD KEY `IdButaca` (`Id_butaca`),
  ADD KEY `IdReserva` (`Id_reserva`);

--
-- Indices de la tabla `funciones`
--
ALTER TABLE `funciones`
    ADD PRIMARY KEY (`Id_funcion`),
  ADD KEY `IdSala` (`Id_sala`),
  ADD KEY `IdPelicula` (`Id_pelicula`),
  ADD KEY `Horario` (`Horario`);

--
-- Indices de la tabla `peliculas`
--
ALTER TABLE `peliculas`
    ADD PRIMARY KEY (`Id_pelicula`);

--
-- Indices de la tabla `reservas`
--
ALTER TABLE `reservas`
    ADD PRIMARY KEY (`Id_reserva`),
  ADD KEY `IdUsuario` (`Id_usuario`),
  ADD KEY `IdFuncion` (`Id_funcion`);

--
-- Indices de la tabla `salas`
--
ALTER TABLE `salas`
    ADD PRIMARY KEY (`Id_sala`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
    ADD PRIMARY KEY (`Id_usuario`);

--
-- AUTO_INCREMENT de las tablas `butacas`
--
--
ALTER TABLE `butacas`
    MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

--
-- AUTO_INCREMENT de la tabla `funciones`
--
ALTER TABLE `funciones`
    MODIFY `Id_funcion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `peliculas`
--
ALTER TABLE `peliculas`
    MODIFY `Id_pelicula` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `reservas`
--
ALTER TABLE `reservas`
    MODIFY `Id_reserva` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de la tabla `salas`
--
ALTER TABLE `salas`
    MODIFY `Id_sala` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
    MODIFY `Id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `butacas`
--
ALTER TABLE `butacas`
    ADD CONSTRAINT `butacas_ibfk_1` FOREIGN KEY (`Id_sala`) REFERENCES `salas` (`Id_sala`);

--
-- Filtros para la tabla `butacasreservas`
--
ALTER TABLE `butacasreservas`
    ADD CONSTRAINT `butacasReservas_ibfk_1` FOREIGN KEY (`Id_butaca`) REFERENCES `butacas` (`id`),
  ADD CONSTRAINT `butacasReservas_ibfk_2` FOREIGN KEY (`Id_reserva`) REFERENCES `reservas` (`Id_reserva`);

--
-- Filtros para la tabla `funciones`
--
ALTER TABLE `funciones`
    ADD CONSTRAINT `funciones_ibfk_1` FOREIGN KEY (`Id_sala`) REFERENCES `salas` (`Id_sala`),
  ADD CONSTRAINT `funciones_ibfk_2` FOREIGN KEY (`Id_pelicula`) REFERENCES `peliculas` (`Id_pelicula`);

--
-- Filtros para la tabla `reservas`
--
ALTER TABLE `reservas`
    ADD CONSTRAINT `reservas_ibfk_1` FOREIGN KEY (`Id_usuario`) REFERENCES `usuarios` (`Id_usuario`),
  ADD CONSTRAINT `reservas_ibfk_2` FOREIGN KEY (`Id_funcion`) REFERENCES `funciones` (`Id_funcion`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
