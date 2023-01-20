    {
      "label": "pushing work to git remote",
      "type": "shell",
      "command": "git add .;git commit -m'[${input:pushing_work_to_git_remote0}] ${input:pushing_work_to_git_remote1}';git branch --unset-upstream;git push origin HEAD",
      "group": "none",
      "linux": {
        "command": "git add .;git commit -m\"[${input:pushing_work_to_git_remote0}] ${input:pushing_work_to_git_remote1}\";git branch --unset-upstream;git push origin HEAD"
      },
      "presentation": {
        "reveal": "always",
        "panel": "new",
        // "close": true
      }
    },
       
    {
      "id": "pushing_work_to_git_remote0",
      "description": "pushing_work_to_git_remote",
      "default": "UPDATE",
      "type": "pickString",
      "options": ["UPDATE", "FIX", "PATCH", "BUG", "MERGE", "COMPLEX MERGE"]
    },
    {
      "id": "pushing_work_to_git_remote1",
      "description": "git commit desc",
      "default": "additional work",
      "type": "promptString"
    },        

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
