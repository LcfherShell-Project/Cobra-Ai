import argparse, os, sys, json, re, threading, io
from urllib.parse import urlparse, parse_qs
try:
    from httpx import Client
    requests = Client(http2=True)
except:
    import requests

direct = os.path.realpath(os.path.dirname(__file__))
direct = direct.split("libs")[0]+"media"
def downloads(url):
    r = requests.get(url)  # to get content after redirection
    try:
        a = urlparse(r.url)
    except:
        a = urlparse(url)
    filename = os.path.basename(a.path)
    
    if filename:
        pass
    else:
        header = r.headers
        header_keys = header.keys()
        for keys in list(header_keys):
            if  os.path.basename(header[keys]):
                filenme = header[keys]
                name, ext = os.path.splitext(filenme)
                if ext:
                    
                    if ext.count("html") > 1:
                        pass
                    else:
                        if filenme.startswith("filename"):
                            filenme = next(iter(re.findall('filename(.*)=(.*)', filenme)), '')
                            if filenme.__len__()>1:
                                filenme = filenme[1]
                        filename = str(filenme)
                        break

    if filename.__len__() > 2:
        pass
    else:
        header = parse_qs(a.query)
        header_keys = header.keys()
        for keys in list(header_keys):
            if  os.path.basename(header[keys]):
                filenme = header[keys]
                name, ext = os.path.splitext(filenme)
                if ext:
                    
                    if ext.count("html") > 1:
                        pass
                    else:
                        if filenme.startswith("filename"):
                            filenme = next(iter(re.findall('filename(.*)=(.*)', filenme)), '')
                            if filenme.__len__()>1:
                                filenme = filenme[1]
                        filename = str(filenme)
                        break

    if filename.__len__()==0:
        print("{ \"filename\": \"\" }")
    else:
        print("{ \"filename\": \""+filename+"\" }")

        with open(os.path.join(direct, filename), "wb", buffering = 0) as w:
            w.write(r.content)

arguments = sys.argv
del arguments[0]
argument = "".join(arguments)

url = 'https://readthedocs.org/projects/django/downloads/pdf/latest/'
if argument:
    t = threading.Thread(target=downloads, args=(argument,))
    t.start()