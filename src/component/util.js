export const status = {
    CHECKOUT: "checkout",
    PLAYING: "playing",
    FINAL: "final",
}

export const TABINDEX = "tabIndex"

export const PLAYERLIST = "playerList" 

export function writeToLocalStorage(players) {
    localStorage.setItem(PLAYERLIST, JSON.stringify(players))
  }
export  function clearLocalStorage() {
    localStorage.setItem(PLAYERLIST, JSON.stringify([]))
    localStorage.setItem(TABINDEX, JSON.stringify(""))
  }
  