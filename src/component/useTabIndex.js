import React from 'react'
import { TABINDEX } from './util'

export const useTabIndex = (initvalue) => {
    const [tabIndex, setTabIndex] = React.useState(() => {
      try {
        return parseInt(initvalue)
      }
      catch { 
        return 0 }
    })
    React.useEffect(() => {
      let num = 0
      try {
        num = localStorage.getItem(TABINDEX)
        num = parseInt(num)
        if (num.isNaN()){
          throw new Error("this is fuck")
        }
      } catch {
        num = 0
        console.log("num", num)
        localStorage.setItem(TABINDEX, JSON.stringify(num))
      }
      setTabIndex(num)
    }, [])
    const onChangeTabIndex = (val) => {
      let num = 0
      try { num = parseInt(val) }
      catch {
        console.log("dev error pasrseint val, SHOULD PASS IN A NUMBER")
      }
      setTabIndex(num)
      localStorage.setItem(TABINDEX, JSON.stringify(num))
    }
    return [tabIndex, onChangeTabIndex]
  }

  