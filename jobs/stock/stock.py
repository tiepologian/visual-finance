#!/usr/bin/python

import ystockquote
import gearman
import sys
import signal
import json

def signal_handler(signal, frame):
    sys.exit(0)
signal.signal(signal.SIGINT, signal_handler)

def task_listener(gearman_worker, gearman_job):
    decoded = json.loads(gearman_job.data)
    price = ystockquote.get_bid_realtime(decoded['symbol'])
    return price.encode("ascii")


# connect to gearman server
gm_worker = gearman.GearmanWorker(['localhost:4730'])
gm_worker.set_client_id('gearman_worker_001')
gm_worker.register_task('stock', task_listener)

gm_worker.work()

