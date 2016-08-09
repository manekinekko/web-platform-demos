export class WebPlatformDemosPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('web-platform-demos-app h1')).getText();
  }
}
