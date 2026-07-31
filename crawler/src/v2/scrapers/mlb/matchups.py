from v2.scrapers.base import BaseScraper


class MatchupsScraper(BaseScraper):
    """Scrapes MLB schedule page and fetches game details for each matchup."""

    def parse_data(self):
        matchups = []
        schedule_rows = self._get_schedule_rows()

        for row in schedule_rows:
            game_data = self._parse_schedule_row(row)
            if game_data:
                matchups.append(game_data)

        return {"matchups": matchups}

    def _get_schedule_rows(self):
        """Get all game rows from the schedule table."""
        if not self.contains_element(".ScheduleTables"):
            return []
        tables = self.find_elements(".ScheduleTables")
        rows = []
        for table in tables:
            rows.extend(table.find_elements("tbody tr"))
        return rows

    def _parse_schedule_row(self, row):
        """Parse a single schedule row to extract team and game info."""
        cells = row.find_elements("td")
        if len(cells) < 3:
            return None

        # Get teams from the matchup cell
        teams_cell = cells[0]
        team_links = teams_cell.find_elements("a.AnchorLink")
        if len(team_links) < 2:
            return None

        away_team = self._extract_team_abbrev(team_links[0])
        home_team = self._extract_team_abbrev(team_links[1])

        # Get game time
        time_cell = cells[1] if len(cells) > 1 else None
        game_time = time_cell.text if time_cell else ""

        # Get game link for game_id
        game_link = teams_cell.find_elements("a.AnchorLink")[-1] if teams_cell.find_elements("a.AnchorLink") else None
        game_id = self._extract_game_id(game_link) if game_link else None

        return {
            "away_team": away_team,
            "home_team": home_team,
            "time": game_time,
            "game_id": game_id,
        }

    def _extract_team_abbrev(self, link_element):
        """Extract team abbreviation from link href."""
        href = link_element.get_attribute("href") or ""
        # ESPN team URLs are like /mlb/team/_/name/nyy/new-york-yankees
        parts = href.split("/")
        for i, part in enumerate(parts):
            if part == "name" and i + 1 < len(parts):
                return parts[i + 1].upper()
        return ""

    def _extract_game_id(self, link_element):
        """Extract game ID from link href."""
        href = link_element.get_attribute("href") or ""
        # ESPN game URLs are like /mlb/game/_/gameId/401472105
        parts = href.split("/")
        for i, part in enumerate(parts):
            if part == "gameId" and i + 1 < len(parts):
                return parts[i + 1]
        return None
