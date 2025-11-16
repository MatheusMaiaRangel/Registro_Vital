import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAuthToken, onAuthChange } from "../../utils/auth.js";
import BotaoSair from "../botoes/bt_sair.jsx";
import BotaoFichaMedica from "../botoes/bt_ficha_medica.jsx";

export default function Navbar() {
	const [temToken, setTemToken] = useState(Boolean(getAuthToken()));

	useEffect(() => {
		const unsubscribe = onAuthChange((token) => setTemToken(Boolean(token)));
		const storageListener = () => setTemToken(Boolean(getAuthToken()));
		window.addEventListener("storage", storageListener);
		return () => {
			unsubscribe();
			window.removeEventListener("storage", storageListener);
		};
	}, []);

	return (
		<nav className="w-full bg-blue-700 text-white flex items-center justify-between px-4 py-3 shadow-md">
			<Link to="/" className="font-bold text-xl">Registro Vital</Link>
			<div className="flex gap-2">
				{temToken ? (
					<>
						<BotaoFichaMedica />
						<BotaoSair />
					</>
				) : (
					<>
						<Link to="/login" className="bg-white text-blue-700 px-4 py-2 rounded font-semibold hover:bg-blue-100 transition">Entrar</Link>
						<Link to="/criar" className="bg-green-600 text-white px-4 py-2 rounded font-semibold hover:bg-green-700 transition">Criar Conta</Link>
					</>
				)}
			</div>
		</nav>
	);
}
