#!/bin/zsh
# Converts all audio files in a directory to mp3
# Usage: convert_to_mp3.sh *.wav
# Requires ffmpeg
for f in "$@"
do
  DIRNAME=$(dirname "$f")
  BASENAME=$(basename "$f")
  mkdir -p "$DIRNAME/mp3"
  ffmpeg -i "$f" -vn -ar 44100 -ac 2 -q:a 0  "$DIRNAME/mp3/${BASENAME%.*}.mp3" > ~/code/bin/logs/log.txt 2>&1
  say "presto baybee"
done
