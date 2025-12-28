import TerminalController from "./terminalController.js";
import Person from "./person.js";
import database from '../database.json' with  {type:"json"}

const DEFAULT_LANG = "pt-br";
const STOP_TERM = ":q"
const terminalController = new TerminalController();

terminalController.initializeTerminal(database,DEFAULT_LANG)

async function mainLoop(){
  try{
    // example: 2 Bike,Aviao,Navio 2000000 2000-01-01 2002-02-02
    const answer = await terminalController.question("whats?")
    
    if(answer ===STOP_TERM) {
      terminalController.closeTerminal()
      return console.log('process finished')
    }
    const person = Person.generateInstanceFromString(answer)
    console.log(person.formatted(DEFAULT_LANG))
    return mainLoop()
  }catch(err){
    console.error(err)
    return mainLoop()
  }
}

await mainLoop()
