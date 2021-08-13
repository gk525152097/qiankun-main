(function () {
  class InitChildPage extends HTMLElement {
    // eslint-disable-next-line no-useless-constructor
    constructor () {
      super()
      this.wrapperId = `micro${new Date().valueOf()}`
    }

    initElement () {
      this.innerHTML = `
        <style>
          .micro-wrapper>:first-child {
            height: 100%;
            width: 100%;
          }
        </style>
      `
      let wrapper = document.createElement('init-child-page-body')
      wrapper.id = this.wrapperId
      wrapper.classList.add('micro-wrapper')
      wrapper.style = 'width: 100%; height: 100%'
      if (!document.getElementById(this.wrapperId)) {
        this.appendChild(wrapper)
      }
    }

    connectedCallback () {
      this.initElement()
      const name = this.getAttribute('id')
      const { handleInitMicro } = window.microApp[name]
      handleInitMicro(this.wrapperId)
    }

    attributeChangedCallback (attr, oldVal, newVal) {
      console.log(attr, oldVal, newVal)
    }
  }
  window.customElements.define('init-child-page', InitChildPage)
})()
