import { Games } from './enum'

export const config = {
  [Games.randix]: {
    title: 'Randix',
    routes: [
      { route: '/randix/', label: 'Home' },
      { route: '/randix/vs-player/', label: 'vs Player' },
      { route: '/randix/vs-computer/', label: 'vs Cp' },
    ],
  },
}
