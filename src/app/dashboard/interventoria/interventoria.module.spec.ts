import { InterventoriaModule } from './interventoria.module';

describe('InterventoriaModule', () => {
  let interventoriaModule: InterventoriaModule;

  beforeEach(() => {
    interventoriaModule = new InterventoriaModule();
  });

  it('should create an instance', () => {
    expect(interventoriaModule).toBeTruthy();
  });
});
