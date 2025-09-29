from rest_framework import serializers
from jokes.models import UserProfile, Joke, Favorite
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    username_field = 'email'  # tell JWT to use email instead of username

class RegisterSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(write_only=True)
    username = serializers.CharField(source='user_name')

    class Meta:
        model = UserProfile
        fields = ['username', 'email', 'password', 'password2']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def validate(self, data):
        if data['password'] != data['password2']:
            raise serializers.ValidationError("Passwords do not match")
        return data

    def create(self, validated_data):
        validated_data.pop('password2')
        username = validated_data.get('user_name')
        email = validated_data.get('email')
        password = validated_data.get('password')

        # Use the manager to create the user
        user = UserProfile.objects.create_user(
            user_name=username,
            email=email,
            password=password
        )
        return user


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ["id", "user_name", "email", "date_joined"]  # expose these only

    # optional: if you want the JSON to have "username" instead of "user_name"
    username = serializers.CharField(source="user_name", read_only=True)

    class Meta:
        model = UserProfile
        fields = ["id", "username", "email", "date_joined"]


class JokeSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source="user.user_name", read_only=True)  # display name

    class Meta:
        model = Joke
        fields = ["id", "joke", "username", "rate", "time_stamp"]
        read_only_fields = ["id", "username", "rate", "time_stamp"]  # these are auto-set

    def create(self, validated_data):
        """
        Automatically attach the current user when creating a joke.
        """
        user = self.context["request"].user
        return Joke.objects.create(user=user, **validated_data)

class FavoriteSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source="userid.user_name", read_only=True)
    joke_text = serializers.CharField(source="jokeid.joke", read_only=True)

    class Meta:
        model = Favorite
        fields = ["id", "jokeid", "joke_text", "username"]
        read_only_fields = ["id", "joke_text", "username"]

    def create(self, validated_data):
        user = self.context["request"].user
        joke = validated_data["jokeid"]

        favorite, created = Favorite.objects.get_or_create(userid=user, jokeid=joke)
        return favorite