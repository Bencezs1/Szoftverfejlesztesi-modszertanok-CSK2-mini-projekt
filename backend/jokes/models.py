from django.contrib.auth.models import Permission
from django.db import models
from django.contrib.auth.hashers import make_password

class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name

class UserProfile(models.Model):
    user_name = models.CharField(max_length=100, unique=True)
    password = models.CharField(max_length=128)
    permissions = models.ManyToManyField(Permission, blank=True)
    email = models.EmailField(unique=True)

    def save(self, *args, **kwargs):
            if not self.password.startswith('pbkdf2_'):
                self.password = make_password(self.password)
            super().save(*args, **kwargs)

    def __str__(self):
            return self.user_name

class Joke(models.Model):
    joke = models.TextField()
    user = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name="jokes")
    time_stamp = models.DateTimeField(auto_now_add=True)
    rate = models.FloatField(default=0.0)

    def __str__(self):
        return f"{self.joke[:50]}... - {self.user.user_name}"