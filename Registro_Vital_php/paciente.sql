-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 24/11/2024 às 22:58
-- Versão do servidor: 10.4.32-MariaDB
-- Versão do PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `rv`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `paciente`
--

CREATE TABLE `paciente` (
  `cpf` char(14) NOT NULL,
  `senha_paci` varchar(255) NOT NULL,
  `nome_paci` varchar(999) NOT NULL,
  `nascimento_paci` date NOT NULL,
  `tipo_s_paci` varchar(3) NOT NULL,
  `nome_contato_e_paci` varchar(999) NOT NULL,
  `contato_e_paci` char(11) NOT NULL,
  `peso_paci` varchar(6) NOT NULL,
  `altura_paci` varchar(4) NOT NULL,
  `alcool_paci` char(1) NOT NULL,
  `doa_paci` char(1) NOT NULL,
  `org_tra_paci` char(1) NOT NULL,
  `qual_org_tra_paci` varchar(999) DEFAULT NULL,
  `ale_med_paci` char(1) NOT NULL,
  `qual_ale_med_paci` varchar(999) DEFAULT NULL,
  `onr_paci` char(1) NOT NULL,
  `tabaco_paci` char(1) NOT NULL,
  `alteracao_c_paci` char(1) NOT NULL,
  `marcap_paci` char(1) NOT NULL,
  `plano_s_paci` char(1) NOT NULL,
  `qual_pla_s_paci` varchar(999) DEFAULT NULL,
  `rest_re_paci` char(1) NOT NULL,
  `qual_rest_re_paci` varchar(999) DEFAULT NULL,
  `ativi_paci` char(1) NOT NULL,
  `qual_ativ_paci` varchar(999) DEFAULT NULL,
  `doe_pre_exi_paci` char(1) NOT NULL,
  `qual_doe_pre_exi_paci` varchar(999) DEFAULT NULL,
  `medic_paci` char(1) NOT NULL,
  `qual_medic_paci` varchar(999) DEFAULT NULL,
  `cirurgia_paci` char(1) NOT NULL,
  `qual_ciru_paci` varchar(999) DEFAULT NULL,
  `caminho` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `paciente`
--
ALTER TABLE `paciente`
  ADD PRIMARY KEY (`cpf`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
