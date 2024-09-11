import json
import pandas as pd

# Load the JSON data
with open('en.json', 'r', encoding='utf-8') as file:
    data = json.load(file)

# Convert the JSON data to a DataFrame
df = pd.DataFrame(list(data.items()), columns=['programmatic', 'arabic'])

# Save the DataFrame to an Excel file
df.to_excel('en.xlsx', index=False)
