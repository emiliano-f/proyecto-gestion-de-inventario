from django.apps import apps
from django.http import JsonResponse
import inspect
import inventario.models as inv
import tarea.models as tar
import compra.models as com
import herramienta.models as her
import usuario.models as usu

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

    def isMethod(att):
        return True if len(att) > 3 and att[-2:] == "__" and att[:2] == '__' else False

    def getClasses(dirs):
        return [name.lower() for name in dirs if not isMethod(name)]

    enums = {}
    tmp = {}
    tmp['unidadMedida'] = [getattr(inv.Insumo().MeasuresScale, att) for att in dir(inv.Insumo().MeasuresScale) if not isMethod(att) and att.isupper()]
    tmp['estado'] = [getattr(inv.Insumo().StatusScale, att) for att in dir(inv.Insumo().StatusScale) if not isMethod(att) and att.isupper()]
    enums['insumos'] = tmp

    tmp = {}
    tmp['accionCantidad'] = [getattr(inv.AjusteStock().ActionScale, att) for att in dir(inv.AjusteStock().ActionScale) if not isMethod(att) and att.isupper()]
    enums['ajustes-stock'] = tmp

    tmp = {}
    tmp['estado'] = [getattr(her.StatusScale, att) for att in dir(her.StatusScale) if not isMethod(att) and att.isupper()]
    enums['herramientas'] = tmp
    enums['estados-herramienta'] = tmp

    tmp = {}
    tmp['categoria'] = [getattr(tar.Empleado().CategoriaScale, att) for att in dir(tar.Empleado().CategoriaScale) if not isMethod(att) and att.isupper()]
    enums['empleados'] = tmp

    tmp = {}
    tmp['prioridad'] = [getattr(tar.OrdenServicio().CaracterScale, att) for att in dir(tar.OrdenServicio().CaracterScale) if not isMethod(att) and att.isupper()]
    tmp['categoria'] = [getattr(tar.OrdenServicio().CategoriaScale, att) for att in dir(tar.OrdenServicio().CategoriaScale) if not isMethod(att) and att.isupper()]
    tmp['estado'] = [getattr(tar.OrdenServicio().StatusScale, att) for att in dir(tar.OrdenServicio().StatusScale) if not isMethod(att) and att.isupper()]
    enums['ordenes-servicio'] = tmp

    tmp = {}
    tmp['satisfaccion'] = [getattr(tar.EncuestaSatisfaccion().SatisfactionScale, att) for att in dir(tar.EncuestaSatisfaccion().SatisfactionScale) if not isMethod(att) and att.isupper()]
    tmp['tiempoRespuesta'] = [getattr(tar.EncuestaSatisfaccion().ResponseTimeScale, att) for att in dir(tar.EncuestaSatisfaccion().ResponseTimeScale) if not isMethod(att) and att.isupper()]
    enums['encuestasatisfaccion'] = tmp

    tmp = {}
    tmp['tipo'] = [getattr(tar.Tarea().TypeScale, att) for att in dir(tar.Tarea().TypeScale) if not isMethod(att) and att.isupper()]
    enums['tareas'] = tmp

    tmp = {}
    tmp['aprobado'] = [getattr(com.Presupuesto().StatusScale, att) for att in dir(com.Presupuesto().StatusScale) if not isMethod(att) and att.isupper()]
    enums['presupuesto'] = tmp

    return JsonResponse(enums)
