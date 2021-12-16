---
title: 'Using pyenv with Orange Pi'
date: '2021-12-03T21:25:00+00:00'
status: publish
permalink: '/?p=1079'
author: pavel
excerpt: ''
type: post
id: using-pyenv-with-orangepi
tag:
    - python
    - pyenv
    - orangepi
---

**Orange Pi Zero 2** is a great product which I use a lot for a side projects. It's pretty cheap, has a tiny size and also easy to setup and run. Those it's good alternative to cloud environments if you need some not very beefy server to run your experiments. I'm running a few web crawlers on Orange PI and very happy with that. 

I use Armbian Debian as an OS for orange pi. It's pretty straightforward how to setup it:
- [download the image compatible with your device](https://www.armbian.com/download/) 
- [flash it to reliable microSD card with Etcher](https://www.balena.io/etcher/)
- Insert the microSD card into the memory slot of the Orange Pi Zero, connect an Ethernet cable and plug in a micro USB cable to power the board.
- Find new host on your local network and connect via ssh **ssh root@192.168.1.144** with default password 1234

That simple

By default **python 3.7.3** is installed on Armbian (on 2021-12-03). But my codebase uses a different versions of python, and if I'd not to mess up all the environment at the start I need to setup some python version management which allows to switch python versions based on project's need. I preffer to use <ps1>pyenv</ps1>.

It's not to hard to install it, all the needed instructions are in [its repo](https://github.com/pyenv/pyenv)

First you need to install build dependencies
```bash
sudo apt-get update; sudo apt-get install make build-essential libssl-dev zlib1g-dev \
libbz2-dev libreadline-dev libsqlite3-dev wget curl llvm \
libncursesw5-dev xz-utils tk-dev libxml2-dev libxmlsec1-dev libffi-dev liblzma-dev
```
Then run installation via the following command, which I find very convenient (although you could clone repo and build it yourself)
```bash
curl https://pyenv.run | bash
```
Then you need to run a set of commands to setup your environment variables
```bash
sed -Ei -e '/^([^#]|$)/ {a \
export PYENV_ROOT="$HOME/.pyenv"
a \
export PATH="$PYENV_ROOT/bin:$PATH"
a \
' -e ':a' -e '$!{n;ba};}' ~/.profile
```

```bash
echo 'eval "$(pyenv init --path)"' >>~/.profile
echo 'eval "$(pyenv init -)"' >> ~/.bashrc
```

Now you have **pyenv** installed and ready to use. 

```bash
pyenv install 3.10.0
```

I tried it and got the following result (*which you probably got too if reading it*)

```bash
pyenv install 3.10.0
Downloading Python-3.10.0.tar.xz...
-> https://www.python.org/ftp/python/3.10.0/Python-3.10.0.tar.xz
Installing Python-3.10.0...
patching file aclocal.m4
patching file configure
Hunk #5 succeeded at 10537 (offset -15 lines).

BUILD FAILED (Debian 10 using python-build 20180424)

Inspect or clean up the working tree at /tmp/python-build.20211216110110.13432
Results logged to /tmp/python-build.20211216110110.13432.log

Last 10 log lines:
      -o Modules/getbuildinfo.o ./Modules/getbuildinfo.c
rm -f libpython3.10.a
ar rcs libpython3.10.a Modules/getbuildinfo.o Parser/token.o  Parser/pegen.o Parser/parser.o Parser/string_parser.o Parser/peg_api.o Parser/myreadline.o Parser/tokenizer.o Objects/abstract.o Objects/accu.o Objects/boolobject.o Objects/bytes_methods.o Objects/bytearrayobject.o Objects/bytesobject.o Objects/call.o Objects/capsule.o Objects/cellobject.o Objects/classobject.o Objects/codeobject.o Objects/complexobject.o Objects/descrobject.o Objects/enumobject.o Objects/exceptions.o Objects/genericaliasobject.o Objects/genobject.o Objects/fileobject.o Objects/floatobject.o Objects/frameobject.o Objects/funcobject.o Objects/interpreteridobject.o Objects/iterobject.o Objects/listobject.o Objects/longobject.o Objects/dictobject.o Objects/odictobject.o Objects/memoryobject.o Objects/methodobject.o Objects/moduleobject.o Objects/namespaceobject.o Objects/object.o Objects/obmalloc.o Objects/picklebufobject.o Objects/rangeobject.o Objects/setobject.o Objects/sliceobject.o Objects/structseq.o Objects/tupleobject.o Objects/typeobject.o Objects/unicodeobject.o Objects/unicodectype.o Objects/unionobject.o Objects/weakrefobject.o Python/_warnings.o Python/Python-ast.o Python/asdl.o Python/ast.o Python/ast_opt.o Python/ast_unparse.o Python/bltinmodule.o Python/ceval.o Python/codecs.o Python/compile.o Python/context.o Python/dynamic_annotations.o Python/errors.o Python/frozenmain.o Python/future.o Python/getargs.o Python/getcompiler.o Python/getcopyright.o Python/getplatform.o Python/getversion.o Python/hamt.o Python/hashtable.o Python/import.o Python/importdl.o Python/initconfig.o Python/marshal.o Python/modsupport.o Python/mysnprintf.o Python/mystrtoul.o Python/pathconfig.o Python/preconfig.o Python/pyarena.o Python/pyctype.o Python/pyfpe.o Python/pyhash.o Python/pylifecycle.o Python/pymath.o Python/pystate.o Python/pythonrun.o Python/pytime.o Python/bootstrap_hash.o Python/structmember.o Python/symtable.o Python/sysmodule.o Python/thread.o Python/traceback.o Python/getopt.o Python/pystrcmp.o Python/pystrtod.o Python/pystrhex.o Python/dtoa.o Python/formatter_unicode.o Python/fileutils.o Python/suggestions.o Python/dynload_shlib.o    Modules/config.o Modules/getpath.o Modules/main.o Modules/gcmodule.o Modules/posixmodule.o  Modules/errnomodule.o  Modules/pwdmodule.o  Modules/_sre.o  Modules/_codecsmodule.o  Modules/_weakref.o  Modules/_functoolsmodule.o  Modules/_operator.o  Modules/_collectionsmodule.o  Modules/_abc.o  Modules/itertoolsmodule.o  Modules/atexitmodule.o  Modules/signalmodule.o  Modules/_stat.o  Modules/timemodule.o  Modules/_threadmodule.o  Modules/_localemodule.o  Modules/_iomodule.o Modules/iobase.o Modules/fileio.o Modules/bytesio.o Modules/bufferedio.o Modules/textio.o Modules/stringio.o  Modules/faulthandler.o  Modules/_tracemalloc.o  Modules/symtablemodule.o  Modules/xxsubtype.o Python/frozen.o
gcc -pthread -L/home/pavel/.pyenv/versions/3.10.0/lib  -L/home/pavel/.pyenv/versions/3.10.0/lib    -Xlinker -export-dynamic -o python Programs/python.o libpython3.10.a -lcrypt -lpthread -ldl  -lutil -lm   -lm 
gcc -pthread -L/home/pavel/.pyenv/versions/3.10.0/lib  -L/home/pavel/.pyenv/versions/3.10.0/lib    -Xlinker -export-dynamic -o Programs/_testembed Programs/_testembed.o libpython3.10.a -lcrypt -lpthread -ldl  -lutil -lm   -lm 
collect2: error: ld returned 1 exit status
make: *** [Makefile:737: Programs/_testembed] Error 1
make: *** Waiting for unfinished jobs....
collect2: error: ld returned 1 exit status
make: *** [Makefile:602: python] Error 1
```

You can check the logs and though the reading it you will notice something like **/tmp no space left on device** what's pretty weird as there's a lot of space on newly spinned server. 

```bash
pavel@orangepizero2:~$ df -h

Filesystem      Size  Used Avail Use% Mounted on
udev            470M     0  470M   0% /dev
tmpfs            97M  5.4M   92M   6% /run
/dev/mmcblk0p1   29G  1.8G   27G   7% /
tmpfs           483M     0  483M   0% /dev/shm
tmpfs           5.0M  4.0K  5.0M   1% /run/lock
tmpfs           483M     0  483M   0% /sys/fs/cgroup
/dev/zram1      468M  752K  433M   1% /tmp
armbian-ramlog   50M  4.7M   46M  10% /var/log
tmpfs            97M     0   97M   0% /run/user/1000
```

You might notice that **/tmp** `/dev/zram1      468M  752K  433M   1% /tmp` isn't a big enough , but **pyenv** is used it to unpack and operate during installation. So you need to fix it somehow. There's a few solutions, including increasing /tmp size, but the simplest one is to add `TMPDIR` environment variable which allows **pyenv** to use all the disk space on device where you pointed it. Run in terminal or add it to **.bashrc** if you want to make it permanent (as pip will also use TMPDIR).
```bash
export TMPDDIR=/var/tmp
```
This will fix the problem and a next pyenv run will be completed succefully.


**PS** / You might get the following error 

```bash 
pyenv install -v 3.10.0
python-build: TMPDIR=/var/tmp is set to a non-accessible location
```

That's the result of running **systemctl mask tmp.mount** which is another option to fix /tmp space issue. To fix it you need to remount `sudo mount -o remount,rw /`