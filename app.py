from flask import Flask, request
from flask_cors import CORS
import subprocess
import os



app = Flask(__name__)
CORS(app)

@app.route('/get-mapping', methods=['GET'])
def get_mapping():
	video_id = request.args.get('videoid')
	mapping = {}
	rc = subprocess.call(["./get_transcript.sh", video_id])
	transcript_file = open('transcript.txt','r')
	for line in transcript_file.readlines():
		line_split = line.strip().split(' ')
		timestamp = line_split[0]
		for word in line_split[1:]:
			if word in mapping:
				mapping[word].append(timestamp)
				mapping[word] = list(set(mapping[word]))
			else:
				mapping[word] = [timestamp]
	os.remove('transcript.txt')
	return {'mapping':mapping}

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)