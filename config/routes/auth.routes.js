module.exports = {
  'post /auth': 'Auth/signIn',
  'post /auth/sign-up': 'Auth/signUp',
  'post /auth/socialite': 'Auth/signInSocialite',
  'post /auth/socialite/sign-up': 'Auth/signUpSocialite',
  'post /auth/forget-password': 'Auth/forgetPassword',
  'post /auth/reset-password': 'Auth/resetPassword',
  'post /auth/refresh-token': 'Auth/refreshToken',
  // admins
  'post /admin/auth': 'Auth/signIn',
};
