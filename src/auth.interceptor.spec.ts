import { AuthInterceptor } from './auth/auth.interceptor';

describe('AuthInterceptor', () => {
  it('should be defined', () => {
    expect(new AuthInterceptor()).toBeDefined();
  });
});
