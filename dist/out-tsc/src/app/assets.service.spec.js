import { TestBed } from '@angular/core/testing';
import { AssetsService } from './assets.service';
describe('AssetsService', () => {
    let service;
    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(AssetsService);
    });
    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=assets.service.spec.js.map