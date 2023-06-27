#!/usr/bin/python

import json
import random
from locust import HttpUser, task, between

categories_file = open('categories.json')
categories = json.load(categories_file)

class WebsiteUser(HttpUser):
    wait_time = between(1, 10)

    @task(10)
    def search_categories(self):
        params = {
            "page": random.choice([1, 2, 3]),
            "per_page": random.choice([10, 20, 50]),
            "sort": random.choice(["name", "description"]),
            "filter": random.choice(["Categoria", None]),
        }
        self.client.get("/categories", params=params)

    @task(3)
    def create_category(self):
        category = random.choice(categories)
        self.client.post("/categories", json=category)

    @task(3)
    def update_category(self):
        category = random.choice(categories)
        category["name"] = category["name"] + " Updated"
        self.client.put("/categories/1", json=category)

    @task(2)
    def delete_category(self):
        self.client.delete("/categories/1") 

    def on_start(self):
        self.index()
