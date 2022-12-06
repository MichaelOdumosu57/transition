  documentQuerySelector(selector:string){
    return document.querySelector(selector) as HTMLElement
  }

  documentQuerySelectorAll(selector:string){
    return Array.from(document.querySelectorAll(selector)) as Array<HTMLElement>
  }
