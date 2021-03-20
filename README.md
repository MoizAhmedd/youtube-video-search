## Youtube Word Search
An extension that lets you search for words in a youtube video, and seeks to that timestamp

## How it works
- Once you go on a youtube video, a request is sent to the server to get a transcript of the video
- The server returns a dictionary where each word is mapped to a list of timestamps where that word occurs
- As the user presses the shortcut option/alt + f, a search bar is opened
- As user begins types a word and presses enter, the youtube video is forwared/seeks to the timestamp at whichever index the user is currently on
- Demo on https://moizahmedd.github.io/youtubesearch

## Todo
- <s>Determine when you're on a video</s>
- <s>Get transcript of video given the video ID</s>
- <s>Write a function that will given a word and transcript get a list of timestamps</s>
- <s>Write a function that will seek a youtube video to a timestamp</s>
- <s>Searchbar + enter + shortcut logic</s>
- <s>Reset transcript/search on new vids</s>
- <s>Switch to indices starting at 1</s>
- <s>Option F to toggle search bar off</s>
- <s>Test going away from youtube, going to home page etc</s>

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
- Add support for full phrases
- Add option to download transcript with the searched words highlighted
- Add support for videos that only have auto-generated captions
- Show search bar on full screen/theater mode