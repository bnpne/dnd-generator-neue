export function processData(q1, q2, q3, q4, q5, q6, q7) {
  var userClass = chooseClass(q1, q2, q3, q4, q7)
  var userRace = chooseRace(userClass, q5, q6)

  return { userClass, userRace }
}

const chooseRace = (userClass, q5, q6) => {
  var userRace = ''

  if (userClass == 'barbarian') {
    if (q5 == 'small') {
      userRace = 'dwarf'
    } else if (q5 == 'medium') {
      if (q6 == 'neutral' || q6 == 'good') {
        userRace = 'human'
      } else {
        userRace = 'half-orc'
      }
    } else {
      userRace = 'dragonborn'
    }
  } else if (userClass == 'bard') {
    if (q5 == 'small') {
      userRace = 'halfling'
    } else {
      if (Math.floor(Math.random() * Math.floor(2)) == 1) {
        userRace = 'half-elf'
      } else {
        userRace = 'human'
      }
    }
  } else if (userClass == 'cleric') {
    if (q5 == 'small') {
      userRace = 'halfling'
    } else {
      userRace = 'human'
    }
  } else if (userClass == 'druid') {
    if (q5 == 'small') {
      userRace = 'gnome'
    } else {
      if (Math.floor(Math.random() * Math.floor(2)) == 1) {
        userRace = 'elf'
      } else {
        userRace = 'human'
      }
    }
  } else if (userClass == 'fighter') {
    if (q5 == 'small') {
      if (Math.floor(Math.random() * Math.floor(2)) == 1) {
        userRace = 'dwarf'
      } else {
        userRace = 'halfling'
      }
    } else {
      if (q6 == 'neutral' || q6 == 'good') {
        if (Math.floor(Math.random() * Math.floor(2)) == 1) {
          userRace = 'elf'
        } else {
          userRace = 'human'
        }
      } else {
        userRace = 'half-orc'
      }
    }
  } else if (userClass == 'monk') {
    if (q5 == 'small') {
      userRace = 'gnome'
    } else {
      if (Math.floor(Math.random() * Math.floor(2)) == 1) {
        userRace = 'elf'
      } else {
        userRace = 'human'
      }
    }
  } else if (userClass == 'paladin') {
    if (q5 == 'small') {
      userRace = 'dwarf'
    } else {
      userRace = 'dragonborn'
    }
  } else if (userClass == 'ranger') {
    if (q5 == 'small') {
      userRace = 'halfling'
    } else {
      if (Math.floor(Math.random() * Math.floor(2)) == 1) {
        userRace = 'elf'
      } else {
        userRace = 'human'
      }
    }
  } else if (userClass == 'rogue') {
    if (q5 == 'small') {
      userRace = 'halfling'
    } else {
      if (q6 == 'neutral' || q6 == 'good') {
        userRace = 'human'
      } else {
        userRace = 'tiefling'
      }
    }
  } else if (userClass == 'sorcerer') {
    if (q5 == 'small') {
      userRace = 'halfling'
    } else {
      if (q6 == 'good') {
        userRace = 'half-elf'
      } else {
        userRace = 'tiefling'
      }
    }
  } else if (userClass == 'warlock') {
    if (q5 == 'small') {
      userRace = 'halfling'
    } else {
      if (q6 == 'good') {
        userRace = 'human'
      } else {
        userRace = 'tiefling'
      }
    }
  } else if (userClass == 'wizard') {
    if (q5 == 'small') {
      userRace = 'gnome'
    } else {
      if (Math.floor(Math.random() * Math.floor(2)) == 1) {
        userRace = 'elf'
      } else {
        userRace = 'human'
      }
    }
  }

  return userRace
}

const chooseClass = (q1, q2, q3, q4, q7) => {
  var userClass = ''

  if (q1 == 'yes') {
    // Druid, Sorcerer, Warlock, Wizard
    if (q2 == 'yes') {
      // Warlock, Sorcerer, Druid
      if (q4 == 'yes') {
        // Warlock
        userClass = 'warlock'
      } else {
        // Sorcerer, Druid
        if (q3 == 'yes') {
          // Druid
          userClass = 'druid'
        } else {
          // Sorcerer
          userClass = 'sorcerer'
        }
      }
    } else {
      // Wizard
      userClass = 'wizard'
    }
  } else if (q1 == 'maybe') {
    // Bard, Cleric, Paladin, Ranger
    if (q2 == 'yes') {
      // Bard, Cleric, Paladin, Ranger
      if (q4 == 'yes') {
        // Cleric, Paladin
        if (q3 == 'yes') {
          // Cleric
          userClass = 'cleric'
        } else {
          // Paladin
          userClass = 'paladin'
        }
      } else {
        // Bard, Ranger
        if (q7 == 'strong') {
          // Ranger
          userClass = 'ranger'
        } else {
          // Bard
          userClass = 'bard'
        }
      }
    } else {
      // Wizard
      userClass = 'wizard'
    }
  } else {
    // Barbarian, Fighter, Monk, Rogue
    if (q2 == 'yes') {
      // Barbarian, Fighter, Rogue
      if (q3 == 'yes') {
        // Rogue
        userClass = 'rogue'
      } else {
        // Barbarian, Fighter
        if (q7 == 'strong') {
          // Barbarian
          userClass = 'barbarian'
        } else {
          // Fighter
          userClass = 'fighter'
        }
      }
    } else {
      // Monk
      userClass = 'monk'
    }
  }

  return userClass
}
