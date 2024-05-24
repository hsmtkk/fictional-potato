FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt /app/requirements.txt
RUN pip install -r requirements.txt
COPY main.py /app/main.py
CMD uvicorn main:app --host 0.0.0.0 --port 80
EXPOSE 80
