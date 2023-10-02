from django.apps import apps
from django.http import JsonResponse
import inspect
import inventario.models as inv

def get_models(request):
    # Get apps
    apps_names = ["inventario", "compra", "usuario", "tarea", "herramienta"]

    models_dict = {}
    for _ in apps_names:
        app = apps.get_app_config(_)
        models = app.get_models()
        tables_dict = {}
        for model in models:
            table_name = model._meta.db_table
            table_name = table_name.split('_')[1]
            attrs = [field.name for field in model._meta.fields]
            tables_dict[table_name] = attrs

        models_dict[_] = tables_dict

    return JsonResponse(models_dict)

def enabled_methods(request):

    apps_names = ["inventario", "compra", "usuario", "tarea", "herramienta"]

    models_dict = {}
    for _ in apps_names:
        app = apps.get_app_config(_)
        models = app.get_models()
        tables_dict = {}
        for model in models:
            table_name = model._meta.db_table
            table_name = table_name.split('_')[1]
            http_methods = [str(x) for x in inspect.getmembers(inv) if inspect.isclass(x[1])]
            tables_dict[table_name] = http_methods

        models_dict[_] = tables_dict

    return JsonResponse(models_dict)

def enums_models(request):
    
    apps_names = ["inventario", "compra", "usuario", "tarea", "herramienta"]
    enums = {
            'insumos': {
                'unidadMedida': ['metro', 'litro', 'gramo', 'contable'],
                'estado': ['OK', 'Eliminado', 'Suspendido']
                },
            'ajustes-stock': {
                'accionCantidad': ['+', '-']
                },
            'herramientas': {
                'estado': ['OK', 'En reparación', 'Mal estado']
            },
            'estados-herramienta': {
                'estado': ['OK', 'En reparación', 'Mal estado']
                },
            'empleados': {
                'categoria': ['EJ1', 'EJ2'] 
                },
            'ordenservicio': {
                'prioridad': ['URGENTE', 'NORMAL'],
                'categoria': ['INDEFINIDO'],
                'estado': ['EN_ESPERA', 'FINALIZADA', 'EN_PROGRESO']
                },
            'encuestasatisfaccion': {
                    'satisfaccion': ['EXCELENTE', 'BUENO', 'DEFICIENTE', 'MALO', 'INDEFINIDO'],
                    'tiempoRespuesta': ['EXCELENTE', 'BUENO', 'DEFICIENTE', 'MALO', 'INDEFINIDO'],
                },
            'tareas': {
                'tipo': ['INDEFINIDO']
                },
            'ordenes-servicio':{
                'estado':['ACEPTADA','NO ACEPTADA','EN REVISIÓN'],
                'categoria':['FABRICACIÓN','MOVIMIENTO DE MATERIALES / TRASLADOS','MODIFICACIÓN/ADECUACIÓN']
            },
            'presupuesto':{
                'aprobado': ['Si','No']
            }
    }
    """
     enums = {'inventario': {
                'insumo': {
                    'unidadMedida': ['metro', 'litro', 'gramo', 'contable'],
                    'estado': ['OK', 'Eliminado', 'Suspendido']
                    },
                'ajustestock': {
                    'accionCantidad': ['+', '-']
                    },
                },
             'herramienta': {
                'herramienta': {
                    'estado': ['OK', 'En reparación', 'Mal estado']
                    },
                'estadoherramienta': {
                    'estado': ['OK', 'En reparación', 'Mal estado']
                    }
                 },
             'tarea': {
                'empleado': {
                    'categoria': ['EJ1', 'EJ2'] 
                    },
                'ordenservicio': {
                    'prioridad': ['URGENTE', 'NORMAL'],
                    'categoria': ['INDEFINIDO'],
                    'estado': ['EN_ESPERA', 'FINALIZADA', 'EN_PROGRESO']
                    },
                'encuestasatisfaccion': {
                        'satisfaccion': ['EXCELENTE', 'BUENO', 'DEFICIENTE', 'MALO', 'INDEFINIDO'],
                        'tiempoRespuesta': ['EXCELENTE', 'BUENO', 'DEFICIENTE', 'MALO', 'INDEFINIDO'],
                    },
                'tarea': {
                    'tipo': ['INDEFINIDO']
                    }
                 }
             }
    """
   
    return JsonResponse(enums)
