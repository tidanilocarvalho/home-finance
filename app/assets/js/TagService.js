export default class TagService {
    constructor(tagDAO) {
      this.tagDAO = tagDAO;
      this.bindFormEvent();
      this.listTags();
    }
  
    bindFormEvent() {
      const form = document.querySelector("form");
      form.addEventListener("submit", (event) => {
        event.preventDefault();
        this.addTag(form.item.value);
        form.reset();
        form.item.focus();
      });
    }
  
    async addTag(tagName) {
      const tag = { tagName };
      const tagId = await this.tagDAO.save(tag);
      tag.id = tagId;
      this.addToHtmlList(tag);
    }
  
    async listTags() {
      const tags = await this.tagDAO.getAll();
      tags.forEach((tag) => this.addToHtmlList(tag));
    }
  
    async deleteTag(li) {
        const tagId = this.getTagId(li);
        await this.tagDAO.delete(tagId);
        li.remove();
    }

    async saveTag(tagId) {
        const tag = await this.tagDAO.get(tagId);
        await this.todoService.save(tag)
    }

    getTagId(li) {
        return +li.getAttribute("data-item-id");
    }  

    addToHtmlList(tags) {
      const ul = document.querySelector("ul");
      const li = document.createElement("li");
      const span = document.createElement("span");
      const button = document.createElement("button");
  
      span.textContent = tags.tagName;

      li.setAttribute("data-item-id", tags.id);

      button.textContent = "x";
      button.addEventListener("click", (event) => {
          event.stopPropagation();
          this.deleteTag(li);
      });
  
      li.appendChild(span);
      li.appendChild(button);
      ul.appendChild(li);
    }
  }