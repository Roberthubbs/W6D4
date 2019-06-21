const DOMNodeCollection = require("./dom_node_collection");

window.$l = function(arg){
  let nodeList = [];
  if (typeof arg === "string"){
    const list = document.querySelectorAll(arg);
    nodeList = Array.from(list);
  } else if (arg instanceof HTMLElement){
    nodeList = [arg];
  } 
  // const collection = new DOMNodeCollection(nodeList);
  console.log(nodeList);
  return new DOMNodeCollection(nodeList);
};
