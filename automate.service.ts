  generateFile(counter = 0){
    let obj = { hello: "world "+ counter };
    let blob =  new File([JSON.stringify(obj)], "foo.json", {
      type: "application/json",
    });
    return blob
  }

  traverseClassAndNoopAllAutomationInit(){
    let entries = Object.entries(this)
    .filter((entry)=>{
      let [key,val]= entry
      return val.constructor.name === "Object"
    })

    let result = Object.fromEntries(entries)

    this.traverseClassAndNoopAllAutomation(result)
  }

  traverseClassAndNoopAllAutomation(obj,stack=[]){
    if(!environment.production) {
      return
    }
    Object.entries(obj).forEach(entry=>{
      let [key,value] = entry
      if(value.constructor.name === "Object"){
        stack.push(obj[key])
        this.traverseClassAndNoopAllAutomation(value,stack)
        stack = []
      }
      else{
        if(value instanceof Function){
          stack[stack.length-1][key] = ()=>{}
        }
      }
    })
  }
