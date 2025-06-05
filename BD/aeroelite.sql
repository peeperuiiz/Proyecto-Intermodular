-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 05-06-2025 a las 19:09:56
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `aeroelite`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `aviones`
--

CREATE TABLE `aviones` (
  `matricula` varchar(8) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `marca` varchar(50) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `modelo` varchar(50) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `rango_max` int(5) NOT NULL,
  `ruta` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Volcado de datos para la tabla `aviones`
--

INSERT INTO `aviones` (`matricula`, `marca`, `modelo`, `rango_max`, `ruta`) VALUES
('N101AA', 'Embraer', 'Phenom 100', 1900, ''),
('N102AB', 'Cessna', 'Citation M2', 1800, ''),
('N103AC', 'Honda', 'Jet HA-420', 1900, ''),
('N104AD', 'Eclipse', '500', 1800, ''),
('N105AE', 'Cirrus', 'Vision Jet SF50', 1950, ''),
('N106AF', 'Beechcraft', 'Premier I', 2000, ''),
('N107AG', 'Embraer', 'Phenom 100EV', 1900, ''),
('N108AH', 'Cessna', 'Citation Mustang', 1900, ''),
('N109AI', 'SyberJet', 'SJ30', 2000, ''),
('N110AJ', 'Learjet', '23', 1900, ''),
('N111AK', 'Piper', 'JetPROP DLX', 1800, ''),
('N112AL', 'Cessna', 'Citation CJ1+', 1950, ''),
('N113AM', 'Embraer', 'Phenom 100EX', 1900, ''),
('N114AN', 'Cirrus', 'Vision Jet G2+', 1900, ''),
('N115AO', 'Eclipse', '550', 1800, ''),
('N116AP', 'Honda', 'Jet Elite II', 2000, ''),
('N117AQ', 'Cessna', 'CitationJet CJ2', 1900, ''),
('N118AR', 'Beechcraft', 'Premier IA', 1950, ''),
('N119AS', 'SyberJet', 'SJ30i', 2000, ''),
('N120AT', 'Cessna', 'Citation V', 2000, ''),
('N201AA', 'Cessna', 'Citation XLS+', 3600, ''),
('N202AB', 'Embraer', 'Phenom 300E', 3700, ''),
('N203AC', 'Bombardier', 'Learjet 75', 3900, ''),
('N204AD', 'Dassault', 'Falcon 50', 4000, ''),
('N205AE', 'Cessna', 'Citation Latitude', 3900, ''),
('N206AF', 'Embraer', 'Legacy 450', 3800, ''),
('N207AG', 'Bombardier', 'Learjet 70', 3600, ''),
('N208AH', 'Gulfstream', 'G150', 3700, ''),
('N209AI', 'Hawker', '400XP', 3600, ''),
('N210AJ', 'Beechcraft', 'Hawker 900XP', 4000, ''),
('N211AK', 'Cessna', 'Citation Sovereign', 3700, ''),
('N212AL', 'Dassault', 'Falcon 2000LXS', 4000, ''),
('N213AM', 'Embraer', 'Praetor 500', 3900, ''),
('N214AN', 'Gulfstream', 'G280', 4000, ''),
('N215AO', 'Cessna', 'Citation Excel', 3800, ''),
('N216AP', 'Learjet', '60XR', 3900, ''),
('N217AQ', 'Hawker', '800XP', 3700, ''),
('N218AR', 'Dassault', 'Falcon 20', 3600, ''),
('N219AS', 'Embraer', 'Legacy 500', 3900, ''),
('N220AT', 'Bombardier', 'Learjet 60', 3700, ''),
('N301AA', 'Gulfstream', 'G650ER', 7500, ''),
('N302AB', 'Bombardier', 'Global 7500', 7700, ''),
('N303AC', 'Dassault', 'Falcon 8X', 7400, ''),
('N304AD', 'Embraer', 'Lineage 1000E', 4800, ''),
('N305AE', 'Cessna', 'Citation Longitude', 5200, ''),
('N306AF', 'Bombardier', 'Global 6000', 6000, ''),
('N307AG', 'Gulfstream', 'G500', 5800, ''),
('N308AH', 'Dassault', 'Falcon 7X', 5950, ''),
('N309AI', 'Airbus', 'ACJ319neo', 6800, ''),
('N310AJ', 'Boeing', 'BBJ 737-800', 7200, '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mantenimiento_av`
--

CREATE TABLE `mantenimiento_av` (
  `avion` varchar(8) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `fecha` date NOT NULL,
  `tipo_mant` enum('Rutinario','Preventivo','Correctivo') CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `costo` int(7) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `membresias`
--

CREATE TABLE `membresias` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nombre` varchar(25) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `descripcion` varchar(1000) NOT NULL,
  `h_vuelo_disp` int(5) NOT NULL,
  `rango_vuelo` enum('Nacional','Continental','Intercontinental','') CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `precio` int(8) NOT NULL,
  `ruta` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Volcado de datos para la tabla `membresias`
--

INSERT INTO `membresias` (`id`, `nombre`, `descripcion`, `h_vuelo_disp`, `rango_vuelo`, `precio`, `ruta`) VALUES
(1, 'Nothing', '', 0, '', 0, ''),
(2, 'FlyLocal', 'Perfect for those who need to travel quickly and exclusively within the country. Access light jets for business or personal trips without the hassle of commercial flight delays.', 40, 'Nacional', 350000, ''),
(3, 'AeroPlus', 'Designed for entrepreneurs or frequent regional travelers. Fly between countries within the same continent in mid-size jets that balance efficiency, comfort, and flexibility.', 100, 'Continental', 850000, ''),
(4, 'GlobalReach', 'For those crossing oceans. Gain access to long-range jets, ideal for intercontinental flights with premium amenities. With this membership, the world is truly within your reach.', 200, 'Intercontinental', 1800000, '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `dni` varchar(9) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `nombre` varchar(100) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `apellidos` varchar(100) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `email` varchar(100) NOT NULL,
  `nom_usu` varchar(50) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `password` varchar(20) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `h_vuelo` int(6) NOT NULL,
  `membresia` bigint(20) UNSIGNED NOT NULL,
  `tipo` enum('R','A') CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`dni`, `nombre`, `apellidos`, `email`, `nom_usu`, `password`, `h_vuelo`, `membresia`, `tipo`) VALUES
('12345678X', 'Alejandro', 'Aguayo', 'ale@gmail.com', 'AGCH', '12345', 0, 3, 'R');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `viajes`
--

CREATE TABLE `viajes` (
  `usuario` varchar(9) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `avion` varchar(8) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `fecha` date NOT NULL,
  `salida` varchar(150) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `llegada` varchar(150) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `distancia` int(10) NOT NULL,
  `duracion` float NOT NULL,
  `precio` bigint(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `aviones`
--
ALTER TABLE `aviones`
  ADD PRIMARY KEY (`matricula`);

--
-- Indices de la tabla `mantenimiento_av`
--
ALTER TABLE `mantenimiento_av`
  ADD PRIMARY KEY (`avion`,`fecha`);

--
-- Indices de la tabla `membresias`
--
ALTER TABLE `membresias`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`dni`),
  ADD KEY `fk_usu_mem` (`membresia`);

--
-- Indices de la tabla `viajes`
--
ALTER TABLE `viajes`
  ADD PRIMARY KEY (`usuario`,`avion`,`fecha`),
  ADD KEY `fk_via_avi` (`avion`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `membresias`
--
ALTER TABLE `membresias`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `mantenimiento_av`
--
ALTER TABLE `mantenimiento_av`
  ADD CONSTRAINT `fk_man_avi` FOREIGN KEY (`avion`) REFERENCES `aviones` (`matricula`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `fk_usu_mem` FOREIGN KEY (`membresia`) REFERENCES `membresias` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `viajes`
--
ALTER TABLE `viajes`
  ADD CONSTRAINT `fk_via_avi` FOREIGN KEY (`avion`) REFERENCES `aviones` (`matricula`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_via_usu` FOREIGN KEY (`usuario`) REFERENCES `usuarios` (`dni`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
