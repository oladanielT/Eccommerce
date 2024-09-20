from django.urls import path
from userauths import views as userauths_views
from userauths import views as userauths_views
from rest_framework_simplejwt.views import TokenRefreshView
urlpatterns = [
     path('user/token/', userauths_views.MyTokenObtainPairView.as_view()),
     path('user/refresh/', TokenRefreshView.as_view()),
     path('user/register/', userauths_views.RegisterView.as_view()),
     path('user/password-reset/<email>/', userauths_views.PasswordResetEmailVerify.as_view(), name='password_reset'),
     path('user/password-change/', userauths_views.PasswordChangeView.as_view(), name='password_change')
]
