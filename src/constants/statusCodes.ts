export enum STATUS_CODES {
  OK = 200,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  CONFLICT = 409,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}

export enum USER_MESSAGES {
  USER_NOT_FOUND = 'Account does not exist',
  USER_ALREADY_EXISTS = 'User already exists',
  INVALID_CREDENTIALS = 'Invalid credentials',
  INVALID_EMAIL = 'Invalid email',
  EMAIL_ALREADY_EXISTS = 'Email already exists',
  AUTHENTICATION_FAILED = 'Authentication failed',
  ACCESS_DENIED = 'Access denied',
  LOGIN_FAILED = 'Login failed',
  LOGIN_SUCCESS = 'Login succeeded',
  REGISTRATION_SUCCESS = 'Registration succeeded',
  REGISTRATION_FAILED = 'Registration failed',
  INTERNAL_SERVER_ERROR = 'Internal server error',
  OTP_CREATETION_FAILED = 'OTP creation failed',
  OTP_NOTFOUND = 'Invaalid OTP or expired',
  OTP_EXPIRED = 'Invaalid OTP or expired',
  OTP_VERIFICATION_SUCCESS = 'OTP verification succeeded',
  OTP_SEND_FAILED = 'OTP send failed',
  OTP_SEND = 'OTP has been send to your mobile number'
}