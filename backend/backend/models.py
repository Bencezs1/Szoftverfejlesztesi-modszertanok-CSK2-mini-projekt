from django.db import models
from django.contrib.auth.hashers import make_password

class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name

class UserProfile(models.Model):
    user_name = models.CharField(max_length=100, unique=True)
    password = models.CharField(max_length=128)
    email = models.EmailField(unique=True)

    def save(self, *args, **kwargs):
            if not self.password.startswith('pbkdf2_'):
                self.password = make_password(self.password)
            super().save(*args, **kwargs)

    def __str__(self):
            return self.user_name