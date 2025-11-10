<?php
// Inicia a sessão
session_start();

// Destroi todos os dados da sessão
session_unset();
session_destroy();

// Redireciona para a tela de login
header("Location: ../index.html");
exit;
?>
