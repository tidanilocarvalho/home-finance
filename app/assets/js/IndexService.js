export default class IndexService {
    constructor(tagDAO, monthDAO) {
      this.tagDAO = tagDAO;
      this.monthDAO = monthDAO;
      this.listAll();
    }
    
    //TODO
    async listAll() {
      const tags = await this.tagDAO.getAll();
      const months = await this.monthDAO.getAll();

      tags.forEach((tag) => this.addToHtmlList(tag.tagName));
      months.forEach((month) => this.addToHtmlList(month.monthYear));
    }


    //TODO
    addToHtmlList(value) {
      const ul = document.querySelector("ul");
      const li = document.createElement("li");
      const span = document.createElement("span");
      const button = document.createElement("button");
  
      span.textContent = value

      li.appendChild(span);
      li.appendChild(button);
      ul.appendChild(li);
    }
  }