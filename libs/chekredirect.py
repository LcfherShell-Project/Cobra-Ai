from httpx import Client, request, get
import sys, asyncio,  time, re
try:
    # python2
    from urlparse import urlparse
except:
    # python3
    from urllib.parse import urlparse


regex = re.compile(
        r'^(?:http|ftp)s?://' # http:// or https://
        r'(?:(?:[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?\.)+(?:[A-Z]{2,6}\.?|[A-Z0-9-]{2,}\.?)|' #domain...
        r'localhost|' #localhost...
        r'\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})' # ...or ip
        r'(?::\d+)?' # optional port
        r'(?:/?|[/?]\S+)$', re.IGNORECASE)


#url = "https://racing.hkjc.com/racing/information/Chinese/Trackwork/TrackworkResult.aspx?Horseno=S001"

headers = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36 Herring/476.14.7"
}
async def test_redirect_302(urls, headers=headers):
    response = ""
    client = Client(follow_redirects=True, headers=headers)
    try:
        with client as cs:
            response = cs.get(urls)
    except:
        response = client.get(urls)
        
    try:
        response = response.url
    except:
        response = urls
    print(response)

def uri_validator(x):
    try:
        result = urlparse(x)
        return all([result.scheme, result.netloc])
    except:
        return False
    
arguments = sys.argv
del arguments[0]
url = "".join(arguments)
if (re.match(regex, url) is not None) or (uri_validator(url) == True):
    asyncio.run(test_redirect_302(url))