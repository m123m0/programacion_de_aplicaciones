import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { authGuard } from './auth.guard';

describe('authGuard', () => {
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: Router,
          useValue: { navigateByUrl: jasmine.createSpy('navigateByUrl') }
        }
      ]
    });

    router = TestBed.inject(Router);
    localStorage.clear();
  });

  it('debe permitir acceso cuando el token es OK', () => {
    localStorage.setItem('auth_token', 'OK');

    const result = TestBed.runInInjectionContext(() =>
      authGuard({} as any, {} as any)
    );

    expect(result).toBeTrue();
  });

  it('debe redirigir a login cuando no hay token válido', () => {
    const result = TestBed.runInInjectionContext(() =>
      authGuard({} as any, {} as any)
    );

    expect(router.navigateByUrl).toHaveBeenCalledWith('/login');
    expect(result).toBeFalse();
  });
});
