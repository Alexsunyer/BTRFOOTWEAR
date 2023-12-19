export interface LoginInfo {
  email: string
  password: string
}

export interface RegisterInfo {
  username: string
  email: string
  password: string
  address1?: string
  address2?: string
  postalCode?: number
  phoneNumber?: number
}