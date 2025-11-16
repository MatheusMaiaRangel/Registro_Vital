import { clearAuthToken } from "../../utils/auth.js";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function BotaoSair() {
	const navigate = useNavigate();

	const handleLogout = async () => {
		const result = await Swal.fire({
			title: "Tem certeza que deseja sair?",
			text: "Você terá que entrar novamente!",
			icon: "warning",
			showCancelButton: true,
			cancelButtonColor: "#d33",
			cancelButtonText: "Não",
			confirmButtonColor: "#27B480",
			confirmButtonText: "Sim",
			reverseButtons: true,
		});

		if (result.isConfirmed) {
			clearAuthToken();
			await Swal.fire({
				title: "Saiu!",
				text: "Você saiu da sua conta.",
				icon: "success",
			});
			navigate("/");
		}
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
