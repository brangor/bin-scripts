#!/bin/zsh

notify() {
  osascript -e "display notification \"$1\" with title \"Folder Action\""
}


function movtogif() {
  f="$1"
  if [[ "$f" == *.mov ]]; then
    notify "Found .mov screen grab!"
    clean_name="${f//\\}"
    filename=$(basename -- "$clean_name")
    filename_no_ext="${filename%.*}"
    directory=$(dirname -- "$clean_name")

    full_path_input="$directory/$filename"
    full_path_output="$directory/$filename_no_ext.gif"

    if /opt/homebrew/bin/ffmpeg -i "$full_path_input" -r 10 "$directory/temp-$filename_no_ext-0.gif"; then
      if /opt/homebrew/bin/convert "$directory/temp-$filename_no_ext-0.gif" -verbose -coalesce -layers OptimizeFrame "$directory/temp-$filename_no_ext-1.gif"; then
        if /opt/homebrew/bin/gifsicle -O2 "$directory/temp-$filename_no_ext-1.gif" -o "$full_path_output"; then
          rm "$directory/temp-$filename_no_ext-"*
          notify "screen grab is now a gif! :0"
        else
          notify "gifsicle failed :("
        fi
      else
        notify "convert failed :("
      fi
    else
      notify "ffmpeg failed :("
    fi
  else
    notify "Not a .mov file!"
  fi
}
