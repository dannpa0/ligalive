// Deterministic generator for LigaLive dummy data.
// Run with: node scripts/generate-data.mjs
// Output: app/data/{leagues,teams,matches,players}.json
import { writeFileSync, mkdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUT = resolve(__dirname, '../app/data')
mkdirSync(OUT, { recursive: true })

// --- seeded RNG (mulberry32) so output is stable across runs ---
let seed = 20260625
function rng() {
  seed |= 0
  seed = (seed + 0x6d2b79f5) | 0
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296
}
const ri = (min, max) => Math.floor(rng() * (max - min + 1)) + min
const pick = (arr) => arr[Math.floor(rng() * arr.length)]
const shuffle = (arr) => {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

// --- leagues ---
const leagues = [
  { id: 'l1', slug: 'premier-league', name: 'Premier League', country: 'England', countryCode: 'GB', season: '2025/26', color: '#3D195B' },
  { id: 'l2', slug: 'la-liga', name: 'La Liga', country: 'Spain', countryCode: 'ES', season: '2025/26', color: '#EE8707' },
  { id: 'l3', slug: 'serie-a', name: 'Serie A', country: 'Italy', countryCode: 'IT', season: '2025/26', color: '#0B5BA0' },
  { id: 'l4', slug: 'bundesliga', name: 'Bundesliga', country: 'Germany', countryCode: 'DE', season: '2025/26', color: '#D20515' },
  { id: 'l5', slug: 'liga-1', name: 'Liga 1 Indonesia', country: 'Indonesia', countryCode: 'ID', season: '2025/26', color: '#C8102E' },
]

// --- teams (4 per league = 20) ---
const teamsRaw = [
  ['l1', 'Arsenal', 'Arsenal', 'ARS', '#EF0107', 1886, 'Emirates Stadium'],
  ['l1', 'Chelsea', 'Chelsea', 'CHE', '#034694', 1905, 'Stamford Bridge'],
  ['l1', 'Manchester City', 'Man City', 'MCI', '#6CABDD', 1880, 'Etihad Stadium'],
  ['l1', 'Liverpool', 'Liverpool', 'LIV', '#C8102E', 1892, 'Anfield'],
  ['l2', 'Barcelona', 'Barça', 'BAR', '#A50044', 1899, 'Spotify Camp Nou'],
  ['l2', 'Real Madrid', 'Real Madrid', 'RMA', '#00529F', 1902, 'Santiago Bernabéu'],
  ['l2', 'Atlético Madrid', 'Atlético', 'ATM', '#CB3524', 1903, 'Metropolitano'],
  ['l2', 'Sevilla', 'Sevilla', 'SEV', '#D80027', 1890, 'Ramón Sánchez-Pizjuán'],
  ['l3', 'Juventus', 'Juventus', 'JUV', '#1F2933', 1897, 'Allianz Stadium'],
  ['l3', 'Inter', 'Inter', 'INT', '#0068A8', 1908, 'San Siro'],
  ['l3', 'AC Milan', 'Milan', 'MIL', '#FB090B', 1899, 'San Siro'],
  ['l3', 'Napoli', 'Napoli', 'NAP', '#12A0D7', 1926, 'Diego A. Maradona'],
  ['l4', 'Bayern Munich', 'Bayern', 'BAY', '#DC052D', 1900, 'Allianz Arena'],
  ['l4', 'Borussia Dortmund', 'Dortmund', 'DOR', '#FDE100', 1909, 'Signal Iduna Park'],
  ['l4', 'RB Leipzig', 'Leipzig', 'RBL', '#DD0741', 2009, 'Red Bull Arena'],
  ['l4', 'Bayer Leverkusen', 'Leverkusen', 'LEV', '#E32221', 1904, 'BayArena'],
  ['l5', 'Persib Bandung', 'Persib', 'PSB', '#1B458F', 1933, 'Si Jalak Harupat'],
  ['l5', 'Persija Jakarta', 'Persija', 'PSJ', '#E1241B', 1928, 'Jakarta Int’l Stadium'],
  ['l5', 'Bali United', 'Bali Utd', 'BAL', '#C8102E', 2014, 'Kapten I Wayan Dipta'],
  ['l5', 'PSM Makassar', 'PSM', 'PSM', '#D32F2F', 1915, 'Batakan'],
]
const teams = teamsRaw.map((t, i) => ({
  id: `t${i + 1}`,
  slug: t[1].toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
  name: t[1],
  shortName: t[2],
  abbr: t[3],
  leagueId: t[0],
  color: t[4],
  founded: t[5],
  stadium: t[6],
}))
const teamById = Object.fromEntries(teams.map((t) => [t.id, t]))
const teamsByLeague = (lid) => teams.filter((t) => t.leagueId === lid)

// --- players (50, curated stars + scorers) ---
const playerSeed = [
  // [teamAbbr, name, position, goals, assists]
  ['ARS', 'Bukayo Saka', 'RW', 18, 11], ['ARS', 'Kai Havertz', 'ST', 14, 5], ['ARS', 'Martin Ødegaard', 'CAM', 9, 12],
  ['CHE', 'Cole Palmer', 'CAM', 21, 9], ['CHE', 'Nicolas Jackson', 'ST', 13, 4],
  ['MCI', 'Erling Haaland', 'ST', 27, 6], ['MCI', 'Phil Foden', 'CAM', 12, 8], ['MCI', 'Bernardo Silva', 'CM', 7, 10],
  ['LIV', 'Mohamed Salah', 'RW', 24, 13], ['LIV', 'Luis Díaz', 'LW', 11, 6],
  ['BAR', 'Robert Lewandowski', 'ST', 22, 4], ['BAR', 'Lamine Yamal', 'RW', 12, 14], ['BAR', 'Raphinha', 'LW', 15, 9],
  ['RMA', 'Kylian Mbappé', 'ST', 26, 7], ['RMA', 'Jude Bellingham', 'CAM', 16, 10], ['RMA', 'Vinícius Júnior', 'LW', 17, 11],
  ['ATM', 'Antoine Griezmann', 'ST', 15, 8], ['ATM', 'Julián Álvarez', 'ST', 13, 6],
  ['SEV', 'Dodi Lukébakio', 'RW', 10, 5], ['SEV', 'Isaac Romero', 'ST', 9, 3],
  ['JUV', 'Dušan Vlahović', 'ST', 16, 3], ['JUV', 'Kenan Yıldız', 'LW', 8, 7],
  ['INT', 'Lautaro Martínez', 'ST', 19, 6], ['INT', 'Marcus Thuram', 'ST', 13, 9],
  ['MIL', 'Rafael Leão', 'LW', 12, 8], ['MIL', 'Christian Pulisic', 'RW', 11, 10],
  ['NAP', 'Romelu Lukaku', 'ST', 14, 5], ['NAP', 'Khvicha Kvaratskhelia', 'LW', 11, 9],
  ['BAY', 'Harry Kane', 'ST', 28, 9], ['BAY', 'Jamal Musiala', 'CAM', 13, 11], ['BAY', 'Michael Olise', 'RW', 12, 10],
  ['DOR', 'Serhou Guirassy', 'ST', 20, 4], ['DOR', 'Karim Adeyemi', 'RW', 9, 6],
  ['RBL', 'Loïs Openda', 'ST', 17, 5], ['RBL', 'Benjamin Šeško', 'ST', 14, 4],
  ['LEV', 'Florian Wirtz', 'CAM', 15, 13], ['LEV', 'Victor Boniface', 'ST', 13, 5],
  ['PSB', 'David da Silva', 'ST', 16, 4], ['PSB', 'Ciro Alves', 'RW', 9, 7],
  ['PSJ', 'Marko Šimić', 'ST', 14, 3], ['PSJ', 'Witan Sulaeman', 'LW', 8, 6],
  ['BAL', 'Privat Mbarga', 'ST', 12, 4], ['BAL', 'Stefano Lilipaly', 'CAM', 6, 9],
  ['PSM', 'Kenzo Nambu', 'CAM', 10, 8], ['PSM', 'Yance Sayuri', 'RW', 9, 5],
  ['ARS', 'Gabriel Martinelli', 'LW', 8, 6], ['LIV', 'Dominik Szoboszlai', 'CM', 6, 8],
  ['MCI', 'Rúben Dias', 'CB', 2, 1], ['BAR', 'Pedri', 'CM', 5, 7],
  ['INT', 'Nicolò Barella', 'CM', 6, 9],
]
const abbrToTeam = Object.fromEntries(teams.map((t) => [t.abbr, t]))
const players = playerSeed.map((p, i) => {
  const team = abbrToTeam[p[0]]
  return {
    id: `p${i + 1}`,
    name: p[1],
    teamId: team.id,
    position: p[2],
    goals: p[3],
    assists: p[4],
    appearances: ri(24, 34),
    number: ri(7, 30),
  }
})

// squad name pool for lineup filler
const firstNames = ['Marco', 'Diego', 'João', 'Leon', 'Pau', 'Andrés', 'Mateo', 'Noah', 'Felix', 'Eric', 'Bryan', 'Rizky', 'Egy', 'Pratama', 'Adi', 'Luca', 'Tom', 'Niko', 'Sergi', 'Yusuf']
const lastNames = ['Fernández', 'Rossi', 'Müller', 'Santos', 'Walker', 'Hernández', 'Nkunku', 'Kovač', 'Saputra', 'Pratama', 'Romero', 'Bauer', 'Mendes', 'Korhonen', 'Aziz', 'Bianchi', 'Lopez', 'Hakim', 'Park', 'Nielsen']
const fillerName = () => `${pick(firstNames)} ${pick(lastNames)}`

const FORMATIONS = {
  '4-3-3': ['GK', 'RB', 'CB', 'CB', 'LB', 'CM', 'CM', 'CAM', 'RW', 'ST', 'LW'],
  '4-2-3-1': ['GK', 'RB', 'CB', 'CB', 'LB', 'CDM', 'CDM', 'CAM', 'RW', 'ST', 'LW'],
  '3-5-2': ['GK', 'CB', 'CB', 'CB', 'RM', 'CM', 'CM', 'CM', 'LM', 'ST', 'ST'],
  '4-4-2': ['GK', 'RB', 'CB', 'CB', 'LB', 'RM', 'CM', 'CM', 'LM', 'ST', 'ST'],
}
function buildXI(team) {
  const formation = pick(Object.keys(FORMATIONS))
  const positions = FORMATIONS[formation]
  const stars = shuffle(players.filter((p) => p.teamId === team.id).map((p) => p.name))
  const used = new Set()
  const names = []
  const out = positions.map((pos, i) => {
    let name
    if ((pos === 'ST' || pos === 'RW' || pos === 'LW' || pos === 'CAM') && stars.length && !used.has(stars[0])) {
      name = stars.shift()
    } else {
      do {
        name = fillerName()
      } while (names.includes(name))
    }
    names.push(name)
    used.add(name)
    return { number: i === 0 ? 1 : ri(2, 30), name, position: pos }
  })
  return { formation, players: out }
}

// --- events / stats helpers ---
function teamScorerNames(team) {
  const stars = players.filter((p) => p.teamId === team.id).map((p) => p.name)
  return stars.length ? stars : [fillerName(), fillerName()]
}
function buildEvents(home, away, hs, as, maxMinute) {
  const events = []
  const hScorers = teamScorerNames(home)
  const aScorers = teamScorerNames(away)
  const carded = new Set()
  const add = (team, type) => {
    const pool = team === 'home' ? hScorers : aScorers
    let player = pick(pool)
    if (type === 'yellow' || type === 'red') {
      let tries = 0
      while (carded.has(player) && tries++ < 5) player = pick(pool)
      carded.add(player)
    }
    events.push({ minute: ri(2, maxMinute), type, team, player, detail: type === 'goal' ? 'Goal' : undefined })
  }
  for (let i = 0; i < hs; i++) add('home', rng() > 0.92 ? 'penalty' : 'goal')
  for (let i = 0; i < as; i++) add('away', rng() > 0.92 ? 'penalty' : 'goal')
  const yc = ri(1, 4)
  for (let i = 0; i < yc; i++) add(rng() > 0.5 ? 'home' : 'away', 'yellow')
  if (rng() > 0.85) add(rng() > 0.5 ? 'home' : 'away', 'red')
  if (maxMinute >= 60) {
    add('home', 'substitution')
    add('away', 'substitution')
  }
  return events.filter((e) => e.minute <= maxMinute).sort((a, b) => a.minute - b.minute)
}
function buildStats(hs, as, maxMinute) {
  const poss = ri(38, 62)
  const factor = maxMinute / 90
  const shotsH = Math.max(hs + 2, Math.round(ri(8, 20) * factor))
  const shotsA = Math.max(as + 2, Math.round(ri(8, 20) * factor))
  return {
    possession: [poss, 100 - poss],
    shots: [shotsH, shotsA],
    shotsOnTarget: [Math.max(hs, Math.round(shotsH * 0.45)), Math.max(as, Math.round(shotsA * 0.45))],
    corners: [Math.round(ri(2, 9) * factor), Math.round(ri(2, 9) * factor)],
    fouls: [Math.round(ri(6, 15) * factor), Math.round(ri(6, 15) * factor)],
    yellowCards: [ri(0, 3), ri(0, 3)],
    redCards: [rng() > 0.9 ? 1 : 0, rng() > 0.92 ? 1 : 0],
  }
}
function buildH2H(home, away) {
  const out = []
  for (let i = 0; i < 5; i++) {
    const swap = rng() > 0.5
    const h = swap ? away : home
    const a = swap ? home : away
    out.push({
      date: isoDaysAgo(60 + i * 45 + ri(0, 20)),
      homeTeamId: h.id,
      awayTeamId: a.id,
      homeScore: ri(0, 4),
      awayScore: ri(0, 3),
    })
  }
  return out
}

// --- dates ---
const BASE = new Date('2026-06-25T19:00:00Z')
function isoDaysAgo(d) {
  const dt = new Date(BASE.getTime() - d * 86400000)
  dt.setUTCHours(ri(13, 21), pick([0, 15, 30, 45]), 0, 0)
  return dt.toISOString()
}
function isoDaysAhead(d) {
  const dt = new Date(BASE.getTime() + d * 86400000)
  dt.setUTCHours(ri(13, 21), pick([0, 30]), 0, 0)
  return dt.toISOString()
}

// --- matches: 20 per league = 100 ---
const matches = []
let mid = 0
for (const league of leagues) {
  const lt = teamsByLeague(league.id)
  // all ordered pairs (home/away) → 12 pairings for 4 teams
  const pairs = []
  for (const h of lt) for (const a of lt) if (h.id !== a.id) pairs.push([h, a])
  const schedule = shuffle(pairs).concat(shuffle(pairs)).slice(0, 20) // 20 fixtures

  schedule.forEach(([home, away], idx) => {
    mid++
    // status distribution per league: 2 live, 4 upcoming, 14 finished
    let status, minute, kickoff, hs, as
    if (idx < 2) {
      status = 'live'
      minute = ri(18, 88)
      kickoff = isoDaysAgo(0)
      hs = ri(0, 3)
      as = ri(0, 3)
    } else if (idx < 6) {
      status = 'upcoming'
      minute = 0
      kickoff = isoDaysAhead(idx - 1)
      hs = 0
      as = 0
    } else {
      status = 'finished'
      minute = 90
      kickoff = isoDaysAgo(idx - 4)
      hs = ri(0, 4)
      as = ri(0, 3)
    }

    const maxMinute = status === 'live' ? minute : 90
    matches.push({
      id: `m${mid}`,
      leagueId: league.id,
      homeTeamId: home.id,
      awayTeamId: away.id,
      homeScore: hs,
      awayScore: as,
      status,
      minute,
      kickoff,
      events: status === 'upcoming' ? [] : buildEvents(home, away, hs, as, maxMinute),
      stats: status === 'upcoming' ? null : buildStats(hs, as, maxMinute),
      lineups:
        status === 'upcoming'
          ? null
          : (() => {
              const h = buildXI(home)
              const a = buildXI(away)
              return { homeFormation: h.formation, awayFormation: a.formation, home: h.players, away: a.players }
            })(),
      h2h: buildH2H(home, away),
    })
  })
}

// finalize leagues with computed team counts
const leaguesOut = leagues.map((l) => ({ ...l, teamCount: teamsByLeague(l.id).length }))

writeFileSync(`${OUT}/leagues.json`, JSON.stringify(leaguesOut, null, 2))
writeFileSync(`${OUT}/teams.json`, JSON.stringify(teams, null, 2))
writeFileSync(`${OUT}/players.json`, JSON.stringify(players, null, 2))
writeFileSync(`${OUT}/matches.json`, JSON.stringify(matches, null, 2))

console.log(
  `Generated: ${leaguesOut.length} leagues, ${teams.length} teams, ${players.length} players, ${matches.length} matches`,
)
