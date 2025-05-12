<?php
include 'funcao.php';
session_start();

error_reporting(0); // Desabilita todos os tipos de erro
ini_set('display_errors', 0); 

$cpfp = $_POST['cpf'];

if ($cpfp) {
    // Chama a função para buscar os dados do paciente
    $dadosPaciente = buscar($cpfp);

    if ($dadosPaciente) {
        // Exibe os dados do paciente
        $cpf=$dadosPaciente['cpf'];
        $nome=$dadosPaciente['nome_paci'];
        $nascimento=$dadosPaciente['nascimento_paci'];
        $sangue=$dadosPaciente['tipo_s_paci'];
        $nome_contato=$dadosPaciente['nome_contato_e_paci'];
        $n_contato_e=$dadosPaciente['contato_e_paci'];
        $peso=$dadosPaciente['peso_paci'];
        $altura=$dadosPaciente['altura_paci'];
        $alcool=$dadosPaciente['alcool_paci'];
        $doacao=$dadosPaciente['doa_paci'];
        $transplante=$dadosPaciente['org_tra_paci'];
        $q_transplante=$dadosPaciente['qual_org_tra_paci'];
        $alergia_m=$dadosPaciente['ale_med_paci'];
        $q_alergia_m=$dadosPaciente['qual_ale_med_paci'];
        $onr=$dadosPaciente['onr_paci'];
        $tabagismo=$dadosPaciente['tabaco_paci'];
        $alteracao_c=$dadosPaciente['alteracao_c_paci'];
        $marcapasso=$dadosPaciente['marcap_paci'];
        $plano_saude=$dadosPaciente['plano_s_paci'];
        $q_plano=$dadosPaciente['qual_pla_s_paci'];
        $restricao_re=$dadosPaciente['rest_re_paci'];
        $q_restricao_re=$dadosPaciente['qual_rest_re_paci'];
        $a_fisica=$dadosPaciente['ativi_paci'];
        $q_a_fisica=$dadosPaciente['qual_ativ_paci'];
        $doenca_p_existente=$dadosPaciente['doe_pre_exi_paci'];
        $q_d_p_existente=$dadosPaciente['qual_doe_pre_exi_paci'];
        $medicamento=$dadosPaciente['medic_paci'];
        $q_medicamento=$dadosPaciente['qual_medic_paci'];
        $cirurgia=$dadosPaciente['cirurgia_paci'];
        $q_cirurgia=$dadosPaciente['qual_ciru_paci'];
        $uploadFile=$dadosPaciente['caminho'];
        
        $date = DateTime::createFromFormat('Y-m-d', $nascimento);
        $data_formatada = $date->format('d/m/Y');

        $telefoneFormatado = preg_replace('/(\d{2})(\d{5})(\d{4})/', '($1) $2-$3', $n_contato_e);

        $cpf = preg_replace('/\D/', '', $cpf);
        $cpfFormatado = substr($cpf, 0, 3) . '.' . substr($cpf, 3, 3) . '.' . substr($cpf, 6, 3) . '-' . substr($cpf, 9, 2);

        // Chamar a função valores e armazenar os resultados em variáveis
        $resultados = valores($alcool, $doacao, $transplante, $q_transplante, $alergia_m, $q_alergia_m, $onr, $tabagismo, $alteracao_c, $marcapasso, $plano_saude, $q_plano, $restricao_re, $q_restricao_re, $a_fisica, $q_a_fisica, $doenca_p_existente, $q_d_p_existente, $medicamento, $q_medicamento, $cirurgia, $q_cirurgia);
        // Armazenar cada valor nas variáveis específicas
        $alcool = $resultados['alcool'];
        $doacao = $resultados['doacao'];
        $transplante = $resultados['transplante'];
        $q_transplante = $resultados['q_transplante'];
        $alergia_m = $resultados['alergia_m'];
        $q_alergia_m = $resultados['q_alergia_m'];
        $onr = $resultados['onr'];
        $tabagismo = $resultados['tabagismo'];
        $alteracao_c = $resultados['alteracao_c'];
        $marcapasso = $resultados['marcapasso'];
        $plano_saude = $resultados['plano_saude'];
        $q_plano = $resultados['q_plano'];
        $restricao_re = $resultados['restricao_re'];
        $q_restricao_re = $resultados['q_restricao_re'];
        $a_fisica = $resultados['a_fisica'];
        $q_a_fisica = $resultados['q_a_fisica'];
        $doenca_p_existente = $resultados['doenca_p_existente'];
        $q_d_p_existente = $resultados['q_d_p_existente'];
        $medicamento = $resultados['medicamento'];
        $q_medicamento = $resultados['q_medicamento'];
        $cirurgia = $resultados['cirurgia'];
        $q_cirurgia = $resultados['q_cirurgia'];

// Agora você pode usar essas variáveis como necessário

    } else {
        header("Location: ../erro.html");
        exit;

    };
};
echo("<!doctype html>
<html lang='pt-3'>
    <head>
        <meta charset='utf-8'>
        <meta name='viewport' content='width=device-width, initial-scale=1'>
        <title>Registro Vital</title>
        <!-- Ícones do Bootstrap (para o ícone do QR Code) -->
        <link href='https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css' rel='stylesheet'>
        <link rel='stylesheet' href='../CSS/style.css'>
        <link href='https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css' rel='stylesheet' integrity='sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH' crossorigin='anonymous'>
        <!-- Link para o Bootstrap Icons -->
        <link rel='stylesheet' href='https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css'>

    </head>
    <body>

        <!--navbar--->
        <nav class='navbar fixed-top'>
            <div class='container-fluid'>
                <img class='rvimg img-fluid' src='../img/rv4.PNG'> <!---navbar-->
            </div>
        </nav>

        <!--corpo-->
            <div class='container mt-5'>
                <div class='row align-items-center'>
                    <!-- Caixa da esquerda -->
                    <div class='col-auto'>
                        <div class='box' id='imagePreview'><img class='dislocate' src='$uploadFile'   alt='Imagem Carregada' style='max-width:300px; margin-top:10px;' /></div>
                    </div>

                    <!-- Formulário -->
                    <div class='col'>
                        <div class='form-container'>
                            <div class='row mb-3'>
                                <div class='col'>
                                    <label for='nome' class='form-label-branco'>Nome:</label>
                                    <br>
                                    <label>$nome</label>
                                </div>
                                <div class='col'>
                                    <label for='cpf' class='form-label-branco'>CPF:</label>
                                    <br>
                                    <label>$cpfFormatado</label>
                                </div>
                            </div>
                            <div class='row mb-3'>
                                <div class='col'>
                                    <label for='nascimento' class='form-label-branco'>Nascimento:</label>
                                    <br>
                                    <label>$data_formatada</label>
                                </div>
                                <div class='col'>
                                    <label for='tipo-sanguineo' class='form-label-branco'>Tipo sanguíneo:</label>
                                    <br>
                                    <label>$sangue</label>
                                </div>
                            </div>
                            <div class='row'>
                                <div class='col'>
                                    <label for='nome-contato' class='form-label-branco'>Nome do contato:</label>
                                    <br>
                                    <label>$nome_contato</label>
                                </div>
                                <div class='col'>
                                    <label for='contato-emergencia' class='form-label-branco'>Contato de emergência:</label>
                                    <br>
                                    <label>$telefoneFormatado</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class='container mt-4'>
                <div class='row'>
                    <!-- Coluna da Esquerda -->
                    <div class='col-md-6'>
                        <div class='card p-3 border-success'>
                            <div class='mb-3'>
                                <label for='peso' class='form-label'>Peso:</label>
                                <br>
                                <label>$peso</label>
                            </div>
                            <div class='mb-3'>
                                <label for='altura' class='form-label'>Altura:</label>
                                <br>
                                <label>$altura</label>
                            </div>
                            <div class='mb-3'>
                                <label class='form-label'>Ingere bebida alcoólica:</label>
                                <br>
                                <label>$alcool</label>
                            </div>
                            <div class='mb-3'>
                                <label class='form-label'>É doador de órgãos:</label>
                                <br>
                                <label>$doacao</label>
                            </div>
                            <div class='mb-3'>
                                <label class='form-label'>Possui órgão transplantado:</label>
                                <br>
                                <label>$transplante</label>
                                <div class='mt-2'>
                                    <label for='planoSaudeDetalhes' class='form-label'>Qual?</label>
                                    <br>
                                    <label>$q_transplante</label>
                                </div>
                            </div>
                  
                            <div class='mb-3'>
                                <label class='form-label'>Possui alguma alergia a medicamentos:</label>
                                <br>
                                <label>$alergia_m</label>
                                <div class='mt-2'>
                                    <label for='planoSaudeDetalhes' class='form-label'>Qual?</label>
                                    <br>
                                    <label>$q_alergia_m</label>
                                </div>
                            </div>
                
                            <div class='mb-3'>
                                <label class='form-label'>Possui ordem de não reanimar (ONR):</label>
                                <br>
                                <label>$onr</label>
                                
                            </div>
                            <!---QR CODE-->
                            <center>
                                <button class='buttonqrcode'>
                                    <i class='bi bi-qr-code-scan'></i>
                                </button>
                            </center>

                            <div id='qrModal' class='modal'>
                                <div class='modal-content'>
                                    <span class='close'>&times;</span>
                                    <div id='qrcode'></div> <!-- Onde o QR Code será gerado -->
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Coluna da Direita -->
                    <div class='col-md-6'>
                        <div class='card p-3 border-success'>
                            <div class='mb-3'>
                                <label class='form-label'>Tabagismo?</label>
                                <br>
                                <label>$tabagismo</label>
                            </div>
                        
                            <!-- Alterações cardíacas? -->
                            <div class='mb-3'>
                                <label class='form-label'>Alterações cardíacas?</label>
                                <br>
                                <label>$alteracao_c</label>
                            </div>
                        
                            <!-- Portador de marcapasso? -->
                            <div class='mb-3'>
                                <label class='form-label'>Portador de marcapasso?</label>
                                <br>
                                <label>$marcapasso</label>
                            </div>
                        
                            <!-- Possui plano de saúde? -->
                            <div class='mb-3'>
                                <label class='form-label'>Possui plano de saúde?</label>
                                <br>
                                <label>$plano_saude</label>
                                <div class='mt-2'>
                                    <label for='planoSaudeDetalhes' class='form-label'>Especifique o plano:</label>
                                    <br>
                                    <label>$q_plano</label>
                                </div>
                            </div>
                          
                            <!-- Possui restrição religiosa? -->
                            <div class='mb-3'>
                                <label class='form-label'>Possui restrição religiosa?</label>
                                <br>
                                <label>$restricao_re</label>
                                <div class='mt-2'>
                                    <label for='restricaoReligiosaDetalhes' class='form-label'>Qual?</label>
                                    <br>
                                    <label>$q_restricao_re</label>
                                </div>
                            </div>
                          
                            <!-- Pratica atividade física? -->
                            <div class='mb-3'>
                                <label class='form-label'>Pratica atividade física?</label>
                                <br>
                                <label>$a_fisica</label>
                                <div class='mt-2'>
                                    <label for='atividadeFisicaDetalhes' class='form-label'>Qual?</label>
                                    <br>
                                    <label>$q_a_fisica</label>
                                </div>
                            </div>
                          
                            <!-- Possui doença pré-existente? -->
                            <div class='mb-3'>
                                <label class='form-label'>Possui doença pré-existente?</label>
                                <br>
                                <label>$doenca_p_existente</label>
                                <div class='mt-2'>
                                    <label for='doencaPreExistenteDetalhes' class='form-label'>Qual?</label>
                                    <br>
                                    <label>$q_d_p_existente</label>
                                </div>
                            </div>
                          
                            <!-- Faz uso de algum medicamento? -->
                            <div class='mb-3'>
                                <label class='form-label'>Faz uso de algum medicamento?</label>
                                <br>
                                <label>$medicamento</label>
                                <div class='mt-2'>
                                    <label for='medicamentoDetalhes' class='form-label'>Especifique qual, frequência e dosagem:</label>
                                    <br>
                                    <label>$q_medicamento</label>
                                </div>
                            </div>
                          
                            <!-- Realizou cirurgia anteriormente? -->
                            <div class='mb-3'>
                                <label class='form-label'>Realizou cirurgia anteriormente?</label>
                                <br>
                                <label>$cirurgia</label>
                                <div class='mt-2'>
                                    <label for='cirurgiaAnteriorDetalhes' class='form-label'>Qual?</label>
                                    <br>
                                    <label>$q_cirurgia</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Botão de Edição -->
                <div class='text-center mt-3'>
                    <a href='editar_perfil_HTML.php'>
                        <button class='btn btn-success'>Editar</button>
                    </a>
                    <a href='logout.php'>
                        <button class='btn btn-success'>Sair</button>
                    </a>
                    
                </div>
            </div>
        <br>    
        <script src='https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js' integrity='sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz' crossorigin='anonymous'></script>
        <script src='https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js'></script>
        <script src='../jsstyle.js'></script>
    </body>
</html>");
?>