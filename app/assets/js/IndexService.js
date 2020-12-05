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

      tags.forEach((tag) => this.addTagToCombox(tag));
      months.forEach((month) => this.addMonthToCombox(month));

      this.bindTagEvent();
      this.bindMonthEvent();
    }

    addTagToCombox(tag) {
      const ul = document.querySelector(".home-finance-tag-select");

      const li = document.createElement("li");
      const span1 = document.createElement("span");
      const span2 = document.createElement("span");
  
      span2.textContent = tag.tagName;
      
      span1.classList.add("mdc-list-item__ripple");
      span2.classList.add("mdc-list-item__text");

      li.classList.add("mdc-list-item");
      li.setAttribute("data-value", tag.tagName);

      li.appendChild(span1);
      li.appendChild(span2);
      ul.appendChild(li);
    }

    addMonthToCombox(month) {
      const ul = document.querySelector(".home-finance-month-select");

      const li = document.createElement("li");
      const span1 = document.createElement("span");
      const span2 = document.createElement("span");
  
      span2.textContent = month.monthYear;
      
      span1.classList.add("mdc-list-item__ripple");
      span2.classList.add("mdc-list-item__text");

      li.classList.add("mdc-list-item");
      li.setAttribute("data-value", month.monthYear);

      li.appendChild(span1);
      li.appendChild(span2);
      ul.appendChild(li);
    }
    
    bindTagEvent() {
      const select = mdc.select.MDCSelect.attachTo(document.querySelector(".mdc-tag-select"));
        
      select.listen('MDCSelect:change', () => {
        console.log(select.selectedIndex, select.value);
      });
    }

    bindMonthEvent() {
      const select = mdc.select.MDCSelect.attachTo(document.querySelector(".mdc-month-select"));
        
      select.listen('MDCSelect:change', () => {
        console.log(select.selectedIndex, select.value);
      });
    }
  }