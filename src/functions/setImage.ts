
import cheese from '../assets/cheese.svg'
import cucumber from '../assets/cucumber.svg'
import sauce from '../assets/sauce.svg'
import pepper from '../assets/pepper.svg'
import onion from '../assets/onion.svg'
import mushrooms from '../assets/mushrooms.svg'
import other from '../assets/other.svg'


export const setImage = (name: string) => {
    switch(name){
      case 'сыр': return cheese
      case 'cucumber': return cucumber
      case 'Соус': return sauce
      case 'pepper': return pepper
      case 'mushrooms': return mushrooms
      case 'onion': return onion
      default: return other
    }
  }