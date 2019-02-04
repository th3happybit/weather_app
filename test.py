"""
A script for integration test (not finished)
"""

from selenium.webdriver import Firefox
from selenium.webdriver.firefox.options import Options
from selenium.webdriver.support import expected_conditions
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.by import By
import time

opts = Options()
delay = 3
# opts.set_headless()
# assert opts.headless
browser = Firefox(options=opts)
browser.get('https://weatherapp-42eeb.firebaseapp.com/')
element_present = expected_conditions.presence_of_element_located((By.ID, 'open-menu'))
WebDriverWait(browser, delay).until(element_present)
open_menu = browser.find_element_by_id('open-menu')
open_menu.click()

element_present = expected_conditions.presence_of_element_located((By.ID, 'firebaseui-auth-container'))
WebDriverWait(browser, delay).until(element_present)
googlesign = browser.find_element_by_class_name('firebaseui-list-item')
googlesign.click()
time.sleep(2)