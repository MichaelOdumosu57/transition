

eventDispatcher(event: string, element: HTMLElement | Window | Element,keyboardCharCode:number =13) {

    try {
      let eventModern
      if(["keydown","keyup"].includes(event) ){
        let eventInitObj = {
          13:{
            code: 'Enter',
            key: 'Enter',
            charCode: 13,
            keyCode: 13,
            view: window,
            bubbles: true
          }
        }[keyboardCharCode]
        eventModern = new KeyboardEvent(event,eventInitObj)
      }
      else{

        eventModern = new Event(event)
      }

      element.dispatchEvent(eventModern)
    }
    catch (e) {
      let eventLegacy = document.createEvent("Event");
      eventLegacy.initEvent(event, false, true);
      element.dispatchEvent(eventLegacy)
    }
  }
