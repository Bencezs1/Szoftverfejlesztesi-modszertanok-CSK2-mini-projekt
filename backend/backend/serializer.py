from rest_framework import serializers
from jokes.models import UserProfile
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
