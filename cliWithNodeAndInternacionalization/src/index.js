import TerminalController from "./terminalController.js";
import database from '../database.json' with  {type:"json"}

const DEFAULT_LANG = "pt-br";

const terminalController = new TerminalController();

terminalController.initializeTerminal(database,DEFAULT_LANG)