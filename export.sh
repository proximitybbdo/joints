#!/bin/bash

# COLORS
COL_BLUE="\x1b[34;01m"
COL_RESET="\x1b[39;49;00m"
COL_RED="\x1b[31;01m"

_print() {
  printf $COL_RED"\n⚡ "$COL_RESET$COL_BLUE"$1\n"$COL_RESET
}

now=`date`
unixtime=`date -j -f "%a %b %d %T %Z %Y" "$now" "+%s"`
dir=$HOME/Desktop/$unixtime

_print "Exporting Engine to $dir"

cp -r . $dir
cd $dir

_print "Removing all unnecessary files"

find . -name .git | xargs rm -rf $
find . -name .gitmodules | xargs rm -rf $

rm export.sh
rm README.md
rm build.xml

_print "Done"
