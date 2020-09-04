export const passwordRules = [
  value => !!value || 'Password Required.',
  v => v && v.length >= 3 || 'Min 3 characters',
  v => v && v.length <= 30 || "Max 50 characters"
]
