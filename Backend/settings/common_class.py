from django.contrib.auth.mixins import LoginRequiredMixin

class LoginRequiredNoRedirect(LoginRequiredMixin):
    login_url = '/usuario/login/'
    raise_exception = True
