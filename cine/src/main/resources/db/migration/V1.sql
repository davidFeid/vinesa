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
                         `Id_admin` int(11) NOT NULL,
                         `Password` varchar(50) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
                         `Nombre` varchar(50) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
                         `Estado` int(11) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Volcado de datos para la tabla `admin`
--

INSERT INTO `admin` (`Id_admin`, `Password`, `Nombre`, `Estado`) VALUES
    (1, 'admin123', 'admin', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `butacas`
--

DROP TABLE IF EXISTS `butacas`;
CREATE TABLE `butacas` (
                           `Id_butaca` int(11) NOT NULL,
                           `Id_sala` int(11) NOT NULL,
                           `Fila` int(11) DEFAULT NULL,
                           `Columna` int(11) DEFAULT NULL,
                           `Estado` int(11) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Volcado de datos para la tabla `butacas`
--

INSERT INTO `butacas` (`Id_butaca`, `Id_sala`, `Fila`, `Columna`, `Estado`) VALUES
                                                                                (1, 1, 1, 1, 1),
                                                                                (2, 1, 1, 2, 1),
                                                                                (3, 1, 1, 3, 1),
                                                                                (4, 1, 1, 4, 1),
                                                                                (5, 1, 1, 5, 1),
                                                                                (6, 2, 2, 6, 1),
                                                                                (7, 2, 2, 7, 1),
                                                                                (8, 2, 2, 8, 1),
                                                                                (9, 2, 2, 9, 1),
                                                                                (10, 2, 2, 10, 1);

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

INSERT INTO `butacasreservas` (`Id_butaca`, `Id_reserva`) VALUES
    (1, 20);

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

INSERT INTO `funciones` (`Id_funcion`, `Id_sala`, `Id_pelicula`, `Horario`, `Fecha`, `Precio`, `Estado`) VALUES
                                                                                                             (1, 1, 1, '18:00:00', '2023-04-25', 7, 1),
                                                                                                             (2, 2, 5, '18:00:00', '2023-04-25', 7, 1),
                                                                                                             (3, 3, 2, '18:00:00', '2023-04-25', 7, 1);

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
                                                                                                                                     (1, 'El Padrino', 'Francis Ford Coppola', 'Marlon Brando, Al Pacino, James Caan', 'Un poderoso jefe de la mafia lucha por mantener el control de su imperio.', 'Drama', 'https://example.com/el-padrino.jpg', 'https://www.youtube.com/watch?v=v72XprPxy3E&pp=ygUTZWwgcGFkcmlubyB0cmFpbGVyIA%3D%3D', 1),
                                                                                                                                     (2, 'Forrest Gump', 'Robert Zemeckis', 'Tom Hanks, Robin Wright, Gary Sinise', 'Un hombre simple con un corazón grande experimenta algunos de los momentos más importantes de la historia reciente de Estados Unidos.', 'Comedia dramática', 'https://example.com/forrest-gump.jpg', 'https://www.youtube.com/watch?v=aSEPD9w_dLM&pp=ygUkZm9ycmVzdCBndW1wIHRyYWlsZXIgZXNwYcOxb2wgbGF0aW5v', 1),
                                                                                                                                     (3, 'La La Land', 'Damien Chazelle', 'Ryan Gosling, Emma Stone, John Legend', 'Un pianista de jazz y una aspirante a actriz luchan por sus sueños en Los Ángeles.', 'Musical', 'https://example.com/la-la-land.jpg', 'https://www.youtube.com/watch?v=45s24h98iOc&pp=ygUibGEgbGEgbGFuZCB0cmFpbGVyIGVzcGHDsW9sIGxhdGlubw%3D%3D', 1),
                                                                                                                                     (4, 'Titanic', 'James Cameron', 'Leonardo DiCaprio, Kate Winslet, Billy Zane', 'Dos jóvenes de diferentes clases sociales se enamoran a bordo del Titanic mientras se prepara para su trágico final.', 'Drama', 'https://example.com/titanic.jpg', 'https://www.youtube.com/watch?v=1EMkCJWQIDY&pp=ygUfdGl0YW5pYyB0cmFpbGVyIGVzcGHDsW9sIGxhdGlubw%3D%3D', 1),
                                                                                                                                     (5, 'El Señor de los Anillos: La Comunidad del Anillo', 'Peter Jackson', 'Elijah Wood, Ian McKellen, Viggo Mortensen', 'Un pequeño hobbit y un grupo de compañeros emprenden una peligrosa misión para destruir un poderoso anillo que podría llevar a la destrucción del mundo.', 'Fantasía', 'https://example.com/el-senor-de-los-anillos.jpg', 'https://www.youtube.com/watch?v=3GJp6p_mgPo&pp=ygUrZWwgc2XDsW9yIGRlIGxvcyBhw7FpbGxvcyAxIGVzcGHDsW9sIGxhdGlubw%3D%3D', 1);

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

INSERT INTO `reservas` (`Id_reserva`, `Id_funcion`, `Id_usuario`, `Fecha_reserva`, `Precio`, `Estado`) VALUES
    (20, 1, 1, '2023-04-25 17:32:01', 7, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `salas`
--

DROP TABLE IF EXISTS `salas`;
CREATE TABLE `salas` (
                         `Id_sala` int(11) NOT NULL,
                         `Nombre` varchar(50) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
                         `Tipo` set('Normal','VOSE','Sala Dolby','Dolby3D','D-BOX') DEFAULT NULL,
                         `Filas` int(11) DEFAULT NULL,
                         `Butacasporfila` int(11) DEFAULT NULL,
                         `Estado` int(11) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Volcado de datos para la tabla `salas`
--

INSERT INTO `salas` (`Id_sala`, `Nombre`, `Tipo`, `Filas`, `Butacasporfila`, `Estado`) VALUES
                                                                                           (1, 'Sala 1', 'Normal', 10, 20, 1),
                                                                                           (2, 'Sala 2', 'VOSE', 12, 18, 1),
                                                                                           (3, 'Sala 3', 'Dolby3D', 8, 16, 1),
                                                                                           (4, 'Sala 4', 'Normal', 9, 22, 1),
                                                                                           (5, 'Sala 5', 'D-BOX', 10, 18, 1),
                                                                                           (6, 'Sala 6', 'VOSE', 11, 20, 1),
                                                                                           (7, 'Sala 7', 'Sala Dolby', 10, 22, 1),
                                                                                           (8, 'Sala 8', 'Normal', 8, 24, 1),
                                                                                           (9, 'Sala 9', 'D-BOX', 12, 16, 1),
                                                                                           (10, 'Sala 10', 'Normal', 9, 20, 1);

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
                            `Fecha_alta` datetime DEFAULT NULL,
                            `Tipo_usuario` varchar(20) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
                            `Estado` int(11) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`Id_usuario`, `Usuario`, `Password`, `Nombre`, `Apellido`, `DNI`, `Direccion`, `Ciudad`, `Codigo_postal`, `Fecha_alta`, `Tipo_usuario`, `Estado`) VALUES
                                                                                                                                                                           (1, 'usuario1', 'contraseña123', 'Juan', 'Pérez', 12345678, 'Calle Falsa 123', 'Buenos Aires', '1234', '2023-04-25 00:00:00', 'Cliente', 1),
                                                                                                                                                                           (2, 'usuario2', 'contraseña456', 'María', 'González', 23456789, 'Calle Falsa 456', 'Córdoba', '5678', '2023-04-25 00:00:00', 'Cliente', 1),
                                                                                                                                                                           (3, 'usuario3', 'contraseña789', 'Pedro', 'Rodríguez', 34567890, 'Calle Falsa 789', 'Rosario', '9012', '2023-04-25 00:00:00', 'Cliente', 1),
                                                                                                                                                                           (4, 'usuario4', 'contraseñaabc', 'Laura', 'Gómez', 45678901, 'Calle Falsa 1011', 'Mendoza', '3456', '2023-04-25 00:00:00', 'Cliente', 1),
                                                                                                                                                                           (5, 'usuario5', 'contraseñadef', 'Jorge', 'Fernández', 56789012, 'Calle Falsa 1213', 'San Juan', '7890', '2023-04-25 00:00:00', 'Cliente', 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `butacas`
--
ALTER TABLE `butacas`
    ADD PRIMARY KEY (`Id_butaca`,`Id_sala`),
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
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `butacas`
--
ALTER TABLE `butacas`
    MODIFY `Id_butaca` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

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
    ADD CONSTRAINT `butacasReservas_ibfk_1` FOREIGN KEY (`Id_butaca`) REFERENCES `butacas` (`Id_butaca`),
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
