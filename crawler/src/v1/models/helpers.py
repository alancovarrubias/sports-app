from selenium.webdriver.common.by import By

def get_team_abbr(cell):
    return cell.find_element(By.TAG_NAME, "a").get_attribute("href").split("/")[-2]
