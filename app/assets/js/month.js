import MonthDAO from './MonthDAO.js'
import MonthService from './MonthService.js'

class App {
  constructor() {
    this.registerServiceWorker();
    this.initialize();
  }
  
  initialize() {
    new MonthService(new MonthDAO());
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
