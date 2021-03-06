from django.db import models

# Create your models here.
class Job(models.Model):
	name = models.CharField(max_length=30)
	description = models.CharField(max_length=100)
	image = models.ImageField(upload_to='images/')


	def __str__(self):
		return self.name


	def summary(self):
		return self.description[:70]
	