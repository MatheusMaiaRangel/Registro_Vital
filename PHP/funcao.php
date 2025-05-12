<?php
function buscar($cpfp){
    // Credenciais do banco de dados
    $servidor = "localhost";
    $usuario = "root";
    $senhadb = "";
    $dbname = "rv";
 
    // Conexão com o banco de dados
    $strcon = mysqli_connect($servidor, $usuario, $senhadb, $dbname) or die('Erro ao conectar ao banco de dados');
 
    // Consulta SQL
    $strincluir = "SELECT paciente.cpf, paciente.nome_paci, paciente.nascimento_paci, paciente.tipo_s_paci, 
        paciente.nome_contato_e_paci, paciente.contato_e_paci, paciente.peso_paci, 
        paciente.altura_paci, paciente.alcool_paci, paciente.doa_paci, paciente.org_tra_paci, 
        paciente.qual_org_tra_paci, paciente.ale_med_paci, paciente.qual_ale_med_paci, 
        paciente.onr_paci, paciente.tabaco_paci, paciente.alteracao_c_paci, paciente.marcap_paci, 
        paciente.plano_s_paci, paciente.qual_pla_s_paci, paciente.rest_re_paci, paciente.qual_rest_re_paci, 
        paciente.ativi_paci, paciente.qual_ativ_paci, paciente.doe_pre_exi_paci, paciente.qual_doe_pre_exi_paci, 
        paciente.medic_paci, paciente.qual_medic_paci, paciente.cirurgia_paci, paciente.qual_ciru_paci, paciente.caminho
    FROM paciente 
    WHERE cpf = '".$cpfp."'";
 
    $query = mysqli_query($strcon, $strincluir);
 
    // Verifica se encontrou resultados
    if (mysqli_num_rows($query) > 0) {
        return mysqli_fetch_assoc($query); // Retorna o registro como array associativo
    } else {
        return null; // Retorna null se não encontrar nada
    };
    mysqli_close($strcon);
};

function valores($alcool, $doacao, $transplante, $q_transplante, $alergia_m, $q_alergia_m, $onr, $tabagismo, $alteracao_c, $marcapasso, $plano_saude, $q_plano, $restricao_re, $q_restricao_re, $a_fisica, $q_a_fisica, $doenca_p_existente, $q_d_p_existente, $medicamento, $q_medicamento, $cirurgia, $q_cirurgia) {
    $resultados = [];

    $resultados['alcool'] = ($alcool == 'S') ? 'Sim' : 'Não';
    $resultados['doacao'] = ($doacao == 'S') ? 'Sim' : 'Não';
    $resultados['transplante'] = ($transplante == 'S') ? 'Sim' : 'Não';
    $resultados['q_transplante'] = ($q_transplante == '') ? 'Nenhum' : $q_transplante;
    $resultados['alergia_m'] = ($alergia_m == 'S') ? 'Sim' : 'Não';
    $resultados['q_alergia_m'] = ($q_alergia_m == '') ? 'Nenhuma' : $q_alergia_m;
    $resultados['onr'] = ($onr == 'S') ? 'Sim' : 'Não';
    $resultados['tabagismo'] = ($tabagismo == 'S') ? 'Sim' : 'Não';
    $resultados['alteracao_c'] = ($alteracao_c == 'S') ? 'Sim' : 'Não';
    $resultados['marcapasso'] = ($marcapasso == 'S') ? 'Sim' : 'Não';
    $resultados['plano_saude'] = ($plano_saude == 'S') ? 'Sim' : 'Não';
    $resultados['q_plano'] = ($q_plano == '') ? 'Nenhum' : $q_plano;
    $resultados['restricao_re'] = ($restricao_re == 'S') ? 'Sim' : 'Não';
    $resultados['q_restricao_re'] = ($q_restricao_re == '') ? 'Nenhuma' : $q_restricao_re;
    $resultados['a_fisica'] = ($a_fisica == 'S') ? 'Sim' : 'Não';
    $resultados['q_a_fisica'] = ($q_a_fisica == '') ? 'Nenhuma' : $q_a_fisica;
    $resultados['doenca_p_existente'] = ($doenca_p_existente == 'S') ? 'Sim' : 'Não';
    $resultados['q_d_p_existente'] = ($q_d_p_existente == '') ? 'Nenhuma' : $q_d_p_existente;
    $resultados['medicamento'] = ($medicamento == 'S') ? 'Sim' : 'Não';
    $resultados['q_medicamento'] = ($q_medicamento == '') ? 'Nenhum' : $q_medicamento;
    $resultados['cirurgia'] = ($cirurgia == 'S') ? 'Sim' : 'Não';
    $resultados['q_cirurgia'] = ($q_cirurgia == '') ? 'Nenhuma' : $q_cirurgia;

    return $resultados;
};

?>