from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from django.http import HttpResponse
from jokes.models import UserProfile, Joke
from rest_framework import status
from rest_framework import generics
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken
from . import serializer as sr


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
    serializer_class = sr.RegisterSerializer

    def perform_create(self, serializer):
        validated_data = serializer.validated_data
        validated_data.pop('password2', None)

        self.user = UserProfile.objects.create_user(
            user_name=validated_data['user_name'],
            email=validated_data['email'],
            password=validated_data['password']
        )

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        self.perform_create(serializer)

        refresh = RefreshToken.for_user(self.user)

        return Response({
            "message": "User registered successfully",
            "refresh": str(refresh),
            "access": str(refresh.access_token),
        }, status=status.HTTP_201_CREATED)

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = sr.CustomTokenObtainPairSerializer


class ProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = sr.ProfileSerializer(request.user)
        return Response(serializer.data)


class UserJokesView(generics.ListCreateAPIView):
    serializer_class = sr.JokeSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Only return jokes belonging to the logged-in user
        return Joke.objects.filter(user=self.request.user).order_by("-time_stamp")


class AllJokesView(generics.ListCreateAPIView):
    serializer_class = sr.JokeSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    def get_queryset(self):
        # Only return jokes belonging to the logged-in user
        return Joke.objects.order_by("-time_stamp")

class JokeDeleteView(generics.DestroyAPIView):
    queryset = Joke.objects.all()
    serializer_class = sr.JokeSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        joke = super().get_object()
        # Only allow the owner to delete
        if joke.user != self.request.user:
            raise PermissionDenied("You do not have permission to delete this joke.")
        return joke