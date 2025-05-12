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
        echo "<div style='text-align: center; font-size: 24px; color: #FF0000;'>Nenhum paciente encontrado para esse CPF!</div>";
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
        <form name='FPaciente' method='post' action='enviar.php' enctype='multipart/form-data'>
            <div class='container mt-5'>
                <div class='row align-items-center'>
                    <!-- Caixa da esquerda -->
                    <div class='col-auto'>
                        <div id='imagePreview' class='box'></div>
                        <input type='file' name='image' id='fileInput' accept='image/*'>
                    </div>
                    

                    <!-- Formulário -->
                    <div class='col'>
                        <div class='form-container'>
                            <div class='row mb-3'>
                                <div class='col'>
                                    <label for='nome' class='form-label-branco'>Nome:</label>
                                    <input type='text' class='form-control' id='nome' name='nome' value=\"$nome\"  aria-='true'>
                                </div>
                                <div class='col'>
                                    <label for='cpf' class='form-label-branco'>CPF:</label>
                                    <input type='text' class='form-control' id='cpf' name='cpf' value=\"$cpf\" maxlength='11' aria-='true' pattern='\d+' placeholder='' required>
                                </div>
                            </div>
                            <div class='row mb-3'>
                                <div class='col'>
                                    <label for='nascimento' class='form-label-branco'>Nascimento:</label>
                                    <input type='date' class='form-control' id='nascimento' value=\"$nascimento\" name='nascimento' aria-required='true' required>
                                </div>
                                <div class='col'>
                                    <label for='tipo-sanguineo' class='form-label-branco'>Tipo sanguíneo:</label>
                                    <select type='text' class='form-control' id='tipo-sanguineo' name='tipo-sanguineo' maxlength='3' aria-required='true' required>
                                        <option selected value=\"$sangue\">$sangue</option>
                                        <option value='O+'>O+</option>
                                        <option value='O-'>O-</option>
                                        <option value='A+'>A+</option>
                                        <option value='A-'>A-</option>
                                        <option value='B+'>B+</option>
                                        <option value='B-'>B-</option>
                                        <option value='AB+'>AB+</option>
                                        <option value='AB-'>AB-</option>
                                    </select>
                                </div>
                            </div>
                            <div class='row'>
                                <div class='col'>
                                    <label for='nome-contato' class='form-label-branco'>Nome do contato:</label>
                                    <input type='text' class='form-control' id='nome-contato' name='nome-contato' aria-required='true' value=\"$nome_contato\" required>
                                </div>
                                <div class='col'>
                                    <label for='contato-emergencia' class='form-label-branco'>Contato de emergência:</label>
                                    <input type='text' class='form-control' id='contato-emergencia' name='contato-emergencia' aria-required='true' maxlength='11' pattern='\d+' placeholder='Insira apenas números' value=\"$n_contato_e\" required>
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
                                <input type='text' id='peso' name='peso' class='form-control' aria-required='true' pattern='\d+' placeholder='Insira apenas números' value=\"$peso\" required>
                            </div>
                            <div class='mb-3'>
                                <label for='altura' class='form-label'>Altura:</label>
                                <input type='text' id='altura' name='altura' class='form-control' aria-required='true' pattern='\d+' placeholder='Insira apenas números' value='".$altura."' required>
                            </div>
                            <div class='mb-3'>
                                <label class='form-label'>Ingere bebida alcoólica:</label>
                                <div class='form-check'>
                                    <input class='form-check-input' type='radio' name='alcool' id='alcoolSim' value='S' aria-required='true' required>
                                    <label class='form-check-label' for='alcoolSim'>Sim</label>
                                </div>
                                <div class='form-check'>
                                    <input class='form-check-input' type='radio' name='alcool' id='alcoolNao' value='N' aria-required='true' required>
                                    <label class='form-check-label' for='alcoolNao'>Não</label>
                                </div>
                            </div>
                            <div class='mb-3'>
                                <label class='form-label'>É doador de órgãos:</label>
                                <div class='form-check'>
                                    <input class='form-check-input' type='radio' name='doacao' id='doacaoSim' value='S' aria-required='true' required>
                                    <label class='form-check-label' for='doacaoSim'>Sim</label>
                                </div>
                                <div class='form-check'>
                                    <input class='form-check-input' type='radio' name='doacao' id='doacaoNao' value='N' aria-required='true' required>
                                    <label class='form-check-label' for='doacaoNao'>Não</label>
                                </div>
                            </div>
                            <div class='mb-3'>
                                <label class='form-label'>Possui órgão transplantado:</label>
                                <div class='form-check'>
                                    <input class='form-check-input' type='radio' name='transplante' id='transplanteSim' value='S' aria-required='true' required>
                                    <label class='form-check-label' for='transplanteSim'>Sim</label>
                                </div>
                                <div class='form-check'>
                                    <input class='form-check-input' type='radio' name='transplante' id='transplanteNao' value='N' aria-required='true' required>
                                    <label class='form-check-label' for='transplanteNao'>Não</label>
                                </div>
                                <div class='mt-2'>
                                    <label for='qualOrgao' class='form-label'>Qual:</label>
                                    <textarea value='".$q_transplante."' type='text' id='qualOrgao' class='form-control' placeholder='Especifique o órgão'  name='q_transplante'></textarea>
                                </div>
                            </div>
                  
                            <div class='mb-3'>
                                <label class='form-label'>Possui alguma alergia a medicamentos:</label>
                                <div class='form-check'>
                                    <input class='form-check-input' type='radio' name='alergiaMedicamento' id='alergiaMedicamentoSim' value='S' required aria-required='true'>
                                    <label class='form-check-label' for='alergiaMedicamentoSim'>Sim</label>
                                </div>
                                <div class='form-check'>
                                    <input class='form-check-input' type='radio' name='alergiaMedicamento' id='alergiaMedicamentoNao' value='N' required aria-required='true'>
                                    <label class='form-check-label' for='alergiaMedicamentoNao'>Não</label>
                                </div>
                                <div class='mt-2'>
                                    <label for='qualAlergiaMedicamento' class='form-label'>Qual?</label>
                                    <textarea value='".$q_alergia_m."' type='text' id='qualAlergiaMedicamento' class='form-control' placeholder='Especifique a alergia'  name='q_alergia'></textarea>
                                </div>
                            </div>
                
                            <div class='mb-3'>
                                <label class='form-label'>Possui ordem de não reanimar (ONR):</label>
                                <div class='form-check'>
                                    <input class='form-check-input' type='radio' name='onr' id='ordemNaoReanimarSim' value='S' aria-required='true' required>
                                    <label class='form-check-label' for='ordemNaoReanimarSim'>Sim</label>
                                </div>
                                <div class='form-check'>
                                    <input class='form-check-input' type='radio' name='onr' id='ordemNaoReanimarNao' value='N' aria-required='true' required>
                                    <label class='form-check-label' for='ordemNaoReanimarNao'>Não</label>
                                </div>
                            </div>
                            <br>
                            <div class='form-group'>
                                <label for='senha' class='form-label'>Nova Senha:</label>
                                <div class='input-group'>
                                    <input type='password' id='senha' name='senha' class='form-control' onkeyup='verificarSenha()'>
                                    <span class='input-group-text' id='eye-icon-senha' onclick='togglePasswordVisibility('senha')'>
                                        <i class='bi bi-eye'></i>
                                    </span>
                                </div>
                            </div>
                            <br>
                            <div class='form-group'>
                                <label for='confirmar-senha' class='form-label'>Confirmar Nova Senha:</label>
                                <div class='input-group'>
                                    <input type='password' id='confirmar-senha' name='confirmar-senha' class='form-control' maxlength='20' onkeyup='verificarSenha()'>
                                    <span class='input-group-text' id='eye-icon-confirmar-senha' maxlength='20' onclick='togglePasswordVisibility('confirmar-senha')'>
                                        <i class='bi bi-eye'></i>
                                    </span>
                                </div>
                            </div>
                
                            <div class='message' id='mensagem'></div>
                            <br>
                            <!---QR CODE-->
                        </div>
                    </div>
                    
                    <!-- Coluna da Direita -->
                    <div class='col-md-6'>
                        <div class='card p-3 border-success'>
                            <div class='mb-3'>
                                <label class='form-label'>Tabagismo?</label>
                                <div class='form-check'>
                                    <input class='form-check-input' type='radio' name='tabagismo' id='tabagismoSim' value='S' aria-required='true' required>
                                    <label class='form-check-label' for='tabagismoSim'>Sim</label>
                                </div>
                                <div class='form-check'>
                                    <input class='form-check-input' type='radio' name='tabagismo' id='tabagismoNao' value='N' aria-required='true' required>
                                    <label class='form-check-label' for='tabagismoNao'>Não</label>
                                </div>
                            </div>
                        
                            <!-- Alterações cardíacas? -->
                            <div class='mb-3'>
                              <label class='form-label'>Alterações cardíacas?</label>
                              <div class='form-check'>
                                  <input class='form-check-input' type='radio' name='alteracoesCardiacas' id='alteracoesCardiacasSim' value='S' required aria-required='true'>
                                  <label class='form-check-label' for='alteracoesCardiacasSim'>Sim</label>
                              </div>
                              <div class='form-check'>
                                  <input class='form-check-input' type='radio' name='alteracoesCardiacas' id='alteracoesCardiacasNao' value='N' required aria-required='true'>
                                  <label class='form-check-label' for='alteracoesCardiacasNao'>Não</label>
                              </div>
                            </div>
                        
                            <!-- Portador de marcapasso? -->
                            <div class='mb-3'>
                              <label class='form-label'>Portador de marcapasso?</label>
                              <div class='form-check'>
                                  <input class='form-check-input' type='radio' name='portadorMarcapasso' id='portadorMarcapassoSim' value='S' required aria-required='true'>
                                  <label class='form-check-label' for='portadorMarcapassoSim'>Sim</label>
                              </div>
                              <div class='form-check'>
                                  <input class='form-check-input' type='radio' name='portadorMarcapasso' id='portadorMarcapassoNao' value='N' required aria-required='true'>
                                  <label class='form-check-label' for='portadorMarcapassoNao'>Não</label>
                              </div>
                            </div>
                        
                            <!-- Possui plano de saúde? -->
                            <div class='mb-3'>
                                <label class='form-label'>Possui plano de saúde?</label>
                                <div class='form-check'>
                                    <input class='form-check-input' type='radio' name='planoSaude' id='planoSaudeSim' value='S' aria-required='true' required>
                                    <label class='form-check-label' for='planoSaudeSim'>Sim</label>
                                </div>
                                <div class='form-check'>
                                    <input class='form-check-input' type='radio' name='planoSaude' id='planoSaudeNao' value='N' aria-required='true' required>
                                    <label class='form-check-label' for='planoSaudeNao'>Não</label>
                                </div>
                                <div class='mt-2'>
                                    <label for='planoSaudeDetalhes' class='form-label'>Especifique o plano:</label>
                                    <input type='text' id='planoSaudeDetalhes' class='form-control' placeholder='Nome do plano' name='planoSaudeDetalhes' >
                                </div>
                            </div>
                          
                            <!-- Possui restrição religiosa? -->
                            <div class='mb-3'>
                                <label class='form-label'>Possui restrição religiosa?</label>
                                <div class='form-check'>
                                    <input class='form-check-input' type='radio' name='restricaoReligiosa' id='restricaoReligiosaSim' value='S' required aria-required='true'>
                                    <label class='form-check-label' for='restricaoReligiosaSim'>Sim</label>
                                </div>
                                <div class='form-check'>
                                    <input class='form-check-input' type='radio' name='restricaoReligiosa' id='restricaoReligiosaNao' value='N' required aria-required='true'>
                                    <label class='form-check-label' for='restricaoReligiosaNao'>Não</label>
                                </div>
                                <div class='mt-2'>
                                    <label for='restricaoReligiosaDetalhes' class='form-label'>Qual?</label>
                                    <textarea value='".$q_restricao_re."' type='text' name='q_restricao_r' id='restricaoReligiosaDetalhes' class='form-control' placeholder='Descreva a restrição'></textarea>
                                </div>
                            </div>
                          
                            <!-- Pratica atividade física? -->
                            <div class='mb-3'>
                                <label class='form-label'>Pratica atividade física?</label>
                                <div class='form-check'>
                                    <input class='form-check-input' type='radio' name='atividadeFisica' id='atividadeFisicaSim' value='S' aria-required='true' required>
                                    <label class='form-check-label' for='atividadeFisicaSim'>Sim</label>
                                </div>
                                <div class='form-check'>
                                    <input class='form-check-input' type='radio' name='atividadeFisica' id='atividadeFisicaNao' value='N' aria-required='true' required>
                                    <label class='form-check-label' for='atividadeFisicaNao'>Não</label>
                                </div>
                                <div class='mt-2'>
                                    <label for='atividadeFisicaDetalhes' class='form-label'>Qual?</label>
                                    <textarea value='".$q_a_fisica."' type='text' name='q_a_fisica' id='atividadeFisicaDetalhes' class='form-control' placeholder='Ex: Caminhada, 3x por semana' ></textarea>
                                </div>
                            </div>
                          
                            <!-- Possui doença pré-existente? -->
                            <div class='mb-3'>
                                <label class='form-label'>Possui doença pré-existente?</label>
                                <div class='form-check'>
                                    <input class='form-check-input' type='radio' name='doencaPreExistente' id='doencaPreExistenteSim' value='S' aria-required='true' required>
                                    <label class='form-check-label' for='doencaPreExistenteSim'>Sim</label>
                                </div>
                                <div class='form-check'>
                                    <input class='form-check-input' type='radio' name='doencaPreExistente' id='doencaPreExistenteNao' value='N' aria-required='true' required>
                                    <label class='form-check-label' for='doencaPreExistenteNao'>Não</label>
                                </div>
                                <div class='mt-2'>
                                    <label for='doencaPreExistenteDetalhes' class='form-label'>Qual?</label>
                                    <textarea value='".$q_d_p_existente."' type='text' name='q_d_p_existente' id='doencaPreExistenteDetalhes' class='form-control' placeholder='Descreva a doença pré-existente'></textarea>
                                </div>
                            </div>
                          
                            <!-- Faz uso de algum medicamento? -->
                            <div class='mb-3'>
                                <label class='form-label'>Faz uso de algum medicamento?</label>
                                <div class='form-check'>
                                    <input class='form-check-input' type='radio' name='usoMedicamento' id='usoMedicamentoSim' value='S' aria-required='true' required>
                                    <label class='form-check-label' for='usoMedicamentoSim'>Sim</label>
                                </div>
                                <div class='form-check'>
                                    <input class='form-check-input' type='radio' name='usoMedicamento' id='usoMedicamentoNao' value='N' aria-required='true' required>
                                    <label class='form-check-label' for='usoMedicamentoNao'>Não</label>
                                </div>
                                <div class='mt-2'>
                                    <label for='medicamentoDetalhes' class='form-label'>Especifique qual, frequência e dosagem:</label>
                                    <textarea value='".$q_medicamento."' type='text' name='q_medicamento' id='medicamentoDetalhes' class='form-control' placeholder='Ex: Medicamento X, 2x ao dia, 50mg'></textarea>
                                </div>
                            </div>
                          
                            <!-- Realizou cirurgia anteriormente? -->
                            <div class='mb-3'>
                                <label class='form-label'>Realizou cirurgia anteriormente?</label>
                                <div class='form-check'>
                                    <input class='form-check-input' type='radio' name='cirurgiaAnterior' id='cirurgiaAnteriorSim' value='S' aria-required='true' required>
                                    <label class='form-check-label' for='cirurgiaAnteriorSim'>Sim</label>
                                </div>
                                <div class='form-check'>
                                    <input class='form-check-input' type='radio' name='cirurgiaAnterior' id='cirurgiaAnteriorNao' value='N' aria-required='true' required>
                                    <label class='form-check-label' for='cirurgiaAnteriorNao'>Não</label>
                                </div>
                                <div class='mt-2'>
                                    <label for='cirurgiaAnteriorDetalhes' class='form-label'>Qual?</label>
                                    <textarea value='".$q_cirurgia."' type='text' name='q_cirurgia' id='cirurgiaAnteriorDetalhes' class='form-control' placeholder='Ex: Cirurgia de apendicite' ></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Botão de Edição -->
                <div class='text-center mt-3'>
                    <button class='btn btn-success' id='uploadButton' type='submit'>Salvar</button>
                    <a href=''>
                        <button class='btn btn-success' type='button'>Voltar</button>
                    </a>
                </div>
            </div>
        </form>
        <br>
        <script src='https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js' integrity='sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz' crossorigin='anonymous'></script>
        <script src='https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js'></script>
        <script src='jsstyle.js'></script>
    </body>
</html>")


?>