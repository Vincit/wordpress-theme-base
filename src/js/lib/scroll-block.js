class ScrollBlock {
  handleEvent(e) {
    if (e.type === 'resize') {
      console.log(this);
      this.setAttrs();
    }
  }

  saveOldAttrs() {
    this.oldBodyOverflow = document.body.style.overflow;
    this.oldHtmlOverflow = document.children[0].style.overflow;
    this.oldHeight = document.body.style.height;

    return this;
  }

  setAttrs() {
    document.children[0].style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    document.body.style.height = `${window.innerHeight}px`;

    return this;
  }

  resetAttrs() {
    document.children[0].style.overflow = this.oldBodyOverflow;
    document.body.style.overflow = this.oldBodyOverflow;
    document.body.style.height = this.oldHeight;

    return this;
  }

  activate() {
    if (!this.active) {
      window.addEventListener('resize', this);
      this.scrollY = window.scrollY;
      this.saveOldAttrs();
      this.setAttrs();
      this.active = true;
    }

    return this;
  }

  deactivate() {
    if (this.active) {
      window.removeEventListener('resize', this);
      this.resetAttrs();
      window.scrollTo(0, this.scrollY);
      this.active = false;
    }

    return this;
  }
}

const scrollBlock = new ScrollBlock();

export { scrollBlock };

export default scrollBlock;
