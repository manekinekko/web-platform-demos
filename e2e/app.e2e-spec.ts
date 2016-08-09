import { WebPlatformDemosPage } from './app.po';

describe('web-platform-demos App', function() {
  let page: WebPlatformDemosPage;

  beforeEach(() => {
    page = new WebPlatformDemosPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
