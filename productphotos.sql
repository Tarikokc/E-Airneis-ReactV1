-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : dim. 02 juin 2024 à 19:01
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `e-airneis`
--

-- --------------------------------------------------------

--
-- Structure de la table `productphotos`
--

CREATE TABLE `productphotos` (
  `photo_id` int(11) NOT NULL,
  `product_id` int(11) DEFAULT NULL,
  `photo_url` varchar(255) DEFAULT NULL,
  `is_primary` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `productphotos`
--

INSERT INTO `productphotos` (`photo_id`, `product_id`, `photo_url`, `is_primary`) VALUES
(1, 1, 'chaise-dsw.jpg', 1),
(2, 1, 'chaise-dsw-autre-angle.jpg', 0),
(3, 2, 'fauteuil-egg.jpg', 1),
(4, 3, 'lampe-pipistrello.jpg', 1),
(5, 4, 'canape-tufty-time.jpg', 1),
(6, 5, 'bibliotheque-aim.jpg', 1),
(7, 6, 'table-basse-em.jpg', 1),
(8, 7, 'lit-lc4.jpg', 1),
(9, 8, 'suspension-flowerpot.jpg', 1),
(10, 9, 'tabouret-mezzadro.jpg', 1),
(11, 10, 'etagere-string-pocket.jpg', 1);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `productphotos`
--
ALTER TABLE `productphotos`
  ADD PRIMARY KEY (`photo_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `productphotos`
--
ALTER TABLE `productphotos`
  ADD CONSTRAINT `productphotos_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
