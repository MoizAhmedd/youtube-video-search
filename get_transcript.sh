#!/bin/bash
# video-cap.sh videoUrl sub.txt

# Download captions only and save in a .vtt file
youtube-dl --skip-download --write-auto-sub "https://www.youtube.com/watch?v=$1";

# Find .vtt files in current directory created within last 3 seconds, limit to 1
vtt=$(ls *.vtt)

# Extract the subs and save as plaintext, removing time, new lines and other markup
sed '1,/^$/d' "$vtt" | sed 's/<[^>]*>//g' | awk -F. 'NR%8==1{printf"%s ",$1}NR%8==3' > "transcript.txt"

# Remove the original .vtt subs file
rm -f "$vtt"


