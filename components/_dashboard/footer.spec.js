import FooterComponent from './footer';
describe('footer.vue', () => {
    it('should have NAVAL NANO ERP as name', () => {
        expect(FooterComponent.APPLICATION_NAME).toBe(process.env.APPLICATION_NAME);
    });
});