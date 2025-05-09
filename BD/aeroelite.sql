SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

CREATE TABLE `aviones` (
  `matricula` varchar(8) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `marca` varchar(50) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `modelo` varchar(50) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `rango_max` int(5) NOT NULL,
  `rango_min` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

CREATE TABLE `mantenimiento_av` (
  `avion` varchar(8) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `fecha` date NOT NULL,
  `tipo_mant` enum('Rutinario','Preventivo','Correctivo') CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `costo` int(7) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

CREATE TABLE `membresias` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nombre` varchar(25) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `h_vuelo_disp` int(5) NOT NULL,
  `rango_vuelo` enum('Nacional','Continental','Intercontinental','') CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `precio` int(8) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

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

CREATE TABLE `viajes` (
  `usuario` varchar(9) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `avion` varchar(8) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `fecha` date NOT NULL,
  `salida` varchar(150) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `llegada` varchar(150) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `distancia` int(5) NOT NULL,
  `duracion` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

ALTER TABLE `aviones`
  ADD PRIMARY KEY (`matricula`);

ALTER TABLE `mantenimiento_av`
  ADD PRIMARY KEY (`avion`,`fecha`);

ALTER TABLE `membresias`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`dni`),
  ADD KEY `fk_usu_mem` (`membresia`);

ALTER TABLE `viajes`
  ADD PRIMARY KEY (`usuario`,`avion`,`fecha`),
  ADD KEY `fk_via_avi` (`avion`);

ALTER TABLE `membresias`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

ALTER TABLE `mantenimiento_av`
  ADD CONSTRAINT `fk_man_avi` FOREIGN KEY (`avion`) REFERENCES `aviones` (`matricula`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `usuarios`
  ADD CONSTRAINT `fk_usu_mem` FOREIGN KEY (`membresia`) REFERENCES `membresias` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `viajes`
  ADD CONSTRAINT `fk_via_avi` FOREIGN KEY (`avion`) REFERENCES `aviones` (`matricula`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_via_usu` FOREIGN KEY (`usuario`) REFERENCES `usuarios` (`dni`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;