export function greet(name: string): string {
  return `Hello, ${name.trim() || 'world'}!`
}

export function shout(name: string): string {
  return greet(name).toUpperCase()
}
