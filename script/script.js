import {html, LitElement} from './lit-all.min.js';

class RegexChk extends LitElement {
  static get properties() {
    return {
      regex: {type: String},
    };
  }

  constructor() {
    super();
  }

  regexChk(e) {
    // String를 정규식으로 바꿀려면 맨 앞뒤에 있는 "/" 없애서 new EegExp에 넣어줘야함
    const regex = new RegExp(this.regex);
    const isValid = regex.test(e.target.value);

      if (isValid) {
        const validEvent = new CustomEvent('valid');

        this.dispatchEvent(validEvent);
      } else {
        const inValidEvent = new CustomEvent('inValid');

        this.dispatchEvent(inValidEvent);
      }
  }

  render() {
    return html`   
      <input id="input" style="color: inherit;" @input="${this.regexChk}" />
    `;
  }
}

class ValidationIpt extends LitElement {
  static get properties() {
    return {
      regex: {type: String},
      // 받을때 string을 array로 바꿔서 받기
      type: {
        converter(value, type) {
          return value.split(" ");
        },
        // type: String
      },
    };
  }

  constructor() {
    super();
  }   

  // 유효성 검사에 통과 했을때(무효한)
  inValid({ target }) {
    this.type.forEach(type => {
      if(type === "color") {
        target.style.color = "black";
      }
      
      if(type === "disabled") {
        target.shadowRoot.getElementById("input").disabled = false;
      }
    });
  }
  
  // 유효성 검사에 통과 못 했을때(유효한)
  valid({ target }) {
    this.type.forEach(type => {
      if(type === "color") {
        target.style.color = "red";
      }
  
      if(type === "disabled") {
        target.shadowRoot.getElementById("input").disabled = true;
      }
  
      if(type === "text") {
        target.shadowRoot.getElementById("input").value = "";
      }
    });
  }

  render() {
    return html`   
      <regex-chk @inValid="${this.inValid}" @valid="${this.valid}" regex="${this.regex}"></regex-chk>
    `;
  }
}

customElements.define('regex-chk', RegexChk);
customElements.define('validation-ipt', ValidationIpt);
