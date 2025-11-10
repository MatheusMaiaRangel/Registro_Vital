import { useState } from "react";

export default function CriarConta() {
	const [form, setForm] = useState({ nome: "", email: "", senha: "" });
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError("");
		setSuccess("");
		try {
			const res = await fetch("/usuarios", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(form),
			});
			if (!res.ok) {
				const data = await res.json();
				throw new Error(data.error || "Erro ao criar conta");
			}
			setSuccess("Conta criada com sucesso!");
			setForm({ nome: "", email: "", senha: "" });
		} catch (err) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
			<h2 className="text-2xl font-bold mb-4">Criar Conta</h2>
			<form onSubmit={handleSubmit} className="space-y-4">
				<input
					type="text"
					name="nome"
					placeholder="Nome"
					value={form.nome}
					onChange={handleChange}
					className="w-full border p-2 rounded"
					required
				/>
				<input
					type="email"
					name="email"
					placeholder="Email"
					value={form.email}
					onChange={handleChange}
					className="w-full border p-2 rounded"
					required
				/>
				<input
					type="password"
					name="senha"
					placeholder="Senha"
					value={form.senha}
					onChange={handleChange}
					className="w-full border p-2 rounded"
					required
				/>
				<button
					type="submit"
					className="w-full bg-green-600 text-white py-2 rounded font-bold"
					disabled={loading}
				>
					{loading ? "Criando..." : "Criar Conta"}
				</button>
				{error && <div className="text-red-600 mt-2">{error}</div>}
				{success && <div className="text-green-600 mt-2">{success}</div>}
			</form>
		</div>
	);
}
