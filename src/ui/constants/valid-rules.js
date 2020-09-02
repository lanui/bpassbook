export const passwordRules = {
  required: value => !!value || 'Required.',
  min: v => v.length >= 3 || 'Min 3 characters',
  max: v => v.length <= 30 || "Max 50 characters"
}
