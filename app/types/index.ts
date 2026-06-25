export type MatchStatus = 'live' | 'finished' | 'upcoming'

export type MatchEventType =
  | 'goal'
  | 'assist'
  | 'yellow'
  | 'red'
  | 'substitution'
  | 'penalty'
  | 'own-goal'

export type FormResult = 'W' | 'D' | 'L'

export interface League {
  id: string
  slug: string
  name: string
  country: string
  countryCode: string
  season: string
  color: string
  teamCount: number
}

export interface Team {
  id: string
  slug: string
  name: string
  shortName: string
  abbr: string
  leagueId: string
  color: string
  founded: number
  stadium: string
}

export interface MatchEvent {
  minute: number
  type: MatchEventType
  team: 'home' | 'away'
  player: string
  detail?: string
}

export interface MatchStats {
  possession: [number, number]
  shots: [number, number]
  shotsOnTarget: [number, number]
  corners: [number, number]
  fouls: [number, number]
  yellowCards: [number, number]
  redCards: [number, number]
}

export interface LineupPlayer {
  number: number
  name: string
  position: string
}

export interface MatchLineups {
  homeFormation: string
  awayFormation: string
  home: LineupPlayer[]
  away: LineupPlayer[]
}

export interface H2HResult {
  date: string
  homeTeamId: string
  awayTeamId: string
  homeScore: number
  awayScore: number
}

export interface Match {
  id: string
  leagueId: string
  homeTeamId: string
  awayTeamId: string
  homeScore: number
  awayScore: number
  status: MatchStatus
  minute: number
  kickoff: string // ISO date
  events: MatchEvent[]
  stats: MatchStats | null
  lineups: MatchLineups | null
  h2h: H2HResult[]
}

export interface Player {
  id: string
  name: string
  teamId: string
  position: string
  goals: number
  assists: number
  appearances: number
  number: number
}

export interface StandingRow {
  position: number
  team: Team
  played: number
  win: number
  draw: number
  lose: number
  goalsFor: number
  goalsAgainst: number
  goalDiff: number
  points: number
  form: FormResult[]
}
