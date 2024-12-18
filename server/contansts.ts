export const TOKEN_CONSTENT = {
  SALT_ROUNDS: 12,
  TOKEN_EXPIRY: "30 days",
  MIN_PASSWORD_LENGTH: 8,
  MAX_USERNAME_LENGTH: 30,
  DEFAULT_SKIN_NAME: "default",
} as const;

export const enum UserRole {
  Admin = 'admin',
  Teacher = 'teacher',
  Director = 'director'
}

export const MAX_STUDENTS = 25

export const MAX_CLASSES = 8