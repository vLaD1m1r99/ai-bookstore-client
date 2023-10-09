export interface AuthStateInterface {
  isSubmitting: boolean;
  isLoading: boolean;
  validationErrors: string | null;
  accessToken: string | null;
}
