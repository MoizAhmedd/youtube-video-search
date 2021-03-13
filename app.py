from flask import Flask, request
from flask_cors import CORS
import subprocess
import os



app = Flask(__name__)
CORS(app)

			# let timestampSplit = timestamp.split(':');
			# let timeStampSeconds = (+timestampSplit[0]) * 60 * 60 + (+timestampSplit[1]) * 60 + (+timestampSplit[2]); 
			# console.log(timeStampSeconds);

def get_sec(time_str):
    """Get Seconds from time."""
    h, m, s = time_str.split(':')
    return int(h) * 3600 + int(m) * 60 + int(s)

@app.route('/get-mapping', methods=['GET'])
def get_mapping():
	try:
		video_id = request.args.get('videoid')
		mapping = {}
		rc = subprocess.call(["./get_transcript.sh", video_id])
		transcript_file = open('transcript.txt','r')
		for line in transcript_file.readlines():
			line_split = line.strip().split(' ')
			timestamp = line_split[0]
			timeStampSeconds = get_sec(timestamp)
			for word in line_split[1:]:
				if word in mapping:
					mapping[word].append(timeStampSeconds)
					mapping[word] = sorted(list(set(mapping[word])))
				else:
					mapping[word] = [timeStampSeconds]
		os.remove('transcript.txt')
		return {'mapping':mapping}
	except:
		return {'mapping':{}}

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)