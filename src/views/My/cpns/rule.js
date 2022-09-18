export const codeRules = [
  { required: true, message: '请填写密码' },
  { pattern: /[0-9]{6}/, message: '密码格式错误' }
]

export const mobileRules = [
  { required: true, message: '请填写用户名' },
  {
    pattern: /^\w{4,16}$/,
    message: '账号格式错误'
  }
]
