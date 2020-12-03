const doneCssClass = 'done';

export default class MonthService {
    constructor(monthDAO) {
      this.monthDAO = monthDAO;
      this.bindFormEvent();
      this.listMonths();
    }
  
    bindFormEvent() {
      const form = document.querySelector("form");
      form.addEventListener("submit", (event) => {
        event.preventDefault();
        this.addMonth(form.item.value);
        form.reset();
        form.item.focus();
      });
    }
  
    async addMonth(monthYear) {
      const month = { monthYear, done: false };
      const monthId = await this.monthDAO.save(month);
      month.id = monthId;
      this.addToHtmlList(month);
    }
  
    async listMonths() {
      const months = await this.monthDAO.getAll();
      months.forEach((month) => this.addToHtmlList(month));
    }

    toogleMonth(li) {
        const monthId = this.getMonthId(li);
        li.classList.toggle(doneCssClass);
        const isDone = li.classList.contains(doneCssClass);
        this.saveMonth(monthId, isDone);

    }

    async saveMonth(monthId, isDone) {
        const month = await this.monthDAO.get(monthId);
        month.done = isDone;
        await this.monthDAO.save(month)
    }

    getMonthId(li) {
        return +li.getAttribute("data-item-id");
    }  

    addToHtmlList(month) {
      const ul = document.querySelector("ul");
      const li = document.createElement("li");
      const span = document.createElement("span");
      const button = document.createElement("button");
  
      span.textContent = month.monthYear;

      li.setAttribute("data-item-id", month.id);
      li.addEventListener('click', () => this.toogleMonth(li));
  
      if (month.done) {
        li.classList.add(doneCssClass);
      }
  
      li.appendChild(span);
      li.appendChild(button);
      ul.appendChild(li);
    }
  }