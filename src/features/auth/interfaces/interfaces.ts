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
  activo?: string | number
}

export interface GetUsersResponse {
  data: UserData[]
  current_page: number
  total_pages: number
  total_items: number
}

export interface UserForm {
  apellido: string
  nombre: string
  usuario: string
  correo: string
  rol_usuario: 'admin' | 'vendedor'
  contraseña: string
}