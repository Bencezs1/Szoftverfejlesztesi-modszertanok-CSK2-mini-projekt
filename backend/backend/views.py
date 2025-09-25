# myapp/views.py

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.http import HttpResponse
from jokes.models import UserProfile, Joke
from rest_framework import status
from rest_framework import generics
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializer import RegisterSerializer, CustomTokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken


class ProtectedView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        return Response({
            "username": user.username,
            "email": user.email,
        })
def home(request):
        if UserProfile.objects.count() == 0:
            user1 = UserProfile.objects.create(user_name="Dezső", password="pass1", email="kuyta@mm.hu")
            user2 = UserProfile.objects.create(user_name="Dzsenifer", password="pass2", email="cica@mm.hu")
        else:
            user1 = UserProfile.objects.first()
            user2 = UserProfile.objects.last()

        if Joke.objects.count() == 0:
            Joke.objects.create(joke="Te. Lol", user=user1, rate=8.5)
            Joke.objects.create(joke="A python tudásom", user=user2, rate=9.0)


        jokes = Joke.objects.all()

        html = "<h1>Viccek:</h1><ul>"
        for j in jokes:
            html += f"<li>{j.joke} - <b>{j.user.user_name}</b> ({j.rate}/10)</li>"
        html += "</ul>"

        return HttpResponse(html)

class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        user = serializer.save()  # get the newly created user

        # Generate JWT tokens for the new user
        refresh = RefreshToken.for_user(user)

        return Response({
            "message": "User registered successfully",
            "refresh": str(refresh),
            "access": str(refresh.access_token),
        }, status=status.HTTP_201_CREATED)

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer
