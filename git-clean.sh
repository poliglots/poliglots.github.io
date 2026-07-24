#!/bin/bash

clearNcommit(){
    git checkout --orphan new-gh-pages

    git add .
    git commit -m "always 1st"

    git branch -D gh-pages

    git branch -m gh-pages

    git push --force --set-upstream origin gh-pages
}



read -t 10 -p "Enter code to proceed (you have 10 seconds): " code
if [ -z "$code" ]; then
    echo ""
    echo "No code entered within the time limit."
elif [ "$code" == "go" ]; then
    echo "clearing old commits and pushing fresh ones"
    clearNcommit
else
  echo "Invalid choice. Please enter correct code"
  exit 1
fi