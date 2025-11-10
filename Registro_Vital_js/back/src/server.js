import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import Path from 'path';
import usuario from './routes/usuario.js';

const envPaths = [
    Path.join(process.cwd(), ".env"),
    Path.join(process.cwd(), "prisma", ".env"),
]
for (const envPath of envPaths) {
  dotenv.config({ path: envPath, override: false });
}

const app = express();
app.use(cors({ origin: "http://localhost:5173", credentials: true })); // ajuste a URL do front
app.use(express.json());

app.use("/usuarios", usuario);


app.use((req, res) => res.status(404).json({ erro: "Rota não encontrada" }));

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ erro: "Erro interno" });
});

app.listen(3000, () => console.log("Servidor rodando na porta 3000"));


