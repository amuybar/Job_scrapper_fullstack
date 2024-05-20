
import requests
from bs4 import BeautifulSoup
from .models import Job
import subprocess
import json
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync


# EXAMPLES OF SCRAPPING SITES
JOB_SITES = [
      {
        'url': 'https://www.google.com/search?q=job+listing+nairobi&oq=job+listing+nairobi&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIICAEQABgWGB4yDQgCEAAYhgMYgAQYigUyDQgDEAAYhgMYgAQYigUyDQgEEAAYhgMYgAQYigUyDQgFEAAYhgMYgAQYigUyCggGEAAYgAQYogQyCggHEAAYgAQYogQyCggIEAAYgAQYogQyCggJEAAYgAQYogTSAQg3ODYzajBqN6gCALACAA&sourceid=chrome&ie=UTF-8&ibp=htl;jobs&sa=X&ved=2ahUKEwj8l6Te5ZuGAxUmhf0HHT0qDkIQudcGKAF6BAgWECg&sxsrf=ADLYWIImsbnc2RBpSx8Rvi7Mr0j7iSvKkA:1716193161979#htivrt=jobs&htidocid=pa_gcMIBDW-JbchLAAAAAA%3D%3D&fpstate=tldetail',
        'classes': {
            'listing': 'JMgW3',
            'title': 'BjJfJf PUpOsf',
            'description': 'Qk80Jf',
            'requirements': 'HBvzbc',
            'specifications': 'vNEEBe',
            'pagination': 'setPaginate',
        }
    },
    {
        'url': 'https://www.myjobmag.co.ke/',
        'classes': {
            'listing': 'job-list-li',
            'title': 'mag-b',
            'description': 'job-desc',
            'requirements': 'job-date',
            'specifications': 'sbu-job-list',
            'pagination': 'setPaginate',
        }
    },
]

# CREATE A CONNECTION TO THE CHANNEL
channel_layer = get_channel_layer()


# SENDS LOGS TO THE CHANNE
def send_log(message):
    async_to_sync(channel_layer.group_send)(
        "scrape_jobs_group",
        {
            "type": "log.message",
            "message": message,
        }
    )

def scrape_jobs():
    for site in JOB_SITES:
        url = site['url']
        classes = site['classes']
        
        send_log(f'Scraping jobs from: {url}')
        
        if 'google.com' in url:
            scrape_dynamic_site(url, classes)
        else:
            scrape_static_site(url, classes)

# SCRAPE STATIC SITES
def scrape_static_site(url, classes):
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')
    job_listings = soup.find_all(class_=classes['listing'])

    if len(job_listings) == 0:
        send_log(f'No job listings found on {url}')
        return

    for listing in job_listings:
        title_element = listing.find(class_=classes['title'])
        if title_element:
            title = title_element.get_text(strip=True)
            description_element = listing.find(class_=classes['description'])
            description = description_element.get_text(strip=True) if description_element else 'N/A'
            requirements_element = listing.find(class_=classes['requirements'])
            requirements = requirements_element.get_text(strip=True) if requirements_element else 'N/A'
            specifications_element = listing.find(class_=classes['specifications'])
            specifications = specifications_element.get_text(strip=True) if specifications_element else 'N/A'

            # Check for duplicates
            if not Job.objects.filter(title=title).exists():
                Job.objects.create(
                    title=title,
                    description=description,
                    requirements=requirements,
                    specifications=specifications
                )
                send_log(f'New job "{title}" scraped from {url}')
            else:
                send_log(f'Job "{title}" already exists in the database, skipping...')


# SCRAPPING DYNAMIC WEBSITE
def scrape_dynamic_site(url, classes):
    script = f"""
    const puppeteer = require('puppeteer');

    (async () => {{
        try {{
            const browser = await puppeteer.launch();
            const page = await browser.newPage();
            await page.goto('{url}', {{ waitUntil: 'networkidle2' }});

            const jobs = await page.evaluate(() => {{
                const jobElements = document.querySelectorAll('.{classes['listing']}');
                return Array.from(jobElements).map(jobElement => {{
                    return {{
                        title: jobElement.querySelector('.{classes['title']}')?.innerText.trim() || 'N/A',
                        description: jobElement.querySelector('.{classes['description']}')?.innerText.trim() || 'N/A',
                        requirements: jobElement.querySelector('.{classes['requirements']}')?.innerText.trim() || 'N/A',
                        specifications: jobElement.querySelector('.{classes['specifications']}')?.innerText.trim() || 'N/A'
                    }};
                }});
            }});

            console.log(JSON.stringify(jobs));
            await browser.close();
        }} catch (error) {{
            console.error('Error during scraping:', error);
        }}
    }})();
    """

    try:
        result = subprocess.run(['node', '-e', script], capture_output=True, text=True)
        jobs = json.loads(result.stdout)
        
        for job in jobs:
            if not Job.objects.filter(title=job['title']).exists():
                Job.objects.create(
                    title=job['title'],
                    description=job['description'],
                    requirements=job['requirements'],
                    specifications=job['specifications']
                )
                send_log(f'New job "{job["title"]}" scraped from {url}')
            else:
                send_log(f'Job "{job["title"]}" already exists in the database, skipping...')
    except Exception as e:
        send_log(f'Error during subprocess execution: {e}')
