import requests

url = "https://airbridgedevs.vercel.app/api/admin/login"
payload = {
    "email": "admin@admin.com",
    "password": "admin123"
}
response = requests.post(url, json=payload)
print("Status Code:", response.status_code)
print("Response:", response.text)