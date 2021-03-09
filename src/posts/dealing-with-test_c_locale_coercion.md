---
title: 'Dealing with test_c_locale_coercion on macOS'
date: '2021-03-09T07:55:20+00:00'
status: publish
permalink: '/?p=1071'
author: pavel
excerpt: ''
type: post
id: dealing-with-test_c_locale_coercion
tag:
    - python
    - cpython
    - macOS
---

Building python from source and playing around its internals is a good way to get your python's skill to the next level.
And [Official Python Developer Guide](https://devguide.python.org) gets a great reference for a start. All you need is to make a copy of cpython repo, clone it to a local machine, configure and make. Here you go, your own custom built copy of python is here and you can use it just now.

![](/images/p1071/1.png)

After a successful build you need to run test suites against your setup

```bash
./python -m test -j3
```
It can take a solid amount of time but at the end you will got some result. My case was a multiple errors in test_c_locale_coercion

```bash
$ ./python.exe -m unittest -v test.test_c_locale_coercion.LocaleCoercionTests.test_PYTHONCOERCECLOCALE_set_to_warn
AVAILABLE_TARGETS = ['UTF-8']
EXPECTED_C_LOCALE_EQUIVALENTS = ['C', 'invalid.ascii']
EXPECTED_C_LOCALE_STREAM_ENCODING = 'ascii'
EXPECTED_C_LOCALE_FS_ENCODING = 'utf-8'
EXPECT_COERCION_IN_DEFAULT_LOCALE = True
_C_UTF8_LOCALES = ('C.UTF-8', 'C.utf8', 'UTF-8')
_check_nl_langinfo_CODESET = False
test_PYTHONCOERCECLOCALE_set_to_warn (test.test_c_locale_coercion.LocaleCoercionTests) ...
======================================================================
FAIL: test_PYTHONCOERCECLOCALE_set_to_warn (test.test_c_locale_coercion.LocaleCoercionTests) (default_locale=True, PYTHONCOERCECLOCALE='warn')
----------------------------------------------------------------------
Traceback (most recent call last):
  File "/Users/slepenkov/projects/cpython/Lib/test/test_c_locale_coercion.py", line 340, in _check_c_locale_coercion
    self._check_child_encoding_details(base_var_dict,
  File "/Users/slepenkov/projects/cpython/Lib/test/test_c_locale_coercion.py", line 230, in _check_child_encoding_details
    self.assertEqual(encoding_details, expected_details)
AssertionError: {'fse[36 chars]f-8:strict', 'stdout_info': 'utf-8:strict', 's[80 chars]: ''} != {'fse[36 chars]f-8:surrogateescape', 'stdout_info': 'utf-8:su[98 chars]: ''}
  {'fsencoding': 'utf-8',
   'lang': '',
   'lc_all': '',
   'lc_ctype': 'UTF-8',
   'stderr_info': 'utf-8:backslashreplace',
-  'stdin_info': 'utf-8:strict',
?                         ^^ ^

+  'stdin_info': 'utf-8:surrogateescape',
?                        ++++++ ^^^ ^^^

-  'stdout_info': 'utf-8:strict'}
?                          ^^ ^

+  'stdout_info': 'utf-8:surrogateescape'}
?                         ++++++ ^^^ ^^^
```

My first attempt to resolve my issue was googling. Soo smart.. :)

But because the topic is pretty specific and noone is discussing this on stackoverflow you will end up with a real pain because all you have to deal with now is a bunch of converstations between core developers in python bugtracker.
Something like [this](https://bugs.python.org/issue41700), [this](https://bugs.python.org/issue32002) and [this](https://bugs.python.org/issue30672). Here's a bunch of text to read and debug messages to understand.

After a quick look to all these converstation it was clear that something is wrong with my setup. I've checked my locale's setting

```bash
$ locale
LANG="en_US.UTF-8"
LC_COLLATE="en_US.UTF-8"
LC_CTYPE="en_US.UTF-8"
LC_MESSAGES="en_US.UTF-8"
LC_MONETARY="en_US.UTF-8"
LC_NUMERIC="en_US.UTF-8"
LC_TIME="en_US.UTF-8"
```
Playing with setting locale to `C.UTF-8` or `POSIX` changed nothing.

My next step was to quick run of docker container with alpine and [all required build dependencies](https://devguide.python.org/setup/#build-dependencies) but it ended up with much more longer list of errors on test run, thus the container was terminated and I returned to local setup.

Next step was digging around all dot files in my home directory. If you have pretty old machine like mine (first setup on Nov 2016) and making changes to your configs often you end ups with long list of configurational files in you working directory. With bunch of changes over a time. Motivation of which you can't even remember.

Checking `.bashrc`, `.bash_profile` did not yield any results. But checking `.exports` which I installed from [dotfiles](https://github.com/mathiasbynens/dotfiles/blob/main/.exports) a few years ago was the solution. **I have found that apart from exporting LANG and LC_ALL this file also exports `PYTHONIOENCODING`.** I have no idea how I hadn't noticed this environment variables was globally set. Removing this `export PYTHONIOENCODING='UTF-8';` from global export fixed the issue.

```bash
$  ./python.exe -m test -v test_c_locale_coercion
== CPython 3.10.0a6+ (heads/master:87ec26b812, Mar 7 2021, 09:09:41) [Clang 11.0.0 (clang-1100.0.33.8)]
== macOS-10.15.7-x86_64-i386-64bit little-endian
== cwd: /Users/slepenkov/projects/cpython/build/test_python_56412æ
== CPU count: 4
== encodings: locale=UTF-8, FS=utf-8
0:00:00 load avg: 2.17 Run tests sequentially
0:00:00 load avg: 2.17 [1/1] test_c_locale_coercion
AVAILABLE_TARGETS = ['UTF-8']
EXPECTED_C_LOCALE_EQUIVALENTS = ['C', 'invalid.ascii']
EXPECTED_C_LOCALE_STREAM_ENCODING = 'ascii'
EXPECTED_C_LOCALE_FS_ENCODING = 'utf-8'
EXPECT_COERCION_IN_DEFAULT_LOCALE = True
_C_UTF8_LOCALES = ('C.UTF-8', 'C.utf8', 'UTF-8')
_check_nl_langinfo_CODESET = False
test_external_target_locale_configuration (test.test_c_locale_coercion.LocaleConfigurationTests) ... ok
test_LC_ALL_set_to_C (test.test_c_locale_coercion.LocaleCoercionTests) ... ok
test_PYTHONCOERCECLOCALE_not_set (test.test_c_locale_coercion.LocaleCoercionTests) ... ok
test_PYTHONCOERCECLOCALE_not_zero (test.test_c_locale_coercion.LocaleCoercionTests) ... ok
test_PYTHONCOERCECLOCALE_set_to_one (test.test_c_locale_coercion.LocaleCoercionTests) ... skipped 'coerced LC_CTYPE locale: UTF-8'
test_PYTHONCOERCECLOCALE_set_to_warn (test.test_c_locale_coercion.LocaleCoercionTests) ... ok
test_PYTHONCOERCECLOCALE_set_to_zero (test.test_c_locale_coercion.LocaleCoercionTests) ... ok

----------------------------------------------------------------------

Ran 7 tests in 3.872s

OK (skipped=1)

== Tests result: SUCCESS ==

1 test OK.

Total duration: 4.2 sec
Tests result: SUCCESS
```

So, the most signinficant conclusion is **Keep your working setup clean and make export only when you really need it**. Usually I have PYTHONIOENCODING set on project level when it needed and it's done dynamically set via scripts and disappear just after virtual environment is deactivated.

