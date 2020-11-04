def get_team_abbr(cell): return cell.find_element_by_tag_name(
    'a').get_attribute('href').split('/')[-2]