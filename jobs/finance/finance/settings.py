# Scrapy settings for finance project
#
# For simplicity, this file contains only the most important settings by
# default. All the other settings are documented here:
#
#     http://doc.scrapy.org/topics/settings.html
#

BOT_NAME = 'finance'
BOT_VERSION = '1.0'

SPIDER_MODULES = ['finance.spiders']
NEWSPIDER_MODULE = 'finance.spiders'
USER_AGENT = '%s/%s' % (BOT_NAME, BOT_VERSION)

