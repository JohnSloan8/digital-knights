import json

filepath = 'app/curriculum/curriculum.json'

with open(filepath, 'r') as f:
    data = json.load(f)

for year in data:
    if 'safety' in year:
        del year['safety']

with open(filepath, 'w') as f:
    json.dump(data, f, indent=2)
