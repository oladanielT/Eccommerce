from django.db import models
from django.contrib.auth.models import AbstractUser
from shortuuid.django_fields import ShortUUIDField
from django.db.models.signals import post_save
from django.dispatch import receiver


class User(AbstractUser):
    username = models.CharField(max_length=125)
    email = models.EmailField(unique=True)
    full_name = models.CharField(max_length=125, blank=True, null=True)
    phone = models.CharField(max_length=100, unique=True, null=True, blank=True)
    otp = models.CharField(max_length=100, unique=True, null=True, blank=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return self.email 

    def save(self, *args, **kwargs):
        email_username, mobile = self.email.split("@")
        if self.full_name == "" or self.full_name is None:
            self.full_name = email_username
        if self.username == "" or self.username is None:
            self.username = email_username
        super(User, self).save(*args, **kwargs)    


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    image = models.FileField(upload_to="image", default="/default/default-user.jpeg", null=True, blank=True)
    full_name = models.CharField(max_length=125, null=True, blank=True)
    about = models.TextField(null=True, blank=True)
    gender = models.CharField(max_length=125, null=True, blank=True)
    country = models.CharField(max_length=125, null=True, blank=True)
    state = models.CharField(max_length=125, null=True, blank=True)
    city = models.CharField(max_length=125, null=True, blank=True)
    address = models.CharField(max_length=125, null=True, blank=True)
    date = models.DateTimeField(auto_now_add=True)
    pid = ShortUUIDField(unique=True, length=10, max_length=20, alphabet="abcdefghijk")

    def __str__(self):
        if self.full_name:
            return str(self.full_name)
        else:
            return str(self.user.full_name)

    def save(self, *args, **kwargs):
        if self.full_name == "" or self.full_name is None:
            self.full_name = self.user.full_name
        super(Profile, self).save(*args, **kwargs)


@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)


@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    # Check if profile exists before saving
    if hasattr(instance, 'profile'):
        instance.profile.save()
    else:
        # This should never be needed if the create_user_profile signal works correctly,
        # but it's a safe fallback
        Profile.objects.create(user=instance)
