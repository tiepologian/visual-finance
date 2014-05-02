from twisted.internet import reactor
from scrapy.crawler import Crawler
from scrapy.settings import CrawlerSettings
from scrapy import log, signals
from scrapy.xlib.pydispatch import dispatcher
from finance.spiders.financeSpider import FinanceSpider
import sys

def stop_reactor():
    reactor.stop()

dispatcher.connect(stop_reactor, signal=signals.spider_closed)
spider = FinanceSpider(symbol=sys.argv[1])
crawler = Crawler(CrawlerSettings())
crawler.configure()
crawler.crawl(spider)
crawler.start()
log.start(loglevel=log.ERROR)
log.msg('Running reactor...')
reactor.run() # the script will block here
log.msg('Reactor stopped.')

print spider.risultato
