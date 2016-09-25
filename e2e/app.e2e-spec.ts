import { XxxPage } from './app.po';

describe('xxx App', function() {
  let page: XxxPage;

  beforeEach(() => {
    page = new XxxPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
