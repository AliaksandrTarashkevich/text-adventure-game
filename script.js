const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}

function startGame() {
    state = {}
    showTextNode(1)
}

function showTextNode(textNodeIndex) {
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
    textElement.innerText = textNode.text
    while (optionButtonsElement.firstChild) {
        optionButtonsElement.removeChild(optionButtonsElement.firstChild)
    }

    textNode.options.forEach(option => {
        if (showOption(option)) {
            const button = document.createElement('button')
            button.innerText = option.text
            button.classList.add('btn')
            button.addEventListener('click', () => selectOption(option))
            optionButtonsElement.appendChild(button)
        }
    })
}

function showOption(option) {
    return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
    const nextTextNodeId = option.nextText
    if (nextTextNodeId <= 0) {
        return startGame()
    }
    state = Object.assign(state, option.setState)
    showTextNode(nextTextNodeId)
}

const textNodes = [
  {
    id: 1,
    text: 'Вы входите в странное место и видите сосуд с синей слизью перед собой',
    options: [
      {
        text: 'Взять сосуд со слизью',
        setState: { blueGoo: true },
        nextText: 2
      },
      {
        text: 'Не трогать сосуд',
        nextText: 2
      }
    ]
  },
  {
    id: 2,
    text: 'Вы рискуете и продолжаете идти дальше в поисках ответов, где вы находитесь и натыкаетесь на лавку торговца.',
    options: [
      {
        text: 'Обменять сосуд на меч',
        requiredState: (currentState) => currentState.blueGoo,
        setState: { blueGoo: false, sword: true },
        nextText: 3
      },
      {
        text: 'Обменять сосуд на щит',
        requiredState: (currentState) => currentState.blueGoo,
        setState: { blueGoo: false, shield: true },
        nextText: 3
      },
      {
        text: 'Пройти мимо лавки',
        nextText: 3
      }
    ]
  },
  {
    id: 3,
    text: 'Пройдя немного дальше вы понимаете что сильно устали и задерживаетесь перед небольшим городком рядом с замком который выглядит очень опасно.',
    options: [
      {
        text: 'Пойти в замок',
        nextText: 4
      },
      {
        text: 'Найти гостиницу в городке',
        nextText: 5
      },
      {
        text: 'Найти стог сена в конюшне, чтобы переночевать там',
        nextText: 6
      }
    ]
  },
  {
    id: 4,
    text: 'Вы так устали пока шли по замку, что уснули прямо там и были убиты ужасным монстром пока спали...',
    options: [
      {
        text: 'Начать заново',
        nextText: -1
      }
    ]
  },
  {
    id: 5,
    text: 'Без денег на гостиницу вы прокрадываетесь в номер и засыпаете там, хозяин гостиницы находит вас спящим и вызывает стражу. Поздравляю, вас заточили в темницу.',
    options: [
      {
        text: 'Начать заново',
        nextText: -1
      }
    ]
  },
  {
    id: 6,
    text: 'Вы проснулись отдохнувшим и полным энергии, готовым к приключениям, так что вы направляетесь в замок неподалеку.',
    options: [
      {
        text: 'Исследовать замок',
        nextText: 7
      }
    ]
  },
  {
    id: 7,
    text: 'Проходя по коридорам замка вы натыкаетесь на ужасного монстра прямо перед вами.',
    options: [
      {
        text: 'Попробовать убежать',
        nextText: 8
      },
      {
        text: 'Напасть на монстра с мечом',
        requiredState: (currentState) => currentState.sword,
        nextText: 9
      },
      {
        text: 'Спрятаться за щитом',
        requiredState: (currentState) => currentState.shield,
        nextText: 10
      },
      {
        text: 'Бросить в монстра колбу',
        requiredState: (currentState) => currentState.blueGoo,
        nextText: 11
      }
    ]
  },
  {
    id: 8,
    text: 'Ваша попытка убежать тщетна- монстр с легкостью вас догоняет...',
    options: [
      {
        text: 'Начать заново',
        nextText: -1
      }
    ]
  },
  {
    id: 9,
    text: 'Вы и правда думали что можно убить этого монстра одним лишь мечом? Глупец...',
    options: [
      {
        text: 'Начать заново',
        nextText: -1
      }
    ]
  },
  {
    id: 10,
    text: 'Монстр рассмеялся как жалко выглядит Ваша попытка спрятаться за щитом и съел вас с портохами.',
    options: [
      {
        text: 'Начать заново',
        nextText: -1
      }
    ]
  },
  {
    id: 11,
    text: 'Вы бросили колбу с зельем в монстра и она взорвалась. Когда улеглась пыль вы увидели что монстр лежит на полу замертво. После такой славной победы вы решаете объявить замок своим и прожить там до конца своей счастливой жизни, поздравляем!',
    options: [
      {
        text: 'Красаучик, ээээ, погнали еще раз.',
        nextText: -1
      }
    ]
  }
]

startGame()