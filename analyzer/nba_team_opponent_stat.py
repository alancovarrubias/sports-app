from nba_stat import NbaStat


class NbaTeamOpponentStat:
    def __init__(self, team_stat, opponent_stat):
        self.team = NbaStat(team_stat)
        opponent = NbaStat(opponent_stat)
        self.orb_percent = self.orb / (self.orb + opponent.drb)
        self.sc_poss = self.fg + (1 - (1 - self.ft_percent) ** 2) * self.fta * 0.4
        self.plays = self.fga + self.fta * 0.4 + self.tov
        self.play_percent = self.sc_poss / self.plays
        self.orb_percent = self.orb / (self.orb + opponent.drb)
        self.sc_poss = self.fg + (1 - (1 - self.ft_percent) ** 2) * self.fta * 0.4
        self.plays = self.fga + self.fta * 0.4 + self.tov
        self.play_percent = self.sc_poss / self.plays
        self.orb_weight = ((1.0 - self.orb_percent) * self.play_percent) / (
            (1.0 - self.orb_percent) * self.play_percent
            + self.orb_percent * (1 - self.play_percent)
        )
        self.field_percent = self.fg / (
            self.fga - (self.orb / (self.orb + self.drb)) * (self.fga - self.fg) * 1.07
        )

    def __getattr__(self, name):
        return getattr(self.team, name)
