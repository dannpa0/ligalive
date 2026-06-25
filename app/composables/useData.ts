import leaguesJson from '~/data/leagues.json'
import teamsJson from '~/data/teams.json'
import matchesJson from '~/data/matches.json'
import playersJson from '~/data/players.json'
import type { League, Team, Match, Player, StandingRow, FormResult } from '~/types'

const leagues = leaguesJson as League[]
const teams = teamsJson as Team[]
const matches = matchesJson as Match[]
const players = playersJson as Player[]

const teamMap = new Map(teams.map((t) => [t.id, t]))
const leagueMap = new Map(leagues.map((l) => [l.id, l]))

export function useData() {
  const getTeam = (id: string): Team | undefined => teamMap.get(id)
  const getLeague = (id: string): League | undefined => leagueMap.get(id)
  const getLeagueBySlug = (slug: string): League | undefined => leagues.find((l) => l.slug === slug)
  const getMatch = (id: string): Match | undefined => matches.find((m) => m.id === id)

  const liveMatches = (limit?: number): Match[] => {
    const list = matches.filter((m) => m.status === 'live').sort((a, b) => b.minute - a.minute)
    return limit ? list.slice(0, limit) : list
  }

  const upcomingMatches = (leagueId?: string, limit?: number): Match[] => {
    let list = matches
      .filter((m) => m.status === 'upcoming')
      .sort((a, b) => +new Date(a.kickoff) - +new Date(b.kickoff))
    if (leagueId) list = list.filter((m) => m.leagueId === leagueId)
    return limit ? list.slice(0, limit) : list
  }

  const finishedMatches = (leagueId?: string, limit?: number): Match[] => {
    let list = matches
      .filter((m) => m.status === 'finished')
      .sort((a, b) => +new Date(b.kickoff) - +new Date(a.kickoff))
    if (leagueId) list = list.filter((m) => m.leagueId === leagueId)
    return limit ? list.slice(0, limit) : list
  }

  const matchesByLeague = (status?: Match['status'][]): { league: League; matches: Match[] }[] => {
    return leagues
      .map((league) => {
        let list = matches.filter((m) => m.leagueId === league.id)
        if (status) list = list.filter((m) => status.includes(m.status))
        list = list.sort((a, b) => {
          const order = { live: 0, upcoming: 1, finished: 2 }
          if (order[a.status] !== order[b.status]) return order[a.status] - order[b.status]
          return +new Date(b.kickoff) - +new Date(a.kickoff)
        })
        return { league, matches: list }
      })
      .filter((g) => g.matches.length > 0)
  }

  const topScorers = (leagueId?: string, limit = 10): Player[] => {
    let list = [...players]
    if (leagueId) list = list.filter((p) => getTeam(p.teamId)?.leagueId === leagueId)
    return list.sort((a, b) => b.goals - a.goals || b.assists - a.assists).slice(0, limit)
  }

  const standings = (leagueId: string): StandingRow[] => {
    const lt = teams.filter((t) => t.leagueId === leagueId)
    const finished = matches
      .filter((m) => m.leagueId === leagueId && m.status === 'finished')
      .sort((a, b) => +new Date(a.kickoff) - +new Date(b.kickoff))

    const rows = lt.map((team) => {
      const r: Omit<StandingRow, 'position'> = {
        team,
        played: 0,
        win: 0,
        draw: 0,
        lose: 0,
        goalsFor: 0,
        goalsAgainst: 0,
        goalDiff: 0,
        points: 0,
        form: [],
      }
      for (const m of finished) {
        const isHome = m.homeTeamId === team.id
        const isAway = m.awayTeamId === team.id
        if (!isHome && !isAway) continue
        const gf = isHome ? m.homeScore : m.awayScore
        const ga = isHome ? m.awayScore : m.homeScore
        r.played++
        r.goalsFor += gf
        r.goalsAgainst += ga
        let res: FormResult
        if (gf > ga) {
          r.win++
          r.points += 3
          res = 'W'
        } else if (gf === ga) {
          r.draw++
          r.points += 1
          res = 'D'
        } else {
          r.lose++
          res = 'L'
        }
        r.form.push(res)
      }
      r.goalDiff = r.goalsFor - r.goalsAgainst
      r.form = r.form.slice(-5)
      return r
    })

    return rows
      .sort((a, b) => b.points - a.points || b.goalDiff - a.goalDiff || b.goalsFor - a.goalsFor)
      .map((r, i) => ({ ...r, position: i + 1 }))
  }

  const leagueStats = (leagueId: string) => {
    const lm = matches.filter((m) => m.leagueId === leagueId && m.status !== 'upcoming')
    const goals = lm.reduce((sum, m) => sum + m.homeScore + m.awayScore, 0)
    return {
      totalTeams: teams.filter((t) => t.leagueId === leagueId).length,
      totalMatches: lm.length,
      goalsScored: goals,
      avgGoals: lm.length ? (goals / lm.length).toFixed(2) : '0.00',
    }
  }

  const searchTeams = (q: string): Team[] => {
    const s = q.trim().toLowerCase()
    if (!s) return []
    return teams.filter((t) => t.name.toLowerCase().includes(s) || t.shortName.toLowerCase().includes(s))
  }

  return {
    leagues,
    teams,
    matches,
    players,
    getTeam,
    getLeague,
    getLeagueBySlug,
    getMatch,
    liveMatches,
    upcomingMatches,
    finishedMatches,
    matchesByLeague,
    topScorers,
    standings,
    leagueStats,
    searchTeams,
  }
}
