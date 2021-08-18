#!/bin/bash
# video-cap.sh videoUrl sub.txt

# Download captions only and save in a .vtt file
youtube-dl --skip-download --write-auto-sub "https://www.youtube.com/watch?v=$1" -o "$2";

# # Extract the subs and save as plaintext, removing time, new lines and other markup
sed '1,/^$/d' "$2.en.vtt" | sed 's/<[^>]*>//g' | awk -F. 'NR%8==1{printf"%s ",$1}NR%8==3' > "transcript_$2.txt"

# # Remove the original .vtt subs file
rm -f "$2.en.vtt"

