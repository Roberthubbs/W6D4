class DOMNodeCollection{
  
  constructor(elArray){
    this.elArray = elArray;
  }

  html(string){
    if (string===undefined){
      return this.elArray[0].innerHTML;
    } else {
      this.elArray.forEach( (el) => {
        el.innerHTML = string;
      });
    }
  }

  empty(){
    this.html('');
  }

  append(arg){
    if (arg instanceof DOMNodeCollection){
        this.elArray.forEach((innerEl) => {
          arg.elArray.forEach((outerEl) => {
            innerEl.innerHTML += (' ' + outerEl.outerHTML);
          });
        });
    }
    
    if (arg instanceof HTMLElement){
      this.elArray.forEach((el) => {
        el.innerHTML += ' ' + arg.outerHTML;
      });
    }
    
    if (typeof arg === 'string'){
      this.elArray.forEach((el) => {
        el.innerHTML += ' ' + arg;
      });
    }
  }

  attr(prop, value){
    //setAttribute
    //getAttribute

    if (value === undefined){
      return this.elArray[0].getAttribute(prop);
    } else {
      this.elArray.forEach( (el) => {
        el.setAttribute(prop, value);
      });
    }

  }

  addClass(...classNames){
    classNames.forEach((name) => {
      this._addClass(name);
    });
  }
  

  _addClass(className){
    this.elArray.forEach((el) => {
      let currentClass = [el.className] || [];
      currentClass.push(className);
      el.className = currentClass.join(" ");
    });
  }

  removeClass(...classNames){
    classNames.forEach( (name) => {
      this._removeClass(name);
    });
  }

  _removeClass(className){
    this.elArray.forEach((el) => {
      let resultArr = [];
      let currentClass = el.className.split(" ");
      currentClass.forEach((name) => {
        if (name !== className){
          resultArr.push(name);
        }
      });
      el.className = resultArr.join(" ");
    });
  }

  children(){
    let result = [];
    this.elArray.forEach((node) => {

      let queue = [node];
      while (queue.length > 0){
        let parent = queue.shift();
        result = result.concat(parent);
        let childArr = Array.from(parent.children);
        queue = queue.concat(childArr);
      }
    });
    return new DOMNodeCollection(result.slice(1));
  }

}

module.exports = DOMNodeCollection;