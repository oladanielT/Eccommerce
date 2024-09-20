from django.shortcuts import render, get_object_or_404
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import generics, status
from rest_framework.response import Response
import shortuuid
from userauths.models import User, Profile
from userauths.serializer import RegisterSerializer, MyTokenObtainPairSerializer, UserSerializer
# Create your views here.


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer

def get_random_token():
    uuid = shortuuid.uuid()
    uniq_id = uuid[:6]
    return uniq_id


class PasswordResetEmailVerify(generics.RetrieveAPIView):
    permission_classes = (AllowAny,)
    serializer_class = UserSerializer

    def get_object(self):
        email = self.kwargs['email']
        user = User.objects.get(email=email)

        if (user):
            user.otp = get_random_token()
            print(f"Generated otp: {user.otp}")
            user.save()

            uidb64 = user.pk
            otp = user.otp

            link = f"http://localhost:5173/password-change?otp={otp}&uidb64={uidb64}"
            print("link ====", link)

        return user
    

class PasswordChangeView(generics.CreateAPIView):
    permission_classes = [AllowAny,]
    serializer_class = UserSerializer

    def create(self, request, *args, **kwargs):
        payload = request.data
        uidb64 = payload['uidb64']
        password = payload['password']
        otp = payload['otp']
        

        print(f"Received OTP: {otp}")
        print(f"UIDb64: {uidb64}")

        user = get_object_or_404(User, id=uidb64, otp=otp)
        print(f"Stored OTP: {user.otp}")
        user.set_password(password)
        user.otp = ""
        user.save()
        
        return Response({'message': "Account created successfully"})
        
     
   
