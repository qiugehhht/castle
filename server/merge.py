#-*- coding:utf-8 -*-
import json

with open('qiuge.json','r') as f:
    lst=json.load(f)

with open('data.json','r') as f:
    info=json.load(f)[0]

name=[n['name'].encode('utf-8') for n in lst]

result=info
for n in info:
    if n['name'].encode('utf-8') in name:
        result.append(n)

with open("merge.json","w",)as f:
    json.dump(result,f,ensure_ascii=True, encoding='utf-8')
