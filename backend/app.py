import os
import requests
from flask import Flask, jsonify

app = Flask(__name__)

NAMESPACE = "deepakagrawalmsoe-dev"

def fetch_metrics():
    headers = {"Authorization": f"Bearer {os.getenv('TOKEN')}"}
    url = f"https://api.sandbox-m2.openshift.com/apis/metrics.k8s.io/v1beta1/namespaces/{NAMESPACE}/pods"
    response = requests.get(url, headers=headers, verify=False)
    return response.json()

@app.route('/metrics')
def get_metrics():
    data = fetch_metrics()
    return jsonify(data)

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))  # Change from 8080 to 5000
    app.run(host="0.0.0.0", port=port)
