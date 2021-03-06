#! /bin/sh

set -e

git checkout master
git merge dev

VERSION=$(npx select-version-cli)

read -p "Deploy $VERSION - are you sure? (y/n)" -n 1 -r

echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
  echo "Deploy $VERSION ..."

  VERSION=$VERSION 

  yarn build

  npm version $VERSION --message "[release] $VERSION"

  # publish
  echo 'git push origin master'
  git push origin master
  git checkout dev
  git rebase master
  git push origin dev

  cd dist/ms/kysj/

  # commit
  git init
  git add -A
  git commit -m "[deploy] $VERSION"

  # publish
  git remote add origin git@github.com:IgreatD/kysj.git
  git tag v$VERSION
  git push origin v$VERSION
  git tag -d v$VERSION

fi
