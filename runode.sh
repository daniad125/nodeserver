#!/bin/sh
#
# Run node.js version of service
# Example of shell script for daniad@
#
#

CMD=$1
NODEFILE=${NODEFILE:-"node/qrnode.js"}
DOCSDIR=docs/

if [ ${CMD}"x" = "x" ]; then
 CMD=run
fi
if [ ${NODE}"x" = "x" ]; then
 NODE=/usr/local/bin/node
fi
if [ ${CAT}"x" = "x" ]; then
 CAT=/bin/cat
fi

echo "WARNING! node version of service not ready for production!"


case $CMD in

run)
	if [ ! -r $NODEFILE ]; then
	 echo  $NODEFILE not found!
	 exit 1
	fi
	if [ ! -d $DOCDIR ]; then
	 echo  $DOCSDIR not found!
	 exit 1
	fi
	$NODE node/qrnode.js
	;;
cat)
	if [ ! -r $NODEFILE ]; then
	 echo  $NODEFILE not found!
	 exit 1
	fi
	$CAT node/qrnode.js
	;;
*)
	echo do not know what to do!
esac

