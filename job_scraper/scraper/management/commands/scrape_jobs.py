from django.core.management.base import BaseCommand
from scraper.utils import scrape_jobs

class Command(BaseCommand):
    help = 'Scrapes job listings and saves them to the database'

    def handle(self, *args, **kwargs):
        try:
            result = scrape_jobs()
            if result is None:
                self.stdout.write(self.style.ERROR('Scraping failed. No result returned.'))
                return
            job_count, errors = result
            if errors:
                self.stdout.write(self.style.WARNING('Some errors occurred during scraping:'))
                for error in errors:
                    self.stdout.write(self.style.ERROR(f'- {error}'))
            else:
                self.stdout.write(self.style.SUCCESS('Successfully scraped jobs'))
            self.stdout.write(self.style.SUCCESS(f'Total jobs scraped: {job_count}'))
        except Exception as e:
            self.stdout.write(self.style.ERROR(f'An error occurred: {str(e)}'))
