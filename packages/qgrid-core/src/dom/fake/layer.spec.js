import { FakeLayer } from './layer';

describe('FakeLayer', () => {
  const fakeLayer = new FakeLayer();

  describe('resource', () => {
    it('should be undefined', () => {
      expect(fakeLayer.resource()).to.equal(undefined);
    });
  });

  describe('destroy', () => {
    it('should be undefined', () => {
      expect(fakeLayer.destroy()).to.equal(undefined);
    });
  });

});
