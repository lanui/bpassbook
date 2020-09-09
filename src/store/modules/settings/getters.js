const DEFAULT_LOCKED_MINS_LIST = [
  {
    mins:5,
    minsText:'5 Mins',
  },
  {
    mins: 10,
    minsText: '10 Mins',
  },
  {
    mins: 15,
    minsText: '15 Mins',
  },
  {
    mins: 20,
    minsText: '20 Mins',
  },
  {
    mins:30,
    minsText: '30 Mins',
  }
]

export const lockedTimeItems = (state) => {
  const currentMins = state.autoLockedMins
  return DEFAULT_LOCKED_MINS_LIST.map( item => {
    if (item.mins === currentMins) {
      item.checked = true
    }else {
      item.checked = false
    }
    return item
  })
}

export const lockedTimeSelected = (state) => {
  const currentMins = state.autoLockedMins
  const selected = DEFAULT_LOCKED_MINS_LIST.find(it => it.mins === currentMins)

  return selected ? selected.minsText : currentMins
}
