import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
	return (
		<nav className="w-full bg-blue-700 text-white flex items-center justify-between px-4 py-3 shadow-md">
			<span className="font-bold text-xl">Registro Vital</span>
			<div className="flex gap-2">
				<Link to="/cadastro" className="bg-white text-blue-700 px-4 py-2 rounded font-semibold hover:bg-blue-100 transition">Entrar</Link>
				<Link to="/criar" className="bg-green-600 text-white px-4 py-2 rounded font-semibold hover:bg-green-700 transition">Criar Conta</Link>
			</div>
		</nav>
	);
}
