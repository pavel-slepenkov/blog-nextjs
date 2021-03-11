---
title: 'BULK download a QuoteDocument PDFs from Salesforce'
date: '2021-03-11T07:45:00+00:00'
status: publish
permalink: '/?p=1072'
author: pavel
excerpt: ''
type: post
id: bulk-download-quotedocumnets-from-salesforce
tag:
    - python
    - salesforce
---

Sometimes you need to export quote PDFs out of Salesforce. I know a bunch of cases:

- migration to a new salesforce instance
- automated development/test environment data preparation
- finincial audit which requires this kind of documents
- request for all data from a customer

You can find some discussions of this topic [here](https://salesforce.stackexchange.com/questions/23848/export-all-quote-pdfs-for-migration) and even [idea there](https://trailblazer.salesforce.com/ideaView?id=08730000000l3TqAAI).

It looks here's no simple approach. It requires manual downloading csv, linking these csv, renaming, etc. It seems like space for automation here

![](/images/p1072/automate-it-1.jpeg)

also I love to solve problems with code and automate all what can be automated. Usually I use python for such kind of tasks.

![](/images/p1072/automate-it-2.png)


<ps1>1. The first approach is fully automated and gives you PDFs downloaded to specified location</ps1>

```bash
# First you need to install packages if it was not installed earlier.
pip install pandas, requests, simple_salesforce
```
Then save the following file somewhere on you computer as `main.py` and run from command line with `python main.py` (I did all this stuff on jupyter lab, but if you have no this software installed then you just don't need it)

```python
# main.py
import base64, os
import requests
import simple_salesforce

from simple_salesforce import Salesforce
# I use envieonment variables to store my SF creds, you just need to replace
# os.environ['KEY'] with string containing your creds
salesforce = Salesforce(username=os.environ['SF_USERNAME'],
                        password=os.environ['SF_PASSWORD'],
                        security_token=os.environ['SF_SECURITY_TOKEN'],
                        instance="https://targetprocess.my.salesforce.com",
                        version="50.0")
sessionId = salesforce.session_id
instance = salesforce.sf_instance

# you need to rewrite this query to meet your requirements
query = '''
    SELECT Id, Quote.Account.Name, Quote.AccountId, QuoteId
    FROM QuoteDocument
    WHERE Quote.IsSyncing = true
    AND Quote.Opportunity.CloseDate >= 2020-01-01
    AND Quote.Opportunity.CloseDate < 2021-01-01
    AND (
        NOT Quote.Opportunity.Type IN (
            'Existing Business', 'Renewal'
        )
    )
    AND Quote.Opportunity.Stagename = 'Closed Won'
    ORDER BY Quote.Account.Name, QuoteId, CreatedDate DESC
'''

records = salesforce.query(query)
headers = {
    'Content-Type': 'application/text',
    'Authorization': 'Bearer ' + sessionId
}
quote_ids = []

for r in records['records']:
    id = r.get('Id')
    # You might not need the following 3 lines if you will not use it in file name
    account_name = r.get('Quote').get('Account').get('Name').replace(' ', '_').replace('/', '_')
    account_id = r.get('Quote').get('AccountId')
    quote_id = r.get('QuoteId')
    # I use additional condition here, as I need only the latest printed pdf
    # instead of all attached to the same quote
    if quote_id not in quote_ids:
        quote_ids.append(quote_id)
        url = f'https://{instance}/services/data/v50.0/sobjects/QuoteDocument/{id}/Document'
        doc = requests.get(url, headers=headers)
        file_name = f"/Users/slepenkov/quotes/quote_{account_name}_{account_id}__{quote_id}_{id}.pdf"
        with open(file_name, "wb") as f:
            f.write(doc.content)
    else:
        print("skip all quotedocument except the latest")

```
<ps2>Some further technical details</ps2>

When you run query with salesforce.query(query), it brings you python data structure

```json
OrderedDict([
    ('totalSize', 156),
    ('done', True),
    ('records', [list of OrderedDict])
])
```
0 element of the records list looks like that and you need to parse it with such chains `r.get('Quote').get('Account').get('Name')`
```json
OrderedDict([('attributes',
              OrderedDict([('type', 'QuoteDocument'),
                           ('url',
                            '/services/data/v50.0/sobjects/QuoteDocument/0QD0e0000000000001')])),
             ('Id', '0QD0e0000000000001'),
             ('Quote',
              OrderedDict([('attributes',
                            OrderedDict([('type', 'Quote'),
                                         ('url',
                                          '/services/data/v50.0/sobjects/Quote/0Q00e0000010000001')])),
                           ('Account',
                            OrderedDict([('attributes',
                                          OrderedDict([('type', 'Account'),
                                                       ('url',
                                                        '/services/data/v50.0/sobjects/Account/0010e0000000000001')])),
                                         ('Name', 'Fancy Account Name')])),
                           ('AccountId', '0010e0000000000001')])),
             ('QuoteId', '0Q00e0000010000001')])
```

When you run a request to Salesforce API it will bring you a binary string in the following format

```python
# doc.content is a long single string
b'%PDF-1.4\n%\xe2\xe3\xcf\xd3\n3 0 obj <</ColorSpace/DeviceGray/Subtype...a lot of characters here ~100-300Kb.../Root 14 0 R/Size 16>>\nstartxref\n94489\n%%EOF\n'
```
this string is text representation of PDF and can be directly save to filesystem.


<ps1>2. The second approach is shorter in part of code implementation</ps1>
but requires manual actions

Run SOQL query with your prefered query tool and save it as csv file
```sql
SELECT Id
    , Quote.Account.Name
    , Quote.AccountId
    , QuoteId
    , Quote.TotalPrice
    , GrandTotal
    , Document
FROM QuoteDocument
WHERE Quote.IsSyncing = true
AND Quote.Opportunity.CloseDate >= 2020-01-01
AND Quote.Opportunity.CloseDate < 2021-01-01
AND (
    NOT Quote.Opportunity.Type IN (
        'Existing Business', 'Renewal'
    )
)
AND Quote.Opportunity.Stagename = 'Closed Won'
ORDER BY Quote.AccountId, QuoteId, CreatedDate DESC
```

Query will return PDF content as Base64-encoded string which starts with `JVBER`. The length of this string is also pretty big, for my case it's around 100-200kB, but if you have some fancy custom pdf it might be even more. Opening a csv with such strings in UI might be painful.

So you will need to decode it with some script. You definitely can use any programming language here, I'll use python again

```python
import pandas as pd
import base64, os

df = pd.read_csv('/Users/slepenkov/quotes/quotes.csv')
for r in df.values:
    # note that indexes in r[index] expression might be different and need to be validated in csv
    with open(f"/Users/slepenkov/quotes/{r[1]}_quotedid_{r[3]}_pdfid_{r[0]}.pdf", "wb") as f:
        f.write(base64.b64decode(r[6]))
```

The result will be the same - a lot of PDFs which you can load to another Salesforce org or send someone to review.
