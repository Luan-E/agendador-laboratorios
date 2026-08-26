const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export interface Usuario {
  id: number;
  nome: string;
  email: string;
}

export interface AuthResponse {
  mensagem: string;
  usuario: Usuario;
}

export async function cadastrar(nome: string, email: string, senha: string): Promise<AuthResponse> {
  const res = await fetch(`${API_URL}/auth/cadastrar`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ nome, email, senha }),
  });
  const body = await res.json();
  if (!res.ok) throw new Error(body?.erro || "Falha ao cadastrar.");
  return body;
}

export async function login(email: string, senha: string): Promise<AuthResponse> {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ email, senha }),
  });
  const body = await res.json();
  if (!res.ok) throw new Error(body?.erro || "Falha ao fazer login.");
  return body;
}

export async function logout(): Promise<void> {
  const res = await fetch(`${API_URL}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });
  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(body?.erro || "Falha ao fazer logout.");
  }
}

export async function verificarToken(): Promise<Usuario> {
  const res = await fetch(`${API_URL}/auth/verificar`, {
    credentials: "include",
  });
  const body = await res.json();
  if (!res.ok) throw new Error(body?.erro || "Token inválido.");
  return body.usuario;
}
