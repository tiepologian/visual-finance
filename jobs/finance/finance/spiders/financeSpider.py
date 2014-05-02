#from scrapy.contrib.spiders import Spider, Rule
from scrapy.spider import BaseSpider
from scrapy.contrib.linkextractors.sgml import SgmlLinkExtractor
from scrapy.selector import HtmlXPathSelector
from finance.items import FinanceItem
import re

class FinanceSpider(BaseSpider):
    name = 'finance'
    risultato = ""

    def __init__(self, symbol='', *args, **kwargs):
	super(FinanceSpider, self).__init__(*args, **kwargs)
        self.start_urls = ['http://finance.yahoo.com/q/pr?s=%s' % symbol]
        self.allowed_domains = ['finance.yahoo.com']
        #self.rules = [Rule(SgmlLinkExtractor(allow=()), 'parse_torrent')]

    def parse(self, response):
        sel = HtmlXPathSelector(response)
        torrent = FinanceItem()
        result = sel.select("//table[@class='yfnc_modtitle1'][1]/following::p/text()").extract()
	torrent['description'] = str(result[0].split('.')[0])
	torrent['description'] += result[0].split('.')[1]
        self.risultato = torrent['description']
        return torrent
