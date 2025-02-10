FROM python:3.9
WORKDIR /app
COPY app.py /app
COPY requirements.txt /app
RUN pip install -r requirements.txt
EXPOSE 5050
CMD ["python", "app.py"]
