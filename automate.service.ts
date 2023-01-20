    {
      "label": "Create branch after merged changes",
      "type": "shell",
      "command": " git checkout ${input:create_branch_after_merged_changes0};git pull origin ${input:create_branch_after_merged_changes0};git branch --delete ${input:create_branch_after_merged_changes1};git checkout -b ${input:create_branch_after_merged_changes2}",
      "group": "none",
      "presentation": {
        "reveal": "always",
        "panel": "new",
        "close": true
      }
    },
        
    {
      "id": "create_branch_after_merged_changes0",
      "description": "the branch to pull from",
      "default": "dev",
      "type": "promptString"
    },
    {
      "id": "create_branch_after_merged_changes1",
      "description": "the local branch to delete",
      "default": "michael-fantastic",
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
