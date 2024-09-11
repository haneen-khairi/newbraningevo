import re
import json
import os
from pathlib import Path

code_path = Path("../src").resolve()
lang_file_path = Path("../src/localization/ar.json").resolve()
# Load the ar.json file
with open(lang_file_path, 'r', encoding='utf8') as f:
    translations = json.load(f)

missing_translations = []

# Recursive function to process all JavaScript files
def process_files(directory):
    for filename in os.listdir(directory):
        file = os.path.join(directory, filename)
        if os.path.isfile(file) and file.endswith('.jsx'):
            with open(file, 'r', encoding='utf8') as f:
                code = f.read()
            # Find all strings wrapped in the t() function
            strings = re.findall(r't\("(.*?)"\)', code)
            filtered_strings = []
            # Find strings that are not in the ar.json file
            for string in strings:
                if "YY" in string or "HH" in string or "MM" in string or len(string) <= 1 or "hh" in string:
                    continue
                else:
                    filtered_strings.append(string)
            missing_translations.extend([s for s in filtered_strings if s not in translations])
        elif os.path.isdir(file):
            process_files(file)

# Start processing from the root directory of your project
process_files(code_path)

print('Missing translations:', set(missing_translations))