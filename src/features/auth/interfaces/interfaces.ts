export interface LoginResponse {
  message: string,
  data: UserData
}

export interface UserData {
  id: number,
  nombre: string,
  apellido: string,
  usuario: string,
  correo: string,
  rol_usuario: string
}