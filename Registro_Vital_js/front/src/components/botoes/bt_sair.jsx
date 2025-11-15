import { clearAuthToken } from "../../utils/auth.js";

export default function BotaoSair() {
	const handleLogout = () => {
		clearAuthToken();
	};

	return (
		<button
			onClick={handleLogout}
			className="bg-red-600 text-white px-4 py-2 rounded font-semibold hover:bg-red-700 transition"
		>
			Sair
		</button>
	);
}
