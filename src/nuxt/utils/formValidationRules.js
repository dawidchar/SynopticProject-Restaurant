export default {
    required: () => v => (!!v || v === 0) || 'Field is required',
    min: min => v => (v || '').length >= min || `A minimum of ${min} characters is required`,
    max: max => v => (v || '').length <= max || `A maximum of ${max} characters is allowed`,
    minNum: min => v => v >= min || `Number must be larger than ${min}`,
    maxNum: max => v => v <= max || `Number must be smaller than ${max}`,
    email: () => v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
    phone: () => v => /^((\+(\d{2}))|(0)) ?\d{4} ?\d{6}$/.test(v) || 'Phone Number must be valid',
    match: (match, matchName = 'Fields') => v => v === match || `${matchName} Must Match`,
    noSpaces: (name = 'Field') => v => !(/\s/g.test(v)) || `${name} Can't Contain Any Spaces`,
    onlyIntegers: () => v => /^\d+$/.test(v) || 'Field Can Only contains Integers'
}
