import type { Round, RoundResult } from '@/types'

export function calculateRaceResults(round: Round): RoundResult[] {
  return round.horses
    .map((horse) => ({
      horse,
      time: round.distance / (horse.condition * 0.1 + 5) + (Math.random() - 0.5) * 2,
    }))
    .sort((a, b) => a.time - b.time)
    .map(({ horse, time }, i) => ({
      position: i + 1,
      horseId: horse.id,
      horseName: horse.name,
      time,
    }))
}
