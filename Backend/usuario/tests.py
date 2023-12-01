# Create your tests here.
# Libreria para crear datos falsos.
from django.http import HttpResponse
from faker import Faker
from rest_framework.test import APITestCase,APIRequestFactory,force_authenticate
from rest_framework import status

def getHeaders(response:HttpResponse):
    headers = "ResponseHeaders:{\n";
    for header in response.headers:
        headers+="\t"+str(header +"="+ response.get(header))+"\n"
    return headers+"}\n"
class TestUsuariosModule(APITestCase):
    
    def testRun(self):
        try:
            self.allowedMethods()
            self.loginTest()
        except Exception as e:
            print(EncodingWarning)
            raise e

    def setUp(self):
        self.faker = Faker()
        #self.client.force_login()

    def allowedMethods(self):
        """
        Verifica que métodos están habilitados
        """
        response = self.client.get(
            "/usuario/login",
            format='json'
            )
        self.assertEqual(response.status_code,status.HTTP_405_METHOD_NOT_ALLOWED,
                         msg="El encabezado get está permitido.\n\n"+ getHeaders(response=response))
        
        response = self.client.options(
            "/usuario/login",
            format='json'
            )
        self.assertEqual(response.status_code,status.HTTP_405_METHOD_NOT_ALLOWED)
        response = self.client.patch(
            "/usuario/login",
            format='json'
            )
        self.assertEqual(response.status_code,status.HTTP_405_METHOD_NOT_ALLOWED)
        response = self.client.delete(
            "/usuario/login",
            format='json'
            )
        self.assertEqual(response.status_code,status.HTTP_405_METHOD_NOT_ALLOWED)
        response = self.client.login(
            "/usuario/login",
            format='json'
            )
        self.assertEqual(response.status_code,status.HTTP_405_METHOD_NOT_ALLOWED)
        response = self.client.logout(
            "/usuario/login",
            format='json'
            )
        self.assertEqual(response.status_code,status.HTTP_405_METHOD_NOT_ALLOWED)

    def loginTest(self):
        """
        Verifica la respuesta del login a distintos datos
        """
        response = self.client.post(
            "/usuario/login",
            data = {},
            format='json'
            )
        self.assertEqual(response.status_code,status.HTTP_400_BAD_REQUEST)