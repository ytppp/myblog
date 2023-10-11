#!/bin/bash

doc_branch=$1
project_dir=$(pwd)

source=(en-US.json zh-CN.json)
target=(en-US.json zh-CN.json)

# $1 is message for echo
# $2 is echo type, support error|success|info
beautify_echo(){
  case $2 in
    error)
      echo -e "\033[31merror: $1\033[0m"
      ;;
    success)
      echo -e "\033[32msuccess: $1\033[0m"
      ;;
    info)
      echo -e "\033[37minfo: $1\033[0m"
      ;;
    *)
      echo $1
      ;;
    esac
}

if [ ${#source[*]} != ${#target[*]} ];then
  beautify_echo "array length not match..." error
  exit -1
fi

# 检查是否指定分支
if [[ $doc_branch == "" ]]
then
  beautify_echo "repo branch required..." error
  exit -1
fi

cd ../docs/trans/$doc_branch

beautify_echo "copy i18n files..." info
for((j=0;j<${#source[*]};j++)) do
  if [ ! -d $project_dir/src/locale/lang ];then
    mkdir -p $project_dir/src/locale/lang
  fi
  cp -f ${source[j]} $project_dir/src/locale/lang/${target[j]}
done
beautify_echo "complete copy all customers i18n files..." success
