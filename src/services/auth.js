import instance from '@/api/instance'
async function forgotPassword(email) {
    return instance.post('hospitality/auth/password/forgot', { login: email })
}
async function loginOTP(otp, username, password) {
    return instance.post('hospitality/auth/login', { otp, login: username, password }).then(res => res.data)
}
async function confirmForgotOTP({ email, otp }) {
    return instance.post('hospitality/auth/password/code/validate', { login: email, code: otp }).then(res => res.data)
}
async function resetPassword({ email, otp, password }) {
    return instance.put('hospitality/auth/password/reset', { login: email, code: otp, password }).then(res => res.data)
}
async function register(params) {
    return instance.post('hospitality/auth/register', params, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }).then(res => res.data)
}
export {
    loginOTP,
    forgotPassword,
    confirmForgotOTP,
    resetPassword,
    register
}
