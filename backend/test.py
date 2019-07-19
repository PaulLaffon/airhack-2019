"""
Code to test the solve.py script in local
"""

import json
import solve

with open('in1') as json_file:  
    data = json.load(json_file)

    solve.lambda_handler({'body': json.dumps(data)})
