export const STATUS_MESSAGES = {
  AUTH: {
    LOGIN_SUCCESS: 'Login successful',
    REGISTER_SUCCESS: 'Registration successful',
    FAILURE: 'Invalid credentials',
    TOKEN_EXPIRED: 'Token expired',
    TOKEN_INVALID: 'Token invalid',
  }
} as const;

export default STATUS_MESSAGES;
