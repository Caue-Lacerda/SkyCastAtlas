export function GenerateKey(tamanho = 15):string {
  const chars: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let key: string = ''
  for (let i = 0; i < tamanho; i++) {
    key += chars[Math.floor(Math.random() * chars.length)]
  }
  return key
}