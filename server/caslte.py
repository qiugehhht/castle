#-*- coding:utf-8 -*-
import urllib
import urllib2
import re
import json

values ={}
values['page']=2
data = urllib.urlencode(values)
url = "https://www.relaischateaux.com/us/destinations/europe/france"
geturl = url + "?" + data
print geturl
request = urllib2.Request(geturl)
response = urllib2.urlopen(request)
response.encoding = 'utf-8'
pattern = 'markers: (.*)<script type="text/javascript">'
ss = response.read()
with open("tem", "w") as tem_f:
    tem_f.write(ss)

with open("tem", "r") as read_f:
    line = read_f.readline()
    i = 0
    while line:
        if("name" in line):
            if i>675 and i<1450:
                # print line
                with open('tem2', 'a') as read_ff:
                    read_ff.write(line)
                    read_ff.write('\n')
        line = read_f.readline()
        i = i+1


hotel_name=[]
pattern = re.compile('name')
results_list = []
i = 1
with open('tem2') as f:
    line = f.readline()
    while line:
        line = f.readline()
        match = re.search(pattern, line)
        if match:
            tem_data = line.split("\"")
            # print tem_data[1]
            i=i+1
            print tem_data[1]
            results_list.append({'name':tem_data[1]})
# print results_list
with open("qiuge.json","w",)as f:
    json.dump(results_list,f,ensure_ascii=False, encoding='utf-8')