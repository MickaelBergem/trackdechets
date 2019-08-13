FROM python:3.7.4-buster

RUN mkdir /app

WORKDIR /app

COPY requirements.txt .

RUN pip install -r requirements.txt

EXPOSE 8000

RUN ls

CMD ["gunicorn", "-b", "0.0.0.0:8000", "flask_app.app"]

