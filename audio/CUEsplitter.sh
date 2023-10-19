#!/bin/zsh

if [[ $# == 0 ]]; then
  echo "This script splits a .flac file that has an associated .cue"
  echo "Call Syntax: CUEsplitter.sh <directory containing a .cue and .flac>"
  exit
fi

for x in "$@"; do
  errored=false

  if [! -d "${x}" ] ; then
    echo "Argument must be a directory" >&2
    exit 1
  fi

  cd $x

  if [! -f ./*.cue ]; then
    echo "No cue file found" >&2
    $errored=true
  fi

  if [! -f ./*.flac || ! -f ./*.ape]; then
    echo "No audio file found to split (ape/flac)" >&2
    $errored=true
  fi

  if $errored ; then
    cd -
    exit 1
  fi

  if [-f ./*.ape] ; then
    for i in *ape; do
      /opt/homebrew/bin/ffmpeg -i "$i" -compression_level 12 "${i%.ape}.flac";
    done
  fi

  mkdir -p "split"
  cd ./split

  if [-f ../*.flac]; then
    shnsplit -f ../*.cue -o flac ../*.flac
  fi

  cd -
done


