# -*- coding=utf-8 -*-

import os
from flask import Flask, render_template
from sqlalchemy.sql import text
from sqlalchemy import create_engine

application = Flask(__name__)


POSTGRES_PRISMA_CONN = os.environ["POSTGRES_PRISMA_CONN"]

engine = create_engine(POSTGRES_PRISMA_CONN)
conn = engine.connect()


def get_bsd_count():
    s = text(
        """SELECT count(*) from "default$default"."Form" """)
    r = conn.execute(s).fetchone()
    return r[0]


def get_bsd_count_by_week():
    s = text(
        """SELECT
                (date_trunc('week', CAST((CAST("default$default"."Form"."createdAt" AS timestamp) + INTERVAL '1 day') AS timestamp)) - INTERVAL '1 day') AS "createdAt",
                count(*) AS "count"
            FROM "default$default"."Form"
            WHERE CAST("default$default"."Form"."createdAt" AS date) BETWEEN CAST((NOW() + INTERVAL '-100 day') AS date)
                AND CAST((NOW() + INTERVAL '-1 day') AS date)
            GROUP BY (date_trunc('week', CAST((CAST("default$default"."Form"."createdAt" AS timestamp) + INTERVAL '1 day') AS timestamp)) - INTERVAL '1 day')
            ORDER BY (date_trunc('week', CAST((CAST("default$default"."Form"."createdAt" AS timestamp) + INTERVAL '1 day') AS timestamp)) - INTERVAL '1 day') ASC """
    )
    r = conn.execute(s).fetchall()
    print(r)
    print("COUCOU")
    return r


@application.route("/")
def statistics():
    bsd_count = get_bsd_count()
    bsd_count_by_week = get_bsd_count_by_week()
    return str(bsd_count)

if __name__ == "__main__":
    application.run(host="0.0.0.0", port=80)