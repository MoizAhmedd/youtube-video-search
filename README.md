## Youtube Word Search
An extension that lets you search for words in a youtube video, and seeks to that timestamp

## How it will work
- Once you go on a youtube video, I will need to have a transcript of the video
- Using some shortcut, will open a search bar somewhere around the video where you can search for words
- As you write a word, it will show you the number of times it appears in the video(transcript)
- As you press enter, the video will seek to the timestamp

## Todo
- <s>Determine when you're on a video</s>
- <s>Get transcript of video given the video ID</s>
- <s>Write a function that will given a word and transcript get a list of timestamps</s>
- <s>Write a function that will seek a youtube video to a timestamp</s>
- <s>Searchbar + enter + shortcut logic</s>
- <s>Reset transcript/search on new vids</s>
- <s>Switch to indices starting at 1</s>
- <s>Option F to toggle search bar off</s>

## Development Usage

### Client (extension)
- `git clone https://github.com/MoizAhmedd/youtube-video-search.git` to your local machine
- `chrome://extensions` in Chrome and Turn on Developer Mode
- Select Load Unpacked and navigate to the `youtube-video-search` directory

### Server
- `pip install -r requirements.txt`
- Install youtube-dl, tutorial here https://github.com/ytdl-org/youtube-dl 
- Change the endpoint in background.js to http://localhost:5000 
- Run server: `python app.py`

## Possible Pull Requests
- Remove preposition words from the mapping (words like "of", "as", "on")