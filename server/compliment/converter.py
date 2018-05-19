import argparse
import base64
import json

def main():
    parser = arparse.ArgumentParser()
    parser.add_argument('-image', type=str, help='Path to image file')
    parser.add_argument('-user', type=str, help='Username')
    parser.add_argument('-message', type=str, help='Message')

    args = parser.parse_args()
    
    json_data = {}
    json_data["username"] = args["user"]
    json_data["message"] = args["message"]

    with open(args['image'], 'rb') as imageFile:
        json_data["image"] = base64.b64encode(imageFile.read())
        
    json_data = json.dumps(json_data)
    print(json_data)
