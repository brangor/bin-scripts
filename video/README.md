# movtogif README
Mac shell script for automatically converting any screen recordings (videos) into gifs for sharing lightweight/useful gifs of page interactions, particularly for documenting interactions.

## Before you start
I always set my screenshots to get deposited in something like ~/Documents/screenshots/ 
- you can do this with: ```defaults write com.apple.screencapture location "/path/to/new/location"```
- or through some menus when you hit Shift + Cmd + 5 to bring up the screenshot tool.

## How to set up
In Automator, you can set this up as a 'folder action' on the directory you nominated above in 'Before you start'.
You need to make sure it passes any new files added to that folder to the script, where it'll detect if it's a video, and then start converting/optimising it and let you know when it's done. 

## How to use
When you use the screenshot tool to record a video, it should pick up the recording, convert to gif, then optimise it in a number of ways that make it small and useful for showing complicated visual steps in guides.
