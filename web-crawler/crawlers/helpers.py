def get_table_rows(table, selectors=None):
    if selectors is None:
        selectors = {'rows': 'tr', 'cells': 'td', 'section': 'tbody'}
    if 'rows' not in selectors:
        selectors['rows'] = 'tr'
    if 'cells' not in selectors:
        selectors['cells'] = 'td'
    if 'section' not in selectors:
        selectors['section'] = 'tbody'
    teams_body = table.find_element_by_tag_name(selectors['section'])
    rows = teams_body.find_elements_by_css_selector(selectors['rows'])
    table_rows = [row.find_elements_by_css_selector(
        selectors['cells']) for row in rows if row]
    return [row for row in table_rows if row]
