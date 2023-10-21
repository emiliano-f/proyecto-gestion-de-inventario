/* structure.tsx

(datastructure) ACTIONS: operaciones que se pueden realizar sobre las entidades del modelo.


(datastructure) STRUCTURE: muestra
- grupos de entidades
- atributos de cada entidad
- meta-atributos de cada atributo (relacionados con las columnas de las tablas)

(getter) getFullName: devuelve el meta-atributo name de STRUCTURE

*/

/* data.tsx
(getter + function) buildUrls: construye las url's del backend, en función de la los grupos lógicos
y las entidades que se reflejan en la variable STRUCTURE.

(getter) getNames: construye un arreglo con los nombres de los grupos y sus atributos en función de 
la variable STRUCTURE.

(getter) getUri: en función del nombre de la columna de una tabla que representa una entidad_B, la cual representa
un atributo que es una clave foránea (de una entidad_A), devuelve el nombre que corresponde a esa
entidad_A en la variable STRUCTURE 

(datastructure) translation: es un diccionario que mapea los nombres de las entidades del modelo de datos
a su version plural y singular bien Escrita.

(getter) getPlural: getter de translation
(getter) getSingular: getter de trainlation

(getter + function) buildModulesSection: crea un objeto utilizado 
para reflejar la estructura lógica de grupos de entidades utilizado en en
la parte de Módulos del sidebar, Donde la estructura está en función de aquella 
reflejada en la variable STRUCTURE. Además, los atributos se encuentran en función de
translation. y las url's del front end, no se encuentran construidas a partir de las url's
del backend, pero si dependen de Structure al igual que buildUrls.

(datastructure) SECTIONS: Es un arreglo que contiene objetos que reflejan
- Estructura de las secciones del Sidebar
- Contenido de las secciones del Sidebar
- Atributos propios de la sección del Sidebar
La sección Módulos depende de buildModulesSection
*/

/*GetColumns
(getter + function) GetColumns: devuelve un arreglo con objetos
que contiene atributos de las columnas de la tabla los cuales están en función
de los meta-atributos de los atributos de cada entidad definida
en la variable STRUCTURE.

(getter) GetFields:  devuelve un arreglo con todos los atributos y meta-atributos
de una entidad relejada en la variable Structure
*/

/* apiService.tsx

(variable) baseURL: direccion IP y puerto del backend.

(getter indirecto) GetUrlParts: devuelve las partes de la url del front-end. Como las url's del 
front-end se contruyen en función de STRUCTURES, termina siendo un getter indirecto de STRUCTURES

(function) ListItems: depende de backendURLS, osea de buildUrls, y de baseURL
(function) ReadItem: depende de backendURLS, osea de buildUrls, y de baseURL
(function) CreateItem: depende de backendURLS, osea de buildUrls, y de baseURL
(function) UpdateItem: depende de backendURLS, osea de buildUrls, y de baseURL
(function) DeleteItem: depende de backendURLS, osea de buildUrls, y de baseURL
(function) SendServiceRequest: depende de backendURLS, osea de buildUrls, y de baseURL

(function) GetEnums: depende de /table-enums y de baseURL 

*/

/* DataTable-> depende de ACTIONS*/
/* deleteAlert-> 
depende de GetUrlParts-> indirecta STRUCTURE,
depende de getSingular->translation,
*/
/* Detail->
depende de GetUrlParts-> indirecta STRUCTURE,
depende de getSngurlar-> translation,
depende de getFullName-> Structure
*/

/* List->
depende de DataTable->ACTIONS,
depende de getColumns, getFielsds -> STRUCTURE
depende de GetUrlParts-> indirectamente de buildModules->STRUCTURE,
depende de getSigular,getPlural -> translate
*/

/* MessageDisplay
No depende de nada
*/

/* ModalForm- Send service, get enums tienen que depender de las url's del backend (otro datastructure)
depende de GetUrlParts-> Indirectamente de STRUCTURE,
depende de getSingular-> translation,
*/

/* selectEnum
depende de GetEnums,
depende de GetUrlParts-> indirectamente de STRUCTURE,
 */

/*selectList
depende de getURI -> indirectamente de STRUCTURE,
depende de getSingular -> actions,
*/

/* StockAdjustment
depende de getURLParts -> indirectamente de STRUCTURE,
depende de getSingular -> translate,
*/

/*routes.tsx
(getter + function) generateRoutes(): devuelve un arreglo de objetos que representan las rutas
del frontend, en función de los objetos definidos en la variable SECTIONS.
Las url's creadas indirectamente a partir de los grupos y entidades de la variable STRUCTURE.

(variable) routes: arreglo de objetos que representan las rutas de la app
y que depende de generateRoutes.
(variable) router: depende de routes.
*/

/*ARREGLOS
- Separar las 3 estructuras de datos en archivos diferentes,
- Colocar las funciones getter y función es que trabajen sobre 
determinada estructura en el mismo archivo o en uno diferente.

- Remplazar el nombre de module por grupo, item/itemName por entidad y field por atributo
- Modificar getFullName

- Centralizar ip, endpoints del backend se definen en una estructura de datos 
o si se generan de manera dinámica y permitir añadir url's diferentes.
- Separar el getter de la funcion de buildURLs.
- Send service, get enums tienen que depender de las url's del backend (otro datastructure)
- ¿Queremos que las url's del backend dependan de la estructura STRUCTURE,
las url's del backend dependen de está, lo hacemos independiente?

- Eliminar getNames()?

- Renombrar getURI por algo más ilustrativo.
- Re hacer getURI para que depende explícitamente de STRUCTURE

- Remplazar los getter's indirectos por getters directos,
como getURLparts y getURI

- buildModulesSection depende directamente de STRUCTURE y TRANSLATIONS.
- Deberiamos separarar la generación de URL's del FRont en una variable nueva?
- Centralizar la definición de URL's del Frontend,
y dejarlas separadas de las del backend.

- GetFields,y GetColumns son funciones diferentes pero son getters de STRUCTURE (unificar, cambiar nombres representativos)
- Definir la generación de rutas de manera automática,
pero permitiendo agregar rutas que no dependan de STRUCTURE o 
del modelo de entidades.

- Hacer que todas las entidades que dependan del MER, dependan de
una nueva variable?

- Desacoplar la dependecia entre route.tsx y Sections, creando un nueva constante
FRONTURLS.tsx que genere la urls a partir de STRUCTURE, y que ambos dependan  de esta.
*/