import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import QRCode from "react-qr-code";
import { API_URL } from "../../../config/api.js";
import { getAuthPayload, getAuthToken } from "../../../utils/auth.js";

const OPTIONAL_FIELDS = [
  { key: "alergia", label: "Possui alergias?", placeholder: "Descreva as alergias" },
  {
    key: "alergia_medicamento",
    label: "É alérgico(a) a medicamentos?",
    placeholder: "Informe os medicamentos",
  },
  {
    key: "orgao_transplantado",
    label: "Já realizou transplante de órgão?",
    placeholder: "Quais órgãos?",
  },
  {
    key: "plano_saude",
    label: "Possui plano de saúde?",
    placeholder: "Informe o plano de saúde",
  },
  {
    key: "restricao_religiosa",
    label: "Possui restrições religiosas?",
    placeholder: "Descreva a restrição",
  },
  {
    key: "atividade_fisica",
    label: "Pratica atividade física?",
    placeholder: "Informe qual atividade",
  },
  {
    key: "doenca_pre_existente",
    label: "Possui doenças pré-existentes?",
    placeholder: "Descreva as doenças",
  },
  {
    key: "uso_medicamento",
    label: "Usa medicamentos regularmente?",
    placeholder: "Liste os medicamentos",
  },
  {
    key: "cirurgia_anteriormente",
    label: "Já realizou cirurgias?",
    placeholder: "Descreva as cirurgias",
  },
  {
    key: "internacao_anteriormente",
    label: "Já foi internado(a)?",
    placeholder: "Informe o motivo da internação",
  },
  {
    key: "doenca_infecciosa_passada",
    label: "Teve doenças infecciosas?",
    placeholder: "Liste as infecções",
  },
  {
    key: "historico_familiar_doenca",
    label: "Histórico familiar de doenças?",
    placeholder: "Detalhe o histórico",
  },
  {
    key: "informacoes_pessoais_adicionais",
    label: "Informações adicionais?",
    placeholder: "Inclua informações relevantes",
  },
];

const toStringValue = (value) => (value === null || value === undefined ? "" : String(value));
const hasValue = (value) =>
  typeof value === "string" ? value.trim().length > 0 : Boolean(value);

const maskCpf = (value = "") => {
  const onlyNums = value.replace(/\D/g, "").slice(0, 11);
  let masked = onlyNums;
  if (masked.length > 3) masked = masked.slice(0, 3) + "." + masked.slice(3);
  if (masked.length > 7) masked = masked.slice(0, 7) + "." + masked.slice(7);
  if (masked.length > 11) masked = masked.slice(0, 11) + "-" + masked.slice(11);
  return masked;
};

const formatDate = (value) => {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toISOString().split("T")[0];
};

const formatAlturaDisplay = (value) => {
  if (value === null || value === undefined) return "";
  const number = Number(value);
  if (Number.isNaN(number)) return "";
  return number.toFixed(2).replace(".", ",");
};

const formatAlturaInput = (value = "") => {
  const digits = value.replace(/\D/g, "").slice(0, 3);
  if (!digits) return "";
  const integerPart = digits.slice(0, 1);
  const decimalPart = digits.slice(1);
  if (!decimalPart) return `${integerPart},`;
  return `${integerPart},${decimalPart}`;
};

const alturaToNumber = (value = "") => {
  if (!value) return undefined;
  const normalized = value.replace(/\./g, "").replace(",", ".");
  const parsed = Number(normalized);
  if (Number.isNaN(parsed)) return undefined;
  return parsed;
};

const buildInitialForm = ({ usuarioId = "", nome = "" } = {}) => ({
  nome,
  cpf: "",
  usuario_id: usuarioId ? String(usuarioId) : "",
  data_nascimento: "",
  altura: "",
  peso: "",
  alergia: "",
  alergia_medicamento: "",
  orgao_transplantado: "",
  plano_saude: "",
  restricao_religiosa: "",
  atividade_fisica: "",
  doenca_pre_existente: "",
  uso_medicamento: "",
  cirurgia_anteriormente: "",
  internacao_anteriormente: "",
  doenca_infecciosa_passada: "",
  historico_familiar_doenca: "",
  informacoes_pessoais_adicionais: "",
  bebida_alcoolica: false,
  tabagismo: false,
  alteracao_cardiaca: false,
  portador_marca_passo: false,
  ordem_nao_reanimacao: false,
  doador_orgaos: false,
});

const buildInitialOptionalToggle = (data = {}) => {
  const toggles = {};
  OPTIONAL_FIELDS.forEach(({ key }) => {
    toggles[key] = hasValue(data[key]);
  });
  return toggles;
};

const mapToForm = (data = {}) => ({
  nome: toStringValue(data.usuario?.nome ?? data.nome ?? ""),
  cpf: maskCpf(toStringValue(data.cpf)),
  usuario_id: toStringValue(data.usuario_id),
  data_nascimento: formatDate(data.data_nascimento),
  altura: formatAlturaDisplay(data.altura),
  peso:
    data.peso === null || data.peso === undefined
      ? ""
      : String(data.peso),
  alergia: toStringValue(data.alergia),
  alergia_medicamento: toStringValue(data.alergia_medicamento),
  orgao_transplantado: toStringValue(data.orgao_transplantado),
  plano_saude: toStringValue(data.plano_saude),
  restricao_religiosa: toStringValue(data.restricao_religiosa),
  atividade_fisica: toStringValue(data.atividade_fisica),
  doenca_pre_existente: toStringValue(data.doenca_pre_existente),
  uso_medicamento: toStringValue(data.uso_medicamento),
  cirurgia_anteriormente: toStringValue(data.cirurgia_anteriormente),
  internacao_anteriormente: toStringValue(data.internacao_anteriormente),
  doenca_infecciosa_passada: toStringValue(data.doenca_infecciosa_passada),
  historico_familiar_doenca: toStringValue(data.historico_familiar_doenca),
  informacoes_pessoais_adicionais: toStringValue(
    data.informacoes_pessoais_adicionais
  ),
  bebida_alcoolica: Boolean(data.bebida_alcoolica),
  tabagismo: Boolean(data.tabagismo),
  alteracao_cardiaca: Boolean(data.alteracao_cardiaca),
  portador_marca_passo: Boolean(data.portador_marca_passo),
  ordem_nao_reanimacao: Boolean(data.ordem_nao_reanimacao),
  doador_orgaos: Boolean(data.doador_orgaos),
});

export default function FichaMedicaForm() {
  const navigate = useNavigate();
  const [usuarioId, setUsuarioId] = useState("");
  const [recordId, setRecordId] = useState(null);
  const [fetching, setFetching] = useState(true);
  const [form, setForm] = useState(() => buildInitialForm());
  const [optionalToggle, setOptionalToggle] = useState(() =>
    buildInitialOptionalToggle()
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isEditing, setIsEditing] = useState(true);
  const [showQrModal, setShowQrModal] = useState(false);

  const qrValue = useMemo(() => {
    if (!recordId || typeof window === "undefined") return "";
    return `${window.location.origin}/ficha-medica?record=${recordId}`;
  }, [recordId]);

  const requireAuth = useMemo(
    () => ({
      navigateIfMissing() {
        const token = getAuthToken();
        if (!token) {
          navigate("/login");
          return null;
        }
        const payload = getAuthPayload();
        if (!payload?.id) {
          navigate("/login");
          return null;
        }
        return payload;
      },
    }),
    [navigate]
  );

  useEffect(() => {
    const payload = requireAuth.navigateIfMissing();
    if (!payload) return;
    setUsuarioId(payload.id);
    setForm(buildInitialForm({ usuarioId: payload.id, nome: payload.nome || "" }));
    setOptionalToggle(buildInitialOptionalToggle());

    (async () => {
      setFetching(true);
      setError("");
      try {
        const res = await fetch(`${API_URL}/ficha-medica/usuario/${payload.id}`);
        if (res.status === 404) {
          setRecordId(null);
          setIsEditing(true);
          return;
        }
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data.error || "Erro ao carregar ficha");
        }
        const data = await res.json();
        const mapped = mapToForm(data);
        setRecordId(data.id);
        setForm({
          ...buildInitialForm({ usuarioId: payload.id, nome: mapped.nome || payload.nome || "" }),
          ...mapped,
          usuario_id: String(data.usuario_id),
        });
        setOptionalToggle(buildInitialOptionalToggle(mapped));
        setIsEditing(false);
      } catch (err) {
        setError(err.message || "Erro ao carregar ficha");
      } finally {
        setFetching(false);
      }
    })();
  }, [requireAuth]);

  const handleChange = (e) => {
    if (!isEditing) return;
    const { name, value } = e.target;
    if (name === "cpf") {
      setForm((prev) => ({ ...prev, cpf: maskCpf(value) }));
    } else if (name === "altura") {
      setForm((prev) => ({ ...prev, altura: formatAlturaInput(value) }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleCheckboxChange = (e) => {
    if (!isEditing) return;
    const { name, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: checked }));
  };

  const handleOptionalToggle = (key, checked) => {
    if (!isEditing) return;
    setOptionalToggle((prev) => ({ ...prev, [key]: checked }));
    if (!checked) {
      setForm((prev) => ({ ...prev, [key]: "" }));
    }
  };

  const handleStartEdit = () => {
    setIsEditing(true);
    setSuccess("");
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isEditing || !usuarioId) return;
    setLoading(true);
    setError("");
    setSuccess("");

    if (!form.nome.trim()) {
      setLoading(false);
      setError("Informe o nome.");
      return;
    }

    const cpfNumeros = form.cpf.replace(/\D/g, "");
    if (cpfNumeros.length !== 11) {
      setLoading(false);
      setError("CPF inválido.");
      return;
    }

    if (!form.data_nascimento) {
      setLoading(false);
      setError("Informe a data de nascimento.");
      return;
    }

    const alturaNumero = alturaToNumber(form.altura);
    if (typeof alturaNumero !== "number") {
      setLoading(false);
      setError("Altura inválida.");
      return;
    }

    const pesoNumero = Number(form.peso);
    if (Number.isNaN(pesoNumero)) {
      setLoading(false);
      setError("Peso inválido.");
      return;
    }
      if (String(form.peso).length > 3) {
        setLoading(false);
        setError("Peso deve ter no máximo 3 dígitos.");
        return;
      }

    const payload = {
      ...form,
      nome: form.nome.trim(),
      cpf: cpfNumeros,
      usuario_id: Number(usuarioId),
      altura: alturaNumero,
      peso: pesoNumero,
    };

    OPTIONAL_FIELDS.forEach(({ key }) => {
      if (!optionalToggle[key]) {
        payload[key] = "";
      }
    });

    const url = recordId
      ? `${API_URL}/ficha-medica/${recordId}`
      : `${API_URL}/ficha-medica`;
    const method = recordId ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.error || "Erro ao salvar ficha médica");
      }

      if (!recordId && data.id) {
        setRecordId(data.id);
      }
      setSuccess(recordId ? "Ficha atualizada!" : "Ficha criada!");
      setIsEditing(false);
    } catch (err) {
      setError(err.message || "Erro inesperado");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <p>Carregando ficha médica...</p>
      </div>
    );
  }

  return (
    <>
      {showQrModal && recordId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 relative w-80 text-center space-y-4">
            <button
              type="button"
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={() => setShowQrModal(false)}
            >
              ✕
            </button>
            <h3 className="text-lg font-semibold">QR Code da ficha</h3>
            <QRCode value={qrValue} size={160} />
            <p className="text-sm text-gray-600 break-words">
              Escaneie para visualizar esta ficha.
            </p>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow">
        <h2 className="text-2xl font-bold mb-4">
          {recordId && !isEditing
            ? "Ficha Médica"
            : recordId
            ? "Editar Ficha Médica"
            : "Criar Ficha Médica"}
        </h2>

        {recordId && !isEditing && (
          <div className="flex gap-2 mb-4">
            <button
              type="button"
              onClick={handleStartEdit}
              className="bg-blue-600 text-white px-4 py-2 rounded font-semibold hover:bg-blue-700 transition"
            >
              Editar ficha
            </button>
            <button
              type="button"
              onClick={() => setShowQrModal(true)}
              className="bg-indigo-500 text-white px-4 py-2 rounded font-semibold hover:bg-indigo-600 transition"
            >
              QR Code
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <input
              type="text"
              name="nome"
              placeholder="Nome"
              value={form.nome}
              onChange={handleChange}
              className="border p-2 rounded"
              required
              disabled={!isEditing}
            />
            <input
              type="text"
              name="cpf"
              placeholder="CPF"
              value={form.cpf}
              onChange={handleChange}
              className="border p-2 rounded"
              required
              maxLength={14}
              inputMode="numeric"
              pattern="\d{3}\.\d{3}\.\d{3}-\d{2}"
              disabled={!isEditing}
            />
            <input
              type="date"
              name="data_nascimento"
              value={form.data_nascimento}
              onChange={handleChange}
              className="border p-2 rounded"
              required
              disabled={!isEditing}
            />
            <input
              type="text"
              name="altura"
              placeholder="Altura (m)"
              value={form.altura}
              onChange={handleChange}
              className="border p-2 rounded"
              required
              disabled={!isEditing}
              inputMode="decimal"
            />
            <input
              type="number"
              step="0.1"
              name="peso"
              placeholder="Peso (kg)"
              value={form.peso}
              onChange={e => {
                let v = e.target.value;
                if (v.length > 3) v = v.slice(0, 3);
                handleChange({ target: { name: "peso", value: v } });
              }}
              className="border p-2 rounded"
              required
              disabled={!isEditing}
              maxLength={3}
            />
          </div>

          <div className="space-y-4">
            {OPTIONAL_FIELDS.map(({ key, label, placeholder }) => (
              <div key={key} className="border rounded p-3 space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold">
                  <input
                    type="checkbox"
                    checked={optionalToggle[key]}
                    onChange={(e) => handleOptionalToggle(key, e.target.checked)}
                    disabled={!isEditing}
                  />
                  {label}
                </label>
                {optionalToggle[key] && (
                  <textarea
                    name={key}
                    value={form[key]}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                    placeholder={placeholder}
                    rows={3}
                    disabled={!isEditing}
                  />
                )}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {[
              { key: "bebida_alcoolica", label: "Consome bebida alcoólica" },
              { key: "tabagismo", label: "Tabagismo" },
              { key: "alteracao_cardiaca", label: "Alteração cardíaca" },
              { key: "portador_marca_passo", label: "Portador de marca-passo" },
              { key: "ordem_nao_reanimacao", label: "Ordem de não reanimação" },
              { key: "doador_orgaos", label: "Doador de órgãos" },
            ].map((item) => (
              <label key={item.key} className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  name={item.key}
                  checked={form[item.key]}
                  onChange={handleCheckboxChange}
                  disabled={!isEditing}
                />
                {item.label}
              </label>
            ))}
          </div>

          {isEditing && (
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded font-semibold"
              disabled={loading}
            >
              {loading ? "Salvando..." : "Salvar ficha"}
            </button>
          )}

          {error && <div className="text-red-600">{error}</div>}
          {success && <div className="text-green-600">{success}</div>}
        </form>
      </div>
    </>
  );
}
