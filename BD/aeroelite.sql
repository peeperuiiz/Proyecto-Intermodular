-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 09-06-2025 a las 11:39:53
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
('N101AA', 'Embraer', 'Phenom 100', 1900, '/src/assets/planes/EmbraerPhenom100.webp'),
('N102AB', 'Cessna', 'Citation M2', 1800, '/src/assets/planes/CessnaCitationM2.JPG'),
('N103AC', 'Honda', 'Jet HA-420', 1900, '/src/assets/planes/HondaJetHa420.webp'),
('N104AD', 'Eclipse', '500', 1800, '/src/assets/planes/Eclipse500.webp'),
('N105AE', 'Cirrus', 'Vision Jet SF50', 1950, '/src/assets/planes/CirrusVisionSf50.webp'),
('N106AF', 'Beechcraft', 'Premier I', 2000, '/src/assets/planes/BeechcraftPremier1.webp'),
('N107AG', 'Embraer', 'Phenom 100EV', 1900, '/src/assets/planes/EmbraerPhenom100Ev.webp'),
('N108AH', 'Cessna', 'Citation Mustang', 1900, '/src/assets/planes/CessnaCitationMustang.webp'),
('N109AI', 'SyberJet', 'SJ30', 2000, '/src/assets/planes/SyberjetSj30.jpg'),
('N110AJ', 'Learjet', '23', 1900, '/src/assets/planes/Learjet23.jpg'),
('N111AK', 'Piper', 'JetPROP DLX', 1800, '/src/assets/planes/PiperJetdropDlx.jpg'),
('N112AL', 'Cessna', 'Citation CJ1+', 1950, '/src/assets/planes/CessnaCitationCj1.jpg'),
('N113AM', 'Embraer', 'Phenom 100EX', 1900, '/src/assets/planes/EmbraerPhenom100Ex.jpg'),
('N114AN', 'Cirrus', 'Vision Jet G2+', 1900, '/src/assets/planes/CirrusVisionJetG2.jpg'),
('N115AO', 'Eclipse', '550', 1800, '/src/assets/planes/Eclipse550.webp'),
('N116AP', 'Honda', 'Jet Elite II', 2000, '/src/assets/planes/HondaJetEliteII.jpg'),
('N117AQ', 'Cessna', 'CitationJet CJ2', 1900, '/src/assets/planes/CessnaCitationJetCj2.jpg'),
('N118AR', 'Beechcraft', 'Premier IA', 1950, '/src/assets/planes/BeechcraftPremierIa.jpg'),
('N119AS', 'SyberJet', 'SJ30i', 2000, '/src/assets/planes/SyberjetSj30I.jpg'),
('N120AT', 'Cessna', 'Citation V', 2000, '/src/assets/planes/CessnaCitationV.jpg'),
('N201AA', 'Cessna', 'Citation XLS+', 3600, '/src/assets/planes/CessnaCitationXls.jpg'),
('N202AB', 'Embraer', 'Phenom 300E', 3700, '/src/assets/planes/EmbraerPhenom300E.jpg'),
('N203AC', 'Bombardier', 'Learjet 75', 3900, '/src/assets/planes/BombardierLearjet75.webp'),
('N204AD', 'Dassault', 'Falcon 50', 4000, '/src/assets/planes/DassaultFalcon50.webp'),
('N205AE', 'Cessna', 'Citation Latitude', 3900, '/src/assets/planes/CessnaCitationLongitude.jpg'),
('N206AF', 'Embraer', 'Legacy 450', 3800, '/src/assets/planes/EmbraerLegacy450.jpg'),
('N207AG', 'Bombardier', 'Learjet 70', 3600, '/src/assets/planes/BombardierLearjet70.jpg'),
('N208AH', 'Gulfstream', 'G150', 3700, '/src/assets/planes/GulfstreamG150.jpg'),
('N209AI', 'Hawker', '400XP', 3600, '/src/assets/planes/Hawker400Xp.jpg'),
('N210AJ', 'Beechcraft', 'Hawker 900XP', 4000, '/src/assets/planes/BeechcraftHawker900Xp.webp'),
('N211AK', 'Cessna', 'Citation Sovereign', 3700, '/src/assets/planes/CessnaCitationSovereign.jpg'),
('N212AL', 'Dassault', 'Falcon 2000LXS', 4000, '/src/assets/planes/DassaultFalcon2000Lxs.webp'),
('N213AM', 'Embraer', 'Praetor 500', 3900, '/src/assets/planes/EmbraerPraetor500.jpg'),
('N214AN', 'Gulfstream', 'G280', 4000, '/src/assets/planes/GulfstreamG280.jpg'),
('N215AO', 'Cessna', 'Citation Excel', 3800, '/src/assets/planes/CessnaCitationExcel.jpg'),
('N216AP', 'Learjet', '60XR', 3900, '/src/assets/planes/Learjet60Xr.webp'),
('N217AQ', 'Hawker', '800XP', 3700, '/src/assets/planes/Hawker800Xp.jpg'),
('N218AR', 'Dassault', 'Falcon 20', 3600, '/src/assets/planes/DassaultFalcon20.jpg'),
('N219AS', 'Embraer', 'Legacy 500', 3900, '/src/assets/planes/EmbraerLegacy500.jpg'),
('N220AT', 'Bombardier', 'Learjet 60', 3700, '/src/assets/planes/BombardierLearjet60.jpg'),
('N301AA', 'Gulfstream', 'G650ER', 7500, '/src/assets/planes/GulfstreamG650Er.webp'),
('N302AB', 'Bombardier', 'Global 7500', 7700, '/src/assets/planes/GulfstreamG650Er.webp'),
('N303AC', 'Dassault', 'Falcon 8X', 7400, '/src/assets/planes/DassaultFalcon8X.jpg'),
('N304AD', 'Embraer', 'Lineage 1000E', 4800, '/src/assets/planes/EmbraerLineage1000E.jpg'),
('N305AE', 'Cessna', 'Citation Longitude', 5200, '/src/assets/planes/CessnaCitationLongitude.jpg'),
('N306AF', 'Bombardier', 'Global 6000', 6000, '/src/assets/planes/BombardierGlobal6000.jpg'),
('N307AG', 'Gulfstream', 'G500', 5800, '/src/assets/planes/GulfstreamG500.jpg'),
('N308AH', 'Dassault', 'Falcon 7X', 5950, '/src/assets/planes/DassaultFalcon7X.webp'),
('N309AI', 'Airbus', 'ACJ319neo', 6800, '/src/assets/planes/AirbusAcj319Neo.webp'),
('N310AJ', 'Boeing', 'BBJ 737-800', 7200, '/src/assets/planes/BoeingBbj737-700.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mantenimiento_av`
--

CREATE TABLE `mantenimiento_av` (
  `avion` varchar(8) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `fecha` date NOT NULL,
  `orden` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `tipo_mant` enum('Rutinario','Preventivo','Correctivo') CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `costo` int(7) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Volcado de datos para la tabla `mantenimiento_av`
--

INSERT INTO `mantenimiento_av` (`avion`, `fecha`, `orden`, `tipo_mant`, `costo`) VALUES
('N102AB', '2025-06-08', '2025-06-08 09:23:57', 'Rutinario', 250000),
('N108AH', '2025-06-08', '2025-06-08 16:20:24', 'Correctivo', 1000000),
('N114AN', '2025-06-08', '2025-06-08 09:19:50', 'Rutinario', 250000),
('N207AG', '2025-06-08', '2025-06-08 09:23:13', 'Preventivo', 500000),
('N208AH', '2025-06-08', '2025-06-08 16:20:52', 'Preventivo', 500000),
('N214AN', '2025-06-08', '2025-06-08 09:21:57', 'Rutinario', 250000),
('N220AT', '2025-06-08', '2025-06-08 09:21:33', 'Rutinario', 250000);

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
(2, 'FlyLocal', 'Perfect for those who need to travel quickly and exclusively within the country. Access light jets for business or personal trips without the hassle of commercial flight delays.', 40, 'Nacional', 350000, '/src/assets/members/FlyLocal.jpg'),
(3, 'AeroPlus', 'Designed for entrepreneurs or frequent regional travelers. Fly between countries within the same continent in mid-size jets that balance efficiency, comfort, and flexibility.', 100, 'Continental', 850000, '/src/assets/members/AeroPlus.jpg'),
(4, 'GlobalReach', 'For those crossing oceans. Gain access to long-range jets, ideal for intercontinental flights with premium amenities. With this membership, the world is truly within your reach.', 200, 'Intercontinental', 1800000, '/src/assets/members/GlobalReach.jpg');

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
('12345678X', 'Alejandro', 'Aguayo', 'ale@gmail.com', 'AGCH', '12345', 13, 3, 'R'),
('23456789Y', 'Laura', 'Gómez', 'laura.gomez@example.com', 'LGMZ', 'clave123', 0, 2, 'R'),
('34567890Z', 'Carlos', 'Pérez', 'carlos.perez@example.com', 'CPRZ', 'abc12345', 0, 3, 'R'),
('45678901A', 'Marta', 'López', 'marta.lopez@example.com', 'MLOP', 'pass456', 0, 4, 'R'),
('56789012B', 'Leo', 'Messi', 'messi@gmail.com', 'MESSI', 'messi', 0, 1, 'R'),
('87654321Z', 'Pepe', 'Ruiz', 'pepe@gmail.com', 'Pepillx', '12345', 0, 1, 'A');

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
-- Volcado de datos para la tabla `viajes`
--

INSERT INTO `viajes` (`usuario`, `avion`, `fecha`, `salida`, `llegada`, `distancia`, `duracion`, `precio`) VALUES
('12345678X', 'N116AP', '2025-09-15', 'Reggio Calabria Airport (REG)', 'Grants Milan Municipal Airport (GNT)', 10010, 11.12, 121000),
('12345678X', 'N301AA', '2025-06-08', 'Federico Garcia Lorca Airport (GRX)', 'Berlin Brandenburg Airport (BER)', 2158, 2.4, 0),
('12345678X', 'N305AE', '2025-06-25', 'Valencia Airport (VLC)', 'Federico Garcia Lorca Airport (GRX)', 384, 0.43, 0),
('12345678X', 'N306AF', '2025-06-13', 'Beijing Capital International Airport (PEK)', 'Tokyo International Airport (HND)', 2092, 2.32, 0),
('12345678X', 'N310AJ', '2025-06-17', 'Madrid Barajas International Airport (MAD)', 'Gary Chicago International Airport (GYY)', 6728, 7.48, 40000),
('56789012B', 'N301AA', '2025-05-09', 'Barcelona International Airport (BCN)', 'London Gatwick Airport (LGW)', 1109, 1.23, 30000),
('56789012B', 'N302AB', '2025-07-09', 'Federico Garcia Lorca Airport (GRX)', 'Los Angeles International Airport (LAX)', 9611, 10.68, 185000);

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
