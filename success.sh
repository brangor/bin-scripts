#!/bin/zsh
# Random success audio clip
# Used for when a long-running command completes successfully
# Usage: ./success.sh

# Define an array of success messages
declare -a success_messages=("Presto" "yeah bay-bee!" "Thatz showbizz" "Ooh yeah" "Perfecto" "Deeee-lish-us!" "Deeee-lish" "That'za wrap" "Bada-bing, bada-booom!" "Zippedy-doo-dah!" "Ayyyyy!" "Bingo" "bango" "Hot diggity dog")

# Generate a random index
index=$((RANDOM % ${#success_messages[@]}))

# Use the say command with a randomly selected success message
say "${success_messages[$index]}"
