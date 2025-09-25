from django.contrib.auth.models import Permission
from django.db import models
from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.utils import timezone


class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name

class UserProfileManager(BaseUserManager):
    def create_user(self, email, user_name, password=None, **extra_fields):
        if not email:
            raise ValueError("Users must have an email address")
        email = self.normalize_email(email)
        user = self.model(user_name=user_name, email=email, **extra_fields)
        user.set_password(password)  # handles hashing
        user.save(using=self._db)
        return user

    def create_superuser(self, email, user_name, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        return self.create_user(email, user_name, password, **extra_fields)


class UserProfile(AbstractBaseUser, PermissionsMixin):
    user_name = models.CharField(max_length=100, unique=True)
    email = models.EmailField(unique=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    date_joined = models.DateTimeField(default=timezone.now)

    objects = UserProfileManager()

    USERNAME_FIELD = "email"         # login with email
    REQUIRED_FIELDS = ["user_name"]  # prompted when creating superuser

    def __str__(self):
        return self.user_name

class Joke(models.Model):
    joke = models.TextField()
    user = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name="jokes")
    time_stamp = models.DateTimeField(auto_now_add=True)
    rate = models.FloatField(default=0.0)

    def __str__(self):
        return f"{self.joke[:50]}... - {self.user.user_name}"