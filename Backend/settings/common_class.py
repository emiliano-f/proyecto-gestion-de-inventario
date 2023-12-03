from django.contrib.auth.mixins import LoginRequiredMixin
from django.db import models

class LoginRequiredNoRedirect(LoginRequiredMixin):
    login_url = '/usuario/login/'
    raise_exception = True

class CommonModel(models.Model):
    def is_active(self, raise_exception=False, msg='Objeto no existe'):
        if not self.is_active:
            if raise_exception:
                raise ObjectDoesNotExist(msg)
            return False
        return True

    class Meta:
        abstract = True
