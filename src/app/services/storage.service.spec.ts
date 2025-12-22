import { TestBed } from '@angular/core/testing';
import { StorageService } from './storage.service';

describe('StorageService', () => {
  let service: StorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StorageService);
    localStorage.clear();
  });

  it('debe guardar un valor serializado', async () => {
    await service.set('test_key', 'valor');
    expect(localStorage.getItem('test_key')).toBe(JSON.stringify('valor'));
  });

  it('debe obtener un valor deserializado', async () => {
    localStorage.setItem('test_key', JSON.stringify('valor'));
    const result = await service.get('test_key');
    expect(result).toBe('valor');
  });
});
