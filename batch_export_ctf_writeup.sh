#!/bin/bash
BRANCH_NAME=($1)
TARGET_PATH=../ctf

cd CTF-Writeups
while [[ ! -z $1 ]]; do
{
    branch="$1"
    echo "Start processing $branch"...;
    git checkout $branch
    
    branch_basename=$(basename $branch)
    commit_date=$(git show --no-patch --format=%ci HEAD | awk '{print $1}')
    blog_path=${TARGET_PATH}/${commit_date}-${branch_basename}

    echo $blog_path
    if [[ -f "readme.md" ]]; then
    {
        mv readme.md index.md
    }
    fi;

    ls;
    rsync --delete -az --exclude .git --exclude .github ./ $blog_path

    shift;
}
done;