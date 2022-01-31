export default {
    required: () => v => !!v || 'Field is required',
    min: min => v => (v || '').length >= min || `A minimum of ${min} characters is required`,
    max: max => v => (v || '').length <= max || `A maximum of ${max} characters is allowed`,
    minNum: min => v => v >= min || `Number must be larger than ${min}`,
    maxNum: max => v => v <= max || `Number must be smaller than ${max}`,
    email: () => v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
    phone: () => v => /^((\+(\d{2}))|(0)) ?\d{4} ?\d{6}$/.test(v) || 'Phone Number must be valid',
    match: (matchName, match) => v => v === match || `${matchName} Must Match`
}
