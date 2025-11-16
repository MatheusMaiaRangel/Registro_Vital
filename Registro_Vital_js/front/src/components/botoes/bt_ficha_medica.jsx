import { useNavigate } from "react-router-dom";

export default function BotaoFichaMedica() {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      onClick={() => navigate("/ficha-medica")}
      className="bg-indigo-500 text-white px-4 py-2 rounded font-semibold hover:bg-indigo-600 transition"
    >
      Ficha Médica
    </button>
  );
}
