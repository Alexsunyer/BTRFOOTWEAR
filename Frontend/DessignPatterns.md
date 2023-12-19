## Organizar bien un archivo.
- Las TypeProps del Componente irán justo encima de sus componentes. Todos los demás tipos incluidos los de la logica (es decir todos los tipos que no sean de los componentes propiamente) estarán en un archivo types.ts dentro de la carpeta de cada archivo.
    - Normalmente la Vista extendera de la useLogicProps
- Debajo del componente estara la logica que si necesita crear funciones externas, por ejemplo para recorrer un array, podrá llamar a otras funciones. Estas funciones externas estarán en un fichero llamado functions.ts y se crearán también por orden de llamada.

- En resumen:
    - Crearemos una carpeta para cada Componente (Con el nombre como si fuera un componente) con la siguiente estructura:
        - index.tsx -> el componente en si y su logica
        - types.ts -> los tipos que no sean directamente de la vista del componente, por ejemplo el tipo de un Customer, etc
        - functions.ts -> Funciones que necesitamos para, por ejemplo parsear  los datos
        - hojas de estilo
        - Si por ejemplo este componente tubiera subcomponentes (por ejemplo en el caso del CustomSelect el DropDown) se les crearia una carpeta propia con toda la estructura que acabamos de ver

## Carpetas y rutas
- En App.tsx pondremos las rutas
- en /app pondremos las pantallas de las rutas, por ejemplo si quisieramos crear la pantalla para la página de un producto, lo creariamos en:
    - /app/ProductPage
        - Dentro tendria el index.tsx (donde va el react)
        - Podria tener dentro el functions.ts para, por ejemplo parsear  los datos
        - Podría tener dentro el types.ts (si necesitamos typear cosas extras, fuera de la lógica, por ejemplo, que campos tiene un producto)
        - Podríamos tener su propio archivo sass de estilos
- en /baseComponents pondremos todos los componentes que se podrían utilizar en cualquier lado, por ejemplo un buen ejemplo de baseComponent, va ser el header, ya que lo van a tener todas las paginas
- en /specificComponents vamos a poner todos los componentes que no son solo de una pagina, pero tampoco son de todas. Algo que se utililza en situaciones concretas
- en utils, tenemos 3 carpetas importantes
    - globals, ahi podremos crear funciones planas de javascript que hagan cosas genericas
    - hooks, por si necesitamos crear hooks de react que vamos a utilizar frecuentemente
    - reducers, aqui irá todo lo de redux
    