import TagDAO from './TagDAO.js'
import MonthDAO from './MonthDAO.js'
import IndexDAO from './IndexDAO.js'
import IndexService from './IndexService.js'

class App {
  constructor() {
    this.registerServiceWorker();
    this.initialize();
  }
  
  initialize() {
    new IndexService(new IndexDAO(), new TagDAO(), new MonthDAO());
  }

  registerServiceWorker() {
    if ('serviceWorker' in navigator) {
      const onsuccess = () => console.log('[Service Worker] Registered');
      const onfailure = () => console.log('[Service Worker] Failed');
    
      navigator.serviceWorker
        .register('sw.js')
        .then(onsuccess)
        .catch(onfailure);
    }
  }
}

new App();
