---
title: 'Extract numbers from string in python with real life example'
date: '2021-01-05T10:30:35+00:00'
status: unpublished
permalink: '/?p=1067'
author: pavel
type: post
id: extract-numbers-from-string-in-python
tag: [
    python, python3, benchmark
]

---

Extract numbers from string - <ps2>Realy?!!? What a topic for a blog post?!?</ps2> - you'd say when see that. But wait a minute I'll try to make it a bit interesting.

> **Disclimer:** This post shows some reflection on a way how to solve software problems as well as practical solution of named problem. There's nothing interesting for seasoned software engineers but less experienced devs can find something useful here

In this post:
- Real life problem
- 5 basic solutions
- 2 real life solutions
- Benchmark

Recently one of our ETL pipeline was broken by unexpected input which came from pentesters. They tried to investigate some logging endpoints of the main app and posted JSONs with garbage. Later this JSONs came to etl and destroyed it in part of several workers. These workers grab JSON, parse it, make some additional processing and finally save to database. The part with saving to DB was broken because of type inconsistency.

Input for a functions which must be a numeric eventually started looking like that
```md
{$ 90011000001
<# 172.9000900111
{% 1792.2542200656937
<#if0
<#if100.023
```

Our ETL processing is running by a bunch of tiny python functions glued by some functional magic. Parsing numbers from string is not a task which you normally need to solve because of API agrements. Thus we have nothing in our utilities. Actually, parsing numbers from string looks awkward from technical perspective if you do not scrape something on web or from files. But the reality is that this is the most correct way to solve the problem.

Other oprtions to consider:
- filter / ignore all such input because it's only ~0.02% of all
- replace all bad input with None
- catch exception and ignore

But all these solutions mean to lose some data.

As our workers process a large amout of data and utilize pretty much resources I preffer not to introduce any new imports for this processor or at least use only standard lib when possible. Also by this reason we need to evaluate performace and choose faster one.

The first thing I preffer to do when I need to write any new piece of code which I didn't code in the last 6-8 months is to google for the solution. It allows to check if something new came to the scene and update knowledges. I checked a few article and docs, including [stackoverflow](https://stackoverflow.com/questions/4289331/how-to-extract-numbers-from-a-string-in-python).

Most of the examples are very basic, some limited only to positive integers (*This is one of the reasons why I ever started writing this article*)

Lets check these solutions with `sentence = 'String with 42, 3.1415 and 1000'`

1. Using Regex Module
```python
import re
s = [float(s) for s in re.findall(r'-?\d+\.?\d*', sentence)]
>> [42, 3.1415, 1000]
```
2. Split and Append The Numbers To A List using `split()` and `append()` Functions
```python
s = []
for t in sentence.split():
    try:
        s.append(float(t))
    except ValueError:
        pass
>> [42, 3.1415, 1000]
```

3. Using `nums_from_string` library. `pip install nums_from_string` then
```python
import nums_from_string
sentence = 'Extract 100 , 100.45 and 10000 from this string'
print(nums_from_string.get_nums(sentence))
>> [42, 3.1415, 1000]
```

**Solutions limited to only positive integers**

4. Using isdigit() function in a list comprehension
```python
s = [int(s) for s in str.split(sentence) if s.isdigit()]
>> [100, 10000]
```
and varaiation of the above solution
5. `filter` + `str.isdigit` (You can create more complex filter function)
```python
int(''.join(filter(str.isdigit, sentence)))
>> [100, 10000]
```
*Actually here're many variation of these basis solutions with some changes.*

Finally here're 2 possible solutions which fit for my case and requirements:

- replace *bad* chars, split string and check every part for numbers
- use regex

Notes:
- for my case I need to extract only first found number
- I consider 3.14 == 3,14 in string and converts it to a number. That's not a standard approach.

With StackOverflow in hands most of us start coding just in time when possible solution is found. I try to create tests first.
So, lets create a test which allows us to evaluate solutions.

```python
test_set = [
    "{% 152.2795837829749",
    "{% 1608577297370",
    "<#if 1608577297618 %%}",
    "1608577297618 %%} 88912",
    "788",
    "89.981",
    "n55b30",
    ">=123233333332324323",
    "&>>> 1231",
    "9000001",
    "42",
    "bba",
    "!@#$%^&*()231122223",
    "-99,01",
    "100,001.2000",
    "what about very long string ? with a number - 2000.002??? ",
    "and ever much much much much much much much much much much much much much much much much much much much much much much much much much much much much much much much much much much much much much much much much much much much much much much much much much much much much much much much much much much much much longer string 10990.2",
    "",
    "!@#$%^&*()_+",
    "!@#$%^&*()_+900.42!@#$%^&*()_+!@#$%^&*()_+!@#$%^&*()_+iiiiiiEEEEE^^^^^",
]

expected_result = [
    152.2795837829749, 1608577297370, 1608577297618, 1608577297618,
    788, 89.981, 55, 123233333332324323, 1231, 9000001, 42,
    None, 231122223, -99.01, 100.001, 2000.002, 10990.2, None, None, 900.42
]

def run_test(fn):
    l = []
    for s in test_set:
        l.append(fn(s))
    assert l == expected_result
```

I finished with 2 approaches

<ps1>Solution 1</ps1> - replace, split and append

*Start with replacing chars which can be clumped with our number, then split string to list, go through each element of the list and try to convert these parts to a numbers - int or float.*

```python
def sanitize_1(s):
    l = []
    for t in s.translate({ord(c): " " for c in "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()[]{};:/<>?\|`~=_+"}).split():
        try:
            t = t.replace(',', '.')
            if '.' in t:
                a1 = t.split('.')
                l.append(float('.'.join(a1[0:2])))
            else:
                l.append(int(t))
            break
        except ValueError:
            pass
    return l[0] if l else None
```
*There's potential problem with this code - `split()` might create huge list on complex strings and thus increases number of loops with all the stuff inside.*


<ps1>Solution 2</ps1> use **RegEx**
Using of regex is considered to be a slightly bad practice.

```python
def sanitize_2(s):
    l = []
    l.extend([float(t) if '.' in t else int(t) for t in re.findall(r'[-]?\d+(?:\.\d+)?', s.replace(',', '.'))])
    return l[0] if l else None
```

Okay, lets test them on performance. I'm using ipython cell magic `%timeit` as most simple way to evaluate performance

```python
%timeit run_test(sanitize_1)
%timeit run_test(sanitize_2)

236 µs ± 11.7 µs per loop (mean ± std. dev. of 7 runs, 10000 loops each)
72.2 µs ± 1.12 µs per loop (mean ± std. dev. of 7 runs, 10000 loops each)
```

Regex approach is much faster, moover it's much shorter and simplier (sure if you know regex)

![](/images/p1067/perl_problems_2x.png)

That's all, solution #2 won and was deployed

