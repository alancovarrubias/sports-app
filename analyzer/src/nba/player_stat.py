from .team_stat import NbaTeamStat
from .stat import NbaStat
from helpers import safe_div


class NbaPlayerStat:
    def __init__(self, player_stat, team_stat, opponent_stat):
        self.player = NbaStat(player_stat)
        team = NbaTeamStat(team_stat, opponent_stat)
        self.q_5 = 1.14 * ((team.ast - self.ast) / team.fg)
        self.q_12 = ((team.ast / team.mp) * self.mp * 5.0 - self.ast) / (
            (team.fg / team.mp) * self.mp * 5.0 - self.fg
        )
        self.q_ast = (
            self.mp / (team.mp / 5.0) * self.q_5
            + (1.0 - self.mp / (team.mp / 5.0)) * self.q_12
        )
        self.fg_part = self.fg * (
            1.0 - 0.5 * safe_div(self.pts - self.ft, 2.0 * self.fga) * self.q_ast
        )
        self.ft_part = (1 - (1 - self.ft_percent) ** 2) * 0.4 * self.fta
        self.ast_part = (
            0.5
            * ((team.pts - team.ft) - (self.pts - self.ft))
            / (2.0 * (team.fga - self.fga))
            * self.ast
        )
        self.orb_part = self.orb * team.orb_weight * team.play_percent
        self.fgx_poss = (self.fga - self.fg) * (1.0 - 1.07 * team.orb_percent)
        self.ftx_poss = ((1.0 - self.ft_percent) ** 2) * 0.4 * self.fta
        self.sc_poss = (self.fg_part + self.ast_part + self.ft_part) * (
            1 - (team.orb / team.sc_poss) * team.orb_weight * team.play_percent
        ) + self.orb_part
        self.tot_poss = self.sc_poss + self.fgx_poss + self.ftx_poss + self.tov
        self.pprod_fg_part = (
            2
            * (self.fg + 0.5 * self.fg3)
            * (1 - 0.5 * (safe_div(self.pts - self.ft, 2 * self.fga)) * self.q_ast)
        )
        self.pprod_ast_part = (
            2
            * ((team.fg - self.fg + 0.5 * (team.fg3 - self.fg3)) / (team.fg - self.fg))
            * 0.5
            * (
                ((team.pts - team.ft) - (self.pts - self.ft))
                / (2 * (team.fga - self.fga))
            )
            * self.ast
        )
        self.pprod_orb_part = (
            self.orb
            * team.orb_weight
            * team.play_percent
            * (
                team.pts
                / (team.fg + (1 - (1 - (team.ft / team.fta)) ** 2) * 0.4 * team.fta)
            )
        )
        self.pprod = (self.pprod_fg_part + self.pprod_ast_part + self.ft) * (
            1 - (team.orb / team.sc_poss) * team.orb_weight * team.play_percent
        ) + self.pprod_orb_part
        self.ortg = 100 * safe_div(self.pprod, self.tot_poss)

    def __getattr__(self, name):
        return getattr(self.player, name)
