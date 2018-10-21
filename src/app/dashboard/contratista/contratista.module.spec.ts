import { ContratistaModule } from './contratista.module';

describe('ContratistaModule', () => {
  let contratistaModule: ContratistaModule;

  beforeEach(() => {
    contratistaModule = new ContratistaModule();
  });

  it('should create an instance', () => {
    expect(contratistaModule).toBeTruthy();
  });
});
