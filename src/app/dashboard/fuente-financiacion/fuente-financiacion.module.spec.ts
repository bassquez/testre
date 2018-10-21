import { FuenteFinanciacionModule } from './fuente-financiacion.module';

describe('FuenteFinanciacionModule', () => {
  let fuenteFinanciacionModule: FuenteFinanciacionModule;

  beforeEach(() => {
    fuenteFinanciacionModule = new FuenteFinanciacionModule();
  });

  it('should create an instance', () => {
    expect(fuenteFinanciacionModule).toBeTruthy();
  });
});
